import React, { useState, useEffect } from "react";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Heart,
  X,
  PartyPopper,
  Quote,
  Star,
  Maximize2,
  Minimize2,
  CheckCircle,
} from "lucide-react";

// 1. Swipeable Stack Cards
export const SwipeableStackCardsDemo: React.FC = () => {
  const [index, setIndex] = useState(0);
  const items = [
    {
      title: "Linear Design System",
      tag: "SaaS",
      color: "from-violet-600 to-indigo-600",
    },
    {
      title: "Vercel Edge Pipelines",
      tag: "Cloud",
      color: "from-cyan-500 to-blue-600",
    },
    {
      title: "Stripe Global Checkout",
      tag: "Payments",
      color: "from-emerald-500 to-teal-600",
    },
  ];

  const nextCard = () => {
    setIndex((prev) => (prev + 1) % items.length);
  };

  const current = items[index];

  return (
    <div className="w-full max-w-xs mx-auto text-center space-y-4">
      <div
        className={`p-6 rounded-3xl bg-gradient-to-br ${current.color} text-white shadow-2xl space-y-4 transition-all duration-300 min-h-[170px] flex flex-col justify-between`}
      >
        <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-black/20 self-start">
          {current.tag}
        </span>
        <h4 className="text-lg font-bold text-left">{current.title}</h4>
        <div className="text-[11px] text-white/80 text-left">
          Card {index + 1} of {items.length}
        </div>
      </div>

      <div className="flex justify-center gap-3">
        <button
          onClick={nextCard}
          className="p-3 rounded-full bg-zinc-900 border border-zinc-800 text-rose-400 hover:scale-110 transition-transform cursor-pointer"
          title="Pass"
        >
          <X className="w-5 h-5" />
        </button>
        <button
          onClick={nextCard}
          className="p-3 rounded-full bg-zinc-900 border border-zinc-800 text-emerald-400 hover:scale-110 transition-transform cursor-pointer"
          title="Like"
        >
          <Heart className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

// 2. Expandable Bento Card
export const ExpandableBentoCardDemo: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="w-full max-w-sm mx-auto p-5 rounded-3xl bg-[#111116] border border-zinc-800 transition-all duration-300 space-y-3">
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <span className="text-[11px] font-semibold text-cyan-400">
            Interactive Bento
          </span>
          <h4 className="text-base font-bold text-white">
            Edge Replication Engine
          </h4>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white cursor-pointer"
        >
          {isExpanded ? (
            <Minimize2 className="w-4 h-4" />
          ) : (
            <Maximize2 className="w-4 h-4" />
          )}
        </button>
      </div>

      <p className="text-xs text-zinc-400 leading-relaxed">
        Automatic data synchronization across 32 worldwide points of presence.
      </p>

      {isExpanded && (
        <div className="pt-3 border-t border-zinc-800 text-xs text-zinc-300 space-y-2 animate-in fade-in duration-200">
          <div className="flex justify-between text-[11px] text-zinc-400">
            <span>Cache hit ratio:</span>
            <span className="text-emerald-400 font-semibold">99.4%</span>
          </div>
          <div className="flex justify-between text-[11px] text-zinc-400">
            <span>Median TTFB:</span>
            <span className="text-white font-semibold">8.2ms</span>
          </div>
        </div>
      )}
    </div>
  );
};

// 3. Staggered Reveal List
export const StaggeredRevealListDemo: React.FC = () => {
  const [show, setShow] = useState(true);
  const items = [
    "Automated CSS variable injection",
    "Hardware acceleration with translate3d",
    "Full keyboard accessibility (WAI-ARIA)",
    "Zero external runtime dependencies",
  ];

  return (
    <div className="w-full max-w-sm mx-auto p-5 rounded-2xl bg-[#111116] border border-zinc-800 space-y-3">
      <div className="flex justify-between items-center text-xs">
        <span className="font-semibold text-white">Key Features</span>
        <button
          onClick={() => {
            setShow(false);
            setTimeout(() => setShow(true), 150);
          }}
          className="text-zinc-400 hover:text-white underline cursor-pointer"
        >
          Replay
        </button>
      </div>

      <div className="space-y-2">
        {show &&
          items.map((it, idx) => (
            <div
              key={it}
              style={{ animationDelay: `${idx * 80}ms` }}
              className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-200 flex items-center gap-2.5 animate-in fade-in slide-in-from-left-2 duration-300"
            >
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{it}</span>
            </div>
          ))}
      </div>
    </div>
  );
};

