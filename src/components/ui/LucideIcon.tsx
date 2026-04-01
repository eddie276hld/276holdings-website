"use client";
import { LucideIcon as LucideIconType } from "lucide-react";

interface LIProps {
  icon: LucideIconType;
  size?: number;
  color?: string;
}

export function LI({ icon: Icon, size = 22, color = "var(--br)" }: LIProps) {
  return (
    <div style={{
      width: size + 16, height: size + 16,
      display: "flex", alignItems: "center", justifyContent: "center",
      borderRadius: 10,
      background: color === "var(--br)" ? "rgba(168,149,134,0.08)"
        : color === "var(--bw)" ? "rgba(200,168,130,0.08)"
        : color === "var(--ny)" ? "rgba(15,25,41,0.06)"
        : color === "#fff" ? "rgba(255,255,255,0.08)"
        : "rgba(168,149,134,0.08)"
    }}>
      <Icon size={size} strokeWidth={1.5} color={color} />
    </div>
  );
}
