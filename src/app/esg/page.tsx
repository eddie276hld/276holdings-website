"use client";

import { useState, useEffect, useRef } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { SH } from "@/components/ui/SectionHeader";

// === ESG PAGE ===
function Esg() {
  const pillars = [
    { label: "Environment", title: "환경 경영", color: "#10b981", items: [
      "최고경영진은 환경 경영에 대한 책임과 권한을 가지며, 모든 임직원이 환경 경영을 적극 실천합니다.",
      "환경 관련 법규를 준수하고, 발견된 문제에 대해 즉시 개선하여 리스크를 최소화합니다.",
      "자원 절약·재활용, 에너지 효율화를 촉진하고 폐기물·오염물질 발생을 최소화합니다.",
      "기후 변화 위기에 선제 대응하는 전략을 수립하고 친환경 사업을 적극 이행합니다.",
      "신재생에너지 협업을 검토하고, 중소기업의 저탄소 경제 전환을 지원합니다."
    ]},
    { label: "Social", title: "인권 경영", color: "#6366f1", items: [
      "인간의 존엄과 가치를 존중하고 인권보호 및 향상을 위해 노력합니다.",
      "성별, 연령, 인종, 장애, 종교를 이유로 일체의 차별을 금지하며 다양성을 존중합니다.",
      "모든 형태의 강제노동, 폭행, 갑질, 차별, 성희롱·성폭력을 금지합니다.",
      "노동원칙을 준수하며 안전하고 건강한 근무환경을 제공합니다.",
      "인권침해에 대해 신속하고 적절한 구제조치를 제공합니다."
    ]},
    { label: "Governance", title: "윤리 경영", color: "#c8a882", items: [
      "관련법규를 준수하고, 투명하고 공정한 거래를 통해 경쟁 우위를 확보합니다.",
      "고객의 가치 증대와 만족 향상을 위해 최선의 노력을 다합니다.",
      "수집한 고객 및 회사의 자산과 정보를 보호합니다.",
      "구성원 간 상호 존중과 신뢰를 바탕으로 건전한 기업문화를 만들어 갑니다.",
      "안전한 근무환경 유지를 위해 교육과 개선 활동에 적극 참여합니다."
    ]},
  ];

  const highlights = [
    { icon: "💰", title: "중소기업 자금난 해소", desc: "FLOW POINT 매출채권 유동화로 자금조달 시간 단축" },
    { icon: "🏪", title: "소상공인 경쟁력 강화", desc: "FLOW PAY '나중결제' 옵션으로 선자금 부담 해소" },
    { icon: "🌍", title: "지역 경제 활성화", desc: "비수도권 지원 비율 40.9%, 지역 중소기업 자금 지원" },
    { icon: "🤝", title: "포용적 금융 제공", desc: "매출채권 기반 대체 데이터 평가로 금융 접근성 확대" },
    { icon: "🌱", title: "ESG 금융 실현", desc: "ESG 기준 반영 지속가능한 경제 생태계 조성" },
  ];

  const envGoals = [
    { target: "10%", label: "전력 절감", desc: "사무실 전력 사용량 절감 목표" },
    { target: "95%", label: "전자문서", desc: "페이퍼리스 전환 비율 유지" },
    { target: "30%", label: "클라우드", desc: "서버 Idle 리소스 감소 목표" },
    { target: "100%", label: "ESG 교육", desc: "임직원 환경교육 이수율" },
  ];

  const socialKpis = [
    { n: "0건", l: "데이터 침해", sub: "3년 연속 무사고" },
    { n: "100%", l: "윤리교육 이수", sub: "전 임직원 참여" },
    { n: "100%", l: "VOC 처리율", sub: "고객 문의 전건 처리" },
    { n: "0건", l: "부패·법규 위반", sub: "3년 연속 무위반" },
  ];

  const cs = { background: "#fff", border: "1px solid var(--bd)", borderRadius: 12, overflow: "hidden" };

  return <>
    {/* Hero */}
    <section style={{ padding: "140px 24px 80px", background: "var(--alt)" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <Reveal>
          <div className="slbl">ESG REPORT 2025</div>
          <h1 style={{ fontFamily: "var(--fd)", fontSize: "clamp(32px,5vw,48px)", fontWeight: 800, letterSpacing: "-.03em", marginBottom: 12 }}>지속가능한 미래를 위한 약속</h1>
          <p style={{ fontSize: 17, color: "var(--tm)", lineHeight: 1.7, maxWidth: 640, marginBottom: 40 }}>276홀딩스는 '책임 있는 혁신'을 핵심 철학으로, 기술로 금융을 새롭게, 금융으로 사회를 지속가능하게 만들어 갑니다.</p>
        </Reveal>
        <Reveal delay={.15}>
          <div style={{ background: "linear-gradient(135deg, var(--ny), #132240)", borderRadius: 12, padding: "28px 32px", color: "#fff" }}>
            <p style={{ fontSize: 14, lineHeight: 1.8, color: "rgba(255,255,255,.65)", fontStyle: "italic" }}>"환경(E) 측면에서는 디지털 시스템으로 자원 사용을 줄이고, 사회(S) 측면에서는 금융 소외 중소기업에 포용적 금융을 펼치며, 지배구조(G) 측면에서는 투명하고 윤리적인 의사결정 구조를 만들어 가겠습니다."</p>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,.4)", marginTop: 12 }}>— 276홀딩스 대표 신인근, ESG Report 2025</p>
          </div>
        </Reveal>
      </div>
    </section>

    {/* ESG Highlights — 5대 임팩트 */}
    <section style={{ padding: "72px 24px", background: "#fff" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <Reveal><SH label="ESG HIGHLIGHTS" title="금융을 매개로 한 사회적 가치 창출" subtitle="자금 흐름의 효율성을 높이고, 거래의 투명성과 안정성을 강화하여 지속가능한 비즈니스 환경을 조성합니다."/></Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 12 }}>
          {highlights.map((h, i) => (
            <Reveal key={i} delay={i * .08}>
              <div style={{ ...cs, padding: "20px 16px", textAlign: "center", height: "100%" }}>
                <div style={{ fontSize: 24, marginBottom: 10 }}>{h.icon}</div>
                <div style={{ fontFamily: "var(--fd)", fontWeight: 700, fontSize: 14, color: "var(--td)", marginBottom: 6 }}>{h.title}</div>
                <p style={{ fontSize: 12, color: "var(--tm)", lineHeight: 1.6 }}>{h.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>

    {/* 3 Pillar Cards */}
    <section style={{ padding: "72px 24px", background: "var(--alt)" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <Reveal><SH label="ESG PRINCIPLES" title="세 가지 축으로 실천합니다."/></Reveal>
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          {pillars.map((pillar, pi) => (
            <Reveal key={pi} delay={pi * 0.12}>
              <div style={cs}>
                <div style={{ padding: "24px 28px 18px", borderBottom: "1px solid var(--blt)" }}>
                  <div style={{ fontSize: 11, fontWeight: 300, letterSpacing: ".14em", textTransform: "uppercase", color: pillar.color, marginBottom: 6 }}>{pillar.label}</div>
                  <h2 style={{ fontFamily: "var(--fd)", fontWeight: 700, fontSize: 22, color: "var(--td)" }}>{pillar.title}</h2>
                </div>
                <div style={{ padding: "16px 28px 24px" }}>
                  {pillar.items.map((item, ii) => (
                    <div key={ii} style={{ display: "flex", gap: 10, alignItems: "flex-start", padding: "9px 0", borderBottom: ii < pillar.items.length - 1 ? "1px solid var(--blt)" : "none" }}>
                      <span style={{ fontFamily: "var(--fm)", fontSize: 11, color: pillar.color, fontWeight: 500, minWidth: 22, paddingTop: 2 }}>0{ii + 1}</span>
                      <p style={{ fontSize: 13, color: "var(--tm)", lineHeight: 1.7 }}>{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>

    {/* Environmental Goals */}
    <section style={{ padding: "72px 24px", background: "#fff" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <Reveal><SH label="GREEN IMPACT" title="환경경영 목표" subtitle="디지털 전환을 통한 자원 절감과 탄소 저감을 추진합니다."/></Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16 }}>
          {envGoals.map((g, i) => (
            <Reveal key={i} delay={i * .1}>
              <div style={{ ...cs, padding: "24px 20px", textAlign: "center" }}>
                <div style={{ fontFamily: "var(--fd)", fontWeight: 800, fontSize: 28, color: "#10b981", marginBottom: 4 }}>{g.target}</div>
                <div style={{ fontFamily: "var(--fd)", fontWeight: 700, fontSize: 14, color: "var(--td)", marginBottom: 6 }}>{g.label}</div>
                <p style={{ fontSize: 12, color: "var(--tm)" }}>{g.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={.3}>
          <div style={{ marginTop: 24, ...cs, padding: "20px 24px" }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "var(--td)", marginBottom: 10 }}>친환경 캠페인 — "Green Together, Flow Better!"</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {["에코 출근 챌린지","종이 Zero Week","에너지 절약 미션","리유즈 데이","그린 아이디어 공모전"].map(c => (
                <span key={c} style={{ fontSize: 12, padding: "5px 12px", background: "rgba(16,185,129,.06)", color: "#10b981", borderRadius: 6, border: "1px solid rgba(16,185,129,.15)", fontWeight: 500 }}>{c}</span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>

    {/* Social & Governance KPIs */}
    <section style={{ padding: "72px 24px 96px", background: "var(--alt)" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <Reveal><SH label="RESPONSIBLE MANAGEMENT" title="숫자로 증명하는 책임 경영" subtitle="투명한 경영과 정보보호, 윤리 실천의 성과입니다."/></Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16 }}>
          {socialKpis.map((k, i) => (
            <Reveal key={i} delay={i * .1}>
              <div style={{ ...cs, padding: "24px 20px", textAlign: "center" }}>
                <div style={{ fontFamily: "var(--fd)", fontWeight: 800, fontSize: 28, color: "var(--br)", marginBottom: 4 }}>{k.n}</div>
                <div style={{ fontFamily: "var(--fd)", fontWeight: 700, fontSize: 14, color: "var(--td)", marginBottom: 6 }}>{k.l}</div>
                <p style={{ fontSize: 12, color: "var(--tm)" }}>{k.sub}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={.3}>
          <div style={{ marginTop: 24, ...cs, padding: "20px 24px" }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "var(--td)", marginBottom: 10 }}>UN SDGs 정책 체계</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {["환경경영선언","환경경영규정","인권경영헌장","인권경영규정","안전보건실천선언","윤리경영헌장","윤리경영실천서약서","취업규칙"].map(d => (
                <span key={d} style={{ fontSize: 11, padding: "4px 10px", background: "rgba(168,149,134,.06)", color: "var(--br)", borderRadius: 6, border: "1px solid rgba(168,149,134,.15)", fontWeight: 500 }}>{d}</span>
              ))}
            </div>
            <p style={{ fontSize: 11, color: "var(--tm)", marginTop: 10 }}>GRI Standards · SASB · UN SDGs 기준에 따라 보고하고 있습니다.</p>
          </div>
        </Reveal>
      </div>
    </section>
  </>;
}

export default function EsgPage() {
  return <Esg />;
}
