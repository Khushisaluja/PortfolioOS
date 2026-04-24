import { motion } from "motion/react";
import { useState } from "react";
import { useIsMobile } from "./ui/use-mobile";
import imgBackground from "../../imports/MacBookPro168/new-background.png";
import imgSubtract from "../../imports/MacBookPro168/11c3ad4ba8a34206e1630c9754cccb7f3f0841d7.png";
import imgSubject21 from "../../imports/MacBookPro168/e41c5067eb5e47f831612845210d809613eca12c.png";
import imgBack1 from "../../imports/MacBookPro168/4a972acc3273ce3d6a48033795b9600f1129f260.png";
import imgFront from "../../imports/MacBookPro168/9a4c3fad758bbc0060be03ae041d08bf51523303.png";
import imgMprui1 from "../../imports/MacBookPro168/78f06ad2977a0e91b4745dd1c7c73424a58ae1cb.png";
import imgMprui2 from "../../imports/MacBookPro168/a2c792da01a6cfb99d70e8138c5f9c3b093cdb70.png";
import { imgBack } from "../../imports/MacBookPro168/svg-jrguz";

type FolderKey = "projects" | "contact" | "resume" | "koffee" | "about";

const FOLDER_LG = { w: 130, h: 109, tab: 18, fontSize: 21, radius: 10 };
const FOLDER_SM = { w: 90,  h: 75,  tab: 12, fontSize: 15, radius: 7  };

function Folder({
  label,
  onClick,
  style,
  small,
}: {
  label: string;
  onClick: () => void;
  style?: React.CSSProperties;
  small?: boolean;
}) {
  const { w, h, tab, fontSize, radius } = small ? FOLDER_SM : FOLDER_LG;

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ y: -6, scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 18 }}
      className="flex flex-col items-center cursor-pointer group"
      style={{ width: w, gap: small ? 6 : 10, position: style ? "absolute" : "relative", ...style }}
    >
      <div
        className="drop-shadow-[0_3px_6px_rgba(0,0,0,0.35)] transition-all group-hover:drop-shadow-[0_8px_18px_rgba(0,160,255,0.6)]"
        style={{ position: "relative", width: w, height: h }}
      >
        <div
          className="absolute inset-0"
          style={{
            maskImage: `url('${imgBack}')`,
            maskSize: `${w}px ${h}px`,
            maskRepeat: "no-repeat",
          }}
        >
          <img src={imgBack1} className="w-full h-full object-cover" alt="" />
        </div>
        <div
          className="absolute left-0"
          style={{
            top: tab,
            width: w,
            height: h - tab,
            maskImage: `url('${imgBack}')`,
            maskSize: `${w}px ${h}px`,
            maskPosition: `0 -${tab}px`,
            maskRepeat: "no-repeat",
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              borderRadius: radius,
              background: "linear-gradient(to bottom, #73d7ff, #6bcbf3)",
              boxShadow:
                "inset 0 1px 1px rgba(255,255,255,0.25), inset 0 -5px 20px rgba(12,112,168,0.3)",
            }}
          />
          <div
            className="absolute inset-0 mix-blend-multiply opacity-10"
            style={{ borderRadius: radius, backgroundImage: `url('${imgFront}')`, backgroundSize: "70px 70px" }}
          />
        </div>
      </div>
      <span
        className="text-white text-center select-none"
        style={{
          fontFamily: "'SF Pro', -apple-system, sans-serif",
          fontWeight: 600,
          fontSize,
          textShadow: "3px 3px 5px rgba(0,0,0,0.7), 0 0 8px rgba(0,0,0,0.5)",
        }}
      >
        {label}
      </span>
    </motion.button>
  );
}

const greetingBubble = (fontSize: number, below = false) => (
  <motion.div
    initial={{ opacity: 0, y: below ? -10 : 10, scale: 0.8 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ type: "spring", stiffness: 400, damping: 18 }}
    className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap pointer-events-none"
    style={below ? { top: "calc(100% + 12px)" } : { bottom: "calc(100% + 12px)" }}
  >
    <div
      className="relative bg-white text-black px-5 py-2 rounded-full shadow-[0_8px_20px_rgba(0,0,0,0.3)]"
      style={{ fontFamily: "'Ancizar Serif', serif", fontSize, fontStyle: "italic" }}
    >
      Hi, I'm Khushi. I design :)
      {below ? (
        <div className="absolute left-1/2 -top-2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-white" />
      ) : (
        <div className="absolute left-1/2 -bottom-2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white" />
      )}
    </div>
  </motion.div>
);

