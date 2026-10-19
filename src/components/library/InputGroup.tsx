import React, { useState } from "react";
import { Eye, EyeOff, Search, Mail, AlertCircle } from "lucide-react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
  label,
  helperText,
  error,
  leftIcon,
  rightIcon,
  className = "",
  id,
  ...props
}) => {
  const inputId =
    id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

  return (
    <div className="space-y-1.5 w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-xs sm:text-sm font-medium text-zinc-300"
        >
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {leftIcon && (
          <div className="absolute left-3.5 text-zinc-500 pointer-events-none flex items-center">
            {leftIcon}
          </div>
        )}
        <input
          id={inputId}
          className={`w-full bg-[#18181b] border rounded-xl text-sm sm:text-sm text-zinc-100 placeholder-zinc-500 py-2.5 transition-colors focus:outline-none focus:ring-1 focus:ring-zinc-400 ${
            leftIcon ? "pl-10" : "pl-3.5"
          } ${rightIcon ? "pr-10" : "pr-3.5"} ${
            error
              ? "border-red-500/80 focus:border-red-500"
              : "border-zinc-800 focus:border-zinc-600"
          } ${className}`}
          {...props}
        />
        {rightIcon && (
          <div className="absolute right-3.5 text-zinc-500 flex items-center">
            {rightIcon}
          </div>
        )}
      </div>
      {error && (
        <p className="text-xs text-red-400 flex items-center gap-1">
          <AlertCircle className="w-3.5 h-3.5" />
          <span>{error}</span>
        </p>
      )}
      {helperText && !error && (
        <p className="text-xs text-zinc-400">{helperText}</p>
      )}
    </div>
  );
};

export const InputGroupDemo: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("supersecret123");
  const [email, setEmail] = useState("developer@company.com");
  const [bio, setBio] = useState(
    "Senior frontend engineer crafting accessible web interfaces.",
  );
  const [search, setSearch] = useState("");

  const maxBio = 140;

  return (
    <div className="w-full max-w-2xl mx-auto space-y-5 p-5 sm:p-6 rounded-2xl bg-[#121215] border border-zinc-800 shadow-sm">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Email with prefix icon */}
        <Input
          label="Email Address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          leftIcon={<Mail className="w-4 h-4" />}
          placeholder="you@domain.com"
          helperText="We'll never share your email with third parties."
        />

        {/* Password with visibility toggle */}
        <div className="space-y-1.5 w-full">
          <label className="block text-xs sm:text-sm font-medium text-zinc-300">
            Password
          </label>
          <div className="relative flex items-center">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#18181b] border border-zinc-800 rounded-xl text-sm text-zinc-100 placeholder-zinc-500 py-2.5 pl-3.5 pr-10 focus:outline-none focus:border-zinc-600 transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 text-zinc-500 hover:text-zinc-300 cursor-pointer"
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
          <p className="text-xs text-zinc-400">
            Must be at least 8 characters long.
          </p>
        </div>
      </div>

      {/* Search Input */}
      <Input
        label="Search Repositories"
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        leftIcon={<Search className="w-4 h-4" />}
        placeholder="Filter by name, tags, or author..."
      />

      {/* Textarea with Character Counter */}
      <div className="space-y-1.5">
        <div className="flex justify-between items-center">
          <label className="block text-xs sm:text-sm font-medium text-zinc-300">
            Bio / Description
          </label>
          <span
            className={`text-xs font-mono ${bio.length > maxBio ? "text-red-400" : "text-zinc-400"}`}
          >
            {bio.length} / {maxBio}
          </span>
        </div>
        <textarea
          rows={3}
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Write a brief description..."
          className="w-full bg-[#18181b] border border-zinc-800 rounded-xl text-sm text-zinc-100 placeholder-zinc-500 p-3.5 focus:outline-none focus:border-zinc-600 transition-colors resize-none leading-relaxed"
        />
      </div>
    </div>
  );
};

export default InputGroupDemo;
