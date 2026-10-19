import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, CornerDownLeft } from "lucide-react";
import { COMPONENTS_CATALOG } from "../../data/componentsCatalog";

export interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectComponent: (id: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectComponent,
}) => {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          setQuery("");
        }
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const filtered = COMPONENTS_CATALOG.filter(
    (c) =>
      c.title.toLowerCase().includes(query.toLowerCase()) ||
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      c.tags.some((t) => t.toLowerCase().includes(query.toLowerCase())) ||
      c.categoryLabel.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 sm:px-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-xs"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -10 }}
            className="relative w-full max-w-xl rounded-2xl bg-[#121215] border border-zinc-800 shadow-2xl overflow-hidden z-10"
          >
            {/* Search Input Bar */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-zinc-800 bg-[#18181b]">
              <Search className="w-5 h-5 text-zinc-400 shrink-0" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search documentation and components..."
                aria-label="Search documentation and components"
                autoFocus
                className="w-full bg-transparent text-white placeholder-zinc-500 text-sm sm:text-base focus:outline-none font-sans"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  aria-label="Clear search input"
                  className="p-1 text-zinc-500 hover:text-white cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <kbd className="hidden sm:inline-block px-2 py-0.5 rounded bg-zinc-900 text-xs font-mono text-zinc-400 border border-zinc-800">
                ESC
              </kbd>
            </div>

            {/* Results List */}
            <div className="max-h-80 sm:max-h-96 overflow-y-auto p-2 space-y-1">
              {filtered.length === 0 ? (
                <div className="p-8 text-center text-zinc-500 text-sm">
                  No matching components found for &quot;{query}&quot;
                </div>
              ) : (
                filtered.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      onSelectComponent(item.id);
                      onClose();
                    }}
                    className="w-full text-left p-3 rounded-xl hover:bg-zinc-800/50 transition-colors flex items-center justify-between group cursor-pointer"
                  >
                    <div className="space-y-1 min-w-0 pr-3">
                      <div className="flex items-center gap-2">
                        <span className="text-sm sm:text-base font-semibold text-white group-hover:text-white">
                          {item.title}
                        </span>
                        <span className="text-xs sm:text-[13px] font-mono text-zinc-400">
                          &lt;{item.name} /&gt;
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-zinc-300 truncate">
                        {item.subtitle}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-xs sm:text-[13px] font-medium px-2.5 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-300">
                        {item.categoryLabel}
                      </span>
                      <CornerDownLeft className="w-3.5 h-3.5 text-zinc-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </button>
                ))
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-4 py-2.5 border-t border-zinc-800/80 bg-[#18181b] flex items-center justify-between text-xs text-zinc-500 font-mono">
              <div className="flex items-center gap-2">
                <span>{filtered.length} components available</span>
              </div>
              <div className="hidden sm:flex items-center gap-3">
                <span>↑↓ to navigate</span>
                <span>ESC to close</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
export default SearchModal;
