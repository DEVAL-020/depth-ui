import React, { useState } from "react";
import {
  CheckCircle2,
  AlertTriangle,
  Info,
  Copy,
  Check,
  Folder,
  FolderOpen,
  FileCode,
  FileText,
  ChevronRight,
  TrendingUp,
  Inbox,
  Send,
  Star,
} from "lucide-react";

// 1. Circular Progress Ring
export const CircularProgressRingDemo: React.FC = () => {
  const [percent, setPercent] = useState(78);
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 p-6 rounded-2xl bg-[#111116] border border-zinc-800 max-w-md mx-auto">
      <div className="relative w-24 h-24 flex items-center justify-center">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r={radius}
            className="text-zinc-800"
            strokeWidth="8"
            stroke="currentColor"
            fill="transparent"
          />
          <circle
            cx="50"
            cy="50"
            r={radius}
            className="text-cyan-400 transition-all duration-500 ease-out"
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
          />
        </svg>
        <span className="absolute text-lg font-bold text-white">
          {percent}%
        </span>
      </div>

      <div className="space-y-2 text-center sm:text-left">
        <h4 className="text-sm font-semibold text-white">Storage Capacity</h4>
        <p className="text-xs text-zinc-400">
          78.2 GB of 100 GB cloud quota used.
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => setPercent(Math.max(10, percent - 15))}
            className="px-2.5 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs text-zinc-300 cursor-pointer"
          >
            -15%
          </button>
          <button
            onClick={() => setPercent(Math.min(100, percent + 15))}
            className="px-2.5 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs text-zinc-300 cursor-pointer"
          >
            +15%
          </button>
        </div>
      </div>
    </div>
  );
};

// 2. Empty State Card
export const EmptyStateCardDemo: React.FC = () => {
  return (
    <div className="text-center p-8 rounded-2xl bg-[#111116] border border-dashed border-zinc-800 max-w-md mx-auto space-y-3">
      <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto text-zinc-400">
        <Inbox className="w-6 h-6" />
      </div>
      <div>
        <h4 className="text-sm font-bold text-white">
          No active deployments found
        </h4>
        <p className="text-xs text-zinc-400 mt-1 max-w-xs mx-auto leading-relaxed">
          Get started by importing your repository or triggering an automated
          build pipeline.
        </p>
      </div>
      <button className="px-4 py-2 rounded-xl bg-white text-black text-xs font-semibold hover:bg-zinc-200 transition-colors cursor-pointer shadow-xs">
        Connect GitHub Repo
      </button>
    </div>
  );
};

