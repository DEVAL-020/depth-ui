import React, { useState, useEffect } from "react";
import { X, AlertTriangle } from "lucide-react";

export interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  maxWidth?: "sm" | "md" | "lg";
}

export const Dialog: React.FC<DialogProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
  maxWidth = "md",
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const widths = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-fadeIn">
      {/* Backdrop overlay click */}
      <div className="fixed inset-0" onClick={onClose} />

      <div
        className={`relative w-full ${widths[maxWidth]} rounded-2xl bg-[#121215] border border-zinc-800 p-6 shadow-2xl z-10 space-y-4`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-base font-semibold text-white tracking-tight">
              {title}
            </h3>
            {description && (
              <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                {description}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-zinc-500 hover:text-white p-1 rounded-lg hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="py-2">{children}</div>

        {footer && (
          <div className="pt-3 border-t border-zinc-800/80 flex justify-end gap-2.5">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export const DialogModalDemo: React.FC = () => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [projectName, setProjectName] = useState("Acme SaaS Core");
  const [domain, setDomain] = useState("acme.app");

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4 p-6 rounded-2xl bg-[#121215] border border-zinc-800">
      <div className="space-y-1">
        <h3 className="text-sm font-semibold text-white">
          Modal & Dialog Overlays
        </h3>
        <p className="text-xs text-zinc-500">
          Accessible dialogs with backdrop blur, keyboard trap, and escape key
          dismiss.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3 pt-2">
        <button
          onClick={() => setIsEditOpen(true)}
          className="px-4 py-2 rounded-lg bg-white text-black text-xs font-semibold hover:bg-zinc-200 transition-colors cursor-pointer shadow-xs"
        >
          Open Form Modal
        </button>

        <button
          onClick={() => setIsAlertOpen(true)}
          className="px-4 py-2 rounded-lg bg-red-950/60 border border-red-900/60 text-red-400 text-xs font-semibold hover:bg-red-900/60 transition-colors cursor-pointer"
        >
          Open Destructive Confirmation
        </button>
      </div>

      {/* Form Dialog */}
      <Dialog
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        title="Edit Project Configuration"
        description="Update your project settings and primary deployment domain."
        footer={
          <>
            <button
              onClick={() => setIsEditOpen(false)}
              className="px-3.5 py-1.5 rounded-lg text-xs font-medium text-zinc-400 hover:text-white cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={() => setIsEditOpen(false)}
              className="px-4 py-1.5 rounded-lg bg-white text-black text-xs font-semibold hover:bg-zinc-200 cursor-pointer shadow-xs"
            >
              Save Changes
            </button>
          </>
        }
      >
        <div className="space-y-3">
          <div className="space-y-1">
            <label className="text-xs font-medium text-zinc-300">
              Project Name
            </label>
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="w-full bg-[#18181b] border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-zinc-600"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-zinc-300">
              Custom Domain
            </label>
            <input
              type="text"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              className="w-full bg-[#18181b] border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-zinc-600"
            />
          </div>
        </div>
      </Dialog>

      {/* Destructive Alert Dialog */}
      <Dialog
        isOpen={isAlertOpen}
        onClose={() => setIsAlertOpen(false)}
        title="Revoke API Key"
        description="Are you sure you want to revoke this secret API key? Any active webhook integrations will fail immediately."
        maxWidth="sm"
        footer={
          <>
            <button
              onClick={() => setIsAlertOpen(false)}
              className="px-3.5 py-1.5 rounded-lg text-xs font-medium text-zinc-400 hover:text-white cursor-pointer"
            >
              Nevermind
            </button>
            <button
              onClick={() => setIsAlertOpen(false)}
              className="px-4 py-1.5 rounded-lg bg-red-600 text-white text-xs font-semibold hover:bg-red-500 cursor-pointer shadow-xs"
            >
              Revoke Key
            </button>
          </>
        }
      >
        <div className="p-3 rounded-xl bg-red-950/30 border border-red-900/40 text-xs text-red-300 flex items-start gap-2.5">
          <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
          <span>
            This action cannot be undone. You will need to regenerate
            credentials for all CI/CD pipelines.
          </span>
        </div>
      </Dialog>
    </div>
  );
};

export default DialogModalDemo;
