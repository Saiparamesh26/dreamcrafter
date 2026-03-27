import ActiveBadge from "@/components/ActiveBadge";
import Chatbot from "@/components/Chatbot";
import CompanyOverview from "@/components/CompanyOverview";
import CompetitorBriefing from "@/components/CompetitorBriefing";
import IntelligenceSources from "@/components/IntelligenceSources";
import JobDescriptions from "@/components/JobDescriptions";
import LiveAnalysisReport from "@/components/LiveAnalysisReport";
import Navbar from "@/components/Navbar";
import PipelineSteps from "@/components/PipelineSteps";
import WeeklyActivityChart from "@/components/WeeklyActivityChart";
import {
  COMPANY_SOURCE_URLS,
  FALLBACK_URLS,
  type SourceKey,
} from "@/data/companySourceUrls";
import { useSearch } from "@tanstack/react-router";
import { ExternalLink, Lock, Zap } from "lucide-react";
import { useEffect, useState } from "react";

// ─── Company Data ─────────────────────────────────────────────────────────────

interface CompanyInfo {
  founded: number;
  hq: string;
  ceo: string;
  employees: string;
  industry: string;
  website: string;
}

const COMPANY_DATA: Record<string, CompanyInfo> = {
  openai: {
    founded: 2015,
    hq: "San Francisco, CA",
    ceo: "Sam Altman",
    employees: "3,500+",
    industry: "AI Research",
    website: "https://openai.com",
  },
  anthropic: {
    founded: 2021,
    hq: "San Francisco, CA",
    ceo: "Dario Amodei",
    employees: "2,500+",
    industry: "AI Safety",
    website: "https://anthropic.com",
  },
  github: {
    founded: 2008,
    hq: "San Francisco, CA",
    ceo: "Thomas Dohmke",
    employees: "3,000+",
    industry: "Developer Tools",
    website: "https://github.com",
  },
  stripe: {
    founded: 2010,
    hq: "San Francisco, CA",
    ceo: "Patrick Collison",
    employees: "8,000+",
    industry: "Fintech / Payments",
    website: "https://stripe.com",
  },
  figma: {
    founded: 2012,
    hq: "San Francisco, CA",
    ceo: "Dylan Field",
    employees: "1,400+",
    industry: "Design Tools",
    website: "https://figma.com",
  },
  notion: {
    founded: 2016,
    hq: "San Francisco, CA",
    ceo: "Ivan Zhao",
    employees: "800+",
    industry: "Productivity",
    website: "https://notion.so",
  },
  linear: {
    founded: 2019,
    hq: "San Francisco, CA",
    ceo: "Karri Saarinen",
    employees: "100+",
    industry: "Project Management",
    website: "https://linear.app",
  },
  slack: {
    founded: 2013,
    hq: "San Francisco, CA",
    ceo: "Denise Dresser",
    employees: "2,000+",
    industry: "Communication",
    website: "https://slack.com",
  },
  atlassian: {
    founded: 2002,
    hq: "Sydney, Australia",
    ceo: "Scott Farquhar",
    employees: "12,000+",
    industry: "Collaboration",
    website: "https://atlassian.com",
  },
  gitlab: {
    founded: 2011,
    hq: "San Francisco, CA",
    ceo: "Sid Sijbrandij",
    employees: "2,100+",
    industry: "DevOps",
    website: "https://gitlab.com",
  },
  vercel: {
    founded: 2015,
    hq: "San Francisco, CA",
    ceo: "Guillermo Rauch",
    employees: "700+",
    industry: "Cloud Infrastructure",
    website: "https://vercel.com",
  },
  hashicorp: {
    founded: 2012,
    hq: "San Francisco, CA",
    ceo: "Armon Dadgar",
    employees: "2,500+",
    industry: "Infrastructure",
    website: "https://hashicorp.com",
  },
  // India IT Giants
  tcs: {
    founded: 1968,
    hq: "Mumbai, India",
    ceo: "K Krithivasan",
    employees: "600,000+",
    industry: "IT Services",
    website: "https://www.tcs.com",
  },
  tata: {
    founded: 1868,
    hq: "Mumbai, India",
    ceo: "N Chandrasekaran",
    employees: "935,000+",
    industry: "Conglomerate",
    website: "https://www.tata.com",
  },
  infosys: {
    founded: 1981,
    hq: "Bengaluru, India",
    ceo: "Salil Parekh",
    employees: "340,000+",
    industry: "IT Services",
    website: "https://www.infosys.com",
  },
  wipro: {
    founded: 1945,
    hq: "Bengaluru, India",
    ceo: "Srinivas Pallia",
    employees: "250,000+",
    industry: "IT Services",
    website: "https://www.wipro.com",
  },
  hcltech: {
    founded: 1976,
    hq: "Noida, India",
    ceo: "C Vijayakumar",
    employees: "230,000+",
    industry: "IT Services",
    website: "https://www.hcltech.com",
  },
  techmahindra: {
    founded: 1986,
    hq: "Pune, India",
    ceo: "Mohit Joshi",
    employees: "160,000+",
    industry: "IT Services",
    website: "https://www.techmahindra.com",
  },
  // India Startups
  zomato: {
    founded: 2008,
    hq: "Gurugram, India",
    ceo: "Deepinder Goyal",
    employees: "15,000+",
    industry: "Food Tech",
    website: "https://www.zomato.com",
  },
  razorpay: {
    founded: 2014,
    hq: "Bengaluru, India",
    ceo: "Harshil Mathur",
    employees: "3,000+",
    industry: "Fintech",
    website: "https://razorpay.com",
  },
  freshworks: {
    founded: 2010,
    hq: "San Mateo, CA",
    ceo: "Dennis Woodside",
    employees: "5,000+",
    industry: "SaaS / CRM",
    website: "https://www.freshworks.com",
  },
  swiggy: {
    founded: 2014,
    hq: "Bengaluru, India",
    ceo: "Sriharsha Majety",
    employees: "15,000+",
    industry: "Food Tech",
    website: "https://www.swiggy.com",
  },
  paytm: {
    founded: 2010,
    hq: "Noida, India",
    ceo: "Vijay Shekhar Sharma",
    employees: "10,000+",
    industry: "Fintech",
    website: "https://paytm.com",
  },
  // Global Tech Giants
  microsoft: {
    founded: 1975,
    hq: "Redmond, WA",
    ceo: "Satya Nadella",
    employees: "220,000+",
    industry: "Enterprise Tech",
    website: "https://microsoft.com",
  },
  google: {
    founded: 1998,
    hq: "Mountain View, CA",
    ceo: "Sundar Pichai",
    employees: "180,000+",
    industry: "Internet / AI",
    website: "https://google.com",
  },
  apple: {
    founded: 1976,
    hq: "Cupertino, CA",
    ceo: "Tim Cook",
    employees: "160,000+",
    industry: "Consumer Tech",
    website: "https://apple.com",
  },
  meta: {
    founded: 2004,
    hq: "Menlo Park, CA",
    ceo: "Mark Zuckerberg",
    employees: "70,000+",
    industry: "Social Media / AI",
    website: "https://about.meta.com",
  },
  amazon: {
    founded: 1994,
    hq: "Seattle, WA",
    ceo: "Andy Jassy",
    employees: "1,500,000+",
    industry: "E-commerce / Cloud",
    website: "https://amazon.com",
  },
  netflix: {
    founded: 1997,
    hq: "Los Gatos, CA",
    ceo: "Ted Sarandos & Greg Peters",
    employees: "13,000+",
    industry: "Streaming / Entertainment",
    website: "https://netflix.com",
  },
  spotify: {
    founded: 2006,
    hq: "Stockholm, Sweden",
    ceo: "Daniel Ek",
    employees: "9,000+",
    industry: "Audio Streaming",
    website: "https://spotify.com",
  },
  zoom: {
    founded: 2011,
    hq: "San Jose, CA",
    ceo: "Eric Yuan",
    employees: "8,000+",
    industry: "Communication",
    website: "https://zoom.us",
  },
  salesforce: {
    founded: 1999,
    hq: "San Francisco, CA",
    ceo: "Marc Benioff",
    employees: "70,000+",
    industry: "Enterprise CRM",
    website: "https://salesforce.com",
  },
  adobe: {
    founded: 1982,
    hq: "San Jose, CA",
    ceo: "Shantanu Narayen",
    employees: "30,000+",
    industry: "Creative Software",
    website: "https://adobe.com",
  },
  cloudflare: {
    founded: 2009,
    hq: "San Francisco, CA",
    ceo: "Matthew Prince",
    employees: "4,000+",
    industry: "Network Security",
    website: "https://cloudflare.com",
  },
  datadog: {
    founded: 2010,
    hq: "New York, NY",
    ceo: "Olivier Pomel",
    employees: "5,000+",
    industry: "Observability",
    website: "https://datadoghq.com",
  },
};

