import Chatbot from "@/components/Chatbot";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  BarChart2,
  BookOpen,
  Check,
  ChevronDown,
  ChevronUp,
  Copy,
  ExternalLink,
  Eye,
  EyeOff,
  FileText,
  Key,
  Layers,
  Newspaper,
  Plus,
  Radio,
  Rss,
  Search,
  Trash2,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

interface ApiKey {
  id: string;
  name: string;
  value: string;
  createdAt: string;
  status: "active" | "revoked";
  scopes: string[];
  companiesAccessed: string[];
  dataTypes: string[];
}

const STORAGE_KEY = "dreamcrafter_api_keys";
const COMPANY_WEBSITES: Record<string, string> = {
  OpenAI: "https://openai.com",
  Anthropic: "https://anthropic.com",
  GitHub: "https://github.com",
  Stripe: "https://stripe.com",
  Figma: "https://figma.com",
  Notion: "https://notion.so",
  Linear: "https://linear.app",
  Slack: "https://slack.com",
  Atlassian: "https://atlassian.com",
  GitLab: "https://gitlab.com",
  Vercel: "https://vercel.com",
  HashiCorp: "https://hashicorp.com",
  TCS: "https://www.tcs.com",
  Infosys: "https://www.infosys.com",
  Wipro: "https://www.wipro.com",
  HCLTech: "https://www.hcltech.com",
  "Tech Mahindra": "https://www.techmahindra.com",
  Zomato: "https://www.zomato.com",
  Razorpay: "https://razorpay.com",
  Freshworks: "https://www.freshworks.com",
  Swiggy: "https://www.swiggy.com",
  Paytm: "https://paytm.com",
  Microsoft: "https://microsoft.com",
  Google: "https://google.com",
  Apple: "https://apple.com",
  Meta: "https://about.meta.com",
  Amazon: "https://amazon.com",
  Netflix: "https://netflix.com",
  Spotify: "https://spotify.com",
  Zoom: "https://zoom.us",
  Salesforce: "https://salesforce.com",
  Adobe: "https://adobe.com",
  Cloudflare: "https://cloudflare.com",
  Datadog: "https://datadoghq.com",
  Tata: "https://www.tata.com",
  IBM: "https://ibm.com",
  Oracle: "https://oracle.com",
  SAP: "https://sap.com",
  Samsung: "https://samsung.com",
  Nvidia: "https://nvidia.com",
  Intel: "https://intel.com",
  AMD: "https://amd.com",
  Cisco: "https://cisco.com",
  Dell: "https://dell.com",
  HP: "https://hp.com",
  Qualcomm: "https://qualcomm.com",
  PayPal: "https://paypal.com",
  Uber: "https://uber.com",
  Accenture: "https://accenture.com",
  Cognizant: "https://cognizant.com",
  Capgemini: "https://capgemini.com",
  Deloitte: "https://deloitte.com",
  Zoho: "https://zoho.com",
  "Red Hat": "https://redhat.com",
  VMware: "https://vmware.com",
};

function getCompanyWebsite(company: string): string {
  return (
    COMPANY_WEBSITES[company] ??
    `https://www.${company.toLowerCase().replace(/\s+/g, "")}.com`
  );
}

const SEARCH_HISTORY_KEY = "dreamcrafter_search_history";
const MAX_KEYS = 5;

const ALL_SCOPES = [
  {
    id: "intelligence:read",
    label: "Intelligence Read",
    icon: BarChart2,
    color: "#22D3EE",
    desc: "Access company intelligence reports",
  },
  {
    id: "release_notes:read",
    label: "Release Notes",
    icon: FileText,
    color: "#22D3EE",
    desc: "Read release notes & changelogs",
  },
  {
    id: "features:read",
    label: "Features",
    icon: Layers,
    color: "#34D399",
    desc: "Access product feature data",
  },
  {
    id: "press:read",
    label: "Press",
    icon: Newspaper,
    color: "#EC4899",
    desc: "Read press coverage & articles",
  },
  {
    id: "dev_updates:read",
    label: "Dev Updates",
    icon: Rss,
    color: "#8B5CF6",
    desc: "Access developer blog & API changes",
  },
  {
    id: "strategy:read",
    label: "Strategy",
    icon: BookOpen,
    color: "#F59E0B",
    desc: "Access roadmap & strategy data",
  },
  {
    id: "news:read",
    label: "News",
    icon: Radio,
    color: "#FB7185",
    desc: "Access real-time news signals",
  },
  {
    id: "jobs:read",
    label: "Open Roles",
    icon: Key,
    color: "#A78BFA",
    desc: "Access company open roles data",
  },
];

const DATA_BADGES = [
  { label: "Release Notes", color: "#22D3EE" },
  { label: "Features", color: "#34D399" },
  { label: "Press", color: "#EC4899" },
  { label: "Dev Updates", color: "#8B5CF6" },
  { label: "Strategy", color: "#F59E0B" },
  { label: "News", color: "#FB7185" },
];

function generateKey(): string {
  const hex = Array.from({ length: 32 }, () =>
    Math.floor(Math.random() * 16).toString(16),
  ).join("");
  return `dc_${hex}`;
}

