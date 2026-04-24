import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { RetroWindow, RetroButton } from "./RetroWindow";

const MY_EMAIL = "khushisaluj.work@gmail.com";

const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY ?? "";

type Status = "idle" | "sending" | "success" | "error";

export function ContactDialog({ onClose }: { onClose: () => void }) {
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [copied, setCopied] = useState(false);

  function copyEmail() {
    navigator.clipboard.writeText(MY_EMAIL).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  const input = "w-full px-2 py-1 bg-white text-black border-0 outline-none";
  const inputStyle = {
    fontFamily: "'MS Sans Serif', Tahoma, sans-serif",
    boxShadow:
      "inset 2px 2px 0 0 #808080, inset -1px -1px 0 0 #fff, inset 3px 3px 0 0 #000",
  } as const;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          name: form.name,
          email: form.email,
          message: form.message,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <RetroWindow title="Contact" onClose={onClose} width={520}>
        <div className="flex flex-col items-center gap-4 py-4">
          <p style={{ fontSize: 20 }}>Message sent! ✦</p>
          <RetroButton onClick={onClose}>OK</RetroButton>
        </div>
      </RetroWindow>
    );
  }

  return (
    <RetroWindow title="Contact" onClose={onClose} width={520}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <label className="flex flex-col gap-1">
          <span>Name:</span>
          <input
            required
            placeholder="Your Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className={input}
            style={inputStyle}
          />
        </label>
        <label className="flex flex-col gap-1">
          <span>Email:</span>
          <input
            required
            type="email"
            placeholder="Drop your email (so I can reply back)"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className={input}
            style={inputStyle}
          />
        </label>
        <label className="flex flex-col gap-1">
          <span>Message:</span>
          <textarea
            required
            rows={5}
            placeholder="Say anything — ideas, feedback, or just hi :)"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className={input + " resize-none"}
            style={inputStyle}
          />
        </label>

        {status === "error" && (
          <p className="text-red-700 text-sm">
            Something went wrong. Please try again.
          </p>
        )}

        <div className="flex justify-between items-center pt-2">
          <RetroButton onClick={copyEmail}>
            <span className="flex items-center gap-1.5">
              {copied ? <Check size={13} /> : <Copy size={13} />}
              {copied ? "Copied!" : "Copy email instead"}
            </span>
          </RetroButton>
          <RetroButton type="submit">
            {status === "sending" ? "Sending…" : "Send"}
          </RetroButton>
        </div>
      </form>
    </RetroWindow>
  );
}
