import React, { useState } from "react";
import {
  Eye,
  EyeOff,
  Check,
  X,
  DollarSign,
  Calendar,
  Search,
  Star,
  LayoutGrid,
  List,
  Columns,
  Table,
} from "lucide-react";

// 1. Password Strength Input
export const PasswordStrengthInputDemo: React.FC = () => {
  const [password, setPassword] = useState("Passw0rd!");
  const [show, setShow] = useState(false);

  const hasLength = password.length >= 8;
  const hasNumber = /\d/.test(password);
  const hasSpecial = /[!@#$%^&*]/.test(password);
  const hasUpper = /[A-Z]/.test(password);

  const score = [hasLength, hasNumber, hasSpecial, hasUpper].filter(
    Boolean,
  ).length;

  const strengthColor =
    score <= 1
      ? "bg-rose-500"
      : score === 2
        ? "bg-amber-500"
        : score === 3
          ? "bg-cyan-500"
          : "bg-emerald-500";

  const strengthLabel =
    score <= 1
      ? "Weak"
      : score === 2
        ? "Fair"
        : score === 3
          ? "Good"
          : "Strong";

  return (
    <div className="w-full max-w-sm mx-auto space-y-3 p-5 rounded-2xl bg-[#111116] border border-zinc-800">
      <label className="text-xs font-medium text-zinc-300 block">
        Create Password
      </label>
      <div className="relative">
        <input
          type={show ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter secure password"
          className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white focus:outline-none focus:border-zinc-600 pr-10"
        />
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white cursor-pointer"
        >
          {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      </div>

      {/* Strength Bar */}
      <div className="space-y-1.5 pt-1">
        <div className="flex justify-between text-xs text-zinc-400">
          <span>Security strength:</span>
          <span className="font-semibold text-white">{strengthLabel}</span>
        </div>
        <div className="grid grid-cols-4 gap-1.5 h-1.5">
          {[1, 2, 3, 4].map((step) => (
            <div
              key={step}
              className={`rounded-full h-full transition-colors ${
                score >= step ? strengthColor : "bg-zinc-800"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Checklist */}
      <div className="grid grid-cols-2 gap-2 pt-2 text-[11px] text-zinc-400">
        <div
          className={`flex items-center gap-1.5 ${hasLength ? "text-emerald-400" : ""}`}
        >
          <Check className="w-3.5 h-3.5" /> 8+ Characters
        </div>
        <div
          className={`flex items-center gap-1.5 ${hasUpper ? "text-emerald-400" : ""}`}
        >
          <Check className="w-3.5 h-3.5" /> Uppercase
        </div>
        <div
          className={`flex items-center gap-1.5 ${hasNumber ? "text-emerald-400" : ""}`}
        >
          <Check className="w-3.5 h-3.5" /> Number
        </div>
        <div
          className={`flex items-center gap-1.5 ${hasSpecial ? "text-emerald-400" : ""}`}
        >
          <Check className="w-3.5 h-3.5" /> Symbol
        </div>
      </div>
    </div>
  );
};

// 2. Tag Multi Input
export const TagMultiInputDemo: React.FC = () => {
  const [tags, setTags] = useState(["React", "Tailwind", "TypeScript"]);
  const [inputVal, setInputVal] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === "Enter" || e.key === ",") && inputVal.trim()) {
      e.preventDefault();
      const clean = inputVal.trim().replace(/^,|,$/g, "");
      if (clean && !tags.includes(clean) && tags.length < 8) {
        setTags([...tags, clean]);
        setInputVal("");
      }
    } else if (e.key === "Backspace" && !inputVal && tags.length > 0) {
      setTags(tags.slice(0, -1));
    }
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-2 p-5 rounded-2xl bg-[#111116] border border-zinc-800">
      <div className="flex justify-between items-center text-xs">
        <label className="font-medium text-zinc-300">
          Skills &amp; Keywords
        </label>
        <span className="text-zinc-500">{tags.length}/8 tags</span>
      </div>

      <div className="flex flex-wrap items-center gap-1.5 p-2 rounded-xl bg-zinc-950 border border-zinc-800 min-h-[46px] focus-within:border-zinc-600 transition-colors">
        {tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-zinc-800 text-xs font-medium text-zinc-200 border border-zinc-700/60"
          >
            <span>{tag}</span>
            <button
              onClick={() => setTags(tags.filter((t) => t !== tag))}
              className="text-zinc-400 hover:text-white cursor-pointer"
            >
              <X className="w-3 h-3" />
            </button>
          </span>
        ))}

        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={
            tags.length < 8 ? "Type tag and hit Enter..." : "Limit reached"
          }
          disabled={tags.length >= 8}
          className="flex-1 min-w-[120px] bg-transparent text-xs text-white placeholder-zinc-500 focus:outline-none py-1 px-1.5"
        />
      </div>
      <p className="text-[11px] text-zinc-500">
        Press Enter or Comma to add tags. Backspace to delete.
      </p>
    </div>
  );
};

// 3. Currency Number Input
export const CurrencyNumberInputDemo: React.FC = () => {
  const [amount, setAmount] = useState("1,250.00");

  const setPreset = (val: number) => {
    setAmount(
      val.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
    );
  };

  return (
    <div className="w-full max-w-sm mx-auto space-y-3 p-5 rounded-2xl bg-[#111116] border border-zinc-800">
      <label className="text-xs font-medium text-zinc-300 block">
        Contribution Amount
      </label>
      <div className="relative">
        <DollarSign className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-sm font-semibold text-white focus:outline-none focus:border-zinc-600"
        />
      </div>

      <div className="flex items-center gap-1.5">
        {[250, 500, 1000, 2500].map((val) => (
          <button
            key={val}
            onClick={() => setPreset(val)}
            className="flex-1 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-medium text-zinc-300 hover:text-white transition-colors cursor-pointer"
          >
            ${val}
          </button>
        ))}
      </div>
    </div>
  );
};

// 4. Phone Country Input
export const PhoneCountryInputDemo: React.FC = () => {
  const [country, setCountry] = useState("+1");
  const [phone, setPhone] = useState("415-555-0198");

  return (
    <div className="w-full max-w-sm mx-auto space-y-2 p-5 rounded-2xl bg-[#111116] border border-zinc-800">
      <label className="text-xs font-medium text-zinc-300 block">
        Phone Number
      </label>
      <div className="flex items-center rounded-xl bg-zinc-950 border border-zinc-800 focus-within:border-zinc-600 transition-colors">
        <select
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="bg-transparent px-3 py-2.5 text-xs text-zinc-300 focus:outline-none border-r border-zinc-800 cursor-pointer"
        >
          <option value="+1">🇺🇸 +1</option>
          <option value="+44">🇬🇧 +44</option>
          <option value="+49">🇩🇪 +49</option>
          <option value="+91">🇮🇳 +91</option>
          <option value="+81">🇯🇵 +81</option>
        </select>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone number"
          className="flex-1 px-3 py-2.5 bg-transparent text-xs text-white focus:outline-none"
        />
      </div>
      <p className="text-[11px] text-zinc-500">
        We send automated 2FA security verification SMS.
      </p>
    </div>
  );
};

// 5. Textarea Char Count
export const TextareaCharCountDemo: React.FC = () => {
  const [text, setText] = useState(
    "Depth UI components are production-ready and fully accessible.",
  );
  const max = 140;

  return (
    <div className="w-full max-w-md mx-auto space-y-2 p-5 rounded-2xl bg-[#111116] border border-zinc-800">
      <div className="flex justify-between items-center text-xs">
        <label className="font-medium text-zinc-300">Project Description</label>
        <span
          className={`text-[11px] font-medium ${text.length > max ? "text-rose-400" : "text-zinc-400"}`}
        >
          {max - text.length} chars left
        </span>
      </div>

      <textarea
        rows={3}
        value={text}
        maxLength={max}
        onChange={(e) => setText(e.target.value)}
        className="w-full p-3 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white focus:outline-none focus:border-zinc-600 resize-none leading-relaxed"
      />
    </div>
  );
};

// 6. Rating Feedback Picker
export const RatingFeedbackPickerDemo: React.FC = () => {
  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState(0);

  return (
    <div className="w-full max-w-sm mx-auto space-y-3 p-5 rounded-2xl bg-[#111116] border border-zinc-800 text-center">
      <h4 className="text-sm font-semibold text-white">Rate your experience</h4>
      <div className="flex items-center justify-center gap-2">
        {[1, 2, 3, 4, 5].map((star) => {
          const active = hover ? hover >= star : rating >= star;
          return (
            <button
              key={star}
              type="button"
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
              onClick={() => setRating(star)}
              className="p-1 transition-transform hover:scale-125 cursor-pointer"
            >
              <Star
                className={`w-6 h-6 transition-colors ${
                  active ? "text-amber-400 fill-amber-400" : "text-zinc-600"
                }`}
              />
            </button>
          );
        })}
      </div>
      <p className="text-xs text-zinc-400">
        {rating === 5
          ? "Exceptional! Thank you!"
          : `You rated ${rating} out of 5 stars`}
      </p>
    </div>
  );
};

// 7. Date Range Picker
export const DateRangePickerDemo: React.FC = () => {
  const [range, setRange] = useState("Last 30 Days");
  const presets = [
    "Last 7 Days",
    "Last 30 Days",
    "This Quarter",
    "Year to Date",
  ];

  return (
    <div className="w-full max-w-sm mx-auto space-y-3 p-5 rounded-2xl bg-[#111116] border border-zinc-800">
      <div className="flex items-center justify-between text-xs">
        <label className="font-medium text-zinc-300">Date Range Filter</label>
        <span className="text-zinc-400 flex items-center gap-1">
          <Calendar className="w-3.5 h-3.5" />
          {range}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-1.5">
        {presets.map((p) => (
          <button
            key={p}
            onClick={() => setRange(p)}
            className={`px-3 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer border ${
              range === p
                ? "bg-zinc-800 text-white border-zinc-600 shadow-xs"
                : "bg-zinc-950 text-zinc-400 border-zinc-800 hover:text-white"
            }`}
          >
            {p}
          </button>
        ))}
      </div>
    </div>
  );
};

// 8. Segmented Button Group
export const SegmentedButtonGroupDemo: React.FC = () => {
  const [view, setView] = useState<"grid" | "list" | "columns" | "table">(
    "grid",
  );
  const options = [
    { id: "grid", label: "Grid", icon: LayoutGrid },
    { id: "list", label: "List", icon: List },
    { id: "columns", label: "Kanban", icon: Columns },
    { id: "table", label: "Table", icon: Table },
  ] as const;

  return (
    <div className="w-full max-w-md mx-auto p-5 rounded-2xl bg-[#111116] border border-zinc-800 space-y-3">
      <div className="flex justify-between items-center text-xs">
        <span className="font-medium text-zinc-300">Layout Presentation</span>
        <span className="text-zinc-400 capitalize">{view} View Active</span>
      </div>

      <div className="flex items-center p-1 bg-zinc-950 rounded-xl border border-zinc-800">
        {options.map((opt) => {
          const Icon = opt.icon;
          const active = view === opt.id;
          return (
            <button
              key={opt.id}
              onClick={() => setView(opt.id)}
              className={`flex-1 py-1.5 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                active
                  ? "bg-zinc-800 text-white shadow-xs"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{opt.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

// 9. Search Autocomplete Input
export const SearchAutocompleteInputDemo: React.FC = () => {
  const [query, setQuery] = useState("");
  const suggestions = [
    "Button Suite",
    "Interactive 3D Cube",
    "OTP Pin Input",
    "Gradient Glow Card",
    "Command Palette",
  ];
  const filtered = suggestions.filter((s) =>
    s.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div className="w-full max-w-md mx-auto space-y-2 p-5 rounded-2xl bg-[#111116] border border-zinc-800">
      <label className="text-xs font-medium text-zinc-300 block">
        Instant Component Search
      </label>
      <div className="relative">
        <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search 100+ primitives..."
          className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white focus:outline-none focus:border-zinc-600"
        />
      </div>

      {query && (
        <div className="p-1.5 rounded-xl bg-zinc-950 border border-zinc-800 space-y-0.5">
          {filtered.length > 0 ? (
            filtered.map((item) => (
              <div
                key={item}
                onClick={() => setQuery(item)}
                className="px-3 py-1.5 rounded-lg hover:bg-zinc-800 text-xs text-zinc-300 hover:text-white cursor-pointer transition-colors"
              >
                {item}
              </div>
            ))
          ) : (
            <div className="px-3 py-1.5 text-xs text-zinc-500">
              No matching components found
            </div>
          )}
        </div>
      )}
    </div>
  );
};
