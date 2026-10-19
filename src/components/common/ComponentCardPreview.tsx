import React, { useState } from "react";
import {
  Eye,
  Code2,
  Terminal,
  Monitor,
  Tablet,
  Smartphone,
  RotateCcw,
  Copy,
  Check,
  Zap,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import type { ComponentItem } from "../../data/componentsCatalog";
import ComponentRenderer from "./ComponentRenderer";
import CodeViewer from "./CodeViewer";

export interface ComponentCardPreviewProps {
  item: ComponentItem;
}

export const ComponentCardPreview: React.FC<ComponentCardPreviewProps> = ({
  item,
}) => {
  const [activeTab, setActiveTabState] = useState<"preview" | "code" | "usage">(
    () => {
      try {
        const saved = sessionStorage.getItem(`depth_ui_card_tab_${item.id}`);
        if (saved === "preview" || saved === "code" || saved === "usage") {
          return saved;
        }
      } catch {
        // Storage unavailable
      }
      return "preview";
    },
  );
  const [viewMode, setViewModeState] = useState<"desktop" | "tablet" | "mobile">(
    () => {
      try {
        const saved = sessionStorage.getItem(`depth_ui_card_vp_${item.id}`);
        if (saved === "desktop" || saved === "tablet" || saved === "mobile") {
          return saved;
        }
      } catch {
        // Storage unavailable
      }
      return "desktop";
    },
  );

  const setActiveTab = (tab: "preview" | "code" | "usage") => {
    setActiveTabState(tab);
    try {
      sessionStorage.setItem(`depth_ui_card_tab_${item.id}`, tab);
    } catch {
      // Storage unavailable
    }
  };

  const setViewMode = (mode: "desktop" | "tablet" | "mobile") => {
    setViewModeState(mode);
    try {
      sessionStorage.setItem(`depth_ui_card_vp_${item.id}`, mode);
    } catch {
      // Storage unavailable
    }
  };
  const [key, setKey] = useState(0);
  const [copiedCli, setCopiedCli] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedImport, setCopiedImport] = useState(false);
  const [showInlineCode, setShowInlineCode] = useState(false);
  const cardRef = React.useRef<HTMLDivElement>(null);
  const [isRendered, setIsRendered] = useState(() => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash.replace(/^#/, "");
      if (hash && hash === item.id) return true;
    }
    return false;
  });

  React.useEffect(() => {
    if (isRendered) return;
    if (!cardRef.current) return;
    const el = cardRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRendered(true);
          observer.disconnect();
        }
      },
      { rootMargin: "500px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [isRendered]);

  const handleCopyCli = () => {
    navigator.clipboard.writeText(item.cliCommand);
    setCopiedCli(true);
    setTimeout(() => setCopiedCli(false), 2000);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(item.code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const importStatement = `import { ${item.name} } from '@/components/ui/${item.name}'`;

  const handleCopyImport = () => {
    navigator.clipboard.writeText(importStatement);
    setCopiedImport(true);
    setTimeout(() => setCopiedImport(false), 2000);
  };

  const widthClasses = {
    desktop: "w-full",
    tablet: "max-w-2xl mx-auto",
    mobile: "max-w-sm mx-auto",
  }[viewMode];

  return (
    <div
      ref={cardRef}
      id={item.id}
      className="scroll-mt-36 rounded-2xl bg-[#121215] border border-zinc-800 overflow-hidden shadow-sm transition-colors hover:border-zinc-700"
    >
      {/* Component Header */}
      <div className="p-5 sm:p-6 border-b border-zinc-800/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-zinc-800 text-zinc-300 border border-zinc-700">
              {item.categoryLabel}
            </span>
            {item.badge && (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-zinc-900/90 text-zinc-300 border border-zinc-800">
                {item.badge}
              </span>
            )}
            <span className="px-2.5 py-0.5 rounded-full text-xs font-medium text-zinc-400">
              {item.difficulty}
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex flex-wrap items-center gap-2">
            <span>{item.title}</span>
            <span className="text-xs sm:text-sm font-mono text-zinc-400 font-normal">
              &lt;{item.name} /&gt;
            </span>
          </h3>
          <p className="text-sm sm:text-base text-zinc-300 leading-relaxed max-w-2xl">
            {item.subtitle}
          </p>
        </div>

        {/* Action Controls & Tab Switcher */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
          {/* CLI quick copy button */}
          <button
            onClick={handleCopyCli}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#18181b] hover:bg-zinc-800 text-xs sm:text-sm font-mono text-zinc-300 border border-zinc-800 transition-colors cursor-pointer max-w-full truncate"
            title="Click to copy CLI command"
            aria-label={`Copy CLI command: ${item.cliCommand}`}
          >
            <Terminal className="w-4 h-4 text-zinc-400 shrink-0" />
            <span className="truncate">{item.cliCommand}</span>
            {copiedCli ? (
              <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            ) : (
              <Copy className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
            )}
          </button>

          {/* Direct Copy Code Button */}
          <button
            onClick={handleCopyCode}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-xs sm:text-sm font-medium text-zinc-200 border border-zinc-800 transition-colors cursor-pointer shadow-xs"
            title="Copy component source code to clipboard"
            aria-label={`Copy source code for ${item.name}`}
          >
            {copiedCode ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="text-emerald-400 font-semibold">
                  Code Copied!
                </span>
              </>
            ) : (
              <>
                <Code2 className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                <span>Copy Code</span>
              </>
            )}
          </button>

          {/* Tab Selector */}
          <div className="flex items-center bg-[#18181b] p-1 rounded-lg border border-zinc-800">
            <button
              onClick={() => setActiveTab("preview")}
              className={`px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
                activeTab === "preview"
                  ? "bg-zinc-800 text-white font-semibold shadow-xs"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <Eye className="w-4 h-4" />
              <span>Preview</span>
            </button>
            <button
              onClick={() => setActiveTab("code")}
              className={`px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
                activeTab === "code"
                  ? "bg-zinc-800 text-white font-semibold shadow-xs"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <Code2 className="w-4 h-4" />
              <span>Full Code</span>
            </button>
            <button
              onClick={() => setActiveTab("usage")}
              className={`px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
                activeTab === "usage"
                  ? "bg-zinc-800 text-white font-semibold shadow-xs"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <Zap className="w-4 h-4" />
              <span>Usage</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Body */}
      {activeTab === "preview" && (
        <div className="p-4 sm:p-6 bg-[#09090b] relative">
          {/* Sub-toolbar for preview */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-zinc-800/60 mb-4 text-xs sm:text-sm text-zinc-400">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-zinc-500">VIEWPORT:</span>
              <div className="flex items-center gap-1 bg-[#18181b] p-0.5 rounded-lg border border-zinc-800">
                <button
                  onClick={() => setViewMode("desktop")}
                  className={`p-1.5 rounded cursor-pointer ${
                    viewMode === "desktop"
                      ? "bg-zinc-800 text-white"
                      : "text-zinc-500 hover:text-zinc-300"
                  }`}
                  title="Desktop (100%)"
                  aria-label="Desktop viewport preview (100% width)"
                >
                  <Monitor className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("tablet")}
                  className={`p-1.5 rounded cursor-pointer ${
                    viewMode === "tablet"
                      ? "bg-zinc-800 text-white"
                      : "text-zinc-500 hover:text-zinc-300"
                  }`}
                  title="Tablet (768px)"
                  aria-label="Tablet viewport preview (768px width)"
                >
                  <Tablet className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("mobile")}
                  className={`p-1.5 rounded cursor-pointer ${
                    viewMode === "mobile"
                      ? "bg-zinc-800 text-white"
                      : "text-zinc-500 hover:text-zinc-300"
                  }`}
                  title="Mobile (375px)"
                  aria-label="Mobile viewport preview (375px width)"
                >
                  <Smartphone className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-1.5 font-mono text-xs text-zinc-500">
                {item.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded bg-zinc-900 text-zinc-400 border border-zinc-800"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <button
                onClick={() => setKey((prev) => prev + 1)}
                className="p-1.5 rounded-lg text-zinc-500 hover:text-white transition-colors cursor-pointer"
                title="Restart component animation"
                aria-label="Restart component animation"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Interactive Component Stage */}
          <div
            key={key}
            className={`min-h-[340px] rounded-xl bg-[#0d0d0f] border border-zinc-800/60 flex items-center justify-center p-3 sm:p-6 transition-all duration-200 overflow-x-auto ${widthClasses}`}
          >
            {isRendered ? (
              <ComponentRenderer componentId={item.id} />
            ) : (
              <div className="flex flex-col items-center justify-center gap-2.5 py-16 text-zinc-600">
                <div className="w-5 h-5 rounded-full border-2 border-zinc-800 border-t-zinc-600 animate-spin" />
                <span className="text-xs font-mono text-zinc-600">
                  Preview in viewport...
                </span>
              </div>
            )}
          </div>

          {/* Code & Integration Bar directly beneath component stage */}
          <div className="mt-4 pt-4 border-t border-zinc-800/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs sm:text-sm">
            {/* Quick Import Snippet */}
            <div
              onClick={handleCopyImport}
              className="flex items-center justify-between gap-2 px-3 py-2 rounded-xl bg-[#121215] border border-zinc-800 hover:border-zinc-700 cursor-pointer transition-colors group max-w-full overflow-hidden"
              title="Click to copy import statement"
            >
              <code className="font-mono text-zinc-200 text-xs sm:text-[13px] truncate">
                <span className="text-violet-400">import</span> &#123;{" "}
                {item.name} &#125; <span className="text-violet-400">from</span>{" "}
                <span className="text-cyan-400">
                  '@/components/ui/{item.name}'
                </span>
              </code>
              <button
                className="text-zinc-500 group-hover:text-zinc-200 transition-colors shrink-0 ml-1"
                aria-label={`Copy import statement for ${item.name}`}
              >
                {copiedImport ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>

            {/* Toggle Inline Code View */}
            <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
              <button
                onClick={() => setShowInlineCode(!showInlineCode)}
                className={`w-full sm:w-auto justify-center flex items-center gap-1.5 px-3.5 py-2 rounded-xl border text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                  showInlineCode
                    ? "bg-white text-black border-white font-semibold shadow-sm"
                    : "bg-[#18181b] hover:bg-zinc-800 text-zinc-300 border-zinc-800"
                }`}
              >
                <Code2 className="w-4 h-4" />
                <span>{showInlineCode ? "Hide Code" : "View Code"}</span>
                {showInlineCode ? (
                  <ChevronUp className="w-3.5 h-3.5 ml-0.5" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5 ml-0.5" />
                )}
              </button>
            </div>
          </div>

          {/* Expandable Inline Code Drawer */}
          {showInlineCode && (
            <div className="mt-4 pt-2">
              <CodeViewer
                fileName={`${item.name}.tsx`}
                code={item.code}
                cliCommand={item.cliCommand}
                dependencies={item.dependencies}
              />
            </div>
          )}
        </div>
      )}

      {activeTab === "code" && (
        <div className="p-4 sm:p-6 bg-[#09090b]">
          <CodeViewer
            fileName={`${item.name}.tsx`}
            code={item.code}
            cliCommand={item.cliCommand}
            dependencies={item.dependencies}
          />
        </div>
      )}

      {activeTab === "usage" && (
        <div className="p-4 sm:p-6 bg-[#09090b] space-y-4">
          <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 text-xs sm:text-sm text-zinc-300 font-mono flex items-center gap-2.5">
            <Zap className="w-4 h-4 text-zinc-400 shrink-0" />
            <span>
              Drop this snippet straight into any React JSX or Next.js page.
            </span>
          </div>

          <CodeViewer
            fileName="UsageExample.tsx"
            code={`import { ${item.name} } from '@/components/ui/${item.name}'

export default function ExamplePage() {
  return (
    <div className="p-8 flex justify-center items-center min-h-[400px]">
      ${item.usageCode}
    </div>
  )
}`}
            cliCommand={item.cliCommand}
            dependencies={item.dependencies}
          />
        </div>
      )}
    </div>
  );
};
export default ComponentCardPreview;
