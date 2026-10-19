import React, { useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import {
  Layers,
  Code2,
  Box,
  Compass,
  Cpu,
  Terminal,
  Activity,
  FolderGit2,
  Settings,
} from "lucide-react";

export interface DockItemData {
  id: string;
  label: string;
  icon: React.ElementType;
  action?: () => void;
  active?: boolean;
}

export interface InteractiveDockProps {
  items?: DockItemData[];
  className?: string;
}

function DockIcon({
  mouseX,
  item,
  isActive,
  onClick,
}: {
  mouseX: any;
  item: DockItemData;
  isActive: boolean;
  onClick: () => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  // Bell-curve width magnification
  const widthSync = useTransform(distance, [-120, 0, 120], [40, 64, 40]);
  const width = useSpring(widthSync, {
    mass: 0.1,
    stiffness: 180,
    damping: 15,
  });

  const IconComponent = item.icon;

  return (
    <div className="relative flex flex-col items-center">
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.9 }}
            animate={{ opacity: 1, y: -6, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.9 }}
            className="absolute -top-8 px-2 py-0.5 rounded-md bg-zinc-900 text-zinc-200 text-[11px] font-medium border border-zinc-800 shadow-md pointer-events-none whitespace-nowrap z-50"
          >
            {item.label}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        ref={ref}
        style={{ width, height: width }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onClick}
        whileTap={{ scale: 0.88 }}
        className="relative flex items-center justify-center rounded-xl bg-[#18181b] hover:bg-zinc-800 border border-zinc-800 text-zinc-300 transition-colors cursor-pointer"
      >
        <IconComponent className="w-1/2 h-1/2 text-zinc-200" />
      </motion.button>

      {/* Active dot */}
      {isActive && (
        <span className="w-1 h-1 mt-1 rounded-full bg-white shadow-xs" />
      )}
    </div>
  );
}

const defaultDockItems: DockItemData[] = [
  { id: "1", label: "Layers", icon: Layers, active: true },
  { id: "2", label: "Components", icon: Code2 },
  { id: "3", label: "Primitives", icon: Box },
  { id: "4", label: "Navigation", icon: Compass },
  { id: "5", label: "Engine", icon: Cpu },
  { id: "6", label: "Terminal", icon: Terminal },
  { id: "7", label: "Telemetry", icon: Activity },
  { id: "8", label: "Repository", icon: FolderGit2 },
  { id: "9", label: "Settings", icon: Settings },
];

export const InteractiveDock: React.FC<InteractiveDockProps> = ({
  items = defaultDockItems,
  className = "",
}) => {
  const mouseX = useMotionValue(Infinity);
  const [activeId, setActiveId] = useState(items[0]?.id || "");

  return (
    <div className={`flex justify-center items-center py-4 ${className}`}>
      <motion.div
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className="flex items-end gap-2 px-3 py-2 rounded-2xl bg-[#121215] border border-zinc-800 shadow-sm"
      >
        {items.map((item) => (
          <DockIcon
            key={item.id}
            item={item}
            mouseX={mouseX}
            isActive={activeId === item.id}
            onClick={() => {
              setActiveId(item.id);
              item.action?.();
            }}
          />
        ))}
      </motion.div>
    </div>
  );
};
export default InteractiveDock;
