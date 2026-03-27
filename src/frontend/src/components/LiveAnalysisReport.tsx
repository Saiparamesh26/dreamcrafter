import {
  Code,
  Download,
  FileText,
  Newspaper,
  Sparkles,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { Legend, ResponsiveContainer, Tooltip } from "recharts";

interface LiveAnalysisReportProps {
  company?: string;
}

const categories = [
  {
    id: "release_notes",
    label: "Release Notes",
    icon: FileText,
    color: "#22D3EE",
    current: 28,
    change: 16.7,
    up: true,
    insight: "Major v3.2 release cycle detected across 4 competitors",
  },
  {
    id: "features",
    label: "Features",
    icon: Sparkles,
    color: "#34D399",
    current: 25,
    change: 8.7,
    up: true,
    insight: "AI-assisted workflows trending heavily this week",
  },
  {
    id: "press",
    label: "Press",
    icon: Newspaper,
    color: "#EC4899",
    current: 18,
    change: -5.3,
    up: false,
    insight: "Press coverage dipped post-conference cycle",
  },
  {
    id: "dev_updates",
    label: "Dev Updates",
    icon: Code,
    color: "#8B5CF6",
    current: 38,
    change: 22.6,
    up: true,
    insight: "Significant API-breaking changes flagged in 2 platforms",
  },
];

interface SignalCard {
  id: string;
  title: string;
  bullets: string[];
  tag: string;
  tagColor: string;
  accentColor: string;
  date: string;
  badge: string;
  icon: string;
}

const companySignals: Record<string, SignalCard[]> = {
  GitHub: [
    {
      id: "funding",
      title: "GitHub (Microsoft) \u2014 Funding & Investment 2025",
      bullets: [
        "Microsoft's $10B+ ongoing investment in GitHub infrastructure",
        "GitHub Copilot revenue estimated at $1B+ ARR milestone",
        "GitHub Advanced Security enterprise tier expansion funded",
      ],
      tag: "FUNDING",
      tagColor: "#22D3EE",
      accentColor: "#22D3EE",
      date: "2025",
      badge: "2025",
      icon: "\uD83D\uDCB0",
    },
    {
      id: "hiring",
      title: "GitHub \u2014 Hiring & Layoffs 2025",
      bullets: [
        "GitHub headcount ~3,000+ globally",
        "Hiring focus on AI/ML, Copilot, and platform reliability",
        "No major layoffs \u2014 steady growth under Microsoft umbrella",
      ],
      tag: "WORKFORCE",
      tagColor: "#34D399",
      accentColor: "#34D399",
      date: "Q1 2025",
      badge: "LIVE",
      icon: "\uD83D\uDC65",
    },
    {
      id: "partnerships",
      title: "GitHub \u2014 Partnerships & Acquisitions 2025",
      bullets: [
        "GitHub + OpenAI deep Copilot integration (GPT-4o powered)",
        "GitHub acquired Trunk.io for code quality tooling",
        "Microsoft Azure tighter integration for enterprise workflows",
      ],
      tag: "M&A",
      tagColor: "#8B5CF6",
      accentColor: "#8B5CF6",
      date: "2025",
      badge: "2025",
      icon: "\uD83E\uDD1D",
    },
  ],
  Stripe: [
    {
      id: "funding",
      title: "Stripe \u2014 Funding & Valuation 2025",
      bullets: [
        "Stripe valued at $65B in latest secondary market transactions",
        "Stripe processes $1T+ in total payment volume milestone",
        "No new primary round; strong profitability signals",
      ],
      tag: "FUNDING",
      tagColor: "#22D3EE",
      accentColor: "#22D3EE",
      date: "2025",
      badge: "2025",
      icon: "\uD83D\uDCB0",
    },
    {
      id: "hiring",
      title: "Stripe \u2014 Hiring & Layoffs 2025",
      bullets: [
        "Stripe headcount ~8,000+ employees globally",
        "Hiring focused on financial infrastructure, global expansion",
        "Restructuring in 2023 complete; net hiring growth in 2025",
      ],
      tag: "WORKFORCE",
      tagColor: "#34D399",
      accentColor: "#34D399",
      date: "Q1 2025",
      badge: "LIVE",
      icon: "\uD83D\uDC65",
    },
    {
      id: "partnerships",
      title: "Stripe \u2014 Partnerships & Acquisitions 2025",
      bullets: [
        "Stripe + Shopify deeper payment infrastructure partnership",
        "Stripe acquired Lemon Squeezy for indie developer payments",
        "Expanding into 50+ new markets with local payment methods",
      ],
      tag: "M&A",
      tagColor: "#8B5CF6",
      accentColor: "#8B5CF6",
      date: "2025",
      badge: "2025",
      icon: "\uD83E\uDD1D",
    },
  ],
  Notion: [
    {
      id: "funding",
      title: "Notion \u2014 Funding & Valuation 2025",
      bullets: [
        "Notion valued at $10B after Series C led by Sequoia",
        "Notion AI driving significant revenue uplift in 2025",
        "Exploring IPO pathways; banker conversations underway",
      ],
      tag: "FUNDING",
      tagColor: "#22D3EE",
      accentColor: "#22D3EE",
      date: "2025",
      badge: "2025",
      icon: "\uD83D\uDCB0",
    },
    {
      id: "hiring",
      title: "Notion \u2014 Hiring & Layoffs 2025",
      bullets: [
        "Notion headcount ~800 employees globally",
        "Strong hiring in AI product, enterprise sales, and design",
        "No layoffs reported \u2014 headcount growing steadily",
      ],
      tag: "WORKFORCE",
      tagColor: "#34D399",
      accentColor: "#34D399",
      date: "Q1 2025",
      badge: "LIVE",
      icon: "\uD83D\uDC65",
    },
    {
      id: "partnerships",
      title: "Notion \u2014 Partnerships & Acquisitions 2025",
      bullets: [
        "Notion + Slack deeper integration announced",
        "Notion Sites launched as competitor to Webflow/Squarespace",
        "Partnership with Figma for embedded design-in-docs workflow",
      ],
      tag: "M&A",
      tagColor: "#8B5CF6",
      accentColor: "#8B5CF6",
      date: "2025",
      badge: "2025",
      icon: "\uD83E\uDD1D",
    },
  ],
  Linear: [
    {
      id: "funding",
      title: "Linear \u2014 Funding & Valuation 2025",
      bullets: [
        "Linear raised Series B at $400M valuation",
        "Linear reaches profitability milestone \u2014 no new round needed",
        "Strong ARR growth driven by enterprise tier adoption",
      ],
      tag: "FUNDING",
      tagColor: "#22D3EE",
      accentColor: "#22D3EE",
      date: "2025",
      badge: "2025",
      icon: "\uD83D\uDCB0",
    },
    {
      id: "hiring",
      title: "Linear \u2014 Hiring & Layoffs 2025",
      bullets: [
        "Linear stays intentionally small: ~100 employees",
        "Selective hiring in engineering and customer success",
        "Known for high output-per-employee culture",
      ],
      tag: "WORKFORCE",
      tagColor: "#34D399",
      accentColor: "#34D399",
      date: "Q1 2025",
      badge: "LIVE",
      icon: "\uD83D\uDC65",
    },
    {
      id: "partnerships",
      title: "Linear \u2014 Partnerships & Acquisitions 2025",
      bullets: [
        "Linear + GitHub deep issues-to-PR workflow integration",
        "Linear Asks feature built with Slack API partnership",
        "No acquisitions \u2014 organic product growth focus",
      ],
      tag: "M&A",
      tagColor: "#8B5CF6",
      accentColor: "#8B5CF6",
      date: "2025",
      badge: "2025",
      icon: "\uD83E\uDD1D",
    },
  ],
  Vercel: [
    {
      id: "funding",
      title: "Vercel \u2014 Funding & Valuation 2025",
      bullets: [
        "Vercel raised $250M Series E at $3.25B valuation",
        "Strong revenue from Next.js enterprise and Edge Network",
        "Focused on AI-native deployment infrastructure investment",
      ],
      tag: "FUNDING",
      tagColor: "#22D3EE",
      accentColor: "#22D3EE",
      date: "2025",
      badge: "2025",
      icon: "\uD83D\uDCB0",
    },
    {
      id: "hiring",
      title: "Vercel \u2014 Hiring & Layoffs 2025",
      bullets: [
        "Vercel headcount ~700 employees globally",
        "Hiring focused on AI, edge compute, and developer experience",
        "No major layoffs; growth trajectory maintained",
      ],
      tag: "WORKFORCE",
      tagColor: "#34D399",
      accentColor: "#34D399",
      date: "Q1 2025",
      badge: "LIVE",
      icon: "\uD83D\uDC65",
    },
    {
      id: "partnerships",
      title: "Vercel \u2014 Partnerships & Acquisitions 2025",
      bullets: [
        "Vercel + AI SDK integrations with OpenAI and Anthropic",
        "Vercel acquired Splitbee for analytics capabilities",
        "Deep partnership with AWS and Cloudflare for edge delivery",
      ],
      tag: "M&A",
      tagColor: "#8B5CF6",
      accentColor: "#8B5CF6",
      date: "2025",
      badge: "2025",
      icon: "\uD83E\uDD1D",
    },
  ],
  Figma: [
    {
      id: "funding",
      title: "Figma \u2014 Funding & Valuation 2025",
      bullets: [
        "Figma valued at $12.5B after Adobe acquisition collapsed",
        "Figma exploring IPO in 2025-2026 window",
        "Strong ARR growth driven by Figma AI and Dev Mode",
      ],
      tag: "FUNDING",
      tagColor: "#22D3EE",
      accentColor: "#22D3EE",
      date: "2025",
      badge: "2025",
      icon: "\uD83D\uDCB0",
    },
    {
      id: "hiring",
      title: "Figma \u2014 Hiring & Layoffs 2025",
      bullets: [
        "Figma headcount ~1,400 employees globally",
        "Aggressive hiring in AI, developer tooling, and enterprise",
        "No layoffs post-Adobe deal; team intact and growing",
      ],
      tag: "WORKFORCE",
      tagColor: "#34D399",
      accentColor: "#34D399",
      date: "Q1 2025",
      badge: "LIVE",
      icon: "\uD83D\uDC65",
    },
    {
      id: "partnerships",
      title: "Figma \u2014 Partnerships & Acquisitions 2025",
      bullets: [
        "Figma + VS Code integration for Dev Mode GA",
        "Figma acquired Diagram (AI design startup) for AI features",
        "Partnership with GitHub for Copilot-in-design workflows",
      ],
      tag: "M&A",
      tagColor: "#8B5CF6",
      accentColor: "#8B5CF6",
      date: "2025",
      badge: "2025",
      icon: "\uD83E\uDD1D",
    },
  ],
  Atlassian: [
    {
      id: "funding",
      title: "Atlassian \u2014 Funding & Revenue 2025",
      bullets: [
        "Atlassian annual revenue exceeds $4.4B in FY2025",
        "Cloud migration driving significant margin expansion",
        "No new funding needed; profitable public company (TEAM)",
      ],
      tag: "FUNDING",
      tagColor: "#22D3EE",
      accentColor: "#22D3EE",
      date: "2025",
      badge: "2025",
      icon: "\uD83D\uDCB0",
    },
    {
      id: "hiring",
      title: "Atlassian \u2014 Hiring & Workforce 2025",
      bullets: [
        "Atlassian headcount ~12,000 employees globally",
        "TEAM Anywhere remote-first model fully operational",
        "Restructuring complete; refocus on cloud and AI products",
      ],
      tag: "WORKFORCE",
      tagColor: "#34D399",
      accentColor: "#34D399",
      date: "Q1 2025",
      badge: "LIVE",
      icon: "\uD83D\uDC65",
    },
    {
      id: "partnerships",
      title: "Atlassian \u2014 Partnerships & Acquisitions 2025",
      bullets: [
        "Atlassian acquired Loom for async video collaboration",
        "Atlassian Intelligence powered by OpenAI/Cohere models",
        "Jira + GitHub Actions deeper CI/CD workflow integration",
      ],
      tag: "M&A",
      tagColor: "#8B5CF6",
      accentColor: "#8B5CF6",
      date: "2025",
      badge: "2025",
      icon: "\uD83E\uDD1D",
    },
  ],
  Slack: [
    {
      id: "funding",
      title: "Slack (Salesforce) \u2014 Funding & Investment 2025",
      bullets: [
        "Slack fully integrated into Salesforce ($27.7B acquisition)",
        "Slack ARR contributes significantly to Salesforce revenue",
        "Heavy investment in Slack AI and Einstein integration",
      ],
      tag: "FUNDING",
      tagColor: "#22D3EE",
      accentColor: "#22D3EE",
      date: "2025",
      badge: "2025",
      icon: "\uD83D\uDCB0",
    },
    {
      id: "hiring",
      title: "Slack \u2014 Hiring & Layoffs 2025",
      bullets: [
        "Slack/Salesforce headcount restructuring in 2023 completed",
        "2025: net hiring in Slack AI and platform teams",
        "Focus on enterprise sales and Salesforce ecosystem roles",
      ],
      tag: "WORKFORCE",
      tagColor: "#34D399",
      accentColor: "#34D399",
      date: "Q1 2025",
      badge: "LIVE",
      icon: "\uD83D\uDC65",
    },
    {
      id: "partnerships",
      title: "Slack \u2014 Partnerships & Acquisitions 2025",
      bullets: [
        "Slack + Salesforce Einstein AI deep integration launched",
        "Slack acquired Screenhero (rebuilt as Slack Huddles)",
        "Partnerships with Atlassian, GitHub, and Linear for workflows",
      ],
      tag: "M&A",
      tagColor: "#8B5CF6",
      accentColor: "#8B5CF6",
      date: "2025",
      badge: "2025",
      icon: "\uD83E\uDD1D",
    },
  ],
  OpenAI: [
    {
      id: "funding",
      title: "OpenAI \u2014 Funding News 2025",
      bullets: [
        "OpenAI raised $40B at $300B valuation (SoftBank-led round, March 2025)",
        "OpenAI valued at $157B after $6.6B Series E (Oct 2024, carried into 2025)",
        "Microsoft continues $13B multi-year investment commitment",
      ],
      tag: "FUNDING",
      tagColor: "#22D3EE",
      accentColor: "#22D3EE",
      date: "2025",
      badge: "2025",
      icon: "\uD83D\uDCB0",
    },
    {
      id: "hiring",
      title: "OpenAI \u2014 Hiring & Layoffs 2025",
      bullets: [
        "OpenAI headcount grew to 3,500+ employees in early 2025",
        "Aggressive hiring in safety, policy, and infrastructure teams",
        "No major layoffs reported \u2014 net hiring expansion",
      ],
      tag: "WORKFORCE",
      tagColor: "#34D399",
      accentColor: "#34D399",
      date: "Q1 2025",
      badge: "LIVE",
      icon: "\uD83D\uDC65",
    },
    {
      id: "partnerships",
      title: "OpenAI \u2014 Partnerships & Acquisitions 2025",
      bullets: [
        "OpenAI + Apple deep integration announced (ChatGPT in Siri/iOS 18)",
        "OpenAI acquired Rockset (vector DB startup) for search infra",
        "Partnership with Microsoft Azure for global compute scale-out",
      ],
      tag: "M&A",
      tagColor: "#8B5CF6",
      accentColor: "#8B5CF6",
      date: "2025",
      badge: "2025",
      icon: "\uD83E\uDD1D",
    },
  ],
  Anthropic: [
    {
      id: "funding",
      title: "Anthropic \u2014 Funding & Valuation 2025",
      bullets: [
        "Anthropic raised $7.3B in latest round (Amazon-led)",
        "Amazon committed $4B total investment into Anthropic",
        "Anthropic valued at $61B+ post-money valuation",
      ],
      tag: "FUNDING",
      tagColor: "#22D3EE",
      accentColor: "#22D3EE",
      date: "2025",
      badge: "2025",
      icon: "\uD83D\uDCB0",
    },
    {
      id: "hiring",
      title: "Anthropic \u2014 Hiring & Layoffs 2025",
      bullets: [
        "Anthropic headcount ~2,500+ employees in 2025",
        "Aggressive hiring in safety research, policy, and Claude teams",
        "No layoffs \u2014 rapid expansion across all departments",
      ],
      tag: "WORKFORCE",
      tagColor: "#34D399",
      accentColor: "#34D399",
      date: "Q1 2025",
      badge: "LIVE",
      icon: "\uD83D\uDC65",
    },
    {
      id: "partnerships",
      title: "Anthropic \u2014 Partnerships & Acquisitions 2025",
      bullets: [
        "Anthropic + Amazon AWS as primary cloud/distribution partner",
        "Claude integrated into Slack, Notion, and enterprise tools",
        "Partnership with Google Cloud for additional compute capacity",
      ],
      tag: "M&A",
      tagColor: "#8B5CF6",
      accentColor: "#8B5CF6",
      date: "2025",
      badge: "2025",
      icon: "\uD83E\uDD1D",
    },
  ],
  GitLab: [
    {
      id: "funding",
      title: "GitLab \u2014 Revenue & Valuation 2025",
      bullets: [
        "GitLab annual revenue exceeds $750M ARR",
        "GitLab Duo AI driving enterprise upsell and expansion",
        "Publicly traded (GTLB); strong institutional investor base",
      ],
      tag: "FUNDING",
      tagColor: "#22D3EE",
      accentColor: "#22D3EE",
      date: "2025",
      badge: "2025",
      icon: "\uD83D\uDCB0",
    },
    {
      id: "hiring",
      title: "GitLab \u2014 Hiring & Workforce 2025",
      bullets: [
        "GitLab headcount ~2,100 employees; fully remote company",
        "Hiring in AI/ML, security, and enterprise sales",
        "GitLab pioneered all-remote \u2014 operational model mature",
      ],
      tag: "WORKFORCE",
      tagColor: "#34D399",
      accentColor: "#34D399",
      date: "Q1 2025",
      badge: "LIVE",
      icon: "\uD83D\uDC65",
    },
    {
      id: "partnerships",
      title: "GitLab \u2014 Partnerships & Acquisitions 2025",
      bullets: [
        "GitLab Duo powered by Google Vertex AI and Anthropic",
        "GitLab + Kubernetes deep GitOps workflow partnership",
        "Partnership with AWS for GitLab-hosted runners expansion",
      ],
      tag: "M&A",
      tagColor: "#8B5CF6",
      accentColor: "#8B5CF6",
      date: "2025",
      badge: "2025",
      icon: "\uD83E\uDD1D",
    },
  ],
  HashiCorp: [
    {
      id: "funding",
      title: "HashiCorp (IBM) \u2014 Funding & Acquisition 2025",
      bullets: [
        "IBM acquired HashiCorp for $6.4B (closed mid-2024)",
        "HashiCorp products integrated into IBM Cloud portfolio",
        "Terraform and Vault remain flagship revenue drivers",
      ],
      tag: "FUNDING",
      tagColor: "#22D3EE",
      accentColor: "#22D3EE",
      date: "2025",
      badge: "2025",
      icon: "\uD83D\uDCB0",
    },
    {
      id: "hiring",
      title: "HashiCorp \u2014 Workforce 2025",
      bullets: [
        "HashiCorp headcount ~2,500 before IBM acquisition",
        "Post-acquisition integration underway; role consolidation",
        "Key engineering leadership retained for product continuity",
      ],
      tag: "WORKFORCE",
      tagColor: "#34D399",
      accentColor: "#34D399",
      date: "Q1 2025",
      badge: "LIVE",
      icon: "\uD83D\uDC65",
    },
    {
      id: "partnerships",
      title: "HashiCorp \u2014 Partnerships & Acquisitions 2025",
      bullets: [
        "IBM acquisition reshapes HashiCorp's go-to-market strategy",
        "Terraform Cloud migrating enterprise accounts to IBM Cloud",
        "OpenTofu fork response: HashiCorp defending BSL license model",
      ],
      tag: "M&A",
      tagColor: "#8B5CF6",
      accentColor: "#8B5CF6",
      date: "2025",
      badge: "2025",
      icon: "\uD83E\uDD1D",
    },
  ],
  TCS: [
    {
      id: "funding",
      title: "TCS — Revenue & Growth 2025",
      bullets: [
        "TCS Q3 FY25 revenue ₹63,973 crore, YoY growth of 5.6%",
        "Total order book TCV of $10.2B in FY25",
        "AI and cloud deals driving new revenue streams",
      ],
      tag: "REVENUE",
      tagColor: "#22D3EE",
      accentColor: "#22D3EE",
      date: "2025",
      badge: "2025",
      icon: "💰",
    },
    {
      id: "hiring",
      title: "TCS — Workforce 2025",
      bullets: [
        "600,000+ employees globally",
        "Hiring focus on AI, ML and cloud skills",
        "Campus hiring resumed with 40,000+ target for FY26",
      ],
      tag: "WORKFORCE",
      tagColor: "#34D399",
      accentColor: "#34D399",
      date: "Q1 2025",
      badge: "LIVE",
      icon: "👥",
    },
    {
      id: "partnerships",
      title: "TCS — Partnerships 2025",
      bullets: [
        "TCS + Google Cloud partnership for enterprise AI",
        "TCS + Microsoft Azure multi-year cloud deal",
        "TCS + AWS strategic collaboration expanded",
      ],
      tag: "M&A",
      tagColor: "#8B5CF6",
      accentColor: "#8B5CF6",
      date: "2025",
      badge: "2025",
      icon: "🤝",
    },
  ],
  Tata: [
    {
      id: "funding",
      title: "Tata Group — Business & Revenue 2025",
      bullets: [
        "Tata Group revenue exceeds $165B across 30+ companies",
        "TCS, Jaguar Land Rover, Tata Steel drive major revenue",
        "Tata Digital expanding fintech, retail and health verticals",
      ],
      tag: "REVENUE",
      tagColor: "#22D3EE",
      accentColor: "#22D3EE",
      date: "2025",
      badge: "2025",
      icon: "💰",
    },
    {
      id: "hiring",
      title: "Tata Group — Workforce 2025",
      bullets: [
        "935,000+ employees across Tata subsidiaries worldwide",
        "TCS alone hiring 40,000+ freshers for FY26",
        "Focus on AI, sustainability and green energy talent",
      ],
      tag: "WORKFORCE",
      tagColor: "#34D399",
      accentColor: "#34D399",
      date: "Q1 2025",
      badge: "LIVE",
      icon: "👥",
    },
    {
      id: "partnerships",
      title: "Tata Group — Partnerships & Expansions 2025",
      bullets: [
        "Tata Electronics wins Apple iPhone manufacturing in India",
        "Tata Motors EV expansion with Nexon and Punch models",
        "Tata Capital growing NBFC presence with digital lending push",
      ],
      tag: "M&A",
      tagColor: "#8B5CF6",
      accentColor: "#8B5CF6",
      date: "2025",
      badge: "2025",
      icon: "🤝",
    },
  ],
  Infosys: [
    {
      id: "funding",
      title: "Infosys — Revenue & Growth 2025",
      bullets: [
        "FY25 revenue guidance raised to 4.5–5% constant currency",
        "Large deal wins TCV of $2.5B in Q3 FY25",
        "Digital revenue now 60%+ of total revenue",
      ],
      tag: "REVENUE",
      tagColor: "#22D3EE",
      accentColor: "#22D3EE",
      date: "2025",
      badge: "2025",
      icon: "💰",
    },
    {
      id: "hiring",
      title: "Infosys — Workforce 2025",
      bullets: [
        "340,000+ employees across 56 countries",
        "Infosys Springboard AI training for 1M+ employees",
        "Net hiring expected to resume in FY26",
      ],
      tag: "WORKFORCE",
      tagColor: "#34D399",
      accentColor: "#34D399",
      date: "Q1 2025",
      badge: "LIVE",
      icon: "👥",
    },
    {
      id: "partnerships",
      title: "Infosys — Partnerships 2025",
      bullets: [
        "Infosys + NVIDIA partnership for AI infrastructure",
        "Infosys + Google Cloud expanded agreement",
        "Infosys + SAP global system integrator deal",
      ],
      tag: "M&A",
      tagColor: "#8B5CF6",
      accentColor: "#8B5CF6",
      date: "2025",
      badge: "2025",
      icon: "🤝",
    },
  ],
  Wipro: [
    {
      id: "funding",
      title: "Wipro — Revenue & Growth 2025",
      bullets: [
        "Q3 FY25 IT services revenue $2.63B",
        "Large deals TCV $1.5B+ in Q3 FY25",
        "Strategic focus on AI-led transformation services",
      ],
      tag: "REVENUE",
      tagColor: "#22D3EE",
      accentColor: "#22D3EE",
      date: "2025",
      badge: "2025",
      icon: "💰",
    },
    {
      id: "hiring",
      title: "Wipro — Workforce 2025",
      bullets: [
        "250,000+ employees in 65 countries",
        "Wipro ai360 upskilling program for all employees",
        "Lateral hiring focus on AI/ML and cloud roles",
      ],
      tag: "WORKFORCE",
      tagColor: "#34D399",
      accentColor: "#34D399",
      date: "Q1 2025",
      badge: "LIVE",
      icon: "👥",
    },
    {
      id: "partnerships",
      title: "Wipro — Partnerships 2025",
      bullets: [
        "Wipro + Google Cloud AI partnership",
        "Wipro + SAP transformation alliance",
        "Wipro + ServiceNow enterprise automation deal",
      ],
      tag: "M&A",
      tagColor: "#8B5CF6",
      accentColor: "#8B5CF6",
      date: "2025",
      badge: "2025",
      icon: "🤝",
    },
  ],
  HCLTech: [
    {
      id: "funding",
      title: "HCLTech — Revenue & Growth 2025",
      bullets: [
        "FY25 revenue guidance 4.5–5% growth",
        "Services revenue $13B+ annually",
        "HCL Software business growing at 15%+ YoY",
      ],
      tag: "REVENUE",
      tagColor: "#22D3EE",
      accentColor: "#22D3EE",
      date: "2025",
      badge: "2025",
      icon: "💰",
    },
    {
      id: "hiring",
      title: "HCLTech — Workforce 2025",
      bullets: [
        "230,000+ employees across 60 countries",
        "Strong hiring in AI, data, and cloud roles",
        "HCLTech campus hiring 20,000+ target FY26",
      ],
      tag: "WORKFORCE",
      tagColor: "#34D399",
      accentColor: "#34D399",
      date: "Q1 2025",
      badge: "LIVE",
      icon: "👥",
    },
    {
      id: "partnerships",
      title: "HCLTech — Partnerships 2025",
      bullets: [
        "HCLTech + Google Cloud AI-first deal",
        "HCLTech + Microsoft Azure collaboration",
        "HCLTech + IBM hybrid cloud partnership",
      ],
      tag: "M&A",
      tagColor: "#8B5CF6",
      accentColor: "#8B5CF6",
      date: "2025",
      badge: "2025",
      icon: "🤝",
    },
  ],
  TechMahindra: [
    {
      id: "funding",
      title: "TechMahindra — Revenue & Growth 2025",
      bullets: [
        "Revenue recovery underway after FY24 slowdown",
        "Large deal wins TCV $400M+ in Q3 FY25",
        "Project Fortius transformation plan driving margins",
      ],
      tag: "REVENUE",
      tagColor: "#22D3EE",
      accentColor: "#22D3EE",
      date: "2025",
      badge: "2025",
      icon: "💰",
    },
    {
      id: "hiring",
      title: "TechMahindra — Workforce 2025",
      bullets: [
        "160,000+ employees in 90 countries",
        "Selective hiring in AI and 5G domains",
        "TechMahindra AI University launched for upskilling",
      ],
      tag: "WORKFORCE",
      tagColor: "#34D399",
      accentColor: "#34D399",
      date: "Q1 2025",
      badge: "LIVE",
      icon: "👥",
    },
    {
      id: "partnerships",
      title: "TechMahindra — Partnerships 2025",
      bullets: [
        "TechMahindra + Microsoft Azure partnership",
        "TechMahindra + Google Cloud collaboration",
        "TechMahindra + AWS telecom solutions deal",
      ],
      tag: "M&A",
      tagColor: "#8B5CF6",
      accentColor: "#8B5CF6",
      date: "2025",
      badge: "2025",
      icon: "🤝",
    },
  ],
  Zomato: [
    {
      id: "funding",
      title: "Zomato — Funding & Growth 2025",
      bullets: [
        "Zomato (Eternal Ltd) market cap ₹2L+ crore",
        "Blinkit quick commerce GMV growing 100%+ YoY",
        "Hyperpure B2B ingredients business expanding",
      ],
      tag: "FUNDING",
      tagColor: "#22D3EE",
      accentColor: "#22D3EE",
      date: "2025",
      badge: "2025",
      icon: "💰",
    },
    {
      id: "hiring",
      title: "Zomato — Workforce 2025",
      bullets: [
        "15,000+ full-time employees",
        "400,000+ delivery partner network",
        "Hiring for tech, product, and operations roles",
      ],
      tag: "WORKFORCE",
      tagColor: "#34D399",
      accentColor: "#34D399",
      date: "Q1 2025",
      badge: "LIVE",
      icon: "👥",
    },
    {
      id: "partnerships",
      title: "Zomato — Partnerships 2025",
      bullets: [
        "Zomato + District entertainment platform launched",
        "Blinkit expansion to 600+ cities planned",
        "Zomato Gold premium membership growing fast",
      ],
      tag: "M&A",
      tagColor: "#8B5CF6",
      accentColor: "#8B5CF6",
      date: "2025",
      badge: "2025",
      icon: "🤝",
    },
  ],
  Razorpay: [
    {
      id: "funding",
      title: "Razorpay — Funding 2025",
      bullets: [
        "Valued at $7.5B (last funding round)",
        "Processing $150B+ annualized payment volume",
        "RazorpayX neo-banking growing rapidly",
      ],
      tag: "FUNDING",
      tagColor: "#22D3EE",
      accentColor: "#22D3EE",
      date: "2025",
      badge: "2025",
      icon: "💰",
    },
    {
      id: "hiring",
      title: "Razorpay — Workforce 2025",
      bullets: [
        "3,000+ employees across India and SE Asia",
        "Hiring focus on AI/ML, fintech, and platform engineering",
        "Razorpay expanding to new geographies",
      ],
      tag: "WORKFORCE",
      tagColor: "#34D399",
      accentColor: "#34D399",
      date: "Q1 2025",
      badge: "LIVE",
      icon: "👥",
    },
    {
      id: "partnerships",
      title: "Razorpay — Partnerships 2025",
      bullets: [
        "Razorpay + NPCI UPI integration leader",
        "Razorpay + Shopify payment partnership",
        "Razorpay launched Turbo UPI with banks",
      ],
      tag: "M&A",
      tagColor: "#8B5CF6",
      accentColor: "#8B5CF6",
      date: "2025",
      badge: "2025",
      icon: "🤝",
    },
  ],
  Freshworks: [
    {
      id: "funding",
      title: "Freshworks — Revenue & Growth 2025",
      bullets: [
        "FY24 revenue $686M, growing 20%+ YoY",
        "Freddy AI agent driving new ARR growth",
        "ARR crossing $700M milestone in 2025",
      ],
      tag: "REVENUE",
      tagColor: "#22D3EE",
      accentColor: "#22D3EE",
      date: "2025",
      badge: "2025",
      icon: "💰",
    },
    {
      id: "hiring",
      title: "Freshworks — Workforce 2025",
      bullets: [
        "5,000+ employees globally",
        "Strong hiring in AI product and engineering",
        "India R&D center remains core hiring hub",
      ],
      tag: "WORKFORCE",
      tagColor: "#34D399",
      accentColor: "#34D399",
      date: "Q1 2025",
      badge: "LIVE",
      icon: "👥",
    },
    {
      id: "partnerships",
      title: "Freshworks — Partnerships 2025",
      bullets: [
        "Freshworks + AWS marketplace expanded",
        "Freshworks + Google Workspace integration",
        "Freshworks + Slack deep integration",
      ],
      tag: "M&A",
      tagColor: "#8B5CF6",
      accentColor: "#8B5CF6",
      date: "2025",
      badge: "2025",
      icon: "🤝",
    },
  ],
  Swiggy: [
    {
      id: "funding",
      title: "Swiggy — Funding & IPO 2025",
      bullets: [
        "Swiggy IPO raised ₹11,327 crore (Nov 2024)",
        "Instamart quick commerce scaling to 600+ cities",
        "EBITDA losses narrowing toward profitability",
      ],
      tag: "FUNDING",
      tagColor: "#22D3EE",
      accentColor: "#22D3EE",
      date: "2025",
      badge: "2025",
      icon: "💰",
    },
    {
      id: "hiring",
      title: "Swiggy — Workforce 2025",
      bullets: [
        "15,000+ full-time employees",
        "350,000+ delivery partner network",
        "Tech and product hiring in Bengaluru hub",
      ],
      tag: "WORKFORCE",
      tagColor: "#34D399",
      accentColor: "#34D399",
      date: "Q1 2025",
      badge: "LIVE",
      icon: "👥",
    },
    {
      id: "partnerships",
      title: "Swiggy — Partnerships 2025",
      bullets: [
        "Swiggy + HDFC credit card partnership",
        "Instamart dark store expansion to 700 cities",
        "Swiggy Dineout acquisition integrated",
      ],
      tag: "M&A",
      tagColor: "#8B5CF6",
      accentColor: "#8B5CF6",
      date: "2025",
      badge: "2025",
      icon: "🤝",
    },
  ],
  Paytm: [
    {
      id: "funding",
      title: "Paytm — Recovery & Revenue 2025",
      bullets: [
        "Paytm recovering post-RBI PPBL restrictions",
        "Monthly transacting users recovering to 80M+",
        "Focus shift to payments and financial services",
      ],
      tag: "REVENUE",
      tagColor: "#22D3EE",
      accentColor: "#22D3EE",
      date: "2025",
      badge: "2025",
      icon: "💰",
    },
    {
      id: "hiring",
      title: "Paytm — Workforce 2025",
      bullets: [
        "10,000+ employees after restructuring",
        "Hiring in AI and fintech product teams",
        "Cost optimization driving leaner teams",
      ],
      tag: "WORKFORCE",
      tagColor: "#34D399",
      accentColor: "#34D399",
      date: "Q1 2025",
      badge: "LIVE",
      icon: "👥",
    },
    {
      id: "partnerships",
      title: "Paytm — Partnerships 2025",
      bullets: [
        "Paytm + SBI Cards credit card relaunch",
        "Paytm UPI continues partnerships with major banks",
        "Paytm devices business monetization strategy",
      ],
      tag: "M&A",
      tagColor: "#8B5CF6",
      accentColor: "#8B5CF6",
      date: "2025",
      badge: "2025",
      icon: "🤝",
    },
  ],
  Microsoft: [
    {
      id: "funding",
      title: "Microsoft — Revenue & Investment 2025",
      bullets: [
        "FY25 Q2 revenue $69.6B, up 12% YoY",
        "Azure grew 31% in constant currency",
        "$80B capex planned for AI infrastructure in FY25",
      ],
      tag: "REVENUE",
      tagColor: "#22D3EE",
      accentColor: "#22D3EE",
      date: "2025",
      badge: "2025",
      icon: "💰",
    },
    {
      id: "hiring",
      title: "Microsoft — Workforce 2025",
      bullets: [
        "220,000+ employees globally",
        "AI and Copilot teams growing rapidly",
        "No major layoffs; selective hiring in AI divisions",
      ],
      tag: "WORKFORCE",
      tagColor: "#34D399",
      accentColor: "#34D399",
      date: "Q1 2025",
      badge: "LIVE",
      icon: "👥",
    },
    {
      id: "partnerships",
      title: "Microsoft — Partnerships & Acquisitions 2025",
      bullets: [
        "Microsoft + OpenAI $13B investment partnership",
        "Microsoft + Oracle cloud interconnect expanded",
        "Activision Blizzard integration underway",
      ],
      tag: "M&A",
      tagColor: "#8B5CF6",
      accentColor: "#8B5CF6",
      date: "2025",
      badge: "2025",
      icon: "🤝",
    },
  ],
  Google: [
    {
      id: "funding",
      title: "Google — Revenue & Investment 2025",
      bullets: [
        "Alphabet Q4 2024 revenue $96.5B, up 12% YoY",
        "Google Cloud reached $12B quarterly revenue",
        "$75B capex planned for AI/cloud in 2025",
      ],
      tag: "REVENUE",
      tagColor: "#22D3EE",
      accentColor: "#22D3EE",
      date: "2025",
      badge: "2025",
      icon: "💰",
    },
    {
      id: "hiring",
      title: "Google — Workforce 2025",
      bullets: [
        "180,000+ employees globally",
        "Restructuring toward AI-first product teams",
        "Gemini AI team growing significantly",
      ],
      tag: "WORKFORCE",
      tagColor: "#34D399",
      accentColor: "#34D399",
      date: "Q1 2025",
      badge: "LIVE",
      icon: "👥",
    },
    {
      id: "partnerships",
      title: "Google — Partnerships 2025",
      bullets: [
        "Google + Samsung Gemini on-device AI partnership",
        "Google + Anthropic $300M investment",
        "Google Cloud + SAP expanded enterprise deal",
      ],
      tag: "M&A",
      tagColor: "#8B5CF6",
      accentColor: "#8B5CF6",
      date: "2025",
      badge: "2025",
      icon: "🤝",
    },
  ],
  Apple: [
    {
      id: "funding",
      title: "Apple — Revenue & Products 2025",
      bullets: [
        "FY25 Q1 revenue $124.3B, record quarter",
        "Services revenue $26.3B growing 14% YoY",
        "Apple Intelligence driving iPhone 16 upgrades",
      ],
      tag: "REVENUE",
      tagColor: "#22D3EE",
      accentColor: "#22D3EE",
      date: "2025",
      badge: "2025",
      icon: "💰",
    },
    {
      id: "hiring",
      title: "Apple — Workforce 2025",
      bullets: [
        "160,000+ employees globally",
        "AI/ML hiring accelerated for Apple Intelligence",
        "Vision Pro team continuing spatial computing work",
      ],
      tag: "WORKFORCE",
      tagColor: "#34D399",
      accentColor: "#34D399",
      date: "Q1 2025",
      badge: "LIVE",
      icon: "👥",
    },
    {
      id: "partnerships",
      title: "Apple — Partnerships 2025",
      bullets: [
        "Apple + OpenAI ChatGPT in Siri integration",
        "Apple Intelligence expanding to more languages",
        "Apple + TSMC 3nm chip supply agreement",
      ],
      tag: "M&A",
      tagColor: "#8B5CF6",
      accentColor: "#8B5CF6",
      date: "2025",
      badge: "2025",
      icon: "🤝",
    },
  ],
  Meta: [
    {
      id: "funding",
      title: "Meta — Revenue & AI Investment 2025",
      bullets: [
        "Q4 2024 revenue $48.4B, up 21% YoY",
        "$65B capex for AI infrastructure in 2025",
        "Llama 3 open-source model driving developer adoption",
      ],
      tag: "REVENUE",
      tagColor: "#22D3EE",
      accentColor: "#22D3EE",
      date: "2025",
      badge: "2025",
      icon: "💰",
    },
    {
      id: "hiring",
      title: "Meta — Workforce 2025",
      bullets: [
        "70,000+ employees after efficiency push",
        "Aggressive hiring in AI/ML and AR/VR",
        "Meta AI assistant now 500M+ monthly users",
      ],
      tag: "WORKFORCE",
      tagColor: "#34D399",
      accentColor: "#34D399",
      date: "Q1 2025",
      badge: "LIVE",
      icon: "👥",
    },
    {
      id: "partnerships",
      title: "Meta — Partnerships 2025",
      bullets: [
        "Meta + Ray-Ban smart glasses expanded lineup",
        "Llama partnerships with AWS, Azure, Google Cloud",
        "Meta + Qualcomm for on-device AI chips",
      ],
      tag: "M&A",
      tagColor: "#8B5CF6",
      accentColor: "#8B5CF6",
      date: "2025",
      badge: "2025",
      icon: "🤝",
    },
  ],
  Amazon: [
    {
      id: "funding",
      title: "Amazon — Revenue & AWS 2025",
      bullets: [
        "Q4 2024 revenue $187.8B, AWS $28.8B",
        "AWS grew 19% YoY; Bedrock AI growing fast",
        "$100B+ capex planned for AI/cloud in 2025",
      ],
      tag: "REVENUE",
      tagColor: "#22D3EE",
      accentColor: "#22D3EE",
      date: "2025",
      badge: "2025",
      icon: "💰",
    },
    {
      id: "hiring",
      title: "Amazon — Workforce 2025",
      bullets: [
        "1,500,000+ total employees globally",
        "AWS hiring for AI, cloud, and Bedrock teams",
        "Fulfillment center automation reducing headcount",
      ],
      tag: "WORKFORCE",
      tagColor: "#34D399",
      accentColor: "#34D399",
      date: "Q1 2025",
      badge: "LIVE",
      icon: "👥",
    },
    {
      id: "partnerships",
      title: "Amazon — Partnerships 2025",
      bullets: [
        "Amazon + Anthropic $4B investment partnership",
        "AWS + NVIDIA partnership for AI chips",
        "Amazon + Stellantis logistics automation deal",
      ],
      tag: "M&A",
      tagColor: "#8B5CF6",
      accentColor: "#8B5CF6",
      date: "2025",
      badge: "2025",
      icon: "🤝",
    },
  ],
  Netflix: [
    {
      id: "funding",
      title: "Netflix — Revenue & Growth 2025",
      bullets: [
        "Q4 2024 revenue $10.2B, membership 302M+",
        "Ad-supported tier now 70M+ monthly active users",
        "Password sharing crackdown added 20M+ members",
      ],
      tag: "REVENUE",
      tagColor: "#22D3EE",
      accentColor: "#22D3EE",
      date: "2025",
      badge: "2025",
      icon: "💰",
    },
    {
      id: "hiring",
      title: "Netflix — Workforce 2025",
      bullets: [
        "13,000+ employees globally",
        "Hiring in AI/ML for content recommendation",
        "Games division growing with 100+ titles",
      ],
      tag: "WORKFORCE",
      tagColor: "#34D399",
      accentColor: "#34D399",
      date: "Q1 2025",
      badge: "LIVE",
      icon: "👥",
    },
    {
      id: "partnerships",
      title: "Netflix — Partnerships 2025",
      bullets: [
        "Netflix + Microsoft advertising partnership",
        "Netflix Live sports streaming expanding",
        "Netflix + WWE deal — Raw streaming from 2025",
      ],
      tag: "M&A",
      tagColor: "#8B5CF6",
      accentColor: "#8B5CF6",
      date: "2025",
      badge: "2025",
      icon: "🤝",
    },
  ],
  Spotify: [
    {
      id: "funding",
      title: "Spotify — Revenue & Profitability 2025",
      bullets: [
        "Q4 2024 monthly active users 675M",
        "First full year of GAAP profitability achieved",
        "Podcast and audiobook revenue diversifying mix",
      ],
      tag: "REVENUE",
      tagColor: "#22D3EE",
      accentColor: "#22D3EE",
      date: "2025",
      badge: "2025",
      icon: "💰",
    },
    {
      id: "hiring",
      title: "Spotify — Workforce 2025",
      bullets: [
        "9,000+ employees after 2024 restructuring",
        "AI/ML hiring for DJ and personalization features",
        "Stable headcount after 1,500 layoffs in 2023",
      ],
      tag: "WORKFORCE",
      tagColor: "#34D399",
      accentColor: "#34D399",
      date: "Q1 2025",
      badge: "LIVE",
      icon: "👥",
    },
    {
      id: "partnerships",
      title: "Spotify — Partnerships 2025",
      bullets: [
        "Spotify + Google Pixel deep integration",
        "Spotify AI DJ expanding to new markets",
        "Spotify + Shopify merch partnership for artists",
      ],
      tag: "M&A",
      tagColor: "#8B5CF6",
      accentColor: "#8B5CF6",
      date: "2025",
      badge: "2025",
      icon: "🤝",
    },
  ],
  Zoom: [
    {
      id: "funding",
      title: "Zoom — Revenue & AI 2025",
      bullets: [
        "FY25 revenue $4.7B with stable growth",
        "Zoom AI Companion driving upsell revenue",
        "Contact center ARR growing 100%+ YoY",
      ],
      tag: "REVENUE",
      tagColor: "#22D3EE",
      accentColor: "#22D3EE",
      date: "2025",
      badge: "2025",
      icon: "💰",
    },
    {
      id: "hiring",
      title: "Zoom — Workforce 2025",
      bullets: [
        "8,000+ employees globally",
        "AI Companion and contact center hiring",
        "Post-pandemic workforce stabilized",
      ],
      tag: "WORKFORCE",
      tagColor: "#34D399",
      accentColor: "#34D399",
      date: "Q1 2025",
      badge: "LIVE",
      icon: "👥",
    },
    {
      id: "partnerships",
      title: "Zoom — Partnerships 2025",
      bullets: [
        "Zoom + Anthropic AI integration in Zoom AI Companion",
        "Zoom + ServiceNow enterprise workflow deal",
        "Zoom + Meta partnership for Quest VR meetings",
      ],
      tag: "M&A",
      tagColor: "#8B5CF6",
      accentColor: "#8B5CF6",
      date: "2025",
      badge: "2025",
      icon: "🤝",
    },
  ],
  Salesforce: [
    {
      id: "funding",
      title: "Salesforce — Revenue & Agentforce 2025",
      bullets: [
        "FY25 Q3 revenue $9.4B, Agentforce driving pipeline",
        "Agentforce AI agent platform launched at Dreamforce",
        "ARR exceeding $37B milestone",
      ],
      tag: "REVENUE",
      tagColor: "#22D3EE",
      accentColor: "#22D3EE",
      date: "2025",
      badge: "2025",
      icon: "💰",
    },
    {
      id: "hiring",
      title: "Salesforce — Workforce 2025",
      bullets: [
        "70,000+ employees globally",
        "Agentforce product team growing rapidly",
        "1,000+ Agentforce enterprise deal closures",
      ],
      tag: "WORKFORCE",
      tagColor: "#34D399",
      accentColor: "#34D399",
      date: "Q1 2025",
      badge: "LIVE",
      icon: "👥",
    },
    {
      id: "partnerships",
      title: "Salesforce — Partnerships 2025",
      bullets: [
        "Salesforce + Anthropic Claude in Einstein AI",
        "Salesforce + AWS strategic partnership",
        "Salesforce + Google Cloud expanded deal",
      ],
      tag: "M&A",
      tagColor: "#8B5CF6",
      accentColor: "#8B5CF6",
      date: "2025",
      badge: "2025",
      icon: "🤝",
    },
  ],
  Adobe: [
    {
      id: "funding",
      title: "Adobe — Revenue & Firefly 2025",
      bullets: [
        "FY24 revenue $21.5B, growing 11% YoY",
        "Adobe Firefly generated 13B+ images since launch",
        "Creative Cloud ARR $11B+",
      ],
      tag: "REVENUE",
      tagColor: "#22D3EE",
      accentColor: "#22D3EE",
      date: "2025",
      badge: "2025",
      icon: "💰",
    },
    {
      id: "hiring",
      title: "Adobe — Workforce 2025",
      bullets: [
        "30,000+ employees globally",
        "Firefly AI team expanding rapidly",
        "Digital Experience division growing headcount",
      ],
      tag: "WORKFORCE",
      tagColor: "#34D399",
      accentColor: "#34D399",
      date: "Q1 2025",
      badge: "LIVE",
      icon: "👥",
    },
    {
      id: "partnerships",
      title: "Adobe — Partnerships 2025",
      bullets: [
        "Adobe + Microsoft Copilot deep integration",
        "Adobe Firefly API enterprise partnerships expanding",
        "Adobe + NVIDIA partnership for generative AI",
      ],
      tag: "M&A",
      tagColor: "#8B5CF6",
      accentColor: "#8B5CF6",
      date: "2025",
      badge: "2025",
      icon: "🤝",
    },
  ],
  Cloudflare: [
    {
      id: "funding",
      title: "Cloudflare — Revenue & AI Growth 2025",
      bullets: [
        "Q4 2024 revenue $459M, up 27% YoY",
        "Cloudflare Workers AI platform growing fast",
        "Annual revenue run rate $1.7B+",
      ],
      tag: "REVENUE",
      tagColor: "#22D3EE",
      accentColor: "#22D3EE",
      date: "2025",
      badge: "2025",
      icon: "💰",
    },
    {
      id: "hiring",
      title: "Cloudflare — Workforce 2025",
      bullets: [
        "4,000+ employees globally",
        "AI/ML and infrastructure engineering hiring",
        "Strong remote-first culture",
      ],
      tag: "WORKFORCE",
      tagColor: "#34D399",
      accentColor: "#34D399",
      date: "Q1 2025",
      badge: "LIVE",
      icon: "👥",
    },
    {
      id: "partnerships",
      title: "Cloudflare — Partnerships 2025",
      bullets: [
        "Cloudflare + Microsoft Teams integration",
        "Cloudflare AI Gateway for enterprise LLM routing",
        "Cloudflare + NVIDIA partnership for AI inference",
      ],
      tag: "M&A",
      tagColor: "#8B5CF6",
      accentColor: "#8B5CF6",
      date: "2025",
      badge: "2025",
      icon: "🤝",
    },
  ],
  Datadog: [
    {
      id: "funding",
      title: "Datadog — Revenue & Growth 2025",
      bullets: [
        "Q4 2024 ARR $3B+, growing 26% YoY",
        "AI observability product gaining enterprise traction",
        "LLM Observability module launched for AI workloads",
      ],
      tag: "REVENUE",
      tagColor: "#22D3EE",
      accentColor: "#22D3EE",
      date: "2025",
      badge: "2025",
      icon: "💰",
    },
    {
      id: "hiring",
      title: "Datadog — Workforce 2025",
      bullets: [
        "5,000+ employees globally",
        "AI observability team expanding significantly",
        "Platform engineering hiring in US and Europe",
      ],
      tag: "WORKFORCE",
      tagColor: "#34D399",
      accentColor: "#34D399",
      date: "Q1 2025",
      badge: "LIVE",
      icon: "👥",
    },
    {
      id: "partnerships",
      title: "Datadog — Partnerships 2025",
      bullets: [
        "Datadog + AWS observability partnership",
        "Datadog + Microsoft Azure native integration",
        "Datadog + Google Cloud Monitoring integration",
      ],
      tag: "M&A",
      tagColor: "#8B5CF6",
      accentColor: "#8B5CF6",
      date: "2025",
      badge: "2025",
      icon: "🤝",
    },
  ],
};
const _pieData = categories.map((c) => ({
  name: c.label,
  value: c.current,
  color: c.color,
}));

function formatTimestamp24h(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  const dateStr = date.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  const timeStr = `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
  return `${dateStr} ${timeStr}`;
}

function exportReport(company: string, signals: SignalCard[]) {
  const now = new Date();
  const timestamp = formatTimestamp24h(now);

  const lines: string[] = [
    "========================================",
    "  DREAMCRAFTER INTELLIGENCE REPORT",
    "========================================",
    `Company   : ${company}`,
    `Generated : ${timestamp}`,
    "",
    "-------- SIGNAL CATEGORY STATS --------",
    "",
    ...categories.map(
      (c) =>
        `${c.label.padEnd(16)}: ${c.current} signals  ${c.up ? "+" : ""}${c.change}% wow`,
    ),
    "",
    "-------- TRENDING INTEL SIGNALS --------",
    "",
    ...signals.flatMap((s) => [
      `[${s.tag}] ${s.title}`,
      ...s.bullets.map((b) => `  - ${b}`),
      "",
    ]),
    "========================================",
    "Dreamcrafter - dreamcrafter.caffeine.in",
    "========================================",
  ];

  const blob = new Blob([lines.join("\n")], {
    type: "text/plain;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${company.toLowerCase().replace(/\s+/g, "-")}-intelligence-report.txt`;
  a.click();
  URL.revokeObjectURL(url);
}

export default function LiveAnalysisReport({
  company = "OpenAI",
}: LiveAnalysisReportProps) {
  const trendingSignals = companySignals[company] ?? companySignals.OpenAI;

  return (
    <div
      className="animate-fade-up delay-600 rounded-xl border p-6"
      style={{ background: "#0F1B2A", borderColor: "#223046" }}
    >
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <h2
          className="text-xl font-bold text-glow-teal"
          style={{ color: "#34D399" }}
        >
          Live Analysis Report
        </h2>
        <div className="flex items-center gap-3 flex-wrap">
          <span
            className="text-xs font-semibold px-3 py-1 rounded-full"
            style={{
              background: "rgba(34,211,238,0.1)",
              color: "#22D3EE",
              border: "1px solid rgba(34,211,238,0.25)",
            }}
          >
            Week-over-week intelligence
          </span>
          <button
            type="button"
            onClick={() => exportReport(company, trendingSignals)}
            data-ocid="report.export_button"
            className="export-btn flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150"
          >
            <Download className="w-3.5 h-3.5" />
            Export
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* Category cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {categories.map((cat, i) => {
            const Icon = cat.icon;
            const delays = [
              "delay-700",
              "delay-800",
              "delay-900",
              "delay-1000",
            ];
            return (
              <div
                key={cat.id}
                data-ocid={`report.item.${i + 1}`}
                className={`animate-fade-up ${delays[i]} card-glow rounded-xl border p-4`}
                style={{
                  background: "rgba(11,18,32,0.6)",
                  borderColor: "rgba(34,211,238,0.12)",
                }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ background: `${cat.color}18` }}
                  >
                    <Icon className="w-4 h-4" style={{ color: cat.color }} />
                  </div>
                  <span className="text-sm font-medium text-white">
                    {cat.label}
                  </span>
                </div>

                <div className="flex items-end justify-between">
                  <div>
                    <span className="text-2xl font-bold text-white">
                      {cat.current}
                    </span>
                    <span className="text-xs ml-1" style={{ color: "#94A3B8" }}>
                      signals
                    </span>
                  </div>
                  <div
                    className="flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full"
                    style={{
                      background: cat.up
                        ? "rgba(34,197,94,0.12)"
                        : "rgba(236,72,153,0.12)",
                      color: cat.up ? "#22C55E" : "#EC4899",
                    }}
                  >
                    {cat.up ? (
                      <TrendingUp className="w-3 h-3" />
                    ) : (
                      <TrendingDown className="w-3 h-3" />
                    )}
                    {cat.up ? "+" : ""}
                    {cat.change}%
                  </div>
                </div>

                <p className="text-xs mt-2" style={{ color: "#94A3B8" }}>
                  {cat.insight}
                </p>
              </div>
            );
          })}
        </div>
      </div>
      <div className="mt-8">
        <div className="flex items-center gap-3 mb-4">
          <div
            className="h-px flex-1"
            style={{
              background:
                "linear-gradient(90deg,rgba(34,211,238,0.3),transparent)",
            }}
          />
          <span
            className="text-xs font-bold tracking-widest px-3 py-1 rounded-full"
            style={{
              color: "#22D3EE",
              background: "rgba(34,211,238,0.08)",
              border: "1px solid rgba(34,211,238,0.2)",
            }}
          >
            TRENDING INTEL SIGNALS \u2014 {company.toUpperCase()}
          </span>
          <div
            className="h-px flex-1"
            style={{
              background:
                "linear-gradient(270deg,rgba(34,211,238,0.3),transparent)",
            }}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {trendingSignals.map((signal, i) => {
            const delays = ["delay-800", "delay-900", "delay-1000"];
            return (
              <div
                key={signal.id}
                data-ocid={`trending.item.${i + 1}`}
                className={`animate-fade-up ${delays[i]} card-glow rounded-xl p-4 relative overflow-hidden`}
                style={{
                  background: "rgba(11,18,32,0.8)",
                  border: `1px solid ${signal.accentColor}20`,
                  borderLeftColor: signal.accentColor,
                  borderLeftWidth: "3px",
                }}
              >
                <div className="absolute top-0 right-0 w-16 h-16 opacity-5 text-5xl flex items-center justify-center">
                  {signal.icon}
                </div>

                <div className="flex items-center justify-between mb-2 gap-2 flex-wrap">
                  <span
                    className="text-xs font-bold px-2 py-0.5 rounded"
                    style={{
                      background: `${signal.accentColor}18`,
                      color: signal.accentColor,
                    }}
                  >
                    {signal.tag}
                  </span>
                  <div className="flex items-center gap-1.5">
                    {signal.badge === "LIVE" ? (
                      <span
                        className="text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1"
                        style={{
                          background: "rgba(52,211,153,0.15)",
                          color: "#34D399",
                          border: "1px solid rgba(52,211,153,0.3)",
                        }}
                      >
                        <span
                          className="w-1.5 h-1.5 rounded-full animate-pulse inline-block"
                          style={{ background: "#34D399" }}
                        />
                        LIVE
                      </span>
                    ) : (
                      <span className="text-xs" style={{ color: "#64748B" }}>
                        {signal.badge}
                      </span>
                    )}
                    <span className="text-xs" style={{ color: "#475569" }}>
                      {signal.date}
                    </span>
                  </div>
                </div>

                <p className="text-sm font-semibold text-white mb-2 leading-tight">
                  {signal.title}
                </p>
                <ul className="space-y-1 mt-2">
                  {signal.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex items-start gap-1.5 text-xs"
                      style={{ color: "#94A3B8" }}
                    >
                      <span
                        className="mt-1 w-1 h-1 rounded-full flex-shrink-0"
                        style={{ background: signal.accentColor }}
                      />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
