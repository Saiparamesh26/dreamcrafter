interface ActiveBadgeProps {
  company?: string;
}

export default function ActiveBadge({
  company = "Dreamcrafter",
}: ActiveBadgeProps) {
  return (
    <div className="flex items-center gap-3 justify-center mt-3 flex-wrap">
      <span
        className="text-sm font-bold px-3 py-1 rounded-lg"
        style={{
          background: "rgba(34,211,238,0.1)",
          color: "#22D3EE",
          border: "1px solid rgba(34,211,238,0.25)",
        }}
      >
        {company}
      </span>
      <div
        className="animate-active-pulse flex items-center gap-1.5 px-3 py-1 rounded-full border"
        style={{ borderColor: "rgba(34,197,94,0.4)", color: "#22C55E" }}
      >
        <span
          className="w-2 h-2 rounded-full"
          style={{ background: "#22C55E", boxShadow: "0 0 6px #22C55E" }}
        />
        <span className="text-xs font-bold tracking-widest">ACTIVE</span>
      </div>
    </div>
  );
}
