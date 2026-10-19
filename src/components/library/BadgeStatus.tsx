import React, { useState } from "react";
import { X } from "lucide-react";

export interface BadgeProps {
  children: React.ReactNode;
  variant?:
    | "default"
    | "primary"
    | "outline"
    | "success"
    | "warning"
    | "destructive"
    | "info";
  size?: "sm" | "default";
  onRemove?: () => void;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "default",
  size = "default",
  onRemove,
  className = "",
}) => {
  const variants = {
    default: "bg-zinc-800 text-zinc-300 border border-zinc-700/60",
    primary: "bg-white text-black font-semibold",
    outline: "bg-transparent text-zinc-300 border border-zinc-800",
    success: "bg-emerald-950/60 text-emerald-400 border border-emerald-900/60",
    warning: "bg-amber-950/60 text-amber-400 border border-amber-900/60",
    destructive: "bg-rose-950/60 text-rose-400 border border-rose-900/60",
    info: "bg-sky-950/60 text-sky-400 border border-sky-900/60",
  };

  const sizes = {
    sm: "text-[10px] px-1.5 py-0.2",
    default: "text-[11px] px-2.5 py-0.5",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-medium rounded-full transition-colors ${
        variants[variant]
      } ${sizes[size]} ${className}`}
    >
      <span>{children}</span>
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="hover:opacity-75 cursor-pointer ml-0.5"
        >
          <X className="w-2.5 h-2.5" />
        </button>
      )}
    </span>
  );
};

export interface StatusDotProps {
  status: "online" | "degraded" | "offline" | "busy";
  label?: string;
}

export const StatusDot: React.FC<StatusDotProps> = ({ status, label }) => {
  const configs = {
    online: {
      dot: "bg-emerald-500",
      ping: "bg-emerald-400",
      text: "text-zinc-300",
      defLabel: "Operational",
    },
    degraded: {
      dot: "bg-amber-500",
      ping: "bg-amber-400",
      text: "text-zinc-300",
      defLabel: "Degraded",
    },
    offline: {
      dot: "bg-rose-500",
      ping: "bg-rose-400",
      text: "text-zinc-300",
      defLabel: "Incident",
    },
    busy: {
      dot: "bg-sky-500",
      ping: "bg-sky-400",
      text: "text-zinc-300",
      defLabel: "Syncing",
    },
  };

  const config = configs[status];

  return (
    <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#18181b] border border-zinc-800">
      <span className="relative flex h-2 w-2">
        <span
          className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${config.ping}`}
        />
        <span
          className={`relative inline-flex rounded-full h-2 w-2 ${config.dot}`}
        />
      </span>
      <span className={`text-[11px] font-medium ${config.text}`}>
        {label || config.defLabel}
      </span>
    </div>
  );
};

export const BadgeStatusDemo: React.FC = () => {
  const [tags, setTags] = useState([
    "Frontend",
    "Design System",
    "Accessibility",
    "Zero Lock-in",
  ]);

  const handleRemove = (tagToRemove: string) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6 p-6 rounded-2xl bg-[#121215] border border-zinc-800">
      {/* Badge Variants */}
      <div className="space-y-2">
        <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">
          Badge Variants
        </span>
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="primary">Primary</Badge>
          <Badge variant="default">Default</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="success">Completed</Badge>
          <Badge variant="warning">In Review</Badge>
          <Badge variant="destructive">Deprecated</Badge>
          <Badge variant="info">Beta v2.4</Badge>
        </div>
      </div>

      {/* Real-time Status Dots */}
      <div className="space-y-2 pt-3 border-t border-zinc-800/80">
        <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">
          Live System Status
        </span>
        <div className="flex flex-wrap items-center gap-3">
          <StatusDot status="online" label="All Systems Operational" />
          <StatusDot status="busy" label="Background Sync Active" />
          <StatusDot status="degraded" label="Elevated Latency" />
          <StatusDot status="offline" label="Core API Downtime" />
        </div>
      </div>

      {/* Removable Tags */}
      <div className="space-y-2 pt-3 border-t border-zinc-800/80">
        <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">
          Dismissible Tag Pills
        </span>
        <div className="flex flex-wrap items-center gap-2">
          {tags.map((tag) => (
            <Badge
              key={tag}
              variant="default"
              onRemove={() => handleRemove(tag)}
            >
              {tag}
            </Badge>
          ))}
          {tags.length === 0 && (
            <button
              onClick={() =>
                setTags([
                  "Frontend",
                  "Design System",
                  "Accessibility",
                  "Zero Lock-in",
                ])
              }
              className="text-xs text-zinc-400 hover:text-white underline cursor-pointer"
            >
              Reset tags
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BadgeStatusDemo;
