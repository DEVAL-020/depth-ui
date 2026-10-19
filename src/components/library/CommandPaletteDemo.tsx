import React, { useState, useEffect } from "react";
import {
  Search,
  Command,
  ArrowRight,
  Layers,
  Palette,
  Terminal,
  FileCode,
  Check,
  X,
  Compass,
  Zap,
} from "lucide-react";

export interface CommandItem {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  icon: React.ElementType;
  shortcut?: string;
  action: () => void;
}

export const CommandPaletteDemo: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 2400);
  };

  const commands: CommandItem[] = [
    {
      id: "cmd-copy-cli",
      title: "Copy npx installation CLI",
      subtitle: 'Copy "npx depth-ui add glow-card" to clipboard',
      category: "Developer Tools",
      icon: Terminal,
      shortcut: "⌘C",
      action: () => {
        navigator.clipboard?.writeText("npx depth-ui add glow-card");
        showNotification('Copied "npx depth-ui add glow-card" to clipboard');
        setIsOpen(false);
      },
    },
    {
      id: "cmd-explore-primitives",
      title: "Explore 44+ Components Catalog",
      subtitle: "Browse all accessible React & Tailwind UI primitives",
      category: "Navigation",
      icon: Layers,
      shortcut: "G C",
      action: () => {
        showNotification("Navigating to Components Catalog...");
        setIsOpen(false);
      },
    },
    {
      id: "cmd-top-loader",
      title: "Add Top Navigation Loading Bar",
      subtitle: "Insert glowing progress loader into router layout",
      category: "Components",
      icon: Zap,
      shortcut: "↵",
      action: () => {
        showNotification("Selected: Top Navigation Loading Bar");
        setIsOpen(false);
      },
    },
    {
      id: "cmd-magnetic-cursor",
      title: "Configure Fluid Magnetic Cursor",
      subtitle: "Interactive spring cursor with button snapping",
      category: "Components",
      icon: Compass,
      shortcut: "↵",
      action: () => {
        showNotification("Selected: Fluid Magnetic Cursor");
        setIsOpen(false);
      },
    },
    {
      id: "cmd-motion-cards",
      title: "Generate 3D Spatial Motion Cards",
      subtitle: "Gyro-tilt perspective cards with specular glare",
      category: "Components",
      icon: FileCode,
      shortcut: "↵",
      action: () => {
        showNotification("Selected: 3D Spatial Motion Cards");
        setIsOpen(false);
      },
    },
    {
      id: "cmd-toggle-theme",
      title: "Toggle Theme Palette",
      subtitle: "Cycle between Obsidian Dark, Violet Neon, and Deep Slate",
      category: "Preferences",
      icon: Palette,
      shortcut: "⌘T",
      action: () => {
        showNotification("Theme palette cycled successfully!");
        setIsOpen(false);
      },
    },
  ];

  const filteredCommands = commands.filter((cmd) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      cmd.title.toLowerCase().includes(q) ||
      cmd.subtitle.toLowerCase().includes(q) ||
      cmd.category.toLowerCase().includes(q)
    );
  });

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle palette on Cmd+K or Ctrl+K
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }

      if (!isOpen) return;

      if (e.key === "Escape") {
        setIsOpen(false);
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex(
          (prev) => (prev + 1) % Math.max(1, filteredCommands.length),
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex(
          (prev) =>
            (prev - 1 + filteredCommands.length) %
            Math.max(1, filteredCommands.length),
        );
      } else if (e.key === "Enter") {
        e.preventDefault();
        const selected = filteredCommands[selectedIndex];
        if (selected) {
          selected.action();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filteredCommands, selectedIndex]);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4">
      {/* Interactive Trigger Surface */}
      <div className="p-8 sm:p-12 rounded-3xl bg-[#0f0f14] border border-zinc-800 shadow-2xl text-center space-y-6 relative overflow-hidden">
        <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full bg-cyan-500/10 blur-3xl" />

        <div className="max-w-md mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-mono text-xs font-semibold">
            <Command className="w-3.5 h-3.5" />
            <span>GLOBAL COMMAND PALETTE</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Spotlight Command Menu
          </h3>
          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
            Instant modal navigation, keyboard shortcuts, and categorized
            command execution.
          </p>
        </div>

        {/* Trigger Button */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => {
              setIsOpen(true);
              setSearchQuery("");
              setSelectedIndex(0);
            }}
            className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-700/80 text-white font-medium text-xs sm:text-sm flex items-center justify-between gap-6 shadow-xl hover:border-cyan-500/50 transition-all cursor-pointer group active:scale-98"
          >
            <div className="flex items-center gap-2.5 text-zinc-300">
              <Search className="w-4 h-4 text-cyan-400" />
              <span>Type a command or search...</span>
            </div>
            <div className="flex items-center gap-1">
              <kbd className="px-2 py-0.5 rounded-md bg-zinc-800 text-[11px] font-mono font-semibold text-zinc-300 border border-zinc-700">
                ⌘K
              </kbd>
            </div>
          </button>
        </div>

        <div className="text-[11px] font-mono text-zinc-500">
          Press <span className="text-zinc-300 font-bold">⌘K</span> or click the
          button above to launch
        </div>

        {/* Toast Notification */}
        {notification && (
          <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-900 border border-emerald-500/40 text-emerald-300 text-xs font-medium shadow-2xl animate-in fade-in slide-in-from-bottom-2 duration-200">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>{notification}</span>
          </div>
        )}
      </div>

      {/* Modal Overlay and Palette Container */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-start justify-center pt-16 sm:pt-24 px-4 p-4 animate-in fade-in duration-150">
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xl rounded-2xl bg-[#121217] border border-zinc-700 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150 flex flex-col max-h-[80vh]"
          >
            {/* Search Input Bar */}
            <div className="p-4 border-b border-zinc-800 flex items-center gap-3 bg-zinc-900/60">
              <Search className="w-5 h-5 text-cyan-400 shrink-0" />
              <input
                autoFocus
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                placeholder="Search commands, primitives, docs..."
                className="w-full bg-transparent text-sm text-white placeholder-zinc-500 focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="p-1 rounded-md text-zinc-500 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <kbd className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-zinc-800 text-zinc-400 border border-zinc-700">
                ESC
              </kbd>
            </div>

            {/* Commands List */}
            <div className="p-2 overflow-y-auto space-y-1 divide-y divide-transparent">
              {filteredCommands.length === 0 ? (
                <div className="p-8 text-center text-xs text-zinc-500">
                  No commands found matching &quot;{searchQuery}&quot;
                </div>
              ) : (
                filteredCommands.map((cmd, idx) => {
                  const Icon = cmd.icon;
                  const isSelected = idx === selectedIndex;
                  return (
                    <div
                      key={cmd.id}
                      onClick={() => cmd.action()}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`p-3 rounded-xl flex items-center justify-between gap-3 cursor-pointer transition-colors ${
                        isSelected
                          ? "bg-zinc-800/90 text-white border border-zinc-700/80 shadow-xs"
                          : "text-zinc-400 hover:bg-zinc-800/40 hover:text-zinc-200"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                            isSelected
                              ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
                              : "bg-zinc-800/80 text-zinc-400"
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-white flex items-center gap-2">
                            <span>{cmd.title}</span>
                            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-sm bg-zinc-800/80 text-zinc-400">
                              {cmd.category}
                            </span>
                          </div>
                          <p className="text-[11px] text-zinc-400 line-clamp-1">
                            {cmd.subtitle}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5">
                        {cmd.shortcut && (
                          <kbd className="px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-[10px] font-mono text-zinc-400">
                            {cmd.shortcut}
                          </kbd>
                        )}
                        <ArrowRight
                          className={`w-3.5 h-3.5 text-zinc-500 ${
                            isSelected ? "text-cyan-400 translate-x-0.5" : ""
                          } transition-transform`}
                        />
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Bottom Keyboard Guide */}
            <div className="px-4 py-2.5 bg-zinc-900/80 border-t border-zinc-800 flex items-center justify-between text-[11px] text-zinc-500 font-mono">
              <div className="flex items-center gap-3">
                <span>↑↓ to navigate</span>
                <span>↵ to select</span>
                <span>esc to close</span>
              </div>
              <span className="text-cyan-400 font-semibold">
                {filteredCommands.length} commands
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default CommandPaletteDemo;
