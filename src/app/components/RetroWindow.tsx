import { motion } from "motion/react";
import { ReactNode } from "react";

type Props = {
  title: string;
  onClose: () => void;
  children: ReactNode;
  width?: number;
};

export function RetroWindow({ title, onClose, children, width = 520 }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="fixed left-1/2 top-1/2 z-[1000] -translate-x-1/2 -translate-y-1/2 px-3 sm:px-0"
      style={{ width, maxWidth: "calc(100vw - 24px)" }}
    >
      <div
        className="bg-[#bfbfbf] p-[3px]"
        style={{
          boxShadow:
            "inset -2px -2px 0 0 #000, inset 2px 2px 0 0 #fff, inset -3px -3px 0 0 #808080, inset 3px 3px 0 0 #dbdbdb",
        }}
      >
        <div className="flex items-center justify-between bg-gradient-to-r from-[#00007b] to-[#1085d2] px-2 py-1">
          <span className="font-mono text-white select-none" style={{ fontFamily: "'MS Sans Serif', Tahoma, sans-serif" }}>
            {title}
          </span>
          <div className="flex gap-1">
            <RetroBtn label="_" />
            <RetroBtn label="□" />
            <RetroBtn label="×" onClick={onClose} />
          </div>
        </div>
        <div className="bg-[#bfbfbf] p-4" style={{ fontFamily: "'MS Sans Serif', Tahoma, sans-serif" }}>
          {children}
        </div>
      </div>
    </motion.div>
  );
}

function RetroBtn({ label, onClick }: { label: string; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-6 h-5 bg-[#bfbfbf] text-black flex items-center justify-center active:translate-y-[1px]"
      style={{
        boxShadow:
          "inset -1px -1px 0 0 #000, inset 1px 1px 0 0 #fff, inset -2px -2px 0 0 #808080, inset 2px 2px 0 0 #dbdbdb",
        fontFamily: "'MS Sans Serif', Tahoma, sans-serif",
        lineHeight: 1,
      }}
    >
      {label}
    </button>
  );
}

export function RetroButton({
  children,
  onClick,
  className = "",
  type = "button",
}: {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit";
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-4 py-1 bg-[#bfbfbf] text-black active:translate-y-[1px] active:shadow-[inset_2px_2px_0_0_#000,inset_-1px_-1px_0_0_#fff,inset_3px_3px_0_0_#808080,inset_-2px_-2px_0_0_#dbdbdb] transition-transform hover:brightness-105 ${className}`}
      style={{
        boxShadow:
          "inset -1px -1px 0 0 #000, inset 1px 1px 0 0 #fff, inset -2px -2px 0 0 #808080, inset 2px 2px 0 0 #dbdbdb",
        fontFamily: "'MS Sans Serif', Tahoma, sans-serif",
      }}
    >
      {children}
    </button>
  );
}
