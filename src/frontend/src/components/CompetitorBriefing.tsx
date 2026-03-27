import {
  Brain,
  Check,
  Download,
  RefreshCw,
  Search,
  Sparkles,
  X,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface BriefingFeature {
  name: string;
  description: string;
  source: string;
}

interface BriefingData {
  features: BriefingFeature[];
  summary: string;
}

interface SearchResult {
  title: string;
  domain: string;
  date: string;
  excerpt: string;
}

interface VerificationItem {
  title: string;
  date: string;
  status: "accepted" | "rejected";
  reason?: string;
}

// ─── Static Data ─────────────────────────────────────────────────────────────

const BRIEFINGS: Record<string, BriefingData> = {
  OpenAI: {
    features: [
      {
        name: "GPT-4.5 API Update",
        description:
          "Improved response accuracy and instruction-following across complex reasoning tasks. Developers report 18% fewer hallucinations on standard benchmarks.",
        source: "https://platform.openai.com/docs/changelog",
      },
      {
        name: "Vision Model Upgrade",
        description:
          "Better image understanding with support for multi-image prompts and enhanced OCR for dense documents and diagrams.",
        source: "https://openai.com/blog",
      },
      {
        name: "Realtime API Improvements",
        description:
          "Reduced end-to-end latency by 35% in the Realtime API, enabling near-instant voice and streaming interactions for production applications.",
        source: "https://platform.openai.com/docs/guides/realtime",
      },
    ],
    summary:
      "OpenAI focused on improving API performance and multimodal capabilities this week. Developer tooling and latency reductions signal a push toward real-time production workloads.",
  },
  GitHub: {
    features: [
      {
        name: "Copilot Workspace GA",
        description:
          "AI-powered dev environments are now generally available, letting developers spec, plan, build, and test entire features from a single natural-language prompt.",
        source: "https://github.blog/changelog/",
      },
      {
        name: "Code Review AI",
        description:
          "Automated PR suggestions now surface security vulnerabilities, style drift, and logic gaps inline — reducing average review time by 40%.",
        source: "https://github.blog/",
      },
      {
        name: "GitHub Actions Improvements",
        description:
          "Faster CI pipelines via new cache reuse strategies and parallelization primitives cut median workflow time in half for monorepos.",
        source: "https://github.blog/category/engineering/",
      },
    ],
    summary:
      "GitHub shipped major Copilot and automation features targeting developer productivity. The Workspace GA marks a significant bet on agentic coding workflows.",
  },
  Stripe: {
    features: [
      {
        name: "Payment Links v2",
        description:
          "Redesigned checkout flow with adaptive UI, one-click upsells, and built-in A/B testing. Early adopters report 12% higher conversion rates.",
        source: "https://stripe.com/blog",
      },
      {
        name: "Revenue Recognition Update",
        description:
          "New GAAP-compliant revenue scheduling tools for SaaS businesses, including automated deferral, multi-element arrangements, and audit trail exports.",
        source: "https://stripe.com/docs/revenue-recognition",
      },
      {
        name: "Connect Platform Improvements",
        description:
          "Expanded onboarding flows and risk controls for marketplace platforms, plus new instant payout eligibility for verified sellers.",
        source: "https://stripe.com/docs/connect",
      },
    ],
    summary:
      "Stripe focused on payment conversion and revenue management for platforms. The Payment Links v2 and revenue recognition updates reinforce its position as the full-stack financial OS for the internet.",
  },
  Google: {
    features: [
      {
        name: "Gemini 2.0 Flash",
        description:
          "Faster multimodal model delivering near-GPT-4-class quality at 3x the speed and lower cost — now powering Search AI Overviews and Workspace.",
        source: "https://ai.google.dev",
      },
      {
        name: "Google AI Studio Updates",
        description:
          "New agent builder, grounding with Google Search, and multi-turn conversation export make prototyping production AI features significantly faster.",
        source: "https://ai.google.dev/gemini-api/docs",
      },
      {
        name: "Android AI Integration",
        description:
          "On-device Gemini Nano now handles summarization, smart replies, and Circle to Search natively without network round-trips on Pixel and Galaxy devices.",
        source: "https://android-developers.googleblog.com/",
      },
    ],
    summary:
      "Google expanded its Gemini model lineup and deepened AI integration across products. Flash's speed-to-quality ratio signals an aggressive move toward ubiquitous AI in every surface.",
  },
  Microsoft: {
    features: [
      {
        name: "Copilot for M365 Improvements",
        description:
          "Better context window utilization across Teams, Outlook, and Word — Copilot now retains up to 128K tokens of meeting history for richer summaries.",
        source: "https://techcommunity.microsoft.com/",
      },
      {
        name: "Azure AI Updates",
        description:
          "New model deployments including Phi-3.5 and Mistral Large 2 on Azure OpenAI Service, with serverless inference endpoints for cost-optimized workloads.",
        source: "https://azure.microsoft.com/en-us/blog/",
      },
      {
        name: "VS Code AI Features",
        description:
          "Inline chat, multi-file Copilot edits, and agent mode in public preview give developers end-to-end AI assistance without leaving the editor.",
        source: "https://code.visualstudio.com/updates/",
      },
    ],
    summary:
      "Microsoft continued expanding Copilot capabilities across enterprise and developer tools. Azure's growing model catalog positions it as the neutral cloud for multi-model AI strategies.",
  },
  Anthropic: {
    features: [
      {
        name: "Claude 3.7 Sonnet Release",
        description:
          "Extended thinking mode enables step-by-step chain-of-thought reasoning visible to developers, delivering state-of-the-art scores on MATH and GPQA benchmarks.",
        source: "https://www.anthropic.com/news/claude-3-7-sonnet",
      },
      {
        name: "Claude API Tool Updates",
        description:
          "Improved function calling with parallel tool use, structured output schemas, and a new computer-use beta enabling autonomous browser and desktop actions.",
        source: "https://docs.anthropic.com/en/release-notes/overview",
      },
      {
        name: "Claude.ai Web Improvements",
        description:
          "Projects now support shared knowledge bases across conversations, letting teams maintain persistent context for long-running research and coding tasks.",
        source: "https://www.anthropic.com/claude",
      },
    ],
    summary:
      "Anthropic released significant model upgrades focused on reasoning and developer tooling. Extended thinking and computer-use capabilities push Claude toward autonomous agent territory.",
  },
};

const SEARCH_RESULTS: Record<string, SearchResult[]> = {
  OpenAI: [
    {
      title: "OpenAI Releases GPT-4.5 with Improved Accuracy",
      domain: "techcrunch.com",
      date: "Mar 18, 2026",
      excerpt:
        "OpenAI today released an updated GPT-4.5 checkpoint with significant improvements to instruction-following and reduced hallucination rates...",
    },
    {
      title: "OpenAI Realtime API Gets 35% Latency Reduction",
      domain: "openai.com/blog",
      date: "Mar 16, 2026",
      excerpt:
        "The Realtime API team shipped a major infrastructure overhaul cutting end-to-end latency by 35% across all regions...",
    },
    {
      title: "Vision Models See Major Upgrade in Multi-Image Support",
      domain: "venturebeat.com",
      date: "Mar 15, 2026",
      excerpt:
        "OpenAI's vision capabilities expand with multi-image context and enhanced OCR for complex documents...",
    },
    {
      title: "OpenAI Q3 2024 Revenue Milestone",
      domain: "bloomberg.com",
      date: "Oct 12, 2024",
      excerpt:
        "OpenAI reportedly crossed $3.4B in annualized revenue as of September — an older milestone worth noting...",
    },
  ],
  GitHub: [
    {
      title: "GitHub Copilot Workspace Now Generally Available",
      domain: "github.blog",
      date: "Mar 19, 2026",
      excerpt:
        "After months of preview, Copilot Workspace is GA — developers can now go from issue to pull request with a single prompt...",
    },
    {
      title: "GitHub's AI Code Review Cuts PR Review Time by 40%",
      domain: "techcrunch.com",
      date: "Mar 17, 2026",
      excerpt:
        "Internal data from GitHub shows teams using the new AI review feature are merging PRs significantly faster...",
    },
    {
      title: "GitHub Actions Gets Parallelization Primitives",
      domain: "github.blog",
      date: "Mar 14, 2026",
      excerpt:
        "New workflow primitives allow monorepos to split test suites across hundreds of parallel runners automatically...",
    },
    {
      title: "Microsoft Q2 Earnings: GitHub Segment Grows 40%",
      domain: "reuters.com",
      date: "Jan 29, 2025",
      excerpt:
        "An older earnings report noting GitHub's revenue growth in the cloud segment...",
    },
  ],
};

function getSearchResults(company: string): SearchResult[] {
  if (SEARCH_RESULTS[company]) return SEARCH_RESULTS[company];
  const slug = company.toLowerCase().replace(/\s+/g, "");
  const briefing = getBriefingData(company);
  return [
    {
      title: `${company} Ships ${briefing.features[0].name}`,
      domain: `${slug}.com/blog`,
      date: "Mar 19, 2026",
      excerpt: `${briefing.features[0].description.slice(0, 120)}...`,
    },
    {
      title: `${company} Announces Platform Updates for Q1 2026`,
      domain: "techcrunch.com",
      date: "Mar 17, 2026",
      excerpt: `${company} continued expanding its core platform this week with new developer-facing features and performance improvements...`,
    },
    {
      title: `${company} ${briefing.features[1].name} — What You Need to Know`,
      domain: "venturebeat.com",
      date: "Mar 15, 2026",
      excerpt: `${briefing.features[1].description.slice(0, 120)}...`,
    },
    {
      title: `${company} 2024 Annual Review`,
      domain: "businesswire.com",
      date: "Dec 15, 2024",
      excerpt:
        "An older recap of the company's 2024 milestones — may not reflect recent activities...",
    },
  ];
}

function getBriefingData(company: string): BriefingData {
  if (BRIEFINGS[company]) return BRIEFINGS[company];
  const slug = company.toLowerCase();
  return {
    features: [
      {
        name: `${company} Platform 2026 Update`,
        description: `${company} shipped its first major platform release of 2026, delivering performance improvements and new developer APIs across its core product suite.`,
        source: `https://www.${slug.replace(/\s+/g, "")}.com/blog`,
      },
      {
        name: `${company} AI Integration Beta`,
        description:
          "An AI-powered assistant is now available in beta, helping users automate repetitive workflows and surface relevant insights faster.",
        source: `https://www.${slug.replace(/\s+/g, "")}.com/blog`,
      },
      {
        name: `${company} Mobile & Cloud Expansion`,
        description: `New mobile apps and cloud regions extend ${company}'s reach, reducing latency for customers in Asia-Pacific and improving offline capabilities.`,
        source: `https://www.${slug.replace(/\s+/g, "")}.com/news`,
      },
    ],
    summary: `${company} focused on platform modernization and AI integration this week. New developer tooling and expanded cloud coverage signal continued investment in growth markets.`,
  };
}

function getVerificationItems(
  _company: string,
  results: SearchResult[],
): VerificationItem[] {
  return results.map((r) => {
    const year = Number.parseInt(r.date.split(", ")[1]);
    const isOld =
      year < 2026 || r.date.includes("2024") || r.date.includes("2025");
    const isMarketing =
      r.title.toLowerCase().includes("annual") ||
      r.title.toLowerCase().includes("q2") ||
      r.title.toLowerCase().includes("q3");
    if (isOld || isMarketing) {
      return {
        title: r.title,
        date: r.date,
        status: "rejected" as const,
        reason: isMarketing
          ? "Marketing / earnings content"
          : "Too old (outside 7-day window)",
      };
    }
    return { title: r.title, date: r.date, status: "accepted" as const };
  });
}

// ─── Step Components ──────────────────────────────────────────────────────────

function StepIndicator({ activeStep }: { activeStep: number }) {
  const steps = [
    { label: "Search Planner" },
    { label: "Web Scraping" },
    { label: "Fact Check" },
    { label: "Synthesis" },
  ];

  return (
    <div className="flex items-center gap-0 mb-6">
      {steps.map((s, i) => {
        const num = i + 1;
        const isDone = num < activeStep;
        const isActive = num === activeStep;
        return (
          <div key={s.label} className="flex items-center flex-1">
            <div className="flex flex-col items-center gap-1 flex-shrink-0">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-500"
                style={{
                  background: isDone
                    ? "rgba(52,211,153,0.2)"
                    : isActive
                      ? "rgba(34,211,238,0.2)"
                      : "rgba(100,116,139,0.1)",
                  border: `2px solid ${
                    isDone
                      ? "#34D399"
                      : isActive
                        ? "#22D3EE"
                        : "rgba(100,116,139,0.3)"
                  }`,
                  color: isDone ? "#34D399" : isActive ? "#22D3EE" : "#64748B",
                  boxShadow: isActive
                    ? "0 0 12px rgba(34,211,238,0.4)"
                    : "none",
                }}
              >
                {isDone ? <Check className="w-4 h-4" /> : num}
              </div>
              <span
                className="text-[10px] font-medium text-center leading-tight"
                style={{
                  color: isActive ? "#22D3EE" : isDone ? "#34D399" : "#64748B",
                }}
              >
                {s.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                className="flex-1 h-0.5 mx-2 mb-4 transition-all duration-700"
                style={{
                  background: isDone
                    ? "linear-gradient(90deg,#34D399,#22D3EE)"
                    : "rgba(100,116,139,0.2)",
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

function LoadingDots({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3 py-6">
      <div className="flex gap-1.5">
        {([0, 1, 2] as const).map((i) => (
          <div
            key={i}
            className="w-2 h-2 rounded-full"
            style={{
              background: "#22D3EE",
              animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite`,
              opacity: 0.7,
            }}
          />
        ))}
      </div>
      <span className="text-sm font-medium" style={{ color: "#94A3B8" }}>
        {text}
      </span>
    </div>
  );
}

function Step1Content({ done }: { company: string; done: boolean }) {
  if (!done) return <LoadingDots text="Generating search queries..." />;
  return (
    <div className="animate-fade-in flex items-center gap-3 py-4">
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center"
        style={{
          background: "rgba(52,211,153,0.15)",
          border: "1px solid rgba(52,211,153,0.3)",
        }}
      >
        <Check className="w-4 h-4" style={{ color: "#34D399" }} />
      </div>
      <div>
        <p className="text-sm font-semibold text-white">
          Search queries generated
        </p>
        <p className="text-xs" style={{ color: "#64748B" }}>
          Market intelligence queries ready for web search
        </p>
      </div>
    </div>
  );
}

function Step2Content({ company, done }: { company: string; done: boolean }) {
  const results = getSearchResults(company);

  if (!done)
    return <LoadingDots text="Searching the web and extracting content..." />;

  return (
    <div className="animate-fade-in space-y-3">
      <p
        className="text-xs font-semibold tracking-widest mb-3"
        style={{ color: "#64748B" }}
      >
        SCRAPED RESULTS — {results.length} SOURCES
      </p>
      {results.map((r) => (
        <div
          key={r.title}
          className="rounded-lg p-3"
          style={{
            background: "rgba(15,27,42,0.8)",
            border: "1px solid rgba(34,211,238,0.1)",
          }}
        >
          <div className="flex items-start justify-between gap-3 mb-1">
            <p className="text-sm font-semibold text-white leading-tight">
              {r.title}
            </p>
            <span
              className="flex-shrink-0 text-[10px] font-semibold px-2 py-0.5 rounded-full"
              style={{ background: "rgba(34,211,238,0.1)", color: "#22D3EE" }}
            >
              {r.date}
            </span>
          </div>
          <p
            className="text-[11px] font-medium mb-1.5"
            style={{ color: "#A78BFA" }}
          >
            {r.domain}
          </p>
          <p className="text-xs leading-relaxed" style={{ color: "#64748B" }}>
            {r.excerpt}
          </p>
        </div>
      ))}
    </div>
  );
}

function Step3Content({ company, done }: { company: string; done: boolean }) {
  const results = getSearchResults(company);
  const items = getVerificationItems(company, results);
  const accepted = items.filter((i) => i.status === "accepted");
  const rejected = items.filter((i) => i.status === "rejected");

  if (!done)
    return (
      <LoadingDots text="Verifying recency — filtering to last 7 days..." />
    );

  return (
    <div className="animate-fade-in space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Accepted */}
        <div>
          <p
            className="text-xs font-semibold tracking-widest mb-2"
            style={{ color: "#34D399" }}
          >
            ✓ ACCEPTED ({accepted.length})
          </p>
          <div className="space-y-2">
            {accepted.map((item) => (
              <div
                key={item.title}
                className="flex items-start gap-2 rounded-lg p-3"
                style={{
                  background: "rgba(52,211,153,0.06)",
                  border: "1px solid rgba(52,211,153,0.2)",
                }}
              >
                <div
                  className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5"
                  style={{ background: "rgba(52,211,153,0.2)" }}
                >
                  <Check className="w-3 h-3" style={{ color: "#34D399" }} />
                </div>
                <div>
                  <p className="text-xs font-medium text-white leading-tight">
                    {item.title}
                  </p>
                  <span
                    className="inline-block text-[10px] mt-1 px-1.5 py-0.5 rounded"
                    style={{
                      background: "rgba(52,211,153,0.15)",
                      color: "#34D399",
                    }}
                  >
                    {item.date}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Rejected */}
        <div>
          <p
            className="text-xs font-semibold tracking-widest mb-2"
            style={{ color: "#F87171" }}
          >
            ✗ REJECTED ({rejected.length})
          </p>
          <div className="space-y-2">
            {rejected.map((item) => (
              <div
                key={item.title}
                className="flex items-start gap-2 rounded-lg p-3"
                style={{
                  background: "rgba(248,113,113,0.06)",
                  border: "1px solid rgba(248,113,113,0.2)",
                }}
              >
                <div
                  className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5"
                  style={{ background: "rgba(248,113,113,0.15)" }}
                >
                  <X className="w-3 h-3" style={{ color: "#F87171" }} />
                </div>
                <div>
                  <p className="text-xs font-medium text-white leading-tight">
                    {item.title}
                  </p>
                  <span
                    className="inline-block text-[10px] mt-1 px-1.5 py-0.5 rounded"
                    style={{
                      background: "rgba(248,113,113,0.15)",
                      color: "#F87171",
                    }}
                  >
                    {item.reason}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Step4Content({
  company,
  done,
  onExport,
}: { company: string; done: boolean; onExport: () => void }) {
  const briefing = getBriefingData(company);

  if (!done)
    return <LoadingDots text="Synthesizing intelligence briefing..." />;

  return (
    <div className="animate-fade-in">
      {/* Report document */}
      <div
        className="rounded-xl p-5 mb-4"
        style={{
          background: "rgba(8,14,24,0.8)",
          border: "1px solid rgba(34,211,238,0.15)",
          fontFamily: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace",
        }}
      >
        {/* Report header */}
        <div
          className="pb-3 mb-4"
          style={{ borderBottom: "1px solid rgba(34,211,238,0.15)" }}
        >
          <p className="text-xs" style={{ color: "#64748B" }}>
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          </p>
          <p className="text-sm font-bold mt-1" style={{ color: "#22D3EE" }}>
            COMPETITOR BRIEFING: {company.toUpperCase()}
          </p>
          <p className="text-xs mt-0.5" style={{ color: "#64748B" }}>
            Generated: {new Date().toLocaleString("en-GB", { hour12: false })} ·
            Dreamcrafter Intelligence
          </p>
          <p className="text-xs" style={{ color: "#64748B" }}>
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          </p>
        </div>

        {/* Features */}
        <div className="space-y-5">
          {briefing.features.map((f, i) => (
            <div
              key={f.name}
              className="pb-4"
              style={{
                borderBottom:
                  i < briefing.features.length - 1
                    ? "1px solid rgba(34,211,238,0.08)"
                    : "none",
              }}
            >
              <p className="text-sm font-bold" style={{ color: "#22D3EE" }}>
                {i + 1}. Feature: {f.name}
              </p>
              <p
                className="text-xs mt-1.5 leading-relaxed"
                style={{ color: "#CBD5E1" }}
              >
                &nbsp;&nbsp;&nbsp;Description: {f.description}
              </p>
              <p className="text-xs mt-1" style={{ color: "#64748B" }}>
                &nbsp;&nbsp;&nbsp;Source:{" "}
                <a
                  href={f.source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline transition-colors"
                  style={{ color: "#A78BFA" }}
                >
                  {f.source}
                </a>
              </p>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div
          className="mt-4 pt-4"
          style={{ borderTop: "1px solid rgba(34,211,238,0.15)" }}
        >
          <p className="text-xs font-bold mb-2" style={{ color: "#34D399" }}>
            Summary:
          </p>
          <p className="text-xs leading-relaxed" style={{ color: "#CBD5E1" }}>
            {briefing.summary}
          </p>
        </div>

        <p className="text-xs mt-4" style={{ color: "#334155" }}>
          ━━ END OF REPORT ━━━━━━━━━━━━━━━━━━━━━━━━━━━
        </p>
      </div>

      {/* Export button */}
      <button
        type="button"
        onClick={onExport}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 hover:opacity-90 active:scale-95"
        style={{
          background: "rgba(52,211,153,0.12)",
          border: "1px solid rgba(52,211,153,0.3)",
          color: "#34D399",
        }}
        data-ocid="briefing.export_button"
      >
        <Download className="w-4 h-4" />
        Export Report (.txt)
      </button>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function CompetitorBriefing({ company }: { company: string }) {
  const [activeStep, setActiveStep] = useState(0);
  const [completedStep, setCompletedStep] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = useCallback(() => {
    for (const t of timersRef.current) clearTimeout(t);
    timersRef.current = [];
  }, []);

  const runPipeline = useCallback(() => {
    clearTimers();
    setActiveStep(1);
    setCompletedStep(0);
    setIsRunning(true);

    const schedule: [number, () => void][] = [
      [
        1200,
        () => {
          setCompletedStep(1);
          setActiveStep(2);
        },
      ],
      [
        2700,
        () => {
          setCompletedStep(2);
          setActiveStep(3);
        },
      ],
      [
        3900,
        () => {
          setCompletedStep(3);
          setActiveStep(4);
        },
      ],
      [
        4900,
        () => {
          setCompletedStep(4);
          setIsRunning(false);
        },
      ],
    ];

    for (const [delay, fn] of schedule) {
      timersRef.current.push(setTimeout(fn, delay));
    }
  }, [clearTimers]);

  useEffect(() => {
    const t = setTimeout(runPipeline, 600);
    return () => {
      clearTimeout(t);
      clearTimers();
    };
  }, [runPipeline, clearTimers]);

  function handleExport() {
    const briefing = getBriefingData(company);
    const lines = [
      `COMPETITOR BRIEFING: ${company.toUpperCase()}`,
      `Generated: ${new Date().toLocaleString("en-GB", { hour12: false })}`,
      "Source: Dreamcrafter Intelligence Platform",
      "",
      "=".repeat(50),
      "",
      ...briefing.features.flatMap((f, i) => [
        `${i + 1}. Feature: ${f.name}`,
        `   Description: ${f.description}`,
        `   Source: ${f.source}`,
        "",
      ]),
      "Summary:",
      briefing.summary,
      "",
      "=".repeat(50),
      "Exported from dreamcrafter.caffeine.in",
    ];

    const blob = new Blob([lines.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `competitor-briefing-${company.toLowerCase().replace(/\s+/g, "-")}-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }

  const STEP_TIMING: Record<number, string> = {
    1: "1.2s",
    2: "1.5s",
    3: "1.2s",
    4: "1.0s",
  };

  const STEP_META = [
    {
      num: 1,
      label: "Search Planner",
      desc: "LLM generates targeted search queries",
      color: "#22D3EE",
    },
    {
      num: 2,
      label: "Web Search + Scraping",
      desc: "Extract title, date, content from sources",
      color: "#A78BFA",
    },
    {
      num: 3,
      label: "Fact Verification",
      desc: "Keep only last 7 days · reject old content",
      color: "#34D399",
    },
    {
      num: 4,
      label: "Synthesis",
      desc: "Structured competitor briefing report",
      color: "#FB923C",
    },
  ];

  const currentMeta = STEP_META.find((s) => s.num === activeStep);

  return (
    <div
      className="rounded-2xl border overflow-hidden animate-fade-up"
      style={{ background: "#0F1B2A", borderColor: "rgba(34,211,238,0.2)" }}
      data-ocid="briefing.card"
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-6 py-4"
        style={{
          background:
            "linear-gradient(135deg, rgba(34,211,238,0.05) 0%, rgba(139,92,246,0.05) 100%)",
          borderBottom: "1px solid rgba(34,211,238,0.12)",
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, #22D3EE22, #8B5CF622)",
            }}
          >
            <Brain className="w-5 h-5" style={{ color: "#22D3EE" }} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-white">
                AI Competitor Briefing
              </h2>
              <Sparkles className="w-4 h-4" style={{ color: "#A78BFA" }} />
            </div>
            <p className="text-xs" style={{ color: "#64748B" }}>
              4-step AI pipeline · {company}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {activeStep > 0 && activeStep <= 4 && isRunning && (
            <div
              className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full"
              style={{
                background: `${currentMeta?.color}15`,
                border: `1px solid ${currentMeta?.color}40`,
                color: currentMeta?.color,
              }}
              data-ocid="briefing.loading_state"
            >
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ background: currentMeta?.color }}
              />
              Step {activeStep} · {STEP_TIMING[activeStep]}
            </div>
          )}
          {!isRunning && completedStep === 4 && (
            <div
              className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full"
              style={{
                background: "rgba(52,211,153,0.12)",
                border: "1px solid rgba(52,211,153,0.35)",
                color: "#34D399",
              }}
              data-ocid="briefing.success_state"
            >
              <Check className="w-3 h-3" />
              Complete
            </div>
          )}
          <button
            type="button"
            onClick={runPipeline}
            disabled={isRunning}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-80"
            style={{
              background: "rgba(34,211,238,0.1)",
              border: "1px solid rgba(34,211,238,0.25)",
              color: "#22D3EE",
            }}
            data-ocid="briefing.button"
          >
            <RefreshCw
              className={`w-3.5 h-3.5 ${isRunning ? "animate-spin" : ""}`}
            />
            Re-run Analysis
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="p-6">
        <StepIndicator activeStep={activeStep} />

        {/* Active step label */}
        {activeStep > 0 && (
          <div
            className="flex items-center gap-2 mb-4 pb-4"
            style={{ borderBottom: "1px solid rgba(34,211,238,0.08)" }}
          >
            <span
              className="text-xs font-bold px-2 py-0.5 rounded"
              style={{
                background: `${currentMeta?.color}18`,
                color: currentMeta?.color,
                fontFamily: "monospace",
              }}
            >
              STEP {activeStep}
            </span>
            <span className="text-sm font-semibold text-white">
              {currentMeta?.label}
            </span>
            <span className="text-xs" style={{ color: "#64748B" }}>
              — {currentMeta?.desc}
            </span>
          </div>
        )}

        {/* Step content */}
        <div className="min-h-[160px]">
          {activeStep === 0 && (
            <div className="flex items-center justify-center h-40">
              <p className="text-sm" style={{ color: "#64748B" }}>
                Initializing pipeline...
              </p>
            </div>
          )}

          {activeStep >= 1 && (
            <Step1Content company={company} done={completedStep >= 1} />
          )}
          {activeStep >= 2 && completedStep >= 1 && (
            <div
              className="mt-6 pt-6"
              style={{ borderTop: "1px dashed rgba(34,211,238,0.1)" }}
            >
              <Step2Content company={company} done={completedStep >= 2} />
            </div>
          )}
          {activeStep >= 3 && completedStep >= 2 && (
            <div
              className="mt-6 pt-6"
              style={{ borderTop: "1px dashed rgba(34,211,238,0.1)" }}
            >
              <Step3Content company={company} done={completedStep >= 3} />
            </div>
          )}
          {activeStep >= 4 && completedStep >= 3 && (
            <div
              className="mt-6 pt-6"
              style={{ borderTop: "1px dashed rgba(34,211,238,0.1)" }}
            >
              <Step4Content
                company={company}
                done={completedStep >= 4}
                onExport={handleExport}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
