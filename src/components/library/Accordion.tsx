import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

export interface AccordionItem {
  id: string;
  title: string;
  content: string | React.ReactNode;
}

export interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  defaultExpanded?: string[];
}

export const Accordion: React.FC<AccordionProps> = ({
  items,
  allowMultiple = false,
  defaultExpanded = [],
}) => {
  const [expandedIds, setExpandedIds] = useState<string[]>(defaultExpanded);

  const toggleItem = (id: string) => {
    if (allowMultiple) {
      setExpandedIds((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
      );
    } else {
      setExpandedIds((prev) => (prev.includes(id) ? [] : [id]));
    }
  };

  return (
    <div className="w-full divide-y divide-zinc-800/80 rounded-xl border border-zinc-800 bg-[#121215] overflow-hidden">
      {items.map((item) => {
        const isOpen = expandedIds.includes(item.id);
        return (
          <div key={item.id} className="transition-colors">
            <button
              type="button"
              onClick={() => toggleItem(item.id)}
              className="w-full flex items-center justify-between px-5 py-4 text-left text-sm sm:text-base font-medium text-zinc-200 hover:text-white hover:bg-zinc-800/30 transition-colors cursor-pointer"
            >
              <span>{item.title}</span>
              <ChevronDown
                className={`w-4 h-4 text-zinc-400 shrink-0 transition-transform duration-200 ${
                  isOpen ? "rotate-180 text-white" : ""
                }`}
              />
            </button>
            {isOpen && (
              <div className="px-5 pb-5 pt-2 text-xs sm:text-sm text-zinc-300 leading-relaxed border-t border-zinc-800/40 bg-zinc-900/20 animate-fadeIn">
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export const AccordionDemo: React.FC = () => {
  const faqItems: AccordionItem[] = [
    {
      id: "faq-1",
      title: "How do I copy these components into my existing project?",
      content:
        'Simply click the "Code" tab on any component card, copy the TypeScript file into your components directory, and install any peer dependencies listed in the header. Zero monolithic npm packages required.',
    },
    {
      id: "faq-2",
      title: "Can I customize colors, borders, and animations?",
      content:
        "Yes. All components are written in standard Tailwind classes and clean CSS variables. You can modify tokens directly or wrap them in your application design system theme.",
    },
    {
      id: "faq-3",
      title: "Are these components accessible (WCAG AA)?",
      content:
        "Yes. All interactive primitives feature keyboard navigation (Tab, Enter, Escape, Arrow keys), ARIA roles, focus visible rings, and high-contrast color ratios.",
    },
    {
      id: "faq-4",
      title: "Does it support Next.js App Router and Server Components?",
      content:
        'Yes. For interactive client primitives, simply add "use client" at the top of the file. Pure layout and atomic presentation components work seamlessly in React Server Components.',
    },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4 p-6 rounded-2xl bg-[#121215] border border-zinc-800">
      <div className="space-y-1">
        <h3 className="text-sm font-semibold text-white">
          Frequently Asked Questions
        </h3>
        <p className="text-xs text-zinc-500">
          Expandable accordion with single or multi-panel support.
        </p>
      </div>
      <Accordion items={faqItems} defaultExpanded={["faq-1"]} />
    </div>
  );
};

export default AccordionDemo;
