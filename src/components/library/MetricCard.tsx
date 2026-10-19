import React from "react";
import {
  ArrowUpRight,
  ArrowDownRight,
  Users,
  CreditCard,
  Activity,
} from "lucide-react";

export interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down" | "neutral";
  subtext: string;
  icon?: React.ReactNode;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  change,
  trend,
  subtext,
  icon,
}) => {
  return (
    <div className="rounded-2xl bg-[#121215] border border-zinc-800 p-5 space-y-3 hover:border-zinc-700 transition-colors shadow-xs">
      <div className="flex items-center justify-between text-zinc-400">
        <span className="text-xs font-medium">{title}</span>
        {icon && <div className="text-zinc-500">{icon}</div>}
      </div>

      <div className="space-y-1">
        <div className="text-2xl font-bold tracking-tight text-white font-mono">
          {value}
        </div>
        <div className="flex items-center gap-2">
          <span
            className={`inline-flex items-center text-[11px] font-semibold px-1.5 py-0.2 rounded-full ${
              trend === "up"
                ? "text-emerald-400 bg-emerald-950/60"
                : trend === "down"
                  ? "text-rose-400 bg-rose-950/60"
                  : "text-zinc-400 bg-zinc-800"
            }`}
          >
            {trend === "up" ? (
              <ArrowUpRight className="w-3 h-3 mr-0.5" />
            ) : trend === "down" ? (
              <ArrowDownRight className="w-3 h-3 mr-0.5" />
            ) : null}
            {change}
          </span>
          <span className="text-[11px] text-zinc-500 truncate">{subtext}</span>
        </div>
      </div>
    </div>
  );
};

export const MetricCardDemo: React.FC = () => {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-4 p-6 rounded-2xl bg-[#121215] border border-zinc-800">
      <div className="space-y-1">
        <h3 className="text-sm font-semibold text-white">
          KPI & Metric Stat Cards
        </h3>
        <p className="text-xs text-zinc-500">
          Essential dashboard cards showing metrics, trends, and change
          indicators.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
        <MetricCard
          title="Total Invoiced Volume"
          value="$128,430.00"
          change="+14.2%"
          trend="up"
          subtext="vs last 30 days"
          icon={<CreditCard className="w-4 h-4" />}
        />
        <MetricCard
          title="Active Monthly Users"
          value="48,290"
          change="+8.6%"
          trend="up"
          subtext="vs last 30 days"
          icon={<Users className="w-4 h-4" />}
        />
        <MetricCard
          title="Avg. API Latency"
          value="42ms"
          change="-18.4%"
          trend="up"
          subtext="improved response"
          icon={<Activity className="w-4 h-4" />}
        />
      </div>
    </div>
  );
};

export default MetricCardDemo;
