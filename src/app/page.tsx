"use client";
import { navigateTo } from "@/lib/navigation";

import { useState } from "react";
import { FileText, Brain, Wallet, Clock, ShieldOff, BarChart3, ChevronLeft, ChevronRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SH } from "@/components/ui/SectionHeader";
import { Stat } from "@/components/ui/Stat";
import { LI } from "@/components/ui/LucideIcon";
import HeroVisual from "@/components/home/HeroCanvas";
import { usePress } from "@/hooks/usePress";
import { useAwards } from "@/hooks/useAwards";


// === HOME PAGE ===
function Home({ setPage }: { setPage: (id: string) => void }) {
  // ✅ 모든 Hook을 컴포넌트 최상단에서 호출
  const { awards } = useAwards();
  const { press } = usePress();
  const [pressIdx, setPressIdx] = useState(0);
  const pressMaxIdx = Math.max(0, press.length - 1);

  return <>
    <section className="hero-bg hero-section" style={{ display: "flex", flexDirection: "column", justifyContent: "center", position: "relative", overflow: "hidden" }}>
      <HeroVisual/>
      <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%", position: "relative", zIndex: 2 }}>
        <div style={{ display: "flex", gap: 12, marginBottom: 32, flexWrap: "wrap", animation: "fadeUp .8s ease" }}>
          {["과기부 장관상 2024","중기부 장관상 2년 연속"].map(b=><span key={b} style={{ background:"rgba(255,255,255,.06)",border:"1px solid rgba(255,255,255,.1)",borderRadius:999,padding:"6px 16px",fontSize:17,color:"rgba(255,255,255,.7)",fontWeight:500,backdropFilter:"blur(8px)" }}>{b}</span>)}
        </div>
        <h1 style={{ fontFamily:"var(--fd)",fontSize:"clamp(36px,5vw,60px)",fontWeight:800,color:"#fff",lineHeight:1.25,letterSpacing:"-.03em",maxWidth:560,marginBottom:24,animation:"fadeUp .8s ease .1s both" }}>
          중소기업의<br/>자금 흐름을<br/><span style={{ background:"linear-gradient(135deg,var(--bw),var(--bl))",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent" }}>더 빠르고 유연하게</span>
        </h1>
        <p style={{ fontSize:"clamp(19px,1.6vw,22px)",color:"rgba(255,255,255,.55)",maxWidth:480,lineHeight:1.7,marginBottom:40,animation:"fadeUp .8s ease .2s both" }}>
          거래 데이터를 신용으로, 신용을 자금으로<br/>공급망 전 단계에서 중소기업의 성장을 지원해요
        </p>
        <div style={{ display:"flex",gap:16,flexWrap:"wrap",animation:"fadeUp .8s ease .3s both" }}>
          <button className="bp" onClick={()=>setPage("flowpay")} style={{padding:"14px 32px",fontSize:20}}>서비스 알아보기 →</button>
          <button className="bs" onClick={()=>setPage("contact")} style={{padding:"14px 32px",fontSize:20}}>문의하기</button>
        </div>
      </div>
      <div style={{ position:"absolute",bottom:0,left:0,right:0,height:1,background:"rgba(255,255,255,0.08)" }}/>
    </section>

    {/* Problem */}
    <section style={{ padding: "160px 24px", background: "#fff" }}><div style={{ maxWidth: 1200, margin: "0 auto" }}>
      <Reveal><SH title="자금 때문에 성장이 멈추는 순간들" subtitle={"연간 5,000조원 규모의 매출채권 시장, 그 99%가 여전히 금융 사각지대예요."}/></Reveal>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24, marginTop: 72 }}>
        {[{Ic:Clock,t:"30~120일 정산 시차",d:"납품은 했는데 돈은 한참 뒤에.\n그 사이 원자재 매입은 현금으로 해야 돼요."},{Ic:ShieldOff,t:"담보 중심 평가 한계",d:"성장하고 있어도 담보 없으면 대출 불가.\n기존 금융의 구조적 한계예요."},{Ic:BarChart3,t:"공급망 데이터 불투명",d:"은행은 기업 밖에서만 바라봐요.\n실물 거래 흐름을 볼 수 없어요."}].map((it,i)=>
          <Reveal key={i} delay={i*.1}><div style={{background:"#f8fafc",borderRadius:12,padding:32,height:"100%"}}>
            <div style={{marginBottom:16}}><LI icon={it.Ic} color="var(--nl)" size={32}/></div>
            <h3 style={{fontFamily:"var(--fd)",fontWeight:600,fontSize:24,marginBottom:12,color:"var(--td)"}}>{it.t}</h3>
            <p style={{fontSize:19,color:"#333",lineHeight:1.7,whiteSpace:"pre-line"}}>{it.d}</p>
          </div></Reveal>)}
      </div>
    </div></section>

    {/* FLOW Ecosystem */}
    <section style={{ padding: "160px 24px", background: "#0f1929" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <Reveal><SH title="자금 흐름의 모든 단계를 커버" subtitle={<span style={{color:"rgba(255,255,255,.65)"}}>{"276홀딩스는 데이터 축적부터 신용평가, 자금 집행까지\n하나의 흐름으로 연결되는 금융 솔루션이예요"}</span>} light/></Reveal>
        {(() => {
          const items = [{id:"flowpoint",s:"01",Ic:FileText,nm:"FLOW POINT",ds:"흩어진 종이 계약서가 하나의 디지털 거래 이력으로, 공급망 전체가 한눈에 보여요"},{id:"flowscore",s:"02",Ic:Brain,nm:"FLOW SCORE",ds:"실시간으로 491개 변수를 분석해요.\n이 거래가 얼마나 안전한지 즉시 알 수 있어요"},{id:"flowpay",s:"03",Ic:Wallet,nm:"FLOW PAY",ds:"원자재는 지금 받고 대금은 60일 뒤에,\n운전자금 걱정 없이 매출을 확대해요"}];
          const elements: React.ReactNode[] = [];
          items.forEach((it, i) => {
            if (i > 0) {
              elements.push(
                <div key={`arr-${i}`} className="flow-arr-r" style={{ color:"rgba(255,255,255,.35)", fontSize:28, flexShrink:0, padding:"0 8px" }}>→</div>
              );
            }
            elements.push(
              <div key={it.id} style={{ flex:"1 1 0", minWidth:0 }}>
              <Reveal delay={i*.15}>
                <div style={{ background:"rgba(253,248,240,.15)", borderRadius:12, padding:36, cursor:"pointer", height:"100%", display:"flex", flexDirection:"column", transition:"box-shadow .3s" }}
                  onClick={()=>setPage(it.id)}
                  onMouseEnter={e=>(e.currentTarget.style.boxShadow="0 8px 32px rgba(0,0,0,.25)")}
                  onMouseLeave={e=>(e.currentTarget.style.boxShadow="none")}>
                  <div style={{ marginBottom:20 }}><LI icon={it.Ic} color="#fff" size={32}/></div>
                  <h3 style={{ fontFamily:"var(--fd)", fontWeight:800, fontSize:27, marginBottom:12, color:"var(--bw)" }}>{it.nm}</h3>
                  <p style={{ fontSize:19, color:"rgba(255,255,255,.85)", lineHeight:1.7, whiteSpace:"pre-line", flex:1, fontWeight:500 }}>{it.ds}</p>
                  <div style={{ marginTop:24, paddingTop:20, borderTop:"1px solid rgba(255,255,255,.2)" }}>
                    <span style={{ fontSize:15, fontWeight:600, color:"rgba(255,255,255,.55)" }}>자세히 보기 →</span>
                  </div>
                </div>
              </Reveal>
              </div>
            );
          });
          return <div style={{ display:"flex", alignItems:"stretch", marginTop:72, gap:0 }}>{elements}</div>;
        })()}
      </div>
    </section>

    {/* Stats */}
    <section style={{ padding: "160px 24px", background: "var(--alt)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <Reveal><SH title="숫자로 증명하는 성과" subtitle="가설이 아닌, 시장에서 증명된 결과예요"/></Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 24 }}>
          <Reveal><Stat value={6890} suffix="억+" label="누적 매출채권 중개액"/></Reveal>
          <Reveal delay={.1}><Stat value={1100} suffix="+" label="누적 회원사"/></Reveal>
          <Reveal delay={.2}><Stat value={97} suffix="억" label="연 매출액 (2025)"/></Reveal>
          <Reveal delay={.3}><Stat value={37} suffix="억" label="글로벌 매출 (3개국)"/></Reveal>
        </div>
      </div>
    </section>

    {/* Awards */}
    {awards.length > 0 && (
      <section style={{ padding: "160px 24px", background: "#fff" }}><div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <Reveal><SH title="공신력 있는 기관이 인정한 성과" subtitle="정부 기관과 글로벌 심사위원단이 검증한 기술력과 사업 실적"/></Reveal>
        <div>
          {Object.entries(
            [...awards].sort((a,b)=>b.y.localeCompare(a.y)).reduce((acc, a) => { (acc[a.y] = acc[a.y] || []).push(a); return acc; }, {} as Record<string, typeof awards>)
          ).sort(([a],[b]) => b.localeCompare(a)).map(([year, items], gi) => (
            <Reveal key={year} delay={gi*.08}>
              <div style={{ display:"grid", gridTemplateColumns:"200px 1fr", gap:32, padding:"28px 0", borderBottom:"1px solid var(--bd)" }}>
                <div style={{ fontFamily:"var(--fd)", fontWeight:700, fontSize:18, color:"var(--td)", paddingTop:2 }}>{year}</div>
                <div style={{ display:"flex", flexDirection:"column", gap:24 }}>
                  {items.map(a => (
                    <div key={a.id}>
                      <div style={{ fontFamily:"var(--fd)", fontWeight:600, fontSize:18, color:"var(--td)", lineHeight:1.5 }}>{a.t}</div>
                      {a.o && <div style={{ fontSize:16, color:"var(--tm)", marginTop:4 }}>{a.o}</div>}
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div></section>
    )}

    {/* PRESS COVERAGE */}
    {press.length > 0 && (() => {
      const sorted = [...press].sort((a,b)=>b.date.localeCompare(a.date));
      const cur = sorted[pressIdx];
      return (
        <section style={{ padding: "160px 24px", background: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <Reveal><SH title="언론이 주목하는 276홀딩스"/></Reveal>
            <a href={cur.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration:"none", color:"inherit", display:"block" }}>
              <div style={{ background:"#eef0f3", borderRadius:20, padding:"64px 80px", textAlign:"center", position:"relative", minHeight:280 }}>
                {/* 우측 화살표 */}
                {pressIdx < pressMaxIdx && (
                  <button onClick={e => { e.preventDefault(); setPressIdx(pressIdx + 1); }}
                    style={{ position:"absolute", right:24, top:"50%", transform:"translateY(-50%)", width:40, height:40, borderRadius:"50%", border:"1px solid var(--bd)", background:"#fff", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 2px 8px rgba(0,0,0,.08)" }}>
                    <ChevronRight size={18} color="var(--td)"/>
                  </button>
                )}
                {pressIdx > 0 && (
                  <button onClick={e => { e.preventDefault(); setPressIdx(pressIdx - 1); }}
                    style={{ position:"absolute", left:24, top:"50%", transform:"translateY(-50%)", width:40, height:40, borderRadius:"50%", border:"1px solid var(--bd)", background:"#fff", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 2px 8px rgba(0,0,0,.08)" }}>
                  <ChevronLeft size={18} color="var(--td)"/>
                  </button>
                )}
                {/* 매체명 뱃지 */}
                <div style={{ display:"inline-block", border:"1px solid #ccc", borderRadius:999, padding:"4px 14px", fontSize:13, color:"var(--tm)", marginBottom:12 }}>{cur.media}</div>
                <div style={{ fontSize:14, color:"var(--tm)", marginBottom:24, fontFamily:"var(--fd)" }}>{cur.date}</div>
                <h3 style={{ fontFamily:"var(--fd)", fontWeight:700, fontSize:"clamp(20px,2.5vw,28px)", color:"var(--td)", lineHeight:1.4, marginBottom:20, maxWidth:640, margin:"0 auto 20px" }}>{cur.title}</h3>
                <p style={{ fontSize:16, color:"var(--tm)", lineHeight:1.7, maxWidth:560, margin:"0 auto 32px" }}>{cur.excerpt}</p>
                {/* 도트 */}
                <div style={{ display:"flex", gap:8, justifyContent:"center" }}>
                  {sorted.map((_,i) => (
                    <button key={i} onClick={e => { e.preventDefault(); setPressIdx(i); }}
                      style={{ width: i===pressIdx ? 20 : 8, height:8, borderRadius:999, background: i===pressIdx ? "var(--td)" : "#ccc", border:"none", cursor:"pointer", padding:0, transition:"all .3s" }}/>
                  ))}
                </div>
              </div>
            </a>
          </div>
        </section>
      );
    })()}

    {/* CTA */}
    <section style={{ padding: "120px 24px", background: "linear-gradient(135deg,var(--ny),#132240)", textAlign: "center", color: "#fff" }}>
      <Reveal><div style={{ maxWidth: 800, margin: "0 auto" }}>
        <h2 style={{ fontFamily:"var(--fd)",fontWeight:700,fontSize:"clamp(32px,4vw,44px)",marginBottom:16,letterSpacing:"-.02em" }}>중소기업 자금 흐름의 새로운 기준</h2>
        <p style={{ fontSize:21,color:"rgba(255,255,255,.55)",marginBottom:40,lineHeight:1.7,whiteSpace:"nowrap" }}>276홀딩스의 솔루션이 자금 흐름을 어떻게 바꿀 수 있는지 직접 확인해보세요</p>
        <div style={{ display:"flex",gap:16,justifyContent:"center",flexWrap:"wrap" }}>
          <button className="bp" onClick={()=>setPage("contact")} style={{padding:"16px 36px",fontSize:20}}>상담 문의하기</button>
          <button className="bs" onClick={()=>setPage("about")} style={{padding:"16px 36px",fontSize:20}}>회사 소개 보기</button>
        </div>
      </div></Reveal>
    </section>
  </>;
}

export default function HomePage() {
  return <Home setPage={navigateTo} />;
}