// 3. Key Value List
export const KeyValueListDemo: React.FC = () => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const items = [
    { label: "Cluster Host", value: "us-east.depthui.cloud" },
    { label: "Edge Latency", value: "14.2ms (P99)" },
    { label: "TLS Certificate", value: "ECC-384 Auto-Renew" },
    { label: "API Secret", value: "dp_live_9921_x30" },
  ];

  const handleCopy = (val: string, key: string) => {
    navigator.clipboard.writeText(val);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1500);
  };

  return (
    <div className="w-full max-w-md mx-auto p-5 rounded-2xl bg-[#111116] border border-zinc-800 space-y-3">
      <div className="text-xs font-semibold text-white">Instance Metadata</div>
      <div className="divide-y divide-zinc-800/80 text-xs">
        {items.map((it) => (
          <div
            key={it.label}
            className="py-2.5 flex items-center justify-between gap-3"
          >
            <span className="text-zinc-400">{it.label}</span>
            <div className="flex items-center gap-2">
              <span className="font-medium text-white">{it.value}</span>
              <button
                onClick={() => handleCopy(it.value, it.label)}
                className="text-zinc-500 hover:text-white cursor-pointer"
                title="Copy value"
              >
                {copiedKey === it.label ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// 4. Step Progress Tracker
export const StepProgressTrackerDemo: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(2);
  const steps = [
    "Domain Config",
    "Environment Secrets",
    "Build Validation",
    "Global CDN",
  ];

  return (
    <div className="w-full max-w-lg mx-auto p-6 rounded-2xl bg-[#111116] border border-zinc-800 space-y-5">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-white">
          Deployment Pipeline
        </span>
        <span className="text-xs text-zinc-400">
          Step {currentStep + 1} of {steps.length}
        </span>
      </div>

      <div className="flex items-center justify-between relative">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 w-full bg-zinc-800 -z-0" />
        {steps.map((st, i) => {
          const isDone = i < currentStep;
          const isCurrent = i === currentStep;
          return (
            <div
              key={st}
              className="flex flex-col items-center relative z-10 group cursor-pointer"
              onClick={() => setCurrentStep(i)}
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold transition-all ${
                  isDone
                    ? "bg-emerald-500 text-black"
                    : isCurrent
                      ? "bg-white text-black ring-4 ring-zinc-800"
                      : "bg-zinc-900 border border-zinc-700 text-zinc-400"
                }`}
              >
                {isDone ? <Check className="w-4 h-4" /> : i + 1}
              </div>
              <span
                className={`text-[10px] mt-1.5 hidden sm:block ${isCurrent ? "text-white font-medium" : "text-zinc-500"}`}
              >
                {st}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// 5. Mini Sparkline Chart
export const MiniSparklineChartDemo: React.FC = () => {
  const points = [22, 34, 28, 45, 42, 60, 58, 72, 80];
  const max = Math.max(...points);
  const min = Math.min(...points);
  const width = 240;
  const height = 48;

  const path = points
    .map((val, idx) => {
      const x = (idx / (points.length - 1)) * width;
      const y = height - ((val - min) / (max - min)) * (height - 8) - 4;
      return `${idx === 0 ? "M" : "L"} ${x} ${y}`;
    })
    .join(" ");

  return (
    <div className="p-5 rounded-2xl bg-[#111116] border border-zinc-800 max-w-sm mx-auto space-y-3">
      <div className="flex items-center justify-between text-xs">
        <span className="text-zinc-400">Throughput Requests</span>
        <span className="text-emerald-400 font-semibold flex items-center gap-1">
          <TrendingUp className="w-3.5 h-3.5" /> +28.4%
        </span>
      </div>

      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-bold text-white tracking-tight">
          2.4M
        </span>
        <span className="text-xs text-zinc-400">events / sec</span>
      </div>

      <svg width={width} height={height} className="w-full overflow-visible">
        <path
          d={path}
          fill="none"
          stroke="#06b6d4"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};

// 6. Alert Banner Stack
export const AlertBannerStackDemo: React.FC = () => {
  return (
    <div className="w-full max-w-md mx-auto space-y-2">
      <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2.5">
        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
        <span className="flex-1">
          Build succeeded! All 48 integration tests passed.
        </span>
      </div>
      <div className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-500/30 text-amber-300 text-xs flex items-center gap-2.5">
        <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
        <span className="flex-1">
          Rate limit advisory: API usage reached 84% of quota.
        </span>
      </div>
      <div className="p-3.5 rounded-xl bg-cyan-950/30 border border-cyan-500/30 text-cyan-300 text-xs flex items-center gap-2.5">
        <Info className="w-4 h-4 text-cyan-400 shrink-0" />
        <span className="flex-1">
          New region added: Tokyo ap-northeast-1 now available.
        </span>
      </div>
    </div>
  );
};

// 7. Status Badge Matrix
export const StatusBadgeMatrixDemo: React.FC = () => {
  const statuses = [
    {
      label: "Operational",
      dot: "bg-emerald-400",
      badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    },
    {
      label: "Degraded",
      dot: "bg-amber-400",
      badge: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    },
    {
      label: "Major Outage",
      dot: "bg-rose-400",
      badge: "bg-rose-500/10 text-rose-400 border-rose-500/20",
    },
    {
      label: "Maintenance",
      dot: "bg-blue-400",
      badge: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    },
  ];

  return (
    <div className="p-5 rounded-2xl bg-[#111116] border border-zinc-800 max-w-md mx-auto space-y-3">
      <div className="text-xs font-semibold text-white">
        System Status Indicators
      </div>
      <div className="grid grid-cols-2 gap-2">
        {statuses.map((st) => (
          <div
            key={st.label}
            className={`px-3 py-2 rounded-xl border text-xs font-medium flex items-center gap-2 ${st.badge}`}
          >
            <span className={`w-2 h-2 rounded-full ${st.dot} animate-pulse`} />
            <span>{st.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// 8. File Tree View
export const FileTreeViewDemo: React.FC = () => {
  const [open, setOpen] = useState(true);

  return (
    <div className="w-full max-w-sm mx-auto p-4 rounded-2xl bg-[#111116] border border-zinc-800 space-y-1 text-xs">
      <div
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:bg-zinc-800 text-zinc-200 cursor-pointer font-medium"
      >
        <ChevronRight
          className={`w-3.5 h-3.5 transition-transform ${open ? "rotate-90" : ""}`}
        />
        {open ? (
          <FolderOpen className="w-4 h-4 text-cyan-400" />
        ) : (
          <Folder className="w-4 h-4 text-cyan-400" />
        )}
        <span>src/components</span>
      </div>

      {open && (
        <div className="pl-6 space-y-0.5 border-l border-zinc-800 ml-4">
          <div className="flex items-center gap-2 px-2.5 py-1 rounded-lg hover:bg-zinc-800/80 text-zinc-400 hover:text-white cursor-pointer">
            <FileCode className="w-3.5 h-3.5 text-violet-400" />
            <span>ButtonSuite.tsx</span>
          </div>
          <div className="flex items-center gap-2 px-2.5 py-1 rounded-lg hover:bg-zinc-800/80 text-zinc-400 hover:text-white cursor-pointer">
            <FileCode className="w-3.5 h-3.5 text-emerald-400" />
            <span>Interactive3DCube.tsx</span>
          </div>
          <div className="flex items-center gap-2 px-2.5 py-1 rounded-lg hover:bg-zinc-800/80 text-zinc-400 hover:text-white cursor-pointer">
            <FileText className="w-3.5 h-3.5 text-amber-400" />
            <span>README.md</span>
          </div>
        </div>
      )}
    </div>
  );
};

// 9. User Feedback Modal
export const UserFeedbackModalDemo: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [feedback, setFeedback] = useState("");

  return (
    <div className="w-full max-w-sm mx-auto p-5 rounded-2xl bg-[#111116] border border-zinc-800 space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-semibold text-white">Send us feedback</h4>
        <div className="flex text-amber-400">
          <Star className="w-3.5 h-3.5 fill-current" />
          <Star className="w-3.5 h-3.5 fill-current" />
          <Star className="w-3.5 h-3.5 fill-current" />
          <Star className="w-3.5 h-3.5 fill-current" />
          <Star className="w-3.5 h-3.5 fill-current" />
        </div>
      </div>

      {submitted ? (
        <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs text-center">
          Feedback received! Thank you for helping us improve.
        </div>
      ) : (
        <>
          <textarea
            rows={2}
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="What should we build next? Any bugs?"
            className="w-full p-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white focus:outline-none focus:border-zinc-600 resize-none"
          />
          <button
            onClick={() => setSubmitted(true)}
            className="w-full py-2 rounded-xl bg-white text-black text-xs font-semibold hover:bg-zinc-200 transition-colors cursor-pointer flex items-center justify-center gap-1.5"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Submit Feedback</span>
          </button>
        </>
      )}
    </div>
  );
};
