import React, { useState, useRef, useEffect } from "react";
import { ShieldCheck, RotateCcw, Lock, Eye, EyeOff } from "lucide-react";

export interface OtpInputProps {
  length?: number;
  onComplete?: (code: string) => void;
  isMasked?: boolean;
}

export const OtpPinInputDemo: React.FC = () => {
  const length = 6;
  const [otp, setOtp] = useState<string[]>(new Array(length).fill(""));
  const [isMasked, setIsMasked] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [timer, setTimer] = useState(45);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  // Resend countdown
  useEffect(() => {
    if (timer > 0) {
      const id = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(id);
    }
  }, [timer]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const val = e.target.value;
    if (!/^\d*$/.test(val)) return;

    const newOtp = [...otp];
    newOtp[index] = val.slice(-1);
    setOtp(newOtp);

    // Auto advance to next input
    if (val && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }

    // Auto trigger verification if complete
    if (newOtp.every((digit) => digit !== "")) {
      const code = newOtp.join("");
      if (code.length === length) {
        setIsVerified(true);
      }
    } else {
      setIsVerified(false);
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, length);
    if (!pasted) return;

    const newOtp = [...otp];
    for (let i = 0; i < pasted.length; i++) {
      newOtp[i] = pasted[i];
    }
    setOtp(newOtp);

    if (pasted.length === length) {
      setIsVerified(true);
      inputsRef.current[length - 1]?.focus();
    } else {
      inputsRef.current[pasted.length]?.focus();
    }
  };

  const resetOtp = () => {
    setOtp(new Array(length).fill(""));
    setIsVerified(false);
    inputsRef.current[0]?.focus();
  };

  return (
    <div className="w-full max-w-xl mx-auto space-y-6">
      {/* Card Container */}
      <div className="p-8 sm:p-10 rounded-3xl bg-[#111116] border border-zinc-800 shadow-2xl relative overflow-hidden space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-800/80 border border-zinc-700/60 text-zinc-300 text-xs font-medium">
            <Lock className="w-3.5 h-3.5 text-zinc-400" />
            <span>Two-factor authentication</span>
          </div>
          <h3 className="text-xl font-bold text-white tracking-tight">
            Enter Authentication Code
          </h3>
          <p className="text-xs text-zinc-400 max-w-sm mx-auto leading-relaxed">
            We sent a 6-digit confirmation code to your authorized developer
            device.
          </p>
        </div>

        {/* 6-Digit OTP Box Grid */}
        <div
          className="flex items-center justify-center gap-2 sm:gap-3 py-2"
          onPaste={handlePaste}
        >
          {otp.map((digit, index) => {
            const isFilled = digit !== "";
            return (
              <input
                key={index}
                ref={(el) => {
                  inputsRef.current[index] = el;
                }}
                type={isMasked ? "password" : "text"}
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                aria-label={`Digit ${index + 1}`}
                className={`w-11 h-14 sm:w-13 sm:h-16 text-center text-xl sm:text-2xl font-mono font-bold rounded-2xl bg-zinc-950 border transition-all duration-200 focus:outline-none ${
                  isVerified
                    ? "border-emerald-500 bg-emerald-950/20 text-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.3)]"
                    : isFilled
                      ? "border-cyan-500 bg-zinc-900 text-white shadow-[0_0_10px_rgba(6,182,212,0.25)]"
                      : "border-zinc-800 text-zinc-300 focus:border-zinc-600 focus:ring-2 focus:ring-cyan-500/20"
                }`}
              />
            );
          })}
        </div>

        {/* Verification Status Feedback */}
        {isVerified ? (
          <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs font-medium flex items-center justify-center gap-2 animate-in fade-in duration-150">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              Code verified successfully! Token issued: &quot;{otp.join("")}
              &quot;
            </span>
          </div>
        ) : (
          <div className="flex items-center justify-between text-xs text-zinc-400 px-1">
            <button
              onClick={() => setIsMasked(!isMasked)}
              className="flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              {isMasked ? (
                <Eye className="w-3.5 h-3.5" />
              ) : (
                <EyeOff className="w-3.5 h-3.5" />
              )}
              <span>{isMasked ? "Show Digits" : "Mask Digits"}</span>
            </button>

            <span className="text-xs text-zinc-500">
              {timer > 0 ? (
                <>
                  Resend code in{" "}
                  <span className="text-zinc-300 font-medium">{timer}s</span>
                </>
              ) : (
                <button
                  onClick={() => setTimer(45)}
                  className="text-zinc-200 hover:text-white font-medium cursor-pointer underline"
                >
                  Resend code
                </button>
              )}
            </span>
          </div>
        )}

        {/* Action Controls */}
        <div className="flex items-center gap-3 pt-2 border-t border-zinc-800">
          <button
            onClick={() => {
              const mock = ["7", "3", "9", "2", "0", "4"];
              setOtp(mock);
              setIsVerified(true);
            }}
            className="flex-1 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700/80 text-zinc-300 hover:text-white text-xs font-semibold transition-colors cursor-pointer flex items-center justify-center gap-1.5"
          >
            <span>Simulate Paste &quot;739204&quot;</span>
          </button>

          <button
            onClick={resetOtp}
            className="p-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800 transition-colors cursor-pointer"
            aria-label="Reset OTP fields"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
export default OtpPinInputDemo;
