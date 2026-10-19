import React from "react";
import {
  CheckSquare,
  Compass,
  Layers,
  Box,
  Activity,
  Palette,
  LayoutGrid,
} from "lucide-react";

export interface CategoryConfig {
  id: string;
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
  dotColor: string;
  textColor: string;
  borderHover: string;
  badgeBg: string;
}

export const CATEGORIES_CONFIG: CategoryConfig[] = [
  {
    id: "forms",
    label: "Forms & Inputs",
    description:
      "Text inputs, selects, switches, checkboxes, OTP fields, and validation wrappers.",
    icon: CheckSquare,
    accentColor: "blue",
    dotColor: "bg-blue-400",
    textColor: "text-blue-400",
    borderHover: "group-hover:border-blue-500/50",
    badgeBg: "bg-blue-500/10 text-blue-400 border-blue-500/30",
  },
  {
    id: "navigation",
    label: "Navigation & Overlays",
    description:
      "Dialogs, drawers, popovers, dropdown menus, breadcrumbs, and pagination.",
    icon: Compass,
    accentColor: "indigo",
    dotColor: "bg-indigo-400",
    textColor: "text-indigo-400",
    borderHover: "group-hover:border-indigo-500/50",
    badgeBg: "bg-indigo-500/10 text-indigo-400 border-indigo-500/30",
  },
  {
    id: "data",
    label: "Data & Feedback",
    description:
      "Data tables, toast notifications, alerts, skeletons, stat strips, and metric badges.",
    icon: Layers,
    accentColor: "emerald",
    dotColor: "bg-emerald-400",
    textColor: "text-emerald-400",
    borderHover: "group-hover:border-emerald-500/50",
    badgeBg: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
  },
  {
    id: "spatial",
    label: "Display & 3D",
    description:
      "3D tilt cards, depth canvases, bento grids, specular lighting, and hero displays.",
    icon: Box,
    accentColor: "violet",
    dotColor: "bg-violet-400",
    textColor: "text-violet-400",
    borderHover: "group-hover:border-violet-500/50",
    badgeBg: "bg-violet-500/10 text-violet-400 border-violet-500/30",
  },
  {
    id: "motion",
    label: "Motion & Layout",
    description:
      "Carousels, animated accordions, page shells, floating docks, and interactive transitions.",
    icon: Activity,
    accentColor: "cyan",
    dotColor: "bg-cyan-400",
    textColor: "text-cyan-400",
    borderHover: "group-hover:border-cyan-500/50",
    badgeBg: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30",
  },
  {
    id: "creative",
    label: "Vibrant & Colors",
    description:
      "Aurora fluid backgrounds, glowing borders, neon badges, and theme switches.",
    icon: Palette,
    accentColor: "amber",
    dotColor: "bg-amber-400",
    textColor: "text-amber-400",
    borderHover: "group-hover:border-amber-500/50",
    badgeBg: "bg-amber-500/10 text-amber-400 border-amber-500/30",
  },
];

export const getCategoryFallbackConfig = (categoryId: string): CategoryConfig => ({
  id: categoryId,
  label: categoryId,
  description: "",
  icon: LayoutGrid,
  accentColor: "zinc",
  dotColor: "bg-zinc-400",
  textColor: "text-zinc-400",
  borderHover: "group-hover:border-zinc-600",
  badgeBg: "bg-zinc-800 text-zinc-300 border-zinc-700",
});