function maskKey(value: string): string {
  const last4 = value.slice(-4);
  return `dc_${"•".repeat(8)}...${last4}`;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function getSearchHistory(): string[] {
  try {
    const raw = localStorage.getItem(SEARCH_HISTORY_KEY);
    if (raw) return (JSON.parse(raw) as string[]).slice(0, 10);
  } catch {}
  try {
    const raw = localStorage.getItem("dreamcrafter_last_company");
    if (raw) return [raw];
  } catch {}
  return [];
}

function recordSearch(company: string) {
  try {
    const hist = getSearchHistory();
    const updated = [company, ...hist.filter((c) => c !== company)].slice(
      0,
      20,
    );
    localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(updated));
  } catch {}
}

// expose for other pages to call
(window as unknown as Record<string, unknown>).dcRecordSearch = recordSearch;

// Company card shown in the Create Key form
function CompanyDataCard({
  company,
  selected,
  onToggle,
}: {
  company: string;
  selected: boolean;
  onToggle: () => void;
}) {
  return (
    // biome-ignore lint/a11y/useSemanticElements: outer div needed to avoid nesting <button> inside <button>
    <div
      role="button"
      tabIndex={0}
      onClick={onToggle}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onToggle();
      }}
      data-ocid="apikey.company.toggle"
      className="text-left rounded-xl p-4 transition-all duration-200 w-full relative cursor-pointer"
      style={{
        background: selected
          ? "linear-gradient(135deg, rgba(34,211,238,0.07) 0%, rgba(15,27,42,0.95) 100%)"
          : "#0F1B2A",
        border: selected
          ? "1px solid rgba(34,211,238,0.4)"
          : "1px solid rgba(34,211,238,0.15)",
        boxShadow: selected ? "0 0 18px rgba(34,211,238,0.06)" : "none",
      }}
    >
      {/* Selected indicator */}
      <div
        className="absolute top-3 right-3 w-5 h-5 rounded-full flex items-center justify-center transition-all"
        style={{
          background: selected
            ? "rgba(34,211,238,0.2)"
            : "rgba(148,163,184,0.08)",
          border: selected
            ? "1.5px solid rgba(34,211,238,0.6)"
            : "1.5px solid rgba(148,163,184,0.2)",
        }}
      >
        {selected && (
          <Check className="w-2.5 h-2.5" style={{ color: "#22D3EE" }} />
        )}
      </div>

      {/* Company name */}
      <p className="font-bold text-sm text-white mb-2.5 pr-7">{company}</p>

      {/* Data-type badges */}
      <div className="flex flex-wrap gap-1 mb-2.5">
        {DATA_BADGES.map((badge) => (
          <span
            key={badge.label}
            className="font-semibold px-1.5 py-0.5 rounded-full"
            style={{
              fontSize: "10px",
              color: badge.color,
              background: `${badge.color}14`,
              border: `1px solid ${badge.color}30`,
            }}
          >
            {badge.label}
          </span>
        ))}
      </div>

      <p className="text-[10px] font-medium" style={{ color: "#475569" }}>
        Intelligence data, open roles &amp; briefings
      </p>
      <div className="flex items-center gap-3 mt-1.5 flex-wrap">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            window.open(
              getCompanyWebsite(company),
              "_blank",
              "noopener,noreferrer",
            );
          }}
          className="inline-flex items-center gap-1 text-[10px] font-semibold hover:opacity-80 transition-opacity"
          style={{
            color: "#22D3EE",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
          }}
        >
          <ExternalLink className="w-2.5 h-2.5" />
          Visit website
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            window.location.href = `/#/analysis?company=${encodeURIComponent(company)}`;
          }}
          className="inline-flex items-center gap-1 text-[10px] font-semibold hover:opacity-80 transition-opacity"
          style={{
            color: "#34D399",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
          }}
        >
          <ExternalLink className="w-2.5 h-2.5" />
          View Analysis
        </button>
      </div>
    </div>
  );
}

const SEARCH_TOOL_COMPANIES: Record<string, string> = {
  openai: "https://openai.com",
  google: "https://google.com",
  microsoft: "https://microsoft.com",
  apple: "https://apple.com",
  meta: "https://about.meta.com",
  amazon: "https://amazon.com",
  github: "https://github.com",
  stripe: "https://stripe.com",
  figma: "https://figma.com",
  anthropic: "https://anthropic.com",
  notion: "https://notion.so",
  slack: "https://slack.com",
  tcs: "https://www.tcs.com",
  infosys: "https://www.infosys.com",
  wipro: "https://www.wipro.com",
};