function getCompanyInfo(company: string): CompanyInfo {
  return (
    COMPANY_DATA[company.toLowerCase()] ?? {
      founded: 0,
      hq: "Global",
      ceo: "—",
      employees: "—",
      industry: "Technology",
      website: `https://www.${company.toLowerCase().replace(/\s+/g, "")}.com`,
    }
  );
}

// ─── Pill definitions ────────────────────────────────────────────────────────

const PILL_DEFS: {
  label: string;
  key: SourceKey;
  color: string;
  bg: string;
  border: string;
}[] = [
  {
    label: "Release Notes",
    key: "releaseNotes",
    color: "#22D3EE",
    bg: "rgba(34,211,238,0.08)",
    border: "rgba(34,211,238,0.2)",
  },
  {
    label: "Features",
    key: "features",
    color: "#A78BFA",
    bg: "rgba(167,139,250,0.08)",
    border: "rgba(167,139,250,0.2)",
  },
  {
    label: "Press",
    key: "press",
    color: "#34D399",
    bg: "rgba(52,211,153,0.08)",
    border: "rgba(52,211,153,0.2)",
  },
  {
    label: "Dev",
    key: "devUpdates",
    color: "#FB923C",
    bg: "rgba(251,146,60,0.08)",
    border: "rgba(251,146,60,0.2)",
  },
  {
    label: "Strategy",
    key: "strategy",
    color: "#F472B6",
    bg: "rgba(244,114,182,0.08)",
    border: "rgba(244,114,182,0.2)",
  },
  {
    label: "News",
    key: "news",
    color: "#FACC15",
    bg: "rgba(250,204,21,0.08)",
    border: "rgba(250,204,21,0.2)",
  },
];

