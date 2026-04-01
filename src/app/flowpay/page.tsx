"use client";

import { useState, useEffect, useRef } from "react";
import { Zap, ArrowLeftRight, ShieldCheck, TrendingUp, UtensilsCrossed, HeartPulse, Wrench, Cpu, Sparkles, Package, Leaf } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SH } from "@/components/ui/SectionHeader";
import { Stat } from "@/components/ui/Stat";
import { LI } from "@/components/ui/LucideIcon";
import LogoMarquee from "@/components/home/LogoMarquee";
import FlowPayVisual from "@/components/service/FlowPayVisual";

// === FLOWPAY PAGE ===
function FP({ setPage }) {
  return <>
    <section className="hero-bg" style={{ padding: "140px 24px 100px", position: "relative", overflow: "hidden" }}>
      <div style={{ position:"absolute", inset:0, display:"flex", justifyContent:"flex-end" }}>
        <div style={{ width:"75%", height:"100%", position:"relative", right:"-5%" }}>
          <FlowPayVisual/>
        </div>
      </div>
      <div style={{ position:"absolute", inset:0, background:"linear-gradient(90deg, rgba(15,25,41,.95) 0%, rgba(15,25,41,.7) 40%, rgba(15,25,41,.15) 75%, transparent 100%)", zIndex:1 }}/>
      <div style={{ maxWidth:1200,margin:"0 auto",position:"relative",zIndex:2 }}>
        <div style={{ maxWidth: 600 }}>
          <div className="slbl" style={{color:"var(--bw)"}}>FLOWPAY — SUPPLY NOW, PAY LATER</div>
          <h1 style={{fontFamily:"var(--fd)",fontSize:"clamp(32px,5vw,56px)",fontWeight:800,color:"#fff",lineHeight:1.1,letterSpacing:"-.03em",marginBottom:24}}>원자재는 지금 조달,<br/><span style={{background:"linear-gradient(135deg,var(--bw),var(--bl))",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>대금은 나중에</span></h1>
          <p style={{fontSize:18,color:"rgba(255,255,255,.55)",maxWidth:520,lineHeight:1.7,marginBottom:40}}>유통 기반 구매대행 — 대출이 아닌 상거래 방식으로 부채 부담 없이 매출을 확장하세요.</p>
          <a href="https://flowpay.kr" target="_blank" rel="noopener noreferrer" className="bp" style={{padding:"14px 32px",fontSize:16,textDecoration:"none",display:"inline-block"}}>FlowPay 신청하기 →</a>
        </div>
      </div>
      <div style={{ position:"absolute",bottom:0,left:0,right:0,height:1,background:"rgba(255,255,255,0.08)",zIndex:2 }}/>
    </section>
    <section style={{padding:"96px 24px",background:"#fff"}}><div style={{maxWidth:1200,margin:"0 auto"}}>
      <Reveal><SH label="WHY FLOWPAY" title="대출이 아닌 구매대행, 이것이 다릅니다." subtitle="부채 없이 원자재를 조달하고, 매출 기회를 놓치지 않는 구조입니다."/></Reveal>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:24}}>
        {[{Ic:Zap,t:"원자재 즉시 선공급",d:"생산과 납품을 먼저 진행하여 매출 기회를 확보합니다"},{Ic:ArrowLeftRight,t:"유통 기반 구매대행",d:"매입/매출 계산서 발행 구조. 부채비율에 영향 없이 재무 건전성을 유지합니다"},{Ic:ShieldCheck,t:"이중 안전장치",d:"FlowScore AI 심사 + 보증보험 연계로 구조적 리스크를 통제합니다"},{Ic:TrendingUp,t:"성장 친화적 구조",d:"자금이 부족해도 수주를 포기할 필요 없이 매출을 확장합니다"}].map((it,i)=>
          <Reveal key={i} delay={i*.1}><div className="card" style={{height:"100%"}}><div style={{marginBottom:16}}><LI icon={it.Ic}/></div><h3 style={{fontFamily:"var(--fd)",fontWeight:600,fontSize:18,marginBottom:8}}>{it.t}</h3><p style={{fontSize:15,color:"var(--tm)",lineHeight:1.7}}>{it.d}</p></div></Reveal>)}
      </div>
    </div></section>
    <section style={{padding:"96px 24px",background:"var(--alt)"}}><div style={{maxWidth:800,margin:"0 auto"}}>
      <Reveal><SH label="SERVICE FLOW" title="6단계 서비스 플로우" subtitle="발주 신청부터 정산까지, 투명한 프로세스"/></Reveal>
      <div style={{display:"flex",flexDirection:"column",gap:12}}>
        {[{n:"1",t:"고객사 발주 신청",d:"원자재·상품 발주 요청 접수"},{n:"2",t:"FlowScore 심사",d:"매출채권·거래 리스크 AI 평가"},{n:"3",t:"보증보험 연계",d:"2차 안전장치, 위험 분산 구조"},{n:"4",t:"276홀딩스 선결제",d:"조달처에 즉시 현금 구매"},{n:"5",t:"원자재 선공급",d:"고객사 생산·납품 정상 진행"},{n:"6",t:"대금 회수 (정산)",d:"납품 완료 후 정산 주기 회수"}].map((s,i)=>
          <Reveal key={i} delay={i*.08}><div className="fstep"><div className="fnum">{s.n}</div><div><div style={{fontFamily:"var(--fd)",fontWeight:600,fontSize:16}}>{s.t}</div><div style={{fontSize:14,color:"var(--tm)",marginTop:2}}>{s.d}</div></div></div></Reveal>)}
      </div>
    </div></section>
    <section style={{padding:"96px 24px",background:"#fff"}}><div style={{maxWidth:1200,margin:"0 auto"}}>
      <Reveal><SH label="TRACK RECORD" title="숫자가 말하는 FlowPay." subtitle="2022년 9월부터 실제 운용하며 축적된 성과입니다"/></Reveal>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:24}}>
        <Reveal><Stat value={1295} suffix="건" label="총 거래 건수"/></Reveal><Reveal delay={.1}><Stat value={5} suffix=".07%" label="거래 당 실현 수익률"/></Reveal><Reveal delay={.2}><Stat value={0} suffix=".22%" label="최종 부도율"/></Reveal><Reveal delay={.3}><Stat value={44} suffix="일" label="평균 거래 만기일"/></Reveal><Reveal delay={.4}><Stat value={65} suffix="%+" label="재구매 고객 비중"/></Reveal>
      </div>
    </div></section>
    <section style={{padding:"96px 24px",background:"var(--alt)"}}><div style={{maxWidth:1200,margin:"0 auto"}}>
      <Reveal><SH label="INDUSTRIES" title="어떤 산업에서도 작동합니다."/></Reveal>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:16}}>
        {[{Ic:UtensilsCrossed,nm:"식음료 (F&B)",ex:"원자재 수급, 가공식품"},{Ic:HeartPulse,nm:"의료·헬스케어",ex:"의약품, 의료기기"},{Ic:Wrench,nm:"금속·부품",ex:"산업용 원자재"},{Ic:Cpu,nm:"전기·전자",ex:"전자 부품, IT 기기"},{Ic:Sparkles,nm:"뷰티·럭셔리",ex:"K뷰티 수출, 명품 유통"},{Ic:Package,nm:"일상 소비재",ex:"포장재, 소모품"},{Ic:Leaf,nm:"지역 생산품",ex:"특산품, 농업용 소비재"}].map((it,i)=>
          <Reveal key={i} delay={i*.06}><div style={{padding:"20px 24px",background:"#fff",border:"1px solid var(--bd)",borderRadius:12,display:"flex",gap:12,alignItems:"center"}}><it.Ic size={22} strokeWidth={1.5} color="var(--br)"/><div><div style={{fontFamily:"var(--fd)",fontWeight:600,fontSize:15}}>{it.nm}</div><div style={{fontSize:13,color:"var(--tm)"}}>{it.ex}</div></div></div></Reveal>)}
      </div>
    </div></section>
    <section style={{padding:"64px 24px",background:"#fff"}}><div style={{maxWidth:1200,margin:"0 auto"}}><LogoMarquee/></div></section>
    <section style={{padding:"96px 24px",background:"linear-gradient(135deg,var(--ny),#132240)",textAlign:"center",color:"#fff"}}><Reveal><div style={{maxWidth:500,margin:"0 auto"}}>
      <h2 style={{fontFamily:"var(--fd)",fontWeight:700,fontSize:"clamp(26px,4vw,36px)",marginBottom:16}}>자금 흐름, 지금 바꿔보세요.</h2>
      <p style={{fontSize:16,color:"rgba(255,255,255,.55)",marginBottom:36}}>FlowPay가 귀사의 공급망 자금 문제를 어떻게 해결하는지 확인하세요</p>
      <a href="https://flowpay.kr" target="_blank" rel="noopener noreferrer" className="bp" style={{padding:"16px 36px",fontSize:16,textDecoration:"none",display:"inline-block"}}>FlowPay 신청하기 →</a>
    </div></Reveal></section>
  </>;
}

export default function FlowPayPage() {
  return <FP setPage={(p: string) => window.location.href = "/" + (p === "home" ? "" : p)} />;
}
