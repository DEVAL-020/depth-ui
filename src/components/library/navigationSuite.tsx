import React, { useState } from "react";
import {
  LayoutDashboard,
  Users,
  Settings,
  Bell,
  ChevronDown,
  ChevronRight,
  LogOut,
  Trash2,
  Copy,
  FolderPlus,
  ArrowRight,
} from "lucide-react";

// 1. Sidebar Collapsible Nav
export const SidebarCollapsibleNavDemo: React.FC = () => {
  const [active, setActive] = useState("dash");
  const [isCollapsed, setIsCollapsed] = useState(false);

  const links = [
    { id: "dash", label: "Dashboard", icon: LayoutDashboard, badge: "New" },
    { id: "team", label: "Team Members", icon: Users, badge: "12" },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div
      className={`p-3 rounded-2xl bg-[#111116] border border-zinc-800 transition-all ${isCollapsed ? "w-20" : "w-64"} mx-auto space-y-4`}
    >
      <div className="flex items-center justify-between px-2 pt-1">
        {!isCollapsed && (
          <span className="text-xs font-bold text-white tracking-tight">
            Workspace
          </span>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-white cursor-pointer ml-auto"
        >
          <ChevronRight
            className={`w-4 h-4 transition-transform ${isCollapsed ? "" : "rotate-180"}`}
          />
        </button>
      </div>

      <div className="space-y-1">
        {links.map((link) => {
          const Icon = link.icon;
          const isAct = active === link.id;
          return (
            <button
              key={link.id}
              onClick={() => setActive(link.id)}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                isAct
                  ? "bg-white text-black shadow-xs font-semibold"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-800/60"
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {!isCollapsed && <span>{link.label}</span>}
              {!isCollapsed && link.badge && (
                <span
                  className={`ml-auto text-[10px] px-1.5 py-0.5 rounded-full ${isAct ? "bg-zinc-200 text-black" : "bg-zinc-800 text-zinc-400"}`}
                >
                  {link.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

// 2. Context Menu
export const ContextMenuDemo: React.FC = () => {
  return (
    <div className="w-full max-w-xs mx-auto p-2 rounded-2xl bg-[#18181b] border border-zinc-800 shadow-2xl space-y-1 text-xs">
      <div className="px-3 py-1.5 text-[11px] font-semibold text-zinc-400">
        Context Actions
      </div>
      <button className="w-full flex items-center justify-between px-3 py-1.5 rounded-lg hover:bg-zinc-800 text-zinc-200 hover:text-white transition-colors cursor-pointer">
        <span className="flex items-center gap-2">
          <Copy className="w-3.5 h-3.5 text-zinc-400" />
          Duplicate Layer
        </span>
        <span className="text-[10px] text-zinc-500">⌘D</span>
      </button>
      <button className="w-full flex items-center justify-between px-3 py-1.5 rounded-lg hover:bg-zinc-800 text-zinc-200 hover:text-white transition-colors cursor-pointer">
        <span className="flex items-center gap-2">
          <FolderPlus className="w-3.5 h-3.5 text-zinc-400" />
          Move to Folder
        </span>
        <span className="text-[10px] text-zinc-500">⌘M</span>
      </button>
      <div className="border-t border-zinc-800 my-1" />
      <button className="w-full flex items-center justify-between px-3 py-1.5 rounded-lg hover:bg-rose-950/40 text-rose-400 transition-colors cursor-pointer">
        <span className="flex items-center gap-2">
          <Trash2 className="w-3.5 h-3.5" />
          Delete Item
        </span>
        <span className="text-[10px] text-rose-500">⌫</span>
      </button>
    </div>
  );
};

// 3. Mobile Drawer Sheet
export const MobileDrawerSheetDemo: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full max-w-sm mx-auto text-center space-y-3">
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 rounded-xl bg-white text-black text-xs font-semibold hover:bg-zinc-200 cursor-pointer shadow-xs"
      >
        Open Bottom Drawer Sheet
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-xs p-3">
          <div className="w-full max-w-md bg-[#18181b] border border-zinc-800 rounded-3xl p-6 space-y-4 animate-in slide-in-from-bottom duration-200">
            <div className="w-12 h-1.5 rounded-full bg-zinc-700 mx-auto cursor-grab" />
            <div>
              <h4 className="text-base font-bold text-white">
                Share Component
              </h4>
              <p className="text-xs text-zinc-400 mt-1">
                Generate a public shareable preview URL.
              </p>
            </div>
            <div className="flex gap-2">
              <input
                readOnly
                value="https://depth-ui.netlify.app/c/glow-card"
                className="flex-1 px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-300"
              />
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 rounded-xl bg-white text-black text-xs font-semibold cursor-pointer"
              >
                Copy
              </button>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-full py-2 rounded-xl bg-zinc-900 text-xs text-zinc-400 hover:text-white cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// 4. Stepper Wizard Nav
export const StepperWizardNavDemo: React.FC = () => {
  const [step, setStep] = useState(1);
  const steps = ["Account Info", "Billing Plan", "Confirmation"];

  return (
    <div className="w-full max-w-md mx-auto p-5 rounded-2xl bg-[#111116] border border-zinc-800 space-y-4">
      <div className="flex items-center justify-between">
        {steps.map((label, idx) => (
          <div key={label} className="flex items-center gap-2">
            <span
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold ${
                step >= idx + 1
                  ? "bg-cyan-500 text-black"
                  : "bg-zinc-800 text-zinc-400"
              }`}
            >
              {idx + 1}
            </span>
            <span className="text-xs text-zinc-300 hidden sm:inline">
              {label}
            </span>
          </div>
        ))}
      </div>

      <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-300">
        Current Form: <strong>{steps[step - 1]}</strong>
      </div>

      <div className="flex justify-between">
        <button
          onClick={() => setStep(Math.max(1, step - 1))}
          disabled={step === 1}
          className="px-3.5 py-1.5 rounded-lg bg-zinc-800 text-xs text-zinc-300 disabled:opacity-40 cursor-pointer"
        >
          Previous
        </button>
        <button
          onClick={() => setStep(Math.min(3, step + 1))}
          className="px-3.5 py-1.5 rounded-lg bg-white text-black text-xs font-semibold hover:bg-zinc-200 cursor-pointer"
        >
          {step === 3 ? "Finish" : "Next Step"}
        </button>
      </div>
    </div>
  );
};

// 5. Floating Announcement Pill
export const FloatingAnnouncementPillDemo: React.FC = () => {
  return (
    <div className="flex items-center justify-center p-4">
      <a
        href="#components-catalog"
        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-700/80 text-xs text-zinc-200 transition-all hover:scale-105 shadow-md group"
      >
        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-violet-500/20 text-violet-300 border border-violet-500/30">
          Changelog v2.4
        </span>
        <span className="font-medium">100+ components live in catalog</span>
        <ArrowRight className="w-3.5 h-3.5 text-zinc-400 group-hover:translate-x-1 transition-transform" />
      </a>
    </div>
  );
};

// 6. Mega Menu Dropdown
export const MegaMenuDropdownDemo: React.FC = () => {
  const [open, setOpen] = useState(true);

  return (
    <div className="w-full max-w-md mx-auto space-y-2">
      <button
        onClick={() => setOpen(!open)}
        className="px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-medium text-white flex items-center justify-between w-full cursor-pointer"
      >
        <span>Products &amp; Solutions</span>
        <ChevronDown
          className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="p-4 rounded-2xl bg-[#141418] border border-zinc-800 shadow-2xl grid grid-cols-2 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800/80 space-y-1 hover:border-zinc-700 transition-colors cursor-pointer">
            <h5 className="font-semibold text-white">Spatial 3D</h5>
            <p className="text-[11px] text-zinc-400 leading-relaxed">
              Interactive WebGL canvases &amp; 3D perspective grids.
            </p>
          </div>
          <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800/80 space-y-1 hover:border-zinc-700 transition-colors cursor-pointer">
            <h5 className="font-semibold text-white">Motion Physics</h5>
            <p className="text-[11px] text-zinc-400 leading-relaxed">
              Fluid spring curves and gesture drag interactions.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

// 7. User Profile Dropdown
export const UserProfileDropdownDemo: React.FC = () => {
  return (
    <div className="w-full max-w-xs mx-auto p-3 rounded-2xl bg-[#141418] border border-zinc-800 shadow-xl space-y-2 text-xs">
      <div className="flex items-center gap-2.5 p-2 rounded-xl bg-zinc-900 border border-zinc-800/80">
        <div className="w-8 h-8 rounded-full bg-violet-600 flex items-center justify-center font-bold text-white text-xs">
          JD
        </div>
        <div>
          <div className="font-semibold text-white">John Doe</div>
          <div className="text-[11px] text-zinc-400">john@acme.dev</div>
        </div>
      </div>

      <div className="space-y-0.5">
        <button className="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-zinc-800 text-zinc-300 hover:text-white cursor-pointer transition-colors">
          <Settings className="w-3.5 h-3.5" />
          <span>Account Settings</span>
        </button>
        <button className="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-zinc-800 text-zinc-300 hover:text-white cursor-pointer transition-colors">
          <Bell className="w-3.5 h-3.5" />
          <span>Notifications</span>
        </button>
        <button className="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-rose-950/40 text-rose-400 cursor-pointer transition-colors">
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
};

// 8. Docked Action Bar
export const DockedActionBarDemo: React.FC = () => {
  const [selected, setSelected] = useState(3);

  return (
    <div className="w-full max-w-md mx-auto p-3 rounded-2xl bg-[#141418] border border-zinc-700/80 shadow-2xl flex items-center justify-between gap-3 text-xs">
      <div className="flex items-center gap-2 pl-2">
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
        <span className="font-medium text-white">
          {selected} items selected
        </span>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => setSelected(0)}
          className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white cursor-pointer"
        >
          Clear
        </button>
        <button className="px-3 py-1.5 rounded-lg bg-white text-black font-semibold hover:bg-zinc-200 cursor-pointer">
          Batch Export
        </button>
      </div>
    </div>
  );
};

// 9. Split Button Dropdown
export const SplitButtonDropdownDemo: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [action, setAction] = useState("Publish Release");

  return (
    <div className="relative inline-block mx-auto text-left">
      <div className="inline-flex rounded-xl shadow-xs overflow-hidden border border-zinc-700">
        <button
          onClick={() => alert(`Executing: ${action}`)}
          className="px-4 py-2 bg-white text-black text-xs font-semibold hover:bg-zinc-100 transition-colors cursor-pointer"
        >
          {action}
        </button>
        <button
          onClick={() => setOpen(!open)}
          className="px-2.5 py-2 bg-zinc-200 text-black hover:bg-zinc-300 border-l border-zinc-300 transition-colors cursor-pointer"
        >
          <ChevronDown className="w-3.5 h-3.5" />
        </button>
      </div>

      {open && (
        <div className="absolute left-0 mt-1.5 w-44 rounded-xl bg-[#18181b] border border-zinc-800 shadow-2xl p-1 z-20 space-y-0.5 text-xs">
          {["Publish Release", "Save Draft", "Schedule for Later"].map(
            (act) => (
              <div
                key={act}
                onClick={() => {
                  setAction(act);
                  setOpen(false);
                }}
                className="px-3 py-1.5 rounded-lg text-zinc-300 hover:text-white hover:bg-zinc-800 cursor-pointer transition-colors"
              >
                {act}
              </div>
            ),
          )}
        </div>
      )}
    </div>
  );
};
