const rotation = { "up-right": 0, down: 135, left: 225, up: -45 };
export default function Arrow({
  direction = "up-right",
}: {
  direction?: keyof typeof rotation;
}) {
  return (
    <span className="arrow-icon" aria-hidden="true">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ transform: `rotate(${rotation[direction]}deg)` }}
      >
        <path d="M7 17 17 7M8 7h9v9" />
      </svg>
    </span>
  );
}
