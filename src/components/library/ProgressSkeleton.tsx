import React, { useState } from "react";

export interface ProgressProps {
  value: number;
  max?: number;
  label?: string;
  showValue?: boolean;
  className?: string;
}

export const Progress: React.FC<ProgressProps> = ({
  value,
  max = 100,
  label,
  showValue = true,
  className = "",
}) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className={`space-y-1.5 w-full ${className}`}>
      {(label || showValue) && (
        <div className="flex justify-between items-center text-xs">
          {label && <span className="font-medium text-zinc-300">{label}</span>}
          {showValue && (
            <span className="font-mono text-[11px] text-zinc-400">
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      )}
      <div className="w-full h-2 rounded-full bg-zinc-800 overflow-hidden">
        <div
          className="h-full bg-white rounded-full transition-all duration-300 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export const Skeleton: React.FC<{ className?: string }> = ({
  className = "",
}) => {
  return (
    <div className={`animate-pulse bg-zinc-800/80 rounded-lg ${className}`} />
  );
};

export const ProgressSkeletonDemo: React.FC = () => {
  const [progress, setProgress] = useState(65);

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6 p-6 rounded-2xl bg-[#121215] border border-zinc-800">
      {/* Progress Bars */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">
            Interactive Progress Bar
          </span>
          <div className="flex gap-1.5">
            <button
              onClick={() => setProgress(Math.max(0, progress - 15))}
              className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-[10px] text-zinc-400 hover:text-white cursor-pointer"
            >
              -15%
            </button>
            <button
              onClick={() => setProgress(Math.min(100, progress + 15))}
              className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-[10px] text-zinc-400 hover:text-white cursor-pointer"
            >
              +15%
            </button>
          </div>
        </div>

        <Progress value={progress} label="Asset Compilation" />
        <Progress value={92} label="Edge CDN Distribution" />
      </div>

      {/* Shimmer Skeleton Placeholder */}
      <div className="space-y-3 pt-4 border-t border-zinc-800/80">
        <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">
          Skeleton Loading State (Async Fetch)
        </span>
        <div className="p-4 rounded-xl bg-[#18181b] border border-zinc-800 space-y-3">
          <div className="flex items-center gap-3">
            <Skeleton className="w-10 h-10 rounded-full" />
            <div className="space-y-1.5 flex-1">
              <Skeleton className="h-3 w-1/3" />
              <Skeleton className="h-2.5 w-1/2" />
            </div>
          </div>
          <Skeleton className="h-2.5 w-full" />
          <Skeleton className="h-2.5 w-4/5" />
        </div>
      </div>
    </div>
  );
};

export default ProgressSkeletonDemo;
