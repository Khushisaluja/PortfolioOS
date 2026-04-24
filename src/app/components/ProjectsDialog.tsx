import { motion } from "motion/react";
import { RetroWindow, RetroButton } from "./RetroWindow";

const projects = [
  {
    name: "Velo",
    desc: "Campus Bicycle Sharing & Dock-Based Mobility Coordination System",
    url: "https://velo.figma.site/",
  },
  {
    name: "PawNet",
    desc: "Hyperlocal Animal Emergency & Reunification Coordination System",
    url: "https://pawnet.figma.site/",
  },
  {
    name: "MenuScrript",
    desc: "Holistic AI-Native Meal Planning & Nutrition Intelligence Platform",
    url: "https://menu-scrript.figma.site/",
  },
];

export function ProjectsDialog({ onClose }: { onClose: () => void }) {
  return (
    <RetroWindow title="Projects" onClose={onClose} width={560}>
      <div className="flex flex-col gap-5">
        {projects.map((p, i) => (
          <motion.div
            key={p.name}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08 }}
            className="flex items-start gap-4"
          >
            <div className="flex-1">
              <p style={{ fontSize: 22 }}>{p.name}</p>
              <p className="text-black/80" style={{ fontFamily: "'Segoe UI', sans-serif", fontSize: 13 }}>
                {p.desc}
              </p>
            </div>
            <RetroButton onClick={() => window.open(p.url, "_blank")}>View</RetroButton>
          </motion.div>
        ))}
        <div className="flex justify-center pt-2">
          <RetroButton onClick={onClose} className="px-8">
            Cancel
          </RetroButton>
        </div>
      </div>
    </RetroWindow>
  );
}
