"use client";

interface SHProps {
  label?: string;
  title: string;
  subtitle?: string;
  light?: boolean;
  center?: boolean;
}

export function SH({ label, title, subtitle, light, center = true }: SHProps) {
  return (
    <div style={{
      textAlign: center ? "center" : "left",
      maxWidth: center ? 700 : "none",
      margin: center ? "0 auto" : 0,
      marginBottom: 48,
    }}>
      {label && <div className="slbl" style={light ? { color: "rgba(255,255,255,.35)" } : undefined}>{label}</div>}
      <h2 style={{
        fontFamily: "var(--fd)", fontWeight: 700,
        fontSize: "clamp(26px, 4vw, 38px)",
        letterSpacing: "-.02em", lineHeight: 1.15,
        marginBottom: subtitle ? 16 : 0,
        color: light ? "#fff" : undefined,
      }}>
        {title}
      </h2>
      {subtitle && (
        <p style={{
          fontSize: 16,
          color: light ? "rgba(255,255,255,.45)" : "var(--tm)",
          lineHeight: 1.7,
        }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
