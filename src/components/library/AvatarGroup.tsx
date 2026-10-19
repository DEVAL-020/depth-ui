import React, { useState } from "react";
import { CheckCircle2, Users } from "lucide-react";

export interface AvatarProps {
  src?: string;
  alt?: string;
  fallback: string;
  name?: string;
  role?: string;
  size?: "sm" | "default" | "lg" | "xl";
  status?: "online" | "busy" | "away" | "offline";
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = "Avatar",
  fallback,
  name,
  role,
  size = "default",
  status,
  className = "",
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const sizes = {
    sm: "w-7 h-7 text-[11px]",
    default: "w-9 h-9 text-xs",
    lg: "w-11 h-11 text-sm",
    xl: "w-14 h-14 text-base font-semibold",
  };

  const dotSizes = {
    sm: "w-2 h-2 ring-1",
    default: "w-2.5 h-2.5 ring-2",
    lg: "w-3 h-3 ring-2",
    xl: "w-3.5 h-3.5 ring-2",
  };

  const statusColors = {
    online: "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]",
    busy: "bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.6)]",
    away: "bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.6)]",
    offline: "bg-zinc-500",
  };

  return (
    <div
      className={`relative inline-block shrink-0 cursor-pointer ${className}`}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <div
        className={`${sizes[size]} rounded-full overflow-hidden bg-zinc-800 border border-zinc-700/80 flex items-center justify-center font-medium text-zinc-200 select-none shadow-sm transition-transform duration-200 hover:scale-110 hover:z-20`}
      >
        {src ? (
          <img
            src={src}
            alt={alt}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="font-semibold text-zinc-300">{fallback}</span>
        )}
      </div>

      {status && (
        <span
          className={`absolute bottom-0 right-0 rounded-full ring-zinc-950 ${
            dotSizes[size]
          } ${statusColors[status]}`}
        />
      )}

      {/* Floating Tooltip Card */}
      {showTooltip && name && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-44 p-2.5 rounded-xl bg-zinc-900 border border-zinc-700/90 shadow-2xl z-30 pointer-events-none animate-in fade-in zoom-in-95 duration-150">
          <div className="flex items-center gap-1.5 font-semibold text-xs text-white">
            <span>{name}</span>
            {status === "online" && (
              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            )}
          </div>
          {role && <p className="text-[11px] text-zinc-400 mt-0.5">{role}</p>}
          <div className="flex items-center gap-1.5 mt-1.5 text-[10px] font-mono text-zinc-500">
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                status ? statusColors[status].split(" ")[0] : "bg-zinc-500"
              }`}
            />
            <span className="capitalize">{status || "Available"}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export interface AvatarGroupProps {
  children: React.ReactNode;
  max?: number;
  totalCount?: number;
}

export const AvatarGroup: React.FC<AvatarGroupProps> = ({
  children,
  max = 4,
  totalCount,
}) => {
  const childArray = React.Children.toArray(children);
  const visibleAvatars = childArray.slice(0, max);
  const extraCount = totalCount
    ? totalCount - max
    : Math.max(0, childArray.length - max);

  return (
    <div className="flex items-center -space-x-2.5 overflow-visible">
      {visibleAvatars.map((child, idx) => (
        <div
          key={idx}
          className="ring-2 ring-zinc-950 rounded-full transition-transform hover:z-20"
        >
          {child}
        </div>
      ))}
      {extraCount > 0 && (
        <div className="w-9 h-9 rounded-full bg-zinc-800 border border-zinc-700 ring-2 ring-zinc-950 flex items-center justify-center text-xs font-mono font-medium text-cyan-400 cursor-pointer hover:bg-zinc-700 transition-colors">
          +{extraCount}
        </div>
      )}
    </div>
  );
};

export const AvatarGroupDemo: React.FC = () => {
  const [viewMode, setViewMode] = useState<"stack" | "grid">("stack");

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6 p-6 rounded-2xl bg-[#121215] border border-zinc-800/80 shadow-2xl">
      {/* View Toggle */}
      <div className="flex items-center justify-between text-xs">
        <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider font-semibold">
          Interactive Team Avatars
        </span>
        <div className="flex items-center gap-1 bg-zinc-900 border border-zinc-800 p-1 rounded-xl">
          <button
            onClick={() => setViewMode("stack")}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
              viewMode === "stack"
                ? "bg-zinc-800 text-white"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            Stacked
          </button>
          <button
            onClick={() => setViewMode("grid")}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
              viewMode === "grid"
                ? "bg-zinc-800 text-white"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            Expanded Grid
          </button>
        </div>
      </div>

      {/* Main Avatar Group Preview */}
      {viewMode === "stack" ? (
        <div className="p-5 rounded-xl bg-zinc-900/60 border border-zinc-800/80 flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-violet-400" />
              <h4 className="text-sm font-semibold text-white">
                Active Reviewers
              </h4>
            </div>
            <p className="text-xs text-zinc-400">
              Hover over any avatar to preview member details & status.
            </p>
          </div>

          <AvatarGroup max={4} totalCount={18}>
            <Avatar
              src="/images/avatar-1.jpg"
              name="Elena Rostova"
              role="Staff Architect"
              fallback="ER"
              status="online"
            />
            <Avatar
              fallback="SC"
              name="Sarah Chen"
              role="Lead Designer"
              status="online"
            />
            <Avatar
              fallback="AR"
              name="Alex Rivera"
              role="Design Technologist"
              status="busy"
            />
            <Avatar
              fallback="MC"
              name="Marcus Cole"
              role="Full-Stack Dev"
              status="away"
            />
            <Avatar
              fallback="LV"
              name="Lisa Vance"
              role="Product Manager"
              status="offline"
            />
          </AvatarGroup>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            {
              src: "/images/avatar-1.jpg",
              name: "Elena Rostova",
              role: "Staff Architect",
              fallback: "ER",
              status: "online" as const,
            },
            {
              src: undefined,
              name: "Sarah Chen",
              role: "Lead Designer",
              fallback: "SC",
              status: "online" as const,
            },
            {
              src: undefined,
              name: "Alex Rivera",
              role: "Design Technologist",
              fallback: "AR",
              status: "busy" as const,
            },
            {
              src: undefined,
              name: "Marcus Cole",
              role: "Full-Stack Dev",
              fallback: "MC",
              status: "away" as const,
            },
          ].map((user, i) => (
            <div
              key={i}
              className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800 flex flex-col items-center text-center space-y-2 hover:border-zinc-700 transition-colors"
            >
              <Avatar
                size="lg"
                src={user.src}
                fallback={user.fallback}
                status={user.status}
              />
              <div>
                <p className="text-xs font-semibold text-white">{user.name}</p>
                <p className="text-[11px] text-zinc-400">{user.role}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Avatar Sizes Scale */}
      <div className="space-y-2 pt-2 border-t border-zinc-800/80">
        <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">
          Size Scale (sm, default, lg, xl)
        </span>
        <div className="flex items-center gap-4">
          <Avatar size="sm" fallback="SM" status="online" />
          <Avatar size="default" fallback="MD" status="busy" />
          <Avatar size="lg" fallback="LG" status="away" />
          <Avatar
            size="xl"
            src="/images/avatar-1.jpg"
            fallback="XL"
            status="online"
          />
        </div>
      </div>
    </div>
  );
};

export default AvatarGroupDemo;
