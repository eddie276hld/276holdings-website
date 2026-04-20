"use client";
import { useEffect, useRef, useState } from "react";

interface StatProps {
  value: number;
  suffix?: string;
  label: string;
  decimals?: number;
}

export function Stat({ value, suffix = "", label, decimals = 0 }: StatProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          const dur = 1800;
          const t0 = performance.now();
          const step = (now: number) => {
            const p = Math.min((now - t0) / dur, 1);
            const eased = 1 - Math.pow(1 - p, 4); // ease-out quart
            setCount(parseFloat((value * eased).toFixed(decimals)));
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
        {decimals > 0 ? count.toFixed(decimals) : count.toLocaleString()}{suffix}
      </div>
      <div style={{ fontSize: 18, color: "#64748b", marginTop: 8, fontWeight: 500 }}>
        {label}
      </div>
    </div>
  );
}
