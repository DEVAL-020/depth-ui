import React, { useState } from "react";
import {
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  Info,
  X,
} from "lucide-react";

export interface AlertProps {
  variant?: "info" | "success" | "warning" | "error";
  title: string;
  description?: string;
  onClose?: () => void;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export const Alert: React.FC<AlertProps> = ({
  variant = "info",
  title,
  description,
  onClose,
  action,
}) => {
  const configs = {
    info: {
      bg: "bg-sky-950/30 border-sky-900/50 text-sky-400",
      icon: <Info className="w-4 h-4 text-sky-400 shrink-0" />,
      text: "text-zinc-300",
    },
    success: {
      bg: "bg-emerald-950/30 border-emerald-900/50 text-emerald-400",
      icon: <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />,
      text: "text-zinc-300",
    },
    warning: {
      bg: "bg-amber-950/30 border-amber-900/50 text-amber-400",
      icon: <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />,
      text: "text-zinc-300",
    },
    error: {
      bg: "bg-rose-950/30 border-rose-900/50 text-rose-400",
      icon: <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />,
      text: "text-zinc-300",
    },
  };

  const cfg = configs[variant];

  return (
    <div
      className={`p-4 rounded-xl border flex items-start justify-between gap-3 ${cfg.bg}`}
    >
      <div className="flex items-start gap-3">
        <div className="mt-0.5">{cfg.icon}</div>
        <div className="space-y-0.5">
          <h4 className="text-xs font-semibold text-white">{title}</h4>
          {description && (
            <p className={`text-xs ${cfg.text}`}>{description}</p>
          )}
          {action && (
            <button
              onClick={action.onClick}
              className="text-xs font-medium text-white underline mt-1.5 cursor-pointer hover:opacity-80"
            >
              {action.label}
            </button>
          )}
        </div>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="text-zinc-400 hover:text-white p-0.5 rounded cursor-pointer"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
};

export const AlertToastDemo: React.FC = () => {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3500);
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-5 p-6 rounded-2xl bg-[#121215] border border-zinc-800">
      <div className="space-y-1">
        <h3 className="text-sm font-semibold text-white">
          Alerts & Toast Notifications
        </h3>
        <p className="text-xs text-zinc-500">
          Static feedback banners and floating dynamic toast popups.
        </p>
      </div>

      {/* Alert Banners */}
      <div className="space-y-3">
        <Alert
          variant="success"
          title="Payment Succeeded"
          description="Your team subscription was renewed for 12 months. Invoice #INV-2026-89 is ready."
        />
        <Alert
          variant="warning"
          title="Upcoming SSL Certificate Expiry"
          description="Domain api.depthui.dev expires in 4 days. Auto-renewal has been queued."
        />
        <Alert
          variant="info"
          title="New Feature Available"
          description="You can now invite guest reviewers with view-only prototype access."
          action={{
            label: "Invite Teammate",
            onClick: () => triggerToast("Invite link generated!"),
          }}
        />
      </div>

      {/* Trigger Toast Buttons */}
      <div className="pt-3 border-t border-zinc-800/80 flex flex-wrap items-center gap-3">
        <button
          onClick={() => triggerToast("Changes saved to cloud!")}
          className="px-3.5 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-medium text-zinc-200 hover:text-white hover:bg-zinc-800 cursor-pointer"
        >
          Trigger Success Toast
        </button>
        <button
          onClick={() => triggerToast("Project exported as JSON bundle")}
          className="px-3.5 py-1.5 rounded-lg bg-white text-black text-xs font-semibold hover:bg-zinc-200 cursor-pointer"
        >
          Trigger Export Toast
        </button>
      </div>

      {/* Floating Toast Popup */}
      {showToast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-700 text-white shadow-2xl animate-bounceIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-medium">{toastMessage}</span>
          <button
            onClick={() => setShowToast(false)}
            className="text-zinc-500 hover:text-white ml-2 cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default AlertToastDemo;
