"use client";

import { useState, useEffect, useRef } from "react";
import { BarChart3, Search, Building2, Activity, MessageCircle, X } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SH } from "@/components/ui/SectionHeader";
import { LI } from "@/components/ui/LucideIcon";
import FlowScoreVisual from "@/components/service/FlowScoreVisual";

// === FLOWSCORE PAGE ===
function FS({ setPage }: { setPage: (id: string) => void }) {
  return <>
    <section className="hero-bg" style={{ padding:"140px 24px 100px",position:"relative",overflow:"hidden" }}>
      <div style={{ position:"absolute", inset:0, display:"flex", justifyContent:"flex-end" }}>
        <div style={{ width:"75%", height:"100%", position:"relative", right:"-5%" }}>
          <FlowScoreVisual/>
        </div>
      </div>
      <div style={{ position:"absolute", inset:0, background:"linear-gradient(90deg, rgba(15,25,41,.95) 0%, rgba(15,25,41,.7) 40%, rgba(15,25,41,.15) 75%, transparent 100%)", zIndex:1 }}/>
      <div style={{maxWidth:1200,margin:"0 auto",position:"relative",zIndex:2}}>
        <div style={{ maxWidth: 600 }}>
          <div className="slbl" style={{color:"var(--bw)"}}>FLOWSCORE — AI CREDIT INTELLIGENCE</div>
          <h1 style={{fontFamily:"var(--fd)",fontSize:"clamp(32px,5vw,56px)",fontWeight:800,color:"#fff",lineHeight:1.1,letterSpacing:"-.03em",marginBottom:24}}>지금 이 거래, <span style={{background:"linear-gradient(135deg,var(--bw),var(--bl))",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>안전한가?</span></h1>
          <p style={{fontSize:18,color:"rgba(255,255,255,.55)",maxWidth:520,lineHeight:1.7,marginBottom:40}}>491개 변수, 5-Dimension 분석으로 거래 단위의 리스크를 실시간 평가합니다.</p>
          <div style={{display:"flex",gap:16,flexWrap:"wrap"}}><button className="bp" onClick={()=>setPage("contact")}>도입 문의 →</button><button className="bs">API 문서 요청</button></div>
        </div>
      </div>
      <div style={{ position:"absolute",bottom:0,left:0,right:0,height:1,background:"rgba(255,255,255,0.08)",zIndex:2 }}/>
    </section>
    <section style={{padding:"96px 24px",background:"#fff"}}><div style={{maxWidth:900,margin:"0 auto"}}>
      <Reveal><SH label="DIFFERENTIATION" title="기존 평가와 무엇이 다른가요?"/></Reveal>
      <Reveal delay={.1}><div style={{overflowX:"auto",borderRadius:12,border:"1px solid var(--bd)"}}><table className="ctbl"><thead><tr><th style={{width:"20%"}}>구분</th><th style={{width:"40%"}}>기존 신용평가</th><th style={{width:"40%"}}>FlowScore</th></tr></thead><tbody>
        {[["데이터","재무제표 중심, 과거 지표","실시간 거래 흐름 중심"],["평가 대상","기업 전체의 장기 안정성","단기 매출채권 단위의 안정성"],["갱신 주기","연 1회 갱신","거래 발생 단위로 누적·업데이트"],["핵심 질문","\"괜찮은 회사인가?\"","\"지금 이 거래, 안전한가?\""]].map(([c,o,n],i)=><tr key={i}><td style={{fontWeight:600}}>{c}</td><td style={{color:"var(--tm)"}}>{o}</td><td>{n}</td></tr>)}
      </tbody></table></div></Reveal>
    </div></section>
    <section style={{padding:"96px 24px",background:"var(--alt)"}}><div style={{maxWidth:1200,margin:"0 auto"}}>
      <Reveal><SH label="5-DIMENSION ANALYSIS" title="재무만 보지 않습니다." subtitle="행동, 소통, 거래 패턴까지 — 491개 변수로 기업의 진짜 모습을 평가합니다"/></Reveal>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:20}}>
        {[{Ic:Search,nm:"재무적 건전성",v:"재무비율, 신용등급, 연체정보"},{Ic:Building2,nm:"구조적 안정성",v:"임직원 변동, 지배구조, 특수관계"},{Ic:Activity,nm:"운영 의지",v:"업로드 문서, 결제시간, 12개월 이벤트"},{Ic:BarChart3,nm:"거래 건전성",v:"거래처 집중도, 물품, 결제 내역"},{Ic:MessageCircle,nm:"소통 및 이슈",v:"피드백 반응, 누락 문서 제출"}].map((d,i)=>
          <Reveal key={i} delay={i*.1}><div className="bcard" style={{textAlign:"center"}}><div style={{marginBottom:12,display:"flex",justifyContent:"center"}}><LI icon={d.Ic}/></div><h3 style={{fontFamily:"var(--fd)",fontWeight:600,fontSize:16,marginBottom:8}}>{d.nm}</h3><p style={{fontSize:13,color:"var(--tm)",lineHeight:1.6}}>{d.v}</p></div></Reveal>)}
      </div>
      <Reveal delay={.3}><div style={{marginTop:48,padding:"24px 32px",background:"#fff",borderRadius:12,border:"1px solid var(--bd)",textAlign:"center"}}>
        <div style={{fontFamily:"var(--fm)",fontSize:14,color:"var(--tm)",lineHeight:2.2}}><span style={{color:"var(--bw)",fontWeight:600}}>491개 Feature</span> → Gate 1 → Gate 2 → Gate 3 → Gate 4 → <span style={{color:"var(--br)",fontWeight:600}}>AI Scoring</span> → <span style={{color:"var(--ny)",fontWeight:600}}>Reason Code</span></div>
      </div></Reveal>
    </div></section>
    <section style={{padding:"96px 24px",background:"#fff"}}><div style={{maxWidth:1000,margin:"0 auto"}}>
      <Reveal><SH label="CASE STUDIES" title="FlowScore가 실제로 작동한 순간."/></Reveal>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:24}}>
        <Reveal><div className="card" style={{borderLeft:"none",overflow:"hidden",position:"relative",paddingTop:44}}><div style={{position:"absolute",top:0,left:0,right:0,height:4,borderRadius:"12px 12px 0 0",background:"linear-gradient(90deg, #f87171, #ef4444, #dc2626, #b91c1c)"}}/><div style={{fontFamily:"var(--fm)",fontSize:12,color:"#ef4444",marginBottom:12}}>CASE 1 — 손실 방어</div><h3 style={{fontFamily:"var(--fd)",fontWeight:600,fontSize:18,marginBottom:16}}>"가짜 우량" 포착</h3><div style={{fontSize:14,color:"var(--tm)",lineHeight:1.8}}><p><strong>기존 평가:</strong> 재무 양호 → 우량 판정</p><p><strong>FlowScore:</strong> 비재무 행동 이상 징후 포착</p><p style={{color:"#ef4444",fontWeight:600,marginTop:8}}>결과: 취급 거절 3개월 후 회생 절차 돌입</p></div></div></Reveal>
        <Reveal delay={.15}><div className="card" style={{borderLeft:"none",overflow:"hidden",position:"relative",paddingTop:44}}><div style={{position:"absolute",top:0,left:0,right:0,height:4,borderRadius:"12px 12px 0 0",background:"linear-gradient(90deg, #4ade80, #22c55e, #16a34a, #15803d)"}}/><div style={{fontFamily:"var(--fm)",fontSize:12,color:"var(--gn)",marginBottom:12}}>CASE 2 — 수익 기회 발굴</div><h3 style={{fontFamily:"var(--fd)",fontWeight:600,fontSize:18,marginBottom:16}}>고회전 소기업 발굴</h3><div style={{fontSize:14,color:"var(--tm)",lineHeight:1.8}}><p><strong>기존 평가:</strong> 업력 2년 미만, 금융 거절</p><p><strong>FlowScore:</strong> 상환 성실도 100%, 연체 0%</p><p style={{color:"var(--gn)",fontWeight:600,marginTop:8}}>결과: 누적 거래 200+, 마진율 5%</p></div></div></Reveal>
      </div>
    </div></section>
    <section style={{padding:"96px 24px",background:"var(--alt)"}}><div style={{maxWidth:600,margin:"0 auto",textAlign:"center"}}><Reveal>
      <div className="slbl">MODEL PERFORMANCE</div>
      <div style={{display:"flex",justifyContent:"center",gap:48,margin:"32px 0"}}>{[{l:"AR (정확도)",v:"0.60"},{l:"KS (판별력)",v:"0.39"},{l:"부도율",v:"0.22%"}].map(m=><div key={m.l}><div style={{fontFamily:"var(--fd)",fontWeight:800,fontSize:36,color:"var(--ny)"}}>{m.v}</div><div style={{fontSize:13,color:"var(--tm)",marginTop:4}}>{m.l}</div></div>)}</div>
    </Reveal></div></section>
    <section style={{padding:"96px 24px",background:"var(--nd)",color:"#fff",textAlign:"center"}}><Reveal><div style={{maxWidth:600,margin:"0 auto"}}>
      <div className="slbl" style={{color:"var(--bw)"}}>G-SCORE API</div><h2 style={{fontFamily:"var(--fd)",fontWeight:700,fontSize:"clamp(24px,4vw,36px)",marginBottom:16}}>Risk-as-a-Service</h2>
      <p style={{fontSize:16,color:"rgba(255,255,255,.55)",marginBottom:36,lineHeight:1.7}}>외부 금융기관과 핀테크에 API로 제공합니다. Singapore PoC 진행 중.</p>
      <button className="bp" onClick={()=>setPage("contact")} style={{padding:"16px 36px"}}>FlowScore API 문의 →</button>
    </div></Reveal></section>
  </>;
}

export default function FlowScorePage() {
  return <FS setPage={(p: string) => window.location.href = "/" + (p === "home" ? "" : p)} />;
}
