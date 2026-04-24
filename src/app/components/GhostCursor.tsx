import { useEffect, useRef, useState } from "react";

type Trail = { id: number; x: number; y: number };

export function GhostCursor() {
  const [trails, setTrails] = useState<Trail[]>([]);
  const idRef = useRef(0);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      idRef.current += 1;
      const id = idRef.current;
      setTrails((prev) => {
        const next = [...prev, { id, x: e.clientX, y: e.clientY }];
        return next.slice(-12);
      });
      window.setTimeout(() => {
        setTrails((prev) => prev.filter((t) => t.id !== id));
      }, 600);
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999]">
      {trails.map((t, i) => {
        const age = trails.length - i;
        const opacity = Math.max(0, 0.5 - age * 0.04);
        const scale = 1 - age * 0.05;
        return (
          <svg
            key={t.id}
            width="20"
            height="24"
            viewBox="0 0 20 24"
            style={{
              position: "absolute",
              left: t.x,
              top: t.y,
              opacity,
              transform: `scale(${Math.max(0.4, scale)})`,
              transition: "opacity 0.5s ease-out",
            }}
          >
            <path
              d="M2 2 L2 20 L7 15 L10 22 L13 21 L10 14 L17 14 Z"
              fill="white"
              stroke="black"
              strokeWidth="1.2"
              strokeLinejoin="round"
            />
          </svg>
        );
      })}
    </div>
  );
}
