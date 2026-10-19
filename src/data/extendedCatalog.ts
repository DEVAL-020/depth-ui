import type { ComponentItem } from "./componentsCatalog";

export const EXTENDED_CATALOG: ComponentItem[] = [
  // ==========================================
  // GROUP 1: VIBRANT & COLORS (9 items)
  // ==========================================
  {
    id: "glassmorphic-card",
    name: "GlassmorphicCard",
    title: "Glassmorphic Specular Card",
    subtitle:
      "Frosted glass surface with dynamic ambient specular lighting and border diffusion.",
    category: "creative",
    categoryLabel: "Vibrant & Colors",
    tags: ["Glassmorphism", "Card", "Backdrop", "Specular", "Blur"],
    badge: "Popular",
    difficulty: "Intermediate",
    cliCommand: "npx depth-ui add glassmorphic-card",
    dependencies: ["lucide-react"],
    code: `export const GlassmorphicCard = () => (
  <div className="relative p-8 rounded-3xl bg-zinc-900/40 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden">
    <div className="absolute -top-24 -right-24 w-48 h-48 bg-violet-500/20 rounded-full blur-3xl pointer-events-none" />
    <div className="relative z-10 space-y-3">
      <span className="text-xs font-semibold text-violet-400">Frosted Glass</span>
      <h3 className="text-xl font-bold text-white">Frosted Glass Surface</h3>
      <p className="text-xs text-zinc-300">Multi-layered backdrop blur with ambient specular highlights.</p>
    </div>
  </div>
)`,
    usageCode: `<GlassmorphicCard />`,
  },
  {
    id: "gradient-badge-group",
    name: "GradientBadgeGroup",
    title: "Gradient Badge Group",
    subtitle:
      "Interactive multi-stop gradient status chips and technology tags with glowing borders.",
    category: "creative",
    categoryLabel: "Vibrant & Colors",
    tags: ["Badges", "Tags", "Glow", "Chips", "Gradient"],
    difficulty: "Beginner",
    cliCommand: "npx depth-ui add gradient-badges",
    dependencies: ["lucide-react"],
    code: `export const GradientBadgeGroup = () => (
  <div className="flex flex-wrap gap-2">
    <span className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-violet-500 to-indigo-500 text-white text-xs font-semibold shadow-lg shadow-violet-500/20">
      Edge Runtime
    </span>
    <span className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 text-white text-xs font-semibold shadow-lg shadow-cyan-500/20">
      Global Edge
    </span>
  </div>
)`,
    usageCode: `<GradientBadgeGroup />`,
  },
  {
    id: "aurora-background",
    name: "AuroraBackground",
    title: "Aurora Fluid Mesh Background",
    subtitle:
      "Smooth fluid aurora borealis gradient mesh for landing page hero backdrops.",
    category: "creative",
    categoryLabel: "Vibrant & Colors",
    tags: ["Aurora", "Background", "Mesh", "Hero", "Atmosphere"],
    badge: "Trending",
    difficulty: "Intermediate",
    cliCommand: "npx depth-ui add aurora-background",
    dependencies: ["lucide-react"],
    code: `export const AuroraBackground = () => (
  <div className="relative w-full h-64 rounded-3xl overflow-hidden bg-zinc-950 border border-zinc-800 flex items-center justify-center">
    <div className="absolute -top-12 -left-12 w-64 h-64 bg-violet-600/40 rounded-full blur-3xl animate-pulse" />
    <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-cyan-500/40 rounded-full blur-3xl animate-pulse" />
    <h3 className="relative z-10 text-2xl font-bold text-white">Vibrant Atmospheric Glow</h3>
  </div>
)`,
    usageCode: `<AuroraBackground />`,
  },
  {
    id: "glow-action-card",
    name: "GlowActionCard",
    title: "Glow Action Card",
    subtitle:
      "High-contrast CTA card with subtle radial gradient glow and one-click cloud deploy.",
    category: "creative",
    categoryLabel: "Vibrant & Colors",
    tags: ["CTA", "Glow", "Deploy", "Action", "Card"],
    difficulty: "Beginner",
    cliCommand: "npx depth-ui add glow-action-card",
    dependencies: ["lucide-react"],
    code: `export const GlowActionCard = () => (
  <div className="p-6 rounded-2xl bg-zinc-900 border border-violet-500/30 shadow-[0_0_25px_rgba(139,92,246,0.15)] space-y-3">
    <h4 className="text-sm font-bold text-white">Instant Deployment</h4>
    <p className="text-xs text-zinc-300">Deploy globally distributed micro-services in under 300ms.</p>
    <button className="w-full py-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-xs font-semibold">
      Deploy to Cloud
    </button>
  </div>
)`,
    usageCode: `<GlowActionCard />`,
  },
  {
    id: "spotlight-pricing",
    name: "SpotlightPricing",
    title: "Spotlight Pricing Tier",
    subtitle:
      "Highlighted subscription tier card with annual discount toggle and feature matrix.",
    category: "creative",
    categoryLabel: "Vibrant & Colors",
    tags: ["Pricing", "Subscription", "SaaS", "Billing", "Feature"],
    badge: "Popular",
    difficulty: "Intermediate",
    cliCommand: "npx depth-ui add spotlight-pricing",
    dependencies: ["lucide-react"],
    code: `export const SpotlightPricing = () => (
  <div className="p-6 rounded-3xl bg-zinc-900 border-2 border-violet-500 shadow-2xl space-y-4">
    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-violet-500/20 text-violet-300">Popular</span>
    <h4 className="text-xl font-bold text-white">Startup Pro</h4>
    <div className="text-3xl font-extrabold text-white">$24 / mo</div>
    <button className="w-full py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white text-xs font-semibold">
      Start Free Trial
    </button>
  </div>
)`,
    usageCode: `<SpotlightPricing />`,
  },
  {
    id: "gradient-avatar-ring",
    name: "GradientAvatarRing",
    title: "Gradient Avatar Rings",
    subtitle:
      "User profile avatar component with multi-stop gradient status rings.",
    category: "creative",
    categoryLabel: "Vibrant & Colors",
    tags: ["Avatar", "User", "Status", "Ring", "Profile"],
    difficulty: "Beginner",
    cliCommand: "npx depth-ui add avatar-ring",
    dependencies: ["lucide-react"],
    code: `export const GradientAvatarRing = ({ name = 'Elena Rostova' }) => (
  <div className="p-[2.5px] rounded-full bg-gradient-to-tr from-violet-500 via-pink-500 to-amber-400">
    <div className="w-12 h-12 rounded-full bg-zinc-900 flex items-center justify-center font-bold text-white text-xs">
      ER
    </div>
  </div>
)`,
    usageCode: `<GradientAvatarRing />`,
  },
  {
    id: "gradient-stat-card",
    name: "GradientStatCard",
    title: "Gradient Stat Metric Card",
    subtitle:
      "Financial and analytics metric cards with gradient accent borders and percentage growth.",
    category: "creative",
    categoryLabel: "Vibrant & Colors",
    tags: ["Metrics", "Stats", "Analytics", "Growth", "Finance"],
    difficulty: "Intermediate",
    cliCommand: "npx depth-ui add gradient-stat-card",
    dependencies: ["lucide-react"],
    code: `export const GradientStatCard = ({ title = 'Gross ARR', value = '$428,900', change = '+38.4%' }) => (
  <div className="p-5 rounded-2xl bg-gradient-to-br from-violet-950/40 to-zinc-950 border border-violet-500/30 space-y-2">
    <div className="flex justify-between text-xs text-zinc-400">
      <span>{title}</span>
      <span className="text-emerald-400 font-semibold">{change}</span>
    </div>
    <div className="text-2xl font-bold text-white">{value}</div>
  </div>
)`,
    usageCode: `<GradientStatCard />`,
  },
  {
    id: "vibrant-banner",
    name: "VibrantBanner",
    title: "Vibrant Announcement Banner",
    subtitle:
      "High-conversion top alert banner with gradient backdrop and dismiss action.",
    category: "creative",
    categoryLabel: "Vibrant & Colors",
    tags: ["Banner", "Announcement", "Alert", "Marketing", "Notice"],
    difficulty: "Beginner",
    cliCommand: "npx depth-ui add vibrant-banner",
    dependencies: ["lucide-react"],
    code: `export const VibrantBanner = () => (
  <div className="p-3.5 rounded-2xl bg-gradient-to-r from-violet-600 via-fuchsia-600 to-indigo-600 text-white flex items-center justify-between">
    <span className="text-xs font-medium">Depth UI v2.0 Released: 100+ accessible primitives now live.</span>
    <button className="px-3 py-1 rounded-lg bg-white text-black text-xs font-semibold">Explore</button>
  </div>
)`,
    usageCode: `<VibrantBanner />`,
  },
  {
    id: "color-swatch-selector",
    name: "ColorSwatchSelector",
    title: "Color Swatch Palette Selector",
    subtitle:
      "Interactive color swatch palette picker with hex code clipboard copying.",
    category: "creative",
    categoryLabel: "Vibrant & Colors",
    tags: ["Color", "Swatch", "Palette", "Picker", "Theme"],
    difficulty: "Beginner",
    cliCommand: "npx depth-ui add color-swatches",
    dependencies: ["lucide-react"],
    code: `export const ColorSwatchSelector = () => (
  <div className="flex gap-2 p-4 rounded-2xl bg-zinc-900 border border-zinc-800">
    {['#8b5cf6', '#06b6d4', '#10b981', '#f59e0b'].map((hex) => (
      <button key={hex} style={{ backgroundColor: hex }} className="w-8 h-8 rounded-xl ring-2 ring-white/20" />
    ))}
  </div>
)`,
    usageCode: `<ColorSwatchSelector />`,
  },

  // ==========================================
  // GROUP 2: FORMS & INPUTS (9 items)
  // ==========================================
  {
    id: "password-strength-input",
    name: "PasswordStrengthInput",
    title: "Password Strength Validator",
    subtitle:
      "Secure password input with real-time requirement checklist and strength progress bar.",
    category: "forms",
    categoryLabel: "Forms & Inputs",
    tags: ["Password", "Validation", "Security", "Form", "Input"],
    badge: "Popular",
    difficulty: "Intermediate",
    cliCommand: "npx depth-ui add password-strength",
    dependencies: ["lucide-react"],
    code: `export const PasswordStrengthInput = () => {
  const [val, setVal] = React.useState('')
  const score = [val.length >= 8, /\\d/.test(val), /[A-Z]/.test(val)].filter(Boolean).length
  return (
    <div className="space-y-2">
      <input type="password" value={val} onChange={e => setVal(e.target.value)} className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-white" />
      <div className="h-1.5 w-full bg-zinc-800 rounded-full">
        <div style={{ width: \`\${(score/3)*100}%\` }} className="h-full bg-emerald-500 rounded-full" />
      </div>
    </div>
  )
}`,
    usageCode: `<PasswordStrengthInput />`,
  },
  {
    id: "tag-multi-input",
    name: "TagMultiInput",
    title: "Multi-Tag Token Input",
    subtitle:
      "Interactive chip/tag creator with keyboard shortcuts (Enter/Comma) and delete backspace.",
    category: "forms",
    categoryLabel: "Forms & Inputs",
    tags: ["Tags", "Tokens", "Input", "Chips", "MultiSelect"],
    difficulty: "Intermediate",
    cliCommand: "npx depth-ui add tag-input",
    dependencies: ["lucide-react"],
    code: `export const TagMultiInput = () => {
  const [tags, setTags] = React.useState(['React', 'Tailwind'])
  return (
    <div className="flex flex-wrap gap-1.5 p-2 rounded-xl bg-zinc-950 border border-zinc-800">
      {tags.map(t => <span key={t} className="px-2.5 py-1 rounded-lg bg-zinc-800 text-xs text-white">{t}</span>)}
    </div>
  )
}`,
    usageCode: `<TagMultiInput />`,
  },
  {
    id: "currency-number-input",
    name: "CurrencyNumberInput",
    title: "Currency Financial Input",
    subtitle:
      "Formatted financial input with currency prefix and quick preset amount buttons.",
    category: "forms",
    categoryLabel: "Forms & Inputs",
    tags: ["Currency", "Money", "Finance", "Input", "Number"],
    difficulty: "Beginner",
    cliCommand: "npx depth-ui add currency-input",
    dependencies: ["lucide-react"],
    code: `export const CurrencyNumberInput = () => (
  <div className="relative">
    <span className="absolute left-3 top-2.5 text-zinc-400">$</span>
    <input className="w-full pl-8 pr-4 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-white font-semibold" defaultValue="1,250.00" />
  </div>
)`,
    usageCode: `<CurrencyNumberInput />`,
  },
  {
    id: "phone-country-input",
    name: "PhoneCountryInput",
    title: "International Phone Input",
    subtitle:
      "Phone number input with country code picker and automated dial code routing.",
    category: "forms",
    categoryLabel: "Forms & Inputs",
    tags: ["Phone", "Country", "International", "Input", "Form"],
    difficulty: "Intermediate",
    cliCommand: "npx depth-ui add phone-input",
    dependencies: ["lucide-react"],
    code: `export const PhoneCountryInput = () => (
  <div className="flex rounded-xl bg-zinc-950 border border-zinc-800">
    <select className="bg-transparent px-3 py-2 text-xs text-zinc-300 border-r border-zinc-800">
      <option value="+1">+1 (US)</option>
      <option value="+44">+44 (UK)</option>
    </select>
    <input type="tel" placeholder="Phone number" className="flex-1 px-3 py-2 bg-transparent text-white text-xs" />
  </div>
)`,
    usageCode: `<PhoneCountryInput />`,
  },
  {
    id: "textarea-char-count",
    name: "TextareaCharCount",
    title: "Textarea with Character Counter",
    subtitle:
      "Auto-resizing text area with dynamic character limit countdown and visual alert.",
    category: "forms",
    categoryLabel: "Forms & Inputs",
    tags: ["Textarea", "CharacterCount", "Forms", "Input", "Limit"],
    difficulty: "Beginner",
    cliCommand: "npx depth-ui add textarea-char-count",
    dependencies: ["lucide-react"],
    code: `export const TextareaCharCount = ({ max = 140 }) => {
  const [val, setVal] = React.useState('')
  return (
    <div className="space-y-1">
      <textarea maxLength={max} value={val} onChange={e => setVal(e.target.value)} className="w-full p-3 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-xs" />
      <div className="text-[11px] text-zinc-500 text-right">{max - val.length} left</div>
    </div>
  )
}`,
    usageCode: `<TextareaCharCount max={140} />`,
  },
  {
    id: "rating-feedback-picker",
    name: "RatingFeedbackPicker",
    title: "Rating & Feedback Star Picker",
    subtitle:
      "5-star satisfaction rating widget with interactive hover states and score feedback.",
    category: "forms",
    categoryLabel: "Forms & Inputs",
    tags: ["Rating", "Stars", "Review", "Feedback", "Sentiment"],
    difficulty: "Beginner",
    cliCommand: "npx depth-ui add rating-picker",
    dependencies: ["lucide-react"],
    code: `export const RatingFeedbackPicker = () => {
  const [stars, setStars] = React.useState(5)
  return (
    <div className="flex gap-1.5">
      {[1,2,3,4,5].map(s => (
        <button key={s} onClick={() => setStars(s)} className={\`text-lg \${s <= stars ? 'text-amber-400' : 'text-zinc-600'}\`}>★</button>
      ))}
    </div>
  )
}`,
    usageCode: `<RatingFeedbackPicker />`,
  },
  {
    id: "date-range-picker",
    name: "DateRangePicker",
    title: "Date Range Selector",
    subtitle:
      "Preset date range selector (7 Days, 30 Days, YTD) with calendar badge indicators.",
    category: "forms",
    categoryLabel: "Forms & Inputs",
    tags: ["Calendar", "DateRange", "Picker", "Time", "Filter"],
    difficulty: "Intermediate",
    cliCommand: "npx depth-ui add date-range",
    dependencies: ["lucide-react"],
    code: `export const DateRangePicker = () => {
  const [active, setActive] = React.useState('30D')
  return (
    <div className="flex gap-1.5">
      {['7D', '30D', 'YTD'].map(p => (
        <button key={p} onClick={() => setActive(p)} className={\`px-3 py-1.5 rounded-lg text-xs \${active === p ? 'bg-zinc-800 text-white' : 'text-zinc-400'}\`}>{p}</button>
      ))}
    </div>
  )
}`,
    usageCode: `<DateRangePicker />`,
  },
  {
    id: "segmented-button-group",
    name: "SegmentedButtonGroup",
    title: "Segmented Pill Control",
    subtitle:
      "Tactile segmented pill controller for mutually exclusive view and layout switches.",
    category: "forms",
    categoryLabel: "Forms & Inputs",
    tags: ["Segmented", "Control", "Pill", "Toggle", "Buttons"],
    badge: "Popular",
    difficulty: "Beginner",
    cliCommand: "npx depth-ui add segmented-control",
    dependencies: ["lucide-react"],
    code: `export const SegmentedButtonGroup = () => {
  const [view, setView] = React.useState('grid')
  return (
    <div className="flex p-1 rounded-xl bg-zinc-950 border border-zinc-800">
      {['grid', 'list', 'table'].map(v => (
        <button key={v} onClick={() => setView(v)} className={\`px-3 py-1 rounded-lg text-xs capitalize \${view === v ? 'bg-zinc-800 text-white' : 'text-zinc-400'}\`}>{v}</button>
      ))}
    </div>
  )
}`,
    usageCode: `<SegmentedButtonGroup />`,
  },
  {
    id: "search-autocomplete-input",
    name: "SearchAutocompleteInput",
    title: "Search Autocomplete Input",
    subtitle:
      "Real-time autocomplete search field with quick suggestion dropdown and clear button.",
    category: "forms",
    categoryLabel: "Forms & Inputs",
    tags: ["Search", "Autocomplete", "Suggestions", "Input", "Dropdown"],
    difficulty: "Intermediate",
    cliCommand: "npx depth-ui add search-autocomplete",
    dependencies: ["lucide-react"],
    code: `export const SearchAutocompleteInput = () => {
  const [q, setQ] = React.useState('')
  return (
    <div className="relative">
      <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search..." className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-xs" />
    </div>
  )
}`,
    usageCode: `<SearchAutocompleteInput />`,
  },

  // ==========================================
  // GROUP 3: DATA & FEEDBACK (9 items)
  // ==========================================
  {
    id: "circular-progress-ring",
    name: "CircularProgressRing",
    title: "Circular SVG Progress Ring",
    subtitle:
      "Smooth SVG circular percentage gauge with stroke-dasharray animation and label.",
    category: "data",
    categoryLabel: "Data & Feedback",
    tags: ["Progress", "Ring", "Circular", "Gauge", "SVG"],
    badge: "Popular",
    difficulty: "Intermediate",
    cliCommand: "npx depth-ui add progress-ring",
    dependencies: ["lucide-react"],
    code: `export const CircularProgressRing = ({ percent = 78 }) => (
  <div className="relative w-20 h-20 flex items-center justify-center">
    <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="40" stroke="#27272a" strokeWidth="8" fill="transparent" />
      <circle cx="50" cy="50" r="40" stroke="#06b6d4" strokeWidth="8" strokeDasharray="251.2" strokeDashoffset={251.2 - (percent/100)*251.2} strokeLinecap="round" fill="transparent" />
    </svg>
    <span className="absolute text-sm font-bold text-white">{percent}%</span>
  </div>
)`,
    usageCode: `<CircularProgressRing percent={78} />`,
  },
  {
    id: "empty-state-card",
    name: "EmptyStateCard",
    title: "Empty State Container",
    subtitle:
      "Zero-data empty state with icon illustration, descriptive copy, and primary action.",
    category: "data",
    categoryLabel: "Data & Feedback",
    tags: ["EmptyState", "ZeroData", "Feedback", "Placeholder", "Card"],
    difficulty: "Beginner",
    cliCommand: "npx depth-ui add empty-state",
    dependencies: ["lucide-react"],
    code: `export const EmptyStateCard = () => (
  <div className="text-center p-8 rounded-2xl bg-zinc-900 border border-dashed border-zinc-800 space-y-3">
    <h4 className="text-sm font-bold text-white">No deployments found</h4>
    <p className="text-xs text-zinc-400">Import your repository to trigger automated builds.</p>
    <button className="px-4 py-2 rounded-xl bg-white text-black text-xs font-semibold">Connect Repo</button>
  </div>
)`,
    usageCode: `<EmptyStateCard />`,
  },
  {
    id: "key-value-list",
    name: "KeyValueList",
    title: "Key-Value Metadata Inspector",
    subtitle:
      "Summary key-value inspector list with copy buttons and status badges.",
    category: "data",
    categoryLabel: "Data & Feedback",
    tags: ["Metadata", "Inspector", "KeyValue", "List", "Data"],
    difficulty: "Beginner",
    cliCommand: "npx depth-ui add key-value-list",
    dependencies: ["lucide-react"],
    code: `export const KeyValueList = ({ items = [{ k: 'Host', v: 'us-east.cloud' }] }) => (
  <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 divide-y divide-zinc-800">
    {items.map(it => (
      <div key={it.k} className="py-2 flex justify-between text-xs">
        <span className="text-zinc-400">{it.k}</span>
        <span className="text-white font-medium">{it.v}</span>
      </div>
    ))}
  </div>
)`,
    usageCode: `<KeyValueList />`,
  },
  {
    id: "step-progress-tracker",
    name: "StepProgressTracker",
    title: "Step Progress Pipeline",
    subtitle:
      "Multi-step process indicator with completed checkmarks and current step highlight.",
    category: "data",
    categoryLabel: "Data & Feedback",
    tags: ["Steps", "Stepper", "Timeline", "Progress", "Pipeline"],
    difficulty: "Intermediate",
    cliCommand: "npx depth-ui add step-tracker",
    dependencies: ["lucide-react"],
    code: `export const StepProgressTracker = ({ current = 2 }) => (
  <div className="flex justify-between items-center relative">
    {[1, 2, 3].map(s => (
      <div key={s} className={\`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold \${s <= current ? 'bg-emerald-500 text-black' : 'bg-zinc-800 text-zinc-400'}\`}>
        {s}
      </div>
    ))}
  </div>
)`,
    usageCode: `<StepProgressTracker current={2} />`,
  },
  {
    id: "mini-sparkline-chart",
    name: "MiniSparklineChart",
    title: "Mini SVG Sparkline Chart",
    subtitle:
      "Lightweight SVG sparkline trend indicator for dashboard table rows and KPI cards.",
    category: "data",
    categoryLabel: "Data & Feedback",
    tags: ["Sparkline", "Chart", "SVG", "Trend", "Metrics"],
    badge: "Popular",
    difficulty: "Intermediate",
    cliCommand: "npx depth-ui add sparkline",
    dependencies: ["lucide-react"],
    code: `export const MiniSparklineChart = () => (
  <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 space-y-1">
    <div className="text-xl font-bold text-white">2.4M</div>
    <svg width="100%" height="32" viewBox="0 0 100 32">
      <path d="M 0 28 L 25 18 L 50 22 L 75 10 L 100 4" fill="none" stroke="#06b6d4" strokeWidth="2" strokeLinecap="round" />
    </svg>
  </div>
)`,
    usageCode: `<MiniSparklineChart />`,
  },
  {
    id: "alert-banner-stack",
    name: "AlertBannerStack",
    title: "Alert Banner Stack",
    subtitle:
      "Contextual alert cards (Success, Warning, Error, Info) with icons and action triggers.",
    category: "data",
    categoryLabel: "Data & Feedback",
    tags: ["Alert", "Toast", "Notice", "Feedback", "Status"],
    difficulty: "Beginner",
    cliCommand: "npx depth-ui add alert-stack",
    dependencies: ["lucide-react"],
    code: `export const AlertBannerStack = () => (
  <div className="space-y-2">
    <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs">
      Build succeeded! All tests passed.
    </div>
  </div>
)`,
    usageCode: `<AlertBannerStack />`,
  },
  {
    id: "status-badge-matrix",
    name: "StatusBadgeMatrix",
    title: "Production Status Badges",
    subtitle:
      "Live system status badges (Operational, Degraded, Maintenance) with animated pulse dots.",
    category: "data",
    categoryLabel: "Data & Feedback",
    tags: ["Status", "Badges", "Uptime", "Pulse", "Health"],
    difficulty: "Beginner",
    cliCommand: "npx depth-ui add status-matrix",
    dependencies: ["lucide-react"],
    code: `export const StatusBadgeMatrix = () => (
  <div className="flex gap-2">
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs">
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Operational
    </span>
  </div>
)`,
    usageCode: `<StatusBadgeMatrix />`,
  },
  {
    id: "file-tree-view",
    name: "FileTreeView",
    title: "File & Directory Tree View",
    subtitle:
      "Interactive hierarchical file tree with collapsible folders and custom file icons.",
    category: "data",
    categoryLabel: "Data & Feedback",
    tags: ["FileTree", "Hierarchy", "Directory", "Folder", "Code"],
    difficulty: "Intermediate",
    cliCommand: "npx depth-ui add file-tree",
    dependencies: ["lucide-react"],
    code: `export const FileTreeView = () => (
  <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 space-y-1">
    <div className="font-semibold text-white">src/</div>
    <div className="pl-4 text-zinc-400">components/</div>
  </div>
)`,
    usageCode: `<FileTreeView />`,
  },
  {
    id: "user-feedback-modal",
    name: "UserFeedbackModal",
    title: "User Feedback Modal Form",
    subtitle:
      "Compact in-app satisfaction feedback form with 5-star scoring and submit confirmation.",
    category: "data",
    categoryLabel: "Data & Feedback",
    tags: ["Feedback", "Survey", "Rating", "Modal", "Support"],
    difficulty: "Beginner",
    cliCommand: "npx depth-ui add feedback-modal",
    dependencies: ["lucide-react"],
    code: `export const UserFeedbackModal = () => (
  <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-3">
    <h4 className="text-sm font-semibold text-white">Send Feedback</h4>
    <textarea rows={2} className="w-full p-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white" />
    <button className="w-full py-1.5 rounded-xl bg-white text-black text-xs font-semibold">Submit</button>
  </div>
)`,
    usageCode: `<UserFeedbackModal />`,
  },

  // ==========================================
  // GROUP 4: NAVIGATION & OVERLAYS (9 items)
  // ==========================================
  {
    id: "sidebar-collapsible-nav",
    name: "SidebarCollapsibleNav",
    title: "Collapsible Dashboard Sidebar",
    subtitle:
      "Expandable/collapsible sidebar menu with badge counters and active route indicator.",
    category: "navigation",
    categoryLabel: "Navigation & Overlays",
    tags: ["Sidebar", "Navigation", "Dashboard", "Menu", "Layout"],
    badge: "Popular",
    difficulty: "Intermediate",
    cliCommand: "npx depth-ui add sidebar-nav",
    dependencies: ["lucide-react"],
    code: `export const SidebarCollapsibleNav = () => (
  <div className="w-64 p-3 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-1">
    <button className="w-full flex items-center gap-2 px-3 py-2 rounded-xl bg-white text-black text-xs font-semibold">
      Dashboard
    </button>
  </div>
)`,
    usageCode: `<SidebarCollapsibleNav />`,
  },
  {
    id: "context-menu",
    name: "ContextMenu",
    title: "Desktop Context Menu",
    subtitle:
      "Desktop-grade contextual action menu with keyboard shortcut hints and danger triggers.",
    category: "navigation",
    categoryLabel: "Navigation & Overlays",
    tags: ["ContextMenu", "RightClick", "Actions", "Shortcuts", "Menu"],
    difficulty: "Intermediate",
    cliCommand: "npx depth-ui add context-menu",
    dependencies: ["lucide-react"],
    code: `export const ContextMenu = () => (
  <div className="w-48 p-1.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs space-y-0.5">
    <div className="px-3 py-1.5 rounded-lg hover:bg-zinc-800 text-white flex justify-between">
      <span>Duplicate</span> <span className="text-zinc-500">⌘D</span>
    </div>
  </div>
)`,
    usageCode: `<ContextMenu />`,
  },
  {
    id: "mobile-drawer-sheet",
    name: "MobileDrawerSheet",
    title: "Mobile Bottom Sheet Drawer",
    subtitle:
      "Touch-optimized sliding bottom drawer modal with drag handle and spring animations.",
    category: "navigation",
    categoryLabel: "Navigation & Overlays",
    tags: ["Drawer", "BottomSheet", "Mobile", "Modal", "Touch"],
    difficulty: "Intermediate",
    cliCommand: "npx depth-ui add bottom-drawer",
    dependencies: ["lucide-react"],
    code: `export const MobileDrawerSheet = () => (
  <div className="p-6 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-3">
    <div className="w-12 h-1.5 rounded-full bg-zinc-700 mx-auto" />
    <h4 className="text-base font-bold text-white">Share Component</h4>
  </div>
)`,
    usageCode: `<MobileDrawerSheet />`,
  },
  {
    id: "stepper-wizard-nav",
    name: "StepperWizardNav",
    title: "Wizard Stepper Navigation",
    subtitle:
      "Step-by-step onboarding navigation bar with previous, next, and completion actions.",
    category: "navigation",
    categoryLabel: "Navigation & Overlays",
    tags: ["Wizard", "Stepper", "Onboarding", "Steps", "Navigation"],
    difficulty: "Beginner",
    cliCommand: "npx depth-ui add wizard-nav",
    dependencies: ["lucide-react"],
    code: `export const StepperWizardNav = () => (
  <div className="flex justify-between items-center p-4 rounded-2xl bg-zinc-900 border border-zinc-800">
    <span className="text-xs text-white font-medium">Step 2 of 3</span>
    <button className="px-3 py-1.5 rounded-lg bg-white text-black text-xs font-semibold">Next</button>
  </div>
)`,
    usageCode: `<StepperWizardNav />`,
  },
  {
    id: "floating-announcement-pill",
    name: "FloatingAnnouncementPill",
    title: "Floating Announcement Capsule",
    subtitle:
      "Minimalist floating product update capsule with external arrow hover transition.",
    category: "navigation",
    categoryLabel: "Navigation & Overlays",
    tags: ["Pill", "Capsule", "Changelog", "Announcement", "Badge"],
    difficulty: "Beginner",
    cliCommand: "npx depth-ui add announcement-pill",
    dependencies: ["lucide-react"],
    code: `export const FloatingAnnouncementPill = () => (
  <a href="#changelog" className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs text-zinc-200">
    <span className="font-semibold text-violet-400">v2.4</span>
    <span>100+ components live</span>
  </a>
)`,
    usageCode: `<FloatingAnnouncementPill />`,
  },
  {
    id: "mega-menu-dropdown",
    name: "MegaMenuDropdown",
    title: "Multi-Column Mega Menu",
    subtitle:
      "Rich multi-column navigation menu with categorised solutions and feature cards.",
    category: "navigation",
    categoryLabel: "Navigation & Overlays",
    tags: ["MegaMenu", "Dropdown", "Navigation", "Navbar", "Columns"],
    difficulty: "Intermediate",
    cliCommand: "npx depth-ui add mega-menu",
    dependencies: ["lucide-react"],
    code: `export const MegaMenuDropdown = () => (
  <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-zinc-900 border border-zinc-800 text-xs">
    <div className="p-3 rounded-xl bg-zinc-950">Spatial 3D Canvases</div>
    <div className="p-3 rounded-xl bg-zinc-950">Motion Physics</div>
  </div>
)`,
    usageCode: `<MegaMenuDropdown />`,
  },
  {
    id: "user-profile-dropdown",
    name: "UserProfileDropdown",
    title: "Account Profile Dropdown",
    subtitle:
      "User account menu with workspace switcher, notification shortcut, and sign-out.",
    category: "navigation",
    categoryLabel: "Navigation & Overlays",
    tags: ["Profile", "Account", "Dropdown", "User", "Menu"],
    badge: "Popular",
    difficulty: "Beginner",
    cliCommand: "npx depth-ui add profile-menu",
    dependencies: ["lucide-react"],
    code: `export const UserProfileDropdown = () => (
  <div className="w-56 p-2 rounded-2xl bg-zinc-900 border border-zinc-800 text-xs space-y-1">
    <div className="p-2 font-semibold text-white">John Doe</div>
    <div className="p-2 hover:bg-zinc-800 rounded-lg text-zinc-300">Settings</div>
  </div>
)`,
    usageCode: `<UserProfileDropdown />`,
  },
  {
    id: "docked-action-bar",
    name: "DockedActionBar",
    title: "Docked Bulk Action Bar",
    subtitle:
      "Floating bottom action bar triggered when multiple table or list items are checked.",
    category: "navigation",
    categoryLabel: "Navigation & Overlays",
    tags: ["BulkActions", "ActionBar", "Selection", "Floating", "Dock"],
    difficulty: "Intermediate",
    cliCommand: "npx depth-ui add action-bar",
    dependencies: ["lucide-react"],
    code: `export const DockedActionBar = ({ count = 3 }) => (
  <div className="flex justify-between items-center p-3 rounded-2xl bg-zinc-900 border border-zinc-700 text-xs">
    <span className="text-white font-medium">{count} items selected</span>
    <button className="px-3 py-1.5 rounded-lg bg-white text-black font-semibold">Batch Export</button>
  </div>
)`,
    usageCode: `<DockedActionBar count={3} />`,
  },
  {
    id: "split-button-dropdown",
    name: "SplitButtonDropdown",
    title: "Split Action Dropdown",
    subtitle:
      "Primary action button combined with chevron dropdown for secondary draft/schedule options.",
    category: "navigation",
    categoryLabel: "Navigation & Overlays",
    tags: ["SplitButton", "Dropdown", "Actions", "Buttons", "Publish"],
    difficulty: "Beginner",
    cliCommand: "npx depth-ui add split-button",
    dependencies: ["lucide-react"],
    code: `export const SplitButtonDropdown = () => (
  <div className="inline-flex rounded-xl overflow-hidden border border-zinc-700">
    <button className="px-4 py-2 bg-white text-black text-xs font-semibold">Publish Release</button>
    <button className="px-2.5 py-2 bg-zinc-200 text-black border-l border-zinc-300">▾</button>
  </div>
)`,
    usageCode: `<SplitButtonDropdown />`,
  },

  // ==========================================
  // GROUP 5: DISPLAY & 3D (9 items)
  // ==========================================
  {
    id: "tilt-parallax-card",
    name: "TiltParallaxCard",
    title: "3D Parallax Gyroscope Card",
    subtitle:
      "Interactive card that tilts along X and Y axes responding to cursor coordinates.",
    category: "spatial",
    categoryLabel: "Display & 3D",
    tags: ["3D", "Tilt", "Parallax", "Gyroscope", "Perspective"],
    badge: "Popular",
    difficulty: "Intermediate",
    cliCommand: "npx depth-ui add tilt-card",
    dependencies: ["lucide-react"],
    code: `export const TiltParallaxCard = () => (
  <div className="p-6 rounded-3xl bg-zinc-900 border border-zinc-700 shadow-2xl transition-transform hover:scale-105">
    <h4 className="text-base font-bold text-white">3D Gyroscope Surface</h4>
    <p className="text-xs text-zinc-400 mt-1">Interactive perspective orientation.</p>
  </div>
)`,
    usageCode: `<TiltParallaxCard />`,
  },
  {
    id: "dot-matrix-canvas",
    name: "DotMatrixCanvas",
    title: "Dot Matrix Field Canvas",
    subtitle:
      "Geometric interactive dot grid canvas with proximity distortion and smooth falloff.",
    category: "spatial",
    categoryLabel: "Display & 3D",
    tags: ["Canvas", "DotMatrix", "Grid", "Particles", "Interactive"],
    difficulty: "Advanced",
    cliCommand: "npx depth-ui add dot-matrix",
    dependencies: ["lucide-react"],
    code: `export const DotMatrixCanvas = () => (
  <canvas width="400" height="180" className="w-full rounded-xl bg-zinc-950 border border-zinc-800" />
)`,
    usageCode: `<DotMatrixCanvas />`,
  },
  {
    id: "particle-network-canvas",
    name: "ParticleNetworkCanvas",
    title: "Particle Constellation Network",
    subtitle:
      "Dynamic constellation canvas with interconnected physics nodes and mouse attraction.",
    category: "spatial",
    categoryLabel: "Display & 3D",
    tags: ["Particles", "Constellation", "Canvas", "Physics", "Network"],
    difficulty: "Advanced",
    cliCommand: "npx depth-ui add particle-network",
    dependencies: ["lucide-react"],
    code: `export const ParticleNetworkCanvas = () => (
  <div className="w-full h-48 rounded-2xl bg-zinc-950 border border-zinc-800 flex items-center justify-center text-white text-xs font-semibold">
    Constellation Graph Network
  </div>
)`,
    usageCode: `<ParticleNetworkCanvas />`,
  },
  {
    id: "perspective-device-mockup",
    name: "PerspectiveDeviceMockup",
    title: "3D Isometric Device Frame",
    subtitle:
      "Realistic 3D isometric browser and app frame mockup with window control dots.",
    category: "spatial",
    categoryLabel: "Display & 3D",
    tags: ["Mockup", "Isometric", "Device", "Frame", "3D"],
    difficulty: "Intermediate",
    cliCommand: "npx depth-ui add device-mockup",
    dependencies: ["lucide-react"],
    code: `export const PerspectiveDeviceMockup = () => (
  <div style={{ transform: 'rotateX(15deg) rotateY(-10deg)' }} className="rounded-2xl bg-zinc-900 border border-zinc-700 p-4 shadow-2xl">
    <div className="flex gap-1.5 mb-3"><span className="w-2.5 h-2.5 rounded-full bg-rose-500" /></div>
    <div className="h-24 rounded-xl bg-zinc-950 flex items-center justify-center text-xs text-white">Viewport</div>
  </div>
)`,
    usageCode: `<PerspectiveDeviceMockup />`,
  },
  {
    id: "radar-pulse-scanner",
    name: "RadarPulseScanner",
    title: "Circular Radar Telemetry Scanner",
    subtitle:
      "High-tech circular radar sweep animation with pulsating target telemetry blips.",
    category: "spatial",
    categoryLabel: "Display & 3D",
    tags: ["Radar", "Telemetry", "Scanner", "Circular", "Pulse"],
    difficulty: "Intermediate",
    cliCommand: "npx depth-ui add radar-scanner",
    dependencies: ["lucide-react"],
    code: `export const RadarPulseScanner = () => (
  <div className="w-32 h-32 rounded-full border border-emerald-500/40 relative flex items-center justify-center overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/30 to-transparent rounded-full animate-spin" />
    <div className="w-2 h-2 rounded-full bg-emerald-400" />
  </div>
)`,
    usageCode: `<RadarPulseScanner />`,
  },
  {
    id: "audio-visualizer-bars",
    name: "AudioVisualizerBars",
    title: "Audio Equalizer Bars",
    subtitle:
      "Dynamic 3D audio frequency equalizer spectrum with simulated acoustic oscillation.",
    category: "spatial",
    categoryLabel: "Display & 3D",
    tags: ["Equalizer", "Audio", "Visualizer", "Bars", "Sound"],
    difficulty: "Beginner",
    cliCommand: "npx depth-ui add audio-visualizer",
    dependencies: ["lucide-react"],
    code: `export const AudioVisualizerBars = () => (
  <div className="flex items-end gap-1.5 h-16 p-3 rounded-2xl bg-zinc-900 border border-zinc-800">
    {[40, 80, 60, 95, 50, 75].map((h, i) => (
      <div key={i} style={{ height: \`\${h}%\` }} className="flex-1 bg-gradient-to-t from-cyan-500 to-violet-500 rounded-t" />
    ))}
  </div>
)`,
    usageCode: `<AudioVisualizerBars />`,
  },
  {
    id: "isometric-cubes-grid",
    name: "IsometricCubesGrid",
    title: "Isometric Architecture Blocks",
    subtitle:
      "3D isometric building block diagram for cloud services and microservice architecture.",
    category: "spatial",
    categoryLabel: "Display & 3D",
    tags: ["Isometric", "Architecture", "Diagram", "Cloud", "Cubes"],
    difficulty: "Intermediate",
    cliCommand: "npx depth-ui add isometric-grid",
    dependencies: ["lucide-react"],
    code: `export const IsometricCubesGrid = () => (
  <div className="flex gap-3 p-4 rounded-2xl bg-zinc-900 border border-zinc-800">
    {['Worker', 'Cache', 'DB'].map(t => (
      <div key={t} className="w-20 p-2 text-center rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white">{t}</div>
    ))}
  </div>
)`,
    usageCode: `<IsometricCubesGrid />`,
  },
  {
    id: "holographic-badge-3d",
    name: "HolographicBadge3D",
    title: "Holographic Prismatic Badge",
    subtitle:
      "3D iridescent security and certification badge with chromatic rainbow sheen.",
    category: "spatial",
    categoryLabel: "Display & 3D",
    tags: ["Holographic", "Badge", "Prismatic", "Security", "Iridescent"],
    badge: "Trending",
    difficulty: "Intermediate",
    cliCommand: "npx depth-ui add holographic-badge",
    dependencies: ["lucide-react"],
    code: `export const HolographicBadge3D = () => (
  <div className="p-[2px] rounded-2xl bg-gradient-to-r from-violet-500 via-cyan-400 to-emerald-400">
    <div className="px-5 py-3 rounded-[14px] bg-zinc-950 text-white text-xs font-bold">
      SOC-2 Type II Certified
    </div>
  </div>
)`,
    usageCode: `<HolographicBadge3D />`,
  },
  {
    id: "3d-stacked-cards",
    name: "StackedCards3D",
    title: "3D Stacked Card Deck",
    subtitle:
      "Layered perspective card deck that fans out dynamically on cursor hover.",
    category: "spatial",
    categoryLabel: "Display & 3D",
    tags: ["Stack", "Cards", "Deck", "Perspective", "FanOut"],
    difficulty: "Intermediate",
    cliCommand: "npx depth-ui add stacked-cards",
    dependencies: ["lucide-react"],
    code: `export const StackedCards3D = () => (
  <div className="relative w-56 h-32 group">
    <div className="absolute inset-0 rounded-2xl bg-zinc-800 translate-y-3 scale-90" />
    <div className="absolute inset-0 rounded-2xl bg-zinc-900 border border-zinc-700 p-4 text-white text-xs font-bold">
      Production Deck
    </div>
  </div>
)`,
    usageCode: `<StackedCards3D />`,
  },

  // ==========================================
  // GROUP 6: MOTION & LAYOUT (9 items)
  // ==========================================
  {
    id: "swipeable-stack-cards",
    name: "SwipeableStackCards",
    title: "Swipeable Card Deck",
    subtitle:
      "Swipeable card stack with smooth gesture animations and like/pass action controls.",
    category: "motion",
    categoryLabel: "Motion & Layout",
    tags: ["Swipe", "Stack", "Cards", "Gestures", "Motion"],
    badge: "Popular",
    difficulty: "Intermediate",
    cliCommand: "npx depth-ui add swipeable-cards",
    dependencies: ["lucide-react"],
    code: `export const SwipeableStackCards = () => {
  const [idx, setIdx] = React.useState(0)
  return (
    <div className="p-6 rounded-3xl bg-gradient-to-br from-violet-600 to-indigo-600 text-white space-y-3">
      <div className="text-lg font-bold">Linear Design System</div>
      <button onClick={() => setIdx(idx + 1)} className="px-3 py-1 rounded-lg bg-black/30 text-xs">Next Card</button>
    </div>
  )
}`,
    usageCode: `<SwipeableStackCards />`,
  },
  {
    id: "expandable-bento-card",
    name: "ExpandableBentoCard",
    title: "Expandable Bento Item",
    subtitle:
      "Bento grid item with fluid layout expansion to inspect detailed telemetry.",
    category: "motion",
    categoryLabel: "Motion & Layout",
    tags: ["Bento", "Expandable", "Modal", "Layout", "Animation"],
    difficulty: "Intermediate",
    cliCommand: "npx depth-ui add expandable-bento",
    dependencies: ["lucide-react"],
    code: `export const ExpandableBentoCard = () => {
  const [open, setOpen] = React.useState(false)
  return (
    <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-2">
      <div className="flex justify-between font-bold text-white text-sm">
        <span>Edge Engine</span>
        <button onClick={() => setOpen(!open)} className="text-xs text-zinc-400">{open ? '−' : '+'}</button>
      </div>
      {open && <div className="text-xs text-zinc-400">99.4% cache hit ratio</div>}
    </div>
  )
}`,
    usageCode: `<ExpandableBentoCard />`,
  },
  {
    id: "staggered-reveal-list",
    name: "StaggeredRevealList",
    title: "Staggered Entry Reveal List",
    subtitle:
      "List container where items animate in sequentially with spring timing curves.",
    category: "motion",
    categoryLabel: "Motion & Layout",
    tags: ["Staggered", "List", "Reveal", "Spring", "Transition"],
    difficulty: "Beginner",
    cliCommand: "npx depth-ui add staggered-list",
    dependencies: ["lucide-react"],
    code: `export const StaggeredRevealList = () => (
  <div className="space-y-1.5">
    {['Automated CSS Variables', 'Hardware Acceleration', 'WAI-ARIA Compliant'].map(t => (
      <div key={t} className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white">{t}</div>
    ))}
  </div>
)`,
    usageCode: `<StaggeredRevealList />`,
  },
  {
    id: "shimmer-skeleton-card",
    name: "ShimmerSkeletonCard",
    title: "Shimmer Content Skeleton",
    subtitle:
      "Content placeholder card with fluid horizontal shimmer wave loading animation.",
    category: "motion",
    categoryLabel: "Motion & Layout",
    tags: ["Skeleton", "Shimmer", "Loading", "Placeholder", "Motion"],
    difficulty: "Beginner",
    cliCommand: "npx depth-ui add shimmer-skeleton",
    dependencies: ["lucide-react"],
    code: `export const ShimmerSkeletonCard = () => (
  <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-3">
    <div className="w-10 h-10 rounded-full bg-zinc-800 animate-pulse" />
    <div className="h-3 w-3/4 bg-zinc-800 rounded animate-pulse" />
    <div className="h-16 w-full bg-zinc-800/60 rounded-xl animate-pulse" />
  </div>
)`,
    usageCode: `<ShimmerSkeletonCard />`,
  },
  {
    id: "typewriter-headline",
    name: "TypewriterHeadline",
    title: "Dynamic Typewriter Headline",
    subtitle:
      "Hero title typewriter effect with blinking cursor and cycling word phrases.",
    category: "motion",
    categoryLabel: "Motion & Layout",
    tags: ["Typewriter", "Headline", "Text", "Animation", "Hero"],
    badge: "Popular",
    difficulty: "Intermediate",
    cliCommand: "npx depth-ui add typewriter",
    dependencies: ["lucide-react"],
    code: `export const TypewriterHeadline = ({ text = 'Next.js apps' }) => (
  <h3 className="text-xl font-bold text-white flex items-center">
    <span>{text}</span>
    <span className="w-0.5 h-5 bg-cyan-400 ml-1 animate-pulse" />
  </h3>
)`,
    usageCode: `<TypewriterHeadline />`,
  },
  {
    id: "scroll-progress-indicator",
    name: "ScrollProgressIndicator",
    title: "Scroll Percentage Progress Bar",
    subtitle:
      "Container and document reading progress bar with smooth width transitions.",
    category: "motion",
    categoryLabel: "Motion & Layout",
    tags: ["Scroll", "Progress", "Bar", "Reading", "Indicator"],
    difficulty: "Beginner",
    cliCommand: "npx depth-ui add scroll-progress",
    dependencies: ["lucide-react"],
    code: `export const ScrollProgressIndicator = ({ percent = 64 }) => (
  <div className="h-2 w-full bg-zinc-950 rounded-full overflow-hidden border border-zinc-800">
    <div style={{ width: \`\${percent}%\` }} className="h-full bg-gradient-to-r from-violet-500 to-cyan-400 rounded-full" />
  </div>
)`,
    usageCode: `<ScrollProgressIndicator percent={64} />`,
  },
  {
    id: "smooth-accordion-faq",
    name: "SmoothAccordionFaq",
    title: "Smooth FAQ Accordion",
    subtitle:
      "FAQ accordion with height tweening and active border glow on disclosure.",
    category: "motion",
    categoryLabel: "Motion & Layout",
    tags: ["Accordion", "FAQ", "Collapse", "Height", "Animation"],
    difficulty: "Beginner",
    cliCommand: "npx depth-ui add faq-accordion",
    dependencies: ["lucide-react"],
    code: `export const SmoothAccordionFaq = () => {
  const [open, setOpen] = React.useState(true)
  return (
    <div onClick={() => setOpen(!open)} className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 text-xs cursor-pointer">
      <div className="font-semibold text-white flex justify-between">Is Depth UI accessible? <span>▾</span></div>
      {open && <p className="text-zinc-400 mt-2">Yes, all components are WAI-ARIA compliant.</p>}
    </div>
  )
}`,
    usageCode: `<SmoothAccordionFaq />`,
  },
  {
    id: "floating-testimonial-carousel",
    name: "FloatingTestimonialCarousel",
    title: "Testimonial Review Carousel",
    subtitle:
      "Customer quote slider card with avatar, verified 5-star rating, and controls.",
    category: "motion",
    categoryLabel: "Motion & Layout",
    tags: ["Testimonial", "Reviews", "Carousel", "SocialProof", "Slider"],
    badge: "Popular",
    difficulty: "Intermediate",
    cliCommand: "npx depth-ui add testimonial-carousel",
    dependencies: ["lucide-react"],
    code: `export const FloatingTestimonialCarousel = () => (
  <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-3">
    <div className="text-amber-400">★★★★★</div>
    <p className="text-xs text-zinc-300 italic">"Depth UI cut our frontend development cycle in half."</p>
    <div className="text-xs font-bold text-white">Alex Rivera — CTO @ Starlight</div>
  </div>
)`,
    usageCode: `<FloatingTestimonialCarousel />`,
  },
  {
    id: "confetti-celebration",
    name: "ConfettiCelebration",
    title: "Confetti Particle Celebration",
    subtitle:
      "High-performance celebratory confetti particle trigger for onboarding and checkouts.",
    category: "motion",
    categoryLabel: "Motion & Layout",
    tags: ["Confetti", "Celebration", "Success", "Reward", "Animation"],
    badge: "Trending",
    difficulty: "Beginner",
    cliCommand: "npx depth-ui add confetti",
    dependencies: ["lucide-react"],
    code: `export const ConfettiCelebration = () => (
  <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white text-xs font-semibold shadow-lg">
    Celebrate Launch 🎉
  </button>
)`,
    usageCode: `<ConfettiCelebration />`,
  },
];