// ─── Scan Effect ──────────────────────────────────────────────────────────────

function ScanEffect() {
  const [show, setShow] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setShow(false), 2000);
    return () => clearTimeout(t);
  }, []);
  if (!show) return null;
  return (
    <div className="scan-overlay" aria-hidden="true">
      <div className="scan-line" />
    </div>
  );
}

const PARTICLES = Array.from({ length: 20 }, (_, i) => ({
  id: `p-${i}`,
  left: `${(i * 5.1) % 100}%`,
  top: `${(i * 3.3) % 60}%`,
  delay: `${(i * 0.1) % 2}s`,
  duration: `${2 + (i % 4) * 0.5}s`,
  color: i % 3 === 0 ? "#22D3EE" : i % 3 === 1 ? "#34D399" : "#8B5CF6",
}));

function Particles() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {PARTICLES.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: p.left,
            top: p.top,
            animationDelay: p.delay,
            animationDuration: p.duration,
            background: p.color,
          }}
        />
      ))}
    </div>
  );
}

function LiveClock() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const pad = (n: number) => String(n).padStart(2, "0");
  const hh = pad(now.getHours());
  const mm = pad(now.getMinutes());
  const ss = pad(now.getSeconds());
  const dateStr = now.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <div
      className="inline-flex flex-col items-center gap-0.5 px-5 py-2.5 rounded-xl font-mono"
      style={{
        background: "rgba(34,211,238,0.06)",
        border: "1px solid rgba(34,211,238,0.25)",
        boxShadow: "0 0 18px rgba(34,211,238,0.12)",
      }}
      data-ocid="clock.panel"
    >
      <span
        className="text-2xl font-bold tracking-widest"
        style={{
          color: "#22D3EE",
          textShadow: "0 0 12px rgba(34,211,238,0.6)",
        }}
      >
        {hh}:{mm}:{ss}
      </span>
      <span className="text-xs tracking-wider" style={{ color: "#64748B" }}>
        {dateStr}
      </span>
    </div>
  );
}