export function Desktop({ onOpen }: { onOpen: (k: FolderKey) => void }) {
  const [subjectHover, setSubjectHover] = useState(false);
  const [greetingVisible, setGreetingVisible] = useState(false);
  const isMobile = useIsMobile();

  return (
    <div className="relative w-full h-full overflow-hidden">
      <img
        src={imgBackground}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />

      {isMobile ? (
        /* ── Mobile layout ── */
        <div
          className="absolute inset-0 flex flex-col items-center overflow-y-auto"
          style={{ paddingTop: 44, paddingBottom: 52 }}
        >
          {/* Caption at top */}
          <p
            className="text-white text-center px-6 mt-4 mb-1"
            style={{
              fontFamily: "'Ancizar Serif', serif",
              fontSize: 15,
              textShadow: "4px 5px 4px rgba(0,0,0,0.4)",
              maxWidth: 320,
            }}
          >
            A 90s crossover between <b><i>Windows</i></b> and <b><i>macOS</i></b>...
          </p>
          <p
            className="text-white/40 text-center px-6 mb-6 select-none"
            style={{ fontFamily: "'Ancizar Serif', serif", fontSize: 12, fontStyle: "italic" }}
          >
            (website better optimized for desktop)
          </p>

          {/* Folder grid */}
          <div
            className="grid gap-x-8 gap-y-6 mb-8"
            style={{ gridTemplateColumns: "repeat(2, 90px)" }}
          >
            <Folder label="Projects" onClick={() => onOpen("projects")} small />
            <Folder label="Contact"  onClick={() => onOpen("contact")}  small />
            <Folder label="Resume"   onClick={() => onOpen("resume")}   small />
            <Folder label="Koffee!"  onClick={() => onOpen("koffee")}   small />
            <Folder label="About"    onClick={() => onOpen("about")}    small />
          </div>

          {/* Character – cropped to head/shoulders, tap to toggle greeting */}
          <div className="relative flex flex-col items-center">
            {/* Bubble lives outside overflow-hidden so it isn't clipped */}
            {greetingVisible && (
              <motion.div
                initial={{ opacity: 0, y: 6, scale: 0.85 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 18 }}
                className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap pointer-events-none z-10"
              >
                <div
                  className="relative bg-white text-black px-4 py-1.5 rounded-full shadow-[0_8px_20px_rgba(0,0,0,0.3)]"
                  style={{ fontFamily: "'Ancizar Serif', serif", fontSize: 14, fontStyle: "italic" }}
                >
                  Hi, I'm Khushi. I design :)
                  <div className="absolute left-1/2 -bottom-2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white" />
                </div>
              </motion.div>
            )}
            <p
              className="text-white/70 text-xs mb-2 select-none"
              style={{ fontFamily: "'SF Pro', -apple-system, sans-serif" }}
            >
              tap to say hi 👇
            </p>
            <motion.div
              onClick={() => setGreetingVisible((v) => !v)}
              className="cursor-pointer overflow-hidden"
              style={{ width: 110, height: 140, borderRadius: "50% 50% 0 0" }}
            >
              <img
                src={imgSubject21}
                alt="Khushi"
                className="absolute w-full object-cover object-top"
                style={{ height: 260 }}
              />
            </motion.div>
          </div>
        </div>
      ) : (
        /* ── Desktop layout (unchanged) ── */
        <>
          <img
            src={imgSubtract}
            alt=""
            className="absolute pointer-events-none"
            style={{ left: "34%", right: "37%", top: "27.5%", bottom: "15.5%", width: "29%", height: "57%", objectFit: "contain" }}
          />

          <motion.div
            onMouseEnter={() => setSubjectHover(true)}
            onMouseLeave={() => setSubjectHover(false)}
            whileHover={{ scale: 1.03 }}
            className="absolute cursor-pointer"
            style={{ left: "44%", top: "19.8%", width: "12.2%", height: "52%" }}
          >
            <img src={imgSubject21} alt="Khushi" className="w-full h-full object-contain" />
            {subjectHover && greetingBubble(22)}
          </motion.div>

          <Folder label="Projects" onClick={() => onOpen("projects")} style={{ left: "7%",  top: "27%" }} />
          <Folder label="Contact"  onClick={() => onOpen("contact")}  style={{ left: "73%", top: "27%" }} />
          <Folder label="Resume"   onClick={() => onOpen("resume")}   style={{ left: "20%", top: "56%" }} />
          <Folder label="Koffee!"  onClick={() => onOpen("koffee")}   style={{ left: "85%", top: "45%" }} />
          <Folder label="About"    onClick={() => onOpen("about")}    style={{ left: "74%", top: "64%" }} />

          <p
            className="absolute text-white"
            style={{
              left: "3.5%",
              bottom: "8%",
              fontFamily: "'Ancizar Serif', serif",
              fontSize: 26,
              textShadow: "8px 10px 6px rgba(0,0,0,0.3)",
              maxWidth: "70%",
            }}
          >
            A 90s crossover between <b><i>Windows</i></b> and <b><i>macOS</i></b>...
          </p>
        </>
      )}

      <Taskbar onPocket={() => onOpen("pocket")} isMobile={isMobile} />
    </div>
  );
}

