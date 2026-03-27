import Chatbot from "@/components/Chatbot";
import IntelBriefingSearch from "@/components/IntelBriefingSearch";
import Navbar from "@/components/Navbar";
import { Link } from "@tanstack/react-router";
import { Zap } from "lucide-react";

// Precomputed star data so keys are stable
const stars = Array.from({ length: 60 }, (_, i) => ({
  id: `star-${i}`,
  size: `${(((i * 17 + 3) % 20) / 10 + 1).toFixed(1)}px`,
  opacity: (((i * 13 + 5) % 50) / 100 + 0.2).toFixed(2),
  top: `${(i * 1.667) % 100}%`,
  left: `${(i * 1.618 * 100) % 100}%`,
}));

export default function HomePage() {
  return (
    <div className="min-h-screen" style={{ background: "#0B1220" }}>
      <Navbar />

      {/* Hero — Stage 1: Search */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        data-ocid="home.section"
      >
        {/* Aurora background orbs */}
        <div className="absolute inset-0" aria-hidden="true">
          <div
            className="aurora-orb"
            style={{
              width: "600px",
              height: "600px",
              background:
                "radial-gradient(circle, rgba(34,211,238,0.15) 0%, transparent 70%)",
              top: "-100px",
              left: "-100px",
              animationDelay: "0s",
            }}
          />
          <div
            className="aurora-orb"
            style={{
              width: "500px",
              height: "500px",
              background:
                "radial-gradient(circle, rgba(139,92,246,0.2) 0%, transparent 70%)",
              top: "10%",
              right: "-80px",
              animationDelay: "-4s",
            }}
          />
          <div
            className="aurora-orb"
            style={{
              width: "400px",
              height: "400px",
              background:
                "radial-gradient(circle, rgba(236,72,153,0.15) 0%, transparent 70%)",
              bottom: "10%",
              left: "20%",
              animationDelay: "-8s",
            }}
          />
          {/* Stars */}
          {stars.map((s) => (
            <div
              key={s.id}
              className="absolute rounded-full"
              style={{
                width: s.size,
                height: s.size,
                background: `rgba(255,255,255,${s.opacity})`,
                top: s.top,
                left: s.left,
              }}
            />
          ))}
        </div>

        {/* Centered content */}
        <div className="relative z-10 w-full flex flex-col items-center justify-center px-6 text-center">
          {/* Badge */}
          <span
            className="inline-block text-xs font-semibold tracking-widest px-4 py-1.5 rounded-full mb-6 animate-fade-up"
            style={{
              background: "rgba(34,211,238,0.1)",
              color: "#22D3EE",
              border: "1px solid rgba(34,211,238,0.25)",
            }}
          >
            COMPETITIVE INTELLIGENCE PLATFORM
          </span>

          {/* Main headline */}
          <h1
            className="animate-fade-up text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-3"
            style={{ color: "#F1F5F9" }}
          >
            Discover Any Company.
          </h1>
          <h2
            className="animate-fade-up text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-5"
            style={{
              background: "linear-gradient(90deg, #22D3EE, #A78BFA)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Instant Intelligence.
          </h2>

          {/* Subtitle */}
          <p
            className="animate-fade-up delay-100 text-base md:text-lg max-w-xl mx-auto mb-10"
            style={{ color: "#94A3B8" }}
          >
            Enter any company name to generate an instant intelligence briefing
            with release notes, feature updates, press coverage, and open roles.
          </p>

          {/* Search form */}
          <div
            className="animate-fade-up delay-200 w-full max-w-lg"
            data-ocid="briefing.section"
          >
            <IntelBriefingSearch />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="border-t py-10 px-6"
        style={{ borderColor: "#223046", background: "#0B1220" }}
      >
        <div className="container max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #22D3EE, #34D399)",
              }}
            >
              <Zap className="w-3.5 h-3.5 text-black" />
            </div>
            <span className="font-bold text-white">Dreamcrafter</span>
          </div>
          <p className="text-sm" style={{ color: "#94A3B8" }}>
            © {new Date().getFullYear()} Dreamcrafter. All rights reserved.
          </p>
          <div className="flex gap-6">
            {[
              { label: "Home", to: "/" },
              { label: "Analysis", to: "/analysis" },
            ].map((l) => (
              <Link
                key={l.label}
                to={l.to as any}
                className="text-sm hover:text-white transition-colors"
                style={{ color: "#94A3B8" }}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </footer>

      <Chatbot />
    </div>
  );
}
