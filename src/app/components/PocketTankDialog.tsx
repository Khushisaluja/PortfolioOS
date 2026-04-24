import { motion } from "motion/react";
import { RetroWindow, RetroButton } from "./RetroWindow";

export function PocketTankDialog({ onClose }: { onClose: () => void }) {
  return (
    <RetroWindow title="Pocket Tanks" onClose={onClose} width={520}>
      <div className="flex items-center gap-4 py-4">
        <motion.div
          animate={{ rotate: [0, -8, 8, -8, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 1.5 }}
          className="w-16 h-16 flex items-center justify-center bg-[#ffdd55] border-2 border-black rounded-full text-3xl"
        >
          ⚠
        </motion.div>
        <p style={{ fontSize: 26 }}>Error, it's 2026!</p>
      </div>
      <div className="flex justify-center pt-2">
        <RetroButton onClick={onClose} className="px-10" >OK</RetroButton>
      </div>
    </RetroWindow>
  );
}