function Taskbar({ onPocket, isMobile }: { onPocket: () => void; isMobile: boolean }) {
  return (
    <div
      className="absolute bottom-0 left-0 right-0 flex items-center"
      style={{
        height: isMobile ? 44 : 40,
        background: "#245ddb",
        boxShadow:
          "inset 0 4px 4px rgba(109,178,255,0.7), inset 0 -5px 7px rgba(0,0,0,0.22), inset 0 10px 8px #3888e9",
      }}
    >
      {/* Start */}
      <motion.div
        whileHover={{ filter: "brightness(1.1)" }}
        whileTap={{ filter: "brightness(0.9)" }}
        className="h-full flex items-center cursor-pointer relative"
        style={{
          paddingLeft: isMobile ? 12 : 16,
          paddingRight: isMobile ? 16 : 32,
          background: "linear-gradient(to bottom, #278d27, #15d715)",
          borderTopRightRadius: 14,
          borderBottomRightRadius: 14,
          boxShadow: "inset 0 -5px 7px rgba(0,0,0,0.2)",
        }}
      >
        <span
          className="text-white italic"
          style={{
            fontFamily: "'Segoe UI', sans-serif",
            fontWeight: 700,
            fontSize: isMobile ? 16 : 20,
            textShadow: "1px 2px 2px rgba(0,0,0,0.5)",
          }}
        >
          start
        </span>
      </motion.div>

      {/* Buttons */}
      <div className="flex gap-1 ml-2 sm:ml-4">
        {!isMobile && <TaskbarBtn icon={imgMprui1} label="Projects" />}
        <motion.button
          onClick={onPocket}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.97 }}
          className="h-[32px] flex items-center gap-2 rounded text-white"
          style={{
            paddingLeft: isMobile ? 8 : 12,
            paddingRight: isMobile ? 8 : 12,
            background: "linear-gradient(130deg, #164dbc 47%, #1e53bb 85%)",
            boxShadow: "inset -1px -1px 0 #0e3ca2, inset 1.5px 1.5px 0 #123d94",
            border: "0.5px solid rgba(35,75,157,0.5)",
          }}
        >
          <img src={imgMprui2} className="w-5 h-5 object-contain" alt="" />
          {!isMobile && (
            <span style={{ fontFamily: "'Segoe UI', sans-serif", fontSize: 14 }}>
              Pocket Tanks
            </span>
          )}
        </motion.button>
      </div>

      {/* Right tray */}
      <div
        className="ml-auto h-full flex items-center"
        style={{
          paddingLeft: isMobile ? 8 : 16,
          paddingRight: isMobile ? 8 : 16,
          gap: isMobile ? 8 : 12,
          background: "#0d9bef",
          boxShadow:
            "inset 5px 5px 5px #16acf0, inset -2px -4px 15px rgba(0,0,0,0.25), -2px 0 1px rgba(0,0,0,0.5)",
        }}
      >
        {!isMobile && (
          <span className="text-white" style={{ fontFamily: "'Segoe UI', sans-serif", fontSize: 13 }}>
            EN
          </span>
        )}
        <span className="text-white" style={{ fontFamily: "'Segoe UI', sans-serif", fontSize: isMobile ? 12 : 14 }}>
          11:11 AM
        </span>
      </div>
    </div>
  );
}

function TaskbarBtn({ icon, label }: { icon: string; label: string }) {
  return (
    <motion.button
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      className="h-[32px] px-3 flex items-center gap-2 rounded text-white"
      style={{
        background: "#3980f4",
        boxShadow:
          "inset -2px -2px 2px rgba(0,0,0,0.1), inset 0 4px 8px rgba(255,255,255,0.15), inset 1.5px 1.5px 1px rgba(255,255,255,0.25)",
        border: "0.5px solid rgba(35,75,157,0.5)",
      }}
    >
      <img src={icon} className="w-5 h-5 object-contain" alt="" />
      <span style={{ fontFamily: "'Segoe UI', sans-serif", fontSize: 14 }}>{label}</span>
    </motion.button>
  );
}
