"use client";
import { navigateTo } from "@/lib/navigation";

import { useState, useEffect, useRef } from "react";
import { FolderOpen, Link2, ArrowRightLeft, Coins, FileWarning, Hourglass, Lock, Link } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SH } from "@/components/ui/SectionHeader";
import { LI } from "@/components/ui/LucideIcon";
import FlowPointVisual from "@/components/service/FlowPointVisual";

// === FLOWPOINT PAGE ===
function FPt({ setPage }: { setPage: (id: string) => void }) {
  return <>
    <section className="hero-bg" style={{padding:"140px 24px 100px",position:"relative",overflow:"hidden"}}>
      <div style={{ position:"absolute", inset:0, display:"flex", justifyContent:"flex-end" }}>
        <div style={{ width:"75%", height:"100%", position:"relative", right:"-5%" }}>
          <FlowPointVisual/>
        </div>
      </div>
      <div style={{ position:"absolute", inset:0, background:"linear-gradient(90deg, rgba(15,25,41,.95) 0%, rgba(15,25,41,.7) 40%, rgba(15,25,41,.15) 75%, transparent 100%)", zIndex:1 }}/>
      <div style={{maxWidth:1200,margin:"0 auto",position:"relative",zIndex:2}}>
        <div style={{ maxWidth: 600 }}>
          <div className="slbl" style={{color:"var(--bw)"}}>DATA INPUT LAYER</div>
          <div style={{fontFamily:"var(--fd)",fontWeight:900,fontSize:"clamp(64px,10vw,120px)",color:"#fff",letterSpacing:"-.04em",lineHeight:.95,margin:"8px 0 20px"}}>FlowPoint</div>
          <h1 style={{fontFamily:"var(--fd)",fontSize:"clamp(20px,3vw,32px)",fontWeight:600,color:"rgba(255,255,255,.75)",lineHeight:1.3,letterSpacing:"-.02em",marginBottom:24}}>매출계약서에 <span style={{color:"var(--bw)"}}>'흐름'</span>을 만듭니다</h1>
          <p style={{fontSize:18,color:"rgba(255,255,255,.55)",maxWidth:520,lineHeight:1.7,marginBottom:40}}>종이 계약서를 디지털 자산으로 전환하여 양수도·유동화까지 연결합니다.</p>
          <a href="https://flowpoint.kr" target="_blank" rel="noopener noreferrer" className="bp" style={{padding:"14px 32px",fontSize:16,textDecoration:"none",display:"inline-block"}}>FlowPoint 시작하기 →</a>
        </div>
      </div>
      <div style={{ position:"absolute",bottom:0,left:0,right:0,height:1,background:"rgba(255,255,255,0.08)",zIndex:2 }}/>
    </section>
    <section style={{padding:"96px 24px",background:"#fff"}}><div style={{maxWidth:1000,margin:"0 auto"}}>
      <Reveal><SH label="MARKET PAIN" title="중소기업이 매일 마주하는 벽."/></Reveal>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:24}}>
        {[{Ic:FileWarning,t:"Paper Handling",d:"종이 계약서 주고받기 번거롭고, 분실·위변조·버전관리 어려움"},{Ic:Hourglass,t:"Pay Timing",d:"납품 후 외상 회수인데 매입은 선현금 요구 — 현금흐름 단절"},{Ic:Lock,t:"Asset for Securities",d:"담보 잡을 자산이 부족해 운전자금 조달이 막힘"}].map((p,i)=>
          <Reveal key={i} delay={i*.1}><div className="card" style={{height:"100%"}}><div style={{marginBottom:16}}><LI icon={p.Ic}/></div><h3 style={{fontFamily:"var(--fd)",fontWeight:600,fontSize:18,marginBottom:8}}>{p.t}</h3><p style={{fontSize:15,color:"var(--tm)",lineHeight:1.7}}>{p.d}</p></div></Reveal>)}
      </div>
    </div></section>
    <section style={{padding:"96px 24px",background:"var(--alt)"}}><div style={{maxWidth:1200,margin:"0 auto"}}>
      <Reveal><SH label="KEY FEATURES" title="계약서 관리부터 유동화까지, 한 곳에서."/></Reveal>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",gap:24}}>
        {[{Ic:FolderOpen,t:"Digital Archive",d:"계약서 등록·보관·검색을 한 곳에서 통합 관리"},{Ic:Link2,t:"Asset Digitalization",d:"종이 계약을 온라인 자산(전자채권)으로 전환"},{Ic:ArrowRightLeft,t:"Workflow 연결",d:"계약서를 거래 프로세스에 직접 연결"},{Ic:Coins,t:"온라인 양수도",d:"매출계약서를 즉시 자금 활용 옵션으로 확장"}].map((f,i)=>
          <Reveal key={i} delay={i*.1}><div className="bcard" style={{height:"100%"}}><div style={{marginBottom:12}}><LI icon={f.Ic}/></div><h3 style={{fontFamily:"var(--fd)",fontWeight:600,fontSize:17,marginBottom:8}}>{f.t}</h3><p style={{fontSize:14,color:"var(--tm)",lineHeight:1.7}}>{f.d}</p></div></Reveal>)}
      </div>
    </div></section>
    <section style={{padding:"96px 24px",background:"#fff"}}><div style={{maxWidth:800,margin:"0 auto"}}>
      <Reveal><SH label="SERVICE FLOW" title="5단계 서비스 플로우"/></Reveal>
      <div style={{display:"flex",flexDirection:"column",gap:12}}>
        {[{n:"1",t:"계약서 작성 등록"},{n:"2",t:"통합 관리 (과거·현재·미래)"},{n:"3",t:"전자 매출채권 전환 (Asset Digitization)"},{n:"4",t:"거래처 전달 / 양수도"},{n:"5",t:"유동화 활용 (Liquidity)"}].map((s,i)=>
          <Reveal key={i} delay={i*.08}><div className="fstep"><div className="fnum">{s.n}</div><div style={{fontFamily:"var(--fd)",fontWeight:600,fontSize:16}}>{s.t}</div></div></Reveal>)}
      </div>
    </div></section>
    <section style={{padding:"96px 24px",background:"linear-gradient(135deg,var(--ny),#132240)",color:"#fff",textAlign:"center"}}><Reveal><div style={{maxWidth:500,margin:"0 auto"}}>
      <h2 style={{fontFamily:"var(--fd)",fontWeight:700,fontSize:"clamp(24px,4vw,32px)",marginBottom:16,color:"#fff"}}>종이 계약의 비효율, 지금 끝내세요</h2>
      <p style={{fontSize:16,color:"rgba(255,255,255,.55)",marginBottom:36}}>FlowPoint로 매출채권을 디지털 자산으로 전환하세요</p>
      <a href="https://flowpoint.kr" target="_blank" rel="noopener noreferrer" className="bp" style={{padding:"16px 36px",textDecoration:"none",display:"inline-block"}}>FlowPoint 시작하기 →</a>
    </div></Reveal></section>
  </>;
}

export default function FlowPointPage() {
  return <FPt setPage={navigateTo} />;
}
