"use client";

import { useState } from "react";
import { triggerTypeError, triggerReferenceError, triggerRangeError, triggerPromiseRejection } from "@/lib/buggy";

const btn = (text: string, onClick: () => void) => (
  <button
    onClick={onClick}
    style={{
      display: "block",
      marginBottom: 12,
      padding: "12px 24px",
      fontSize: 16,
      cursor: "pointer",
      background: "#dc2626",
      color: "white",
      border: "none",
      borderRadius: 6,
    }}
  >
    {text}
  </button>
);

export default function Page() {
  const [triggered, setTriggered] = useState<string | null>(null);

  const wrap = (label: string, fn: () => void) => () => {
    setTriggered(label);
    fn();
  };

  return (
    <main>
      <h1>🐛 Demo Buggy App</h1>
      <p style={{ color: "#888", marginBottom: 32 }}>
        Each button triggers a real error captured by Sentry and forwarded to VoiceSRE.
      </p>
      <div style={{ marginBottom: 32 }}>
        {btn("💥 Throw TypeError", wrap("TypeError", triggerTypeError))}
        {btn("💥 Throw ReferenceError", wrap("ReferenceError", triggerReferenceError))}
        {btn("💥 Throw RangeError", wrap("RangeError", triggerRangeError))}
        {btn("💥 Unhandled Promise Rejection", wrap("PromiseRejection", triggerPromiseRejection))}
      </div>
      {triggered && (
        <p style={{ color: "#4ade80" }}>
          ✅ {triggered} triggered — check Sentry and VoiceSRE dashboard.
        </p>
      )}
    </main>
  );
}
