import { Link, useNavigate } from "@tanstack/react-router";
import {
  AlertTriangle,
  ArrowRight,
  Briefcase,
  ExternalLink,
  FileText,
  Globe,
  Layers,
  Newspaper,
  Search,
  Sparkles,
  Terminal,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

type BriefingItem = { text: string; url: string };
type JobItem = { role: string; dept: string; url: string };

type Briefing = {
  color: string;
  initials: string;
  releaseNotes: BriefingItem[];
  features: BriefingItem[];
  press: BriefingItem[];
  dev: BriefingItem[];
  strategy: BriefingItem[];
  news: BriefingItem[];
  jobs: JobItem[];
  confidence: number;
  officialUrls: {
    releaseNotes: string;
    features: string;
    press: string;
    dev: string;
  };
};

const briefings: Record<string, Briefing> = {
  GitHub: {
    color: "#22D3EE",
    initials: "GH",
    officialUrls: {
      releaseNotes: "https://github.blog/changelog/",
      features: "https://github.com/features",
      press: "https://github.blog/",
      dev: "https://github.blog/category/engineering/",
    },
    releaseNotes: [
      {
        text: "GitHub Copilot Workspace GA — AI-native dev environments",
        url: "https://github.blog/changelog/",
      },
      {
        text: "Code scanning default setup improvements",
        url: "https://github.blog/changelog/",
      },
      {
        text: "Actions: macOS 14 Sonoma runners available",
        url: "https://github.blog/changelog/",
      },
    ],
    features: [
      {
        text: "Copilot Chat in github.com — context-aware AI help",
        url: "https://github.com/features",
      },
      {
        text: "Projects: new roadmap timeline view",
        url: "https://github.com/features",
      },
      {
        text: "Merge queue for high-velocity teams",
        url: "https://github.com/features",
      },
    ],
    press: [
      {
        text: "GitHub reaches 100M developers milestone",
        url: "https://github.blog/",
      },
      {
        text: "GitHub Universe 2024 announcements recap",
        url: "https://github.blog/",
      },
    ],
    dev: [
      {
        text: "How GitHub scales Copilot inference infrastructure",
        url: "https://github.blog/category/engineering/",
      },
      {
        text: "Migrating GitHub.com to MySQL 8.0",
        url: "https://github.blog/category/engineering/",
      },
    ],
    strategy: [
      {
        text: "Microsoft continues deepening GitHub AI integration",
        url: "https://github.blog/",
      },
      {
        text: "GitHub expands into enterprise security tooling",
        url: "https://github.blog/",
      },
    ],
    news: [
      {
        text: "GitHub Copilot Enterprise now available for all orgs",
        url: "https://github.blog/changelog/",
      },
      {
        text: "GitHub acquires Simplify for resume tooling",
        url: "https://github.blog/",
      },
    ],
    jobs: [
      {
        role: "Senior Software Engineer, Copilot",
        dept: "Engineering",
        url: "https://github.com/about/careers",
      },
      {
        role: "Product Manager, Actions",
        dept: "Product",
        url: "https://github.com/about/careers",
      },
      {
        role: "Staff Security Engineer",
        dept: "Security",
        url: "https://github.com/about/careers",
      },
    ],
    confidence: 96,
  },
  Stripe: {
    color: "#A78BFA",
    initials: "ST",
    officialUrls: {
      releaseNotes: "https://stripe.com/docs/changelog",
      features: "https://stripe.com/blog/product",
      press: "https://stripe.com/newsroom",
      dev: "https://stripe.com/blog/engineering",
    },
    releaseNotes: [
      {
        text: "Stripe Tax: expanded to 50+ countries",
        url: "https://stripe.com/blog/changelog",
      },
      {
        text: "Sigma: new custom reporting SQL editor",
        url: "https://stripe.com/blog/changelog",
      },
      {
        text: "Issuing: physical card controls update",
        url: "https://stripe.com/blog/changelog",
      },
    ],
    features: [
      {
        text: "Stripe Climate — carbon removal integration",
        url: "https://stripe.com/docs/changelog",
      },
      {
        text: "Revenue Recognition: multi-currency support",
        url: "https://stripe.com/docs/changelog",
      },
      {
        text: "Radar: ML fraud detection enhancements",
        url: "https://stripe.com/docs/changelog",
      },
    ],
    press: [
      {
        text: "Stripe valued at $65B in latest secondary transactions",
        url: "https://stripe.com/blog",
      },
      {
        text: "Stripe Financial Connections expands to EU",
        url: "https://stripe.com/blog",
      },
    ],
    dev: [
      {
        text: "How Stripe builds reliable payment infrastructure",
        url: "https://stripe.com/blog/engineering",
      },
      {
        text: "Reducing latency in the Stripe API",
        url: "https://stripe.com/blog/engineering",
      },
    ],
    strategy: [
      {
        text: "Stripe doubles down on global payments expansion",
        url: "https://stripe.com/blog",
      },
      {
        text: "B2B payments and invoicing as new growth vector",
        url: "https://stripe.com/blog",
      },
    ],
    news: [
      {
        text: "Stripe processes $1T in total payment volume",
        url: "https://stripe.com/blog",
      },
      {
        text: "Stripe Terminal gains new hardware partners",
        url: "https://stripe.com/blog",
      },
    ],
    jobs: [
      {
        role: "Backend Engineer, Payments Core",
        dept: "Engineering",
        url: "https://stripe.com/jobs",
      },
      {
        role: "Data Scientist, Risk",
        dept: "Data",
        url: "https://stripe.com/jobs",
      },
      {
        role: "Enterprise Account Executive",
        dept: "Sales",
        url: "https://stripe.com/jobs",
      },
    ],
    confidence: 93,
  },
  Anthropic: {
    color: "#F97316",
    initials: "AN",
    officialUrls: {
      releaseNotes: "https://www.anthropic.com/news",
      features: "https://www.anthropic.com/claude",
      press: "https://www.anthropic.com/news",
      dev: "https://www.anthropic.com/research",
    },
    releaseNotes: [
      {
        text: "Claude 3.5 Sonnet — new state-of-the-art reasoning",
        url: "https://www.anthropic.com/news",
      },
      {
        text: "Claude.ai Projects for persistent memory",
        url: "https://www.anthropic.com/news",
      },
      {
        text: "Computer Use beta — Claude controls desktop UIs",
        url: "https://www.anthropic.com/news",
      },
    ],
    features: [
      {
        text: "200K context window across all Claude 3 models",
        url: "https://www.anthropic.com/claude",
      },
      {
        text: "Artifacts: interactive code + doc generation",
        url: "https://www.anthropic.com/claude",
      },
      {
        text: "API: tool use + vision now GA",
        url: "https://www.anthropic.com/claude",
      },
    ],
    press: [
      {
        text: "Anthropic raises $4B from Amazon (total $8B committed)",
        url: "https://www.anthropic.com/news",
      },
      {
        text: "Claude surpasses GPT-4 on key benchmarks",
        url: "https://www.anthropic.com/research",
      },
    ],
    dev: [
      {
        text: "Constitutional AI: harmlessness from AI feedback",
        url: "https://www.anthropic.com/research",
      },
      {
        text: "Mechanistic interpretability research progress",
        url: "https://www.anthropic.com/research",
      },
    ],
    strategy: [
      {
        text: "Anthropic bets on safety-first model development",
        url: "https://www.anthropic.com/news",
      },
      {
        text: "Enterprise tier gaining traction vs. OpenAI",
        url: "https://www.anthropic.com/news",
      },
    ],
    news: [
      {
        text: "Claude.ai team plan launched for organizations",
        url: "https://www.anthropic.com/news",
      },
      {
        text: "Google deepens investment in Anthropic",
        url: "https://www.anthropic.com/news",
      },
    ],
    jobs: [
      {
        role: "Research Scientist, Interpretability",
        dept: "Research",
        url: "https://www.anthropic.com/careers",
      },
      {
        role: "Infrastructure Engineer, Training",
        dept: "Engineering",
        url: "https://www.anthropic.com/careers",
      },
      {
        role: "Head of Enterprise Sales",
        dept: "Sales",
        url: "https://www.anthropic.com/careers",
      },
    ],
    confidence: 95,
  },
  Notion: {
    color: "#34D399",
    initials: "NO",
    officialUrls: {
      releaseNotes: "https://www.notion.so/releases",
      features: "https://www.notion.so/product",
      press: "https://www.notion.so/blog",
      dev: "https://developers.notion.com/",
    },
    releaseNotes: [
      {
        text: "Notion AI: Q&A across entire workspace",
        url: "https://www.notion.so/releases",
      },
      {
        text: "Database automations GA",
        url: "https://www.notion.so/releases",
      },
      {
        text: "Notion Sites: publish pages as websites",
        url: "https://www.notion.so/releases",
      },
    ],
    features: [
      {
        text: "Notion Calendar integration",
        url: "https://www.notion.so/product",
      },
      {
        text: "Forms for database entry collection",
        url: "https://www.notion.so/product",
      },
      {
        text: "Advanced analytics for team engagement",
        url: "https://www.notion.so/product",
      },
    ],
    press: [
      {
        text: "Notion reaches 30M+ users worldwide",
        url: "https://www.notion.so/blog",
      },
      { text: "Notion AI usage up 3x YoY", url: "https://www.notion.so/blog" },
    ],
    dev: [
      {
        text: "Building Notion's block-based architecture",
        url: "https://www.notion.so/blog/engineering",
      },
      {
        text: "How Notion handles real-time collaboration at scale",
        url: "https://www.notion.so/blog/engineering",
      },
    ],
    strategy: [
      {
        text: "Notion positions as all-in-one connected workspace",
        url: "https://www.notion.so/blog",
      },
      {
        text: "AI-first product strategy for 2025",
        url: "https://www.notion.so/blog",
      },
    ],
    news: [
      {
        text: "Notion launches new API v2 with expanded capabilities",
        url: "https://www.notion.so/releases",
      },
      {
        text: "Notion for Education rollout to universities",
        url: "https://www.notion.so/blog",
      },
    ],
    jobs: [
      {
        role: "Senior Frontend Engineer",
        dept: "Engineering",
        url: "https://www.notion.so/careers",
      },
      {
        role: "Growth Product Manager",
        dept: "Product",
        url: "https://www.notion.so/careers",
      },
      {
        role: "Enterprise Customer Success Manager",
        dept: "Customer Success",
        url: "https://www.notion.so/careers",
      },
    ],
    confidence: 91,
  },
  Vercel: {
    color: "#F9FAFB",
    initials: "VC",
    officialUrls: {
      releaseNotes: "https://vercel.com/changelog",
      features: "https://vercel.com/features",
      press: "https://vercel.com/blog",
      dev: "https://vercel.com/blog/engineering",
    },
    releaseNotes: [
      {
        text: "v0 by Vercel GA — AI UI generation tool",
        url: "https://vercel.com/changelog",
      },
      {
        text: "Fluid compute for serverless cost reduction",
        url: "https://vercel.com/changelog",
      },
      {
        text: "Speed Insights now free for all plans",
        url: "https://vercel.com/changelog",
      },
    ],
    features: [
      {
        text: "AI SDK 3.0 with streaming UI support",
        url: "https://vercel.com/features",
      },
      {
        text: "Edge Config for ultra-low latency flags",
        url: "https://vercel.com/features",
      },
      {
        text: "Deployment Protection: password + SSO gates",
        url: "https://vercel.com/features",
      },
    ],
    press: [
      {
        text: "Vercel raises $250M Series E at $3.25B",
        url: "https://vercel.com/blog",
      },
      {
        text: "v0 hits 1M developers in first 3 months",
        url: "https://vercel.com/blog",
      },
    ],
    dev: [
      {
        text: "How Vercel's edge network routes 100B+ requests/month",
        url: "https://vercel.com/blog/engineering",
      },
      {
        text: "Building the v0 code generation pipeline",
        url: "https://vercel.com/blog/engineering",
      },
    ],
    strategy: [
      {
        text: "Vercel doubles down on DX-first developer platform",
        url: "https://vercel.com/blog",
      },
      {
        text: "Competing with Netlify and AWS Amplify for Next.js deployments",
        url: "https://vercel.com/blog",
      },
    ],
    news: [
      {
        text: "Vercel acquires Splitbee for analytics",
        url: "https://vercel.com/blog",
      },
      {
        text: "Next.js 15 released with React 19 support",
        url: "https://vercel.com/changelog",
      },
    ],
    jobs: [
      {
        role: "Edge Network Engineer",
        dept: "Infrastructure",
        url: "https://vercel.com/careers",
      },
      {
        role: "Developer Advocate",
        dept: "DevRel",
        url: "https://vercel.com/careers",
      },
      {
        role: "Senior Product Designer",
        dept: "Design",
        url: "https://vercel.com/careers",
      },
    ],
    confidence: 90,
  },
  Figma: {
    color: "#FB7185",
    initials: "FG",
    officialUrls: {
      releaseNotes: "https://www.figma.com/release-notes/",
      features: "https://www.figma.com/features/",
      press: "https://www.figma.com/blog/",
      dev: "https://www.figma.com/blog/section/engineering/",
    },
    releaseNotes: [
      {
        text: "Figma AI: First Draft generates UI from prompts",
        url: "https://www.figma.com/release-notes/",
      },
      {
        text: "Dev Mode GA with code connect integrations",
        url: "https://www.figma.com/release-notes/",
      },
      {
        text: "Figma Slides: presentation tool launched",
        url: "https://www.figma.com/release-notes/",
      },
    ],
    features: [
      {
        text: "Variables for design tokens across themes",
        url: "https://www.figma.com/features/",
      },
      {
        text: "Advanced prototyping with conditional logic",
        url: "https://www.figma.com/features/",
      },
      {
        text: "Component properties for scalable systems",
        url: "https://www.figma.com/features/",
      },
    ],
    press: [
      {
        text: "$20B Adobe acquisition blocked by regulators (2024)",
        url: "https://www.figma.com/blog/",
      },
      {
        text: "Figma hires new CEO after Adobe deal collapse",
        url: "https://www.figma.com/blog/",
      },
    ],
    dev: [
      {
        text: "How Figma's multiplayer architecture handles 1M+ concurrent editors",
        url: "https://www.figma.com/blog/section/engineering/",
      },
      {
        text: "Building Figma's plugin sandbox with WebAssembly",
        url: "https://www.figma.com/blog/section/engineering/",
      },
    ],
    strategy: [
      {
        text: "Figma pivots to platform play post-Adobe",
        url: "https://www.figma.com/blog/",
      },
      {
        text: "Dev Mode positions Figma as design-to-code bridge",
        url: "https://www.figma.com/blog/",
      },
    ],
    news: [
      {
        text: "Figma files for IPO following Adobe deal collapse",
        url: "https://www.figma.com/blog/",
      },
      {
        text: "FigJam AI features launch for brainstorming",
        url: "https://www.figma.com/blog/",
      },
    ],
    jobs: [
      {
        role: "Staff Engineer, Dev Mode",
        dept: "Engineering",
        url: "https://www.figma.com/careers/",
      },
      {
        role: "Product Manager, AI Features",
        dept: "Product",
        url: "https://www.figma.com/careers/",
      },
      {
        role: "Senior Brand Designer",
        dept: "Design",
        url: "https://www.figma.com/careers/",
      },
    ],
    confidence: 92,
  },
  Linear: {
    color: "#60A5FA",
    initials: "LN",
    officialUrls: {
      releaseNotes: "https://linear.app/changelog",
      features: "https://linear.app/features",
      press: "https://linear.app/blog",
      dev: "https://linear.app/blog",
    },
    releaseNotes: [
      {
        text: "Linear AI: auto-generated issue summaries",
        url: "https://linear.app/changelog",
      },
      {
        text: "Customer requests tracking module",
        url: "https://linear.app/changelog",
      },
      {
        text: "Linear Asks: async Q&A for teams",
        url: "https://linear.app/changelog",
      },
    ],
    features: [
      {
        text: "Triage mode for high-volume issue intake",
        url: "https://linear.app/features",
      },
      {
        text: "Git-synchronized branches and PRs",
        url: "https://linear.app/features",
      },
      {
        text: "Roadmap views with progress tracking",
        url: "https://linear.app/features",
      },
    ],
    press: [
      {
        text: "Linear reaches profitability milestone",
        url: "https://linear.app/blog",
      },
      {
        text: "Used by 10,000+ engineering teams globally",
        url: "https://linear.app/blog",
      },
    ],
    dev: [
      {
        text: "How Linear builds for performance at 10ms interactions",
        url: "https://linear.app/blog",
      },
      {
        text: "Local-first sync architecture explained",
        url: "https://linear.app/blog",
      },
    ],
    strategy: [
      {
        text: "Linear stays small and focused vs. Jira's complexity",
        url: "https://linear.app/blog",
      },
      {
        text: "Expanding from issue tracking to full project management",
        url: "https://linear.app/blog",
      },
    ],
    news: [
      {
        text: "Linear raises Series B at $400M valuation",
        url: "https://linear.app/blog",
      },
      {
        text: "Linear Cycles gains adoption for sprint planning",
        url: "https://linear.app/changelog",
      },
    ],
    jobs: [
      {
        role: "Full Stack Engineer",
        dept: "Engineering",
        url: "https://linear.app/careers",
      },
      {
        role: "Product Designer",
        dept: "Design",
        url: "https://linear.app/careers",
      },
      {
        role: "Customer Success Lead",
        dept: "Customer Success",
        url: "https://linear.app/careers",
      },
    ],
    confidence: 88,
  },
  Atlassian: {
    color: "#38BDF8",
    initials: "AT",
    officialUrls: {
      releaseNotes:
        "https://confluence.atlassian.com/alldoc/atlassian-documentation-32243719.html",
      features: "https://www.atlassian.com/blog/whats-new-in-atlassian",
      press: "https://www.atlassian.com/company/news",
      dev: "https://developer.atlassian.com/blog/",
    },
    releaseNotes: [
      {
        text: "Jira AI: smart issue prioritization",
        url: "https://www.atlassian.com/blog/changelog",
      },
      {
        text: "Confluence AI: page summaries + Q&A",
        url: "https://www.atlassian.com/blog/changelog",
      },
      {
        text: "Atlassian Intelligence: cross-product AI layer",
        url: "https://www.atlassian.com/blog/changelog",
      },
    ],
    features: [
      {
        text: "Jira Plans for portfolio-level roadmapping",
        url: "https://www.atlassian.com/software",
      },
      {
        text: "Loom integration for async video updates",
        url: "https://www.atlassian.com/software",
      },
      {
        text: "Team Anywhere: distributed work features",
        url: "https://www.atlassian.com/software",
      },
    ],
    press: [
      {
        text: "Atlassian acquires Loom for $975M",
        url: "https://www.atlassian.com/blog",
      },
      {
        text: "Cloud ARR surpasses $4B milestone",
        url: "https://www.atlassian.com/blog",
      },
    ],
    dev: [
      {
        text: "Atlassian's journey migrating 200K+ customers to cloud",
        url: "https://www.atlassian.com/engineering",
      },
      {
        text: "Building Atlassian Intelligence across the product suite",
        url: "https://www.atlassian.com/engineering",
      },
    ],
    strategy: [
      {
        text: "Atlassian accelerates cloud-first transition",
        url: "https://www.atlassian.com/blog",
      },
      {
        text: "Rovo AI agent platform as new competitive differentiator",
        url: "https://www.atlassian.com/blog",
      },
    ],
    news: [
      {
        text: "Atlassian Rovo AI agents launched at Team '24",
        url: "https://www.atlassian.com/blog",
      },
      {
        text: "Jira Product Discovery GA for all tiers",
        url: "https://www.atlassian.com/blog/changelog",
      },
    ],
    jobs: [
      {
        role: "Principal Engineer, Jira",
        dept: "Engineering",
        url: "https://www.atlassian.com/company/careers",
      },
      {
        role: "AI Product Manager",
        dept: "Product",
        url: "https://www.atlassian.com/company/careers",
      },
      {
        role: "Solutions Engineer, Enterprise",
        dept: "Sales Engineering",
        url: "https://www.atlassian.com/company/careers",
      },
    ],
    confidence: 89,
  },
  Slack: {
    color: "#FBBF24",
    initials: "SL",
    officialUrls: {
      releaseNotes: "https://slack.com/release-notes/mac",
      features: "https://slack.com/features",
      press: "https://slack.com/blog/news",
      dev: "https://api.slack.com/changelog",
    },
    releaseNotes: [
      {
        text: "Slack AI: channel recaps and thread summaries",
        url: "https://slack.com/release-notes",
      },
      {
        text: "Huddles: video calls with screen sharing",
        url: "https://slack.com/release-notes",
      },
      {
        text: "Lists: project and task tracking in Slack",
        url: "https://slack.com/release-notes",
      },
    ],
    features: [
      {
        text: "Workflow Builder: no-code automations",
        url: "https://slack.com/features",
      },
      {
        text: "Canvas: persistent collaborative docs in channels",
        url: "https://slack.com/features",
      },
      {
        text: "Connect: cross-company collaboration channels",
        url: "https://slack.com/features",
      },
    ],
    press: [
      {
        text: "Salesforce integrates Slack as primary work OS",
        url: "https://slack.engineering/",
      },
      {
        text: "Slack AI reaches 1M+ daily active users",
        url: "https://slack.engineering/",
      },
    ],
    dev: [
      {
        text: "How Slack processes 10B+ messages per day",
        url: "https://slack.engineering/",
      },
      {
        text: "Building Slack's real-time messaging infrastructure",
        url: "https://slack.engineering/",
      },
    ],
    strategy: [
      {
        text: "Slack evolves from messaging to AI-powered work hub",
        url: "https://slack.com/features",
      },
      {
        text: "Salesforce ecosystem integration as moat",
        url: "https://slack.com/features",
      },
    ],
    news: [
      {
        text: "Slack adds native voice messages with transcription",
        url: "https://slack.com/release-notes",
      },
      {
        text: "Slack Marketplace expands to 3,000+ integrations",
        url: "https://slack.com/release-notes",
      },
    ],
    jobs: [
      {
        role: "Senior Software Engineer, AI",
        dept: "Engineering",
        url: "https://slack.com/careers",
      },
      {
        role: "Platform Product Manager",
        dept: "Product",
        url: "https://slack.com/careers",
      },
      {
        role: "UX Researcher",
        dept: "Design",
        url: "https://slack.com/careers",
      },
    ],
    confidence: 87,
  },
  GitLab: {
    color: "#FB923C",
    initials: "GL",
    officialUrls: {
      releaseNotes: "https://about.gitlab.com/releases/",
      features: "https://about.gitlab.com/features/",
      press: "https://about.gitlab.com/blog/",
      dev: "https://about.gitlab.com/blog/categories/engineering/",
    },
    releaseNotes: [
      {
        text: "GitLab Duo: AI code suggestions + chat",
        url: "https://about.gitlab.com/releases/",
      },
      {
        text: "GitLab 17.0: AI-powered security scanning",
        url: "https://about.gitlab.com/releases/",
      },
      {
        text: "Remote development with GitLab Workspaces",
        url: "https://about.gitlab.com/releases/",
      },
    ],
    features: [
      {
        text: "GitLab Duo Pro: advanced AI tier",
        url: "https://about.gitlab.com/features/",
      },
      {
        text: "Value stream dashboards for DORA metrics",
        url: "https://about.gitlab.com/features/",
      },
      {
        text: "Enterprise Agile Planning module",
        url: "https://about.gitlab.com/features/",
      },
    ],
    press: [
      {
        text: "GitLab goes public on Nasdaq (GTLB)",
        url: "https://about.gitlab.com/blog/",
      },
      {
        text: "GitLab Duo competes directly with GitHub Copilot",
        url: "https://about.gitlab.com/blog/",
      },
    ],
    dev: [
      {
        text: "GitLab's approach to building AI coding assistants",
        url: "https://about.gitlab.com/blog/categories/engineering/",
      },
      {
        text: "Migrating GitLab.com to Kubernetes at scale",
        url: "https://about.gitlab.com/blog/categories/engineering/",
      },
    ],
    strategy: [
      {
        text: "GitLab positions as end-to-end DevSecOps platform",
        url: "https://about.gitlab.com/blog/",
      },
      {
        text: "Self-managed vs. SaaS split as competitive advantage",
        url: "https://about.gitlab.com/blog/",
      },
    ],
    news: [
      {
        text: "GitLab partners with Google Cloud for joint go-to-market",
        url: "https://about.gitlab.com/blog/",
      },
      {
        text: "GitLab Duo Enterprise tier launched",
        url: "https://about.gitlab.com/releases/",
      },
    ],
    jobs: [
      {
        role: "Backend Engineer, GitLab Duo",
        dept: "Engineering",
        url: "https://about.gitlab.com/jobs/",
      },
      {
        role: "Senior Security Engineer",
        dept: "Security",
        url: "https://about.gitlab.com/jobs/",
      },
      {
        role: "Channel Partner Manager",
        dept: "Sales",
        url: "https://about.gitlab.com/jobs/",
      },
    ],
    confidence: 86,
  },
  HashiCorp: {
    color: "#A78BFA",
    initials: "HC",
    officialUrls: {
      releaseNotes:
        "https://www.hashicorp.com/blog/categories/products-technology",
      features: "https://www.hashicorp.com/products",
      press: "https://www.hashicorp.com/blog",
      dev: "https://www.hashicorp.com/blog/categories/engineering",
    },
    releaseNotes: [
      {
        text: "Terraform 1.8: provider-defined functions",
        url: "https://www.hashicorp.com/blog/categories/products-technology",
      },
      {
        text: "Vault Secrets Operator for Kubernetes",
        url: "https://www.hashicorp.com/blog/categories/products-technology",
      },
      {
        text: "Consul service mesh v1.18 release",
        url: "https://www.hashicorp.com/blog/categories/products-technology",
      },
    ],
    features: [
      {
        text: "HCP Terraform: serverless managed runs",
        url: "https://www.hashicorp.com/products",
      },
      {
        text: "Boundary: zero-trust infrastructure access",
        url: "https://www.hashicorp.com/products",
      },
      {
        text: "Waypoint: application lifecycle platform",
        url: "https://www.hashicorp.com/products",
      },
    ],
    press: [
      {
        text: "IBM acquires HashiCorp for $6.4B (2024)",
        url: "https://www.hashicorp.com/blog",
      },
      {
        text: "HashiCorp BSL license change sparks OpenTF fork",
        url: "https://www.hashicorp.com/blog",
      },
    ],
    dev: [
      {
        text: "Building Terraform's provider plugin architecture",
        url: "https://www.hashicorp.com/blog/categories/engineering",
      },
      {
        text: "How HashiCorp scales Vault for enterprise secrets",
        url: "https://www.hashicorp.com/blog/categories/engineering",
      },
    ],
    strategy: [
      {
        text: "IBM acquisition signals enterprise infrastructure consolidation",
        url: "https://www.hashicorp.com/blog",
      },
      {
        text: "OpenTofu fork creates first major competitive threat",
        url: "https://www.hashicorp.com/blog",
      },
    ],
    news: [
      {
        text: "HCP Terraform free tier expanded for small teams",
        url: "https://www.hashicorp.com/blog",
      },
      {
        text: "HashiCorp CDK reaches v2 stable release",
        url: "https://www.hashicorp.com/blog/categories/products-technology",
      },
    ],
    jobs: [
      {
        role: "Senior Engineer, Terraform Cloud",
        dept: "Engineering",
        url: "https://www.hashicorp.com/careers",
      },
      {
        role: "Cloud Solutions Architect",
        dept: "Solutions",
        url: "https://www.hashicorp.com/careers",
      },
      {
        role: "Technical Writer, Vault",
        dept: "Documentation",
        url: "https://www.hashicorp.com/careers",
      },
    ],
    confidence: 84,
  },
  OpenAI: {
    color: "#10A37F",
    initials: "OA",
    officialUrls: {
      releaseNotes: "https://platform.openai.com/docs/changelog",
      features: "https://openai.com/blog",
      press: "https://openai.com/news",
      dev: "https://platform.openai.com/docs/changelog",
    },
    releaseNotes: [
      {
        text: "GPT-4o with vision released to all users",
        url: "https://platform.openai.com/docs/changelog",
      },
      {
        text: "Structured outputs support added to API",
        url: "https://platform.openai.com/docs/changelog",
      },
      {
        text: "o1 reasoning model available in API",
        url: "https://platform.openai.com/docs/changelog",
      },
    ],
    features: [
      {
        text: "Sora video generation model launched",
        url: "https://openai.com/blog",
      },
      {
        text: "Advanced Voice Mode in ChatGPT",
        url: "https://openai.com/blog",
      },
      {
        text: "ChatGPT memory across conversations",
        url: "https://openai.com/blog",
      },
    ],
    press: [
      {
        text: "OpenAI raised $40B at $300B valuation (SoftBank-led round)",
        url: "https://openai.com/news",
      },
      {
        text: "Apple integrates ChatGPT into iOS 18 Siri",
        url: "https://openai.com/news",
      },
      {
        text: "OpenAI launches for-profit restructuring plan",
        url: "https://openai.com/news",
      },
    ],
    dev: [
      {
        text: "Assistants API v2 with file search & code interpreter",
        url: "https://platform.openai.com/docs/changelog",
      },
      {
        text: "Batch API for 50% cost reduction on async jobs",
        url: "https://platform.openai.com/docs/changelog",
      },
      {
        text: "Realtime API for audio/speech streaming",
        url: "https://platform.openai.com/docs/changelog",
      },
    ],
    strategy: [
      {
        text: "OpenAI shifts to capped-profit PBC structure",
        url: "https://openai.com/research",
      },
      {
        text: "Expanding enterprise sales with OpenAI for Business",
        url: "https://openai.com/research",
      },
    ],
    news: [
      {
        text: "OpenAI valuation hits $300B after SoftBank investment",
        url: "https://openai.com/news",
      },
      {
        text: "GPT-5 development confirmed with multimodal focus",
        url: "https://openai.com/news",
      },
    ],
    jobs: [
      {
        role: "Research Engineer, Safety",
        dept: "Research",
        url: "https://openai.com/careers",
      },
      {
        role: "PM, API Platform",
        dept: "Product",
        url: "https://openai.com/careers",
      },
      {
        role: "Policy Analyst",
        dept: "Policy",
        url: "https://openai.com/careers",
      },
    ],
    confidence: 96,
  },
  TCS: {
    color: "#3B82F6",
    initials: "TCS",
    officialUrls: {
      releaseNotes: "https://www.tcs.com/insights",
      features: "https://www.tcs.com/insights",
      press: "https://www.tcs.com/press-releases",
      dev: "https://www.tcs.com/insights",
    },
    releaseNotes: [
      {
        text: "TCS Pace Port innovation hub releases AI research updates",
        url: "https://www.tcs.com/insights",
      },
      {
        text: "TCS AI platform — new enterprise modules released",
        url: "https://www.tcs.com/insights",
      },
    ],
    features: [
      {
        text: "TCS Ignio AIOps platform — latest cognitive automation features",
        url: "https://www.tcs.com/insights",
      },
      {
        text: "TCS BaNCS digital banking platform update",
        url: "https://www.tcs.com/insights",
      },
    ],
    press: [
      {
        text: "TCS reports Q3 FY25 revenue of ₹63,973 crore",
        url: "https://www.tcs.com/press-releases",
      },
      {
        text: "TCS named a Leader in Gartner Magic Quadrant 2024",
        url: "https://www.tcs.com/press-releases",
      },
    ],
    dev: [
      {
        text: "TCS Developer Community releases cloud automation tools",
        url: "https://www.tcs.com/insights",
      },
      {
        text: "TCS open-source contributions to AI/ML frameworks",
        url: "https://www.tcs.com/insights",
      },
    ],
    strategy: [
      {
        text: "TCS 2025 strategy: AI + cloud transformation focus",
        url: "https://www.tcs.com/insights",
      },
      {
        text: "TCS expanding presence in US, Europe and APAC markets",
        url: "https://www.tcs.com/insights",
      },
    ],
    news: [
      {
        text: "TCS wins multi-year digital transformation deal",
        url: "https://www.tcs.com/press-releases",
      },
      {
        text: "TCS recognized as top employer in India 2025",
        url: "https://www.tcs.com/press-releases",
      },
    ],
    jobs: [
      {
        role: "Software Engineer",
        dept: "Engineering",
        url: "https://www.tcs.com/careers",
      },
      {
        role: "AI/ML Engineer",
        dept: "Engineering",
        url: "https://www.tcs.com/careers",
      },
      {
        role: "Cloud Architect",
        dept: "Engineering",
        url: "https://www.tcs.com/careers",
      },
    ],
    confidence: 88,
  },
  Infosys: {
    color: "#3B82F6",
    initials: "INFY",
    officialUrls: {
      releaseNotes: "https://www.infosys.com/newsroom.html",
      features: "https://www.infosys.com/services.html",
      press: "https://www.infosys.com/newsroom.html",
      dev: "https://www.infosys.com/blogs.html",
    },
    releaseNotes: [
      {
        text: "Infosys Topaz AI platform — new feature releases",
        url: "https://www.infosys.com/newsroom.html",
      },
      {
        text: "Infosys Cobalt cloud suite updates announced",
        url: "https://www.infosys.com/newsroom.html",
      },
    ],
    features: [
      {
        text: "Infosys AI-first services platform launched",
        url: "https://www.infosys.com/services.html",
      },
      {
        text: "Infosys Live Enterprise suite new capabilities",
        url: "https://www.infosys.com/services.html",
      },
    ],
    press: [
      {
        text: "Infosys Q3 FY25 results — revenue guidance raised",
        url: "https://www.infosys.com/newsroom.html",
      },
      {
        text: "Infosys wins $1B+ deal in financial services",
        url: "https://www.infosys.com/newsroom.html",
      },
    ],
    dev: [
      {
        text: "Infosys Springboard learning platform updates",
        url: "https://www.infosys.com/blogs.html",
      },
      {
        text: "Infosys open-source AI tools released on GitHub",
        url: "https://www.infosys.com/blogs.html",
      },
    ],
    strategy: [
      {
        text: "Infosys 2025 strategy: Topaz AI for enterprise transformation",
        url: "https://www.infosys.com/newsroom.html",
      },
      {
        text: "Infosys expanding digital services in Europe and APAC",
        url: "https://www.infosys.com/newsroom.html",
      },
    ],
    news: [
      {
        text: "Infosys named Leader in AI services by Forrester",
        url: "https://www.infosys.com/newsroom.html",
      },
      {
        text: "Infosys launches sustainability AI platform",
        url: "https://www.infosys.com/newsroom.html",
      },
    ],
    jobs: [
      {
        role: "Software Engineer",
        dept: "Engineering",
        url: "https://www.infosys.com/careers.html",
      },
      {
        role: "Data Scientist",
        dept: "Research",
        url: "https://www.infosys.com/careers.html",
      },
      {
        role: "Cloud Consultant",
        dept: "Engineering",
        url: "https://www.infosys.com/careers.html",
      },
    ],
    confidence: 87,
  },
  Wipro: {
    color: "#8B5CF6",
    initials: "WIP",
    officialUrls: {
      releaseNotes: "https://www.wipro.com/newsroom/",
      features: "https://www.wipro.com/services/",
      press: "https://www.wipro.com/newsroom/press-releases/",
      dev: "https://www.wipro.com/developer/",
    },
    releaseNotes: [
      {
        text: "Wipro ai360 platform — enterprise AI features update",
        url: "https://www.wipro.com/newsroom/",
      },
      {
        text: "Wipro HOLMES AI platform new release",
        url: "https://www.wipro.com/newsroom/",
      },
    ],
    features: [
      {
        text: "Wipro FullStride Cloud services — new capabilities",
        url: "https://www.wipro.com/services/",
      },
      {
        text: "Wipro Consulting digital transformation services launched",
        url: "https://www.wipro.com/services/",
      },
    ],
    press: [
      {
        text: "Wipro Q3 FY25 revenue $2.63B, large deal TCV $1.5B+",
        url: "https://www.wipro.com/newsroom/press-releases/",
      },
      {
        text: "Wipro wins enterprise AI deal in Europe",
        url: "https://www.wipro.com/newsroom/press-releases/",
      },
    ],
    dev: [
      {
        text: "Wipro developer tools — API automation update",
        url: "https://www.wipro.com/developer/",
      },
      {
        text: "Wipro contributes to open source AI observability",
        url: "https://www.wipro.com/developer/",
      },
    ],
    strategy: [
      {
        text: "Wipro 2025: AI-led growth and margin expansion",
        url: "https://www.wipro.com/newsroom/",
      },
      {
        text: "Wipro expanding enterprise AI consulting globally",
        url: "https://www.wipro.com/newsroom/",
      },
    ],
    news: [
      {
        text: "Wipro recognized in Gartner Magic Quadrant 2025",
        url: "https://www.wipro.com/newsroom/press-releases/",
      },
      {
        text: "Wipro partners with Google Cloud for AI transformation",
        url: "https://www.wipro.com/newsroom/press-releases/",
      },
    ],
    jobs: [
      {
        role: "Senior Software Engineer",
        dept: "Engineering",
        url: "https://careers.wipro.com/",
      },
      {
        role: "AI Engineer",
        dept: "Engineering",
        url: "https://careers.wipro.com/",
      },
      {
        role: "Cloud Consultant",
        dept: "Engineering",
        url: "https://careers.wipro.com/",
      },
    ],
    confidence: 85,
  },
  HCLTech: {
    color: "#22D3EE",
    initials: "HCL",
    officialUrls: {
      releaseNotes: "https://www.hcltech.com/press-releases",
      features: "https://www.hcltech.com/services",
      press: "https://www.hcltech.com/press-releases",
      dev: "https://www.hcltech.com/blogs",
    },
    releaseNotes: [
      {
        text: "HCL Software product suite — latest platform updates",
        url: "https://www.hcltech.com/press-releases",
      },
      {
        text: "HCLTech AI Force platform new release",
        url: "https://www.hcltech.com/press-releases",
      },
    ],
    features: [
      {
        text: "HCLTech AI Force — enterprise AI automation features",
        url: "https://www.hcltech.com/services",
      },
      {
        text: "HCL DRYiCE AI-powered IT operations platform update",
        url: "https://www.hcltech.com/services",
      },
    ],
    press: [
      {
        text: "HCLTech FY25 revenue grows 5% YoY",
        url: "https://www.hcltech.com/press-releases",
      },
      {
        text: "HCLTech wins multi-year deal in financial services",
        url: "https://www.hcltech.com/press-releases",
      },
    ],
    dev: [
      {
        text: "HCLTech DevOps platform engineering updates",
        url: "https://www.hcltech.com/blogs",
      },
      {
        text: "HCLTech open source contribution to cloud frameworks",
        url: "https://www.hcltech.com/blogs",
      },
    ],
    strategy: [
      {
        text: "HCLTech 2025: AI and HCL Software growth strategy",
        url: "https://www.hcltech.com/insights",
      },
      {
        text: "HCLTech expanding engineering services in Europe",
        url: "https://www.hcltech.com/insights",
      },
    ],
    news: [
      {
        text: "HCLTech named Leader in HFS Research 2025",
        url: "https://www.hcltech.com/press-releases",
      },
      {
        text: "HCLTech launches AI talent upskilling program",
        url: "https://www.hcltech.com/press-releases",
      },
    ],
    jobs: [
      {
        role: "Software Engineer",
        dept: "Engineering",
        url: "https://www.hcltech.com/careers",
      },
      {
        role: "Data Scientist",
        dept: "Research",
        url: "https://www.hcltech.com/careers",
      },
      {
        role: "Cloud Engineer",
        dept: "Engineering",
        url: "https://www.hcltech.com/careers",
      },
    ],
    confidence: 84,
  },
  TechMahindra: {
    color: "#F472B6",
    initials: "TM",
    officialUrls: {
      releaseNotes: "https://www.techmahindra.com/en-in/media/press-releases/",
      features: "https://www.techmahindra.com/en-in/services/",
      press: "https://www.techmahindra.com/en-in/media/press-releases/",
      dev: "https://www.techmahindra.com/en-in/blogs/",
    },
    releaseNotes: [
      {
        text: "Tech Mahindra NXT.NOW platform — new AI capabilities",
        url: "https://www.techmahindra.com/en-in/media/press-releases/",
      },
      {
        text: "TechMahindra Sovereign Cloud platform launch",
        url: "https://www.techmahindra.com/en-in/media/press-releases/",
      },
    ],
    features: [
      {
        text: "TechMahindra AI and 5G convergence services",
        url: "https://www.techmahindra.com/en-in/services/",
      },
      {
        text: "TechMahindra digital supply chain solutions update",
        url: "https://www.techmahindra.com/en-in/services/",
      },
    ],
    press: [
      {
        text: "TechMahindra Q3 FY25 recovery — revenue growing",
        url: "https://www.techmahindra.com/en-in/media/press-releases/",
      },
      {
        text: "TechMahindra wins telecom deal in Europe",
        url: "https://www.techmahindra.com/en-in/media/press-releases/",
      },
    ],
    dev: [
      {
        text: "TechMahindra engineering blog — AI platform architecture",
        url: "https://www.techmahindra.com/en-in/blogs/",
      },
      {
        text: "TechMahindra DevOps automation tools update",
        url: "https://www.techmahindra.com/en-in/blogs/",
      },
    ],
    strategy: [
      {
        text: "Project Fortius: TechMahindra margin and revenue plan",
        url: "https://www.techmahindra.com/en-in/insights/",
      },
      {
        text: "TechMahindra AI University for 160,000 employees",
        url: "https://www.techmahindra.com/en-in/insights/",
      },
    ],
    news: [
      {
        text: "TechMahindra named in Gartner Leaders Quadrant",
        url: "https://www.techmahindra.com/en-in/media/press-releases/",
      },
      {
        text: "TechMahindra + Microsoft Azure partnership expanded",
        url: "https://www.techmahindra.com/en-in/media/press-releases/",
      },
    ],
    jobs: [
      {
        role: "Software Engineer",
        dept: "Engineering",
        url: "https://careers.techmahindra.com/",
      },
      {
        role: "AI Engineer",
        dept: "Engineering",
        url: "https://careers.techmahindra.com/",
      },
      {
        role: "Data Analyst",
        dept: "Research",
        url: "https://careers.techmahindra.com/",
      },
    ],
    confidence: 82,
  },
  Microsoft: {
    color: "#22D3EE",
    initials: "MS",
    officialUrls: {
      releaseNotes:
        "https://learn.microsoft.com/en-us/microsoft-365/admin/misc/release-notes",
      features: "https://www.microsoft.com/en-us/microsoft-365/blog/",
      press: "https://news.microsoft.com/",
      dev: "https://devblogs.microsoft.com/",
    },
    releaseNotes: [
      {
        text: "Windows 11 24H2 cumulative update released",
        url: "https://learn.microsoft.com/en-us/microsoft-365/admin/misc/release-notes",
      },
      {
        text: "Microsoft 365 Copilot — wave 2 features rollout",
        url: "https://learn.microsoft.com/en-us/microsoft-365/admin/misc/release-notes",
      },
      {
        text: "Azure OpenAI Service GPT-4o mini now GA",
        url: "https://learn.microsoft.com/en-us/microsoft-365/admin/misc/release-notes",
      },
    ],
    features: [
      {
        text: "Microsoft Copilot+ PC features expanding to all Windows 11",
        url: "https://www.microsoft.com/en-us/microsoft-365/blog/",
      },
      {
        text: "Azure AI Foundry — new enterprise AI development platform",
        url: "https://www.microsoft.com/en-us/microsoft-365/blog/",
      },
      {
        text: "Teams AI meeting summarization now GA",
        url: "https://www.microsoft.com/en-us/microsoft-365/blog/",
      },
    ],
    press: [
      {
        text: "Microsoft FY25 Q2 revenue $69.6B, Azure grew 31%",
        url: "https://news.microsoft.com/",
      },
      {
        text: "Microsoft announces $80B AI infrastructure investment",
        url: "https://news.microsoft.com/",
      },
    ],
    dev: [
      {
        text: "Visual Studio Code 1.96 released with AI features",
        url: "https://devblogs.microsoft.com/",
      },
      {
        text: "GitHub Copilot now powered by GPT-4o and o1",
        url: "https://devblogs.microsoft.com/",
      },
    ],
    strategy: [
      {
        text: "Microsoft AI-first transformation across all products",
        url: "https://blogs.microsoft.com/",
      },
      {
        text: "Microsoft + OpenAI partnership deepening in 2025",
        url: "https://blogs.microsoft.com/",
      },
    ],
    news: [
      {
        text: "Microsoft named #1 most valuable company globally",
        url: "https://news.microsoft.com/",
      },
      {
        text: "Microsoft Activision Blizzard integration updates",
        url: "https://news.microsoft.com/",
      },
    ],
    jobs: [
      {
        role: "Senior Software Engineer",
        dept: "Engineering",
        url: "https://careers.microsoft.com/",
      },
      {
        role: "AI Research Scientist",
        dept: "Research",
        url: "https://careers.microsoft.com/",
      },
      {
        role: "Product Manager, Azure",
        dept: "Product",
        url: "https://careers.microsoft.com/",
      },
    ],
    confidence: 97,
  },
  Google: {
    color: "#34D399",
    initials: "GGL",
    officialUrls: {
      releaseNotes: "https://developers.google.com/release-notes",
      features: "https://workspace.google.com/whatsnew/",
      press: "https://blog.google/",
      dev: "https://developers.googleblog.com/",
    },
    releaseNotes: [
      {
        text: "Google Gemini 2.0 Flash released — multimodal AI",
        url: "https://developers.google.com/release-notes",
      },
      {
        text: "Android 15 QPR1 update — new features released",
        url: "https://developers.google.com/release-notes",
      },
      {
        text: "Google Workspace new AI features rollout",
        url: "https://developers.google.com/release-notes",
      },
    ],
    features: [
      {
        text: "Gemini in Google Workspace — Deep Research launched",
        url: "https://workspace.google.com/whatsnew/",
      },
      {
        text: "Google NotebookLM Plus enterprise tier launched",
        url: "https://workspace.google.com/whatsnew/",
      },
      {
        text: "Google Vids — AI video creation tool GA",
        url: "https://workspace.google.com/whatsnew/",
      },
    ],
    press: [
      {
        text: "Alphabet Q4 2024 revenue $96.5B, up 12% YoY",
        url: "https://blog.google/",
      },
      {
        text: "Google Cloud reaches $12B quarterly revenue milestone",
        url: "https://blog.google/",
      },
    ],
    dev: [
      {
        text: "Google AI Studio — Gemini API new capabilities",
        url: "https://developers.googleblog.com/",
      },
      {
        text: "Firebase Genkit AI framework update released",
        url: "https://developers.googleblog.com/",
      },
    ],
    strategy: [
      {
        text: "Google AI-first strategy: Gemini across all products",
        url: "https://about.google/stories/",
      },
      {
        text: "Google $75B capex for AI/cloud infrastructure in 2025",
        url: "https://about.google/stories/",
      },
    ],
    news: [
      {
        text: "Google Willow quantum chip breakthrough announced",
        url: "https://blog.google/",
      },
      {
        text: "Google wins DOJ appeal in ad tech antitrust case",
        url: "https://blog.google/",
      },
    ],
    jobs: [
      {
        role: "Software Engineer, AI/ML",
        dept: "Engineering",
        url: "https://careers.google.com/",
      },
      {
        role: "Research Scientist, Gemini",
        dept: "Research",
        url: "https://careers.google.com/",
      },
      {
        role: "Product Manager, Cloud",
        dept: "Product",
        url: "https://careers.google.com/",
      },
    ],
    confidence: 97,
  },
  Apple: {
    color: "#A78BFA",
    initials: "APL",
    officialUrls: {
      releaseNotes: "https://developer.apple.com/news/releases/",
      features: "https://www.apple.com/newsroom/",
      press: "https://www.apple.com/newsroom/",
      dev: "https://developer.apple.com/news/",
    },
    releaseNotes: [
      {
        text: "iOS 18.3 — Apple Intelligence new features released",
        url: "https://developer.apple.com/news/releases/",
      },
      {
        text: "macOS Sequoia 15.3 security and AI updates",
        url: "https://developer.apple.com/news/releases/",
      },
      {
        text: "visionOS 2.3 spatial computing improvements",
        url: "https://developer.apple.com/news/releases/",
      },
    ],
    features: [
      {
        text: "Apple Intelligence — ChatGPT integration now live in Siri",
        url: "https://www.apple.com/newsroom/",
      },
      {
        text: "iPhone 17 rumored features: ultra-thin design, camera upgrade",
        url: "https://www.apple.com/newsroom/",
      },
      {
        text: "Apple Vision Pro second-gen development confirmed",
        url: "https://www.apple.com/newsroom/",
      },
    ],
    press: [
      {
        text: "Apple Q1 FY25 revenue $124.3B, record Services quarter",
        url: "https://www.apple.com/newsroom/",
      },
      {
        text: "Apple Intelligence expanding to more regions and languages",
        url: "https://www.apple.com/newsroom/",
      },
    ],
    dev: [
      {
        text: "Xcode 16.3 — new Swift 6 concurrency improvements",
        url: "https://developer.apple.com/news/",
      },
      {
        text: "SwiftUI new components and animations in latest update",
        url: "https://developer.apple.com/news/",
      },
    ],
    strategy: [
      {
        text: "Apple Services: $100B+ annual run rate milestone",
        url: "https://www.apple.com/newsroom/",
      },
      {
        text: "Apple silicon roadmap: M4 chips across entire lineup",
        url: "https://www.apple.com/newsroom/",
      },
    ],
    news: [
      {
        text: "Apple wins EU App Store ruling — opens third-party payments",
        url: "https://www.apple.com/newsroom/",
      },
      {
        text: "Apple manufacturing expanding in India with Foxconn",
        url: "https://www.apple.com/newsroom/",
      },
    ],
    jobs: [
      {
        role: "iOS Software Engineer",
        dept: "Engineering",
        url: "https://jobs.apple.com/",
      },
      {
        role: "ML Research Engineer",
        dept: "Research",
        url: "https://jobs.apple.com/",
      },
      {
        role: "Product Design Lead",
        dept: "Design",
        url: "https://jobs.apple.com/",
      },
    ],
    confidence: 96,
  },
  Meta: {
    color: "#3B82F6",
    initials: "META",
    officialUrls: {
      releaseNotes: "https://developers.facebook.com/blog/",
      features: "https://about.fb.com/news/",
      press: "https://about.fb.com/news/",
      dev: "https://engineering.fb.com/",
    },
    releaseNotes: [
      {
        text: "Llama 3.3 70B released — open-source AI model",
        url: "https://developers.facebook.com/blog/",
      },
      {
        text: "Meta AI assistant — multimodal image features updated",
        url: "https://developers.facebook.com/blog/",
      },
      {
        text: "WhatsApp Business API new features released",
        url: "https://developers.facebook.com/blog/",
      },
    ],
    features: [
      {
        text: "Meta AI now available in WhatsApp, Instagram, Messenger",
        url: "https://about.fb.com/news/",
      },
      {
        text: "Ray-Ban Meta smart glasses — AI audio features update",
        url: "https://about.fb.com/news/",
      },
      {
        text: "Threads adds new creator monetization tools",
        url: "https://about.fb.com/news/",
      },
    ],
    press: [
      {
        text: "Meta Q4 2024 revenue $48.4B, up 21% YoY",
        url: "https://about.fb.com/news/",
      },
      {
        text: "Meta plans $65B AI infrastructure investment in 2025",
        url: "https://about.fb.com/news/",
      },
    ],
    dev: [
      {
        text: "PyTorch 2.5 released — new features and optimizations",
        url: "https://engineering.fb.com/",
      },
      {
        text: "Meta open-sources Seamless communication AI models",
        url: "https://engineering.fb.com/",
      },
    ],
    strategy: [
      {
        text: "Meta year of efficiency: profitable AI investment strategy",
        url: "https://about.fb.com/news/",
      },
      {
        text: "Meta Reality Labs — AR glasses roadmap to 2030",
        url: "https://about.fb.com/news/",
      },
    ],
    news: [
      {
        text: "Meta AI reaches 500M monthly active users",
        url: "https://about.fb.com/news/",
      },
      {
        text: "Meta partners with Qualcomm for on-device AI chips",
        url: "https://about.fb.com/news/",
      },
    ],
    jobs: [
      {
        role: "Software Engineer, AI",
        dept: "Engineering",
        url: "https://www.metacareers.com/",
      },
      {
        role: "Research Scientist, LLM",
        dept: "Research",
        url: "https://www.metacareers.com/",
      },
      {
        role: "Product Manager, Llama",
        dept: "Product",
        url: "https://www.metacareers.com/",
      },
    ],
    confidence: 95,
  },
  Amazon: {
    color: "#FB923C",
    initials: "AMZN",
    officialUrls: {
      releaseNotes: "https://aws.amazon.com/new/",
      features: "https://aws.amazon.com/whats-new/",
      press: "https://press.aboutamazon.com/",
      dev: "https://aws.amazon.com/blogs/aws/",
    },
    releaseNotes: [
      {
        text: "Amazon Nova foundation models released on Bedrock",
        url: "https://aws.amazon.com/new/",
      },
      {
        text: "AWS re:Invent 2024 — 1,000+ new features announced",
        url: "https://aws.amazon.com/new/",
      },
      {
        text: "Amazon Q Developer new IDE integrations released",
        url: "https://aws.amazon.com/new/",
      },
    ],
    features: [
      {
        text: "Amazon Bedrock — new multi-agent framework launched",
        url: "https://aws.amazon.com/whats-new/",
      },
      {
        text: "AWS Trainium3 chips for ultra-fast AI training",
        url: "https://aws.amazon.com/whats-new/",
      },
      {
        text: "Amazon Q Business — enterprise AI assistant GA",
        url: "https://aws.amazon.com/whats-new/",
      },
    ],
    press: [
      {
        text: "Amazon Q4 2024 revenue $187.8B, AWS $28.8B",
        url: "https://press.aboutamazon.com/",
      },
      {
        text: "Amazon invests $4B in Anthropic — AI partnership",
        url: "https://press.aboutamazon.com/",
      },
    ],
    dev: [
      {
        text: "AWS CDK v2 major update — new L2 constructs",
        url: "https://aws.amazon.com/blogs/aws/",
      },
      {
        text: "Amazon Bedrock SDK Python — new async features",
        url: "https://aws.amazon.com/blogs/aws/",
      },
    ],
    strategy: [
      {
        text: "AWS $100B+ capex for AI/cloud infrastructure in 2025",
        url: "https://about.amazon.com/news/",
      },
      {
        text: "Amazon Pharmacy, healthcare expansion accelerating",
        url: "https://about.amazon.com/news/",
      },
    ],
    news: [
      {
        text: "Amazon delivery drone Prime Air expanding to new cities",
        url: "https://press.aboutamazon.com/",
      },
      {
        text: "Amazon MGM Prime Video content record investment",
        url: "https://press.aboutamazon.com/",
      },
    ],
    jobs: [
      {
        role: "Software Development Engineer",
        dept: "Engineering",
        url: "https://amazon.jobs/",
      },
      {
        role: "Applied Scientist, AWS AI",
        dept: "Research",
        url: "https://amazon.jobs/",
      },
      {
        role: "Product Manager, Bedrock",
        dept: "Product",
        url: "https://amazon.jobs/",
      },
    ],
    confidence: 97,
  },
  Netflix: {
    color: "#FB7185",
    initials: "NFLX",
    officialUrls: {
      releaseNotes: "https://netflixtechblog.com/",
      features: "https://about.netflix.com/en",
      press: "https://about.netflix.com/en/news",
      dev: "https://netflixtechblog.com/",
    },
    releaseNotes: [
      {
        text: "Netflix adaptive streaming algorithm v4 deployed",
        url: "https://netflixtechblog.com/",
      },
      {
        text: "Netflix mobile app UI redesign — new homepage launched",
        url: "https://netflixtechblog.com/",
      },
      {
        text: "Netflix Ads Suite — new programmatic features released",
        url: "https://netflixtechblog.com/",
      },
    ],
    features: [
      {
        text: "Netflix Live sports — NFL Christmas Day streaming success",
        url: "https://about.netflix.com/en",
      },
      {
        text: "Netflix Games expanding to TV — new titles launched",
        url: "https://about.netflix.com/en",
      },
      {
        text: "Netflix AI-powered personalization improvements deployed",
        url: "https://about.netflix.com/en",
      },
    ],
    press: [
      {
        text: "Netflix Q4 2024 membership 302M+, ad revenue growing",
        url: "https://about.netflix.com/en/news",
      },
      {
        text: "Netflix WWE Raw exclusive streaming from Jan 2025",
        url: "https://about.netflix.com/en/news",
      },
    ],
    dev: [
      {
        text: "Netflix open-sources Maestro workflow orchestrator",
        url: "https://netflixtechblog.com/",
      },
      {
        text: "Netflix ML platform improvements for recommendation engine",
        url: "https://netflixtechblog.com/",
      },
    ],
    strategy: [
      {
        text: "Netflix ad-supported tier: 70M+ users driving new revenue",
        url: "https://about.netflix.com/en/news",
      },
      {
        text: "Netflix live sports strategy: NFL, WWE, boxing deals",
        url: "https://about.netflix.com/en/news",
      },
    ],
    news: [
      {
        text: "Netflix Squid Game Season 2 record viewership numbers",
        url: "https://about.netflix.com/en/news",
      },
      {
        text: "Netflix raises subscription prices across all tiers",
        url: "https://about.netflix.com/en/news",
      },
    ],
    jobs: [
      {
        role: "Software Engineer, Streaming",
        dept: "Engineering",
        url: "https://jobs.netflix.com/",
      },
      {
        role: "ML Engineer, Recommendations",
        dept: "Engineering",
        url: "https://jobs.netflix.com/",
      },
      {
        role: "Product Manager, Live",
        dept: "Product",
        url: "https://jobs.netflix.com/",
      },
    ],
    confidence: 92,
  },
  Spotify: {
    color: "#22D3EE",
    initials: "SPOT",
    officialUrls: {
      releaseNotes: "https://engineering.atspotify.com/",
      features: "https://newsroom.spotify.com/",
      press: "https://newsroom.spotify.com/",
      dev: "https://engineering.atspotify.com/",
    },
    releaseNotes: [
      {
        text: "Spotify AI DJ — new voice and playlist features",
        url: "https://engineering.atspotify.com/",
      },
      {
        text: "Spotify audiobooks — new chapter navigation released",
        url: "https://engineering.atspotify.com/",
      },
      {
        text: "Spotify podcast analytics dashboard v2 released",
        url: "https://engineering.atspotify.com/",
      },
    ],
    features: [
      {
        text: "Spotify AI playlist generation — beta expansion",
        url: "https://newsroom.spotify.com/",
      },
      {
        text: "Spotify HiFi lossless audio tier coming in 2025",
        url: "https://newsroom.spotify.com/",
      },
      {
        text: "Spotify Backstage developer portal new integrations",
        url: "https://newsroom.spotify.com/",
      },
    ],
    press: [
      {
        text: "Spotify Q4 2024 MAU 675M, first full year of GAAP profit",
        url: "https://newsroom.spotify.com/",
      },
      {
        text: "Spotify raises Premium prices in multiple markets",
        url: "https://newsroom.spotify.com/",
      },
    ],
    dev: [
      {
        text: "Spotify Backstage 1.30 open-source update released",
        url: "https://engineering.atspotify.com/",
      },
      {
        text: "Spotify data platform engineering improvements shared",
        url: "https://engineering.atspotify.com/",
      },
    ],
    strategy: [
      {
        text: "Spotify 2025 strategy: AI, audiobooks and podcast monetization",
        url: "https://newsroom.spotify.com/",
      },
      {
        text: "Spotify expanding into markets across Africa and SE Asia",
        url: "https://newsroom.spotify.com/",
      },
    ],
    news: [
      {
        text: "Spotify CEO Daniel Ek announces AI music ambitions",
        url: "https://newsroom.spotify.com/",
      },
      {
        text: "Spotify partners with Samsung for deeper Galaxy integration",
        url: "https://newsroom.spotify.com/",
      },
    ],
    jobs: [
      {
        role: "Backend Engineer",
        dept: "Engineering",
        url: "https://www.lifeatspotify.com/jobs",
      },
      {
        role: "ML Engineer, Recommendations",
        dept: "Engineering",
        url: "https://www.lifeatspotify.com/jobs",
      },
      {
        role: "Product Manager, AI",
        dept: "Product",
        url: "https://www.lifeatspotify.com/jobs",
      },
    ],
    confidence: 91,
  },
  Zoom: {
    color: "#3B82F6",
    initials: "ZOOM",
    officialUrls: {
      releaseNotes:
        "https://support.zoom.com/hc/en/article?id=zm_kb&sysparm_article=KB0070640",
      features: "https://explore.zoom.us/en/whats-new/",
      press: "https://news.zoom.us/",
      dev: "https://devforum.zoom.us/",
    },
    releaseNotes: [
      {
        text: "Zoom 6.2 — AI Companion 2.0 features released",
        url: "https://support.zoom.com/hc/en/article?id=zm_kb&sysparm_article=KB0070640",
      },
      {
        text: "Zoom Phone voicemail AI transcription improvements",
        url: "https://support.zoom.com/hc/en/article?id=zm_kb&sysparm_article=KB0070640",
      },
      {
        text: "Zoom Docs collaboration tool generally available",
        url: "https://support.zoom.com/hc/en/article?id=zm_kb&sysparm_article=KB0070640",
      },
    ],
    features: [
      {
        text: "Zoom AI Companion 2.0 — cross-platform AI summaries",
        url: "https://explore.zoom.us/en/whats-new/",
      },
      {
        text: "Zoom Contact Center — AI-powered customer service",
        url: "https://explore.zoom.us/en/whats-new/",
      },
      {
        text: "Zoom Workvivo employee experience platform update",
        url: "https://explore.zoom.us/en/whats-new/",
      },
    ],
    press: [
      {
        text: "Zoom FY25 revenue $4.7B, AI Companion driving upsell",
        url: "https://news.zoom.us/",
      },
      {
        text: "Zoom Contact Center ARR growing 100%+ YoY",
        url: "https://news.zoom.us/",
      },
    ],
    dev: [
      {
        text: "Zoom Developer Platform — new REST API features",
        url: "https://devforum.zoom.us/",
      },
      {
        text: "Zoom Apps SDK v2 — new integrations available",
        url: "https://devforum.zoom.us/",
      },
    ],
    strategy: [
      {
        text: "Zoom 2025: AI-first platform beyond video meetings",
        url: "https://blog.zoom.us/",
      },
      {
        text: "Zoom expanding Contact Center and Phone globally",
        url: "https://blog.zoom.us/",
      },
    ],
    news: [
      {
        text: "Zoom partners with Anthropic for AI Companion features",
        url: "https://news.zoom.us/",
      },
      {
        text: "Zoom named Leader in Gartner UCaaS Magic Quadrant",
        url: "https://news.zoom.us/",
      },
    ],
    jobs: [
      {
        role: "Software Engineer, AI",
        dept: "Engineering",
        url: "https://careers.zoom.us/",
      },
      {
        role: "Product Manager, Contact Center",
        dept: "Product",
        url: "https://careers.zoom.us/",
      },
      {
        role: "Sales Engineer",
        dept: "Sales",
        url: "https://careers.zoom.us/",
      },
    ],
    confidence: 88,
  },
  Salesforce: {
    color: "#22D3EE",
    initials: "CRM",
    officialUrls: {
      releaseNotes:
        "https://help.salesforce.com/s/articleView?id=release-notes.salesforce_release_notes.htm",
      features: "https://www.salesforce.com/news/product-news/",
      press: "https://www.salesforce.com/news/press-releases/",
      dev: "https://developer.salesforce.com/blogs/",
    },
    releaseNotes: [
      {
        text: "Salesforce Spring 25 release — Agentforce enhancements",
        url: "https://help.salesforce.com/s/articleView?id=release-notes.salesforce_release_notes.htm",
      },
      {
        text: "Einstein Copilot renamed Agentforce — GA launch",
        url: "https://help.salesforce.com/s/articleView?id=release-notes.salesforce_release_notes.htm",
      },
      {
        text: "Slack AI summarization — new features released",
        url: "https://help.salesforce.com/s/articleView?id=release-notes.salesforce_release_notes.htm",
      },
    ],
    features: [
      {
        text: "Agentforce — autonomous AI agents for enterprise workflows",
        url: "https://www.salesforce.com/news/product-news/",
      },
      {
        text: "Data Cloud real-time customer data platform update",
        url: "https://www.salesforce.com/news/product-news/",
      },
      {
        text: "MuleSoft AI-powered integration platform features",
        url: "https://www.salesforce.com/news/product-news/",
      },
    ],
    press: [
      {
        text: "Salesforce FY25 Q3 revenue $9.4B, Agentforce driving growth",
        url: "https://www.salesforce.com/news/press-releases/",
      },
      {
        text: "Salesforce announces 1,000+ Agentforce enterprise deals",
        url: "https://www.salesforce.com/news/press-releases/",
      },
    ],
    dev: [
      {
        text: "Salesforce Apex new features in Spring 25 release",
        url: "https://developer.salesforce.com/blogs/",
      },
      {
        text: "Salesforce Einstein AI SDK — developer tools update",
        url: "https://developer.salesforce.com/blogs/",
      },
    ],
    strategy: [
      {
        text: "Salesforce Agentforce: AI agents as new revenue driver",
        url: "https://www.salesforce.com/blog/",
      },
      {
        text: "Salesforce Data Cloud as foundation for enterprise AI",
        url: "https://www.salesforce.com/blog/",
      },
    ],
    news: [
      {
        text: "Salesforce partners with NVIDIA for enterprise AI",
        url: "https://www.salesforce.com/news/press-releases/",
      },
      {
        text: "Salesforce acquires Zoomin to strengthen Data Cloud",
        url: "https://www.salesforce.com/news/press-releases/",
      },
    ],
    jobs: [
      {
        role: "Software Engineer, Agentforce",
        dept: "Engineering",
        url: "https://careers.salesforce.com/",
      },
      {
        role: "AI Research Scientist",
        dept: "Research",
        url: "https://careers.salesforce.com/",
      },
      {
        role: "Product Manager, Data Cloud",
        dept: "Product",
        url: "https://careers.salesforce.com/",
      },
    ],
    confidence: 93,
  },
  Adobe: {
    color: "#FB7185",
    initials: "ADBE",
    officialUrls: {
      releaseNotes: "https://helpx.adobe.com/release-notes.html",
      features: "https://blog.adobe.com/",
      press: "https://news.adobe.com/",
      dev: "https://blog.developer.adobe.com/",
    },
    releaseNotes: [
      {
        text: "Photoshop 26.4 — Generative Fill improvements released",
        url: "https://helpx.adobe.com/release-notes.html",
      },
      {
        text: "Adobe Premiere Pro 24.6 — AI dubbing features GA",
        url: "https://helpx.adobe.com/release-notes.html",
      },
      {
        text: "Adobe Acrobat AI Assistant — new document features",
        url: "https://helpx.adobe.com/release-notes.html",
      },
    ],
    features: [
      {
        text: "Adobe Firefly 3 — improved photorealism and structure reference",
        url: "https://blog.adobe.com/",
      },
      {
        text: "Adobe Express — new brand kit AI features",
        url: "https://blog.adobe.com/",
      },
      {
        text: "Adobe Frame.io v4 — collaborative video review update",
        url: "https://blog.adobe.com/",
      },
    ],
    press: [
      {
        text: "Adobe FY24 revenue $21.5B, Firefly 13B+ images generated",
        url: "https://news.adobe.com/",
      },
      {
        text: "Adobe Firefly API enterprise program expanding",
        url: "https://news.adobe.com/",
      },
    ],
    dev: [
      {
        text: "Adobe PDF Services API new features released",
        url: "https://blog.developer.adobe.com/",
      },
      {
        text: "Adobe Firefly API now available for enterprise integration",
        url: "https://blog.developer.adobe.com/",
      },
    ],
    strategy: [
      {
        text: "Adobe AI-first strategy: Firefly embedded in all products",
        url: "https://blog.adobe.com/",
      },
      {
        text: "Adobe Digital Experience cloud expanding enterprise AI",
        url: "https://blog.adobe.com/",
      },
    ],
    news: [
      {
        text: "Adobe partners with NVIDIA for generative AI acceleration",
        url: "https://news.adobe.com/",
      },
      {
        text: "Adobe named Leader in Gartner DXP Magic Quadrant 2025",
        url: "https://news.adobe.com/",
      },
    ],
    jobs: [
      {
        role: "Software Engineer, Creative Cloud",
        dept: "Engineering",
        url: "https://careers.adobe.com/",
      },
      {
        role: "ML Engineer, Firefly",
        dept: "Engineering",
        url: "https://careers.adobe.com/",
      },
      {
        role: "Product Designer",
        dept: "Design",
        url: "https://careers.adobe.com/",
      },
    ],
    confidence: 92,
  },
  Cloudflare: {
    color: "#FB923C",
    initials: "CF",
    officialUrls: {
      releaseNotes: "https://blog.cloudflare.com/tag/product-news/",
      features: "https://www.cloudflare.com/whats-new/",
      press: "https://www.cloudflare.com/press-releases/",
      dev: "https://blog.cloudflare.com/tag/developers/",
    },
    releaseNotes: [
      {
        text: "Cloudflare Workers AI — new model catalog additions",
        url: "https://blog.cloudflare.com/tag/product-news/",
      },
      {
        text: "Cloudflare R2 storage — new lifecycle policies released",
        url: "https://blog.cloudflare.com/tag/product-news/",
      },
      {
        text: "Cloudflare AI Gateway — LLM routing features GA",
        url: "https://blog.cloudflare.com/tag/product-news/",
      },
    ],
    features: [
      {
        text: "Cloudflare Zero Trust — new AI threat intelligence",
        url: "https://www.cloudflare.com/whats-new/",
      },
      {
        text: "Cloudflare Vectorize — vector DB for AI apps update",
        url: "https://www.cloudflare.com/whats-new/",
      },
      {
        text: "Cloudflare Pages — new build system improvements",
        url: "https://www.cloudflare.com/whats-new/",
      },
    ],
    press: [
      {
        text: "Cloudflare Q4 2024 revenue $459M, up 27% YoY",
        url: "https://www.cloudflare.com/press-releases/",
      },
      {
        text: "Cloudflare blocks record DDoS attacks in 2024",
        url: "https://www.cloudflare.com/press-releases/",
      },
    ],
    dev: [
      {
        text: "Wrangler CLI 4.0 — new Workers deployment features",
        url: "https://blog.cloudflare.com/tag/developers/",
      },
      {
        text: "Cloudflare D1 database — new query optimization",
        url: "https://blog.cloudflare.com/tag/developers/",
      },
    ],
    strategy: [
      {
        text: "Cloudflare 2025: AI-native edge computing platform",
        url: "https://blog.cloudflare.com/",
      },
      {
        text: "Cloudflare expanding to 330+ cities globally",
        url: "https://blog.cloudflare.com/",
      },
    ],
    news: [
      {
        text: "Cloudflare partners with NVIDIA for AI inference at edge",
        url: "https://www.cloudflare.com/press-releases/",
      },
      {
        text: "Cloudflare named Leader in Forrester Zero Trust Wave",
        url: "https://www.cloudflare.com/press-releases/",
      },
    ],
    jobs: [
      {
        role: "Software Engineer, Rust",
        dept: "Engineering",
        url: "https://www.cloudflare.com/careers/",
      },
      {
        role: "Network Security Engineer",
        dept: "Engineering",
        url: "https://www.cloudflare.com/careers/",
      },
      {
        role: "Developer Advocate",
        dept: "Engineering",
        url: "https://www.cloudflare.com/careers/",
      },
    ],
    confidence: 91,
  },
  Datadog: {
    color: "#A78BFA",
    initials: "DDOG",
    officialUrls: {
      releaseNotes:
        "https://docs.datadoghq.com/agent/guide/agent-release-changelog/",
      features: "https://www.datadoghq.com/blog/",
      press: "https://www.datadoghq.com/about/press/",
      dev: "https://www.datadoghq.com/blog/engineering/",
    },
    releaseNotes: [
      {
        text: "Datadog Agent 7.58 — new AI observability features",
        url: "https://docs.datadoghq.com/agent/guide/agent-release-changelog/",
      },
      {
        text: "Datadog LLM Observability module generally available",
        url: "https://docs.datadoghq.com/agent/guide/agent-release-changelog/",
      },
      {
        text: "Datadog Security Inbox — AI-prioritized risk management",
        url: "https://docs.datadoghq.com/agent/guide/agent-release-changelog/",
      },
    ],
    features: [
      {
        text: "Datadog Bits AI — generative AI for observability",
        url: "https://www.datadoghq.com/blog/",
      },
      {
        text: "Datadog Software Catalog — new service tracking features",
        url: "https://www.datadoghq.com/blog/",
      },
      {
        text: "Datadog Cloud Cost Management — new allocation features",
        url: "https://www.datadoghq.com/blog/",
      },
    ],
    press: [
      {
        text: "Datadog Q4 2024 ARR $3B+, growing 26% YoY",
        url: "https://www.datadoghq.com/about/press/",
      },
      {
        text: "Datadog named Leader in Gartner APM Magic Quadrant",
        url: "https://www.datadoghq.com/about/press/",
      },
    ],
    dev: [
      {
        text: "Datadog API new endpoints for AI observability",
        url: "https://www.datadoghq.com/blog/engineering/",
      },
      {
        text: "Datadog open-source tracing library dd-trace improvements",
        url: "https://www.datadoghq.com/blog/engineering/",
      },
    ],
    strategy: [
      {
        text: "Datadog 2025: AI observability as core growth driver",
        url: "https://www.datadoghq.com/blog/",
      },
      {
        text: "Datadog expanding into cloud cost and security markets",
        url: "https://www.datadoghq.com/blog/",
      },
    ],
    news: [
      {
        text: "Datadog partners with AWS for native observability integration",
        url: "https://www.datadoghq.com/about/press/",
      },
      {
        text: "Datadog Dash 2024 recap — AI features launched",
        url: "https://www.datadoghq.com/about/press/",
      },
    ],
    jobs: [
      {
        role: "Software Engineer, Platform",
        dept: "Engineering",
        url: "https://careers.datadoghq.com/",
      },
      {
        role: "Product Manager, AI Observability",
        dept: "Product",
        url: "https://careers.datadoghq.com/",
      },
      {
        role: "Technical Sales Engineer",
        dept: "Sales",
        url: "https://careers.datadoghq.com/",
      },
    ],
    confidence: 91,
  },
  Zomato: {
    color: "#FB923C",
    initials: "ZOM",
    officialUrls: {
      releaseNotes: "https://blog.zomato.com/",
      features: "https://www.zomato.com/blog/",
      press: "https://www.zomato.com/media-kit",
      dev: "https://blog.zomato.com/",
    },
    releaseNotes: [
      {
        text: "Blinkit app v12 — faster checkout and AI suggestions",
        url: "https://blog.zomato.com/",
      },
      {
        text: "Zomato Gold redesign — new benefits and UI",
        url: "https://blog.zomato.com/",
      },
      {
        text: "Zomato Xtreme hyperfast delivery pilot launched",
        url: "https://blog.zomato.com/",
      },
    ],
    features: [
      {
        text: "Zomato District — live events and entertainment booking",
        url: "https://www.zomato.com/blog/",
      },
      {
        text: "Blinkit dark stores expansion: 700+ cities target",
        url: "https://www.zomato.com/blog/",
      },
      {
        text: "Zomato Pure Veg Mode — filter for vegetarian restaurants",
        url: "https://www.zomato.com/blog/",
      },
    ],
    press: [
      {
        text: "Zomato rebrands as Eternal Ltd for broader identity",
        url: "https://www.zomato.com/media-kit",
      },
      {
        text: "Blinkit GMV crosses ₹15,000 crore quarterly milestone",
        url: "https://www.zomato.com/media-kit",
      },
    ],
    dev: [
      {
        text: "Zomato engineering blog — ML routing optimization",
        url: "https://blog.zomato.com/",
      },
      {
        text: "Zomato real-time delivery tracking infrastructure upgrade",
        url: "https://blog.zomato.com/",
      },
    ],
    strategy: [
      {
        text: "Zomato 2025: food + quick commerce + entertainment platform",
        url: "https://www.zomato.com/blog/",
      },
      {
        text: "Hyperpure B2B ingredients reaching 50,000+ restaurant partners",
        url: "https://www.zomato.com/blog/",
      },
    ],
    news: [
      {
        text: "Zomato acquires Paytm Insider for events marketplace",
        url: "https://www.zomato.com/media-kit",
      },
      {
        text: "Deepinder Goyal named EY Entrepreneur of the Year 2024",
        url: "https://www.zomato.com/media-kit",
      },
    ],
    jobs: [
      {
        role: "Software Engineer",
        dept: "Engineering",
        url: "https://www.zomato.com/careers",
      },
      {
        role: "Data Scientist",
        dept: "Research",
        url: "https://www.zomato.com/careers",
      },
      {
        role: "Product Manager",
        dept: "Product",
        url: "https://www.zomato.com/careers",
      },
    ],
    confidence: 83,
  },
  Razorpay: {
    color: "#3B82F6",
    initials: "RPY",
    officialUrls: {
      releaseNotes: "https://razorpay.com/blog/",
      features: "https://razorpay.com/features/",
      press: "https://razorpay.com/newsroom/",
      dev: "https://razorpay.com/blog/",
    },
    releaseNotes: [
      {
        text: "Razorpay Magic Checkout 3.0 — AI-powered 1-click checkout",
        url: "https://razorpay.com/blog/",
      },
      {
        text: "RazorpayX current account — new banking features",
        url: "https://razorpay.com/blog/",
      },
      {
        text: "Razorpay Turbo UPI — sub-second payments GA",
        url: "https://razorpay.com/blog/",
      },
    ],
    features: [
      {
        text: "Razorpay Smart Collect — automated payment reconciliation",
        url: "https://razorpay.com/features/",
      },
      {
        text: "Razorpay Route for marketplace payment splitting",
        url: "https://razorpay.com/features/",
      },
      {
        text: "Razorpay Capital — embedded lending for businesses",
        url: "https://razorpay.com/features/",
      },
    ],
    press: [
      {
        text: "Razorpay processes $150B+ annualized payment volume",
        url: "https://razorpay.com/newsroom/",
      },
      {
        text: "Razorpay expands to Southeast Asia markets",
        url: "https://razorpay.com/newsroom/",
      },
    ],
    dev: [
      {
        text: "Razorpay API v2 — new webhook retry improvements",
        url: "https://razorpay.com/blog/",
      },
      {
        text: "Razorpay Node.js SDK 2.9 released",
        url: "https://razorpay.com/blog/",
      },
    ],
    strategy: [
      {
        text: "Razorpay 2025: full-stack financial services for businesses",
        url: "https://razorpay.com/blog/",
      },
      {
        text: "Razorpay IPO preparations underway for 2025/26",
        url: "https://razorpay.com/blog/",
      },
    ],
    news: [
      {
        text: "Razorpay named India fastest growing fintech 2024",
        url: "https://razorpay.com/newsroom/",
      },
      {
        text: "Razorpay launches Optimizer for smart payment routing",
        url: "https://razorpay.com/newsroom/",
      },
    ],
    jobs: [
      {
        role: "Software Engineer, Payments",
        dept: "Engineering",
        url: "https://razorpay.com/jobs/",
      },
      {
        role: "Product Manager, UPI",
        dept: "Product",
        url: "https://razorpay.com/jobs/",
      },
      {
        role: "Data Scientist",
        dept: "Research",
        url: "https://razorpay.com/jobs/",
      },
    ],
    confidence: 84,
  },
  Freshworks: {
    color: "#34D399",
    initials: "FW",
    officialUrls: {
      releaseNotes: "https://www.freshworks.com/product-updates/",
      features: "https://www.freshworks.com/blog/",
      press: "https://www.freshworks.com/company/newsroom/",
      dev: "https://developer.freshworks.com/",
    },
    releaseNotes: [
      {
        text: "Freshdesk AI Agent Freddy — new capabilities released",
        url: "https://www.freshworks.com/product-updates/",
      },
      {
        text: "Freshservice ITSM 2025 update — AI automation",
        url: "https://www.freshworks.com/product-updates/",
      },
      {
        text: "Freshsales CRM — Freddy AI Copilot improvements",
        url: "https://www.freshworks.com/product-updates/",
      },
    ],
    features: [
      {
        text: "Freddy AI Agent — autonomous customer support resolution",
        url: "https://www.freshworks.com/blog/",
      },
      {
        text: "Freshworks Customer Service Suite — omnichannel AI",
        url: "https://www.freshworks.com/blog/",
      },
      {
        text: "Freshservice Project Management AI features launch",
        url: "https://www.freshworks.com/blog/",
      },
    ],
    press: [
      {
        text: "Freshworks FY24 revenue $686M, AI products driving growth",
        url: "https://www.freshworks.com/company/newsroom/",
      },
      {
        text: "Freshworks launches Freddy AI Agent at Refresh 2024",
        url: "https://www.freshworks.com/company/newsroom/",
      },
    ],
    dev: [
      {
        text: "Freshworks Developer Platform — new webhook features",
        url: "https://developer.freshworks.com/",
      },
      {
        text: "Freshworks SDK update — custom app development improvements",
        url: "https://developer.freshworks.com/",
      },
    ],
    strategy: [
      {
        text: "Freshworks 2025: AI-first CX and ITSM platform growth",
        url: "https://www.freshworks.com/company/newsroom/",
      },
      {
        text: "Freshworks expanding enterprise AI in US and Europe",
        url: "https://www.freshworks.com/company/newsroom/",
      },
    ],
    news: [
      {
        text: "Freshworks named Leader in G2 Grid for CRM 2025",
        url: "https://www.freshworks.com/company/newsroom/",
      },
      {
        text: "Freshworks expands AWS marketplace partnership",
        url: "https://www.freshworks.com/company/newsroom/",
      },
    ],
    jobs: [
      {
        role: "Software Engineer, AI",
        dept: "Engineering",
        url: "https://www.freshworks.com/company/careers/",
      },
      {
        role: "Product Manager, Freddy AI",
        dept: "Product",
        url: "https://www.freshworks.com/company/careers/",
      },
      {
        role: "Customer Success Manager",
        dept: "Sales",
        url: "https://www.freshworks.com/company/careers/",
      },
    ],
    confidence: 85,
  },
  Swiggy: {
    color: "#FB923C",
    initials: "SWIG",
    officialUrls: {
      releaseNotes: "https://bytes.swiggy.com/",
      features: "https://bytes.swiggy.com/",
      press: "https://www.swiggy.com/corporate/newsroom",
      dev: "https://bytes.swiggy.com/",
    },
    releaseNotes: [
      {
        text: "Swiggy Instamart v3 app — faster UX and AI features",
        url: "https://bytes.swiggy.com/",
      },
      {
        text: "Swiggy BOLT hyperfast delivery pilot in Bengaluru",
        url: "https://bytes.swiggy.com/",
      },
      {
        text: "Swiggy Dineout — new table booking features released",
        url: "https://bytes.swiggy.com/",
      },
    ],
    features: [
      {
        text: "Swiggy Instamart — 10-minute delivery expanded to 100+ cities",
        url: "https://bytes.swiggy.com/",
      },
      {
        text: "Swiggy One membership — unified food + grocery benefits",
        url: "https://bytes.swiggy.com/",
      },
      {
        text: "Swiggy AI-powered restaurant recommendations improvement",
        url: "https://bytes.swiggy.com/",
      },
    ],
    press: [
      {
        text: "Swiggy IPO raised ₹11,327 crore in Nov 2024",
        url: "https://www.swiggy.com/corporate/newsroom",
      },
      {
        text: "Swiggy Instamart GMV growing 50%+ YoY",
        url: "https://www.swiggy.com/corporate/newsroom",
      },
    ],
    dev: [
      {
        text: "Swiggy Bytes engineering blog — real-time ML platform",
        url: "https://bytes.swiggy.com/",
      },
      {
        text: "Swiggy open-sources delivery routing algorithm",
        url: "https://bytes.swiggy.com/",
      },
    ],
    strategy: [
      {
        text: "Swiggy 2025: food delivery + quick commerce + dining out",
        url: "https://bytes.swiggy.com/",
      },
      {
        text: "Swiggy expanding Instamart dark stores to 700 cities",
        url: "https://bytes.swiggy.com/",
      },
    ],
    news: [
      {
        text: "Swiggy IPO oversubscribed 3.6x in November 2024",
        url: "https://www.swiggy.com/corporate/newsroom",
      },
      {
        text: "Swiggy partners with HDFC credit card for cashback",
        url: "https://www.swiggy.com/corporate/newsroom",
      },
    ],
    jobs: [
      {
        role: "Software Engineer",
        dept: "Engineering",
        url: "https://careers.swiggy.com/",
      },
      {
        role: "Data Scientist, ML",
        dept: "Research",
        url: "https://careers.swiggy.com/",
      },
      {
        role: "Product Manager",
        dept: "Product",
        url: "https://careers.swiggy.com/",
      },
    ],
    confidence: 82,
  },
  Paytm: {
    color: "#3B82F6",
    initials: "PTM",
    officialUrls: {
      releaseNotes: "https://paytm.com/blog/",
      features: "https://paytm.com/blog/",
      press: "https://paytm.com/newsroom/",
      dev: "https://developer.paytm.com/",
    },
    releaseNotes: [
      {
        text: "Paytm app v10 — new soundbox and UPI features",
        url: "https://paytm.com/blog/",
      },
      {
        text: "Paytm payment gateway — new merchant dashboard",
        url: "https://paytm.com/blog/",
      },
      {
        text: "Paytm POS device new firmware and feature update",
        url: "https://paytm.com/blog/",
      },
    ],
    features: [
      {
        text: "Paytm UPI Lite — offline payments for small amounts",
        url: "https://paytm.com/blog/",
      },
      {
        text: "Paytm for Business — AI-powered analytics dashboard",
        url: "https://paytm.com/blog/",
      },
      {
        text: "Paytm Insurance — health cover product launch",
        url: "https://paytm.com/blog/",
      },
    ],
    press: [
      {
        text: "Paytm MTU recovering to 80M+ post-RBI restrictions",
        url: "https://paytm.com/newsroom/",
      },
      {
        text: "Paytm SBI Cards credit card relaunch announced",
        url: "https://paytm.com/newsroom/",
      },
    ],
    dev: [
      {
        text: "Paytm Payment Gateway API — new features for merchants",
        url: "https://developer.paytm.com/",
      },
      {
        text: "Paytm developer SDK new integrations available",
        url: "https://developer.paytm.com/",
      },
    ],
    strategy: [
      {
        text: "Paytm 2025: payments recovery and financial services focus",
        url: "https://paytm.com/blog/",
      },
      {
        text: "Paytm pivoting toward profitable merchant solutions",
        url: "https://paytm.com/blog/",
      },
    ],
    news: [
      {
        text: "Paytm narrows losses significantly in Q3 FY25",
        url: "https://paytm.com/newsroom/",
      },
      {
        text: "Vijay Shekhar Sharma buys back promoter stake in Paytm",
        url: "https://paytm.com/newsroom/",
      },
    ],
    jobs: [
      {
        role: "Software Engineer",
        dept: "Engineering",
        url: "https://jobs.lever.co/paytm",
      },
      {
        role: "Product Manager, Payments",
        dept: "Product",
        url: "https://jobs.lever.co/paytm",
      },
      {
        role: "Data Analyst",
        dept: "Research",
        url: "https://jobs.lever.co/paytm",
      },
    ],
    confidence: 80,
  },
};

const knownCompanies = Object.keys(briefings);

// 4 query cards config
const queryCards = [
  {
    id: "release-notes",
    label: "Release Notes",
    icon: FileText,
    color: "#22D3EE",
    bg: "rgba(34,211,238,0.08)",
    border: "rgba(34,211,238,0.2)",
    buildUrl: (company: string, data: Briefing | null) =>
      data
        ? data.officialUrls.releaseNotes
        : `https://${company.toLowerCase().replace(/\s+/g, "")}.com/changelog`,
  },
  {
    id: "new-features",
    label: "New Features",
    icon: Sparkles,
    color: "#34D399",
    bg: "rgba(52,211,153,0.08)",
    border: "rgba(52,211,153,0.2)",
    buildUrl: (company: string, data: Briefing | null) =>
      data
        ? data.officialUrls.features
        : `https://${company.toLowerCase().replace(/\s+/g, "")}.com/blog`,
  },
  {
    id: "press-release",
    label: "Press Release",
    icon: Newspaper,
    color: "#A78BFA",
    bg: "rgba(167,139,250,0.08)",
    border: "rgba(167,139,250,0.2)",
    buildUrl: (company: string, data: Briefing | null) =>
      data
        ? data.officialUrls.press
        : `https://${company.toLowerCase().replace(/\s+/g, "")}.com/news`,
  },
  {
    id: "dev-updates",
    label: "Developer Updates",
    icon: Terminal,
    color: "#FB7185",
    bg: "rgba(251,113,133,0.08)",
    border: "rgba(251,113,133,0.2)",
    buildUrl: (company: string, data: Briefing | null) =>
      data
        ? data.officialUrls.dev
        : `https://${company.toLowerCase().replace(/\s+/g, "")}.com/blog`,
  },
];

// 6 intel source tabs (strictly deduplicated)
const intelTabs = [
  { id: "releaseNotes", label: "Release Notes", color: "#22D3EE" },
  { id: "features", label: "Features", color: "#34D399" },
  { id: "press", label: "Press", color: "#A78BFA" },
  { id: "dev", label: "Dev", color: "#FB7185" },
  { id: "strategy", label: "Strategy", color: "#FBBF24" },
  { id: "news", label: "News", color: "#38BDF8" },
] as const;

type IntelTabId = (typeof intelTabs)[number]["id"];

type State = "idle" | "loading" | "known" | "unknown";

function findCompany(query: string): string | null {
  const q = query.trim().toLowerCase();
  if (!q) return null;
  return knownCompanies.find((c) => c.toLowerCase() === q) ?? null;
}

// Animated pipeline steps for loading state
const PIPELINE_STEPS = [
  { label: "Fetching release signals", color: "#22D3EE" },
  { label: "Scanning feature pages", color: "#34D399" },
  { label: "Indexing press coverage", color: "#A78BFA" },
  { label: "Parsing dev updates", color: "#FB7185" },
  { label: "Compiling intelligence", color: "#FBBF24" },
];

function LoadingState({ company }: { company: string }) {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    let step = 0;
    const interval = setInterval(() => {
      step += 1;
      if (step < PIPELINE_STEPS.length) {
        setActiveStep(step);
      } else {
        clearInterval(interval);
      }
    }, 280);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      key="loading"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      className="mt-8 rounded-2xl border overflow-hidden"
      style={{ background: "#0F1B2A", borderColor: "#223046" }}
      data-ocid="briefing.loading_state"
    >
      {/* Scan bar */}
      <div
        className="relative h-0.5 w-full overflow-hidden"
        style={{ background: "rgba(34,211,238,0.08)" }}
      >
        <div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{
            width: "40%",
            background:
              "linear-gradient(90deg, transparent, #22D3EE, transparent)",
            animation: "scan-sweep 1.2s ease-in-out infinite",
          }}
        />
      </div>

      <div className="px-8 py-7">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{
              background: "rgba(34,211,238,0.1)",
              border: "1px solid rgba(34,211,238,0.2)",
            }}
          >
            <Search className="w-4 h-4" style={{ color: "#22D3EE" }} />
          </div>
          <div>
            <p
              className="text-xs font-bold tracking-widest"
              style={{ color: "#22D3EE" }}
            >
              SCANNING INTELLIGENCE SOURCES
            </p>
            <p className="text-xs mt-0.5" style={{ color: "#475569" }}>
              Generating briefing for{" "}
              <span style={{ color: "#CBD5E1" }}>{company}</span>
            </p>
          </div>
        </div>

        {/* Animated pipeline steps */}
        <div className="flex flex-col gap-3">
          {PIPELINE_STEPS.map((step, idx) => {
            const isActive = idx === activeStep;
            const isDone = idx < activeStep;
            const isPending = idx > activeStep;
            return (
              <div key={step.label} className="flex items-center gap-4">
                {/* Step number */}
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-bold flex-shrink-0 transition-all duration-300"
                  style={{
                    background: isDone
                      ? `${step.color}20`
                      : isActive
                        ? `${step.color}15`
                        : "rgba(255,255,255,0.03)",
                    border: `1px solid ${isDone || isActive ? `${step.color}40` : "#1e3048"}`,
                    color: isDone || isActive ? step.color : "#334155",
                  }}
                >
                  {String(idx + 1).padStart(2, "0")}
                </div>

                {/* Label + bar */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1.5">
                    <span
                      className="text-xs font-medium transition-colors duration-300"
                      style={{
                        color: isDone
                          ? "#CBD5E1"
                          : isActive
                            ? step.color
                            : "#334155",
                      }}
                    >
                      {step.label}
                    </span>
                    {isDone && (
                      <span
                        className="text-[10px] font-bold"
                        style={{ color: step.color }}
                      >
                        DONE
                      </span>
                    )}
                    {isActive && (
                      <span
                        className="text-[10px] font-bold animate-pulse"
                        style={{ color: step.color }}
                      >
                        ACTIVE
                      </span>
                    )}
                  </div>
                  {/* Progress bar */}
                  <div
                    className="h-1 rounded-full overflow-hidden"
                    style={{
                      background: isPending
                        ? "rgba(255,255,255,0.04)"
                        : `${step.color}15`,
                    }}
                  >
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{
                        width: isDone ? "100%" : isActive ? "60%" : "0%",
                        background: isDone
                          ? `linear-gradient(90deg, ${step.color}80, ${step.color})`
                          : isActive
                            ? `linear-gradient(90deg, transparent, ${step.color})`
                            : undefined,
                        animation: isActive
                          ? "scan-sweep 1s ease-in-out infinite"
                          : undefined,
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

type ColumnProps = { title: string; color: string; items: BriefingItem[] };

function BriefingColumn({ title, color, items }: ColumnProps) {
  return (
    <div className="flex flex-col gap-3">
      <h4
        className="text-xs font-bold tracking-widest uppercase"
        style={{ color }}
      >
        {title}
      </h4>
      <ul className="flex flex-col gap-2.5">
        {items.map((item) => (
          <li key={item.text} className="flex items-start gap-2">
            <span
              className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
              style={{ background: color }}
            />
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs leading-relaxed hover:opacity-80 transition-opacity flex items-start gap-1 group"
              style={{ color: "#CBD5E1" }}
            >
              <span>{item.text}</span>
              <ExternalLink
                className="w-3 h-3 mt-0.5 flex-shrink-0 opacity-40 group-hover:opacity-100 transition-opacity"
                style={{ color }}
              />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

const DEPT_COLORS: Record<string, string> = {
  Engineering: "#22D3EE",
  Research: "#34D399",
  Product: "#A78BFA",
  Design: "#FB7185",
  Sales: "#FBBF24",
  Data: "#60A5FA",
  Policy: "#F9FAFB",
  Security: "#FB923C",
  Infrastructure: "#38BDF8",
  DevRel: "#4ADE80",
  "Customer Success": "#34D399",
  "Sales Engineering": "#FBBF24",
  Solutions: "#A78BFA",
  Documentation: "#94A3B8",
};

function getDeptColor(dept: string): string {
  return DEPT_COLORS[dept] ?? "#94A3B8";
}

function OpenRolesSection({ jobs }: { jobs: JobItem[] }) {
  return (
    <div className="px-6 py-5 border-t" style={{ borderColor: "#223046" }}>
      <div className="flex items-center gap-2 mb-4">
        <Briefcase className="w-3.5 h-3.5" style={{ color: "#F97316" }} />
        <h4
          className="text-xs font-bold tracking-widest uppercase"
          style={{ color: "#F97316" }}
        >
          Open Roles
        </h4>
        <span
          className="ml-1 text-xs px-2 py-0.5 rounded-full font-semibold"
          style={{
            background: "rgba(249,115,22,0.12)",
            color: "#F97316",
            border: "1px solid rgba(249,115,22,0.25)",
          }}
        >
          {jobs.length} positions
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {jobs.map((job) => {
          const deptColor = getDeptColor(job.dept);
          return (
            <a
              key={job.role}
              href={job.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col gap-2 rounded-xl p-3 transition-all duration-200 hover:scale-[1.02]"
              style={{
                background: "rgba(249,115,22,0.05)",
                border: "1px solid rgba(249,115,22,0.2)",
              }}
            >
              <div className="flex items-start justify-between gap-2">
                <span
                  className="text-xs font-bold leading-snug flex-1"
                  style={{ color: "#F1F5F9" }}
                >
                  {job.role}
                </span>
                <ExternalLink
                  className="w-3 h-3 flex-shrink-0 mt-0.5 opacity-30 group-hover:opacity-80 transition-opacity"
                  style={{ color: "#F97316" }}
                />
              </div>
              <span
                className="inline-block self-start text-[10px] font-semibold tracking-wider px-2 py-0.5 rounded-full"
                style={{
                  background: `${deptColor}18`,
                  color: deptColor,
                  border: `1px solid ${deptColor}30`,
                }}
              >
                {job.dept}
              </span>
            </a>
          );
        })}
      </div>
    </div>
  );
}

type BriefingCardProps = { name: string; data: Briefing };

function BriefingCard({ name, data }: BriefingCardProps) {
  const [activeTab, setActiveTab] = useState<IntelTabId>("releaseNotes");

  const tabData: Record<IntelTabId, BriefingItem[]> = {
    releaseNotes: data.releaseNotes,
    features: data.features,
    press: data.press,
    dev: data.dev,
    strategy: data.strategy,
    news: data.news,
  };

  const activeTabConfig = intelTabs.find((t) => t.id === activeTab)!;

  return (
    <motion.div
      key="known"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="mt-8 rounded-2xl border overflow-hidden"
      style={{ background: "#0F1B2A", borderColor: "#223046" }}
      data-ocid="briefing.card"
    >
      {/* Card header */}
      <div
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-6 py-5 border-b"
        style={{ borderColor: "#223046", background: "rgba(34,211,238,0.03)" }}
      >
        <div className="flex items-center gap-4">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0"
            style={{
              background: `${data.color}18`,
              color: data.color,
              border: `1px solid ${data.color}35`,
            }}
          >
            {data.initials}
          </div>
          <div>
            <h3 className="font-bold text-white text-lg leading-tight">
              {name}
            </h3>
            <p className="text-xs" style={{ color: "#64748B" }}>
              Intelligence Briefing
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span
            className="text-xs font-bold tracking-wider px-3 py-1.5 rounded-full"
            style={{
              background: "rgba(34,211,238,0.1)",
              color: "#22D3EE",
              border: "1px solid rgba(34,211,238,0.2)",
            }}
            data-ocid="briefing.success_state"
          >
            {data.confidence}% Confidence
          </span>
          <Link to="/analysis" search={{ company: name }}>
            <button
              type="button"
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 hover:opacity-80"
              style={{
                background: "linear-gradient(135deg, #22D3EE, #34D399)",
                color: "#0B1220",
              }}
              data-ocid="briefing.primary_button"
            >
              View Full Analysis <ArrowRight className="w-3 h-3" />
            </button>
          </Link>
        </div>
      </div>

      {/* 4 Query Cards */}
      <div className="px-6 pt-5 pb-2">
        <p
          className="text-[10px] font-semibold tracking-widest mb-3"
          style={{ color: "#475569" }}
        >
          QUICK ACCESS
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {queryCards.map((card) => {
            const Icon = card.icon;
            const url = card.buildUrl(name, data);
            return (
              <a
                key={card.id}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-2 rounded-xl p-3 text-center transition-all duration-200 hover:scale-[1.03] hover:shadow-lg"
                style={{
                  background: card.bg,
                  border: `1px solid ${card.border}`,
                }}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{
                    background: `${card.color}15`,
                    border: `1px solid ${card.color}25`,
                  }}
                >
                  <Icon className="w-4 h-4" style={{ color: card.color }} />
                </div>
                <span
                  className="text-[11px] font-semibold leading-tight"
                  style={{ color: card.color }}
                >
                  {card.label}
                </span>
                <ExternalLink
                  className="w-3 h-3 opacity-30 group-hover:opacity-70 transition-opacity"
                  style={{ color: card.color }}
                />
              </a>
            );
          })}
        </div>
      </div>

      {/* 6 Intel Source Tabs */}
      <div className="px-6 pt-4">
        <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-none">
          {intelTabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className="flex-shrink-0 px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-all duration-200"
                style={{
                  background: isActive ? `${tab.color}15` : "transparent",
                  color: isActive ? tab.color : "#475569",
                  border: `1px solid ${isActive ? `${tab.color}35` : "transparent"}`,
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab content */}
      <div className="px-6 py-4 border-b" style={{ borderColor: "#223046" }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
          >
            <BriefingColumn
              title={activeTabConfig.label}
              color={activeTabConfig.color}
              items={tabData[activeTab]}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Open Roles */}
      <OpenRolesSection jobs={data.jobs} />
    </motion.div>
  );
}

export default function IntelBriefingSearch() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [state, setState] = useState<State>("idle");
  const [result, setResult] = useState<{ name: string; known: boolean } | null>(
    null,
  );
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onSearch(e: Event) {
      const company = (e as CustomEvent<{ company: string }>).detail?.company;
      if (company) runSearch(company);
    }
    window.addEventListener("dreamcrafter:search", onSearch);
    return () => window.removeEventListener("dreamcrafter:search", onSearch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleQueryChange(val: string) {
    setQuery(val);
    if (state !== "idle") {
      setState("idle");
      setResult(null);
    }
  }

  function recordSearch(company: string) {
    try {
      const raw = localStorage.getItem("dreamcrafter_search_history");
      const hist: string[] = raw ? JSON.parse(raw) : [];
      const updated = [company, ...hist.filter((c) => c !== company)].slice(
        0,
        20,
      );
      localStorage.setItem(
        "dreamcrafter_search_history",
        JSON.stringify(updated),
      );
    } catch {}
  }

  function runSearch(companyName: string) {
    const trimmed = companyName.trim();
    if (!trimmed) return;
    setQuery(trimmed);
    setState("loading");
    setTimeout(() => {
      const found = findCompany(trimmed);
      const companyName2 = found ?? trimmed;
      recordSearch(companyName2);
      navigate({ to: "/analysis", search: { company: companyName2 } });
    }, 1000);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") runSearch(query);
  }

  return (
    <div className="container max-w-4xl mx-auto">
      {/* Search box */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        ref={containerRef}
        className="relative"
      >
        <div
          className="flex items-center gap-3 rounded-2xl border px-4 py-3 transition-all duration-200 focus-within:border-cyan-400/50"
          style={{ background: "#0F1B2A", borderColor: "#223046" }}
        >
          <Search
            className="w-5 h-5 flex-shrink-0"
            style={{ color: "#22D3EE" }}
          />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => handleQueryChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter any company name..."
            className="flex-1 bg-transparent outline-none text-white placeholder:text-slate-500 text-sm"
            data-ocid="briefing.search_input"
            autoComplete="off"
          />
          {/* 4 category pill buttons */}
          <div className="hidden md:flex items-center gap-1.5">
            {queryCards.map((card) => {
              const Icon = card.icon;
              return (
                <button
                  key={card.id}
                  type="button"
                  onClick={() => {
                    if (!query.trim()) return;
                    const found = findCompany(query);
                    const url = card.buildUrl(
                      query.trim(),
                      found ? briefings[found] : null,
                    );
                    window.open(url, "_blank", "noopener,noreferrer");
                  }}
                  title={card.label}
                  className="w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110 flex-shrink-0"
                  style={{
                    background: card.bg,
                    border: `1px solid ${card.border}`,
                  }}
                >
                  <Icon className="w-3.5 h-3.5" style={{ color: card.color }} />
                </button>
              );
            })}
          </div>
          <button
            type="button"
            onClick={() => runSearch(query)}
            disabled={!query.trim() || state === "loading"}
            className="flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
            style={{
              background: "linear-gradient(135deg, #22D3EE, #34D399)",
              color: "#0B1220",
            }}
            data-ocid="briefing.submit_button"
          >
            <Zap className="w-4 h-4" />
            <span className="hidden sm:inline">Generate Briefing</span>
            <span className="sm:hidden">Go</span>
          </button>
        </div>
      </motion.div>

      {/* Hint text + category pill labels */}
      {state === "idle" && (
        <div className="flex flex-col items-center gap-2 mt-3 text-center">
          <p className="text-[11px]" style={{ color: "#475569" }}>
            Try:{" "}
            <span style={{ color: "#64748B" }}>
              OpenAI, GitHub, Stripe, Figma, Anthropic...
            </span>
          </p>
          <div className="flex items-center justify-center flex-wrap gap-1.5">
            {queryCards.map((c) => (
              <span
                key={c.id}
                className="text-[9px] font-semibold px-1.5 py-0.5 rounded-full"
                style={{
                  background: c.bg,
                  color: c.color,
                  border: `1px solid ${c.border}`,
                  opacity: 0.85,
                }}
              >
                {c.label}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Results */}
      <AnimatePresence mode="wait">
        {state === "loading" && <LoadingState company={query} />}
        {state === "known" && result && briefings[result.name] && (
          <BriefingCard name={result.name} data={briefings[result.name]} />
        )}
      </AnimatePresence>
    </div>
  );
}
