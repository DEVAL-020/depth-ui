import React, { useState } from "react";
import { ChevronRight, ChevronLeft, Home } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
  isCurrent?: boolean;
}

export const Breadcrumb: React.FC<{ items: BreadcrumbItem[] }> = ({
  items,
}) => {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center text-xs text-zinc-400"
    >
      <ol className="flex items-center gap-1.5 flex-wrap">
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <li key={idx} className="flex items-center gap-1.5">
              {idx > 0 && (
                <ChevronRight className="w-3.5 h-3.5 text-zinc-600 shrink-0" />
              )}
              {idx === 0 && (
                <Home className="w-3.5 h-3.5 text-zinc-500 mr-0.5" />
              )}
              {isLast || item.isCurrent ? (
                <span className="font-medium text-white" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <a
                  href={item.href || "#"}
                  className="hover:text-zinc-200 transition-colors"
                >
                  {item.label}
                </a>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-between gap-2 pt-2">
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#18181b] border border-zinc-800 text-xs text-zinc-300 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
      >
        <ChevronLeft className="w-3.5 h-3.5" />
        <span>Previous</span>
      </button>

      <div className="flex items-center gap-1">
        {pages.map((p) => {
          const isActive = p === currentPage;
          return (
            <button
              key={p}
              onClick={() => onPageChange(p)}
              className={`w-8 h-8 rounded-lg text-xs font-mono font-medium transition-colors cursor-pointer ${
                isActive
                  ? "bg-white text-black font-bold shadow-xs"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
              }`}
            >
              {p}
            </button>
          );
        })}
      </div>

      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#18181b] border border-zinc-800 text-xs text-zinc-300 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
      >
        <span>Next</span>
        <ChevronRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};

export const BreadcrumbPaginationDemo: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(2);

  const breadcrumbItems: BreadcrumbItem[] = [
    { label: "Workspaces", href: "#" },
    { label: "Infrastructure", href: "#" },
    { label: "Edge Clusters", isCurrent: true },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6 p-6 rounded-2xl bg-[#121215] border border-zinc-800">
      {/* Breadcrumb Trail */}
      <div className="space-y-2">
        <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">
          Hierarchical Breadcrumbs
        </span>
        <div className="p-3 rounded-xl bg-[#18181b] border border-zinc-800">
          <Breadcrumb items={breadcrumbItems} />
        </div>
      </div>

      {/* Pagination Bar */}
      <div className="space-y-2 pt-3 border-t border-zinc-800/80">
        <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">
          Pagination Control
        </span>
        <Pagination
          currentPage={currentPage}
          totalPages={5}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default BreadcrumbPaginationDemo;
