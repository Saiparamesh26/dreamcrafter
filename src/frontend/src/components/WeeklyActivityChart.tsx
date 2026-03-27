import {
  BookOpen,
  FileText,
  Layers,
  Newspaper,
  Radio,
  Rss,
} from "lucide-react";
import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// ─── Deterministic seeded random ─────────────────────────────────────────────
function hashCode(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = Math.imul(31, h) + str.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

function seededRand(seed: number, min: number, max: number): number {
  const x = Math.sin(seed) * 10000;
  return Math.floor((x - Math.floor(x)) * (max - min + 1)) + min;
}

function generateCompanyData(company: string) {
  const base = hashCode(company.toLowerCase());

  const weeks8 = [
    "W1 Jan",
    "W2 Jan",
    "W3 Jan",
    "W4 Jan",
    "W1 Feb",
    "W2 Feb",
    "W3 Feb",
    "W4 Feb",
  ];
  const months = [
    "Oct '25",
    "Nov '25",
    "Dec '25",
    "Jan '26",
    "Feb '26",
    "Mar '26",
  ];

  const data8Week = weeks8.map((week, i) => ({
    week,
    releaseNotes: seededRand(base + i * 4 + 1, 6, 32),
    features: seededRand(base + i * 4 + 2, 5, 30),
    press: seededRand(base + i * 4 + 3, 3, 20),
    devUpdates: seededRand(base + i * 4 + 4, 10, 42),
  }));

  const dataMonthly = months.map((week, i) => ({
    week,
    releaseNotes: seededRand(base + 100 + i * 4 + 1, 25, 110),
    features: seededRand(base + 100 + i * 4 + 2, 20, 100),
    press: seededRand(base + 100 + i * 4 + 3, 12, 70),
    devUpdates: seededRand(base + 100 + i * 4 + 4, 40, 145),
  }));

  return { data8Week, dataMonthly };
}

const COLORS = {
  releaseNotes: "#22D3EE",
  features: "#34D399",
  press: "#EC4899",
  devUpdates: "#8B5CF6",
};

const SOURCE_CARDS = [
  {
    icon: FileText,
    label: "Release Notes",
    color: "#22D3EE",
    desc: "Official version releases & changelogs",
  },
  {
    icon: Layers,
    label: "Features",
    color: "#34D399",
    desc: "Product announcements & feature drops",
  },
  {
    icon: Newspaper,
    label: "Press",
    color: "#EC4899",
    desc: "News articles & media coverage",
  },
  {
    icon: Rss,
    label: "Dev Updates",
    color: "#8B5CF6",
    desc: "Engineering blog & API changes",
  },
  {
    icon: BookOpen,
    label: "Strategy",
    color: "#F59E0B",
    desc: "Vision, roadmap & strategic moves",
  },
  {
    icon: Radio,
    label: "News",
    color: "#FB7185",
    desc: "Real-time coverage & breaking news",
  },
];

function computeStats(
  data: {
    releaseNotes: number;
    features: number;
    press: number;
    devUpdates: number;
    week: string;
  }[],
) {
  const totals = data.reduce(
    (acc, d) => ({
      releaseNotes: acc.releaseNotes + d.releaseNotes,
      features: acc.features + d.features,
      press: acc.press + d.press,
      devUpdates: acc.devUpdates + d.devUpdates,
    }),
    { releaseNotes: 0, features: 0, press: 0, devUpdates: 0 },
  );
  const total =
    totals.releaseNotes + totals.features + totals.press + totals.devUpdates;
  const avg = Math.round(total / data.length);
  const weekTotals = data.map(
    (d) => d.releaseNotes + d.features + d.press + d.devUpdates,
  );
  const peak = Math.max(...weekTotals);
  const peakLabel = data[weekTotals.indexOf(peak)].week;
  return { total, avg, peak, peakLabel };
}

const TOOLTIP_STYLE = {
  contentStyle: {
    background: "#0F1B2A",
    border: "1px solid #223046",
    borderRadius: "8px",
    color: "#F8FAFC",
  },
};

const LEGEND_STYLE = {
  wrapperStyle: { color: "#94A3B8", fontSize: "12px", paddingTop: "16px" },
  formatter: (value: string) =>
    value === "releaseNotes"
      ? "Release Notes"
      : value === "devUpdates"
        ? "Dev Updates"
        : value.charAt(0).toUpperCase() + value.slice(1),
};

type ViewType = "8week" | "monthly";

export default function WeeklyActivityChart({
  company = "OpenAI",
}: { company?: string }) {
  const [view, setView] = useState<ViewType>("8week");
  const { data8Week, dataMonthly } = generateCompanyData(company);
  const data = view === "8week" ? data8Week : dataMonthly;
  const { total, avg, peak, peakLabel } = computeStats(data);

  return (
    <div
      className="animate-fade-up delay-400 rounded-xl border p-6"
      style={{ background: "#0F1B2A", borderColor: "#223046" }}
    >
      {/* Source cards grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
        {SOURCE_CARDS.map(({ icon: Icon, label, color, desc }) => (
          <div
            key={label}
            className="rounded-xl p-3 flex flex-col gap-1.5"
            style={{ background: `${color}08`, border: `1px solid ${color}20` }}
          >
            <div className="flex items-center gap-1.5">
              <Icon className="w-3.5 h-3.5 flex-shrink-0" style={{ color }} />
              <span className="text-xs font-semibold" style={{ color }}>
                {label}
              </span>
            </div>
            <p className="text-xs leading-snug" style={{ color: "#64748B" }}>
              {desc}
            </p>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-5">
        <div>
          <h2 className="text-xl font-bold" style={{ color: "#22D3EE" }}>
            Weekly Activity Chart
          </h2>
          <p className="text-xs mt-0.5" style={{ color: "#64748B" }}>
            Signal activity for{" "}
            <span style={{ color: "#22D3EE" }}>{company}</span>
          </p>
        </div>
        {/* Period switcher */}
        <div
          className="flex items-center rounded-lg p-0.5"
          style={{
            background: "rgba(34,211,238,0.06)",
            border: "1px solid rgba(34,211,238,0.15)",
          }}
        >
          {(["8week", "monthly"] as ViewType[]).map((v) => (
            <button
              type="button"
              key={v}
              onClick={() => setView(v)}
              className="px-3 py-1.5 rounded-md text-xs font-semibold transition-all duration-200"
              style={{
                background: view === v ? "rgba(34,211,238,0.2)" : "transparent",
                color: view === v ? "#22D3EE" : "#64748B",
                boxShadow:
                  view === v ? "0 0 12px rgba(34,211,238,0.25)" : "none",
              }}
            >
              {v === "8week" ? "8-Week View" : "Monthly View"}
            </button>
          ))}
        </div>
      </div>

      {/* Stat pills */}
      <div className="flex flex-wrap gap-3 mb-5">
        {[
          {
            label: "Total Signals",
            value: total.toLocaleString(),
            color: "#22D3EE",
          },
          { label: "Avg / Period", value: avg.toString(), color: "#34D399" },
          {
            label: `Peak (${peakLabel})`,
            value: peak.toString(),
            color: "#8B5CF6",
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full"
            style={{
              background: `${stat.color}12`,
              border: `1px solid ${stat.color}30`,
            }}
          >
            <span className="text-xs font-bold" style={{ color: stat.color }}>
              {stat.value}
            </span>
            <span className="text-xs" style={{ color: "#64748B" }}>
              {stat.label}
            </span>
          </div>
        ))}
      </div>

      {/* Bar Chart */}
      <ResponsiveContainer width="100%" height={280}>
        <BarChart
          data={data}
          margin={{ top: 4, right: 8, left: -20, bottom: 0 }}
          barCategoryGap="20%"
          barGap={2}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(255,255,255,0.05)"
            vertical={false}
          />
          <XAxis
            dataKey="week"
            tick={{ fill: "#94A3B8", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: "#94A3B8", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            {...TOOLTIP_STYLE}
            cursor={{ fill: "rgba(255,255,255,0.03)" }}
          />
          <Legend {...LEGEND_STYLE} />
          <Bar
            dataKey="releaseNotes"
            fill={COLORS.releaseNotes}
            radius={[3, 3, 0, 0]}
            fillOpacity={0.85}
          />
          <Bar
            dataKey="features"
            fill={COLORS.features}
            radius={[3, 3, 0, 0]}
            fillOpacity={0.85}
          />
          <Bar
            dataKey="press"
            fill={COLORS.press}
            radius={[3, 3, 0, 0]}
            fillOpacity={0.85}
          />
          <Bar
            dataKey="devUpdates"
            fill={COLORS.devUpdates}
            radius={[3, 3, 0, 0]}
            fillOpacity={0.85}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
