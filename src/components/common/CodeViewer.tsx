import React, { useState } from "react";
import { Copy, Check, Terminal, FileCode, CheckCircle2 } from "lucide-react";

export interface CodeViewerProps {
  fileName?: string;
  code: string;
  language?: string;
  cliCommand?: string;
  dependencies?: string[];
}

export const CodeViewer: React.FC<CodeViewerProps> = ({
  fileName = "Component.tsx",
  code,
  language = "tsx",
  cliCommand,
  dependencies,
}) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"code" | "cli" | "deps">("code");

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = code.trim().split("\n");

  return (
    <div className="rounded-xl border border-zinc-800 bg-[#121215] overflow-hidden shadow-sm">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 px-4 py-2.5 bg-[#18181b] border-b border-zinc-800">
        <div className="flex items-center gap-3">
          {/* Subtle Dots */}
          <div className="hidden sm:flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-zinc-700 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-zinc-700 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-zinc-700 inline-block" />
          </div>

          <div className="hidden sm:block h-4 w-[1px] bg-zinc-800 mx-1" />

          {/* Tabs */}
          <div className="flex items-center gap-1 bg-zinc-900 p-0.5 rounded-lg border border-zinc-800">
            <button
              onClick={() => setActiveTab("code")}
              className={`px-3 py-1.5 rounded-md text-xs sm:text-sm font-mono transition-colors flex items-center gap-1.5 cursor-pointer ${
                activeTab === "code"
                  ? "bg-zinc-800 text-white font-medium"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <FileCode className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate max-w-[110px] sm:max-w-none">
                {fileName}
              </span>
              <span className="text-[11px] text-zinc-500 uppercase font-mono shrink-0">
                {language}
              </span>
            </button>

            {cliCommand && (
              <button
                onClick={() => setActiveTab("cli")}
                className={`px-3 py-1.5 rounded-md text-xs sm:text-sm font-mono transition-colors flex items-center gap-1.5 cursor-pointer shrink-0 ${
                  activeTab === "cli"
                    ? "bg-zinc-800 text-white font-medium"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>CLI</span>
              </button>
            )}

            {dependencies && dependencies.length > 0 && (
              <button
                onClick={() => setActiveTab("deps")}
                className={`px-3 py-1.5 rounded-md text-xs sm:text-sm font-mono transition-colors flex items-center gap-1.5 cursor-pointer shrink-0 ${
                  activeTab === "deps"
                    ? "bg-zinc-800 text-white font-medium"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <span>Deps ({dependencies.length})</span>
              </button>
            )}
          </div>
        </div>

        {/* Copy Button */}
        <button
          onClick={() => {
            if (activeTab === "code") handleCopy(code);
            else if (activeTab === "cli" && cliCommand) handleCopy(cliCommand);
            else if (activeTab === "deps" && dependencies)
              handleCopy(`npm install ${dependencies.join(" ")}`);
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-xs sm:text-sm text-zinc-200 font-medium border border-zinc-800 transition-colors cursor-pointer shadow-xs shrink-0"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-zinc-400" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Content Area */}
      <div className="p-4 sm:p-5 overflow-x-auto max-h-[480px] font-mono text-xs sm:text-[13.5px] leading-relaxed text-zinc-200 bg-[#0d0d0f]">
        {activeTab === "code" && (
          <div className="space-y-0.5">
            {lines.map((line, idx) => {
              const isImport =
                line.startsWith("import ") || line.startsWith("export ");
              const isConst =
                line.includes("const ") ||
                line.includes("function ") ||
                line.includes("interface ");
              const isComment =
                line.trim().startsWith("//") || line.trim().startsWith("/*");

              return (
                <div
                  key={idx}
                  className="table-row group hover:bg-zinc-900/60 px-2 rounded"
                >
                  <span className="table-cell select-none pr-4 text-right text-zinc-500 font-mono text-xs group-hover:text-zinc-400">
                    {idx + 1}
                  </span>
                  <span
                    className={`table-cell whitespace-pre ${
                      isComment
                        ? "text-zinc-500 italic"
                        : isImport
                          ? "text-zinc-300 font-semibold"
                          : isConst
                            ? "text-zinc-100 font-medium"
                            : "text-zinc-400"
                    }`}
                  >
                    {line || " "}
                  </span>
                </div>
              );
            })}
          </div>
        )}

        {activeTab === "cli" && cliCommand && (
          <div className="py-4 px-2 space-y-2">
            <p className="text-zinc-300 text-sm">
              Run this command in your React / Next.js project:
            </p>
            <div className="flex flex-wrap items-center justify-between gap-2 p-3 sm:p-4 rounded-xl bg-black border border-zinc-800 text-zinc-200 font-mono text-xs sm:text-sm">
              <div className="flex items-center gap-2">
                <span className="text-zinc-500">$</span>
                <span className="break-all">{cliCommand}</span>
              </div>
              <button
                onClick={() => handleCopy(cliCommand)}
                className="p-1.5 rounded bg-zinc-800 hover:bg-zinc-700 text-white cursor-pointer"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        )}

        {activeTab === "deps" && dependencies && (
          <div className="py-4 px-2 space-y-3">
            <p className="text-zinc-300 text-sm">
              Required peer dependencies:
            </p>
            <div className="p-3 sm:p-4 rounded-xl bg-black border border-zinc-800 font-mono text-xs sm:text-sm text-zinc-200 flex flex-wrap items-center justify-between gap-2">
              <span className="break-all">
                npm install {dependencies.join(" ")}
              </span>
              <button
                onClick={() =>
                  handleCopy(`npm install ${dependencies.join(" ")}`)
                }
                className="p-1.5 rounded bg-zinc-800 hover:bg-zinc-700 text-white cursor-pointer"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              {dependencies.map((dep, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2.5 p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs sm:text-sm text-zinc-300"
                >
                  <CheckCircle2 className="w-4 h-4 text-zinc-400 shrink-0" />
                  <span className="truncate">{dep}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default CodeViewer;
