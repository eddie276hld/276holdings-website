"use client";
import { navigateTo } from "@/lib/navigation";

import { BarChart3, Search, Building2, MessageCircle } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SH } from "@/components/ui/SectionHeader";
import { LI } from "@/components/ui/LucideIcon";
import { Stat } from "@/components/ui/Stat";
import FlowScoreVisual from "@/components/service/FlowScoreVisual";

// === FLOWSCORE PAGE ===
function FS({ setPage }: { setPage: (id: string) => void }) {
  return <>
    <section className="hero-bg" style={{ padding:"180px 24px 140px",position:"relative",overflow:"hidden" }}>
      <div style={{ position:"absolute", inset:0, display:"flex", justifyContent:"flex-end" }}>
        <div style={{ width:"75%", height:"100%", position:"relative", right:"-5%" }}>
          <FlowScoreVisual/>
        </div>
      </div>
      <div style={{ position:"absolute", inset:0, background:"linear-gradient(90deg, rgba(15,25,41,.95) 0%, rgba(15,25,41,.7) 40%, rgba(15,25,41,.15) 75%, transparent 100%)", zIndex:1 }}/>
      <div style={{maxWidth:1200,margin:"0 auto",position:"relative",zIndex:2}}>
        <div style={{ maxWidth: 600 }}>
          <div style={{fontFamily:"var(--fd)",fontWeight:900,fontSize:"clamp(45px,7vw,84px)",color:"#fff",letterSpacing:"-.04em",lineHeight:.95,margin:"0 0 20px"}}>FLOW SCORE</div>
          <h1 style={{fontFamily:"var(--fd)",fontSize:"clamp(24px,3vw,38px)",fontWeight:700,color:"rgba(255,255,255,.75)",lineHeight:1.4,letterSpacing:"-.02em",marginBottom:24}}>지금 이 거래, <span style={{color:"var(--bw)"}}>안전한가?</span></h1>
          <p style={{fontSize:18,color:"rgba(255,255,255,.55)",maxWidth:480,lineHeight:1.7,marginBottom:40,whiteSpace:"pre-line"}}>{"재무제표가 멀쩡해도 다음 달 부도날 수 있어요.\n우리는 그 신호를 먼저 읽어요."}</p>
          <div style={{display:"flex",gap:16,flexWrap:"wrap"}}><button className="bp" onClick={()=>setPage("contact")}>도입 문의 →</button></div>
        </div>
      </div>
      <div style={{ position:"absolute",bottom:0,left:0,right:0,height:1,background:"rgba(255,255,255,0.08)",zIndex:2 }}/>
    </section>

    <section style={{padding:"160px 24px",background:"#fff"}}><div style={{maxWidth:1100,margin:"0 auto"}}>
      <Reveal><SH title="기존 평가와 무엇이 다른가요?"/></Reveal>
      <Reveal delay={.1}><div style={{overflowX:"auto",borderRadius:12,border:"1px solid var(--bd)",marginTop:72}}><table className="ctbl ctbl-no-hover">
        <thead><tr>
          <th style={{width:"20%",padding:"20px 28px",fontSize:16}}>구분</th>
          <th style={{width:"40%",padding:"20px 28px",fontSize:16}}>기존 신용평가</th>
          <th style={{width:"40%",padding:"20px 28px",fontSize:16,background:"var(--ny)",color:"#fff"}}>FLOW SCORE</th>
        </tr></thead>
        <tbody>
          {[["데이터","재무제표 중심, 과거 지표","실시간 거래 흐름 중심"],["평가 대상","기업 전체의 장기 안정성","단기 매출채권 단위의 안정성"],["갱신 주기","연 1회 갱신","거래 발생 단위로 누적·업데이트"],["핵심 질문","\"괜찮은 회사인가?\"","\"지금 이 거래, 안전한가?\""]].map(([c,o,n],i)=>(
            <tr key={i}>
              <td style={{fontWeight:600,padding:"22px 28px",fontSize:17}}>{c}</td>
              <td style={{color:"#555",padding:"22px 28px",fontSize:17}}>{o}</td>
              <td style={{color:"var(--ny)",fontWeight:700,padding:"22px 28px",fontSize:17,background:"var(--alt)"}}>{n}</td>
            </tr>
          ))}
        </tbody>
      </table></div></Reveal>
    </div></section>

    <section style={{padding:"160px 24px",background:"var(--alt)"}}><div style={{maxWidth:1200,margin:"0 auto"}}>
      <Reveal><SH title="재무만 보지 않아요." subtitle={<>행동, 소통, 거래 패턴까지 — <strong>491개 변수</strong>로 기업의 진짜 모습을 평가해요</>}/></Reveal>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:20,marginTop:72,alignItems:"stretch"}}>
        {[
          {Ic:Search,       nm:"재무적 건전성",    v:"재무비율, 신용등급, 연체정보"},
          {Ic:Building2,    nm:"구조적 안정성",    v:"임직원 변동 · 지배구조 · 특수관계"},
          {Ic:MessageCircle,nm:"소통 및 운영 이력",v:"업로드 문서 상태, 결제 타이밍, 12개월 내 이벤트, 피드백 반응, 누락 문서 제출"},
          {Ic:BarChart3,    nm:"거래 건전성",      v:"거래처 집중도, 물품, 결제 내역"},
        ].map((d,i)=>
          <Reveal key={i} delay={i*.1}>
            <div style={{background:"#fff",borderRadius:12,padding:32,height:"100%"}}>
              <div style={{marginBottom:16}}><LI icon={d.Ic} size={32} color="var(--ny)"/></div>
              <h3 style={{fontFamily:"var(--fd)",fontWeight:600,fontSize:24,marginBottom:12}}>{d.nm}</h3>
              <p style={{fontSize:19,color:"#333",lineHeight:1.7}}>{d.v}</p>
            </div>
          </Reveal>
        )}
      </div>
    </div></section>

    <section style={{padding:"160px 24px",background:"#fff"}}><div style={{maxWidth:1200,margin:"0 auto"}}>
      <Reveal><SH title="FLOW SCORE가 실제로 작동한 순간"/></Reveal>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:24,marginTop:72}}>
        <Reveal><div style={{background:"#f8fafc",borderRadius:12,padding:"40px 32px 32px",height:"100%"}}>
          <div style={{fontFamily:"var(--fd)",fontSize:12,fontWeight:700,letterSpacing:".08em",color:"var(--ny)",marginBottom:12,textTransform:"uppercase"}}>손실 방어 사례</div>
          <h3 style={{fontFamily:"var(--fd)",fontWeight:600,fontSize:22,marginBottom:16}}>"가짜 우량" 포착</h3>
          <div style={{fontSize:17,color:"#555",lineHeight:1.8}}>
            <p><strong>기존 평가:</strong> 재무 양호 → 우량 판정</p>
            <p><strong>FLOW SCORE:</strong> 비재무 행동 이상 징후 포착</p>
            <p style={{color:"var(--ny)",fontWeight:600,marginTop:8}}>결과: 취급 거절 3개월 후 회생 절차 돌입</p>
          </div>
        </div></Reveal>
        <Reveal delay={.15}><div style={{background:"#f8fafc",borderRadius:12,padding:"40px 32px 32px",height:"100%"}}>
          <div style={{fontFamily:"var(--fd)",fontSize:12,fontWeight:700,letterSpacing:".08em",color:"var(--ny)",marginBottom:12,textTransform:"uppercase"}}>기회 발굴 사례</div>
          <h3 style={{fontFamily:"var(--fd)",fontWeight:600,fontSize:22,marginBottom:16}}>고회전 소기업 발굴</h3>
          <div style={{fontSize:17,color:"#555",lineHeight:1.8}}>
            <p><strong>기존 평가:</strong> 업력 2년 미만, 금융 거절</p>
            <p><strong>FLOW SCORE:</strong> 상환 성실도 100%, 연체 0%</p>
            <p style={{color:"var(--td)",fontWeight:600,marginTop:8}}>결과: 누적 거래 200+, 마진율 5%</p>
          </div>
        </div></Reveal>
      </div>
    </div></section>

    <section style={{padding:"160px 24px",background:"var(--alt)"}}><div style={{maxWidth:800,margin:"0 auto",textAlign:"center"}}><Reveal>
      <SH title="더욱 안정된 수치로 검증해가고 있어요."/>
      <div style={{display:"flex",justifyContent:"center",gap:80,marginTop:72,flexWrap:"wrap"}}>
        <div>
          <Stat value={0.60} decimals={2} label="AR (정확도)"/>
          <div style={{fontSize:15,color:"var(--tm)",marginTop:4,lineHeight:1.6,textAlign:"center"}}>10건 중 6건 이상 정확히 예측해요</div>
        </div>
        <div>
          <Stat value={0.39} decimals={2} label="KS (판별력)"/>
          <div style={{fontSize:15,color:"var(--tm)",marginTop:4,lineHeight:1.6,textAlign:"center"}}>정상·부실 기업 판별력 검증 완료</div>
        </div>
        <div>
          <Stat value={0.22} decimals={2} suffix="%" label="부도율"/>
          <div style={{fontSize:15,color:"var(--tm)",marginTop:4,lineHeight:1.6,textAlign:"center"}}>FlowScore 통과 거래의 실제 부도율</div>
        </div>
      </div>
    </Reveal></div></section>

    <section style={{padding:"120px 24px",background:"linear-gradient(135deg,var(--ny),#132240)",color:"#fff",textAlign:"center"}}><Reveal><div style={{maxWidth:600,margin:"0 auto"}}>
      <h2 style={{fontFamily:"var(--fd)",fontWeight:700,fontSize:"clamp(32px,4vw,44px)",marginBottom:16,letterSpacing:"-.02em"}}>Risk-as-a-Service</h2>
      <p style={{fontSize:21,color:"rgba(255,255,255,.55)",marginBottom:40,lineHeight:1.7}}>금융기관과 핀테크 서비스에서 활용할 수 있어요.</p>
      <button className="bp" onClick={()=>setPage("contact")} style={{padding:"16px 36px",fontSize:20}}>도입 문의 →</button>
    </div></Reveal></section>
  </>;
}

export default function FlowScorePage() {
  return <FS setPage={navigateTo} />;
}
