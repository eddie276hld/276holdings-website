"use client";

import { useState, useEffect, useRef } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { useNotices } from "@/hooks/useNotices";

// === NOTICES PAGE ===
function Notices({ setPage }: { setPage: (id: string) => void }) {
  const [selected, setSelected] = useState<any>(null);
  const { notices, loaded } = useNotices();

  const detail = notices.find(n => n.id === selected);

  return <section style={{ padding: "140px 24px 96px", background: "var(--alt)", minHeight: "80vh" }}>
    <div style={{ maxWidth: 800, margin: "0 auto" }}>
      <Reveal>
        <div className="slbl">NOTICES</div>
        <h1 style={{ fontFamily: "var(--fd)", fontSize: "clamp(32px,5vw,48px)", fontWeight: 800, letterSpacing: "-.03em", marginBottom: 12 }}>공지사항</h1>
        <p style={{ fontSize: 15, color: "var(--tm)", marginBottom: 48 }}>주주총회, 정관 변경, 주요 경영 현안 등 276홀딩스의 공식 공지를 확인하세요.</p>
      </Reveal>

      {detail ? (
        <Reveal>
          <button onClick={() => setSelected(null)} style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "none", border: "none", color: "var(--br)", fontWeight: 600, fontSize: 14, cursor: "pointer", marginBottom: 24, padding: 0 }}>← 목록으로</button>
          <div style={{ background: "#fff", border: "1px solid var(--bd)", borderRadius: 12, padding: "36px 32px" }}>
            <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 16 }}>
              <span style={{ background: "rgba(168,149,134,.1)", color: "var(--br)", fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 6 }}>{detail.category}</span>
              <span style={{ fontSize: 13, color: "var(--tm)" }}>{detail.date}</span>
            </div>
            <h2 style={{ fontFamily: "var(--fd)", fontWeight: 700, fontSize: 22, color: "var(--td)", marginBottom: 24, lineHeight: 1.3 }}>{detail.title}</h2>
            <div style={{ fontSize: 14, color: "var(--tm)", lineHeight: 1.9, whiteSpace: "pre-line", borderTop: "1px solid var(--bd)", paddingTop: 24 }}>{detail.content}</div>
          </div>
        </Reveal>
      ) : (
        <Reveal delay={0.1}>
          <div style={{ background: "#fff", border: "1px solid var(--bd)", borderRadius: 12, overflow: "hidden" }}>
            <div style={{ display: "grid", gridTemplateColumns: "80px 1fr 100px", padding: "14px 24px", borderBottom: "1px solid var(--bd)", background: "var(--alt)" }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: "var(--tm)" }}>분류</span>
              <span style={{ fontSize: 12, fontWeight: 700, color: "var(--tm)" }}>제목</span>
              <span style={{ fontSize: 12, fontWeight: 700, color: "var(--tm)", textAlign: "right" }}>날짜</span>
            </div>
            {notices.map(n => (
              <div key={n.id} onClick={() => setSelected(n.id)} style={{ display: "grid", gridTemplateColumns: "80px 1fr 100px", padding: "16px 24px", borderBottom: "1px solid var(--blt)", cursor: "pointer", transition: "background .2s" }}
                onMouseEnter={e => e.currentTarget.style.background = "var(--alt)"}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                <span style={{ fontSize: 12, color: "var(--br)", fontWeight: 600 }}>{n.category}</span>
                <span style={{ fontSize: 14, color: "var(--td)", fontWeight: 500 }}>{n.title}</span>
                <span style={{ fontSize: 13, color: "var(--tm)", textAlign: "right" }}>{n.date}</span>
              </div>
            ))}
          </div>
          {notices.length === 0 && <p style={{ textAlign: "center", padding: 48, color: "var(--tm)", fontSize: 14 }}>등록된 공지사항이 없습니다.</p>}
        </Reveal>
      )}
    </div>
  </section>;
}

export default function NoticesPage() {
  return <Notices setPage={(p: string) => window.location.href = "/" + (p === "home" ? "" : p)} />;
}
