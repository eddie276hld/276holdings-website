"use client";
import { navigateTo } from "@/lib/navigation";
import { useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { SH } from "@/components/ui/SectionHeader";
import { useFaqs } from "@/hooks/useFaqs";

// === FAQ PAGE (GEO-optimized with question-format H2s) ===
function Faq({ setPage }: { setPage: (id: string) => void }) {
  const [open, setOpen] = useState<any>(null);
  const toggle = (i) => setOpen(open === i ? null : i);
  const { faqs } = useFaqs();
  const cats = [...new Set(faqs.map(f => f.cat))];
  const [filter, setFilter] = useState("전체");
  const filtered = filter === "전체" ? faqs : faqs.filter(f => f.cat === filter);

  return <>
    <section style={{ padding: "140px 24px 96px", background: "var(--alt)" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <Reveal>
          <div className="slbl">FAQ · KNOWLEDGE BASE</div>
          <h1 style={{ fontFamily: "var(--fd)", fontSize: "clamp(32px,5vw,48px)", fontWeight: 800, letterSpacing: "-.03em", marginBottom: 12 }}>자주 묻는 질문.</h1>
          <p style={{ fontSize: 17, color: "var(--tm)", marginBottom: 36 }}>276홀딩스의 서비스, 기술, 사업에 대해 궁금한 점을 확인하세요.</p>
        </Reveal>

        <Reveal delay={0.1}>
          <div style={{ display: "flex", gap: 8, marginBottom: 32, flexWrap: "wrap" }}>
            {["전체", ...cats].map(c => (
              <button key={c} onClick={() => setFilter(c)} style={{
                padding: "8px 16px", borderRadius: 999, border: "1px solid var(--bd)",
                background: filter === c ? "var(--ny)" : "#fff",
                color: filter === c ? "#fff" : "var(--tm)",
                fontFamily: "var(--fb)", fontSize: 13, fontWeight: 500, cursor: "pointer", transition: "all .2s"
              }}>{c}</button>
            ))}
          </div>
        </Reveal>

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {filtered.map((faq, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <div style={{
                background: "#fff", border: "1px solid var(--bd)", borderRadius: 12, overflow: "hidden",
                transition: "border-color .2s",
                borderColor: open === i ? "var(--br)" : "var(--bd)"
              }}>
                <button onClick={() => toggle(i)} style={{
                  width: "100%", textAlign: "left", padding: "20px 24px",
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  fontFamily: "var(--fd)", fontSize: 16, fontWeight: 600, color: "var(--td)",
                  background: "none", border: "none", cursor: "pointer"
                }}>
                  <span>{faq.q}</span>
                  <span style={{ fontSize: 20, color: "var(--tm)", transform: open === i ? "rotate(45deg)" : "rotate(0)", transition: "transform .2s", flexShrink: 0, marginLeft: 16 }}>+</span>
                </button>
                {open === i && (
                  <div style={{ padding: "0 24px 20px", fontSize: 15, color: "var(--tm)", lineHeight: 1.75, animation: "fadeUp .3s ease", whiteSpace: "pre-wrap" }}>
                    {faq.a}
                  </div>
                )}
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div style={{ marginTop: 48, padding: 32, background: "var(--ny)", borderRadius: 12, textAlign: "center", color: "#fff" }}>
            <h3 style={{ fontFamily: "var(--fd)", fontWeight: 700, fontSize: 20, marginBottom: 8 }}>찾는 답변이 없으신가요?</h3>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,.55)", marginBottom: 20 }}>서비스 도입, 기술, 투자 관련 어떤 질문이든 편하게 문의하세요</p>
            <button className="bp" onClick={() => setPage("contact")}>문의하기 →</button>
          </div>
        </Reveal>
      </div>
    </section>
  </>;
}

export default function FaqPage() {
  return <Faq setPage={navigateTo} />;
}
