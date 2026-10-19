import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, CreditCard } from "lucide-react";

export interface MorphingDialogProps {
  title?: string;
  subtitle?: string;
  category?: string;
}

export const MorphingDialog: React.FC<MorphingDialogProps> = ({
  title = "Team Subscription Details",
  subtitle = "Manage active workspace seats, monthly quota limits, and billing details.",
  category = "Account",
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex items-center justify-center p-2">
      {/* Trigger Card */}
      <motion.div
        layoutId="dialog-card-container"
        onClick={() => setIsOpen(true)}
        className="w-full max-w-sm rounded-2xl bg-[#121215] border border-zinc-800 p-5 cursor-pointer hover:border-zinc-700 transition-colors group shadow-sm"
      >
        <div className="flex items-center justify-between mb-3">
          <motion.span
            layoutId="dialog-badge"
            className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-zinc-800 text-zinc-300 border border-zinc-700"
          >
            {category}
          </motion.span>
          <span className="text-xs text-zinc-500 group-hover:text-zinc-300 flex items-center gap-1 transition-colors">
            Expand <ArrowRight className="w-3 h-3" />
          </span>
        </div>

        <motion.div
          layoutId="dialog-visual"
          className="h-28 rounded-xl bg-[#18181b] border border-zinc-800 flex items-center justify-center mb-3"
        >
          <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-700/60 flex items-center justify-center text-zinc-300 shadow-sm">
            <CreditCard className="w-5 h-5" />
          </div>
        </motion.div>

        <motion.h3
          layoutId="dialog-title"
          className="text-sm font-semibold text-white mb-0.5 group-hover:text-zinc-100 transition-colors"
        >
          {title}
        </motion.h3>

        <motion.p
          layoutId="dialog-subtitle"
          className="text-xs text-zinc-400 line-clamp-2"
        >
          {subtitle}
        </motion.p>
      </motion.div>

      {/* Expanded Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/70 backdrop-blur-xs"
            />

            {/* Expanded Container */}
            <motion.div
              layoutId="dialog-card-container"
              className="relative w-full max-w-md rounded-2xl bg-[#121215] border border-zinc-800 p-6 shadow-2xl z-10 overflow-hidden space-y-4"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-5 right-5 p-1 rounded-md text-zinc-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div>
                <motion.span
                  layoutId="dialog-badge"
                  className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium bg-zinc-800 text-zinc-300 border border-zinc-700"
                >
                  {category}
                </motion.span>
              </div>

              <motion.div
                layoutId="dialog-visual"
                className="h-32 rounded-xl bg-[#18181b] border border-zinc-800 flex items-center justify-center"
              >
                <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-700 flex items-center justify-center text-zinc-200">
                  <CreditCard className="w-6 h-6" />
                </div>
              </motion.div>

              <div>
                <motion.h3
                  layoutId="dialog-title"
                  className="text-lg font-bold text-white mb-1"
                >
                  {title}
                </motion.h3>

                <motion.p
                  layoutId="dialog-subtitle"
                  className="text-xs text-zinc-400 leading-relaxed"
                >
                  {subtitle}
                </motion.p>
              </div>

              <div className="space-y-2 p-3 rounded-lg bg-[#18181b] border border-zinc-800 text-xs text-zinc-300 font-mono">
                <div className="flex justify-between">
                  <span className="text-zinc-500">Tier:</span>
                  <span className="text-white">Pro Plan ($29/mo)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Seats:</span>
                  <span className="text-emerald-400">8 / 10 Allocated</span>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="w-full py-2.5 rounded-xl bg-white text-black font-semibold text-xs hover:bg-zinc-200 transition-colors cursor-pointer shadow-sm"
              >
                Done
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
export default MorphingDialog;
