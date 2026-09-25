"use client";
import LocalImage from "@/lib/components/local-image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const vertex = `attribute vec2 a_position;varying vec2 v_uv;void main(){v_uv=a_position*.5+.5;gl_Position=vec4(a_position,0.,1.);}`;
const fragment = `precision mediump float;
varying vec2 v_uv;uniform sampler2D u_image;uniform vec2 u_resolution;uniform vec2 u_imageSize;uniform vec2 u_pointer;uniform float u_progress;uniform float u_time;
void main(){
 vec2 uv=v_uv;float screenRatio=u_resolution.x/u_resolution.y;float imageRatio=u_imageSize.x/u_imageSize.y;
 vec2 cover=vec2(min(screenRatio/imageRatio,1.),min(imageRatio/screenRatio,1.));
 uv=(uv-.5)*cover/(1.035+u_progress*.12)+.5;
 vec2 delta=v_uv-u_pointer;float dist=length(delta*vec2(screenRatio,1.));
 float ripple=sin(dist*23.-u_time*1.2)*exp(-dist*5.)*.0015;
 uv+=normalize(delta+vec2(.001))*ripple;uv.x+=sin(v_uv.y*9.+u_time*.32)*.0009;
 uv+=(u_pointer-.5)*.007;
 vec3 color=texture2D(u_image,clamp(uv,.002,.998)).rgb;
 gl_FragColor=vec4(color,1.);
}`;

