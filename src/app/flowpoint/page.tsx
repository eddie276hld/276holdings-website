"use client";
import { navigateTo } from "@/lib/navigation";

import { FolderOpen, Link2, ArrowRightLeft, Coins, FileWarning, Hourglass, Lock } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SH } from "@/components/ui/SectionHeader";
import { LI } from "@/components/ui/LucideIcon";
import FlowPointVisual from "@/components/service/FlowPointVisual";

// === FLOWPOINT PAGE ===
function FPt({ setPage }: { setPage: (id: string) => void }) {
  return <>
    <section className="hero-bg" style={{padding:"180px 24px 140px",position:"relative",overflow:"hidden"}}>
      <div style={{ position:"absolute", inset:0, display:"flex", justifyContent:"flex-end" }}>
        <div style={{ width:"75%", height:"100%", position:"relative", right:"-5%" }}>
          <FlowPointVisual/>
        </div>
      </div>
      <div style={{ position:"absolute", inset:0, background:"linear-gradient(90deg, rgba(15,25,41,.95) 0%, rgba(15,25,41,.7) 40%, rgba(15,25,41,.15) 75%, transparent 100%)", zIndex:1 }}/>
      <div style={{maxWidth:1200,margin:"0 auto",position:"relative",zIndex:2}}>
        <div style={{ maxWidth: 600 }}>
          <div style={{fontFamily:"var(--fd)",fontWeight:900,fontSize:"clamp(45px,7vw,84px)",color:"#fff",letterSpacing:"-.04em",lineHeight:.95,margin:"8px 0 20px"}}>FLOW POINT</div>
          <h1 style={{fontFamily:"var(--fd)",fontSize:"clamp(20px,3vw,32px)",fontWeight:600,color:"rgba(255,255,255,.75)",lineHeight:1.3,letterSpacing:"-.02em",marginBottom:24}}>매출계약서에 <span style={{color:"var(--bw)"}}>'흐름'</span>을 만들어요</h1>
          <p style={{fontSize:18,color:"rgba(255,255,255,.55)",maxWidth:520,lineHeight:1.7,marginBottom:40}}>종이 계약서를 디지털 자산으로 전환하여 양수도·유동화까지 연결해요.</p>
          <a href="https://flowpoint.kr" target="_blank" rel="noopener noreferrer" className="bp" style={{padding:"14px 32px",fontSize:16,textDecoration:"none",display:"inline-block"}}>FLOW POINT 시작하기 →</a>
        </div>
      </div>
      <div style={{ position:"absolute",bottom:0,left:0,right:0,height:1,background:"rgba(255,255,255,0.08)",zIndex:2 }}/>
    </section>

    <section style={{padding:"160px 24px",background:"#fff"}}><div style={{maxWidth:1200,margin:"0 auto"}}>
      <Reveal><SH title="중소기업이 매일 마주하는 벽"/></Reveal>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:24,marginTop:72}}>
        {[{Ic:FileWarning,t:"종이 계약의 함정",d:"계약서 한 장 잃어버리면 분쟁이 시작돼요. 버전이 몇 개인지도 모르고, 위변조 여부도 확인할 수 없어요."},{Ic:Hourglass,t:"납품 후 현금 공백",d:"납품은 완료했는데 대금은 60~90일 뒤. 그런데 다음 원자재 매입은 지금 당장 현금이 필요해요."},{Ic:Lock,t:"담보 없는 성장의 벽",d:"성장하고 있어도 부동산 담보가 없으면 은행 문은 닫혀있어요. 매출채권은 자산인데, 아무도 봐주지 않아요."}].map((p,i)=>
          <Reveal key={i} delay={i*.1}>
            <div style={{background:"#f8fafc",borderRadius:12,padding:32,height:"100%"}}>
              <div style={{marginBottom:16}}><LI icon={p.Ic} color="var(--ny)" size={32}/></div>
              <h3 style={{fontFamily:"var(--fd)",fontWeight:600,fontSize:24,marginBottom:12}}>{p.t}</h3>
              <p style={{fontSize:19,color:"#333",lineHeight:1.7}}>{p.d}</p>
            </div>
          </Reveal>)}
      </div>
    </div></section>

    <section style={{padding:"160px 24px",background:"var(--alt)"}}><div style={{maxWidth:1200,margin:"0 auto"}}>
      <Reveal><SH title="계약서 관리부터 유동화까지, 한 곳에서"/></Reveal>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",gap:24,marginTop:72}}>
        {[
          {Ic:FolderOpen,    t:"디지털 관리",       d:"계약서 등록·보관·검색을 한 곳에서 통합 관리해요.", why:"계약서를 잃어버리거나 버전이 엉키는 일을 막아줘요."},
          {Ic:Link2,        t:"매출채권 전자화",    d:"종이 계약을 온라인 자산(전자채권)으로 전환해요.",  why:"종이 계약서를 전자채권으로 바꿔야 자금화가 가능해요."},
          {Ic:ArrowRightLeft,t:"업무 흐름 자동화",  d:"계약서를 거래 프로세스에 직접 연결해요.",         why:"수동 작업 없이 계약서가 흐름에 자동으로 연결돼요."},
          {Ic:Coins,        t:"온라인 양수도",      d:"매출계약서를 즉시 자금 활용 옵션으로 확장해요.",  why:"자금이 필요할 때 계약서를 즉시 현금화할 수 있어요."},
        ].map((f,i)=>
          <Reveal key={i} delay={i*.1}>
            <div style={{background:"#fff",borderRadius:12,padding:32,height:"100%"}}>
              <div style={{marginBottom:12}}><LI icon={f.Ic} color="var(--ny)"/></div>
              <h3 style={{fontFamily:"var(--fd)",fontWeight:600,fontSize:19,marginBottom:8}}>{f.t}</h3>
              <p style={{fontSize:17,color:"#555",lineHeight:1.7}}>{f.d}</p>
            </div>
          </Reveal>
        )}
      </div>
    </div></section>

    <section style={{padding:"160px 24px",background:"#fff"}}><div style={{maxWidth:800,margin:"0 auto"}}>
      <Reveal><SH title="4단계 서비스 플로우"/></Reveal>
      <div style={{display:"flex",flexDirection:"column",gap:12,marginTop:72}}>
        {[{n:"1",t:"거래 계약서 등록 시 전자매출채권 생성"},{n:"2",t:"결제 금액, 만기일, 거래처 등 온라인 관리"},{n:"3",t:"거래처 전달 / 양수도"},{n:"4",t:"유동화 — 계약서가 현금이 돼요"}].map((s,i)=>
          <Reveal key={i} delay={i*.08}><div className="fstep fstep-static"><div className="fnum fnum-navy">{s.n}</div><div style={{fontFamily:"var(--fd)",fontWeight:600,fontSize:16}}>{s.t}</div></div></Reveal>)}
      </div>
    </div></section>

    <section style={{padding:"120px 24px",background:"linear-gradient(135deg,var(--ny),#132240)",color:"#fff",textAlign:"center"}}><Reveal><div style={{maxWidth:500,margin:"0 auto"}}>
      <h2 style={{fontFamily:"var(--fd)",fontWeight:700,fontSize:"clamp(24px,4vw,32px)",marginBottom:16,color:"#fff"}}>종이 계약의 비효율, 지금 끝내세요.</h2>
      <p style={{fontSize:16,color:"rgba(255,255,255,.55)",marginBottom:36}}>FLOW POINT로 매출채권을 디지털 자산으로 전환하세요</p>
      <div style={{display:"flex",gap:16,justifyContent:"center",flexWrap:"wrap"}}>
        <a href="https://flowpoint.kr" target="_blank" rel="noopener noreferrer" className="bp" style={{padding:"16px 36px",textDecoration:"none",display:"inline-block"}}>FLOW POINT 시작하기 →</a>
        <button className="bs" onClick={()=>setPage("contact")} style={{padding:"16px 36px"}}>문의하기</button>
      </div>
    </div></Reveal></section>
  </>;
}

export default function FlowPointPage() {
  return <FPt setPage={navigateTo} />;
}