// 4. Shimmer Skeleton Card
export const ShimmerSkeletonCardDemo: React.FC = () => {
  return (
    <div className="w-full max-w-sm mx-auto p-5 rounded-2xl bg-[#111116] border border-zinc-800 space-y-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-zinc-800 animate-pulse" />
        <div className="space-y-1.5 flex-1">
          <div className="h-3 w-3/4 bg-zinc-800 rounded animate-pulse" />
          <div className="h-2.5 w-1/2 bg-zinc-800/60 rounded animate-pulse" />
        </div>
      </div>
      <div className="h-24 w-full bg-zinc-800/70 rounded-xl animate-pulse" />
      <div className="h-3 w-5/6 bg-zinc-800/80 rounded animate-pulse" />
    </div>
  );
};

// 5. Typewriter Headline
const TYPEWRITER_WORDS = [
  "Next.js apps",
  "Landing pages",
  "SaaS dashboards",
  "Design systems",
];

export const TypewriterHeadlineDemo: React.FC = () => {
  const [wordIdx, setWordIdx] = useState(0);
  const [subIdx, setSubIdx] = useState(0);
  const [reverse, setReverse] = useState(false);

  useEffect(() => {
    if (subIdx === TYPEWRITER_WORDS[wordIdx].length + 1 && !reverse) {
      const timeout = setTimeout(() => setReverse(true), 1200);
      return () => clearTimeout(timeout);
    }

    if (subIdx === 0 && reverse) {
      const timeout = setTimeout(() => {
        setReverse(false);
        setWordIdx((prev) => (prev + 1) % TYPEWRITER_WORDS.length);
      }, 250);
      return () => clearTimeout(timeout);
    }

    const timeout = setTimeout(
      () => {
        setSubIdx((prev) => prev + (reverse ? -1 : 1));
      },
      reverse ? 40 : 90,
    );

    return () => clearTimeout(timeout);
  }, [subIdx, reverse, wordIdx]);

  return (
    <div className="w-full max-w-md mx-auto p-6 rounded-2xl bg-[#111116] border border-zinc-800 text-center space-y-2">
      <span className="text-xs font-medium text-zinc-400">
        Build faster for
      </span>
      <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight min-h-[36px] flex items-center justify-center">
        <span>{TYPEWRITER_WORDS[wordIdx].substring(0, subIdx)}</span>
        <span className="inline-block w-0.5 h-6 bg-cyan-400 ml-1 animate-pulse" />
      </h3>
    </div>
  );
};

// 6. Scroll Progress Indicator
export const ScrollProgressIndicatorDemo: React.FC = () => {
  const [scrollVal, setScrollVal] = useState(64);

  return (
    <div className="w-full max-w-sm mx-auto p-5 rounded-2xl bg-[#111116] border border-zinc-800 space-y-3">
      <div className="flex justify-between items-center text-xs">
        <span className="font-semibold text-white">Reading Progress</span>
        <span className="text-cyan-400 font-bold">{scrollVal}%</span>
      </div>

      <div className="h-2 w-full bg-zinc-950 rounded-full overflow-hidden border border-zinc-800">
        <div
          style={{ width: `${scrollVal}%` }}
          className="h-full bg-gradient-to-r from-violet-500 to-cyan-400 rounded-full transition-all duration-300"
        />
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => setScrollVal(Math.max(10, scrollVal - 20))}
          className="flex-1 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs text-zinc-300 cursor-pointer"
        >
          Scroll Up
        </button>
        <button
          onClick={() => setScrollVal(Math.min(100, scrollVal + 20))}
          className="flex-1 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs text-zinc-300 cursor-pointer"
        >
          Scroll Down
        </button>
      </div>
    </div>
  );
};