/** Media stays local. Supplying a generated, all-intra MP4 enables the video path. */
export default function CinematicHero({
  poster,
  videoSrc,
}: {
  poster: string;
  videoSrc?: string;
}) {
  const sectionRef = useRef<HTMLElement>(null),
    canvasRef = useRef<HTMLCanvasElement>(null),
    videoRef = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(false),
    [reduced, setReduced] = useState(false);
  useEffect(() => {
    const m = matchMedia("(prefers-reduced-motion: reduce)");
    const change = () => setReduced(m.matches);
    change();
    m.addEventListener("change", change);
    return () => m.removeEventListener("change", change);
  }, []);
  useEffect(() => {
    const root = sectionRef.current,
      canvas = canvasRef.current;
    if (!root || !canvas || reduced || paused) return;
    const gl = canvas.getContext("webgl", {
      alpha: false,
      antialias: false,
      powerPreference: "low-power",
      preserveDrawingBuffer: false,
    });
    if (!gl) return;
    let alive = true,
      frame = 0,
      visible = true,
      ready = false,
      last = 0,
      progress = 0,
      target = 0,
      width = 1,
      height = 1,
      sourceWidth = 1,
      sourceHeight = 1;
    let pointer = [0.5, 0.5],
      pointerTarget = [0.5, 0.5];
    const shaders: WebGLShader[] = [];
    const compile = (type: number, source: string) => {
      const sh = gl.createShader(type);
      if (!sh) return null;
      shaders.push(sh);
      gl.shaderSource(sh, source);
      gl.compileShader(sh);
      return gl.getShaderParameter(sh, gl.COMPILE_STATUS) ? sh : null;
    };
    const vs = compile(gl.VERTEX_SHADER, vertex),
      fs = compile(gl.FRAGMENT_SHADER, fragment);
    if (!vs || !fs) {
      shaders.forEach((s) => gl.deleteShader(s));
      return;
    }
    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW,
    );
    const attr = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(attr);
    gl.vertexAttribPointer(attr, 2, gl.FLOAT, false, 0, 0);
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    const uniforms = Object.fromEntries(
      [
        "u_image",
        "u_resolution",
        "u_imageSize",
        "u_pointer",
        "u_progress",
        "u_time",
      ].map((x) => [x, gl.getUniformLocation(program, x)]),
    );
    gl.uniform1i(uniforms.u_image, 0);
    const upload = (source: TexImageSource) => {
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, source);
    };
    const resize = () => {
      const box = canvas.getBoundingClientRect();
      width = box.width;
      height = box.height;
      const dpr = Math.min(devicePixelRatio, innerWidth < 760 ? 1 : 1.5);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    const image = new Image();
    image.onload = () => {
      if (!alive) return;
      sourceWidth = image.width;
      sourceHeight = image.height;
      upload(image);
      ready = true;
      canvas.style.opacity = "1";
      wake();
    };
    image.src = poster;
    const video = videoRef.current;
    let pendingSeek = false,
      videoReady = false,
      desiredTime = 0;
    const seek = () => {
      if (
        !video ||
        !videoReady ||
        pendingSeek ||
        !Number.isFinite(video.duration)
      )
        return;
      desiredTime = Math.min(
        video.duration - 0.04,
        Math.max(0, target * video.duration),
      );
      if (Math.abs(video.currentTime - desiredTime) > 1 / 30) {
        pendingSeek = true;
        video.currentTime = desiredTime;
      }
    };
    const seeked = () => {
      pendingSeek = false;
      if (video && video.readyState >= 2) {
        sourceWidth = video.videoWidth;
        sourceHeight = video.videoHeight;
        upload(video);
        wake();
      }
      seek();
    };
    const loaded = () => {
      videoReady = true;
      seeked();
    };
    video?.addEventListener("loadeddata", loaded);
    video?.addEventListener("seeked", seeked);
    if (video) video.load();
    const tick = (time: number) => {
      frame = 0;
      if (!alive || !visible || document.hidden || !ready) return;
      const dt = Math.min((time - last) / 16.67, 3) || 1;
      last = time;
      const ease = 1 - Math.pow(0.88, dt);
      progress += (target - progress) * ease;
      pointer = pointer.map((x, i) => x + (pointerTarget[i] - x) * ease);
      gl.uniform2f(uniforms.u_resolution, width, height);
      gl.uniform2f(uniforms.u_imageSize, sourceWidth, sourceHeight);
      gl.uniform2f(uniforms.u_pointer, pointer[0], pointer[1]);
      gl.uniform1f(uniforms.u_progress, progress);
      gl.uniform1f(uniforms.u_time, time / 1000);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      root.style.setProperty("--journey", String(progress));
      seek();
      frame = requestAnimationFrame(tick);
    };
    function wake() {
      if (!frame && visible && !document.hidden)
        frame = requestAnimationFrame(tick);
    }
    const scroll = () => {
      const rect = root.getBoundingClientRect();
      target = Math.min(
        1,
        Math.max(0, -rect.top / Math.max(1, rect.height - innerHeight)),
      );
      wake();
    };
    const move = (event: PointerEvent) => {
      pointerTarget = [
        event.clientX / innerWidth,
        1 - event.clientY / innerHeight,
      ];
      wake();
    };
    const visibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(frame);
        frame = 0;
      } else wake();
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) wake();
        else {
          cancelAnimationFrame(frame);
          frame = 0;
        }
      },
      { rootMargin: "50px" },
    );
    observer.observe(root);
    const sizeObserver = new ResizeObserver(() => {
      resize();
      scroll();
    });
    sizeObserver.observe(canvas);
    root.dataset.motion = "true";
    resize();
    scroll();
    window.addEventListener("scroll", scroll, { passive: true });
    root.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("visibilitychange", visibility);
    const lost = (event: Event) => {
      event.preventDefault();
      canvas.style.opacity = "0";
      cancelAnimationFrame(frame);
      frame = 0;
      ready = false;
    };
    canvas.addEventListener("webglcontextlost", lost);
    return () => {
      alive = false;
      cancelAnimationFrame(frame);
      observer.disconnect();
      sizeObserver.disconnect();
      window.removeEventListener("scroll", scroll);
      root.removeEventListener("pointermove", move);
      document.removeEventListener("visibilitychange", visibility);
      canvas.removeEventListener("webglcontextlost", lost);
      video?.removeEventListener("loadeddata", loaded);
      video?.removeEventListener("seeked", seeked);
      video?.pause();
      image.onload = null;
      gl.deleteTexture(texture);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      shaders.forEach((x) => gl.deleteShader(x));
      canvas.style.opacity =
        "0"; /* Preserve layout and progress when motion is paused. */
    };
  }, [poster, videoSrc, paused, reduced]);
  return (
    <section
      ref={sectionRef}
      className="cinematic-shell"
      aria-label="Find your groove"
    >
      <div className="hero">
        <LocalImage
          sizes="100vw"
          className="hero-image"
          src={poster}
          alt="A traveler in a wooden boat surrounded by giant green lily pads"
          fetchPriority="high"
        />
        <canvas ref={canvasRef} className="hero-canvas" aria-hidden="true" />
        {videoSrc && (
          <video
            ref={videoRef}
            className="scrub-source"
            src={videoSrc}
            muted
            playsInline
            preload="metadata"
            aria-hidden="true"
          />
        )}
        <div className="hero-shade" />
        <div className="hero-content">
          <p className="eyebrow light">
            <span /> GOOD PEOPLE. EXTRAORDINARY PLACES.
          </p>
          <h1>
            Find your people.
            <br />
            Find your <em>groove.</em>
          </h1>
          <p className="hero-description">
            For the culturally curious. The music lovers.
            <br />
            The just-one-more-adventure people.
            <br />
            Your tribe is out there.
          </p>
          <Link href="/trips" className="button button-white">
            Explore the trips <span>↗</span>
          </Link>
        </div>
        <div className="hero-chapter" aria-hidden="true">
          <span className="eyebrow">WHERE YOUR VIBE MEETS YOUR TRIBE</span>
          <p>
            A little further
            <br />
            from ordinary.
            <br />
            <em>A little closer to you.</em>
          </p>
        </div>
        <div className="hero-bottom">
          <a href="#intro">
            SCROLL INTO YOUR NEXT CHAPTER <span>↓</span>
          </a>
          <div className="hero-footnote">
            <span>THE GROOVETRIPS WAY</span>
            <small>Culture. Connection. Community.</small>
          </div>
          <button
            className="motion-toggle"
            aria-label={paused ? "Enable visual motion" : "Pause visual motion"}
            aria-pressed={paused}
            onClick={() => setPaused(!paused)}
          >
            {paused ? "▶" : "Ⅱ"}
          </button>
        </div>
        <div className="scroll-progress" aria-hidden="true" />
      </div>
    </section>
  );
}
