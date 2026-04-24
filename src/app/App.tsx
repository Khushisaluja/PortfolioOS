import { useState } from "react";
import { AnimatePresence } from "motion/react";
import { Desktop } from "./components/Desktop";
import { MenuBar } from "./components/MenuBar";
import { GhostCursor } from "./components/GhostCursor";
import { ProjectsDialog } from "./components/ProjectsDialog";
import { ContactDialog } from "./components/ContactDialog";
import { PocketTankDialog } from "./components/PocketTankDialog";
import { RetroWindow, RetroButton } from "./components/RetroWindow";
import { SplashScreen } from "./components/SplashScreen";

type DialogKey =
  | "projects"
  | "contact"
  | "resume"
  | "koffee"
  | "about"
  | "pocket"
  | null;

const RESUME_URL = "https://drive.google.com/file/d/1y7aI8Gcf7iXtkR0WofsHYSgLV0CpgT7v/view";
const KOFFEE_URL = "https://khushi-koffee.vercel.app/";

export default function App() {
  const [booted, setBooted] = useState(false);
  const [dialog, setDialog] = useState<DialogKey>(null);

  const open = (k: Exclude<DialogKey, null>) => {
    if (k === "resume") {
      window.open(RESUME_URL, "_blank");
      return;
    }
    if (k === "koffee") {
      window.open(KOFFEE_URL, "_blank");
      return;
    }
    setDialog(k);
  };

  const close = () => setDialog(null);

  return (
    <div className="relative w-full h-full overflow-hidden" style={{ cursor: "default" }}>
      {!booted && <SplashScreen onDone={() => setBooted(true)} />}
      <Desktop onOpen={open} />
      <MenuBar />
      <GhostCursor />

      <AnimatePresence>
        {dialog === "projects" && <ProjectsDialog key="p" onClose={close} />}
        {dialog === "contact" && <ContactDialog key="c" onClose={close} />}
        {dialog === "pocket" && <PocketTankDialog key="pt" onClose={close} />}
        {dialog === "about" && (
          <RetroWindow key="a" title="About" onClose={close} width={400}>
            <p style={{ fontSize: 16, lineHeight: 1.5 }}>
              Hi! I'm Khushi, a designer living between pixels and paper.
              Obsessed with little systems, puppies, and a really good cup of coffee.
            </p>
            <div className="flex justify-end pt-4">
              <RetroButton onClick={close}>OK</RetroButton>
            </div>
          </RetroWindow>
        )}
      </AnimatePresence>
    </div>
  );
}