// 7. Smooth Accordion FAQ
export const SmoothAccordionFaqDemo: React.FC = () => {
  const [openId, setOpenId] = useState<number | null>(0);
  const faqs = [
    {
      q: "Is Depth UI fully accessible?",
      a: "Yes, all components strictly adhere to WAI-ARIA standards with full keyboard navigation.",
    },
    {
      q: "Can I use this with Tailwind v4?",
      a: "Yes, Depth UI works out of the box with modern Tailwind CSS and standard React setups.",
    },
  ];

  return (
    <div className="w-full max-w-md mx-auto space-y-2">
      {faqs.map((f, i) => {
        const isOpen = openId === i;
        return (
          <div
            key={i}
            className={`p-4 rounded-xl border transition-all cursor-pointer ${
              isOpen
                ? "bg-[#15151b] border-zinc-700 shadow-md"
                : "bg-[#111116] border-zinc-800"
            }`}
            onClick={() => setOpenId(isOpen ? null : i)}
          >
            <div className="flex justify-between items-center text-xs font-semibold text-white">
              <span>{f.q}</span>
              <ChevronDown
                className={`w-4 h-4 text-zinc-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
              />
            </div>
            {isOpen && (
              <p className="text-xs text-zinc-400 mt-2 leading-relaxed animate-in fade-in duration-150">
                {f.a}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
};

// 8. Floating Testimonial Carousel
export const FloatingTestimonialCarouselDemo: React.FC = () => {
  const [idx, setIdx] = useState(0);
  const testimonials = [
    {
      quote:
        "Depth UI cut our frontend development cycle in half. Exceptional quality.",
      author: "Alex Rivera",
      role: "CTO @ Starlight",
    },
    {
      quote: "The smoothest 3D and micro-interaction library I have ever used.",
      author: "Chloe Bennett",
      role: "Staff Frontend Engineer",
    },
  ];

  const cur = testimonials[idx];

  return (
    <div className="w-full max-w-md mx-auto p-6 rounded-2xl bg-[#111116] border border-zinc-800 space-y-4">
      <div className="flex justify-between items-center">
        <Quote className="w-6 h-6 text-violet-400" />
        <div className="flex text-amber-400">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-3.5 h-3.5 fill-current" />
          ))}
        </div>
      </div>

      <p className="text-xs text-zinc-300 italic leading-relaxed">
        &ldquo;{cur.quote}&rdquo;
      </p>

      <div className="flex justify-between items-center pt-2 border-t border-zinc-800">
        <div>
          <div className="text-xs font-bold text-white">{cur.author}</div>
          <div className="text-[11px] text-zinc-400">{cur.role}</div>
        </div>
        <div className="flex gap-1">
          <button
            onClick={() =>
              setIdx((prev) =>
                prev === 0 ? testimonials.length - 1 : prev - 1,
              )
            }
            className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 cursor-pointer"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setIdx((prev) => (prev + 1) % testimonials.length)}
            className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 cursor-pointer"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

// 9. Confetti Celebration
export const ConfettiCelebrationDemo: React.FC = () => {
  const [active, setActive] = useState(false);

  const trigger = () => {
    setActive(true);
    setTimeout(() => setActive(false), 2200);
  };

  return (
    <div className="w-full max-w-sm mx-auto p-6 rounded-2xl bg-[#111116] border border-zinc-800 text-center space-y-4">
      <h4 className="text-sm font-semibold text-white">Milestone Achieved!</h4>
      <p className="text-xs text-zinc-400">
        100+ components reached in Depth UI
      </p>

      {active && (
        <div className="flex justify-center gap-1.5 animate-bounce">
          <span className="w-2.5 h-2.5 rounded-full bg-violet-400" />
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
          <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
        </div>
      )}

      <button
        onClick={trigger}
        className="px-4 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white text-xs font-semibold hover:from-violet-500 hover:to-cyan-400 transition-all cursor-pointer shadow-md flex items-center justify-center gap-2 mx-auto"
      >
        <PartyPopper className="w-4 h-4" />
        <span>Celebrate Launch</span>
      </button>
    </div>
  );
};
