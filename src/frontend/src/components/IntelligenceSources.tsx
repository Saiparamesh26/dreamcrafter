import {
  COMPANY_SOURCE_URLS,
  FALLBACK_URLS,
  type SourceKey,
} from "@/data/companySourceUrls";
import {
  BookOpen,
  FileText,
  Layers,
  Newspaper,
  Radio,
  Rss,
} from "lucide-react";

interface IntelligenceSourcesProps {
  company?: string;
}

const sources: {
  id: SourceKey;
  label: string;
  icon: React.ElementType;
  color: string;
  description: string;
}[] = [
  {
    id: "releaseNotes",
    label: "Release Notes",
    icon: FileText,
    color: "#22D3EE",
    description: "Official version releases & changelogs",
  },
  {
    id: "features",
    label: "Features",
    icon: Layers,
    color: "#34D399",
    description: "Product announcements & feature drops",
  },
  {
    id: "press",
    label: "Press",
    icon: Newspaper,
    color: "#EC4899",
    description: "News articles & media coverage",
  },
  {
    id: "devUpdates",
    label: "Dev Updates",
    icon: Rss,
    color: "#8B5CF6",
    description: "Engineering blog & API changes",
  },
  {
    id: "strategy",
    label: "Strategy",
    icon: BookOpen,
    color: "#F59E0B",
    description: "Vision, roadmap & strategic moves",
  },
  {
    id: "news",
    label: "News",
    icon: Radio,
    color: "#FB7185",
    description: "Real-time coverage & breaking news",
  },
];

export default function IntelligenceSources({
  company = "OpenAI",
}: IntelligenceSourcesProps) {
  const companyUrls = COMPANY_SOURCE_URLS[company];

  function getUrl(sourceId: SourceKey): string {
    if (companyUrls) return companyUrls[sourceId];
    return FALLBACK_URLS[sourceId](company);
  }

  return (
    <div
      className="animate-fade-up delay-800 rounded-xl border p-6"
      style={{ background: "#0F1B2A", borderColor: "#223046" }}
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2
            className="text-xl font-bold"
            style={{
              background: "linear-gradient(135deg,#22D3EE,#8B5CF6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Intelligence Sources
          </h2>
          <p className="text-xs mt-1" style={{ color: "#64748B" }}>
            Quick access to {company} signals across 6 intelligence categories
          </p>
        </div>
        <span
          className="text-xs font-semibold px-3 py-1 rounded-full"
          style={{
            background: "rgba(139,92,246,0.1)",
            color: "#8B5CF6",
            border: "1px solid rgba(139,92,246,0.25)",
          }}
        >
          6 SOURCES
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {sources.map((source, i) => {
          const Icon = source.icon;
          const url = getUrl(source.id);
          const delays = [
            "delay-900",
            "delay-1000",
            "delay-1100",
            "delay-1200",
            "delay-1400",
            "delay-1600",
          ];

          return (
            <a
              key={source.id}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              data-ocid={`sources.item.${i + 1}`}
              className={`animate-fade-up ${delays[i]} card-glow group flex flex-col gap-3 rounded-xl p-4 transition-all duration-300 cursor-pointer`}
              style={{
                background: `linear-gradient(135deg, ${source.color}08 0%, rgba(15,27,42,0.8) 100%)`,
                border: `1px solid ${source.color}20`,
                textDecoration: "none",
              }}
            >
              <div className="flex items-center justify-between">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center transition-transform duration-200 group-hover:scale-110"
                  style={{
                    background: `${source.color}18`,
                    boxShadow: `0 0 12px ${source.color}20`,
                  }}
                >
                  <Icon className="w-4 h-4" style={{ color: source.color }} />
                </div>
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  style={{ background: `${source.color}20` }}
                >
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M2 8L8 2M8 2H4M8 2V6"
                      stroke={source.color}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold text-white group-hover:text-opacity-90">
                  {source.label}
                </p>
                <p className="text-xs mt-0.5" style={{ color: "#64748B" }}>
                  {source.description}
                </p>
              </div>

              <div
                className="h-0.5 rounded-full opacity-40 group-hover:opacity-80 transition-opacity duration-200"
                style={{
                  background: `linear-gradient(90deg,${source.color},transparent)`,
                }}
              />
            </a>
          );
        })}
      </div>
    </div>
  );
}
