"use client";
import { navigateTo } from "@/lib/navigation";

import { useState } from "react";
import { Zap, ArrowLeftRight, TrendingUp, ChevronDown, ChevronUp } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SH } from "@/components/ui/SectionHeader";
import { Stat } from "@/components/ui/Stat";
import { LI } from "@/components/ui/LucideIcon";

import FlowPayVisual from "@/components/service/FlowPayVisual";
import LogoMarquee from "@/components/home/LogoMarquee";

const CASES = [
  {
    n: "01", nm: "서울*****", cat: "전기·전자",
    before: "반도체 조달 자금이 부족해 신규 수주 기회를 반복적으로 포기해야 했어요.",
    results: [
      { text: "매출", value: "150%", unit: "추가 발생" },
      { text: "Seed 투자 유치 성공" },
      { text: "추가 계약 체결" },
    ],
  },
  {
    n: "02", nm: "지비*******", cat: "AI·소프트웨어",
    before: "수주는 됐지만 생산 자금 부족으로 납기를 맞추지 못하는 상황이 반복됐어요.",
    results: [
      { text: "생산자금", value: "70%", unit: "추가 확보" },
      { text: "매출", value: "250%", unit: "추가 발생" },
      { text: "성장 지표 기반 M&A 성사" },
    ],
  },
  {
    n: "03", nm: "더포*", cat: "공공·보안",
    before: "공공기관 조달 계약 체결 후 부품 구매 자금이 없어 납품 지연 위기였어요.",
    results: [
      { text: "매출", value: "200%", unit: "추가 발생" },
      { text: "기보 10억원 보증 체결" },
      { text: "서울·경기·충청권 공공기관 조달 납품 체결" },
    ],
  },
];

