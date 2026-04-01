"use client";
import { navigateTo } from "@/lib/navigation";

import { useState, useEffect, useRef } from "react";
import { FileText, Brain, Wallet, Clock, ShieldOff, BarChart3, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SH } from "@/components/ui/SectionHeader";
import { Stat } from "@/components/ui/Stat";
import { LI } from "@/components/ui/LucideIcon";
import LogoMarquee from "@/components/home/LogoMarquee";
import HeroVisual from "@/components/home/HeroCanvas";
import NoticePopup from "@/components/home/NoticePopup";
import { usePress } from "@/hooks/usePress";

// === HOME PAGE ===
function Home({ setPage }: { setPage: (id: string) => void }) {
  return <>
    <NoticePopup setPage={setPage}/>
    <section className="hero-bg" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "120px 24px 80px", position: "relative" }}>
      <HeroVisual/>
      <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%", position: "relative", zIndex: 2 }}>
        <div style={{ display: "flex", gap: 12, marginBottom: 32, flexWrap: "wrap", animation: "fadeUp .8s ease" }}>
          {["🏆 과기부 장관상 2024","🏆 중기부 장관상 2년 연속"].map(b=><span key={b} style={{ background:"rgba(255,255,255,.06)",border:"1px solid rgba(255,255,255,.1)",borderRadius:999,padding:"6px 16px",fontSize:13,color:"rgba(255,255,255,.7)",fontWeight:500,backdropFilter:"blur(8px)" }}>{b}</span>)}
        </div>
        <h1 style={{ fontFamily:"var(--fd)",fontSize:"clamp(36px,6vw,64px)",fontWeight:800,color:"#fff",lineHeight:1.1,letterSpacing:"-.03em",maxWidth:620,marginBottom:24,animation:"fadeUp .8s ease .1s both" }}>
          중소기업의<br/>자금 흐름을<br/><span style={{ background:"linear-gradient(135deg,var(--bw),var(--bl))",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent" }}>더 빠르고 유연하게.</span>
        </h1>
        <p style={{ fontSize:"clamp(16px,2vw,20px)",color:"rgba(255,255,255,.55)",maxWidth:520,lineHeight:1.7,marginBottom:40,animation:"fadeUp .8s ease .2s both" }}>
          매출채권 유동화, 구매대금 선결제, AI 신용평가로<br/>기업의 성장 타이밍을 놓치지 않게 합니다.
        </p>
        <div style={{ display:"flex",gap:16,flexWrap:"wrap",animation:"fadeUp .8s ease .3s both" }}>
          <button className="bp" onClick={()=>setPage("flowpay")} style={{padding:"14px 32px",fontSize:16}}>서비스 알아보기 →</button>
          <button className="bs" onClick={()=>setPage("contact")} style={{padding:"14px 32px",fontSize:16}}>문의하기</button>
        </div>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(140px, 1fr))",gap:1,marginTop:80,background:"rgba(255,255,255,.04)",borderRadius:12,overflow:"hidden",maxWidth:700,animation:"fadeUp .8s ease .5s both" }}>
          {[{n:"6,890억+",l:"누적 중개액"},{n:"1,100+",l:"파트너사"},{n:"230%",l:"매출 성장률"},{n:"0.22%",l:"부도율"}].map((s,i)=><div key={i} style={{padding:"24px 20px",textAlign:"center",background:"rgba(255,255,255,.02)"}}><div style={{fontFamily:"var(--fd)",fontWeight:700,fontSize:22,color:"#fff"}}>{s.n}</div><div style={{fontSize:13,color:"rgba(255,255,255,.4)",marginTop:4}}>{s.l}</div></div>)}
        </div>
      </div>
      <div style={{ position:"absolute",bottom:0,left:0,right:0,height:1,background:"rgba(255,255,255,0.08)" }}/>
    </section>

    {/* FLOW Ecosystem */}
    <section style={{ padding: "96px 24px", background: "#fff" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <Reveal><SH label="FLOW ECOSYSTEM" title="자금 흐름의 모든 단계를 커버합니다." subtitle="데이터 축적부터 신용평가, 자금 집행까지 — 하나의 흐름으로 연결되는 금융 솔루션"/></Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
          {[{id:"flowpoint",s:"01",Ic:FileText,nm:"FlowPoint",rl:"Data Input",ds:"매출채권 전자화 및 정산 데이터 축적. 종이 계약서를 디지털 자산으로 전환하여 공급망 가시성 확보",cl:"var(--br)"},{id:"flowscore",s:"02",Ic:Brain,nm:"FlowScore",rl:"Processing",ds:"491개 변수, 5-Dimension AI 분석으로 거래 단위의 리스크를 실시간 평가. '지금 이 거래, 안전한가?'",cl:"var(--bw)"},{id:"flowpay",s:"03",Ic:Wallet,nm:"FlowPay",rl:"Profit Out",ds:"구매대행 기반 선지급 솔루션. 원자재는 지금 조달하고, 대금은 나중에 정산. 부채 없는 공급망 금융",cl:"var(--ny)"}].map((it,i)=>
            <Reveal key={it.id} delay={i*.15}><div className="bcard" style={{cursor:"pointer",height:"100%"}} onClick={()=>setPage(it.id)}>
              <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:20}}><span style={{fontFamily:"var(--fm)",fontSize:12,color:it.cl,fontWeight:500,background:`${it.cl}10`,padding:"4px 10px",borderRadius:6}}>STEP {it.s}</span><span style={{fontSize:11,color:"var(--tl)",fontFamily:"var(--fm)"}}>{it.rl}</span></div>
              <div style={{marginBottom:12}}><LI icon={it.Ic} color={it.cl}/></div>
              <h3 style={{fontFamily:"var(--fd)",fontWeight:700,fontSize:24,marginBottom:12,color:"var(--td)"}}>{it.nm}</h3>
              <p style={{fontSize:15,color:"var(--tm)",lineHeight:1.7}}>{it.ds}</p>
              <div style={{marginTop:20,fontSize:14,fontWeight:600,color:it.cl}}>자세히 보기 →</div>
            </div></Reveal>)}
        </div>
        <Reveal delay={.3}><div style={{textAlign:"center",margin:"48px 0 0",padding:24,background:"var(--alt)",borderRadius:12}}>
          <div style={{fontFamily:"var(--fm)",fontSize:14,color:"var(--tm)"}}><span style={{color:"var(--br)"}}>FlowPoint</span>{" → "}<span style={{color:"var(--bw)"}}>FlowScore</span>{" → "}<span style={{color:"var(--ny)"}}>FlowPay</span></div>
          <div style={{fontSize:13,color:"var(--tl)",marginTop:8}}>거래가 발생할수록 데이터가 정교해지고, 더 많은 거래를 불러오는 데이터 플라이휠</div>
        </div></Reveal>
      </div>
    </section>

    {/* Stats */}
    <section style={{ padding: "96px 24px 240px", background: "var(--alt)", position: "relative", overflow: "hidden" }}>
      {(() => {
        const cvRef = useRef(null);
        useEffect(() => {
          const c = cvRef.current; if (!c) return;
          const dpr = window.devicePixelRatio || 1;
          const W = 1400, H = 420;
          c.width = W * dpr; c.height = H * dpr;
          c.style.width = W + "px"; c.style.height = H + "px";
          const ctx = c.getContext("2d");
          ctx.scale(dpr, dpr);
          const cx = W / 2, cy = H + 20;
          const count = 120;
          const rays = Array.from({length: count}, (_, i) => {
            const angle = Math.PI + (Math.PI * (i / (count - 1)));
            const baseLen = 80 + Math.random() * 280;
            return {
              angle,
              baseLen,
              speed: .3 + Math.random() * .7,
              phase: Math.random() * Math.PI * 2,
              nodeR: 1.8 + Math.random() * 2.5,
              ci: i,
            };
          });
          let t = 0, raf;
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
              ctx.beginPath();
              ctx.moveTo(cx, cy);
              ctx.lineTo(tipX, tipY);
              ctx.strokeStyle = `rgba(${cr},${cg},${cb},${lineAlpha})`;
              ctx.lineWidth = .8;
              ctx.stroke();
              const nodeAlpha = .3 + breath * .15;
              const glow = ctx.createRadialGradient(tipX, tipY, 0, tipX, tipY, r.nodeR * 3);
              glow.addColorStop(0, `rgba(${cr},${cg},${cb},${nodeAlpha * .5})`);
              glow.addColorStop(1, `rgba(${cr},${cg},${cb},0)`);
              ctx.fillStyle = glow;
              ctx.fillRect(tipX - r.nodeR * 3, tipY - r.nodeR * 3, r.nodeR * 6, r.nodeR * 6);
              ctx.beginPath();
              ctx.arc(tipX, tipY, r.nodeR * (.8 + breath * .2), 0, Math.PI * 2);
              ctx.fillStyle = `rgba(${cr},${cg},${cb},${nodeAlpha})`;
              ctx.fill();
            });
            raf = requestAnimationFrame(draw);
          };
          draw();
          return () => cancelAnimationFrame(raf);
        }, []);
        return <canvas ref={cvRef} style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", pointerEvents: "none" }}/>;
      })()}
      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
      <Reveal><SH label="PROVEN RESULTS" title="숫자로 증명하는 성과." subtitle="가설이 아닌, 시장에서 증명된 결과입니다"/></Reveal>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 24 }}>
        <Reveal><Stat value={6890} suffix="억+" label="누적 매출채권 중개액"/></Reveal>
        <Reveal delay={.1}><Stat value={1100} suffix="+" label="누적 회원사"/></Reveal>
        <Reveal delay={.2}><Stat value={97} suffix="억" label="연 매출액 (2025)"/></Reveal>
        <Reveal delay={.3}><Stat value={37} suffix="억" label="글로벌 매출 (3개국)"/></Reveal>
      </div>
    </div></section>

    {/* Partners */}
    <section style={{ padding: "64px 24px", background: "#fff" }}><div style={{ maxWidth: 1200, margin: "0 auto" }}>
      <Reveal><div style={{ textAlign: "center", marginBottom: 32 }}><div className="slbl">TRUSTED BY 1,100+ PARTNERS</div><p style={{ fontSize: 15, color: "var(--tm)" }}>국내 주요 대기업 및 글로벌 기관과 함께합니다</p></div></Reveal>
      <LogoMarquee/>
    </div></section>

    {/* Problem */}
    <section style={{ padding: "96px 24px", background: "var(--nd)", color: "#fff" }}><div style={{ maxWidth: 1200, margin: "0 auto" }}>
      <Reveal><SH label="MARKET PROBLEM" title="성장하는 기업이 자금 때문에 멈추지 않도록." subtitle="연간 5,000조원 매출채권 시장의 99%가 금융 사각지대입니다. 276홀딩스가 이 공백을 채웁니다" light/></Reveal>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24, marginTop: 48 }}>
        {[{Ic:Clock,t:"30~120일 정산 시차",d:"납품은 했는데 돈은 한참 뒤에. 그 사이 원자재 매입은 현금으로 해야 합니다."},{Ic:ShieldOff,t:"담보 중심 평가 한계",d:"성장하고 있어도 담보 없으면 대출 불가. 기존 금융의 구조적 한계입니다."},{Ic:BarChart3,t:"공급망 데이터 불투명",d:"은행은 기업 밖에서만 바라봅니다. 실물 거래 흐름을 볼 수 없습니다."}].map((it,i)=>
          <Reveal key={i} delay={i*.1}><div style={{background:"rgba(255,255,255,.03)",border:"1px solid rgba(255,255,255,.06)",borderRadius:12,padding:32}}>
            <div style={{marginBottom:16}}><LI icon={it.Ic} color="#fff"/></div><h3 style={{fontFamily:"var(--fd)",fontWeight:600,fontSize:20,marginBottom:12}}>{it.t}</h3>
            <p style={{fontSize:15,color:"rgba(255,255,255,.5)",lineHeight:1.7}}>{it.d}</p>
          </div></Reveal>)}
      </div>
    </div></section>

    {/* Awards */}
    <section style={{ padding: "96px 24px", background: "#fff" }}><div style={{ maxWidth: 1200, margin: "0 auto" }}>
      <Reveal><SH label="AWARDS & RECOGNITION" title="공신력 있는 기관이 인정한 성과." subtitle="정부 기관과 글로벌 심사위원단이 검증한 기술력과 사업 실적"/></Reveal>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
        {[{y:"2024",t:"과기정통부 장관상",o:"K-Global 창업멘토링 우수멘티"},{y:"2025",t:"중소벤처기업부 장관상",o:"벤처창업진흥 유공 표창"},{y:"2025",t:"Most Innovative Wealth Mgmt",o:"GFM Review, UK"},{y:"2026",t:"중기부 장관상 (2년 연속)",o:"글로벌창업사관학교 최우수"},{y:"2026",t:"혁신IT 대상",o:"중앙일보"},{y:"2026",t:"서민금융대상",o:"서민금융진흥원장상"}].map((a,i)=>
          <Reveal key={i} delay={i*.08}><div style={{padding:24,border:"1px solid var(--bd)",borderRadius:12,display:"flex",gap:16,alignItems:"flex-start"}}>
            <div style={{background:"linear-gradient(135deg,var(--bw),var(--br))",color:"#fff",padding:"4px 10px",borderRadius:6,fontFamily:"var(--fm)",fontSize:12,fontWeight:600,flexShrink:0}}>{a.y}</div>
            <div><div style={{fontFamily:"var(--fd)",fontWeight:600,fontSize:15,marginBottom:4}}>{a.t}</div><div style={{fontSize:13,color:"var(--tm)"}}>{a.o}</div></div>
          </div></Reveal>)}
      </div>
    </div></section>

    {/* PRESS COVERAGE */}
    {(() => {
      const { press } = usePress();
      const [idx, setIdx] = useState(0);
      const maxIdx = Math.max(0, press.length - 3);
      if (press.length === 0) return null;
      return <section style={{ padding: "96px 24px", background: "#f8fafc", overflow: "hidden", borderTop: "1px solid #e2e8f0", borderBottom: "1px solid #e2e8f0" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Reveal><SH label="PRESS COVERAGE" title="언론이 주목하는 276홀딩스."/></Reveal>
          <div style={{ position: "relative" }}>
            {press.length > 3 && <>
              <button onClick={() => setIdx(Math.max(0, idx - 1))} disabled={idx === 0}
                style={{ position: "absolute", left: -20, top: "50%", transform: "translateY(-50%)", zIndex: 3, width: 40, height: 40, borderRadius: "50%", border: "1px solid var(--bd)", background: "#fff", cursor: idx === 0 ? "default" : "pointer", opacity: idx === 0 ? .3 : 1, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 8px rgba(0,0,0,.08)", transition: "opacity .2s" }}>
                <ChevronLeft size={18} color="var(--td)"/>
              </button>
              <button onClick={() => setIdx(Math.min(maxIdx, idx + 1))} disabled={idx >= maxIdx}
                style={{ position: "absolute", right: -20, top: "50%", transform: "translateY(-50%)", zIndex: 3, width: 40, height: 40, borderRadius: "50%", border: "1px solid var(--bd)", background: "#fff", cursor: idx >= maxIdx ? "default" : "pointer", opacity: idx >= maxIdx ? .3 : 1, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 8px rgba(0,0,0,.08)", transition: "opacity .2s" }}>
                <ChevronRight size={18} color="var(--td)"/>
              </button>
            </>}
            <div style={{ overflow: "hidden" }}>
              <div style={{ display: "flex", gap: 20, transition: "transform .4s cubic-bezier(.4,0,.2,1)", transform: `translateX(-${idx * (100 / 3 + 20 / 3 * 100 / 1100)}%)` }}>
                {press.map((p, i) => (
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
      </section>;
    })()}

    {/* CTA */}
    <section style={{ padding: "96px 24px", background: "linear-gradient(135deg,var(--ny),#132240)", textAlign: "center", color: "#fff" }}>
      <Reveal><div style={{ maxWidth: 600, margin: "0 auto" }}>
        <h2 style={{ fontFamily:"var(--fd)",fontWeight:700,fontSize:"clamp(28px,4vw,40px)",marginBottom:16,letterSpacing:"-.02em" }}>중소기업 자금 흐름의 새로운 기준.</h2>
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
