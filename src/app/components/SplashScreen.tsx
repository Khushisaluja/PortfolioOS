import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import khushiLogo from "../../imports/khushi-logo.png";

type Phase = "boot" | "logo" | "bar" | "done";

const DOTS = [0, 1, 2, 3, 4];

export function SplashScreen({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<Phase>("boot");
  const [progress, setProgress] = useState(0);
  const [activeDot, setActiveDot] = useState(-1);

  useEffect(() => {
    // boot text → logo
    const t1 = setTimeout(() => setPhase("logo"), 600);
    // logo → loading bar
    const t2 = setTimeout(() => setPhase("bar"), 1800);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  // Animate the rolling dots once bar phase starts
  useEffect(() => {
    if (phase !== "bar") return;
    let dot = 0;
    const dotInterval = setInterval(() => {
      setActiveDot(dot % DOTS.length);
      dot++;
    }, 120);
    return () => clearInterval(dotInterval);
  }, [phase]);

  // Progress bar fill
  useEffect(() => {
    if (phase !== "bar") return;
    let val = 0;
    const interval = setInterval(() => {
      val += Math.random() * 18 + 6;
      if (val >= 100) {
        val = 100;
        setProgress(100);
        clearInterval(interval);
        setTimeout(() => setPhase("done"), 300);
        setTimeout(onDone, 700);
      } else {
        setProgress(val);
      }
    }, 120);
    return () => clearInterval(interval);
  }, [phase, onDone]);

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ background: "#000" }}
        >
          {/* Boot text flicker */}
          <AnimatePresence>
            {phase === "boot" && (
              <motion.div
                key="boot"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0.6, 1] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute top-8 left-8 text-left"
              >
                {["BIOS v2.6 — KhushiOS", "CPU: Creative @ 4.2GHz", "Memory check... OK", "Loading KhushiOS..."].map((line, i) => (
                  <motion.p
                    key={line}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.1 }}
                    style={{
                      fontFamily: "'Courier New', monospace",
                      fontSize: 12,
                      color: "#aaa",
                      lineHeight: 1.8,
                    }}
                  >
                    {line}
                  </motion.p>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Logo */}
          <AnimatePresence>
            {(phase === "logo" || phase === "bar") && (
              <motion.div
                key="logo"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="flex flex-col items-center gap-8"
              >
                <img
                  src={khushiLogo}
                  alt="Khushi"
                  style={{ width: 180, objectFit: "contain", filter: "drop-shadow(0 0 24px rgba(255,255,255,0.15))" }}
                />

                {/* Windows-style rolling dots */}
                <AnimatePresence>
                  {phase === "bar" && (
                    <motion.div
                      key="dots"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex flex-col items-center gap-4"
                    >
                      <div className="flex gap-2">
                        {DOTS.map((i) => (
                          <motion.div
                            key={i}
                            animate={{
                              scale: activeDot === i ? 1.5 : 0.8,
                              opacity: activeDot === i ? 1 : 0.25,
                            }}
                            transition={{ duration: 0.1 }}
                            style={{
                              width: 8,
                              height: 8,
                              borderRadius: "50%",
                              background: "#fff",
                            }}
                          />
                        ))}
                      </div>

                      {/* Thin progress bar */}
                      <div
                        style={{
                          width: 200,
                          height: 2,
                          background: "rgba(255,255,255,0.15)",
                          borderRadius: 2,
                          overflow: "hidden",
                        }}
                      >
                        <motion.div
                          animate={{ width: `${progress}%` }}
                          transition={{ ease: "easeOut", duration: 0.15 }}
                          style={{
                            height: "100%",
                            background: "#fff",
                            borderRadius: 2,
                          }}
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
