import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export interface HyperTextProps {
  text: string;
  duration?: number;
  animateOnHover?: boolean;
  className?: string;
}

const CHARACTERS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=~";

export const HyperText: React.FC<HyperTextProps> = ({
  text,
  duration = 800,
  animateOnHover = true,
  className = "",
}) => {
  const [displayText, setDisplayText] = useState(text);
  const [triggerCount, setTriggerCount] = useState(0);

  useEffect(() => {
    let iteration = 0;
    const intervalTime = Math.max(16, duration / (text.length * 2));

    const interval = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < iteration) {
              return text[index];
            }
            return CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
          })
          .join(""),
      );

      if (iteration >= text.length) {
        clearInterval(interval);
      }

      iteration += 1 / 2;
    }, intervalTime);

    return () => clearInterval(interval);
  }, [text, duration, triggerCount]);

  return (
    <motion.span
      onMouseEnter={() => {
        if (animateOnHover) {
          setTriggerCount((c) => c + 1);
        }
      }}
      className={`font-mono tracking-wide cursor-default select-none inline-block ${className}`}
    >
      {displayText}
    </motion.span>
  );
};
export default HyperText;
