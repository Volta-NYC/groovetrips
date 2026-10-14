import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/lib/components/navbar";
import Footer from "@/lib/components/footer";
export const metadata: Metadata = {
  title: {
    default: "GrooveTrips — Where your vibe meets your tribe",
    template: "%s | GrooveTrips",
  },
  description:
    "Build community through culturally immersive group travel. Shop local, support artists and small businesses, and explore payment options with GrooveTrips.",
  icons: { icon: "/brand/groovetrips-logo.png" },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