export default function AnalysisPathPage() {
  const { company: companyParam } = useSearch({ from: "/analysis" });
  const company = companyParam ?? "OpenAI";
  const info = getCompanyInfo(company);
  const domain = info.website.replace(/^https?:\/\//, "");

  const companyUrls = COMPANY_SOURCE_URLS[company];
  function getPillUrl(key: SourceKey): string {
    if (companyUrls) return companyUrls[key];
    return FALLBACK_URLS[key](company);
  }

  return (
    <div
      className="min-h-screen"
      style={{ background: "#0B1220" }}
      data-ocid="analysis.page"
    >
      <ScanEffect />
      <Navbar />

      <main className="container max-w-6xl mx-auto px-6 pt-28 pb-20">
        {/* 1 — Page header */}
        <header
          className="text-center mb-10 relative"
          data-ocid="analysis.section"
        >
          <Particles />
          <div className="animate-fade-up">
            <span
              className="inline-block text-xs font-semibold tracking-widest px-4 py-1.5 rounded-full mb-4"
              style={{
                background: "rgba(34,211,238,0.08)",
                color: "#22D3EE",
                border: "1px solid rgba(34,211,238,0.2)",
              }}
            >
              INTELLIGENCE DASHBOARD
            </span>
          </div>

          <h1 className="animate-fade-up delay-100 text-4xl md:text-5xl font-extrabold text-white text-glow-cyan mb-4">
            Your Intelligence Analysis Path
          </h1>

          <div className="animate-fade-up delay-150 flex justify-center mb-5">
            <LiveClock />
          </div>

          <div className="animate-fade-up delay-300">
            <ActiveBadge company={company} />
          </div>

          <p
            className="animate-fade-up delay-400 text-base max-w-xl mx-auto mt-4"
            style={{ color: "#94A3B8" }}
          >
            Real-time competitive intelligence — from signal collection to
            actionable delivery.
          </p>
        </header>

        {/* 2 — Dreamcrafter Intelligence preview card */}
        {company ? (
          <div
            className="animate-fade-up delay-400 rounded-2xl border mb-12 overflow-hidden"
            style={{
              background: "#0F1B2A",
              borderColor: "rgba(34,211,238,0.2)",
            }}
            data-ocid="analysis.card"
          >
            <div
              className="p-8 relative"
              style={{
                background:
                  "linear-gradient(135deg, rgba(34,211,238,0.05) 0%, rgba(139,92,246,0.05) 50%, rgba(52,211,153,0.05) 100%)",
              }}
            >
              <div className="text-center relative z-10">
                {/* Title row */}
                <div className="flex items-center justify-center gap-2 mb-2">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{
                      background: "linear-gradient(135deg,#22D3EE,#34D399)",
                    }}
                  >
                    <Zap className="w-5 h-5 text-black" />
                  </div>
                  <span className="text-xl font-bold text-white">
                    Dreamcrafter Intelligence
                  </span>
                </div>

                {/* Subtitle */}
                <p className="text-sm" style={{ color: "#94A3B8" }}>
                  Real-time competitive monitoring · 4 signal categories ·
                  8-week rolling window · analyzing{" "}
                  <span style={{ color: "#22D3EE" }}>{company}</span>
                </p>

                {/* Intelligence Sources pills */}
                <div className="flex items-center justify-center flex-wrap gap-2 mt-4">
                  {PILL_DEFS.map((src) => (
                    <a
                      key={src.label}
                      href={getPillUrl(src.key)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] font-semibold px-2.5 py-1 rounded-full tracking-wide transition-opacity hover:opacity-80"
                      style={{
                        color: src.color,
                        background: src.bg,
                        border: `1px solid ${src.border}`,
                        textDecoration: "none",
                      }}
                    >
                      {src.label}
                    </a>
                  ))}
                </div>

                {/* Website pill */}
                <div className="flex justify-center mt-4">
                  <a
                    href={info.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all hover:bg-cyan-500/10"
                    style={{
                      color: "#22D3EE",
                      border: "1px solid rgba(34,211,238,0.35)",
                      background: "rgba(34,211,238,0.04)",
                    }}
                    data-ocid="analysis.link"
                  >
                    <ExternalLink className="w-3 h-3" />
                    {domain}
                  </a>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div
            className="animate-fade-up delay-400 rounded-2xl border mb-12 flex items-center justify-center py-16"
            style={{
              background: "#0F1B2A",
              borderColor: "rgba(34,211,238,0.1)",
            }}
          >
            <div className="text-center">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
                style={{
                  background: "rgba(34,211,238,0.08)",
                  border: "1px solid rgba(34,211,238,0.2)",
                }}
              >
                <Lock className="w-7 h-7" style={{ color: "#22D3EE" }} />
              </div>
              <p className="text-lg font-bold text-white mb-2">
                Intelligence Locked
              </p>
              <p className="text-sm" style={{ color: "#64748B" }}>
                Search a company on the home page to unlock your intelligence
                briefing
              </p>
            </div>
          </div>
        )}

        {/* 3 — Company Overview */}
        {company && (
          <section className="mb-12" data-ocid="overview.section">
            <CompanyOverview company={company} />
          </section>
        )}

        {/* 4 — Open Roles */}
        {company && (
          <section className="mb-12" data-ocid="jobs.section">
            <JobDescriptions company={company} />
          </section>
        )}

        {/* 5 — Intelligence Sources */}
        {company && (
          <section className="mb-12" data-ocid="sources.section">
            <IntelligenceSources company={company} />
          </section>
        )}

        {/* 6 — AI Competitor Briefing */}
        {company && (
          <section className="mb-12" data-ocid="briefing.section">
            <CompetitorBriefing company={company} />
          </section>
        )}

        {/* 7 — Weekly Activity Chart */}
        {company && (
          <section className="mb-12" data-ocid="chart.section">
            <WeeklyActivityChart company={company} />
          </section>
        )}

        {/* 8 — Live Analysis Report */}
        {company && (
          <section className="mb-12" data-ocid="report.section">
            <LiveAnalysisReport company={company} />
          </section>
        )}

        {/* 9 — Intelligence Pipeline */}
        {company && (
          <section className="mb-8 opacity-80" data-ocid="pipeline.section">
            <PipelineSteps company={company} />
          </section>
        )}
      </main>

      <footer
        className="border-t py-8 px-6"
        style={{ borderColor: "#223046", background: "#0B1220" }}
      >
        <div className="container max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
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
            © {new Date().getFullYear()}. Built with ❤️ by Dreamcrafter
          </p>
        </div>
      </footer>

      <Chatbot />
    </div>
  );
}
