import React, { useState } from "react";
import {
  UploadCloud,
  X,
  CheckCircle2,
  FileCode,
  Image,
  RefreshCw,
} from "lucide-react";

export interface UploadedFileItem {
  id: string;
  name: string;
  size: string;
  type: string;
  progress: number;
  status: "uploading" | "complete" | "error";
}

export const FileDropzoneDemo: React.FC = () => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [files, setFiles] = useState<UploadedFileItem[]>([
    {
      id: "f1",
      name: "design-tokens-v2.json",
      size: "142 KB",
      type: "code",
      progress: 100,
      status: "complete",
    },
    {
      id: "f2",
      name: "spatial-hero-wireframe.svg",
      size: "1.8 MB",
      type: "image",
      progress: 100,
      status: "complete",
    },
  ]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    simulateUpload("dashboard-analytics-preview.png", "3.4 MB", "image");
  };

  const simulateUpload = (name: string, size: string, type: string) => {
    const newId = `f_${Date.now()}`;
    const newFile: UploadedFileItem = {
      id: newId,
      name,
      size,
      type,
      progress: 15,
      status: "uploading",
    };

    setFiles((prev) => [newFile, ...prev]);

    let currentProgress = 15;
    const interval = setInterval(() => {
      currentProgress += Math.floor(Math.random() * 25 + 15);
      if (currentProgress >= 100) {
        clearInterval(interval);
        setFiles((prev) =>
          prev.map((f) =>
            f.id === newId ? { ...f, progress: 100, status: "complete" } : f,
          ),
        );
      } else {
        setFiles((prev) =>
          prev.map((f) =>
            f.id === newId ? { ...f, progress: currentProgress } : f,
          ),
        );
      }
    }, 250);
  };

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-5">
      {/* Drag & Drop Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() =>
          simulateUpload(
            `component-export-${Date.now().toString().slice(-4)}.tsx`,
            "58 KB",
            "code",
          )
        }
        className={`relative p-8 sm:p-10 rounded-3xl border-2 border-dashed transition-all duration-200 cursor-pointer text-center select-none flex flex-col items-center justify-center space-y-3 ${
          isDragOver
            ? "border-cyan-400 bg-cyan-950/20 scale-[1.01] shadow-[0_0_20px_rgba(6,182,212,0.2)]"
            : "border-zinc-800 bg-[#111116] hover:border-zinc-700 hover:bg-[#14141a]"
        }`}
      >
        <div className="w-14 h-14 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-cyan-400 shadow-md group-hover:scale-110 transition-transform">
          <UploadCloud className="w-7 h-7" />
        </div>

        <div>
          <h4 className="text-sm sm:text-base font-bold text-white">
            {isDragOver
              ? "Drop files here to upload"
              : "Click to browse or drag and drop files"}
          </h4>
          <p className="text-xs text-zinc-400 mt-1">
            Supports TSX, JSON, SVG, PNG, WebP &amp; PDF (up to 25MB)
          </p>
        </div>

        <div className="flex items-center gap-2 pt-2">
          {["TSX / JSON", "SVG / WebP", "Max 25MB"].map((b) => (
            <span
              key={b}
              className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-zinc-900 border border-zinc-800 text-zinc-400"
            >
              {b}
            </span>
          ))}
        </div>
      </div>

      {/* Uploaded Files Queue List */}
      {files.length > 0 && (
        <div className="p-4 rounded-2xl bg-[#111116] border border-zinc-800 space-y-3">
          <div className="flex items-center justify-between text-xs font-semibold text-zinc-300 px-1 border-b border-zinc-800/80 pb-2">
            <span>Uploaded Artifacts ({files.length})</span>
            <button
              onClick={() => setFiles([])}
              className="text-[11px] font-mono text-zinc-500 hover:text-zinc-300 cursor-pointer"
            >
              Clear Queue
            </button>
          </div>

          <div className="space-y-2">
            {files.map((file) => {
              const isDone = file.status === "complete";
              return (
                <div
                  key={file.id}
                  className="p-3 rounded-xl bg-zinc-950 border border-zinc-800/80 flex items-center justify-between gap-3 shadow-sm transition-all"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="w-9 h-9 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300 shrink-0">
                      {file.type === "code" ? (
                        <FileCode className="w-4 h-4 text-cyan-400" />
                      ) : (
                        <Image className="w-4 h-4 text-violet-400" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="font-medium text-white truncate max-w-[200px] sm:max-w-xs">
                          {file.name}
                        </span>
                        <span className="text-[11px] font-mono text-zinc-500">
                          {file.size}
                        </span>
                      </div>

                      {/* Progress bar */}
                      <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all duration-200 rounded-full ${
                            isDone ? "bg-emerald-500" : "bg-cyan-400"
                          }`}
                          style={{ width: `${file.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Actions & Status */}
                  <div className="flex items-center gap-2 shrink-0">
                    {isDone ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <RefreshCw className="w-4 h-4 text-cyan-400 animate-spin" />
                    )}

                    <button
                      onClick={() => removeFile(file.id)}
                      className="p-1 rounded-md text-zinc-500 hover:text-white transition-colors cursor-pointer"
                      aria-label="Remove uploaded file"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
export default FileDropzoneDemo;
