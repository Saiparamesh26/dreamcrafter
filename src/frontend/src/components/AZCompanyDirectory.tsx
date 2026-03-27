import {
  COMPANY_SOURCE_URLS,
  FALLBACK_URLS,
  type SourceKey,
} from "@/data/companySourceUrls";
import {
  BookOpen,
  Briefcase,
  Code2,
  ExternalLink,
  Newspaper,
  Rss,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { motion } from "motion/react";

interface CompanyEntry {
  name: string;
  industry: string;
  ceo: string;
  founded: number;
  hq: string;
  website: string;
  careers: string;
}

const AZ_COMPANIES: CompanyEntry[] = [
  {
    name: "Anthropic",
    industry: "AI Safety",
    ceo: "Dario Amodei",
    founded: 2021,
    hq: "San Francisco, CA",
    website: "https://anthropic.com",
    careers: "https://www.anthropic.com/careers",
  },
  {
    name: "Atlassian",
    industry: "Collaboration",
    ceo: "Scott Farquhar",
    founded: 2002,
    hq: "Sydney, Australia",
    website: "https://atlassian.com",
    careers: "https://www.atlassian.com/company/careers",
  },
  {
    name: "Figma",
    industry: "Design Tools",
    ceo: "Dylan Field",
    founded: 2012,
    hq: "San Francisco, CA",
    website: "https://figma.com",
    careers: "https://www.figma.com/careers/",
  },
  {
    name: "GitHub",
    industry: "Developer Tools",
    ceo: "Thomas Dohmke",
    founded: 2008,
    hq: "San Francisco, CA",
    website: "https://github.com",
    careers: "https://github.com/about/careers",
  },
  {
    name: "GitLab",
    industry: "DevOps",
    ceo: "Sid Sijbrandij",
    founded: 2011,
    hq: "San Francisco, CA",
    website: "https://gitlab.com",
    careers: "https://about.gitlab.com/jobs/",
  },
  {
    name: "HashiCorp",
    industry: "Infrastructure",
    ceo: "Armon Dadgar",
    founded: 2012,
    hq: "San Francisco, CA",
    website: "https://hashicorp.com",
    careers: "https://www.hashicorp.com/careers",
  },
  {
    name: "Linear",
    industry: "Project Management",
    ceo: "Karri Saarinen",
    founded: 2019,
    hq: "San Francisco, CA",
    website: "https://linear.app",
    careers: "https://linear.app/careers",
  },
  {
    name: "Notion",
    industry: "Productivity",
    ceo: "Ivan Zhao",
    founded: 2016,
    hq: "San Francisco, CA",
    website: "https://notion.so",
    careers: "https://www.notion.so/about#careers",
  },
  {
    name: "OpenAI",
    industry: "AI Research",
    ceo: "Sam Altman",
    founded: 2015,
    hq: "San Francisco, CA",
    website: "https://openai.com",
    careers: "https://openai.com/careers",
  },
  {
    name: "Slack",
    industry: "Communication",
    ceo: "Denise Dresser",
    founded: 2013,
    hq: "San Francisco, CA",
    website: "https://slack.com",
    careers: "https://slack.com/careers",
  },
  {
    name: "Stripe",
    industry: "Fintech",
    ceo: "Patrick Collison",
    founded: 2010,
    hq: "San Francisco, CA",
    website: "https://stripe.com",
    careers: "https://stripe.com/jobs",
  },
  {
    name: "Vercel",
    industry: "Cloud Infrastructure",
    ceo: "Guillermo Rauch",
    founded: 2015,
    hq: "San Francisco, CA",
    website: "https://vercel.com",
    careers: "https://vercel.com/careers",
  },
];

const QUICK_ACCESS: {
  label: string;
  key: SourceKey;
  icon: React.ElementType;
  color: string;
}[] = [
  {
    label: "Release Notes",
    key: "releaseNotes",
    icon: BookOpen,
    color: "#22D3EE",
  },
  { label: "New Features", key: "features", icon: Sparkles, color: "#A78BFA" },
  { label: "Press Release", key: "press", icon: Newspaper, color: "#34D399" },
  { label: "Dev Updates", key: "devUpdates", icon: Code2, color: "#FB923C" },
];

const SOURCE_TAGS: {
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

const INDUSTRY_COLORS: Record<string, string> = {
  "AI Safety": "#34D399",
  "AI Research": "#22D3EE",
  "Developer Tools": "#A78BFA",
  "Design Tools": "#F472B6",
  Fintech: "#FBBF24",
  Productivity: "#FB923C",
  "Project Management": "#60A5FA",
  Communication: "#34D399",
  Collaboration: "#A78BFA",
  DevOps: "#F87171",
  Infrastructure: "#FBBF24",
  "Cloud Infrastructure": "#22D3EE",
};

function getUrl(company: string, key: SourceKey): string {
  const urls = COMPANY_SOURCE_URLS[company];
  if (urls) return urls[key];
  return FALLBACK_URLS[key](company);
}

interface CompanyCardProps {
  company: CompanyEntry;
  index: number;
}

function CompanyCard({ company, index }: CompanyCardProps) {
  const industryColor = INDUSTRY_COLORS[company.industry] ?? "#94A3B8";
  const domain = company.website.replace(/^https?:\/\//, "");

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: "easeOut" }}
      className="rounded-2xl border flex flex-col"
      style={{
        background: "#0F1B2A",
        borderColor: "rgba(34,211,238,0.18)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
      }}
      data-ocid={`az.item.${index + 1}`}
    >
      {/* Card header */}
      <div
        className="px-5 pt-5 pb-4"
        style={{
          background:
            "linear-gradient(135deg, rgba(34,211,238,0.04) 0%, rgba(139,92,246,0.03) 100%)",
          borderBottom: "1px solid rgba(34,211,238,0.1)",
        }}
      >
        {/* Industry badge */}
        <span
          className="inline-block text-[9px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full mb-3"
          style={{
            color: industryColor,
            background: `${industryColor}14`,
            border: `1px solid ${industryColor}30`,
          }}
        >
          {company.industry}
        </span>

        {/* Company name */}
        <h3 className="text-xl font-extrabold text-white mb-3 tracking-tight">
          {company.name}
        </h3>

        {/* Info pills */}
        <div className="flex flex-wrap gap-2 mb-2">
          {[
            { label: "CEO", value: company.ceo },
            { label: "Founded", value: String(company.founded) },
            { label: "HQ", value: company.hq },
          ].map((pill) => (
            <div
              key={pill.label}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <span style={{ color: "#64748B" }}>{pill.label}:</span>
              <span style={{ color: "#CBD5E1" }}>{pill.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick access links */}
      <div
        className="px-5 py-4"
        style={{ borderBottom: "1px solid rgba(34,211,238,0.08)" }}
      >
        <p
          className="text-[10px] font-semibold tracking-widest uppercase mb-2.5"
          style={{ color: "#475569" }}
        >
          Quick Access
        </p>
        <div className="grid grid-cols-2 gap-1.5">
          {QUICK_ACCESS.map((qa) => {
            const Icon = qa.icon;
            return (
              <a
                key={qa.key}
                href={getUrl(company.name, qa.key)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-medium transition-all hover:opacity-80"
                style={{
                  color: qa.color,
                  background: `${qa.color}10`,
                  border: `1px solid ${qa.color}25`,
                  textDecoration: "none",
                }}
                data-ocid="az.link"
              >
                <Icon className="w-3 h-3 shrink-0" />
                <span className="truncate">{qa.label}</span>
              </a>
            );
          })}
        </div>
      </div>

      {/* Intelligence source tags */}
      <div
        className="px-5 py-3"
        style={{ borderBottom: "1px solid rgba(34,211,238,0.08)" }}
      >
        <div className="flex flex-wrap gap-1.5">
          {SOURCE_TAGS.map((tag) => (
            <a
              key={tag.key}
              href={getUrl(company.name, tag.key)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[9px] font-semibold px-2 py-0.5 rounded-full tracking-wide transition-opacity hover:opacity-75"
              style={{
                color: tag.color,
                background: tag.bg,
                border: `1px solid ${tag.border}`,
                textDecoration: "none",
              }}
            >
              {tag.label}
            </a>
          ))}
        </div>
      </div>

      {/* Open Roles */}
      <div
        className="px-5 py-3"
        style={{ borderBottom: "1px solid rgba(34,211,238,0.08)" }}
      >
        <a
          href={company.careers}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-xs font-semibold transition-all hover:opacity-80"
          style={{ color: "#A78BFA", textDecoration: "none" }}
          data-ocid="az.button"
        >
          <Briefcase className="w-3.5 h-3.5" />
          <span>💼 Open Roles</span>
          <span
            className="ml-auto text-[9px] font-normal"
            style={{ color: "#64748B" }}
          >
            View Careers →
          </span>
        </a>
      </div>

      {/* Footer: official site */}
      <div className="px-5 py-3 mt-auto">
        <a
          href={company.website}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-[11px] font-semibold transition-all hover:opacity-80"
          style={{ color: "#22D3EE", textDecoration: "none" }}
          data-ocid="az.link"
        >
          <ExternalLink className="w-3 h-3" />
          {domain}
        </a>
      </div>
    </motion.div>
  );
}

export default function AZCompanyDirectory() {
  return (
    <div>
      {/* Section header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4" style={{ color: "#22D3EE" }} />
            <span
              className="text-[10px] font-bold tracking-widest uppercase"
              style={{ color: "#22D3EE" }}
            >
              Company Directory
            </span>
          </div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight">
            A–Z Company Directory
          </h2>
          <p className="text-sm mt-1" style={{ color: "#64748B" }}>
            All tracked companies and quick access links
          </p>
        </div>
        <div
          className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold"
          style={{
            background: "rgba(34,211,238,0.06)",
            border: "1px solid rgba(34,211,238,0.18)",
            color: "#22D3EE",
          }}
        >
          <Rss className="w-3.5 h-3.5" />
          {AZ_COMPANIES.length} companies tracked
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {AZ_COMPANIES.map((company, i) => (
          <CompanyCard key={company.name} company={company} index={i} />
        ))}
      </div>
    </div>
  );
}
