import React, { useState, useEffect, useRef } from "react";
import {
  TrendingUp,
  RotateCcw,
  DollarSign,
  Users,
  Award,
  Zap,
} from "lucide-react";

export interface NumberTickerProps {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  decimals?: number;
}

export const NumberTicker: React.FC<NumberTickerProps> = ({
  value,
  prefix = "",
  suffix = "",
  duration = 1200,
  decimals = 0,
}) => {
  const [displayValue, setDisplayValue] = useState(0);
  const displayValueRef = useRef(0);

  useEffect(() => {
    let startTime: number | null = null;
    let animationFrameId: number;

    const startVal = displayValueRef.current;
    const endVal = value;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      // Smooth ease-out cubic curve
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const current = startVal + (endVal - startVal) * easeProgress;

      setDisplayValue(current);
      displayValueRef.current = current;

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setDisplayValue(endVal);
        displayValueRef.current = endVal;
      }
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [value, duration]);

  return (
    <span className="font-mono font-bold tracking-tight inline-flex items-center">
      {prefix}
      {decimals > 0
        ? displayValue.toLocaleString(undefined, {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
          })
        : Math.round(displayValue).toLocaleString()}
      {suffix}
    </span>
  );
};

export const NumberTickerDemo: React.FC = () => {
  const [arr, setArr] = useState([
    {
      label: "Active Developers",
      value: 48920,
      suffix: "+",
      icon: Users,
      color: "text-cyan-400",
    },
    {
      label: "Total Volume Transacted",
      value: 2480500,
      prefix: "$",
      suffix: "",
      decimals: 2,
      icon: DollarSign,
      color: "text-emerald-400",
    },
    {
      label: "Uptime SLA Guarantee",
      value: 99.98,
      suffix: "%",
      decimals: 2,
      icon: Award,
      color: "text-violet-400",
    },
    {
      label: "Weekly Component Pulls",
      value: 124500,
      suffix: "/wk",
      icon: Zap,
      color: "text-amber-400",
    },
  ]);

  const randomizeValues = () => {
    setArr([
      {
        label: "Active Developers",
        value: Math.floor(Math.random() * 50000 + 30000),
        suffix: "+",
        icon: Users,
        color: "text-cyan-400",
      },
      {
        label: "Total Volume Transacted",
        value: Math.floor(Math.random() * 5000000 + 1000000),
        prefix: "$",
        suffix: "",
        decimals: 2,
        icon: DollarSign,
        color: "text-emerald-400",
      },
      {
        label: "Uptime SLA Guarantee",
        value: 99.99,
        suffix: "%",
        decimals: 2,
        icon: Award,
        color: "text-violet-400",
      },
      {
        label: "Weekly Component Pulls",
        value: Math.floor(Math.random() * 200000 + 80000),
        suffix: "/wk",
        icon: Zap,
        color: "text-amber-400",
      },
    ]);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Metrics Ticker Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {arr.map((m, idx) => {
          const Icon = m.icon;
          return (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-[#111116] border border-zinc-800/80 hover:border-zinc-700 transition-all shadow-sm flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium text-zinc-400">
                  {m.label}
                </span>
                <div
                  className={`w-7 h-7 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center ${m.color}`}
                >
                  <Icon className="w-3.5 h-3.5" />
                </div>
              </div>

              <div className={`text-2xl sm:text-3xl ${m.color}`}>
                <NumberTicker
                  value={m.value}
                  prefix={m.prefix}
                  suffix={m.suffix}
                  decimals={m.decimals || 0}
                  duration={1400}
                />
              </div>

              <div className="pt-3 mt-3 border-t border-zinc-800/80 flex items-center gap-1.5 text-[11px] text-zinc-500 font-mono">
                <TrendingUp className="w-3 h-3 text-emerald-400" />
                <span>Real-time rolling counter</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Control Strip */}
      <div className="p-4 rounded-xl bg-[#121217] border border-zinc-800 flex items-center justify-between text-xs">
        <span className="text-zinc-400">
          Trigger new values to see smooth ease-out spring interpolation:
        </span>
        <button
          onClick={randomizeValues}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-white text-black font-semibold text-xs hover:bg-zinc-200 transition-colors cursor-pointer shadow-xs active:scale-95"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Randomize &amp; Animate</span>
        </button>
      </div>
    </div>
  );
};
export default NumberTickerDemo;