function ApiKeySearchTool() {
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState<{
    type: "success" | "error" | "info";
    msg: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);

  function handleGenerate() {
    const key = `dc_${crypto.randomUUID().replace(/-/g, "").slice(0, 32)}`;
    setActiveKey(key);
    setStatus({ type: "success", msg: "Key generated successfully!" });
    setCopied(false);
  }

  function handleCopy() {
    if (!activeKey) return;
    navigator.clipboard.writeText(activeKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleSearch() {
    if (!activeKey) {
      setStatus({ type: "error", msg: "Generate an API key first" });
      return;
    }
    const key = company.trim().toLowerCase();
    const url = SEARCH_TOOL_COMPANIES[key];
    if (!url) {
      setStatus({
        type: "error",
        msg: "Company not found. Try: OpenAI, Google, Microsoft, TCS...",
      });
      return;
    }
    setLoading(true);
    setStatus({ type: "info", msg: `Opening ${company.trim()} website...` });
    setTimeout(() => {
      window.open(url, "_blank", "noopener,noreferrer");
      setLoading(false);
    }, 500);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-2xl p-6 mb-8"
      style={{
        background:
          "linear-gradient(135deg, rgba(34,211,238,0.04) 0%, rgba(139,92,246,0.04) 100%)",
        border: "1px solid rgba(34,211,238,0.2)",
      }}
    >
      <div className="flex items-center gap-3 mb-6">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center"
          style={{ background: "linear-gradient(135deg,#22D3EE,#8B5CF6)" }}
        >
          <Key className="w-4 h-4 text-black" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-white">
            DreamCrafter API Key Search Tool
          </h2>
          <p className="text-xs" style={{ color: "#64748B" }}>
            Generate a key, then search any company to open its website
          </p>
        </div>
      </div>

      {/* Generate Key */}
      <div className="mb-6">
        <p
          className="text-xs font-semibold tracking-widest mb-3"
          style={{ color: "#94A3B8" }}
        >
          STEP 1 — GENERATE API KEY
        </p>
        <Button
          onClick={handleGenerate}
          data-ocid="search_tool.primary_button"
          className="font-semibold text-sm"
          style={{
            background: "linear-gradient(135deg,#22D3EE,#8B5CF6)",
            color: "#000",
          }}
        >
          <Plus className="w-4 h-4 mr-2" />
          Generate New API Key
        </Button>

        {activeKey && (
          <div
            className="mt-4 flex items-center gap-2 p-3 rounded-xl"
            style={{
              background: "#0B1220",
              border: "1px solid rgba(34,211,238,0.2)",
            }}
          >
            <code
              className="flex-1 text-xs font-mono truncate"
              style={{ color: "#22D3EE" }}
            >
              {activeKey}
            </code>
            <button
              type="button"
              onClick={handleCopy}
              data-ocid="search_tool.toggle"
              className="flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
              style={{
                background: copied
                  ? "rgba(52,211,153,0.15)"
                  : "rgba(34,211,238,0.1)",
                color: copied ? "#34D399" : "#22D3EE",
                border: `1px solid ${copied ? "rgba(52,211,153,0.3)" : "rgba(34,211,238,0.25)"}`,
              }}
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        )}
      </div>

      {/* Company Search */}
      <div>
        <p
          className="text-xs font-semibold tracking-widest mb-3"
          style={{ color: activeKey ? "#94A3B8" : "#475569" }}
        >
          STEP 2 — SEARCH COMPANY{" "}
          {!activeKey && (
            <span style={{ color: "#475569" }}>(Generate a key first)</span>
          )}
        </p>
        <div className="flex gap-2">
          <Input
            placeholder="Enter Company Name"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !loading && handleSearch()}
            disabled={!activeKey}
            data-ocid="search_tool.input"
            className="flex-1"
            style={{
              background: "#0B1220",
              borderColor: "rgba(34,211,238,0.2)",
              color: "#F1F5F9",
            }}
          />
          <Button
            onClick={handleSearch}
            disabled={!activeKey || loading}
            data-ocid="search_tool.submit_button"
            className="font-semibold px-5"
            style={{
              background: activeKey
                ? "rgba(34,211,238,0.15)"
                : "rgba(34,211,238,0.05)",
              color: activeKey ? "#22D3EE" : "#475569",
              border: "1px solid rgba(34,211,238,0.2)",
            }}
          >
            {loading ? (
              <div
                className="w-4 h-4 border-2 border-t-transparent rounded-full animate-spin"
                style={{
                  borderColor: "#22D3EE",
                  borderTopColor: "transparent",
                }}
              />
            ) : (
              <>
                <Search className="w-4 h-4 mr-1.5" />
                Search & Open
              </>
            )}
          </Button>
        </div>

        {status && (
          <p
            className="mt-2 text-xs font-medium"
            data-ocid="search_tool.success_state"
            style={{
              color:
                status.type === "error"
                  ? "#F87171"
                  : status.type === "success"
                    ? "#34D399"
                    : "#22D3EE",
            }}
          >
            {status.msg}
          </p>
        )}
      </div>
    </motion.div>
  );
}

export default function ApiKeysPage() {
  const [keys, setKeys] = useState<ApiKey[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
    } catch {
      return [];
    }
  });
  const [newKeyName, setNewKeyName] = useState("");
  const [selectedScopes, setSelectedScopes] = useState<string[]>(
    ALL_SCOPES.map((s) => s.id),
  );
  const [justCreated, setJustCreated] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [revealId, setRevealId] = useState<string | null>(null);
  const [revokeTarget, setRevokeTarget] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const searchHistory = getSearchHistory();
  const [selectedCompanies, setSelectedCompanies] =
    useState<string[]>(searchHistory);

  // Keep selectedCompanies in sync when searchHistory changes (on mount)
  useEffect(() => {
    setSelectedCompanies(getSearchHistory());
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(keys));
  }, [keys]);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 3000);
  }, []);

  function toggleScope(id: string) {
    setSelectedScopes((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id],
    );
  }

  function toggleCompany(company: string) {
    setSelectedCompanies((prev) =>
      prev.includes(company)
        ? prev.filter((c) => c !== company)
        : [...prev, company],
    );
  }

  const allCompaniesSelected =
    searchHistory.length > 0 &&
    selectedCompanies.length === searchHistory.length;

  function handleSelectAllCompanies() {
    if (allCompaniesSelected) {
      setSelectedCompanies([]);
    } else {
      setSelectedCompanies([...searchHistory]);
    }
  }

  function handleGenerate() {
    if (!newKeyName.trim()) return;
    if (keys.filter((k) => k.status === "active").length >= MAX_KEYS) {
      showToast(`Maximum ${MAX_KEYS} active keys allowed.`);
      return;
    }
    if (selectedScopes.length === 0) {
      showToast("Select at least one scope.");
      return;
    }
    setIsGenerating(true);
    setTimeout(() => {
      const key: ApiKey = {
        id: `key_${Date.now()}`,
        name: newKeyName.trim(),
        value: generateKey(),
        createdAt: new Date().toISOString(),
        status: "active",
        scopes: selectedScopes,
        companiesAccessed: selectedCompanies,
        dataTypes: selectedScopes.map(
          (s) => ALL_SCOPES.find((x) => x.id === s)?.label ?? s,
        ),
      };
      setKeys((prev) => [key, ...prev]);
      setJustCreated(key.id);
      setExpandedId(key.id);
      setNewKeyName("");
      setSelectedScopes(ALL_SCOPES.map((s) => s.id));
      setIsGenerating(false);
      showToast("API key generated — copy it now, it won't be shown again.");
    }, 600);
  }

  function handleCopy(key: ApiKey) {
    navigator.clipboard.writeText(key.value).then(() => {
      setCopiedId(key.id);
      showToast("Key copied to clipboard!");
      setTimeout(() => setCopiedId(null), 2000);
    });
  }

  function handleRevoke(id: string) {
    setKeys((prev) =>
      prev.map((k) => (k.id === id ? { ...k, status: "revoked" } : k)),
    );
    if (justCreated === id) setJustCreated(null);
    setRevokeTarget(null);
    showToast("API key revoked.");
  }

  function handleDelete(id: string) {
    setKeys((prev) => prev.filter((k) => k.id !== id));
    if (justCreated === id) setJustCreated(null);
    setRevokeTarget(null);
    showToast("Key removed.");
  }

  const activeCount = keys.filter((k) => k.status === "active").length;

  return (
    <div className="min-h-screen" style={{ background: "#0B1220" }}>
      <Navbar />

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-xl text-sm font-semibold flex items-center gap-2"
            style={{
              background: "#0F1B2A",
              border: "1px solid rgba(34,211,238,0.35)",
              color: "#22D3EE",
              boxShadow: "0 8px 30px rgba(0,0,0,0.5)",
            }}
          >
            <Check className="w-4 h-4" />
            {toast}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Revoke confirm dialog */}
      <AnimatePresence>
        {revokeTarget && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 flex items-center justify-center px-4"
            style={{
              background: "rgba(0,0,0,0.65)",
              backdropFilter: "blur(4px)",
            }}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              className="rounded-2xl p-7 w-full max-w-sm"
              style={{
                background: "#0F1B2A",
                border: "1px solid rgba(239,68,68,0.35)",
                boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
              }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: "rgba(239,68,68,0.12)" }}
                >
                  <AlertTriangle
                    className="w-5 h-5"
                    style={{ color: "#EF4444" }}
                  />
                </div>
                <h3 className="text-white font-bold text-base">
                  Revoke API Key?
                </h3>
              </div>
              <p className="text-sm mb-6" style={{ color: "#94A3B8" }}>
                This key will stop working immediately. This action cannot be
                undone.
              </p>
              <div className="flex gap-3">
                <button
                  type="button"
                  data-ocid="apikey.cancel_button"
                  onClick={() => setRevokeTarget(null)}
                  className="flex-1 py-2 rounded-xl text-sm font-semibold transition-all"
                  style={{
                    background: "rgba(148,163,184,0.08)",
                    color: "#94A3B8",
                    border: "1px solid rgba(148,163,184,0.15)",
                  }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  data-ocid="apikey.confirm_button"
                  onClick={() => handleRevoke(revokeTarget)}
                  className="flex-1 py-2 rounded-xl text-sm font-semibold transition-all"
                  style={{
                    background: "rgba(239,68,68,0.15)",
                    color: "#EF4444",
                    border: "1px solid rgba(239,68,68,0.35)",
                  }}
                >
                  Revoke Key
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="container max-w-4xl mx-auto px-6 pt-28 pb-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-2">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #22D3EE22, #34D39922)",
              }}
            >
              <Key className="w-5 h-5" style={{ color: "#22D3EE" }} />
            </div>
            <span
              className="text-xs font-semibold tracking-widest"
              style={{ color: "#22D3EE" }}
            >
              DREAMCRAFTER
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2">
            API Keys
          </h1>
          <p className="text-base" style={{ color: "#94A3B8" }}>
            Generate and manage your API keys for programmatic access to
            Dreamcrafter intelligence.
          </p>
        </motion.div>

        {/* Generate new key */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="rounded-2xl p-6 mb-8"
          style={{
            background: "#0F1B2A",
            border: "1px solid rgba(34,211,238,0.2)",
          }}
        >
          <h2
            className="text-sm font-bold mb-5 tracking-wide"
            style={{ color: "#22D3EE" }}
          >
            GENERATE NEW KEY
          </h2>

          {/* Key name */}
          <div className="flex gap-3 flex-col sm:flex-row mb-6">
            <Input
              placeholder="Key name (e.g. Production, CI/CD)"
              value={newKeyName}
              onChange={(e) => setNewKeyName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
              disabled={isGenerating}
              data-ocid="apikey.input"
              className="flex-1 h-11 text-sm"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(34,211,238,0.2)",
                color: "#F1F5F9",
              }}
            />
            <Button
              onClick={handleGenerate}
              disabled={
                !newKeyName.trim() || isGenerating || activeCount >= MAX_KEYS
              }
              data-ocid="apikey.primary_button"
              className="h-11 px-5 font-semibold text-sm flex items-center gap-2 whitespace-nowrap"
              style={{
                background:
                  newKeyName.trim() && activeCount < MAX_KEYS
                    ? "linear-gradient(135deg, #22D3EE, #34D399)"
                    : "rgba(34,211,238,0.1)",
                color:
                  newKeyName.trim() && activeCount < MAX_KEYS
                    ? "#000"
                    : "#64748B",
                border: "none",
              }}
            >
              {isGenerating ? (
                <div
                  className="w-4 h-4 border-2 rounded-full"
                  style={{
                    borderColor: "rgba(0,0,0,0.3)",
                    borderTopColor: "#000",
                    animation: "spin 0.7s linear infinite",
                  }}
                />
              ) : (
                <Plus className="w-4 h-4" />
              )}
              Generate Key
            </Button>
          </div>

          {/* Scopes */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <p
                className="text-xs font-bold tracking-widest"
                style={{ color: "#64748B" }}
              >
                DATA ACCESS SCOPES
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  data-ocid="apikey.toggle"
                  onClick={() => setSelectedScopes(ALL_SCOPES.map((s) => s.id))}
                  className="text-xs px-2 py-1 rounded-lg transition-all"
                  style={{
                    color: "#22D3EE",
                    background: "rgba(34,211,238,0.08)",
                    border: "1px solid rgba(34,211,238,0.2)",
                  }}
                >
                  All
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedScopes([])}
                  className="text-xs px-2 py-1 rounded-lg transition-all"
                  style={{
                    color: "#94A3B8",
                    background: "rgba(148,163,184,0.06)",
                    border: "1px solid rgba(148,163,184,0.15)",
                  }}
                >
                  None
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {ALL_SCOPES.map((scope) => {
                const Icon = scope.icon;
                const active = selectedScopes.includes(scope.id);
                return (
                  <button
                    key={scope.id}
                    type="button"
                    onClick={() => toggleScope(scope.id)}
                    className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-left transition-all"
                    style={{
                      background: active
                        ? `${scope.color}10`
                        : "rgba(15,27,42,0.8)",
                      border: active
                        ? `1px solid ${scope.color}40`
                        : "1px solid rgba(255,255,255,0.06)",
                    }}
                  >
                    <div
                      className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0"
                      style={{
                        background: active
                          ? `${scope.color}20`
                          : "rgba(255,255,255,0.04)",
                      }}
                    >
                      <Icon
                        className="w-3 h-3"
                        style={{ color: active ? scope.color : "#64748B" }}
                      />
                    </div>
                    <span
                      className="text-xs font-semibold truncate"
                      style={{ color: active ? "#F1F5F9" : "#64748B" }}
                    >
                      {scope.label}
                    </span>
                    {active && (
                      <Check
                        className="w-3 h-3 ml-auto flex-shrink-0"
                        style={{ color: scope.color }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── SEARCHED COMPANY DATA SECTION ── */}
          <div className="mb-5">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p
                  className="text-xs font-bold tracking-widest"
                  style={{ color: "#64748B" }}
                >
                  SEARCHED COMPANY DATA — WILL BE INCLUDED IN KEY
                </p>
                {searchHistory.length > 0 && (
                  <p
                    className="text-[11px] mt-0.5"
                    style={{ color: "#475569" }}
                  >
                    {selectedCompanies.length} of {searchHistory.length}{" "}
                    companies selected
                  </p>
                )}
              </div>
              {searchHistory.length > 0 && (
                <button
                  type="button"
                  data-ocid="apikey.toggle"
                  onClick={handleSelectAllCompanies}
                  className="text-xs px-2.5 py-1 rounded-lg transition-all font-semibold flex-shrink-0"
                  style={{
                    color: allCompaniesSelected ? "#94A3B8" : "#22D3EE",
                    background: allCompaniesSelected
                      ? "rgba(148,163,184,0.06)"
                      : "rgba(34,211,238,0.08)",
                    border: allCompaniesSelected
                      ? "1px solid rgba(148,163,184,0.15)"
                      : "1px solid rgba(34,211,238,0.2)",
                  }}
                >
                  {allCompaniesSelected ? "Deselect All" : "Select All"}
                </button>
              )}
            </div>

            {searchHistory.length > 0 ? (
              <AnimatePresence initial={false}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {searchHistory.map((company, idx) => (
                    <motion.div
                      key={company}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25, delay: idx * 0.04 }}
                    >
                      <CompanyDataCard
                        company={company}
                        selected={selectedCompanies.includes(company)}
                        onToggle={() => toggleCompany(company)}
                      />
                    </motion.div>
                  ))}
                </div>
              </AnimatePresence>
            ) : (
              <div
                className="rounded-xl px-5 py-5 flex flex-col items-center text-center gap-2"
                data-ocid="apikey.empty_state"
                style={{
                  background: "rgba(148,163,184,0.04)",
                  border: "1px dashed rgba(148,163,184,0.15)",
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-1"
                  style={{ background: "rgba(34,211,238,0.06)" }}
                >
                  <BarChart2
                    className="w-5 h-5"
                    style={{ color: "#22D3EE", opacity: 0.5 }}
                  />
                </div>
                <p className="text-sm font-semibold text-white">
                  No company searches yet
                </p>
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: "#475569" }}
                >
                  Search for companies on the home page to attach their
                  intelligence data to this key.
                </p>
                <Link
                  to="/"
                  data-ocid="apikey.link"
                  className="mt-1 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all hover:bg-cyan-500/10"
                  style={{
                    color: "#22D3EE",
                    border: "1px solid rgba(34,211,238,0.25)",
                    background: "rgba(34,211,238,0.06)",
                  }}
                >
                  Go to Home → Search a Company
                </Link>
              </div>
            )}

            {searchHistory.length > 0 && selectedCompanies.length === 0 && (
              <p className="text-xs mt-2" style={{ color: "#F59E0B" }}>
                ⚠ No companies selected — key will be created without company
                data.
              </p>
            )}
          </div>
          {/* ── END SEARCHED COMPANY DATA ── */}

          <p className="text-xs" style={{ color: "#64748B" }}>
            {activeCount} / {MAX_KEYS} active keys used.
            {activeCount >= MAX_KEYS && (
              <span style={{ color: "#EF4444" }}>
                {" "}
                Revoke a key to generate a new one.
              </span>
            )}
          </p>
        </motion.div>

        {/* DreamCrafter API Key Search Tool */}
        <ApiKeySearchTool />

        {/* Keys list */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2
              className="text-sm font-bold tracking-wide"
              style={{ color: "#64748B" }}
            >
              YOUR API KEYS
            </h2>
            <span
              className="text-xs font-semibold px-2.5 py-1 rounded-full"
              style={{
                background: "rgba(34,211,238,0.08)",
                color: "#22D3EE",
                border: "1px solid rgba(34,211,238,0.2)",
              }}
            >
              {keys.length} total
            </span>
          </div>

          {keys.length === 0 ? (
            <div
              data-ocid="apikey.empty_state"
              className="rounded-2xl py-16 flex flex-col items-center justify-center gap-4"
              style={{
                background: "#0F1B2A",
                border: "1px dashed rgba(34,211,238,0.15)",
              }}
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center"
                style={{ background: "rgba(34,211,238,0.06)" }}
              >
                <Key
                  className="w-7 h-7"
                  style={{ color: "#22D3EE", opacity: 0.5 }}
                />
              </div>
              <div className="text-center">
                <p className="text-white font-semibold mb-1">No API keys yet</p>
                <p className="text-sm" style={{ color: "#64748B" }}>
                  Generate your first key above to get started.
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <AnimatePresence initial={false}>
                {keys.map((key, idx) => (
                  <motion.div
                    key={key.id}
                    initial={{ opacity: 0, y: -12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8, scale: 0.97 }}
                    transition={{ duration: 0.3, delay: idx * 0.04 }}
                    className="rounded-xl overflow-hidden"
                    data-ocid={`apikey.item.${idx + 1}`}
                    style={{
                      background:
                        key.status === "revoked"
                          ? "rgba(15,27,42,0.5)"
                          : justCreated === key.id
                            ? "linear-gradient(135deg, rgba(34,211,238,0.06), rgba(52,211,153,0.04))"
                            : "#0F1B2A",
                      border:
                        justCreated === key.id
                          ? "1px solid rgba(34,211,238,0.4)"
                          : key.status === "revoked"
                            ? "1px solid rgba(148,163,184,0.1)"
                            : "1px solid rgba(34,211,238,0.15)",
                      opacity: key.status === "revoked" ? 0.55 : 1,
                    }}
                  >
                    <div className="p-5">
                      {/* New key banner */}
                      {justCreated === key.id && (
                        <div
                          className="flex items-center gap-2 mb-3 px-3 py-2 rounded-lg text-xs font-semibold"
                          style={{
                            background: "rgba(251,146,60,0.1)",
                            border: "1px solid rgba(251,146,60,0.3)",
                            color: "#FB923C",
                          }}
                        >
                          <AlertTriangle className="w-3.5 h-3.5" />
                          Copy this key now — it will be masked permanently
                          after you leave or refresh.
                        </div>
                      )}

                      <div className="flex items-start justify-between gap-4 flex-wrap">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2 flex-wrap">
                            <span className="font-semibold text-white text-sm">
                              {key.name}
                            </span>
                            <span
                              className="text-xs font-bold px-2 py-0.5 rounded-full"
                              style={{
                                background:
                                  key.status === "active"
                                    ? "rgba(52,211,153,0.12)"
                                    : "rgba(148,163,184,0.1)",
                                color:
                                  key.status === "active"
                                    ? "#34D399"
                                    : "#64748B",
                                border:
                                  key.status === "active"
                                    ? "1px solid rgba(52,211,153,0.3)"
                                    : "1px solid rgba(148,163,184,0.15)",
                              }}
                            >
                              {key.status === "active"
                                ? "● Active"
                                : "✕ Revoked"}
                            </span>
                            <span
                              className="text-xs"
                              style={{ color: "#64748B" }}
                            >
                              Created {formatDate(key.createdAt)}
                            </span>
                            <span
                              className="text-xs font-semibold px-2 py-0.5 rounded-full"
                              style={{
                                background: "rgba(167,139,250,0.08)",
                                color: "#A78BFA",
                                border: "1px solid rgba(167,139,250,0.2)",
                              }}
                            >
                              {key.scopes?.length ?? 0} scopes
                            </span>
                            {(key.companiesAccessed?.length ?? 0) > 0 && (
                              <span
                                className="text-xs font-semibold px-2 py-0.5 rounded-full"
                                style={{
                                  background: "rgba(34,211,238,0.08)",
                                  color: "#22D3EE",
                                  border: "1px solid rgba(34,211,238,0.2)",
                                }}
                              >
                                {key.companiesAccessed.length} companies
                              </span>
                            )}
                          </div>

                          {/* Key value */}
                          <div
                            className="flex items-center gap-2 px-3 py-2 rounded-lg font-mono text-xs"
                            style={{
                              background: "rgba(0,0,0,0.3)",
                              border: "1px solid rgba(255,255,255,0.05)",
                              color:
                                justCreated === key.id || revealId === key.id
                                  ? "#22D3EE"
                                  : "#64748B",
                            }}
                          >
                            <span className="flex-1 truncate">
                              {justCreated === key.id || revealId === key.id
                                ? key.value
                                : maskKey(key.value)}
                            </span>
                            {key.status === "active" &&
                              justCreated !== key.id && (
                                <button
                                  type="button"
                                  onClick={() =>
                                    setRevealId((prev) =>
                                      prev === key.id ? null : key.id,
                                    )
                                  }
                                  className="flex-shrink-0 transition-opacity hover:opacity-80"
                                  title={
                                    revealId === key.id
                                      ? "Hide key"
                                      : "Reveal key"
                                  }
                                >
                                  {revealId === key.id ? (
                                    <EyeOff
                                      className="w-3.5 h-3.5"
                                      style={{ color: "#64748B" }}
                                    />
                                  ) : (
                                    <Eye
                                      className="w-3.5 h-3.5"
                                      style={{ color: "#64748B" }}
                                    />
                                  )}
                                </button>
                              )}
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2">
                          {key.status === "active" && (
                            <button
                              type="button"
                              data-ocid="apikey.secondary_button"
                              onClick={() => handleCopy(key)}
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
                              style={{
                                background:
                                  copiedId === key.id
                                    ? "rgba(52,211,153,0.15)"
                                    : "rgba(34,211,238,0.08)",
                                color:
                                  copiedId === key.id ? "#34D399" : "#22D3EE",
                                border:
                                  copiedId === key.id
                                    ? "1px solid rgba(52,211,153,0.3)"
                                    : "1px solid rgba(34,211,238,0.2)",
                              }}
                            >
                              {copiedId === key.id ? (
                                <Check className="w-3.5 h-3.5" />
                              ) : (
                                <Copy className="w-3.5 h-3.5" />
                              )}
                              {copiedId === key.id ? "Copied!" : "Copy"}
                            </button>
                          )}
                          {key.status === "active" ? (
                            <button
                              type="button"
                              data-ocid="apikey.delete_button"
                              onClick={() => setRevokeTarget(key.id)}
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all hover:bg-red-500/10"
                              style={{
                                background: "rgba(239,68,68,0.06)",
                                color: "#EF4444",
                                border: "1px solid rgba(239,68,68,0.2)",
                              }}
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              Revoke
                            </button>
                          ) : (
                            <button
                              type="button"
                              data-ocid="apikey.delete_button"
                              onClick={() => handleDelete(key.id)}
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all hover:opacity-80"
                              style={{
                                background: "rgba(148,163,184,0.06)",
                                color: "#64748B",
                                border: "1px solid rgba(148,163,184,0.12)",
                              }}
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              Remove
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() =>
                              setExpandedId((prev) =>
                                prev === key.id ? null : key.id,
                              )
                            }
                            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs transition-all"
                            style={{
                              background: "rgba(148,163,184,0.06)",
                              color: "#94A3B8",
                              border: "1px solid rgba(148,163,184,0.12)",
                            }}
                            title="View details"
                          >
                            {expandedId === key.id ? (
                              <ChevronUp className="w-3.5 h-3.5" />
                            ) : (
                              <ChevronDown className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Expanded detail: scopes + companies */}
                    <AnimatePresence initial={false}>
                      {expandedId === key.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          style={{ overflow: "hidden" }}
                        >
                          <div
                            className="px-5 pb-5 pt-0 border-t"
                            style={{ borderColor: "rgba(255,255,255,0.05)" }}
                          >
                            <div className="pt-4 grid md:grid-cols-2 gap-5">
                              {/* Scopes */}
                              <div>
                                <p
                                  className="text-xs font-bold tracking-widest mb-2.5"
                                  style={{ color: "#64748B" }}
                                >
                                  DATA SCOPES
                                </p>
                                <div className="flex flex-wrap gap-1.5">
                                  {(key.scopes ?? []).map((s) => {
                                    const def = ALL_SCOPES.find(
                                      (x) => x.id === s,
                                    );
                                    if (!def) return null;
                                    const Icon = def.icon;
                                    return (
                                      <span
                                        key={s}
                                        className="flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full"
                                        style={{
                                          background: `${def.color}10`,
                                          color: def.color,
                                          border: `1px solid ${def.color}30`,
                                        }}
                                      >
                                        <Icon className="w-3 h-3" />
                                        {def.label}
                                      </span>
                                    );
                                  })}
                                  {(!key.scopes || key.scopes.length === 0) && (
                                    <span
                                      className="text-xs"
                                      style={{ color: "#475569" }}
                                    >
                                      No scopes recorded
                                    </span>
                                  )}
                                </div>
                              </div>

                              {/* Companies accessed — rich cards */}
                              <div>
                                <p
                                  className="text-xs font-bold tracking-widest mb-2.5"
                                  style={{ color: "#64748B" }}
                                >
                                  COMPANIES ACCESSED
                                </p>
                                {(key.companiesAccessed ?? []).length > 0 ? (
                                  <div className="flex flex-col gap-2">
                                    {(key.companiesAccessed ?? []).map((c) => (
                                      <div
                                        key={c}
                                        className="rounded-lg px-3 py-2.5"
                                        style={{
                                          background: "rgba(34,211,238,0.04)",
                                          border:
                                            "1px solid rgba(34,211,238,0.15)",
                                        }}
                                      >
                                        <a
                                          href={getCompanyWebsite(c)}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="text-xs font-bold text-white mb-1.5 flex items-center gap-1 hover:text-cyan-400 transition-colors"
                                          style={{ textDecoration: "none" }}
                                        >
                                          {c}
                                          <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                                        </a>
                                        <div className="flex flex-wrap gap-1">
                                          {DATA_BADGES.map((badge) => (
                                            <span
                                              key={badge.label}
                                              className="font-semibold px-1.5 py-0.5 rounded-full"
                                              style={{
                                                fontSize: "9px",
                                                color: badge.color,
                                                background: `${badge.color}12`,
                                                border: `1px solid ${badge.color}28`,
                                              }}
                                            >
                                              {badge.label}
                                            </span>
                                          ))}
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                ) : (
                                  <span
                                    className="text-xs"
                                    style={{ color: "#475569" }}
                                  >
                                    No company data attached
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </motion.div>

        {/* Info card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="mt-8 rounded-xl p-5 flex gap-4"
          style={{
            background: "rgba(34,211,238,0.04)",
            border: "1px solid rgba(34,211,238,0.12)",
          }}
        >
          <Zap
            className="w-5 h-5 flex-shrink-0 mt-0.5"
            style={{ color: "#22D3EE" }}
          />
          <div>
            <p className="text-sm font-semibold text-white mb-1">
              API Key Security
            </p>
            <p className="text-xs leading-relaxed" style={{ color: "#64748B" }}>
              Treat your API keys like passwords. Never share them publicly or
              commit them to version control. Each key carries the scopes and
              session data you selected at creation time. Revoke any key you
              suspect has been compromised.
            </p>
          </div>
        </motion.div>
      </main>

      <footer
        className="border-t py-8 px-6"
        style={{ borderColor: "#223046", background: "#0B1220" }}
      >
        <div className="container max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
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
        </div>
      </footer>

      <Chatbot />
    </div>
  );
}
