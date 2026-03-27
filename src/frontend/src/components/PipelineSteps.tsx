import {
  BarChart2,
  CheckCircle2,
  Circle,
  Clock,
  Cpu,
  Database,
  Search,
  Send,
} from "lucide-react";

interface PipelineStepsProps {
  company?: string;
}

type StepStatus = "DONE" | "ACTIVE" | "QUEUED";

const statusConfig: Record<
  StepStatus,
  {
    label: string;
    color: string;
    bg: string;
    borderColor: string;
    icon: React.ComponentType<{
      className?: string;
      style?: React.CSSProperties;
    }>;
  }
> = {
  DONE: {
    label: "DONE",
    color: "#34D399",
    bg: "rgba(52,211,153,0.12)",
    borderColor: "rgba(52,211,153,0.35)",
    icon: CheckCircle2,
  },
  ACTIVE: {
    label: "ACTIVE",
    color: "#22D3EE",
    bg: "rgba(34,211,238,0.12)",
    borderColor: "rgba(34,211,238,0.4)",
    icon: Circle,
  },
  QUEUED: {
    label: "QUEUED",
    color: "#94A3B8",
    bg: "rgba(148,163,184,0.08)",
    borderColor: "rgba(148,163,184,0.2)",
    icon: Clock,
  },
};

export default function PipelineSteps({
  company: _company = "OpenAI",
}: PipelineStepsProps) {
  const steps: {
    num: string;
    icon: React.ComponentType<{
      className?: string;
      style?: React.CSSProperties;
    }>;
    label: string;
    sub: string;
    status: StepStatus;
    delay: string;
    connDelay: string;
  }[] = [
    {
      num: "01",
      icon: Search,
      label: "Define",
      sub: "Set intelligence objectives & scope",
      status: "DONE",
      delay: "delay-200",
      connDelay: "delay-400",
    },
    {
      num: "02",
      icon: Database,
      label: "Collect",
      sub: "Aggregate signals across sources",
      status: "DONE",
      delay: "delay-400",
      connDelay: "delay-600",
    },
    {
      num: "03",
      icon: Cpu,
      label: "Process",
      sub: "Filter, normalize & enrich data",
      status: "ACTIVE",
      delay: "delay-600",
      connDelay: "delay-800",
    },
    {
      num: "04",
      icon: BarChart2,
      label: "Analyze",
      sub: "Extract patterns & insights",
      status: "QUEUED",
      delay: "delay-800",
      connDelay: "delay-1000",
    },
    {
      num: "05",
      icon: Send,
      label: "Deliver",
      sub: "Distribute actionable intelligence",
      status: "QUEUED",
      delay: "delay-1000",
      connDelay: "",
    },
  ];

  return (
    <div className="animate-fade-up delay-200">
      <h2
        className="text-sm font-semibold mb-4 tracking-widest uppercase"
        style={{ color: "#64748B" }}
      >
        Intelligence Pipeline
      </h2>

      <div className="flex flex-col lg:flex-row items-stretch gap-0">
        {steps.map((step, i) => {
          const Icon = step.icon;
          const cfg = statusConfig[step.status];
          const StatusIcon = cfg.icon;
          const isActive = step.status === "ACTIVE";

          return (
            <div
              key={step.num}
              className="flex flex-col lg:flex-row items-center flex-1"
            >
              {/* Card */}
              <div
                className={`animate-fade-up ${step.delay} flex-1 w-full rounded-xl p-3 border flex flex-col gap-2 relative overflow-hidden transition-all duration-300`}
                style={{
                  background: isActive
                    ? "linear-gradient(135deg, rgba(34,211,238,0.06) 0%, rgba(15,27,42,1) 60%)"
                    : "#0F1B2A",
                  borderColor: isActive
                    ? "rgba(34,211,238,0.5)"
                    : step.status === "DONE"
                      ? "rgba(52,211,153,0.25)"
                      : "rgba(34,211,238,0.1)",
                  boxShadow: isActive
                    ? "0 0 16px rgba(34,211,238,0.1), inset 0 0 16px rgba(34,211,238,0.03)"
                    : "none",
                }}
              >
                {/* Shimmer overlay on active */}
                {isActive && (
                  <div
                    className="absolute inset-0 shimmer rounded-xl"
                    style={{ zIndex: 0 }}
                  />
                )}

                <div className="relative z-10">
                  {/* Status badge */}
                  <div className="flex items-center justify-between mb-1">
                    <span
                      className="font-mono font-bold"
                      style={{ fontSize: "10px", color: "#64748B" }}
                    >
                      {step.num}
                    </span>
                    <div
                      className="flex items-center gap-1 font-bold px-1.5 py-0.5 rounded-full"
                      style={{
                        fontSize: "10px",
                        background: cfg.bg,
                        color: cfg.color,
                        border: `1px solid ${cfg.borderColor}`,
                      }}
                    >
                      {isActive && (
                        <span
                          className="w-1 h-1 rounded-full animate-pulse"
                          style={{
                            background: cfg.color,
                            boxShadow: `0 0 4px ${cfg.color}`,
                          }}
                        />
                      )}
                      {!isActive && (
                        <StatusIcon
                          className="w-2 h-2"
                          style={{ color: cfg.color }}
                        />
                      )}
                      {cfg.label}
                    </div>
                  </div>

                  {/* Icon */}
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center mt-1"
                    style={{ background: `${cfg.color}18` }}
                  >
                    <Icon className="w-3 h-3" style={{ color: cfg.color }} />
                  </div>

                  {/* Label */}
                  <p className="text-sm font-semibold text-white mt-1.5">
                    {step.label}
                  </p>
                  <p
                    className="mt-0.5 leading-tight"
                    style={{ fontSize: "10px", color: "#94A3B8" }}
                  >
                    {step.sub}
                  </p>
                </div>
              </div>

              {/* Connector */}
              {i < steps.length - 1 && (
                <div className="flex items-center justify-center mx-1 my-2 lg:my-0">
                  <div
                    className={`connector-line ${step.connDelay} hidden lg:block`}
                    style={{ width: "20px", flexShrink: 0 }}
                  />
                  <div
                    className={`connector-line ${step.connDelay} lg:hidden`}
                    style={{
                      width: "2px",
                      height: "18px",
                      background: "linear-gradient(180deg,#22D3EE,#34D399)",
                    }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