// === FLOWPAY PAGE ===
function FP({ setPage: _setPage }: { setPage: (id: string) => void }) {
  const [showDetail, setShowDetail] = useState(false);

  return <>
    {/* 1. Hero — dark */}
    <section className="hero-bg" style={{ padding: "180px 24px 140px", position: "relative", overflow: "hidden" }}>
      <div style={{ position:"absolute", inset:0, display:"flex", justifyContent:"flex-end" }}>
        <div style={{ width:"75%", height:"100%", position:"relative", right:"-5%" }}>
          <FlowPayVisual/>
        </div>
      </div>
      <div style={{ position:"absolute", inset:0, background:"linear-gradient(90deg, rgba(15,25,41,.95) 0%, rgba(15,25,41,.7) 40%, rgba(15,25,41,.15) 75%, transparent 100%)", zIndex:1 }}/>
      <div style={{ maxWidth:1200,margin:"0 auto",position:"relative",zIndex:2 }}>
        <div style={{ maxWidth: 600 }}>
          <div style={{fontFamily:"var(--fd)",fontWeight:900,fontSize:"clamp(45px,7vw,84px)",color:"#fff",letterSpacing:"-.04em",lineHeight:.95,margin:"0 0 20px"}}>FLOW PAY</div>
          <h1 style={{fontFamily:"var(--fd)",fontSize:"clamp(24px,3vw,38px)",fontWeight:700,color:"rgba(255,255,255,.75)",lineHeight:1.4,letterSpacing:"-.02em",marginBottom:24}}>원자재는 지금 조달,<br/><span style={{color:"var(--bw)"}}>대금은 나중에</span></h1>
          <a href="https://flowpay.kr" target="_blank" rel="noopener noreferrer" className="bp" style={{padding:"14px 32px",fontSize:20,textDecoration:"none",display:"inline-block"}}>FLOW PAY 신청하기 →</a>
        </div>
      </div>
      <div style={{ position:"absolute",bottom:0,left:0,right:0,height:1,background:"rgba(255,255,255,0.08)",zIndex:2 }}/>
    </section>

    {/* 2. WHY FLOW PAY — white */}
    <section style={{padding:"160px 24px",background:"#fff"}}><div style={{maxWidth:1200,margin:"0 auto"}}>
      <Reveal><SH title="대출이 아닌 구매대행, 이것이 달라요." subtitle="부채 없이 원자재를 조달하고, 매출 기회를 놓치지 않는 구조예요."/></Reveal>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:24,marginTop:72}}>
        {[
          {Ic:Zap,   t:"납기 걱정 없이 생산 먼저",    d:"생산과 납품을 먼저 진행하여 매출 기회를 확보해요."},
          {Ic:ArrowLeftRight, t:"대출 없이, 부채 없이", d:"구매대행 방식이라 재무제표에 부채로 잡히지 않아요. 부채비율 걱정 없이 운전자금을 확보할 수 있어요."},
          {Ic:TrendingUp, t:"자금이 없어도 매출은 계속", d:"자금이 부족해도 수주를 포기할 필요 없이 매출을 확장해요."},
        ].map((it,i)=>
          <Reveal key={i} delay={i*.1}>
            <div style={{background:"#f8fafc",borderRadius:12,padding:32,height:"100%"}}>
              <div style={{marginBottom:16}}><LI icon={it.Ic} color="var(--ny)" size={32}/></div>
              <h3 style={{fontFamily:"var(--fd)",fontWeight:600,fontSize:24,marginBottom:12}}>{it.t}</h3>
              <p style={{fontSize:19,color:"#333",lineHeight:1.7}}>{it.d}</p>
            </div>
          </Reveal>
        )}
      </div>
    </div></section>

    {/* 3. ADOPTION CASES — alt */}
    <section style={{padding:"160px 24px",background:"var(--alt)"}}><div style={{maxWidth:1200,margin:"0 auto"}}>
      <Reveal><SH title="실제 서비스 도입 사례" subtitle="FlowPay를 통해 매출 성장을 이뤄낸 기업들의 실제 이야기예요."/></Reveal>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(320px,1fr))",gap:24,marginTop:72,marginBottom:48}}>
        {CASES.map((c,i)=>(
          <Reveal key={i} delay={i*.1}>
            <div style={{background:"#fff",borderRadius:12,padding:32,height:"100%",boxShadow:"0 1px 3px rgba(0,0,0,.04)"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:16}}>
                <div style={{fontFamily:"var(--fd)",fontWeight:900,fontSize:40,color:"#1a2e4a",opacity:.25}}>{c.n}</div>
                <span style={{fontSize:13,padding:"4px 10px",background:"var(--alt)",borderRadius:20,color:"var(--tm)"}}>{c.cat}</span>
              </div>
              <h3 style={{fontFamily:"var(--fd)",fontWeight:700,fontSize:22,marginBottom:16,color:"var(--td)"}}>{c.nm}</h3>
              {/* Before / After */}
              <div style={{borderTop:"1px solid var(--bd)",paddingTop:16}}>
                <div style={{marginBottom:14}}>
                  <div style={{fontSize:12,fontWeight:700,color:"var(--tm)",letterSpacing:".05em",marginBottom:6,textTransform:"uppercase"}}>도입 전</div>
                  <p style={{fontSize:16,color:"#333",lineHeight:1.6}}>{c.before}</p>
                </div>
                <div>
                  <div style={{fontSize:12,fontWeight:700,color:"var(--ny)",letterSpacing:".05em",marginBottom:6,textTransform:"uppercase"}}>도입 후</div>
                  {c.results.map((r,j)=>(
                    <div key={j} style={{fontSize:16,color:"#333",marginBottom:5,display:"flex",alignItems:"baseline",gap:4}}>
                      <span style={{color:"var(--ny)",flexShrink:0}}>✓</span>
                      {r.value
                        ? <span><span>{r.text} </span><strong style={{color:"var(--ny)",fontSize:18}}>{r.value}</strong><span> {r.unit}</span></span>
                        : <span>{r.text}</span>
                      }
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal>
        <div style={{textAlign:"center"}}>
          <a href="https://flowpay.kr" target="_blank" rel="noopener noreferrer" className="bp" style={{padding:"14px 32px",fontSize:20,textDecoration:"none",display:"inline-block"}}>
            우리 회사도 가능한지 알아보기 →
          </a>
        </div>
      </Reveal>
    </div></section>

    {/* 4. SIMULATION + CUSTOMER IMPACT — white */}
    <section style={{padding:"160px 24px",background:"#fff"}}><div style={{maxWidth:1200,margin:"0 auto"}}>
      <Reveal><SH title="FlowPay 도입 시 매출 변화 시나리오" subtitle="자금 부족으로 멈춘 매출, FlowPay로 연결하면 이렇게 달라져요."/></Reveal>

      <Reveal>
        <p style={{fontSize:15,color:"var(--tm)",marginBottom:24,marginTop:72}}>기준: 초기 투자자금 1억원 · 상품 순이익률 10% · 매출채권 만기 90일</p>

        {/* Simulation table */}
        <div style={{background:"linear-gradient(135deg,var(--ny),#1a2f50)",borderRadius:16,padding:"48px",color:"#fff",marginBottom:64}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",borderRadius:12,overflow:"hidden",border:"1px solid rgba(255,255,255,.1)"}}>
            <div style={{padding:"32px 28px",background:"rgba(0,0,0,.2)"}}>
              <div style={{fontSize:12,color:"rgba(255,255,255,.4)",fontWeight:700,letterSpacing:".1em",marginBottom:28}}>BEFORE</div>
              {[{l:"연간 거래",v:"4회"},{l:"매출액",v:"5.64억"},{l:"순이익",v:"0.56억"}].map(it=>(
                <div key={it.l} style={{marginBottom:24}}>
                  <div style={{fontSize:15,color:"rgba(255,255,255,.4)",marginBottom:6}}>{it.l}</div>
                  <div style={{fontFamily:"var(--fd)",fontWeight:700,fontSize:"clamp(24px,2.8vw,32px)",color:"rgba(255,255,255,.5)",lineHeight:1}}>{it.v}</div>
                </div>
              ))}
            </div>
            <div style={{padding:"32px 28px",background:"rgba(255,255,255,.07)",borderLeft:"1px solid rgba(255,255,255,.08)",borderRight:"1px solid rgba(255,255,255,.08)"}}>
              <div style={{fontSize:12,color:"var(--bw)",fontWeight:700,letterSpacing:".1em",marginBottom:28}}>AFTER</div>
              {[{l:"연간 거래",v:"12회"},{l:"매출액",v:"20.2억"},{l:"순이익",v:"2억"}].map(it=>(
                <div key={it.l} style={{marginBottom:24}}>
                  <div style={{fontSize:15,color:"rgba(255,255,255,.5)",marginBottom:6}}>{it.l}</div>
                  <div style={{fontFamily:"var(--fd)",fontWeight:800,fontSize:"clamp(24px,2.8vw,32px)",color:"#fff",lineHeight:1}}>{it.v}</div>
                </div>
              ))}
            </div>
            <div style={{padding:"32px 28px",background:"rgba(168,149,134,.14)",display:"flex",flexDirection:"column",justifyContent:"center",gap:28}}>
              <div style={{fontSize:12,color:"var(--bw)",fontWeight:700,letterSpacing:".1em",marginBottom:4}}>EFFECT</div>
              {[{l:"매출액",v:"358%"},{l:"순이익",v:"179%"}].map(it=>(
                <div key={it.l}>
                  <div style={{fontSize:15,color:"rgba(255,255,255,.5)",marginBottom:6}}>{it.l}</div>
                  <div style={{fontFamily:"var(--fd)",fontWeight:900,fontSize:"clamp(36px,4vw,52px)",color:"var(--bw)",lineHeight:.95,letterSpacing:"-.02em"}}>{it.v}</div>
                  <div style={{fontFamily:"var(--fd)",fontWeight:700,fontSize:22,color:"var(--bw)",lineHeight:1,marginTop:2}}>↑</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Reveal>

      <div style={{height:80}}/>

      {/* Customer Impact */}
      <Reveal>
        <div style={{marginBottom:48,marginTop:72}}>
          <div style={{textAlign:"center",marginBottom:40}}>
            <div style={{fontFamily:"var(--fd)",fontWeight:700,fontSize:"clamp(26px,2.5vw,34px)",color:"var(--td)",marginBottom:12}}>도입 기업 평균 성과</div>
            <p style={{fontSize:19,color:"#333",lineHeight:1.7}}>실제 FlowPay를 도입한 기업들의 평균 성과 데이터예요.</p>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:24}}>
            {[
              {v:"157%",l:"평균 매출 성장 효과"},
              {v:"2개월",l:"평균 투자금 회수 기간"},
              {v:"3배",l:"평균 연간 거래 횟수 증가"},
            ].map((s,i)=>(
              <div key={i} style={{textAlign:"center",padding:"32px 20px",background:"var(--alt)",borderRadius:12}}>
                <div style={{fontFamily:"var(--fd)",fontWeight:800,fontSize:"clamp(36px,3vw,48px)",color:"var(--ny)",lineHeight:1.1,whiteSpace:"nowrap"}}>{s.v}</div>
                <div style={{fontSize:18,color:"#555",marginTop:8,fontWeight:500}}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal>
        <div style={{textAlign:"center"}}>
          <a href="https://flowpay.kr" target="_blank" rel="noopener noreferrer" className="bp" style={{padding:"14px 32px",fontSize:20,textDecoration:"none",display:"inline-block"}}>
            우리 회사 기준으로 계산해보기 →
          </a>
        </div>
      </Reveal>
    </div></section>

    {/* 5. SERVICE FLOW — alt */}
    <section style={{padding:"160px 24px",background:"var(--alt)"}}><div style={{maxWidth:800,margin:"0 auto"}}>
      <Reveal><SH title="3단계로 끝나는 서비스 플로우" subtitle="신청부터 조달까지, 딱 3단계예요."/></Reveal>
      <div style={{display:"flex",flexDirection:"column",gap:12,marginTop:72,marginBottom:24}}>
        {[
          {n:"1",t:"신청",d:"필요한 원자재와 수량 알려주세요"},
          {n:"2",t:"심사",d:"1영업일 내 AI 심사 완료"},
          {n:"3",t:"조달",d:"원자재 먼저 받고, 대금은 나중에"},
        ].map((s,i)=>(
          <Reveal key={i} delay={i*.08}>
            <div className="fstep fstep-static">
              <div className="fnum fnum-navy">{s.n}</div>
              <div>
                <div style={{fontFamily:"var(--fd)",fontWeight:600,fontSize:19}}>{s.t}</div>
                <div style={{fontSize:17,color:"#555",marginTop:2}}>{s.d}</div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <div style={{textAlign:"center",marginBottom:showDetail?16:0}}>
          <button
            onClick={()=>setShowDetail(!showDetail)}
            style={{
              display:"inline-flex",alignItems:"center",gap:8,background:"none",
              border:"1px solid var(--bd)",borderRadius:8,padding:"10px 20px",
              fontSize:16,color:"var(--tm)",cursor:"pointer",fontFamily:"var(--fd)",
              transition:"all .2s"
            }}
          >
            상세 프로세스 보기 {showDetail ? <ChevronUp size={16}/> : <ChevronDown size={16}/>}
          </button>
        </div>
        {showDetail && (
          <div style={{display:"flex",flexDirection:"column",gap:8,marginTop:12}}>
            {[
              {n:"1",t:"고객사 발주 신청",d:"원자재·상품 발주 요청 접수"},
              {n:"2",t:"FlowScore AI 심사",d:"매출채권·거래 리스크 AI 정밀 평가"},
              {n:"3",t:"276홀딩스 선결제",d:"조달처에 즉시 현금 구매"},
              {n:"4",t:"원자재 선공급",d:"고객사 생산·납품 정상 진행"},
              {n:"5",t:"대금 회수(정산)",d:"납품 완료 후 정산 주기에 맞춰 회수"},
            ].map((s,i)=>(
              <div key={i} className="fstep fstep-static" style={{opacity:.8,background:"#fff",border:"none"}}>
                <div className="fnum" style={{width:32,height:32,fontSize:14,background:"rgba(15,25,41,0.08)",color:"var(--ny)"}}>{s.n}</div>
                <div>
                  <div style={{fontFamily:"var(--fd)",fontWeight:600,fontSize:16}}>{s.t}</div>
                  <div style={{fontSize:15,color:"#555",marginTop:2}}>{s.d}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Reveal>
    </div></section>

    {/* 6. TRACK RECORD — white */}
    <section style={{padding:"160px 24px",background:"#fff"}}><div style={{maxWidth:1200,margin:"0 auto"}}>
      <Reveal><SH title="숫자가 말하는 FLOW PAY" subtitle="2022.09 ~ 2025.11 실제 거래 데이터 기준"/></Reveal>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:24,marginTop:72}}>
        <Reveal><Stat value={195} suffix="억원" label="총 공급대금"/></Reveal>
        <Reveal delay={.1}><Stat value={44} suffix="일" label="평균 결제 주기"/></Reveal>
        <Reveal delay={.2}><Stat value={4} suffix=".5%" label="평균 거래 수수료"/></Reveal>
        <Reveal delay={.3}><Stat value={65} suffix="%+" label="재구매 고객 비중"/></Reveal>
        <Reveal delay={.4}><Stat value={157} suffix="%" label="매출 성장 효과"/></Reveal>
      </div>
    </div></section>

    {/* 7. PARTNERS — alt */}
    <section style={{padding:"160px 24px",background:"var(--alt)"}}><div style={{maxWidth:1200,margin:"0 auto"}}>
      <Reveal><div style={{textAlign:"center",marginBottom:48}}>
        <h3 style={{fontFamily:"var(--fd)",fontWeight:700,fontSize:"clamp(30px,4vw,42px)",color:"var(--td)",marginBottom:16,letterSpacing:"-.02em"}}>함께하는 파트너사</h3>
        <p style={{fontSize:19,color:"var(--tm)"}}>국내 주요 대기업 및 글로벌 기관과 함께해요.</p>
      </div></Reveal>
      <LogoMarquee/>
    </div></section>

    {/* 8. CTA — dark */}
    <section style={{padding:"120px 24px",background:"linear-gradient(135deg,var(--ny),#132240)",textAlign:"center",color:"#fff"}}>
      <Reveal><div style={{maxWidth:540,margin:"0 auto"}}>
        <h2 style={{fontFamily:"var(--fd)",fontWeight:700,fontSize:"clamp(32px,4vw,44px)",marginBottom:16,letterSpacing:"-.02em",whiteSpace:"nowrap"}}>원자재 조달 방식, 지금 바꿔보세요.</h2>
        <p style={{fontSize:21,color:"rgba(255,255,255,.55)",marginBottom:40,lineHeight:1.7}}>1영업일 내 검토, 부담 없이 문의해보세요.</p>
        <div style={{display:"flex",gap:16,justifyContent:"center",flexWrap:"wrap"}}>
          <a href="https://flowpay.kr" target="_blank" rel="noopener noreferrer" className="bp" style={{padding:"16px 36px",fontSize:20,textDecoration:"none",display:"inline-block"}}>FLOW PAY 신청하기 →</a>
          <a href="/contact" className="bs" style={{padding:"16px 36px",fontSize:20,textDecoration:"none",display:"inline-block"}}>먼저 문의하기</a>
        </div>
      </div></Reveal>
    </section>
  </>;
}

export default function FlowPayPage() {
  return <FP setPage={navigateTo} />;
}
