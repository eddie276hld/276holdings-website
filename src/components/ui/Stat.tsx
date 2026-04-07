"use client";
import { useEffect, useRef, useState } from "react";

interface StatProps {
  value: number;
  suffix?: string;
  label: string;
}

export function Stat({ value, suffix = "", label }: StatProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          let start = 0;
          const dur = 1500;
          const t0 = performance.now();
          const step = (now: number) => {
            const p = Math.min((now - t0) / dur, 1);
            setCount(Math.round(value * p));
            if (p < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [value]);

  return (
    <div ref={ref} style={{ textAlign: "center", padding: "32px 20px" }}>
      <div className="stat-num" style={{whiteSpace:"nowrap"}}>
        {count.toLocaleString()}{suffix}
      </div>
      <div style={{ fontSize: 14, color: "#64748b", marginTop: 8, fontWeight: 500 }}>
        {label}
      </div>
    </div>
  );
}
