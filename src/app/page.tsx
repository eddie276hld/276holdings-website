"use client";
import { navigateTo } from "@/lib/navigation";

import { useState, useEffect, useRef, Fragment } from "react";
import { FileText, Brain, Wallet, Clock, ShieldOff, BarChart3, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SH } from "@/components/ui/SectionHeader";
import { Stat } from "@/components/ui/Stat";
import { LI } from "@/components/ui/LucideIcon";
import HeroVisual from "@/components/home/HeroCanvas";
import { usePress } from "@/hooks/usePress";
import { useAwards } from "@/hooks/useAwards";

// === Stats canvas — 별도 컴포넌트로 분리 (Hook Rules 준수) ===
function StatsCanvas() {
  const cvRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = cvRef.current; if (!c) return;
    const dpr = window.devicePixelRatio || 1;
    const W = 1400, H = 420;
    c.width = W * dpr; c.height = H * dpr;
    c.style.width = W + "px"; c.style.height = H + "px";
    const ctx = c.getContext("2d"); if (!ctx) return;
    ctx.scale(dpr, dpr);
    const cx = W / 2, cy = H + 20;
    const count = 120;
    const rays = Array.from({ length: count }, (_, i) => ({
      angle: Math.PI + (Math.PI * (i / (count - 1))),
      baseLen: 80 + Math.random() * 280,
      speed: .3 + Math.random() * .7,
      phase: Math.random() * Math.PI * 2,
      nodeR: 1.8 + Math.random() * 2.5,
      ci: i,
    }));
    let t = 0, raf = 0;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      t += .003;
      rays.forEach(r => {
        const breath = Math.sin(t * r.speed * 3 + r.phase);
        const len = r.baseLen + breath * 30;
        const tipX = cx + Math.cos(r.angle) * len;
        const tipY = cy + Math.sin(r.angle) * len;
        const progress = r.ci / count;
        const cr = Math.round(168 - progress * 40);
        const cg = Math.round(149 - progress * 30 + Math.sin(progress * Math.PI) * 25);
        const cb = Math.round(134 + progress * 50);
        const lineAlpha = .12 + breath * .04;
        ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(tipX, tipY);
        ctx.strokeStyle = `rgba(${cr},${cg},${cb},${lineAlpha})`; ctx.lineWidth = .8; ctx.stroke();
        const nodeAlpha = .3 + breath * .15;
        const glow = ctx.createRadialGradient(tipX, tipY, 0, tipX, tipY, r.nodeR * 3);
        glow.addColorStop(0, `rgba(${cr},${cg},${cb},${nodeAlpha * .5})`);
        glow.addColorStop(1, `rgba(${cr},${cg},${cb},0)`);
        ctx.fillStyle = glow;
        ctx.fillRect(tipX - r.nodeR * 3, tipY - r.nodeR * 3, r.nodeR * 6, r.nodeR * 6);
        ctx.beginPath(); ctx.arc(tipX, tipY, r.nodeR * (.8 + breath * .2), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${cr},${cg},${cb},${nodeAlpha})`; ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, []);
  return <canvas ref={cvRef} style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", pointerEvents: "none" }}/>;
}

// === HOME PAGE ===
function Home({ setPage }: { setPage: (id: string) => void }) {
  // ✅ 모든 Hook을 컴포넌트 최상단에서 호출
  const { awards } = useAwards();
  const { press } = usePress();
  const [pressIdx, setPressIdx] = useState(0);
  const pressMaxIdx = Math.max(0, press.length - 3);

  return <>
    <section className="hero-bg hero-section" style={{ display: "flex", flexDirection: "column", justifyContent: "center", position: "relative" }}>
      <HeroVisual/>
      <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%", position: "relative", zIndex: 2 }}>
        <div style={{ display: "flex", gap: 12, marginBottom: 32, flexWrap: "wrap", animation: "fadeUp .8s ease" }}>
          {["🏆 과기부 장관상 2024","🏆 중기부 장관상 2년 연속"].map(b=><span key={b} style={{ background:"rgba(255,255,255,.06)",border:"1px solid rgba(255,255,255,.1)",borderRadius:999,padding:"6px 16px",fontSize:13,color:"rgba(255,255,255,.7)",fontWeight:500,backdropFilter:"blur(8px)" }}>{b}</span>)}
        </div>
        <h1 style={{ fontFamily:"var(--fd)",fontSize:"clamp(36px,6vw,64px)",fontWeight:800,color:"#fff",lineHeight:1.1,letterSpacing:"-.03em",maxWidth:620,marginBottom:24,animation:"fadeUp .8s ease .1s both" }}>
          중소기업의<br/>자금 흐름을<br/><span style={{ background:"linear-gradient(135deg,var(--bw),var(--bl))",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent" }}>더 빠르고 유연하게</span>
        </h1>
        <p style={{ fontSize:"clamp(16px,2vw,20px)",color:"rgba(255,255,255,.55)",maxWidth:520,lineHeight:1.7,marginBottom:40,animation:"fadeUp .8s ease .2s both" }}>
          매출채권 유동화, 구매대금 선결제, AI 신용평가로<br/>기업의 성장 타이밍을 놓치지 않게 합니다.
        </p>
        <div style={{ display:"flex",gap:16,flexWrap:"wrap",animation:"fadeUp .8s ease .3s both" }}>
          <button className="bp" onClick={()=>setPage("flowpay")} style={{padding:"14px 32px",fontSize:16}}>서비스 알아보기 →</button>
          <button className="bs" onClick={()=>setPage("contact")} style={{padding:"14px 32px",fontSize:16}}>문의하기</button>
        </div>
      </div>
      <div style={{ position:"absolute",bottom:0,left:0,right:0,height:1,background:"rgba(255,255,255,0.08)" }}/>
    </section>

    {/* Problem */}
    <section style={{ padding: "96px 24px", background: "#fff" }}><div style={{ maxWidth: 1200, margin: "0 auto" }}>
      <Reveal><SH label="MARKET PROBLEM" title="성장하는 기업이 자금 때문에 멈추지 않도록" subtitle="연간 5,000조원 매출채권 시장의 99%가 금융 사각지대입니다. 276홀딩스가 이 공백을 채웁니다"/></Reveal>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24, marginTop: 48 }}>
        {[{Ic:Clock,t:"30~120일 정산 시차",d:"납품은 했는데 돈은 한참 뒤에. 그 사이 원자재 매입은 현금으로 해야 합니다."},{Ic:ShieldOff,t:"담보 중심 평가 한계",d:"성장하고 있어도 담보 없으면 대출 불가. 기존 금융의 구조적 한계입니다."},{Ic:BarChart3,t:"공급망 데이터 불투명",d:"은행은 기업 밖에서만 바라봅니다. 실물 거래 흐름을 볼 수 없습니다."}].map((it,i)=>
          <Reveal key={i} delay={i*.1}><div style={{background:"var(--alt)",border:"1px solid var(--bd)",borderRadius:12,padding:32}}>
            <div style={{marginBottom:16}}><LI icon={it.Ic} color="var(--br)"/></div>
            <h3 style={{fontFamily:"var(--fd)",fontWeight:600,fontSize:20,marginBottom:12,color:"var(--td)"}}>{it.t}</h3>
            <p style={{fontSize:15,color:"var(--tm)",lineHeight:1.7}}>{it.d}</p>
          </div></Reveal>)}
      </div>
    </div></section>

    {/* FLOW Ecosystem */}
    <section style={{ padding: "96px 24px", background: "var(--nd)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <Reveal><SH label="FLOW ECOSYSTEM" title="자금 흐름의 모든 단계를 커버합니다." subtitle="데이터 축적부터 신용평가, 자금 집행까지 — 하나의 흐름으로 연결되는 금융 솔루션" light/></Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
          {[{id:"flowpoint",s:"01",Ic:FileText,nm:"FLOW POINT",rl:"Data Input",ds:"매출채권 전자화 및 정산 데이터 축적. 종이 계약서를 디지털 자산으로 전환하여 공급망 가시성 확보",cl:"var(--br)"},{id:"flowscore",s:"02",Ic:Brain,nm:"FLOW SCORE",rl:"Processing",ds:"491개 변수, 5-Dimension AI 분석으로 거래 단위의 리스크를 실시간 평가. '지금 이 거래, 안전한가?'",cl:"var(--bw)"},{id:"flowpay",s:"03",Ic:Wallet,nm:"FLOW PAY",rl:"Profit Out",ds:"구매대행 기반 선지급 솔루션. 원자재는 지금 조달하고, 대금은 나중에 정산. 부채 없는 공급망 금융",cl:"#e8c99a"}].map((it,i)=>
            <Reveal key={it.id} delay={i*.15}>
              <div style={{background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.08)",borderRadius:12,padding:36,cursor:"pointer",height:"100%",transition:"all .3s",position:"relative",overflow:"hidden"}}
                onClick={()=>setPage(it.id)}
                onMouseEnter={e=>{e.currentTarget.style.background="rgba(255,255,255,.08)";e.currentTarget.style.borderColor="rgba(255,255,255,.16)"}}
                onMouseLeave={e=>{e.currentTarget.style.background="rgba(255,255,255,.04)";e.currentTarget.style.borderColor="rgba(255,255,255,.08)"}}>
                <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:20}}>
                  <span style={{fontFamily:"var(--fm)",fontSize:12,color:it.cl,fontWeight:500,background:`rgba(255,255,255,.06)`,padding:"4px 10px",borderRadius:6}}>STEP {it.s}</span>
                  <span style={{fontSize:11,color:"rgba(255,255,255,.35)",fontFamily:"var(--fm)"}}>{it.rl}</span>
                </div>
                <div style={{marginBottom:12}}><LI icon={it.Ic} color={it.cl}/></div>
                <h3 style={{fontFamily:"var(--fd)",fontWeight:700,fontSize:24,marginBottom:12,color:"#fff"}}>{it.nm}</h3>
                <p style={{fontSize:15,color:"rgba(255,255,255,.55)",lineHeight:1.7}}>{it.ds}</p>
                <div style={{marginTop:20,fontSize:14,fontWeight:600,color:it.cl}}>자세히 보기 →</div>
              </div>
            </Reveal>)}
        </div>
        <Reveal delay={.3}>
          <div style={{margin:"56px 0 0",padding:"40px 48px",background:"rgba(255,255,255,.04)",borderRadius:16,border:"1px solid rgba(255,255,255,.1)"}}>
            <div style={{fontSize:12,fontFamily:"var(--fd)",color:"rgba(255,255,255,.35)",textAlign:"center",letterSpacing:".1em",marginBottom:28}}>서비스 흐름</div>
            <div className="flow-row">
              {[
                {nm:"FLOW POINT",rl:"Data Input",cl:"var(--br)",desc:"매출채권 전자화"},
                {nm:"FLOW SCORE",rl:"Processing",cl:"var(--bw)",desc:"AI 리스크 평가"},
                {nm:"FLOW PAY",rl:"Profit Out",cl:"#c4b0a0",desc:"구매대행 선지급"},
              ].map((s,i)=><Fragment key={s.nm}>
                <div style={{textAlign:"center",padding:"0 32px"}}>
                  <div style={{fontSize:11,fontFamily:"var(--fm)",color:s.cl,letterSpacing:".08em",marginBottom:6}}>{s.rl}</div>
                  <div style={{fontFamily:"var(--fd)",fontWeight:800,fontSize:28,color:"#fff",letterSpacing:"-.02em"}}>{s.nm}</div>
                  <div style={{fontSize:13,color:"rgba(255,255,255,.4)",marginTop:6}}>{s.desc}</div>
                </div>
                {i < 2 && <>
                  <div className="flow-arr-r"><div style={{fontSize:22,color:"rgba(255,255,255,.35)"}}>▶</div></div>
                  <div className="flow-arr-d"><div style={{fontSize:20,color:"rgba(255,255,255,.35)"}}>▼</div></div>
                </>}
              </Fragment>)}
            </div>
            <div style={{textAlign:"center",marginTop:28,paddingTop:24,borderTop:"1px solid rgba(255,255,255,.08)",fontSize:13,color:"rgba(255,255,255,.35)",lineHeight:1.7}}>
              거래가 발생할수록 데이터가 정교해지고, 더 많은 거래를 불러오는 <span style={{color:"rgba(255,255,255,.6)",fontWeight:500}}>성장 선순환</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>

    {/* Stats */}
    <section style={{ padding: "96px 24px 240px", background: "var(--alt)", position: "relative", overflow: "hidden" }}>
      <StatsCanvas/>
      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <Reveal><SH label="PROVEN RESULTS" title="숫자로 증명하는 성과" subtitle="가설이 아닌, 시장에서 증명된 결과입니다"/></Reveal>
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
      <section style={{ padding: "96px 24px", background: "#fff" }}><div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <Reveal><SH label="AWARDS & RECOGNITION" title="공신력 있는 기관이 인정한 성과" subtitle="정부 기관과 글로벌 심사위원단이 검증한 기술력과 사업 실적"/></Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
          {[...awards].sort((a,b)=>b.y.localeCompare(a.y)).map((a,i)=>
            <Reveal key={a.id} delay={i*.08}><div style={{padding:24,border:"1px solid var(--bd)",borderRadius:12,display:"flex",gap:16,alignItems:"flex-start"}}>
              <div style={{background:"linear-gradient(135deg,var(--bw),var(--br))",color:"#fff",padding:"4px 10px",borderRadius:6,fontFamily:"var(--fm)",fontSize:12,fontWeight:600,flexShrink:0}}>{a.y}</div>
              <div><div style={{fontFamily:"var(--fd)",fontWeight:600,fontSize:15,marginBottom:4}}>{a.t}</div><div style={{fontSize:13,color:"var(--tm)"}}>{a.o}</div></div>
            </div></Reveal>)}
        </div>
      </div></section>
    )}

    {/* PRESS COVERAGE */}
    {press.length > 0 && (
      <section style={{ padding: "96px 24px", background: "#f8fafc", overflow: "hidden", borderTop: "1px solid #e2e8f0", borderBottom: "1px solid #e2e8f0" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Reveal><SH label="PRESS COVERAGE" title="언론이 주목하는 276홀딩스"/></Reveal>
          <div style={{ position: "relative" }}>
            {press.length > 3 && <>
              <button onClick={() => setPressIdx(Math.max(0, pressIdx - 1))} disabled={pressIdx === 0}
                style={{ position: "absolute", left: -20, top: "50%", transform: "translateY(-50%)", zIndex: 3, width: 40, height: 40, borderRadius: "50%", border: "1px solid var(--bd)", background: "#fff", cursor: pressIdx === 0 ? "default" : "pointer", opacity: pressIdx === 0 ? .3 : 1, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 8px rgba(0,0,0,.08)", transition: "opacity .2s" }}>
                <ChevronLeft size={18} color="var(--td)"/>
              </button>
              <button onClick={() => setPressIdx(Math.min(pressMaxIdx, pressIdx + 1))} disabled={pressIdx >= pressMaxIdx}
                style={{ position: "absolute", right: -20, top: "50%", transform: "translateY(-50%)", zIndex: 3, width: 40, height: 40, borderRadius: "50%", border: "1px solid var(--bd)", background: "#fff", cursor: pressIdx >= pressMaxIdx ? "default" : "pointer", opacity: pressIdx >= pressMaxIdx ? .3 : 1, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 8px rgba(0,0,0,.08)", transition: "opacity .2s" }}>
                <ChevronRight size={18} color="var(--td)"/>
              </button>
            </>}
            <div style={{ overflow: "hidden" }}>
              <div style={{ display: "flex", gap: 20, transition: "transform .4s cubic-bezier(.4,0,.2,1)", transform: `translateX(-${pressIdx * (100 / 3 + 20 / 3 * 100 / 1100)}%)` }}>
                {[...press].sort((a,b)=>b.date.localeCompare(a.date)).map((p) => (
                  <a key={p.id} href={p.url} target="_blank" rel="noopener noreferrer"
                    style={{ minWidth: "calc((100% - 40px) / 3)", flex: "0 0 calc((100% - 40px) / 3)", borderRadius: 12, border: "1px solid var(--bd)", overflow: "hidden", textDecoration: "none", color: "inherit", transition: "box-shadow .3s, transform .3s", cursor: "pointer" }}
                    onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,.08)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
                    onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "none"; }}>
                    <div style={{ height: 160, background: p.image ? `url(${p.image}) center/cover` : "linear-gradient(135deg, var(--alt), #e2e8f0)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {!p.image && <FileText size={32} strokeWidth={1} color="#94a3b8"/>}
                    </div>
                    <div style={{ padding: "16px 18px" }}>
                      <div style={{ fontSize: 11, fontWeight: 700, color: "var(--br)", marginBottom: 8 }}>{p.media}</div>
                      <div style={{ fontSize: 15, fontWeight: 700, color: "var(--td)", lineHeight: 1.4, marginBottom: 10, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{p.title}</div>
                      <p style={{ fontSize: 13, color: "var(--tm)", lineHeight: 1.6, marginBottom: 12, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{p.excerpt}</p>
                      <div style={{ fontSize: 11, color: "#94a3b8", fontFamily: "var(--fm)" }}>{p.date}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    )}

    {/* CTA */}
    <section style={{ padding: "96px 24px", background: "linear-gradient(135deg,var(--ny),#132240)", textAlign: "center", color: "#fff" }}>
      <Reveal><div style={{ maxWidth: 600, margin: "0 auto" }}>
        <h2 style={{ fontFamily:"var(--fd)",fontWeight:700,fontSize:"clamp(28px,4vw,40px)",marginBottom:16,letterSpacing:"-.02em" }}>중소기업 자금 흐름의 새로운 기준</h2>
        <p style={{ fontSize:17,color:"rgba(255,255,255,.55)",marginBottom:40,lineHeight:1.7 }}>276홀딩스의 솔루션이 귀사의 자금 흐름을 어떻게 바꿀 수 있는지 직접 확인해 보세요</p>
        <div style={{ display:"flex",gap:16,justifyContent:"center",flexWrap:"wrap" }}>
          <button className="bp" onClick={()=>setPage("contact")} style={{padding:"16px 36px",fontSize:16}}>상담 문의하기</button>
          <button className="bs" onClick={()=>setPage("about")} style={{padding:"16px 36px",fontSize:16}}>회사 소개 보기</button>
        </div>
      </div></Reveal>
    </section>
  </>;
}

export default function HomePage() {
  return <Home setPage={navigateTo} />;
}
