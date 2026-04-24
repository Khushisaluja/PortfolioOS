import { Apple } from "lucide-react";

const items = ["File", "Edit", "Menu", "Format", "View", "Window", "Help"];

export function MenuBar() {
  return (
    <div
      className="fixed top-0 left-0 right-0 h-[32px] z-[500] flex items-center px-3 gap-2 sm:gap-4"
      style={{
        background: "rgba(0,0,0,0.28)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
      }}
    >
      <Apple size={16} color="white" fill="white" style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.22))", flexShrink: 0 }} />
      <span
        className="text-white"
        style={{
          fontFamily: "'SF Pro Text', -apple-system, sans-serif",
          fontWeight: 800,
          fontSize: 13.5,
          letterSpacing: "-0.3px",
          textShadow: "0 2px 4px rgba(0,0,0,0.22)",
          whiteSpace: "nowrap",
        }}
      >
        a glitch in the matrix
      </span>
      {items.map((it) => (
        <button
          key={it}
          className="hidden sm:block text-white/90 hover:bg-white/20 px-2 py-0.5 rounded transition-colors"
          style={{
            fontFamily: "'SF Pro Text', -apple-system, sans-serif",
            fontSize: 13.5,
            letterSpacing: "-0.3px",
            textShadow: "0 2px 4px rgba(0,0,0,0.22)",
          }}
        >
          {it}
        </button>
      ))}
      <div className="ml-auto flex items-center gap-2 sm:gap-3 text-white/90" style={{ fontFamily: "'SF Pro Text', sans-serif", fontSize: 13 }}>
        <span className="hidden sm:inline">Fri 02 July</span>
        <span>11:11 AM</span>
      </div>
    </div>
  );
}
