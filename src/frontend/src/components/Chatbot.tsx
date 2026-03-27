import { MessageCircle, Send, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

interface Message {
  id: string;
  from: "bot" | "user";
  text: string;
}

const QUICK_CHIPS = [
  "What is Dreamcrafter?",
  "OpenAI",
  "Anthropic",
  "Stripe",
  "Figma",
  "Export reports",
];

const COMPANY_DATA: Record<
  string,
  {
    overview: string;
    funding: string;
    hiring: string;
    products: string;
    careers: string;
  }
> = {
  anthropic: {
    overview:
      "Founded 2021 in San Francisco. CEO: Dario Amodei. 2,500+ employees. Focused on AI safety research.",
    funding: "Raised $7.3B led by Amazon. Valued at $61B+.",
    hiring:
      "Actively hiring in AI safety, research, and engineering. 2,500+ employees.",
    products: "Claude AI assistant — available via claude.ai and API.",
    careers: "anthropic.com/careers",
  },
  atlassian: {
    overview:
      "Founded 2002 in Sydney, Australia. CEO: Scott Farquhar. 12,000+ employees. Public on NASDAQ:TEAM.",
    funding: "Publicly traded. Revenue $4.4B+ FY2025.",
    hiring:
      "12,000+ employees globally. Hiring across engineering, product, and support.",
    products: "Jira, Confluence, Trello, Loom, Bitbucket.",
    careers: "atlassian.com/company/careers",
  },
  figma: {
    overview:
      "Founded 2012 in San Francisco. CEO: Dylan Field. 1,400+ employees. Valued at $12.5B.",
    funding:
      "Valued at $12.5B. Previously had Adobe acquisition blocked by regulators.",
    hiring: "1,400+ employees. Hiring in design, engineering, and sales.",
    products: "Figma, FigJam, Dev Mode, Figma AI.",
    careers: "figma.com/careers",
  },
  github: {
    overview:
      "Founded 2008 in San Francisco. CEO: Thomas Dohmke. 3,000+ employees. Microsoft subsidiary.",
    funding: "Acquired by Microsoft. Copilot revenue estimated at $1B+ ARR.",
    hiring:
      "3,000+ employees globally under Microsoft umbrella. Hiring in AI, platform, and security.",
    products: "GitHub Copilot, Actions, Advanced Security, Codespaces.",
    careers: "github.com/about/careers",
  },
  gitlab: {
    overview:
      "Founded 2011 in San Francisco. CEO: Sid Sijbrandij. 2,100+ employees. Public on NASDAQ:GTLB.",
    funding: "Publicly traded. ARR $750M+.",
    hiring: "2,100+ employees, fully remote-first. Hiring in DevSecOps and AI.",
    products: "GitLab Duo AI, DevSecOps platform, CI/CD pipelines.",
    careers: "about.gitlab.com/jobs",
  },
  hashicorp: {
    overview:
      "Founded 2012 in San Francisco. Acquired by IBM for $6.4B. 2,500+ employees.",
    funding: "Acquired by IBM for $6.4B in 2024.",
    hiring: "2,500+ employees. Hiring in cloud infrastructure and security.",
    products: "Terraform, Vault, Consul, Nomad, Packer.",
    careers: "hashicorp.com/careers",
  },
  linear: {
    overview:
      "Founded 2019 in San Francisco. CEO: Karri Saarinen. ~100 employees. Series B valuation $400M.",
    funding: "Raised at $400M Series B valuation.",
    hiring: "~100 employees. Selective hiring in product, engineering.",
    products: "Linear — modern project management for software teams.",
    careers: "linear.app/careers",
  },
  notion: {
    overview:
      "Founded 2016 in San Francisco. CEO: Ivan Zhao. 800+ employees. Valued at $10B.",
    funding: "Valued at $10B. Profitable and growing.",
    hiring: "800+ employees. Hiring in AI, product, and engineering.",
    products: "Notion workspace, Notion AI, Notion Sites, Notion Calendar.",
    careers: "notion.so/about#careers",
  },
  openai: {
    overview:
      "Founded 2015 in San Francisco. CEO: Sam Altman. 3,500+ employees.",
    funding: "Raised $40B at $300B valuation (SoftBank-led round, March 2025).",
    hiring:
      "3,500+ employees. Aggressive hiring in safety, policy, and infrastructure.",
    products: "ChatGPT, GPT-4o, DALL-E 3, Sora, Whisper, OpenAI API.",
    careers: "openai.com/careers",
  },
  slack: {
    overview:
      "Founded 2013 in San Francisco. CEO: Denise Dresser. 2,000+ employees. Salesforce subsidiary ($27.7B).",
    funding: "Acquired by Salesforce for $27.7B.",
    hiring:
      "2,000+ employees. Hiring in AI, enterprise sales, and engineering.",
    products: "Slack AI, Huddles, Workflow Builder, Slack Connect.",
    careers: "slack.com/careers",
  },
  stripe: {
    overview:
      "Founded 2010 in San Francisco. CEO: Patrick Collison. 8,000+ employees. Valued at $65B.",
    funding: "Valued at $65B. Processing $1T+ in payment volume annually.",
    hiring: "8,000+ employees. Hiring in payments, risk, and infrastructure.",
    products: "Stripe Payments, Billing, Connect, Radar, Treasury, Issuing.",
    careers: "stripe.com/jobs",
  },
  vercel: {
    overview:
      "Founded 2015 in San Francisco. CEO: Guillermo Rauch. 700+ employees. Raised $250M Series E at $3.25B.",
    funding: "Raised $250M Series E, valued at $3.25B.",
    hiring: "700+ employees. Hiring in frontend infrastructure and AI.",
    products: "Next.js, Vercel Edge Network, AI SDK, v0 AI design tool.",
    careers: "vercel.com/careers",
  },
};

const COMPANY_ALIASES: Record<string, string> = {
  chatgpt: "openai",
  "gpt-4": "openai",
  gpt4: "openai",
  sora: "openai",
  claude: "anthropic",
  jira: "atlassian",
  confluence: "atlassian",
  trello: "atlassian",
  terraform: "hashicorp",
  vault: "hashicorp",
  "next.js": "vercel",
  nextjs: "vercel",
};

function getBotReply(input: string): string {
  const q = input.toLowerCase();

  // Dreamcrafter general queries
  if (q.includes("dreamcrafter") || q === "what is dreamcrafter?")
    return "Dreamcrafter is a competitive intelligence platform that gives you real-time insights on top tech companies — including funding news, product releases, hiring signals, and press coverage.";
  if (q.includes("search") || q.includes("how do i"))
    return "Just type any company name in the search box on the home page and click 'Generate Briefing'. You'll get an instant intelligence dashboard for that company.";
  if (
    q.includes("compan") ||
    q.includes("track") ||
    q.includes("what companies")
  )
    return "We currently track 12 companies: Anthropic, Atlassian, Figma, GitHub, GitLab, HashiCorp, Linear, Notion, OpenAI, Slack, Stripe, and Vercel.";
  if (q.includes("export"))
    return "On the Analysis Path, click the 'Export' button in the Live Analysis Report section to download a full intelligence report as a .txt file.";

  // Detect company name
  let matchedCompany: string | null = null;

  // Check aliases first
  for (const [alias, company] of Object.entries(COMPANY_ALIASES)) {
    if (q.includes(alias)) {
      matchedCompany = company;
      break;
    }
  }

  // Check direct company names
  if (!matchedCompany) {
    for (const company of Object.keys(COMPANY_DATA)) {
      if (q.includes(company)) {
        matchedCompany = company;
        break;
      }
    }
  }

  if (matchedCompany) {
    const d = COMPANY_DATA[matchedCompany];
    const name =
      matchedCompany.charAt(0).toUpperCase() + matchedCompany.slice(1);

    if (
      q.includes("fund") ||
      q.includes("invest") ||
      q.includes("valuat") ||
      q.includes("rais")
    )
      return `💰 ${name} Funding: ${d.funding}`;
    if (
      q.includes("hir") ||
      q.includes("job") ||
      q.includes("career") ||
      q.includes("employ")
    )
      return `👥 ${name} Hiring: ${d.hiring} Careers page: ${d.careers}`;
    if (q.includes("product") || q.includes("feature") || q.includes("tool"))
      return `🛠 ${name} Products: ${d.products}`;

    // General overview
    return `🏢 ${name}\n${d.overview}\n\n💰 Funding: ${d.funding}\n🛠 Products: ${d.products}\n💼 Careers: ${d.careers}`;
  }

  // Unknown
  return "I have intelligence on: Anthropic, Atlassian, Figma, GitHub, GitLab, HashiCorp, Linear, Notion, OpenAI, Slack, Stripe, and Vercel. Which would you like to know more about?";
}

let msgCounter = 1;
function nextId() {
  return `msg-${msgCounter++}`;
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "msg-0",
      from: "bot",
      text: "Hi! I'm the Dreamcrafter assistant. Ask me anything about company intelligence.",
    },
  ]);
  const [input, setInput] = useState("");
  const [showDot, setShowDot] = useState(true);

  function sendMessage(text: string) {
    const userText = text.trim();
    if (!userText) return;
    setShowDot(false);
    const uid = nextId();
    const bid = nextId();
    setMessages((prev) => [
      ...prev,
      { id: uid, from: "user", text: userText },
      { id: bid, from: "bot", text: getBotReply(userText) },
    ]);
    setInput("");
  }

  return (
    <>
      {/* Floating button */}
      <button
        type="button"
        onClick={() => {
          setOpen((v) => !v);
          setShowDot(false);
        }}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-transform duration-200 hover:scale-110 focus:outline-none"
        style={{
          background: "linear-gradient(135deg,#22D3EE,#8B5CF6)",
          boxShadow:
            "0 8px 32px rgba(34,211,238,0.4), 0 0 0 4px rgba(34,211,238,0.1)",
        }}
        aria-label="Open Dreamcrafter chat"
        data-ocid="chatbot.open_modal_button"
      >
        <MessageCircle className="w-6 h-6 text-white" />
        {showDot && (
          <span
            className="absolute top-1 right-1 w-3 h-3 rounded-full animate-pulse"
            style={{ background: "#F472B6", border: "2px solid #0B1220" }}
          />
        )}
      </button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="fixed bottom-24 right-6 z-50 rounded-2xl overflow-hidden flex flex-col"
            style={{
              width: "340px",
              height: "480px",
              background: "#0F1B2A",
              border: "1px solid rgba(34,211,238,0.25)",
              boxShadow:
                "0 24px 64px rgba(0,0,0,0.7), 0 0 0 1px rgba(34,211,238,0.08)",
            }}
            data-ocid="chatbot.modal"
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-5 py-4 flex-shrink-0"
              style={{
                background:
                  "linear-gradient(90deg,rgba(34,211,238,0.1),rgba(139,92,246,0.08))",
                borderBottom: "1px solid rgba(34,211,238,0.15)",
              }}
            >
              <div className="flex items-center gap-2.5">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{
                    background: "linear-gradient(135deg,#22D3EE,#8B5CF6)",
                  }}
                >
                  <MessageCircle className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">
                    Dreamcrafter AI
                  </p>
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    <p className="text-xs" style={{ color: "#64748B" }}>
                      Online · 12 companies tracked
                    </p>
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors duration-150 hover:bg-white/10"
                style={{ color: "#64748B" }}
                aria-label="Close chat"
                data-ocid="chatbot.close_button"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div
              className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3"
              style={{ scrollbarWidth: "none" }}
            >
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${
                    msg.from === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className="max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-line"
                    style={
                      msg.from === "user"
                        ? {
                            background:
                              "linear-gradient(135deg,#22D3EE,#8B5CF6)",
                            color: "white",
                            borderBottomRightRadius: "4px",
                          }
                        : {
                            background: "rgba(34,211,238,0.08)",
                            border: "1px solid rgba(34,211,238,0.15)",
                            color: "#CBD5E1",
                            borderBottomLeftRadius: "4px",
                          }
                    }
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {/* Quick chips shown after welcome only */}
              {messages.length === 1 && (
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {QUICK_CHIPS.map((chip) => (
                    <button
                      key={chip}
                      type="button"
                      onClick={() => sendMessage(chip)}
                      className="text-xs px-3 py-1.5 rounded-full transition-all duration-150 hover:opacity-80"
                      style={{
                        background: "rgba(34,211,238,0.08)",
                        border: "1px solid rgba(34,211,238,0.2)",
                        color: "#22D3EE",
                      }}
                      data-ocid="chatbot.toggle"
                    >
                      {chip}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Input */}
            <div
              className="flex-shrink-0 px-4 py-3"
              style={{ borderTop: "1px solid rgba(34,211,238,0.12)" }}
            >
              <div
                className="flex items-center gap-2 rounded-xl px-3 py-2"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(34,211,238,0.15)",
                }}
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
                  placeholder="Ask about any company…"
                  className="flex-1 bg-transparent text-sm outline-none placeholder:text-slate-600"
                  style={{ color: "#E2E8F0" }}
                  data-ocid="chatbot.input"
                />
                <button
                  type="button"
                  onClick={() => sendMessage(input)}
                  className="w-7 h-7 rounded-lg flex items-center justify-center transition-opacity duration-150 hover:opacity-80 flex-shrink-0"
                  style={{
                    background: input.trim()
                      ? "linear-gradient(135deg,#22D3EE,#8B5CF6)"
                      : "rgba(34,211,238,0.15)",
                    color: input.trim() ? "white" : "#22D3EE",
                  }}
                  aria-label="Send message"
                  data-ocid="chatbot.submit_button"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
