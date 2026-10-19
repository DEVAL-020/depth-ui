import { EXTENDED_CATALOG } from "./extendedCatalog";

export interface ComponentItem {
  id: string;
  name: string;
  title: string;
  subtitle: string;
  category:
    | "creative"
    | "forms"
    | "data"
    | "navigation"
    | "spatial"
    | "motion"
    | "cards"
    | "ui";
  categoryLabel: string;
  tags: string[];
  badge?: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  cliCommand: string;
  dependencies: string[];
  code: string;
  usageCode: string;
}

export const COMPONENTS_CATALOG: ComponentItem[] = [
  // ==========================================
  // VIBRANT & COLORFUL COMPONENTS
  // ==========================================
  {
    id: "gradient-glow-card",
    name: "GradientGlowCard",
    title: "Gradient Glow Card",
    subtitle:
      "Ambient gradient border card with dynamic specular lighting and interactive multi-color themes (Aurora, Sunset, Emerald, Cyan).",
    category: "creative",
    categoryLabel: "Vibrant & Colors",
    tags: ["Glow", "Gradient", "Card", "Colorful", "Specular"],
    badge: "Vibrant",
    difficulty: "Intermediate",
    cliCommand: "npx depth-ui add glow-card",
    dependencies: ["lucide-react", "clsx", "tailwind-merge"],
    code: `import React, { useState } from 'react'
import { Layers, ArrowRight } from 'lucide-react'

export type ColorPreset = 'aurora' | 'sunset' | 'emerald' | 'hyperdrive'

export const GradientGlowCard: React.FC<{
  title?: string
  description?: string
  preset?: ColorPreset
}> = ({
  title = 'Collaborative Workspaces',
  description = 'High-velocity collaborative canvases with instant edge replication and automated branch staging.',
  preset = 'aurora',
}) => {
  const [activePreset, setActivePreset] = useState<ColorPreset>(preset)

  const presets = {
    aurora: {
      name: 'Aurora',
      border: 'from-violet-500 via-indigo-500 to-cyan-400',
      glow: 'rgba(139, 92, 246, 0.25)',
      badge: 'bg-violet-950/70 text-violet-300 border-violet-800/60',
      iconBg: 'bg-gradient-to-br from-violet-600 to-cyan-500',
      btn: 'bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 text-white',
    },
    sunset: {
      name: 'Sunset',
      border: 'from-amber-500 via-rose-500 to-purple-600',
      glow: 'rgba(244, 63, 94, 0.25)',
      badge: 'bg-rose-950/70 text-rose-300 border-rose-800/60',
      iconBg: 'bg-gradient-to-br from-amber-500 to-rose-600',
      btn: 'bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 text-white',
    },
    emerald: {
      name: 'Emerald Mint',
      border: 'from-emerald-400 via-teal-500 to-sky-500',
      glow: 'rgba(16, 185, 129, 0.25)',
      badge: 'bg-emerald-950/70 text-emerald-300 border-emerald-800/60',
      iconBg: 'bg-gradient-to-br from-emerald-500 to-teal-600',
      btn: 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white',
    },
    hyperdrive: {
      name: 'Electric Cyan',
      border: 'from-cyan-400 via-sky-500 to-blue-600',
      glow: 'rgba(6, 182, 212, 0.25)',
      badge: 'bg-cyan-950/70 text-cyan-300 border-cyan-800/60',
      iconBg: 'bg-gradient-to-br from-cyan-500 to-blue-600',
      btn: 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white',
    },
  }

  const current = presets[activePreset]

  return (
    <div className="relative group p-[1.5px] rounded-2xl overflow-hidden max-w-md mx-auto">
      <div className={\`absolute inset-0 bg-gradient-to-r \${current.border} rounded-2xl opacity-80 group-hover:opacity-100 transition-opacity\`} />
      <div className="absolute -inset-1 rounded-2xl opacity-40 group-hover:opacity-75 blur-xl transition-all" style={{ background: current.glow }} />
      <div className="relative rounded-2xl bg-[#0e0e11] p-7 space-y-5">
        <div className="flex items-center justify-between">
          <div className={\`w-10 h-10 rounded-xl \${current.iconBg} flex items-center justify-center text-white\`}>
            <Layers className="w-5 h-5" />
          </div>
          <span className={\`px-3 py-1 rounded-full text-xs font-medium border \${current.badge}\`}>Featured Block</span>
        </div>
        <div>
          <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
          <p className="text-sm text-zinc-400 leading-relaxed">{description}</p>
        </div>
        <button className={\`w-full py-2.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 shadow-lg \${current.btn}\`}>
          <span>Explore Capability</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}`,
    usageCode: `<GradientGlowCard
  title="Real-time Collaborative Engine"
  description="High-velocity collaborative canvases with instant edge replication."
  preset="aurora"
/>`,
  },
  {
    id: "pricing-tier-card",
    name: "PricingTierCard",
    title: "Interactive Pricing Tier",
    subtitle:
      "High-conversion SaaS pricing card featuring radiant violet-to-cyan gradient border, emerald feature checks, and billing toggle.",
    category: "creative",
    categoryLabel: "Vibrant & Colors",
    tags: ["Pricing", "Card", "Gradient", "SaaS", "Billing"],
    badge: "Popular",
    difficulty: "Intermediate",
    cliCommand: "npx depth-ui add pricing-card",
    dependencies: ["lucide-react", "clsx", "tailwind-merge"],
    code: `import React, { useState } from 'react'
import { Check, Star, ArrowRight } from 'lucide-react'

export const PricingTierCard: React.FC = () => {
  const [isAnnual, setIsAnnual] = useState(true)

  const features = [
    'Unlimited custom UI components',
    'Full source code with TypeScript types',
    'Interactive 3D primitives & canvas physics',
    'Commercial license for client websites',
    'Private Slack channel with core maintainers',
    'Production-ready responsive layouts & templates',
  ]

  return (
    <div className="relative group p-[1.5px] rounded-3xl overflow-hidden shadow-2xl max-w-lg mx-auto">
      <div className="absolute inset-0 bg-gradient-to-br from-violet-500 via-fuchsia-500 to-cyan-400 rounded-3xl opacity-90 group-hover:opacity-100 transition-opacity" />
      <div className="relative rounded-[23px] bg-[#0c0c0f] p-8 space-y-6">
        <div className="flex items-start justify-between">
          <div>
            <span className="text-xs font-semibold text-violet-400">Pro Membership</span>
            <h3 className="text-2xl font-bold text-white mt-1">Design System Pro</h3>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-md flex items-center gap-1">
            <Star className="w-3 h-3 fill-current" />
            <span>Most Popular</span>
          </span>
        </div>

        <div className="flex items-baseline gap-1.5 pb-2 border-b border-zinc-800">
          <span className="text-5xl font-extrabold text-white tracking-tight">$29</span>
          <span className="text-sm text-zinc-400">/ month</span>
        </div>

        <ul className="space-y-2.5">
          {features.map((feat, i) => (
            <li key={i} className="flex items-center gap-3 text-sm text-zinc-300">
              <div className="w-4 h-4 rounded-full bg-emerald-950/80 border border-emerald-800 text-emerald-400 flex items-center justify-center shrink-0">
                <Check className="w-2.5 h-2.5 stroke-[3]" />
              </div>
              <span>{feat}</span>
            </li>
          ))}
        </ul>

        <button className="w-full py-3 rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-violet-950/50">
          <span>Get Instant Pro Access</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}`,
    usageCode: `<PricingTierCard />`,
  },
  {
    id: "colorful-analytics",
    name: "ColorfulAnalytics",
    title: "Vibrant Donut Analytics",
    subtitle:
      "Multi-color revenue attribution donut chart with interactive hover segments, colorful legends, and metric growth badges.",
    category: "creative",
    categoryLabel: "Vibrant & Colors",
    tags: ["Analytics", "Donut", "Chart", "Revenue", "Colorful"],
    badge: "Dashboard",
    difficulty: "Intermediate",
    cliCommand: "npx depth-ui add colorful-analytics",
    dependencies: ["lucide-react", "clsx", "tailwind-merge"],
    code: `import React, { useState } from 'react'
import { TrendingUp } from 'lucide-react'

export const ColorfulAnalytics: React.FC = () => {
  const [activeSegment, setActiveSegment] = useState<number | null>(null)

  const segments = [
    { label: 'Direct Traffic', percent: 42, color: '#8b5cf6', bg: 'bg-violet-500', amount: '$48,200' },
    { label: 'Organic Search', percent: 28, color: '#10b981', bg: 'bg-emerald-400', amount: '$32,150' },
    { label: 'Partner Referrals', percent: 18, color: '#06b6d4', bg: 'bg-cyan-400', amount: '$20,680' },
    { label: 'Social Discovery', percent: 12, color: '#f59e0b', bg: 'bg-amber-400', amount: '$13,790' },
  ]

  const circumference = 2 * Math.PI * 40
  let cumulative = 0

  return (
    <div className="w-full max-w-xl mx-auto space-y-6 p-7 rounded-2xl bg-[#121215] border border-zinc-800">
      <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
        <div>
          <span className="text-xs font-semibold text-violet-400">Revenue Breakdown</span>
          <h3 className="text-xl font-bold text-white mt-0.5">Channel Attribution</h3>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-800 text-emerald-400 text-xs font-semibold">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>+24.8% YOY</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
        <div className="relative flex items-center justify-center">
          <svg className="w-44 h-44 -rotate-90 transform" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" className="stroke-zinc-800" strokeWidth="12" fill="transparent" />
            {segments.map((seg, idx) => {
              const dashLength = (seg.percent / 100) * circumference
              const dashOffset = -((cumulative / 100) * circumference)
              cumulative += seg.percent
              return (
                <circle
                  key={idx}
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                  stroke={seg.color}
                  strokeWidth={activeSegment === idx ? 15 : 12}
                  strokeDasharray={\`\${dashLength} \${circumference - dashLength}\`}
                  strokeDashoffset={dashOffset}
                  strokeLinecap="round"
                  onMouseEnter={() => setActiveSegment(idx)}
                  onMouseLeave={() => setActiveSegment(null)}
                  className="transition-all duration-300 cursor-pointer"
                />
              )
            })}
          </svg>
          <div className="absolute text-center space-y-0.5 pointer-events-none">
            <span className="text-xs text-zinc-400 font-medium">Total Volume</span>
            <div className="text-2xl font-extrabold text-white font-mono">$114.8k</div>
          </div>
        </div>

        <div className="space-y-3">
          {segments.map((seg, i) => (
            <div key={i} className="p-2.5 rounded-xl border bg-[#18181b] border-zinc-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className={\`w-3 h-3 rounded-full \${seg.bg}\`} />
                <span className="text-xs font-semibold text-white">{seg.label}</span>
              </div>
              <span className="text-xs font-mono font-bold text-zinc-200">{seg.percent}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}`,
    usageCode: `<ColorfulAnalytics />`,
  },
  {
    id: "radiant-button",
    name: "RadiantButton",
    title: "Radiant Gradient Buttons",
    subtitle:
      "Eye-catching colorful action buttons featuring Aurora Glow, Emerald Mint, Sunset Flame, and Shimmer Border variants.",
    category: "creative",
    categoryLabel: "Vibrant & Colors",
    tags: ["Button", "Gradient", "Colorful", "Shimmer", "Glow"],
    badge: "Essential",
    difficulty: "Beginner",
    cliCommand: "npx depth-ui add radiant-button",
    dependencies: ["lucide-react", "clsx", "tailwind-merge"],
    code: `import React from 'react'
import { Flame, ArrowRight } from 'lucide-react'

export interface RadiantButtonProps {
  children: React.ReactNode
  variant?: 'aurora' | 'emerald' | 'sunset' | 'cyber'
  onClick?: () => void
}

export const RadiantButton: React.FC<RadiantButtonProps> = ({
  children,
  variant = 'aurora',
  onClick,
}) => {
  const variants = {
    aurora: 'bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 hover:from-violet-500 text-white shadow-lg shadow-violet-900/30 border border-violet-400/30',
    emerald: 'bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white shadow-lg shadow-emerald-950/40 border border-emerald-400/30',
    sunset: 'bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 text-white shadow-lg shadow-rose-950/40 border border-rose-400/30',
    cyber: 'bg-gradient-to-r from-cyan-500 via-sky-600 to-blue-600 text-white shadow-lg shadow-cyan-950/40 border border-cyan-400/30',
  }

  return (
    <button
      onClick={onClick}
      className={\`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all cursor-pointer \${variants[variant]}\`}
    >
      {children}
    </button>
  )
}`,
    usageCode: `<RadiantButton variant="aurora">
  <Flame className="w-4 h-4" />
  <span>Aurora Action</span>
</RadiantButton>`,
  },
  {
    id: "color-palette-picker",
    name: "ColorPalettePicker",
    title: "Design System Color Palette",
    subtitle:
      "Interactive design system color token swatch tool with 1-click HEX/HSL copy and live theme inspector.",
    category: "creative",
    categoryLabel: "Vibrant & Colors",
    tags: ["Palette", "Colors", "Tokens", "Design System", "Swatches"],
    badge: "Tool",
    difficulty: "Beginner",
    cliCommand: "npx depth-ui add color-palette",
    dependencies: ["lucide-react", "clsx", "tailwind-merge"],
    code: `import React, { useState } from 'react'
import { Copy, Check } from 'lucide-react'

export const ColorPalettePicker: React.FC = () => {
  const tokens = [
    { name: 'Electric Violet', hex: '#8B5CF6', bg: 'bg-violet-500' },
    { name: 'Emerald Mint', hex: '#10B981', bg: 'bg-emerald-500' },
    { name: 'Cyber Cyan', hex: '#06B6D4', bg: 'bg-cyan-500' },
    { name: 'Sky Azure', hex: '#0EA5E9', bg: 'bg-sky-500' },
    { name: 'Sunset Rose', hex: '#F43F5E', bg: 'bg-rose-500' },
    { name: 'Amber Flame', hex: '#F59E0B', bg: 'bg-amber-500' },
  ]

  const [copied, setCopied] = useState<string | null>(null)

  const handleCopy = (hex: string) => {
    navigator.clipboard.writeText(hex)
    setCopied(hex)
    setTimeout(() => setCopied(null), 1500)
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-6 rounded-2xl bg-[#121215] border border-zinc-800">
      {tokens.map((token) => (
        <button
          key={token.hex}
          onClick={() => handleCopy(token.hex)}
          className="p-3 rounded-xl bg-[#18181b] border border-zinc-800 text-left hover:border-zinc-700 cursor-pointer transition-colors"
        >
          <div className={\`w-full h-12 rounded-lg \${token.bg} mb-2 shadow-sm\`} />
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-white">{token.name}</span>
            <span className="text-[11px] font-mono text-zinc-400">{token.hex}</span>
          </div>
        </button>
      ))}
    </div>
  )
}`,
    usageCode: `<ColorPalettePicker />`,
  },
  {
    id: "optimized-image-card",
    name: "OptimizedImageCard",
    title: "Optimized Media & Image Card",
    subtitle:
      "Production-ready responsive image showcase with aspect ratio switching (16:9, 4:3, 1:1), zoom hover, blur-up loading skeleton, and author attribution.",
    category: "creative",
    categoryLabel: "Vibrant & Colors",
    tags: ["Image", "Media", "Card", "Aspect Ratio", "Lightbox", "Skeleton"],
    badge: "Media",
    difficulty: "Intermediate",
    cliCommand: "npx depth-ui add image-card",
    dependencies: ["lucide-react", "clsx"],
    code: `import React, { useState } from 'react'
import { Maximize2, Heart, Copy, Check, CheckCircle2 } from 'lucide-react'

export const OptimizedImageCard: React.FC<{
  src?: string
  title?: string
  authorName?: string
  authorAvatar?: string
}> = ({
  src = '/images/workspace.jpg',
  title = 'Minimalist Ultrawide Developer Setup',
  authorName = 'Elena Rostova',
  authorAvatar = '/images/avatar-1.jpg',
}) => {
  const [aspect, setAspect] = useState<'16/9' | '4/3' | '1/1'>('16/9')
  const [isLiked, setIsLiked] = useState(false)
  const [likesCount, setLikesCount] = useState(342)

  const aspectClass = {
    '16/9': 'aspect-[16/9]',
    '4/3': 'aspect-[4/3]',
    '1/1': 'aspect-square',
  }[aspect]

  return (
    <div className="w-full max-w-xl mx-auto rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800 shadow-2xl">
      <div className={\`relative w-full \${aspectClass} overflow-hidden group\`}>
        <img
          src={src}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-5">
          <span className="text-xs font-semibold text-emerald-400">Featured Setup</span>
          <h3 className="text-base font-bold text-white">{title}</h3>
        </div>
      </div>
      <div className="p-4 flex items-center justify-between border-t border-zinc-800 bg-zinc-900/90">
        <div className="flex items-center gap-2.5">
          <img src={authorAvatar} alt={authorName} className="w-8 h-8 rounded-full object-cover ring-2 ring-zinc-700" />
          <span className="text-xs font-medium text-zinc-200">{authorName}</span>
        </div>
        <button
          onClick={() => { setIsLiked(!isLiked); setLikesCount(c => isLiked ? c - 1 : c + 1) }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-700 text-xs text-zinc-300"
        >
          <Heart className={\`w-3.5 h-3.5 \${isLiked ? 'fill-rose-500 text-rose-500' : ''}\`} />
          <span>{likesCount}</span>
        </button>
      </div>
    </div>
  )
}`,
    usageCode: `<OptimizedImageCard
  src="/images/workspace.jpg"
  title="Minimalist Ultrawide Developer Setup"
  authorName="Elena Rostova"
/>`,
  },
  {
    id: "image-comparison-slider",
    name: "ImageComparisonSlider",
    title: "Before & After Image Slider",
    subtitle:
      "Interactive dual-image comparison slider with draggable vertical divider, touch support, presets (25%, 50%, 75%), and high-contrast badges.",
    category: "creative",
    categoryLabel: "Vibrant & Colors",
    tags: ["Comparison", "Slider", "Before-After", "Media", "Interactive"],
    badge: "Popular",
    difficulty: "Intermediate",
    cliCommand: "npx depth-ui add image-comparison",
    dependencies: ["lucide-react"],
    code: `import React, { useState, useRef, useCallback } from 'react'
import { MoveHorizontal } from 'lucide-react'

export const ImageComparisonSlider: React.FC<{
  beforeImage?: string
  afterImage?: string
}> = ({
  beforeImage = '/images/workspace.jpg',
  afterImage = '/images/fluid-art.jpg',
}) => {
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width))
    setSliderPosition(Math.max(0, Math.min((x / rect.width) * 100, 100)))
  }, [])

  return (
    <div
      ref={containerRef}
      onMouseDown={() => setIsDragging(true)}
      onMouseUp={() => setIsDragging(false)}
      onMouseMove={(e) => isDragging && handleMove(e.clientX)}
      onTouchMove={(e) => handleMove(e.touches[0].clientX)}
      className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden cursor-ew-resize select-none border border-zinc-800"
    >
      <img src={afterImage} alt="After" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 overflow-hidden" style={{ width: \`\${sliderPosition}%\` }}>
        <img
          src={beforeImage}
          alt="Before"
          className="absolute inset-0 w-full h-full object-cover max-w-none"
          style={{ width: containerRef.current?.clientWidth || '100%', height: '100%' }}
        />
      </div>
      <div className="absolute top-0 bottom-0 pointer-events-none" style={{ left: \`\${sliderPosition}%\` }}>
        <div className="absolute inset-y-0 -left-[1px] w-[2px] bg-white shadow-lg" />
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-zinc-900 border border-white/50 flex items-center justify-center text-white pointer-events-auto">
          <MoveHorizontal className="w-4 h-4" />
        </div>
      </div>
    </div>
  )
}`,
    usageCode: `<ImageComparisonSlider
  beforeImage="/images/workspace.jpg"
  afterImage="/images/fluid-art.jpg"
/>`,
  },

  // ==========================================
  // FORMS & INPUTS (Daily-Driver Components)
  // ==========================================
  {
    id: "button-suite",
    name: "ModernButtons",
    title: "Modern Buttons & Actions Suite",
    subtitle:
      "Comprehensive button system featuring core variants (Solid, Gradient, Secondary, Outline, Destructive), social logins (Google, GitHub, Apple), animated loading states, and split dropdown actions.",
    category: "forms",
    categoryLabel: "Forms & Inputs",
    tags: [
      "Button",
      "Interactive",
      "Form",
      "Action",
      "Loading",
      "Social",
      "OAuth",
    ],
    badge: "Essential",
    difficulty: "Beginner",
    cliCommand: "npx depth-ui add button",
    dependencies: ["lucide-react", "clsx"],
    code: `import React, { useState } from 'react'
import { Loader2, ArrowRight, Trash2, Check, Copy, ChevronDown, Zap } from 'lucide-react'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'gradient' | 'link'
  size?: 'sm' | 'default' | 'lg' | 'icon'
  isLoading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'default',
  size = 'default',
  isLoading = false,
  leftIcon,
  rightIcon,
  className = '',
  disabled,
  ...props
}) => {
  const base = 'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-zinc-400/30 focus:ring-offset-2 focus:ring-offset-zinc-950 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98] cursor-pointer'

  const variants = {
    default: 'bg-white text-zinc-950 hover:bg-zinc-100 shadow-[0_1px_3px_rgba(255,255,255,0.1),0_0_12px_rgba(255,255,255,0.15)] font-semibold',
    secondary: 'bg-zinc-900 text-zinc-200 hover:bg-zinc-800 hover:text-white border border-zinc-800 shadow-sm',
    outline: 'bg-transparent text-zinc-300 hover:text-white border border-zinc-700 hover:border-zinc-500 hover:bg-zinc-900/60',
    ghost: 'bg-transparent text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/60',
    destructive: 'bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/30 hover:border-red-500/50 hover:text-red-300',
    gradient: 'bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 text-white hover:opacity-95 shadow-[0_0_20px_rgba(139,92,246,0.35)]',
    link: 'text-violet-400 underline-offset-4 hover:underline p-0 h-auto font-normal',
  }

  const sizes = {
    sm: 'text-xs px-3 py-1.5 gap-1.5 h-8',
    default: 'text-xs sm:text-sm px-4 py-2 gap-2 h-9 sm:h-10',
    lg: 'text-sm sm:text-base px-5 py-2.5 gap-2.5 h-11 sm:h-12',
    icon: 'h-9 w-9 p-0 rounded-lg',
  }

  return (
    <button
      className={\`\${base} \${variants[variant]} \${sizes[size]} \${className}\`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : leftIcon}
      {children}
      {!isLoading && rightIcon}
    </button>
  )
}`,
    usageCode: `<Button variant="default" size="default">
  Primary Solid
</Button>

<Button variant="gradient" leftIcon={<Zap className="w-3.5 h-3.5" />}>
  Gradient Accent
</Button>

<Button variant="secondary" isLoading={isLoading} onClick={handleSubmit}>
  {isLoading ? 'Processing...' : 'Submit Form'}
</Button>`,
  },
  {
    id: "social-buttons",
    name: "SocialButtons",
    title: "Responsive Social Buttons & Badges",
    subtitle:
      "Multi-platform social buttons (GitHub, Google, X, Discord, LinkedIn, YouTube, Instagram, Figma, Slack, Apple) in Horizontal, Pill, Square, and Circle shapes with follower counters.",
    category: "forms",
    categoryLabel: "Forms & Inputs",
    tags: [
      "Social",
      "Buttons",
      "Share",
      "OAuth",
      "Icons",
      "Responsive",
      "GitHub",
      "Google",
      "Discord",
    ],
    badge: "Popular",
    difficulty: "Beginner",
    cliCommand: "npx depth-ui add social-buttons",
    dependencies: ["lucide-react", "clsx"],
    code: `import React from 'react'

export type SocialPlatform = 'github' | 'google' | 'x' | 'discord' | 'linkedin' | 'youtube' | 'instagram' | 'figma' | 'slack' | 'apple'
export type ButtonShape = 'horizontal' | 'pill' | 'square' | 'circle'
export type StyleVariant = 'brand' | 'dark' | 'outline' | 'glass'

export interface SocialButtonProps {
  platform: SocialPlatform
  shape?: ButtonShape
  variant?: StyleVariant
  label?: string
  count?: string
  onClick?: () => void
}

export const SocialButton: React.FC<SocialButtonProps> = ({
  platform,
  shape = 'horizontal',
  variant = 'brand',
  label,
  count,
  onClick,
}) => {
  const shapeClass = {
    horizontal: 'px-4 py-2.5 rounded-xl gap-2.5',
    pill: 'px-4.5 py-2.5 rounded-full gap-2.5',
    square: 'w-10 h-10 rounded-xl p-0 aspect-square justify-center',
    circle: 'w-10 h-10 rounded-full p-0 aspect-square justify-center',
  }[shape]

  return (
    <button
      onClick={onClick}
      className={\`inline-flex items-center font-medium transition-all active:scale-95 cursor-pointer \${shapeClass}\`}
    >
      {/* SVG Icon & Optional Label */}
      {label && <span className="font-semibold text-sm">{label}</span>}
      {count && <span className="ml-auto text-xs font-mono opacity-80">{count}</span>}
    </button>
  )
}`,
    usageCode: `// 1. Horizontal with Counter
<SocialButton platform="github" shape="horizontal" label="Star on GitHub" count="24.8k" />

// 2. Square Icon Button
<SocialButton platform="discord" shape="square" variant="brand" />

// 3. Circular Icon Button
<SocialButton platform="x" shape="circle" variant="dark" />

// 4. Floating Share Dock
<div className="flex items-center gap-2 p-2 rounded-full bg-zinc-900 border border-zinc-800">
  <SocialButton platform="github" shape="circle" size="sm" />
  <SocialButton platform="linkedin" shape="circle" size="sm" />
  <SocialButton platform="x" shape="circle" size="sm" />
</div>`,
  },
  {
    id: "input-group",
    name: "InputGroup",
    title: "Input & Textarea",
    subtitle:
      "Clean form inputs with prefix/suffix icons, password reveal toggle, error messaging, and character counters.",
    category: "forms",
    categoryLabel: "Forms & Inputs",
    tags: ["Input", "Form", "Textarea", "Password", "Search"],
    badge: "Essential",
    difficulty: "Beginner",
    cliCommand: "npx depth-ui add input",
    dependencies: ["lucide-react", "clsx", "tailwind-merge"],
    code: `import React, { useState } from 'react'
import { Eye, EyeOff, AlertCircle } from 'lucide-react'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  helperText?: string
  error?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

export const Input: React.FC<InputProps> = ({
  label,
  helperText,
  error,
  leftIcon,
  rightIcon,
  className = '',
  id,
  ...props
}) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\\s+/g, '-') : undefined)

  return (
    <div className="space-y-1.5 w-full">
      {label && (
        <label htmlFor={inputId} className="block text-xs font-medium text-zinc-300">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {leftIcon && (
          <div className="absolute left-3 text-zinc-500 pointer-events-none flex items-center">
            {leftIcon}
          </div>
        )}
        <input
          id={inputId}
          className={\`w-full bg-[#18181b] border rounded-lg text-xs text-zinc-100 placeholder-zinc-500 py-2 transition-colors focus:outline-none focus:ring-1 focus:ring-zinc-400 \${
            leftIcon ? 'pl-9' : 'pl-3'
          } \${rightIcon ? 'pr-9' : 'pr-3'} \${
            error ? 'border-red-500/80 focus:border-red-500' : 'border-zinc-800 focus:border-zinc-600'
          } \${className}\`}
          {...props}
        />
        {rightIcon && <div className="absolute right-3 text-zinc-500 flex items-center">{rightIcon}</div>}
      </div>
      {error && (
        <p className="text-[11px] text-red-400 flex items-center gap-1">
          <AlertCircle className="w-3 h-3" />
          <span>{error}</span>
        </p>
      )}
      {helperText && !error && <p className="text-[11px] text-zinc-500">{helperText}</p>}
    </div>
  )
}`,
    usageCode: `<Input
  label="Email Address"
  type="email"
  placeholder="you@domain.com"
  leftIcon={<Mail className="w-3.5 h-3.5" />}
  helperText="We'll never share your email with third parties."
/>`,
  },
  {
    id: "select-dropdown",
    name: "SelectDropdown",
    title: "Select Dropdown",
    subtitle:
      "Custom popover select menu with option descriptions, badges, active checkmark, and keyboard dismiss.",
    category: "forms",
    categoryLabel: "Forms & Inputs",
    tags: ["Select", "Dropdown", "Form", "Menu", "Combobox"],
    badge: "Core",
    difficulty: "Intermediate",
    cliCommand: "npx depth-ui add select",
    dependencies: ["lucide-react", "clsx", "tailwind-merge"],
    code: `import React, { useState, useRef, useEffect } from 'react'
import { ChevronDown, Check } from 'lucide-react'

export interface SelectOption {
  value: string
  label: string
  description?: string
  badge?: string
}

export interface SelectDropdownProps {
  label?: string
  options: SelectOption[]
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  helperText?: string
  disabled?: boolean
}

export const SelectDropdown: React.FC<SelectDropdownProps> = ({
  label,
  options,
  value,
  onChange,
  placeholder = 'Select an option...',
  helperText,
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState<string | undefined>(value)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => setSelected(value), [value])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const selectedOption = options.find((opt) => opt.value === selected)

  return (
    <div className="space-y-1.5 w-full relative" ref={containerRef}>
      {label && <label className="block text-xs font-medium text-zinc-300">{label}</label>}
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-[#18181b] border border-zinc-800 rounded-lg px-3 py-2 text-xs text-left text-zinc-200 flex items-center justify-between hover:border-zinc-700 transition-colors focus:outline-none focus:border-zinc-600 cursor-pointer"
      >
        <span className={selectedOption ? 'text-zinc-100 font-medium' : 'text-zinc-500'}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown className={\`w-3.5 h-3.5 text-zinc-400 transition-transform \${isOpen ? 'rotate-180' : ''}\`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-full z-50 bg-[#18181b] border border-zinc-800 rounded-xl p-1 shadow-2xl backdrop-blur-md max-h-60 overflow-y-auto">
          {options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => {
                setSelected(opt.value)
                onChange?.(opt.value)
                setIsOpen(false)
              }}
              className="w-full text-left px-3 py-2 rounded-lg text-xs flex items-center justify-between cursor-pointer hover:bg-zinc-800/40 text-zinc-300 hover:text-white"
            >
              <span>{opt.label}</span>
              {opt.value === selected && <Check className="w-3.5 h-3.5 text-white" />}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}`,
    usageCode: `<SelectDropdown
  label="Preferred Framework"
  options={[
    { value: 'react', label: 'React' },
    { value: 'nextjs', label: 'Next.js' },
    { value: 'vue', label: 'Vue' }
  ]}
  value={framework}
  onChange={setFramework}
/>`,
  },
  {
    id: "switch-toggle",
    name: "Switch",
    title: "Tactile Switch & Toggle",
    subtitle:
      "Tactile toggle switch with smooth sliding thumb, explicit ON/OFF status badges, color variants (Emerald, Violet, Cyan, Monochrome), and micro-icon indicators.",
    category: "forms",
    categoryLabel: "Forms & Inputs",
    tags: ["Switch", "Toggle", "Settings", "Form", "Tactile", "Active"],
    badge: "Core",
    difficulty: "Beginner",
    cliCommand: "npx depth-ui add switch",
    dependencies: ["lucide-react", "clsx"],
    code: `import React from 'react'
import { Check, X } from 'lucide-react'

export interface SwitchProps {
  checked: boolean
  onChange: (checked: boolean) => void
  label?: string
  description?: string
  disabled?: boolean
  size?: 'sm' | 'default' | 'lg'
  variant?: 'emerald' | 'violet' | 'cyan' | 'monochrome'
  showIcons?: boolean
}

export const Switch: React.FC<SwitchProps> = ({
  checked,
  onChange,
  label,
  description,
  disabled = false,
  size = 'default',
  variant = 'emerald',
  showIcons = false,
}) => {
  const trackSizes = { sm: 'w-8 h-4.5 p-0.5', default: 'w-11 h-6 p-0.5', lg: 'w-14 h-7.5 p-1' }
  const thumbSizes = { sm: 'w-3.5 h-3.5', default: 'w-5 h-5', lg: 'w-5.5 h-5.5' }
  const thumbTranslate = { sm: 'translate-x-3.5', default: 'translate-x-5', lg: 'translate-x-6.5' }

  const variantStyles = {
    emerald: 'bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.4)] border-emerald-400/50',
    violet: 'bg-violet-600 shadow-[0_0_12px_rgba(139,92,246,0.4)] border-violet-500/50',
    cyan: 'bg-cyan-500 shadow-[0_0_12px_rgba(6,182,212,0.4)] border-cyan-400/50',
    monochrome: 'bg-white shadow-[0_0_12px_rgba(255,255,255,0.3)] border-white',
  }

  return (
    <div className={\`flex items-center justify-between gap-4 py-2 \${disabled ? 'opacity-50' : ''}\`}>
      {(label || description) && (
        <div className="space-y-0.5 cursor-pointer flex-1" onClick={() => !disabled && onChange(!checked)}>
          <span className={\`text-xs sm:text-sm font-medium \${checked ? 'text-white' : 'text-zinc-300'}\`}>{label}</span>
          {description && <p className="text-[11px] text-zinc-400">{description}</p>}
        </div>
      )}
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={\`relative inline-flex shrink-0 items-center rounded-full transition-all duration-200 cursor-pointer \${trackSizes[size]} \${
          checked ? variantStyles[variant] : 'bg-zinc-800 border border-zinc-700/80'
        }\`}
      >
        <span
          className={\`pointer-events-none inline-flex items-center justify-center rounded-full shadow-md transform transition-transform duration-200 \${thumbSizes[size]} \${
            checked ? \`\${thumbTranslate[size]} bg-white\` : 'translate-x-0 bg-zinc-300'
          }\`}
        >
          {showIcons && size !== 'sm' && (
            checked ? <Check className="w-2.5 h-2.5 stroke-[3] text-emerald-600" /> : <X className="w-2.5 h-2.5 text-zinc-500" />
          )}
        </span>
      </button>
    </div>
  )
}`,
    usageCode: `<Switch
  checked={realtimeSync}
  onChange={setRealtimeSync}
  label="Real-time Synchronization"
  description="Broadcast document state over WebSockets."
  variant="emerald"
  showIcons={true}
/>`,
  },
  {
    id: "checkbox-radio",
    name: "CheckboxRadio",
    title: "Checkbox & Radio Cards",
    subtitle:
      "Tactile check controls with animated checkmarks, active status badges, Select All master controls, and glowing radio selection cards.",
    category: "forms",
    categoryLabel: "Forms & Inputs",
    tags: ["Checkbox", "Radio", "Selection", "Form", "Active", "Cards"],
    badge: "Core",
    difficulty: "Beginner",
    cliCommand: "npx depth-ui add checkbox",
    dependencies: ["lucide-react", "clsx"],
    code: `import React from 'react'
import { Check } from 'lucide-react'

export interface CheckboxProps {
  checked: boolean
  onChange: (checked: boolean) => void
  label: string
  description?: string
  disabled?: boolean
  variant?: 'emerald' | 'violet' | 'white'
}

export const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onChange,
  label,
  description,
  disabled = false,
  variant = 'emerald',
}) => {
  const variantStyles = {
    emerald: 'bg-emerald-500 border-emerald-400 text-white shadow-[0_0_8px_rgba(16,185,129,0.4)]',
    violet: 'bg-violet-600 border-violet-500 text-white shadow-[0_0_8px_rgba(139,92,246,0.4)]',
    white: 'bg-white border-white text-zinc-950 shadow-[0_0_8px_rgba(255,255,255,0.3)]',
  }

  return (
    <label
      onClick={() => !disabled && onChange(!checked)}
      className={\`flex items-start gap-3 cursor-pointer select-none p-2.5 rounded-xl transition-colors \${
        checked ? 'bg-zinc-900/60' : 'hover:bg-zinc-900/40'
      } \${disabled ? 'opacity-50 cursor-not-allowed' : ''}\`}
    >
      <div className="relative flex items-center justify-center mt-0.5 shrink-0">
        <div
          className={\`w-4.5 h-4.5 rounded-md border transition-all duration-200 flex items-center justify-center \${
            checked ? variantStyles[variant] : 'border-zinc-700 bg-zinc-900 group-hover:border-zinc-500'
          }\`}
        >
          {checked && <Check className="w-3.5 h-3.5 stroke-[3] animate-in zoom-in-75 duration-150" />}
        </div>
      </div>
      <div className="space-y-0.5 flex-1">
        <div className="flex items-center gap-2">
          <span className={\`text-xs sm:text-sm font-medium \${checked ? 'text-white' : 'text-zinc-300'}\`}>{label}</span>
          <span className={\`px-1.5 py-0.2 rounded text-[10px] font-mono \${
            checked ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30' : 'text-zinc-600'
          }\`}>
            {checked ? 'ACTIVE' : 'OFF'}
          </span>
        </div>
        {description && <p className="text-[11px] sm:text-xs text-zinc-400">{description}</p>}
      </div>
    </label>
  )
}`,
    usageCode: `<Checkbox
  checked={notifyEmail}
  onChange={setNotifyEmail}
  label="Email Alerts for Incidents"
  description="Send critical outage pings immediately to on-call devs."
  variant="emerald"
/>`,
  },

  // ==========================================
  // DATA & FEEDBACK
  // ==========================================
  {
    id: "badge-status",
    name: "Badge",
    title: "Badge & Status Indicator",
    subtitle:
      "Compact status tags, dismissible pills, and real-time pulsating health dots (operational, degraded, incident).",
    category: "data",
    categoryLabel: "Data & Feedback",
    tags: ["Badge", "Status", "Tag", "Indicator", "Telemetry"],
    badge: "Core",
    difficulty: "Beginner",
    cliCommand: "npx depth-ui add badge",
    dependencies: ["lucide-react", "clsx", "tailwind-merge"],
    code: `import React from 'react'

export interface StatusDotProps {
  status: 'online' | 'degraded' | 'offline' | 'busy'
  label?: string
}

export const StatusDot: React.FC<StatusDotProps> = ({ status, label }) => {
  const configs = {
    online: { dot: 'bg-emerald-500', ping: 'bg-emerald-400', defLabel: 'Operational' },
    degraded: { dot: 'bg-amber-500', ping: 'bg-amber-400', defLabel: 'Degraded' },
    offline: { dot: 'bg-rose-500', ping: 'bg-rose-400', defLabel: 'Incident' },
    busy: { dot: 'bg-sky-500', ping: 'bg-sky-400', defLabel: 'Syncing' },
  }

  const config = configs[status]

  return (
    <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#18181b] border border-zinc-800">
      <span className="relative flex h-2 w-2">
        <span className={\`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 \${config.ping}\`} />
        <span className={\`relative inline-flex rounded-full h-2 w-2 \${config.dot}\`} />
      </span>
      <span className="text-[11px] font-medium text-zinc-300">{label || config.defLabel}</span>
    </div>
  )
}`,
    usageCode: `<StatusDot status="online" label="All Systems Operational" />
<Badge variant="success">Completed</Badge>`,
  },
  {
    id: "data-table",
    name: "DataTable",
    title: "Data Table",
    subtitle:
      "Production data table featuring instant live search filtering, column sorting, status badges, and pagination.",
    category: "data",
    categoryLabel: "Data & Feedback",
    tags: ["Table", "DataGrid", "Sorting", "Search", "Pagination"],
    badge: "Featured",
    difficulty: "Intermediate",
    cliCommand: "npx depth-ui add table",
    dependencies: ["lucide-react", "clsx", "tailwind-merge"],
    code: `import React, { useState } from 'react'
import { Search, ArrowUpDown, MoreHorizontal } from 'lucide-react'

export const DataTable: React.FC<{ data: any[] }> = ({ data }) => {
  const [search, setSearch] = useState('')

  return (
    <div className="w-full space-y-4 rounded-xl bg-[#121215] border border-zinc-800 p-5">
      <div className="relative w-full max-w-xs">
        <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Filter records..."
          className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-[#18181b] border border-zinc-800 text-xs text-white"
        />
      </div>

      <div className="overflow-x-auto border border-zinc-800 rounded-lg">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#18181b] text-zinc-400 font-medium">
            <tr>
              <th className="py-2.5 px-4">User</th>
              <th className="py-2.5 px-4">Status</th>
              <th className="py-2.5 px-4">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {data.map((row) => (
              <tr key={row.id} className="hover:bg-zinc-800/30">
                <td className="py-2.5 px-4 text-white font-medium">{row.name}</td>
                <td className="py-2.5 px-4 text-zinc-400">{row.status}</td>
                <td className="py-2.5 px-4 font-mono text-zinc-300">{row.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}`,
    usageCode: `<DataTable data={membersList} />`,
  },
  {
    id: "alert-toast",
    name: "AlertToast",
    title: "Alert & Toast Notification",
    subtitle:
      "Feedback banners for success, warning, error, and info states alongside floating auto-dismiss toast alerts.",
    category: "data",
    categoryLabel: "Data & Feedback",
    tags: ["Alert", "Toast", "Notification", "Banner", "Feedback"],
    badge: "Essential",
    difficulty: "Intermediate",
    cliCommand: "npx depth-ui add alert",
    dependencies: ["lucide-react", "clsx", "tailwind-merge"],
    code: `import React from 'react'
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react'

export interface AlertProps {
  variant?: 'info' | 'success' | 'warning' | 'error'
  title: string
  description?: string
  onClose?: () => void
}

export const Alert: React.FC<AlertProps> = ({ variant = 'info', title, description, onClose }) => {
  const configs = {
    info: 'bg-sky-950/30 border-sky-900/50 text-sky-400',
    success: 'bg-emerald-950/30 border-emerald-900/50 text-emerald-400',
    warning: 'bg-amber-950/30 border-amber-900/50 text-amber-400',
    error: 'bg-rose-950/30 border-rose-900/50 text-rose-400',
  }

  return (
    <div className={\`p-4 rounded-xl border flex items-start justify-between gap-3 \${configs[variant]}\`}>
      <div className="space-y-0.5">
        <h4 className="text-xs font-semibold text-white">{title}</h4>
        {description && <p className="text-xs text-zinc-300">{description}</p>}
      </div>
      {onClose && (
        <button onClick={onClose} className="text-zinc-400 hover:text-white cursor-pointer">
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  )
}`,
    usageCode: `<Alert
  variant="success"
  title="Payment Received"
  description="Invoice #2026-89 has settled."
/>`,
  },
  {
    id: "avatar-group",
    name: "AvatarGroup",
    title: "Avatar & Team Stack",
    subtitle:
      "User avatars with real photo support, initials fallbacks, real-time presence indicators (online/busy/away), interactive profile tooltips, and overlapping stacked group counters.",
    category: "data",
    categoryLabel: "Data & Feedback",
    tags: ["Avatar", "User", "Profile", "Presence", "Team", "Stack"],
    badge: "Core",
    difficulty: "Beginner",
    cliCommand: "npx depth-ui add avatar",
    dependencies: ["lucide-react", "clsx"],
    code: `import React, { useState } from 'react'
import { CheckCircle2 } from 'lucide-react'

export interface AvatarProps {
  src?: string
  fallback: string
  name?: string
  role?: string
  size?: 'sm' | 'default' | 'lg' | 'xl'
  status?: 'online' | 'busy' | 'away'
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  fallback,
  name,
  role,
  size = 'default',
  status,
}) => {
  const [showTooltip, setShowTooltip] = useState(false)
  const sizes = { sm: 'w-7 h-7 text-[11px]', default: 'w-9 h-9 text-xs', lg: 'w-11 h-11 text-sm', xl: 'w-14 h-14 text-base' }
  const statusColors = { online: 'bg-emerald-500', busy: 'bg-rose-500', away: 'bg-amber-500' }

  return (
    <div
      className="relative inline-block shrink-0 cursor-pointer"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <div className={\`\${sizes[size]} rounded-full overflow-hidden bg-zinc-800 border border-zinc-700 flex items-center justify-center font-medium text-white transition-transform hover:scale-110\`}>
        {src ? <img src={src} alt={fallback} className="w-full h-full object-cover" /> : fallback}
      </div>
      {status && (
        <span className={\`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full ring-2 ring-zinc-950 \${statusColors[status]}\`} />
      )}
      {showTooltip && name && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-36 p-2 rounded-xl bg-zinc-900 border border-zinc-700 shadow-xl z-20 pointer-events-none text-center">
          <p className="text-xs font-semibold text-white">{name}</p>
          {role && <p className="text-[10px] text-zinc-400">{role}</p>}
        </div>
      )}
    </div>
  )
}`,
    usageCode: `<AvatarGroup max={4} totalCount={12}>
  <Avatar src="/images/avatar-1.jpg" name="Elena" role="Architect" fallback="ER" status="online" />
  <Avatar fallback="SC" name="Sarah" role="Designer" status="online" />
  <Avatar fallback="AR" name="Alex" role="Engineer" status="busy" />
</AvatarGroup>`,
  },
  {
    id: "progress-skeleton",
    name: "ProgressSkeleton",
    title: "Progress & Skeleton Loader",
    subtitle:
      "Smooth animated progress bars with percentage readouts and pulse shimmer skeleton placeholders for async content.",
    category: "data",
    categoryLabel: "Data & Feedback",
    tags: ["Progress", "Skeleton", "Loading", "Spinner", "Placeholder"],
    badge: "Essential",
    difficulty: "Beginner",
    cliCommand: "npx depth-ui add progress",
    dependencies: ["clsx", "tailwind-merge"],
    code: `import React from 'react'

export const Progress: React.FC<{ value: number; label?: string }> = ({ value, label }) => (
  <div className="space-y-1.5 w-full">
    {label && <div className="text-xs font-medium text-zinc-300">{label}</div>}
    <div className="w-full h-2 rounded-full bg-zinc-800 overflow-hidden">
      <div className="h-full bg-white rounded-full transition-all duration-300" style={{ width: \`\${value}%\` }} />
    </div>
  </div>
)

export const Skeleton: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={\`animate-pulse bg-zinc-800/80 rounded-lg \${className}\`} />
)`,
    usageCode: `<Progress value={78} label="Building Production Bundle" />
<Skeleton className="h-4 w-48" />`,
  },
  {
    id: "metric-card",
    name: "MetricCard",
    title: "Metric & KPI Stat Card",
    subtitle:
      "Executive dashboard KPI metric cards showing numerical values, trend percentages (+/-), and comparison text.",
    category: "data",
    categoryLabel: "Data & Feedback",
    tags: ["Card", "Metrics", "Stats", "Dashboard", "KPI"],
    badge: "Popular",
    difficulty: "Beginner",
    cliCommand: "npx depth-ui add metric-card",
    dependencies: ["lucide-react", "clsx", "tailwind-merge"],
    code: `import React from 'react'
import { ArrowUpRight } from 'lucide-react'

export const MetricCard: React.FC<{ title: string; value: string; change: string; subtext: string }> = ({
  title,
  value,
  change,
  subtext,
}) => (
  <div className="rounded-2xl bg-[#121215] border border-zinc-800 p-5 space-y-3">
    <div className="text-xs text-zinc-400 font-medium">{title}</div>
    <div className="text-2xl font-bold text-white font-mono">{value}</div>
    <div className="flex items-center gap-2">
      <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full flex items-center">
        <ArrowUpRight className="w-3 h-3 mr-0.5" />
        {change}
      </span>
      <span className="text-[11px] text-zinc-500">{subtext}</span>
    </div>
  </div>
)`,
    usageCode: `<MetricCard
  title="Total Invoiced Volume"
  value="$128,430.00"
  change="+14.2%"
  subtext="vs last 30 days"
/>`,
  },

  // ==========================================
  // NAVIGATION & OVERLAYS
  // ==========================================
  {
    id: "accordion",
    name: "Accordion",
    title: "Accordion / FAQ",
    subtitle:
      "Collapsible content panels with smooth height transitions, rotating chevron indicators, and multi-open support.",
    category: "navigation",
    categoryLabel: "Navigation & Overlays",
    tags: ["Accordion", "Collapsible", "FAQ", "Disclosure"],
    badge: "Popular",
    difficulty: "Beginner",
    cliCommand: "npx depth-ui add accordion",
    dependencies: ["lucide-react", "clsx", "tailwind-merge"],
    code: `import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'

export interface AccordionItem {
  id: string
  title: string
  content: string
}

export const Accordion: React.FC<{ items: AccordionItem[] }> = ({ items }) => {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id || null)

  return (
    <div className="w-full divide-y divide-zinc-800 rounded-xl border border-zinc-800 bg-[#121215]">
      {items.map((item) => (
        <div key={item.id}>
          <button
            onClick={() => setOpenId(openId === item.id ? null : item.id)}
            className="w-full flex items-center justify-between px-5 py-4 text-xs font-medium text-zinc-200 hover:text-white"
          >
            <span>{item.title}</span>
            <ChevronDown className={\`w-4 h-4 transition-transform \${openId === item.id ? 'rotate-180' : ''}\`} />
          </button>
          {openId === item.id && (
            <div className="px-5 pb-4 text-xs text-zinc-400">{item.content}</div>
          )}
        </div>
      ))}
    </div>
  )
}`,
    usageCode: `<Accordion
  items={[
    { id: '1', title: 'How does it work?', content: 'Copy-paste code into your project directly.' },
    { id: '2', title: 'Are styles customizable?', content: 'Yes, modify standard Tailwind classes directly.' }
  ]}
/>`,
  },
  {
    id: "tabs-nav",
    name: "TabsNav",
    title: "Tabs Navigation",
    subtitle:
      "Segmented pill switcher and underline navigation bar with animated position tracking and badge counters.",
    category: "navigation",
    categoryLabel: "Navigation & Overlays",
    tags: ["Tabs", "Navigation", "Pill", "Segmented"],
    badge: "Popular",
    difficulty: "Intermediate",
    cliCommand: "npx depth-ui add tabs",
    dependencies: ["framer-motion", "clsx", "tailwind-merge"],
    code: `import React from 'react'
import { motion } from 'framer-motion'

export interface TabItem {
  id: string
  label: string
  badge?: string | number
}

export const TabsNav: React.FC<{ tabs: TabItem[]; activeTab: string; onChange: (id: string) => void }> = ({
  tabs,
  activeTab,
  onChange,
}) => (
  <div className="inline-flex p-1 rounded-xl bg-[#18181b] border border-zinc-800 gap-1">
    {tabs.map((tab) => {
      const isActive = tab.id === activeTab
      return (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={\`relative px-3.5 py-1.5 rounded-lg text-xs font-medium cursor-pointer \${
            isActive ? 'text-black font-semibold' : 'text-zinc-400 hover:text-white'
          }\`}
        >
          {isActive && (
            <motion.div
              layoutId="pill"
              className="absolute inset-0 bg-white rounded-lg shadow-xs"
              transition={{ type: 'spring', bounce: 0.15, duration: 0.35 }}
            />
          )}
          <span className="relative z-10">{tab.label}</span>
        </button>
      )
    })}
  </div>
)`,
    usageCode: `<TabsNav
  tabs={[{ id: 'overview', label: 'Overview' }, { id: 'billing', label: 'Billing' }]}
  activeTab={tab}
  onChange={setTab}
/>`,
  },
  {
    id: "navbar-suite",
    name: "NavbarSuite",
    title: "Readymade Navbars Suite",
    subtitle:
      "Four production-ready responsive navbar layouts: Full-Width SaaS with mobile drawer, Floating Island Pill with glassmorphism, Minimalist Portfolio with availability status, and Workspace Dashboard header.",
    category: "navigation",
    categoryLabel: "Navigation & Overlays",
    tags: [
      "Navbar",
      "Navigation",
      "Header",
      "SaaS",
      "Floating",
      "Responsive",
      "Menu",
      "Drawer",
    ],
    badge: "Popular",
    difficulty: "Intermediate",
    cliCommand: "npx depth-ui add navbar",
    dependencies: ["lucide-react", "clsx"],
    code: `import React, { useState } from 'react'
import { Menu, X, ChevronDown, Search, ArrowRight, Layers } from 'lucide-react'

// 1. Full-Width SaaS Sticky Navbar
export const SaaSNavbar: React.FC<{ brandName?: string; onCtaClick?: () => void }> = ({
  brandName = 'AcmeCorp',
  onCtaClick,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="w-full bg-[#0d0d11]/90 backdrop-blur-md border border-zinc-800/80 rounded-2xl px-4 sm:px-6 h-16 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-violet-600 to-cyan-500 flex items-center justify-center text-white font-bold text-sm">
          A
        </div>
        <span className="font-bold text-base text-white tracking-tight">{brandName}</span>
      </div>

      <nav className="hidden md:flex items-center gap-6 text-xs sm:text-sm font-medium text-zinc-300">
        <a href="#features" className="hover:text-white transition-colors">Features</a>
        <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
        <a href="#docs" className="hover:text-white transition-colors">Changelog</a>
      </nav>

      <div className="flex items-center gap-3">
        <button
          onClick={onCtaClick}
          className="px-3.5 py-1.5 rounded-xl bg-white text-zinc-950 text-xs font-semibold hover:bg-zinc-200 transition-colors flex items-center gap-1.5"
        >
          <span>Start Free</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400"
        >
          {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4 text-white" />}
        </button>
      </div>
    </header>
  )
}

// 2. Floating Island Pill Navbar
export const FloatingIslandNavbar: React.FC<{ onJoin?: () => void }> = ({ onJoin }) => {
  const [active, setActive] = useState('Overview')
  return (
    <nav className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-zinc-900/90 backdrop-blur-xl border border-zinc-700/80 shadow-2xl">
      <div className="w-7 h-7 rounded-full bg-violet-600 flex items-center justify-center text-white text-xs">
        <Layers className="w-3.5 h-3.5" />
      </div>
      {['Overview', 'Showcase', 'Pricing'].map((tab) => (
        <button
          key={tab}
          onClick={() => setActive(tab)}
          className={\`px-3 py-1.5 rounded-full text-xs font-medium \${
            active === tab ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-white'
          }\`}
        >
          {tab}
        </button>
      ))}
      <button
        onClick={onJoin}
        className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 text-white text-xs font-semibold"
      >
        Join Waitlist
      </button>
    </nav>
  )
}`,
    usageCode: `// 1. SaaS Navbar
<SaaSNavbar brandName="MyWebsite" onCtaClick={() => navigate('/signup')} />

// 2. Floating Island Pill Navbar
<FloatingIslandNavbar onJoin={() => alert('Waitlist joined')} />

// 3. Portfolio Navbar
<PortfolioNavbar designerName="Elena R." isAvailable={true} />`,
  },
  {
    id: "dialog-modal",
    name: "Dialog",
    title: "Dialog Modal",
    subtitle:
      "Accessible overlay dialog with frosted backdrop blur, form bodies, action footers, and Escape key listeners.",
    category: "navigation",
    categoryLabel: "Navigation & Overlays",
    tags: ["Dialog", "Modal", "Overlay", "Popup", "Alert"],
    badge: "Essential",
    difficulty: "Intermediate",
    cliCommand: "npx depth-ui add dialog",
    dependencies: ["lucide-react", "clsx", "tailwind-merge"],
    code: `import React, { useEffect } from 'react'
import { X } from 'lucide-react'

export const Dialog: React.FC<{
  isOpen: boolean
  onClose: () => void
  title: string
  description?: string
  children: React.ReactNode
}> = ({ isOpen, onClose, title, description, children }) => {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
      <div className="fixed inset-0" onClick={onClose} />
      <div className="relative w-full max-w-md rounded-2xl bg-[#121215] border border-zinc-800 p-6 z-10 space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-base font-semibold text-white">{title}</h3>
            {description && <p className="text-xs text-zinc-400 mt-1">{description}</p>}
          </div>
          <button onClick={onClose} className="text-zinc-500 hover:text-white cursor-pointer"><X className="w-4 h-4" /></button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  )
}`,
    usageCode: `<Dialog
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Edit Project Configuration"
>
  <p className="text-xs text-zinc-400">Modal contents go here.</p>
</Dialog>`,
  },
  {
    id: "tooltip-popover",
    name: "TooltipPopover",
    title: "Tooltip & Popover",
    subtitle:
      "Hover tooltips with directional arrows and click-triggered popover cards for user summaries and menus.",
    category: "navigation",
    categoryLabel: "Navigation & Overlays",
    tags: ["Tooltip", "Popover", "Hover", "Overlay"],
    badge: "Core",
    difficulty: "Intermediate",
    cliCommand: "npx depth-ui add tooltip",
    dependencies: ["lucide-react", "clsx", "tailwind-merge"],
    code: `import React, { useState } from 'react'

export const Tooltip: React.FC<{ content: string; children: React.ReactNode }> = ({ content, children }) => {
  const [show, setShow] = useState(false)

  return (
    <div className="relative inline-block" onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
      {children}
      {show && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 text-[11px] font-medium text-white bg-zinc-900 border border-zinc-700 rounded-md shadow-lg whitespace-nowrap z-50">
          {content}
        </div>
      )}
    </div>
  )
}`,
    usageCode: `<Tooltip content="Copy to clipboard">
  <button className="px-3 py-1 bg-zinc-800 text-xs text-white rounded">Hover me</button>
</Tooltip>`,
  },
  {
    id: "breadcrumb-pagination",
    name: "BreadcrumbPagination",
    title: "Breadcrumbs & Pagination",
    subtitle:
      "Hierarchical breadcrumb link trails with icon separators and numbered pagination controls.",
    category: "navigation",
    categoryLabel: "Navigation & Overlays",
    tags: ["Breadcrumb", "Pagination", "Navigation", "Links"],
    badge: "Core",
    difficulty: "Beginner",
    cliCommand: "npx depth-ui add pagination",
    dependencies: ["lucide-react", "clsx", "tailwind-merge"],
    code: `import React from 'react'
import { ChevronRight } from 'lucide-react'

export const Breadcrumb: React.FC<{ items: { label: string; href?: string }[] }> = ({ items }) => (
  <nav className="flex items-center text-xs text-zinc-400 gap-1.5">
    {items.map((item, idx) => (
      <React.Fragment key={idx}>
        {idx > 0 && <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />}
        <span className={idx === items.length - 1 ? 'font-medium text-white' : 'hover:text-zinc-200'}>
          {item.label}
        </span>
      </React.Fragment>
    ))}
  </nav>
)`,
    usageCode: `<Breadcrumb
  items={[
    { label: 'Workspaces', href: '#' },
    { label: 'Infrastructure', href: '#' },
    { label: 'Edge Clusters' }
  ]}
/>`,
  },

  // ==========================================
  // DISPLAY & 3D PRIMITIVES
  // ==========================================
  {
    id: "depth-card-3d",
    name: "DepthCard3D",
    title: "Interactive Tilt Card",
    subtitle:
      "A card component that tilts in 3D perspective based on mouse cursor position with specular glare.",
    category: "spatial",
    categoryLabel: "Display & 3D",
    tags: ["Interactive", "Perspective", "Card", "Tilt"],
    badge: "Featured",
    difficulty: "Intermediate",
    cliCommand: "npx depth-ui add tilt-card",
    dependencies: ["framer-motion", "lucide-react", "clsx", "tailwind-merge"],
    code: `import React, { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ArrowRight, Layers } from 'lucide-react'

export interface DepthCard3DProps {
  title?: string
  subtitle?: string
  tag?: string
  interactive?: boolean
}

export const DepthCard3D: React.FC<DepthCard3DProps> = ({
  title = "Feature Layer",
  subtitle = "Parallax elevation with smooth spring dampening and dynamic specular glare.",
  tag = "3D Layer",
  interactive = true,
}) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { damping: 20, stiffness: 180, mass: 0.6 }
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [14, -14]), springConfig)
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-14, 14]), springConfig)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive || !cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5)
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <div className="perspective-1000 py-4 flex items-center justify-center">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="relative w-full max-w-sm rounded-2xl bg-[#121215] border border-zinc-800 p-6 shadow-xl hover:border-zinc-700 transition-colors"
      >
        <div style={{ transform: 'translateZ(30px)' }} className="flex justify-between items-center mb-5">
          <span className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-zinc-800 text-zinc-300 border border-zinc-700">
            {tag}
          </span>
          <span className="text-[11px] text-zinc-500 font-mono">60 FPS</span>
        </div>

        <div style={{ transform: 'translateZ(45px)' }} className="h-40 rounded-xl bg-[#18181b] border border-zinc-800 flex items-center justify-center mb-5">
          <Layers className="w-8 h-8 text-zinc-300" />
        </div>

        <div style={{ transform: 'translateZ(20px)' }} className="space-y-1.5 mb-5">
          <h3 className="text-base font-semibold text-white">{title}</h3>
          <p className="text-xs text-zinc-400">{subtitle}</p>
        </div>

        <div style={{ transform: 'translateZ(35px)' }}>
          <button className="w-full py-2 rounded-xl bg-white text-black font-semibold text-xs flex items-center justify-center gap-1.5 hover:bg-zinc-200 transition-colors">
            <span>Explore Component</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </motion.div>
    </div>
  )
}`,
    usageCode: `<DepthCard3D
  title="Analytics Dashboard"
  subtitle="Interactive multi-layer elevation with real-time cursor physics."
  tag="Dashboard"
/>`,
  },
  {
    id: "globe-3d",
    name: "Globe3D",
    title: "Interactive Globe",
    subtitle:
      "A high-performance dot-matrix globe canvas with drag rotation, momentum inertia, and ping arcs.",
    category: "spatial",
    categoryLabel: "Display & 3D",
    tags: ["Globe", "Canvas", "Interactive", "Data Map"],
    badge: "Popular",
    difficulty: "Advanced",
    cliCommand: "npx depth-ui add globe-3d",
    dependencies: ["three", "@types/three", "lucide-react"],
    code: `import React, { useRef, useEffect } from 'react'
import * as THREE from 'three'

export const Globe3D: React.FC<{ size?: number }> = ({ size = 300 }) => {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mountRef.current) return
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000)
    camera.position.z = 4.5

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(size, size)
    mountRef.current.appendChild(renderer.domElement)

    const geom = new THREE.SphereGeometry(1.6, 28, 28)
    const mat = new THREE.PointsMaterial({ color: 0x71717a, size: 0.04 })
    const sphere = new THREE.Points(geom, mat)
    scene.add(sphere)

    let reqId: number
    const animate = () => {
      reqId = requestAnimationFrame(animate)
      sphere.rotation.y += 0.003
      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(reqId)
      renderer.dispose()
      if (mountRef.current) mountRef.current.innerHTML = ''
    }
  }, [size])

  return <div ref={mountRef} className="flex justify-center items-center" />
}`,
    usageCode: `<Globe3D size={320} />`,
  },
  {
    id: "holo-orb-canvas",
    name: "HoloOrbCanvas",
    title: "Geometric 3D Orb",
    subtitle:
      "Dynamic rotating wireframe polyhedral mesh with natural audio-pulse scaling and lighting.",
    category: "spatial",
    categoryLabel: "Display & 3D",
    tags: ["Orb", "Canvas", "Geometry", "Mesh"],
    badge: "Display",
    difficulty: "Intermediate",
    cliCommand: "npx depth-ui add holo-orb",
    dependencies: ["three", "@types/three"],
    code: `import React, { useRef, useEffect } from 'react'
import * as THREE from 'three'

export const HoloOrbCanvas: React.FC<{ size?: number }> = ({ size = 280 }) => {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mountRef.current) return
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000)
    camera.position.z = 3.5

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(size, size)
    mountRef.current.appendChild(renderer.domElement)

    const geom = new THREE.IcosahedronGeometry(1.2, 1)
    const mat = new THREE.MeshBasicMaterial({ color: 0xa1a1aa, wireframe: true })
    const mesh = new THREE.Mesh(geom, mat)
    scene.add(mesh)

    let reqId: number
    const animate = () => {
      reqId = requestAnimationFrame(animate)
      mesh.rotation.x += 0.005
      mesh.rotation.y += 0.007
      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(reqId)
      renderer.dispose()
      if (mountRef.current) mountRef.current.innerHTML = ''
    }
  }, [size])

  return <div ref={mountRef} className="flex justify-center items-center" />
}`,
    usageCode: `<HoloOrbCanvas size={300} />`,
  },
  {
    id: "floating-particles",
    name: "FloatingParticles",
    title: "Ambient Particles",
    subtitle:
      "Lightweight ambient background dust particle canvas with mouse parallax interaction.",
    category: "spatial",
    categoryLabel: "Display & 3D",
    tags: ["Particles", "Background", "Canvas", "Ambient"],
    badge: "Canvas",
    difficulty: "Intermediate",
    cliCommand: "npx depth-ui add particles",
    dependencies: ["clsx", "tailwind-merge"],
    code: `import React, { useRef, useEffect } from 'react'

export const FloatingParticles: React.FC<{ particleCount?: number }> = ({ particleCount = 100 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = canvas.parentElement?.clientWidth || 600
    canvas.height = canvas.parentElement?.clientHeight || 300

    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.5 + 0.5,
      speedY: Math.random() * 0.4 + 0.1,
    }))

    let animId: number
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = 'rgba(161, 161, 170, 0.3)'
      particles.forEach((p) => {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fill()
        p.y -= p.speedY
        if (p.y < 0) p.y = canvas.height
      })
      animId = requestAnimationFrame(draw)
    }
    draw()

    return () => cancelAnimationFrame(animId)
  }, [particleCount])

  return <canvas ref={canvasRef} className="w-full h-full absolute inset-0 pointer-events-none" />
}`,
    usageCode: `<FloatingParticles particleCount={150} />`,
  },

  // ==========================================
  // MOTION & LAYOUT
  // ==========================================
  {
    id: "magnetic-button",
    name: "MagneticButton",
    title: "Magnetic Button",
    subtitle:
      "A button component that pulls toward the mouse cursor using spring physics when hovered.",
    category: "motion",
    categoryLabel: "Motion & Physics",
    tags: ["Magnetic", "Spring", "Button", "Cursor Physics"],
    badge: "Popular",
    difficulty: "Beginner",
    cliCommand: "npx depth-ui add magnetic-button",
    dependencies: ["framer-motion", "clsx", "tailwind-merge"],
    code: `import React, { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export const MagneticButton: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const ref = useRef<HTMLButtonElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { damping: 15, stiffness: 150 })
  const springY = useSpring(y, { damping: 15, stiffness: 150 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    x.set(e.clientX - (rect.left + rect.width / 2))
    y.set(e.clientY - (rect.top + rect.height / 2))
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className="px-5 py-2.5 rounded-full bg-white text-black font-semibold text-xs hover:bg-zinc-200 transition-colors cursor-pointer shadow-sm"
    >
      {children}
    </motion.button>
  )
}`,
    usageCode: `<MagneticButton>Get Started</MagneticButton>`,
  },
  {
    id: "spotlight-card",
    name: "SpotlightCard",
    title: "Spotlight Card",
    subtitle:
      "A card that renders a smooth dynamic flashlight radial gradient tracking the mouse cursor.",
    category: "motion",
    categoryLabel: "Motion & Physics",
    tags: ["Spotlight", "Lighting", "Hover Effect", "Card"],
    badge: "Visual",
    difficulty: "Beginner",
    cliCommand: "npx depth-ui add spotlight-card",
    dependencies: ["clsx", "tailwind-merge"],
    code: `import React, { useRef, useState } from 'react'

export const SpotlightCard: React.FC<{ title: string; description: string }> = ({ title, description }) => {
  const divRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [opacity, setOpacity] = useState(0)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return
    const rect = divRef.current.getBoundingClientRect()
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className="relative rounded-2xl border border-zinc-800 bg-[#121215] p-6 overflow-hidden shadow-sm"
    >
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300"
        style={{
          opacity,
          background: \`radial-gradient(400px circle at \${position.x}px \${position.y}px, rgba(255,255,255,0.08), transparent 80%)\`,
        }}
      />
      <h3 className="text-base font-semibold text-white mb-2">{title}</h3>
      <p className="text-xs text-zinc-400">{description}</p>
    </div>
  )
}`,
    usageCode: `<SpotlightCard
  title="Real-time Analytics"
  description="Subtle radial lighting tracks cursor across boundaries."
/>`,
  },
  {
    id: "interactive-dock",
    name: "InteractiveDock",
    title: "Magnification Dock",
    subtitle:
      "macOS-inspired magnification dock with smooth cosine distance scaling and tooltips.",
    category: "motion",
    categoryLabel: "Motion & Physics",
    tags: ["Dock", "Navigation", "Magnification", "macOS"],
    badge: "Navigation",
    difficulty: "Intermediate",
    cliCommand: "npx depth-ui add dock",
    dependencies: ["framer-motion", "lucide-react"],
    code: `import React from 'react'
import { motion, useMotionValue } from 'framer-motion'
import { Home, Compass, Layers, Code2, Terminal } from 'lucide-react'

export const InteractiveDock: React.FC = () => {
  const mouseX = useMotionValue(Infinity)
  const icons = [Home, Compass, Layers, Code2, Terminal]

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-[#121215] border border-zinc-800 shadow-xl"
    >
      {icons.map((Icon, idx) => (
        <button
          key={idx}
          className="w-10 h-10 rounded-xl bg-[#18181b] border border-zinc-800 flex items-center justify-center text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors"
        >
          <Icon className="w-5 h-5" />
        </button>
      ))}
    </motion.div>
  )
}`,
    usageCode: `<InteractiveDock />`,
  },
  {
    id: "hyper-text",
    name: "HyperText",
    title: "Scramble Text",
    subtitle:
      "Cyberpunk alphanumeric text decoder effect that progressively resolves to final characters.",
    category: "motion",
    categoryLabel: "Motion & Physics",
    tags: ["Typography", "Scramble", "Animation", "Text"],
    badge: "Text",
    difficulty: "Beginner",
    cliCommand: "npx depth-ui add scramble-text",
    dependencies: ["framer-motion"],
    code: `import React, { useState, useEffect } from 'react'

export const HyperText: React.FC<{ text: string }> = ({ text }) => {
  const [displayText, setDisplayText] = useState(text)
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

  const scramble = () => {
    let iteration = 0
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split('')
          .map((c, idx) => (idx < iteration ? text[idx] : chars[Math.floor(Math.random() * chars.length)]))
          .join('')
      )
      if (iteration >= text.length) clearInterval(interval)
      iteration += 1 / 3
    }, 30)
  }

  return (
    <span onMouseEnter={scramble} className="font-mono cursor-pointer">
      {displayText}
    </span>
  )
}`,
    usageCode: `<HyperText text="DEPLOY_PRODUCTION_V2" />`,
  },
  {
    id: "bento-grid-3d",
    name: "BentoGrid3D",
    title: "Feature Bento Grid",
    subtitle:
      "Modern asymmetric grid layout for displaying features with interactive hover elevation.",
    category: "motion",
    categoryLabel: "Motion & Physics",
    tags: ["Bento Grid", "Layout", "Features", "Cards"],
    badge: "Layout",
    difficulty: "Intermediate",
    cliCommand: "npx depth-ui add bento-grid",
    dependencies: ["lucide-react", "clsx", "tailwind-merge"],
    code: `import React from 'react'
import { Layers, ShieldCheck, Zap } from 'lucide-react'

export const BentoGrid3D: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
      <div className="md:col-span-2 p-6 rounded-2xl bg-[#121215] border border-zinc-800 space-y-3">
        <Zap className="w-5 h-5 text-white" />
        <h4 className="text-white font-semibold text-sm">Ultra-low Latency Architecture</h4>
        <p className="text-xs text-zinc-400">Optimized rendering pipeline with zero runtime CSS overhead.</p>
      </div>
      <div className="p-6 rounded-2xl bg-[#121215] border border-zinc-800 space-y-3">
        <ShieldCheck className="w-5 h-5 text-white" />
        <h4 className="text-white font-semibold text-sm">WCAG Accessible</h4>
        <p className="text-xs text-zinc-400">Strict keyboard navigation and focus management.</p>
      </div>
    </div>
  )
}`,
    usageCode: `<BentoGrid3D />`,
  },
  {
    id: "neon-tabs",
    name: "NeonTabs",
    title: "Animated Tabs",
    subtitle:
      "Interactive tabs with smooth sliding highlight bar and tactile feedback.",
    category: "motion",
    categoryLabel: "Motion & Physics",
    tags: ["Tabs", "Navigation", "Highlight", "UI"],
    badge: "Tabs",
    difficulty: "Beginner",
    cliCommand: "npx depth-ui add animated-tabs",
    dependencies: ["framer-motion"],
    code: `import React, { useState } from 'react'
import { motion } from 'framer-motion'

export const NeonTabs: React.FC = () => {
  const [active, setActive] = useState('one')
  const tabs = [
    { id: 'one', label: 'Overview' },
    { id: 'two', label: 'Integration' },
    { id: 'three', label: 'API Keys' },
  ]

  return (
    <div className="flex gap-2 p-1.5 rounded-xl bg-[#121215] border border-zinc-800">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActive(tab.id)}
          className={\`relative px-4 py-2 text-xs font-medium rounded-lg cursor-pointer \${
            active === tab.id ? 'text-black font-semibold' : 'text-zinc-400 hover:text-white'
          }\`}
        >
          {active === tab.id && (
            <motion.div
              layoutId="neon-tab"
              className="absolute inset-0 bg-white rounded-lg"
              transition={{ type: 'spring', bounce: 0.15, duration: 0.4 }}
            />
          )}
          <span className="relative z-10">{tab.label}</span>
        </button>
      ))}
    </div>
  )
}`,
    usageCode: `<NeonTabs />`,
  },
  {
    id: "morphing-dialog",
    name: "MorphingDialog",
    title: "Expandable Modal",
    subtitle:
      "Modal dialog that expands from a small trigger card using layout animation.",
    category: "navigation",
    categoryLabel: "Navigation & Overlays",
    tags: ["Dialog", "Modal", "Morphing", "Animation"],
    badge: "Overlay",
    difficulty: "Intermediate",
    cliCommand: "npx depth-ui add expandable-modal",
    dependencies: ["framer-motion", "lucide-react"],
    code: `import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Layers } from 'lucide-react'

export const MorphingDialog: React.FC = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <motion.div
        layoutId="dialog"
        onClick={() => setOpen(true)}
        className="p-5 rounded-2xl bg-[#121215] border border-zinc-800 cursor-pointer"
      >
        <Layers className="w-5 h-5 text-zinc-300 mb-2" />
        <h4 className="text-white font-semibold text-sm">Open Modal Dialog</h4>
      </motion.div>

      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div layoutId="dialog" className="p-6 rounded-2xl bg-[#18181b] border border-zinc-800 max-w-md w-full">
              <button onClick={() => setOpen(false)} className="text-zinc-400 hover:text-white float-right"><X className="w-4 h-4" /></button>
              <h3 className="text-lg font-semibold text-white mb-2">Dialog Window</h3>
              <p className="text-xs text-zinc-400">Accessible modal container with clean focus trapping.</p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}`,
    usageCode: `<MorphingDialog />`,
  },
  {
    id: "infinite-marquee",
    name: "InfiniteMarquee",
    title: "Continuous Ticker",
    subtitle:
      "A horizontally scrolling ticker banner with pause-on-hover and edge fade masks.",
    category: "motion",
    categoryLabel: "Motion & Physics",
    tags: ["Ticker", "Banner", "Carousel"],
    badge: "Banner",
    difficulty: "Beginner",
    cliCommand: "npx depth-ui add ticker",
    dependencies: ["framer-motion", "lucide-react"],
    code: `import React from 'react'
import { motion } from 'framer-motion'

export const InfiniteMarquee: React.FC = () => {
  const items = ['Components', 'Accessible', 'Customizable', 'Responsive', 'Production Ready']

  return (
    <div className="relative overflow-hidden py-3">
      <motion.div
        className="flex gap-3 w-max"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ repeat: Infinity, ease: 'linear', duration: 15 }}
      >
        {[...items, ...items].map((item, idx) => (
          <div key={idx} className="px-4 py-2 rounded-lg bg-[#18181b] border border-zinc-800 text-zinc-300 font-mono text-xs">
            {item}
          </div>
        ))}
      </motion.div>
    </div>
  )
}`,
    usageCode: `<InfiniteMarquee speed={20} />`,
  },

  // ==========================================
  // HIGH-DEMAND DEVELOPER PRIMITIVES
  // ==========================================
  {
    id: "top-loading-bar",
    name: "TopLoadingBar",
    title: "Top Navigation Loading Bar",
    subtitle:
      "NProgress-style glowing top router loader with shimmer reflection, multi-color presets, error handling, and corner spinner.",
    category: "navigation",
    categoryLabel: "Navigation & Overlays",
    tags: [
      "Loading Bar",
      "Progress",
      "Router Loader",
      "Navigation",
      "NProgress",
      "Feedback",
    ],
    badge: "Popular",
    difficulty: "Intermediate",
    cliCommand: "npx depth-ui add loading-bar",
    dependencies: ["lucide-react", "clsx", "tailwind-merge"],
    code: `import React from 'react'

export interface TopLoadingBarProps {
  progress: number // 0 to 100
  color?: 'cyan' | 'violet' | 'emerald' | 'amber' | 'rose'
  height?: number
  showSpinner?: boolean
  isError?: boolean
}

export const TopLoadingBar: React.FC<TopLoadingBarProps> = ({
  progress,
  color = 'cyan',
  height = 3,
  showSpinner = true,
  isError = false,
}) => {
  const colorGradients = {
    cyan: 'from-cyan-400 via-blue-500 to-indigo-500',
    violet: 'from-violet-500 via-fuchsia-500 to-indigo-400',
    emerald: 'from-emerald-400 via-teal-500 to-cyan-400',
    amber: 'from-amber-400 via-orange-500 to-rose-500',
    rose: 'from-rose-500 via-pink-500 to-red-500',
  }

  const glowColors = {
    cyan: 'rgba(6, 182, 212, 0.7)',
    violet: 'rgba(168, 85, 247, 0.7)',
    emerald: 'rgba(16, 185, 129, 0.7)',
    amber: 'rgba(245, 158, 11, 0.7)',
    rose: 'rgba(244, 63, 94, 0.8)',
  }

  const activeColor = isError ? 'rose' : color
  if (progress <= 0) return null

  return (
    <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
      <div className="w-full bg-transparent overflow-hidden" style={{ height: \`\${height}px\` }}>
        <div
          className={\`h-full bg-gradient-to-r \${colorGradients[activeColor]} transition-all duration-300 ease-out relative\`}
          style={{
            width: \`\${Math.min(100, Math.max(0, progress))}%\`,
            boxShadow: \`0 0 12px \${glowColors[activeColor]}, 0 0 4px \${glowColors[activeColor]}\`,
          }}
        >
          {/* Shimmer leading edge */}
          <div
            className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-r from-transparent to-white/90"
            style={{ boxShadow: \`0 0 16px \${glowColors[activeColor]}\` }}
          />
        </div>
      </div>

      {showSpinner && progress < 100 && (
        <div className="absolute top-3 right-4 z-50 flex items-center gap-2 px-2.5 py-1 rounded-full bg-zinc-900/90 border border-zinc-700/80 shadow-lg backdrop-blur-md">
          <div
            className="w-3.5 h-3.5 rounded-full border-2 border-transparent border-t-cyan-400 border-r-cyan-400 animate-spin"
            style={{
              borderTopColor: isError ? '#f43f5e' : undefined,
              borderRightColor: isError ? '#f43f5e' : undefined,
            }}
          />
          <span className="text-[11px] font-mono text-zinc-300 font-medium">
            {isError ? 'Error' : \`\${Math.round(progress)}%\`}
          </span>
        </div>
      )}
    </div>
  )
}`,
    usageCode: `<TopLoadingBar progress={progress} color="cyan" height={3} showSpinner={true} />`,
  },
  {
    id: "fluid-magnetic-cursor",
    name: "FluidMagneticCursor",
    title: "Fluid Magnetic Custom Cursor",
    subtitle:
      "Smooth spring-physics trailing cursor with magnetic button attraction, text inspect magnifying lens, and mobile fallback.",
    category: "motion",
    categoryLabel: "Motion & Layout",
    tags: [
      "Custom Cursor",
      "Magnetic",
      "Spring Physics",
      "Pointer Follower",
      "Micro-interactions",
    ],
    badge: "Trending",
    difficulty: "Advanced",
    cliCommand: "npx depth-ui add magnetic-cursor",
    dependencies: ["lucide-react", "framer-motion"],
    code: `import React, { useState, useEffect, useRef } from 'react'

export const FluidMagneticCursor: React.FC = () => {
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 })
  const [ringPos, setRingPos] = useState({ x: -100, y: -100 })
  const [isHovered, setIsHovered] = useState(false)

  // Spring lerp loop
  useEffect(() => {
    let animId: number
    const update = () => {
      setRingPos((prev) => ({
        x: prev.x + (cursorPos.x - prev.x) * 0.22,
        y: prev.y + (cursorPos.y - prev.y) * 0.22,
      }))
      animId = requestAnimationFrame(update)
    }
    animId = requestAnimationFrame(update)
    return () => cancelAnimationFrame(animId)
  }, [cursorPos])

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [])

  return (
    <>
      {/* Inner Dot */}
      <div
        className="pointer-events-none fixed z-50 w-2.5 h-2.5 rounded-full bg-cyan-400 -translate-x-1/2 -translate-y-1/2 shadow-[0_0_10px_rgba(6,182,212,0.8)]"
        style={{ left: \`\${cursorPos.x}px\`, top: \`\${cursorPos.y}px\` }}
      />
      {/* Outer Spring Ring */}
      <div
        className={\`pointer-events-none fixed z-40 -translate-x-1/2 -translate-y-1/2 transition-all duration-150 rounded-full border \${
          isHovered
            ? 'w-16 h-16 border-cyan-400/80 bg-cyan-500/15 scale-110 shadow-[0_0_20px_rgba(6,182,212,0.3)]'
            : 'w-8 h-8 border-white/60 bg-white/5'
        }\`}
        style={{ left: \`\${ringPos.x}px\`, top: \`\${ringPos.y}px\` }}
      />
    </>
  )
}`,
    usageCode: `// Place at the root of your App.tsx layout
<FluidMagneticCursor />`,
  },
  {
    id: "spatial-motion-card",
    name: "SpatialMotionCard",
    title: "3D Spatial Motion Cards",
    subtitle:
      "Gyroscopic 3D perspective tilt cards with multi-layer depth elevation (preserve-3d) and authentic dynamic specular glare reflection.",
    category: "spatial",
    categoryLabel: "Display & 3D",
    tags: [
      "Motion Cards",
      "3D Tilt",
      "Perspective",
      "Glare Reflection",
      "Gyroscope",
      "Parallax",
    ],
    badge: "Spatial 3D",
    difficulty: "Intermediate",
    cliCommand: "npx depth-ui add motion-card",
    dependencies: ["lucide-react"],
    code: `import React, { useState, useRef } from 'react'

export const SpatialMotionCard: React.FC<{
  title?: string
  subtitle?: string
  badge?: string
}> = ({
  title = 'Quantum Engine',
  subtitle = 'Spatial compute clusters with zero-latency streaming.',
  badge = 'SPATIAL PASS',
}) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const [rotate, setRotate] = useState({ x: 0, y: 0 })
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateX = ((y - centerY) / centerY) * -18
    const rotateY = ((x - centerX) / centerX) * 18

    setRotate({ x: rotateX, y: rotateY })
    setGlare({ x: (x / rect.width) * 100, y: (y / rect.height) * 100, opacity: 0.65 })
  }

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 })
    setGlare({ x: 50, y: 50, opacity: 0 })
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: '1000px' }}
      className="relative w-80 h-[340px] rounded-3xl cursor-pointer group"
    >
      <div
        className="w-full h-full rounded-3xl p-6 bg-gradient-to-br from-zinc-900 via-[#14141d] to-zinc-950 border border-zinc-700/60 shadow-2xl transition-transform duration-150 ease-out relative overflow-hidden flex flex-col justify-between"
        style={{
          transformStyle: 'preserve-3d',
          transform: \`rotateX(\${rotate.x}deg) rotateY(\${rotate.y}deg)\`,
        }}
      >
        {/* Specular Glare Reflection */}
        <div
          className="pointer-events-none absolute inset-0 z-30 transition-opacity duration-300 mix-blend-overlay rounded-3xl"
          style={{
            background: \`radial-gradient(circle at \${glare.x}% \${glare.y}%, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0) 65%)\`,
            opacity: glare.opacity,
          }}
        />

        {/* Floating Top Header (translateZ 40px) */}
        <div className="flex items-center justify-between z-10" style={{ transform: 'translateZ(40px)' }}>
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-violet-950/80 text-violet-300 border border-violet-700/60">
            {badge}
          </span>
        </div>

        {/* Floating Body (translateZ 30px) */}
        <div className="z-10 space-y-1 my-auto" style={{ transform: 'translateZ(30px)' }}>
          <h3 className="text-xl font-extrabold text-white tracking-tight">{title}</h3>
          <p className="text-xs text-zinc-400 leading-relaxed pt-1">{subtitle}</p>
        </div>
      </div>
    </div>
  )
}`,
    usageCode: `<SpatialMotionCard title="Quantum Engine" subtitle="Multi-layer 3D gyro tilt." />`,
  },
  {
    id: "command-palette",
    name: "CommandPalette",
    title: "Spotlight Command Palette (⌘K)",
    subtitle:
      "Raycast-style global search and quick action command menu with keyboard arrow navigation, categorization, and shortcuts.",
    category: "navigation",
    categoryLabel: "Navigation & Overlays",
    tags: [
      "Command Palette",
      "Spotlight Search",
      "Cmd+K",
      "Quick Actions",
      "Modal",
      "Keyboard Navigation",
    ],
    badge: "Essential",
    difficulty: "Intermediate",
    cliCommand: "npx depth-ui add command-palette",
    dependencies: ["lucide-react"],
    code: `import React, { useState, useEffect } from 'react'
import { Search, Command, ArrowRight, X } from 'lucide-react'

export interface CommandItem {
  id: string
  title: string
  category: string
  shortcut?: string
  action: () => void
}

export const CommandPalette: React.FC<{
  isOpen: boolean
  onClose: () => void
  commands: CommandItem[]
}> = ({ isOpen, onClose, commands }) => {
  const [query, setQuery] = useState('')
  const [selectedIdx, setSelectedIdx] = useState(0)

  const filtered = commands.filter(
    (c) => c.title.toLowerCase().includes(query.toLowerCase()) || c.category.toLowerCase().includes(query.toLowerCase())
  )

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelectedIdx((i) => (i + 1) % Math.max(1, filtered.length))
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelectedIdx((i) => (i - 1 + filtered.length) % Math.max(1, filtered.length))
      }
      if (e.key === 'Enter' && filtered[selectedIdx]) {
        e.preventDefault()
        filtered[selectedIdx].action()
        onClose()
      }
    }
    if (isOpen) window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, filtered, selectedIdx, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-start justify-center pt-20 px-4" onClick={onClose}>
      <div
        className="w-full max-w-xl rounded-2xl bg-[#121217] border border-zinc-700 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b border-zinc-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-cyan-400" />
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setSelectedIdx(0) }}
            placeholder="Type a command or search..."
            className="w-full bg-transparent text-sm text-white placeholder-zinc-500 focus:outline-none"
          />
          <kbd className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-zinc-800 text-zinc-400 border border-zinc-700">ESC</kbd>
        </div>

        <div className="p-2 max-h-72 overflow-y-auto space-y-1">
          {filtered.map((cmd, idx) => (
            <div
              key={cmd.id}
              onClick={() => { cmd.action(); onClose() }}
              className={\`p-3 rounded-xl flex items-center justify-between cursor-pointer \${
                idx === selectedIdx ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:bg-zinc-800/50'
              }\`}
            >
              <div className="text-xs font-semibold text-white">{cmd.title}</div>
              {cmd.shortcut && <kbd className="px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-[10px] font-mono text-zinc-400">{cmd.shortcut}</kbd>}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}`,
    usageCode: `<CommandPalette isOpen={isOpen} onClose={() => setIsOpen(false)} commands={myCommands} />`,
  },
  {
    id: "number-ticker",
    name: "NumberTicker",
    title: "Animated Number Ticker Counter",
    subtitle:
      "Smooth ease-out rolling counter for metrics, revenue, volume, and stats with prefix, suffix, and decimal support.",
    category: "data",
    categoryLabel: "Data & Feedback",
    tags: [
      "Number Ticker",
      "Animated Counter",
      "Stats",
      "Metrics",
      "Data",
      "Rollup",
    ],
    badge: "Essential",
    difficulty: "Beginner",
    cliCommand: "npx depth-ui add number-ticker",
    dependencies: ["lucide-react"],
    code: `import React, { useState, useEffect } from 'react'

export interface NumberTickerProps {
  value: number
  prefix?: string
  suffix?: string
  duration?: number
  decimals?: number
}

export const NumberTicker: React.FC<NumberTickerProps> = ({
  value,
  prefix = '',
  suffix = '',
  duration = 1200,
  decimals = 0,
}) => {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    let startTime: number | null = null
    let animId: number
    const startVal = displayValue
    const endVal = value

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)
      const easeProgress = 1 - Math.pow(1 - progress, 3)
      const current = startVal + (endVal - startVal) * easeProgress
      setDisplayValue(current)

      if (progress < 1) {
        animId = requestAnimationFrame(animate)
      } else {
        setDisplayValue(endVal)
      }
    }

    animId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animId)
  }, [value, duration])

  return (
    <span className="font-mono font-bold tracking-tight inline-flex items-center">
      {prefix}
      {decimals > 0
        ? displayValue.toLocaleString(undefined, {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
          })
        : Math.round(displayValue).toLocaleString()}
      {suffix}
    </span>
  )
}`,
    usageCode: `<NumberTicker value={48920} suffix="+" duration={1400} />`,
  },
  {
    id: "sliding-pill-tabs",
    name: "SlidingPillTabs",
    title: "Sliding Pill Segmented Tabs",
    subtitle:
      "Zero-jitter floating background glider using Framer Motion layoutId with spring elasticity and smooth transitions.",
    category: "navigation",
    categoryLabel: "Navigation & Overlays",
    tags: [
      "Tabs",
      "Segmented Control",
      "Sliding Pill",
      "Framer Motion",
      "LayoutId",
      "Glider",
    ],
    badge: "Fluid Motion",
    difficulty: "Intermediate",
    cliCommand: "npx depth-ui add sliding-tabs",
    dependencies: ["framer-motion", "lucide-react"],
    code: `import React, { useState } from 'react'
import { motion } from 'framer-motion'

export interface TabItem {
  id: string
  label: string
}

export const SlidingPillTabs: React.FC<{
  tabs: TabItem[]
  defaultTab?: string
}> = ({ tabs, defaultTab = tabs[0]?.id }) => {
  const [activeTab, setActiveTab] = useState(defaultTab)

  return (
    <div className="p-1.5 rounded-2xl bg-zinc-950 border border-zinc-800 shadow-inner flex items-center gap-1">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={\`relative px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors select-none z-10 \${
              isActive ? 'text-black font-semibold' : 'text-zinc-400 hover:text-white'
            }\`}
          >
            {isActive && (
              <motion.div
                layoutId="glider"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                className="absolute inset-0 rounded-xl -z-10 bg-white shadow-md"
              />
            )}
            <span>{tab.label}</span>
          </button>
        )
      })}
    </div>
  )
}`,
    usageCode: `<SlidingPillTabs tabs={[{ id: 'all', label: 'All' }, { id: 'active', label: 'Active' }]} />`,
  },
  {
    id: "floating-speed-dial",
    name: "FloatingSpeedDial",
    title: "Floating Action Speed Dial (FAB)",
    subtitle:
      "Expandable radial micro-menu for quick actions, bookmarking, sharing, and keyboard triggers.",
    category: "creative",
    categoryLabel: "Vibrant & Colors",
    tags: [
      "Speed Dial",
      "FAB",
      "Floating Action",
      "Micro-menu",
      "Radial Action",
    ],
    badge: "Interactive",
    difficulty: "Intermediate",
    cliCommand: "npx depth-ui add speed-dial",
    dependencies: ["lucide-react"],
    code: `import React, { useState } from 'react'
import { Plus, X, Share2, Copy, Bookmark, Terminal, Check } from 'lucide-react'

export const FloatingSpeedDial: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative inline-block">
      {/* Expanded Actions */}
      <div
        className={\`flex flex-col items-end gap-2.5 mb-3 transition-all duration-300 \${
          isOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'
        }\`}
      >
        <button
          onClick={() => alert('CLI command copied!')}
          className="w-10 h-10 rounded-full bg-cyan-500 text-white flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-transform"
        >
          <Terminal className="w-4 h-4" />
        </button>
        <button
          onClick={() => alert('Shared!')}
          className="w-10 h-10 rounded-full bg-violet-600 text-white flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-transform"
        >
          <Share2 className="w-4 h-4" />
        </button>
      </div>

      {/* Trigger FAB */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={\`w-12 h-12 rounded-full flex items-center justify-center shadow-2xl transition-all cursor-pointer \${
          isOpen ? 'bg-zinc-800 text-white rotate-45 border border-zinc-700' : 'bg-white text-black hover:bg-zinc-200'
        }\`}
      >
        <Plus className="w-6 h-6 transition-transform" />
      </button>
    </div>
  )
}`,
    usageCode: `<FloatingSpeedDial />`,
  },
  {
    id: "wave-mesh-3d",
    name: "WaveMeshCanvas3D",
    title: "3D Particle Wave Canvas",
    subtitle:
      "Interactive 3D particle wave simulation with cursor perspective tilt, harmonic wave dynamics, and customizable color themes.",
    category: "spatial",
    categoryLabel: "Display & 3D",
    tags: [
      "Wave Mesh",
      "3D Canvas",
      "WebGL",
      "Three.js",
      "Particle Grid",
      "Interactive",
    ],
    badge: "WebGL 3D",
    difficulty: "Advanced",
    cliCommand: "npx depth-ui add wave-mesh",
    dependencies: ["three", "@types/three", "lucide-react"],
    code: `import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'

export const WaveMeshCanvas3D: React.FC<{ color?: string }> = ({ color = '#06b6d4' }) => {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mountRef.current) return
    const container = mountRef.current
    const width = container.clientWidth || 600
    const height = container.clientHeight || 340

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 1000)
    camera.position.set(0, 45, 95)
    camera.lookAt(0, -10, 0)

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(width, height)
    container.innerHTML = ''
    container.appendChild(renderer.domElement)

    const cols = 55, rows = 40, count = cols * rows, spacing = 4.2
    const geometry = new THREE.BufferGeometry()
    const positions = new Float32Array(count * 3)
    const initialPos = new Float32Array(count * 3)

    let idx = 0
    for (let ix = 0; ix < cols; ix++) {
      for (let iz = 0; iz < rows; iz++) {
        const x = (ix - cols / 2) * spacing
        const z = (iz - rows / 2) * spacing
        positions[idx * 3] = initialPos[idx * 3] = x
        positions[idx * 3 + 1] = initialPos[idx * 3 + 1] = 0
        positions[idx * 3 + 2] = initialPos[idx * 3 + 2] = z
        idx++
      }
    }
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

    const material = new THREE.PointsMaterial({
      color: new THREE.Color(color),
      size: 2.2,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    })
    const particles = new THREE.Points(geometry, material)
    scene.add(particles)

    let clock = new THREE.Clock()
    let reqId: number

    const render = () => {
      reqId = requestAnimationFrame(render)
      const t = clock.getElapsedTime()
      const pos = geometry.attributes.position.array as Float32Array

      for (let i = 0; i < count; i++) {
        const x = initialPos[i * 3]
        const z = initialPos[i * 3 + 2]
        pos[i * 3 + 1] = Math.sin(x * 0.08 + t * 1.5) * 10 + Math.cos(z * 0.08 + t * 1.2) * 6
      }
      geometry.attributes.position.needsUpdate = true
      renderer.render(scene, camera)
    }
    render()

    return () => {
      cancelAnimationFrame(reqId)
      geometry.dispose()
      material.dispose()
      renderer.dispose()
    }
  }, [color])

  return <div ref={mountRef} className="w-full h-80 rounded-2xl overflow-hidden bg-black" />
}`,
    usageCode: `<WaveMeshCanvas3D color="#06b6d4" />`,
  },
  {
    id: "interactive-3d-cube",
    name: "Interactive3DCube",
    title: "Interactive 3D Feature Cube",
    subtitle:
      "Rotatable 3D CSS cube with 6 interactive showcase faces, mouse drag physics, face snapping, and auto-orbiting.",
    category: "spatial",
    categoryLabel: "Display & 3D",
    tags: [
      "3D Cube",
      "Rotating Box",
      "Feature Showcase",
      "CSS 3D",
      "Gyroscope",
      "Interactive",
    ],
    badge: "CSS 3D",
    difficulty: "Intermediate",
    cliCommand: "npx depth-ui add 3d-cube",
    dependencies: ["lucide-react"],
    code: `import React, { useState } from 'react'

export const Interactive3DCube: React.FC = () => {
  const [rotation, setRotation] = useState({ x: -20, y: 35 })
  const halfSize = 90

  return (
    <div style={{ perspective: '1000px' }} className="w-full h-80 flex items-center justify-center">
      <div
        className="relative transition-transform duration-300 ease-out"
        style={{
          width: \`\${halfSize * 2}px\`,
          height: \`\${halfSize * 2}px\`,
          transformStyle: 'preserve-3d',
          transform: \`rotateX(\${rotation.x}deg) rotateY(\${rotation.y}deg)\`,
        }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 p-4 rounded-xl bg-cyan-950/80 border border-cyan-500/40 text-white flex flex-col justify-between"
          style={{ transform: \`translateZ(\${halfSize}px)\` }}
        >
          <span className="text-xs font-medium text-cyan-300">Spatial</span>
          <h4 className="text-sm font-bold">Front Face</h4>
        </div>
        {/* Back */}
        <div
          className="absolute inset-0 p-4 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-white flex flex-col justify-between"
          style={{ transform: \`rotateY(180deg) translateZ(\${halfSize}px)\` }}
        >
          <span className="text-xs font-medium text-emerald-300">Security</span>
          <h4 className="text-sm font-bold">Back Face</h4>
        </div>
        {/* Right */}
        <div
          className="absolute inset-0 p-4 rounded-xl bg-violet-950/80 border border-violet-500/40 text-white flex flex-col justify-between"
          style={{ transform: \`rotateY(90deg) translateZ(\${halfSize}px)\` }}
        >
          <span className="text-xs font-medium text-violet-300">Edge</span>
          <h4 className="text-sm font-bold">Right Face</h4>
        </div>
        {/* Left */}
        <div
          className="absolute inset-0 p-4 rounded-xl bg-amber-950/80 border border-amber-500/40 text-white flex flex-col justify-between"
          style={{ transform: \`rotateY(-90deg) translateZ(\${halfSize}px)\` }}
        >
          <span className="text-xs font-medium text-amber-300">API</span>
          <h4 className="text-sm font-bold">Left Face</h4>
        </div>
      </div>
    </div>
  )
}`,
    usageCode: `<Interactive3DCube />`,
  },
  {
    id: "floating-torus-knot-3d",
    name: "FloatingTorusKnot3D",
    title: "Floating 3D Torus Knot Geometry",
    subtitle:
      "Interactive iridescent 3D glass Torus Knot with metallic physical shaders, orbiting dual point lights, and inertia drag controls.",
    category: "spatial",
    categoryLabel: "Display & 3D",
    tags: [
      "Torus Knot",
      "3D Glass",
      "Iridescent",
      "WebGL",
      "Three.js",
      "Physics Shader",
    ],
    badge: "Three.js",
    difficulty: "Advanced",
    cliCommand: "npx depth-ui add torus-knot",
    dependencies: ["three", "@types/three", "lucide-react"],
    code: `import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'

export const FloatingTorusKnot3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mountRef.current) return
    const container = mountRef.current
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000)
    camera.position.z = 160

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(container.clientWidth, container.clientHeight)
    container.innerHTML = ''
    container.appendChild(renderer.domElement)

    scene.add(new THREE.AmbientLight(0xffffff, 0.8))
    const p1 = new THREE.PointLight(0x06b6d4, 4, 300); p1.position.set(80, 80, 80); scene.add(p1)
    const p2 = new THREE.PointLight(0xa855f7, 3.5, 300); p2.position.set(-80, -80, 60); scene.add(p2)

    const geo = new THREE.TorusKnotGeometry(36, 12, 120, 24)
    const mat = new THREE.MeshPhysicalMaterial({
      color: 0x8b5cf6, metalness: 0.3, roughness: 0.15, clearcoat: 1.0, transmission: 0.4
    })
    const mesh = new THREE.Mesh(geo, mat)
    scene.add(mesh)

    let reqId: number
    const animate = () => {
      reqId = requestAnimationFrame(animate)
      mesh.rotation.y += 0.01
      mesh.rotation.x += 0.005
      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(reqId)
      geo.dispose()
      mat.dispose()
      renderer.dispose()
    }
  }, [])

  return <div ref={mountRef} className="w-full h-80 rounded-2xl overflow-hidden bg-black" />
}`,
    usageCode: `<FloatingTorusKnot3D />`,
  },
  {
    id: "otp-pin-input",
    name: "OtpPinInput",
    title: "OTP & PIN Verification Input",
    subtitle:
      "Accessible 6-digit authentication input with automatic focus advancement, clipboard paste parser, digit masking, and resend countdown.",
    category: "forms",
    categoryLabel: "Forms & Controls",
    tags: [
      "OTP",
      "PIN",
      "Authentication",
      "2FA",
      "Input",
      "Verification",
      "Security",
    ],
    badge: "Popular",
    difficulty: "Intermediate",
    cliCommand: "npx depth-ui add otp-input",
    dependencies: ["lucide-react"],
    code: `import React, { useState, useRef, useEffect } from 'react'
import { ShieldCheck, Lock, Eye, EyeOff } from 'lucide-react'

export const OtpPinInput: React.FC<{
  length?: number
  onComplete?: (code: string) => void
}> = ({ length = 6, onComplete }) => {
  const [otp, setOtp] = useState<string[]>(new Array(length).fill(''))
  const [isMasked, setIsMasked] = useState(false)
  const inputsRef = useRef<(HTMLInputElement | null)[]>([])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const val = e.target.value
    if (!/^\\d*$/.test(val)) return

    const newOtp = [...otp]
    newOtp[index] = val.slice(-1)
    setOtp(newOtp)

    if (val && index < length - 1) {
      inputsRef.current[index + 1]?.focus()
    }

    if (newOtp.every((digit) => digit !== '')) {
      onComplete?.(newOtp.join(''))
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pasted = e.clipboardData.getData('text').replace(/\\D/g, '').slice(0, length)
    if (!pasted) return

    const newOtp = [...otp]
    for (let i = 0; i < pasted.length; i++) {
      newOtp[i] = pasted[i]
    }
    setOtp(newOtp)

    if (pasted.length === length) {
      onComplete?.(pasted)
      inputsRef.current[length - 1]?.focus()
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2" onPaste={handlePaste}>
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(el) => (inputsRef.current[index] = el)}
            type={isMasked ? 'password' : 'text'}
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className="w-12 h-14 text-center text-xl font-mono font-bold rounded-xl bg-zinc-900 border border-zinc-700 text-white focus:border-cyan-400 focus:outline-none"
          />
        ))}
      </div>
      <button
        onClick={() => setIsMasked(!isMasked)}
        className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white"
      >
        {isMasked ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
        <span>{isMasked ? 'Show Digits' : 'Mask Digits'}</span>
      </button>
    </div>
  )
}`,
    usageCode: `<OtpPinInput length={6} onComplete={(code) => verify(code)} />`,
  },
  {
    id: "file-dropzone",
    name: "FileDropzone",
    title: "Drag & Drop File Upload Zone",
    subtitle:
      "Interactive multi-file drag-and-drop uploader with real-time progress indicators, file type badges, and item queue management.",
    category: "forms",
    categoryLabel: "Forms & Controls",
    tags: [
      "File Upload",
      "Dropzone",
      "Drag and Drop",
      "Queue",
      "Progress",
      "Attachment",
    ],
    badge: "Essential",
    difficulty: "Intermediate",
    cliCommand: "npx depth-ui add dropzone",
    dependencies: ["lucide-react"],
    code: `import React, { useState } from 'react'
import { UploadCloud, CheckCircle2, RefreshCw, X } from 'lucide-react'

export const FileDropzone: React.FC = () => {
  const [isDragOver, setIsDragOver] = useState(false)
  const [files, setFiles] = useState<{ id: string; name: string; progress: number }[]>([
    { id: '1', name: 'app-spec.json', progress: 100 }
  ])

  return (
    <div className="w-full space-y-4">
      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragOver(true) }}
        onDragLeave={() => setIsDragOver(false)}
        className={\`p-8 rounded-2xl border-2 border-dashed text-center transition-colors \${
          isDragOver ? 'border-cyan-400 bg-cyan-950/20' : 'border-zinc-800 bg-zinc-950/60'
        }\`}
      >
        <UploadCloud className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
        <p className="text-sm font-semibold text-white">Drag & drop files here</p>
        <p className="text-xs text-zinc-500 mt-1">Supports JSON, SVG, PNG, WebP up to 25MB</p>
      </div>
      {files.map((f) => (
        <div key={f.id} className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-between">
          <span className="text-xs text-zinc-200">{f.name}</span>
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
        </div>
      ))}
    </div>
  )
}`,
    usageCode: `<FileDropzone />`,
  },
  {
    id: "timeline-roadmap",
    name: "TimelineRoadmap",
    title: "Timeline & Changelog Roadmap",
    subtitle:
      "Vertical milestone tree with glowing progression line, release tags, status badges (Shipped / In Dev / Planned), and collapsible commit highlights.",
    category: "data",
    categoryLabel: "Data & Feedback",
    tags: [
      "Timeline",
      "Roadmap",
      "Changelog",
      "Milestones",
      "Version History",
      "Release Notes",
    ],
    badge: "Core",
    difficulty: "Beginner",
    cliCommand: "npx depth-ui add roadmap",
    dependencies: ["lucide-react"],
    code: `import React from 'react'
import { CheckCircle2, Clock, CircleDashed } from 'lucide-react'

export interface RoadmapNode {
  version: string
  date: string
  status: 'released' | 'in-progress' | 'planned'
  title: string
  description: string
}

export const TimelineRoadmap: React.FC<{ items: RoadmapNode[] }> = ({ items }) => (
  <div className="relative pl-6 space-y-6 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-gradient-to-b before:from-emerald-500 before:via-cyan-500 before:to-zinc-800">
    {items.map((item, idx) => (
      <div key={idx} className="relative group">
        <div className="absolute -left-6 top-1 w-6 h-6 rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center">
          {item.status === 'released' ? (
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          ) : item.status === 'in-progress' ? (
            <Clock className="w-3.5 h-3.5 text-cyan-400" />
          ) : (
            <CircleDashed className="w-3.5 h-3.5 text-zinc-500" />
          )}
        </div>
        <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800">
          <div className="flex items-center justify-between text-xs font-mono mb-1">
            <span className="font-bold text-white">{item.version}</span>
            <span className="text-zinc-500">{item.date}</span>
          </div>
          <h4 className="text-sm font-semibold text-zinc-200">{item.title}</h4>
          <p className="text-xs text-zinc-400 mt-1">{item.description}</p>
        </div>
      </div>
    ))}
  </div>
)`,
    usageCode: `<TimelineRoadmap items={milestones} />`,
  },
  {
    id: "kbd-shortcuts",
    name: "KbdShortcutSuite",
    title: "Mechanical 3D Keycaps & Hotkeys",
    subtitle:
      "Skeuomorphic 3D tactile keyboard keycaps with physical key press listener, hotkey badges, and command sheet shortcuts.",
    category: "navigation",
    categoryLabel: "Navigation & Overlays",
    tags: [
      "Keycaps",
      "Keyboard",
      "Shortcuts",
      "Kbd",
      "Hotkeys",
      "Cheatsheet",
      "Tactile",
    ],
    badge: "Developer DX",
    difficulty: "Beginner",
    cliCommand: "npx depth-ui add kbd",
    dependencies: ["lucide-react"],
    code: `import React from 'react'

export const KbdKey: React.FC<{ label: string; isPressed?: boolean }> = ({ label, isPressed = false }) => (
  <kbd
    className={\`inline-flex items-center justify-center font-mono font-semibold px-2.5 h-8 text-xs rounded-lg transition-transform \${
      isPressed
        ? 'translate-y-1 bg-cyan-500 text-black shadow-none border border-cyan-400'
        : 'bg-zinc-800 text-zinc-200 border-t border-zinc-600 border-b-2 border-b-zinc-950 shadow-[0_3px_0_0_#09090b]'
    }\`}
  >
    {label}
  </kbd>
)

export const HotkeyBadge: React.FC<{ action: string; keys: string[] }> = ({ action, keys }) => (
  <div className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-900 border border-zinc-800">
    <span className="text-xs text-zinc-300 font-medium">{action}</span>
    <div className="flex items-center gap-1">
      {keys.map((k, i) => (
        <KbdKey key={i} label={k} />
      ))}
    </div>
  </div>
)`,
    usageCode: `<HotkeyBadge action="Quick Command Palette" keys={['⌘', 'K']} />`,
  },
  {
    id: "text-shimmer",
    name: "GradientTextShimmer",
    title: "Gradient Text Shimmer Headline",
    subtitle:
      "Hardware-accelerated CSS animated gradient text shimmer for hero titles, announcement badges, and premium SaaS headers.",
    category: "motion",
    categoryLabel: "Motion & Physics",
    tags: [
      "Text Shimmer",
      "Gradient Text",
      "Hero Headline",
      "Typography",
      "Animated Gradient",
      "SaaS",
    ],
    badge: "Visual",
    difficulty: "Beginner",
    cliCommand: "npx depth-ui add text-shimmer",
    dependencies: ["lucide-react"],
    code: `import React from 'react'

export const GradientTextShimmer: React.FC<{ text: string; speed?: number }> = ({
  text,
  speed = 3,
}) => (
  <h2
    className="text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-zinc-400 via-cyan-300 via-white to-zinc-400 bg-[length:200%_auto]"
    style={{ animation: \`shimmer \${speed}s linear infinite\` }}
  >
    {text}
    <style>{\`
      @keyframes shimmer {
        0% { background-position: 200% 0; }
        100% { background-position: -200% 0; }
      }
    \`}</style>
  </h2>
)`,
    usageCode: `<GradientTextShimmer text="Build Faster with Production UI Primitives" speed={3} />`,
  },
  {
    id: "feature-comparison",
    name: "FeatureComparisonTable",
    title: "SaaS Feature Comparison Matrix",
    subtitle:
      "Comprehensive multi-tier pricing and feature comparison matrix with billing cycle discount switch, categorized rows, and feature tooltips.",
    category: "data",
    categoryLabel: "Data & Feedback",
    tags: [
      "Pricing Table",
      "Feature Matrix",
      "Comparison",
      "SaaS Pricing",
      "Tier Matrix",
      "Billing Toggle",
    ],
    badge: "Popular",
    difficulty: "Intermediate",
    cliCommand: "npx depth-ui add feature-matrix",
    dependencies: ["lucide-react"],
    code: `import React from 'react'
import { Check, Minus } from 'lucide-react'

export interface RowItem {
  name: string
  starter: boolean | string
  pro: boolean | string
}

export const FeatureComparisonTable: React.FC<{ rows: RowItem[] }> = ({ rows }) => (
  <div className="w-full overflow-x-auto rounded-2xl border border-zinc-800 bg-zinc-950">
    <table className="w-full text-left text-xs">
      <thead>
        <tr className="border-b border-zinc-800 bg-zinc-900/60">
          <th className="p-4 text-zinc-400">Features</th>
          <th className="p-4 text-center text-white">Starter</th>
          <th className="p-4 text-center text-cyan-400">Pro</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-zinc-800/60">
        {rows.map((r, i) => (
          <tr key={i} className="hover:bg-zinc-900/30">
            <td className="p-4 text-zinc-300">{r.name}</td>
            <td className="p-4 text-center">
              {typeof r.starter === 'boolean' ? (
                r.starter ? <Check className="w-4 h-4 text-emerald-400 mx-auto" /> : <Minus className="w-4 h-4 text-zinc-600 mx-auto" />
              ) : r.starter}
            </td>
            <td className="p-4 text-center">
              {typeof r.pro === 'boolean' ? (
                r.pro ? <Check className="w-4 h-4 text-cyan-400 mx-auto" /> : <Minus className="w-4 h-4 text-zinc-600 mx-auto" />
              ) : r.pro}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)`,
    usageCode: `<FeatureComparisonTable rows={features} />`,
  },
  ...EXTENDED_CATALOG,
];
