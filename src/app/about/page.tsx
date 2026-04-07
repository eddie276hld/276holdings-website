"use client";
import { navigateTo } from "@/lib/navigation";

import { useState, useEffect, useRef } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { SH } from "@/components/ui/SectionHeader";
import { Stat } from "@/components/ui/Stat";
import { PARTNER_LOGOS } from "@/data/logos";
import { useHistory } from "@/hooks/useHistory";
import { useMembers } from "@/hooks/useMembers";
import { usePartners } from "@/hooks/usePartners";
import { PARTNER_CATEGORIES } from "@/data/partners";

// === ABOUT PAGE ===
function Ab({ setPage }: { setPage: (id: string) => void }) {
  return <>
    <section className="hero-bg" style={{padding:"140px 24px 100px",position:"relative"}}>
      <div className="hero-orb" style={{width:400,height:400,background:"rgba(168,149,134,.06)",top:"5%",left:"50%",animation:"orb 10s ease infinite"}}/>
      <div style={{maxWidth:1200,margin:"0 auto",position:"relative",zIndex:2}}>
        <div className="slbl" style={{color:"var(--bw)"}}>ABOUT 276 HOLDINGS</div>
        <h1 style={{fontFamily:"var(--fd)",fontSize:"clamp(32px,5vw,52px)",fontWeight:800,color:"#fff",lineHeight:1.1,letterSpacing:"-.03em",maxWidth:700,marginBottom:24}}>기업의 가치를 발견해<br/><span style={{background:"linear-gradient(135deg,var(--bw),var(--bl))",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>금융 자산으로 만듭니다.</span></h1>
        <p style={{fontSize:18,color:"rgba(255,255,255,.55)",maxWidth:560,lineHeight:1.7}}>우리는 중소기업의 생산적 금융을 지원하는<br/>'Supply Chain Infra' 입니다.</p>
      </div>
      <div style={{ position:"absolute",bottom:0,left:0,right:0,height:1,background:"rgba(255,255,255,0.08)" }}/>
    </section>
    <section style={{padding:"96px 24px",background:"#fff"}}><div style={{maxWidth:900,margin:"0 auto"}}><Reveal>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:48}}>
        <div><div className="slbl">MISSION</div><h3 style={{fontFamily:"var(--fd)",fontWeight:700,fontSize:24,marginBottom:16,lineHeight:1.3}}>중소기업이 현금흐름 문제 없이 성장할 수 있는 금융 인프라를 만든다</h3><p style={{fontSize:15,color:"var(--tm)",lineHeight:1.7}}>연간 5,000조원 매출채권 시장의 99%는 공백입니다. 성장하는 기업이 자금 공백으로 탈락하지 않도록, 데이터와 기술로 금융의 빈틈을 채웁니다.</p></div>
        <div><div className="slbl">VISION</div><h3 style={{fontFamily:"var(--fd)",fontWeight:700,fontSize:24,marginBottom:16,lineHeight:1.3}}>국내와 글로벌 중소기업이 가장 신뢰하는 성장 파트너</h3><p style={{fontSize:15,color:"var(--tm)",lineHeight:1.7}}>좋은 기회는 기다려 주지 않습니다. 중소기업이 성장의 순간을 자금 문제로 놓치지 않도록, 항상 곁에 있는 파트너가 됩니다.</p></div>
      </div>
    </Reveal></div></section>
    <section style={{padding:"96px 24px",background:"var(--alt)"}}><div style={{maxWidth:1200,margin:"0 auto"}}>
      <Reveal><SH label="KEY METRICS" title="숫자로 증명합니다."/></Reveal>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:20}}>
        {[{v:6890,s:"억+",l:"누적 중개액"},{v:1100,s:"+",l:"회원사"},{v:97,s:"억",l:"연 매출 ('25)"},{v:37,s:"억",l:"글로벌 매출"},{v:230,s:"%",l:"매출 성장률"}].map((s,i)=><Reveal key={i} delay={i*.08}><Stat value={s.v} suffix={s.s} label={s.l}/></Reveal>)}
      </div>
    </div></section>
    <section style={{padding:"96px 24px",background:"#fff"}}><div style={{maxWidth:1000,margin:"0 auto"}}>
      <Reveal><SH label="MEMBER" title="이 팀이 만듭니다." subtitle="금융의 전문성, 비즈니스의 실행력, 기술 기반의 리스크 통제"/></Reveal>
      {(() => {
        const { members } = useMembers();
        const bgs = ["#0f1929","#132240","#1a2844","#1f3050","#243656","#2a3c5c"];
        return <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:24}}>
          {members.map((m,i) =>
            <Reveal key={m.id} delay={i*.1}><div className="card" style={{textAlign:"center",padding:"40px 24px"}}>
              {m.img
                ? <img src={m.img} alt={m.nm} style={{width:72,height:72,borderRadius:"50%",objectFit:"cover",margin:"0 auto 16px",display:"block"}}/>
                : <div style={{width:72,height:72,borderRadius:"50%",background:bgs[i%bgs.length],margin:"0 auto 16px",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"var(--fd)",fontWeight:700,fontSize:24,color:"#fff"}}>{m.nm[0]}</div>}
              <h3 style={{fontFamily:"var(--fd)",fontWeight:700,fontSize:18}}>{m.nm}</h3>
              <div style={{fontSize:13,color:"var(--br)",fontWeight:600,marginTop:4,fontFamily:"var(--fd)"}}>{m.rl}</div>
              <p style={{fontSize:14,color:"var(--tm)",marginTop:12,lineHeight:1.6}}>{m.d}</p>
            </div></Reveal>)}
        </div>;
      })()}
    </div></section>
    <section style={{padding:"96px 24px",background:"var(--alt)"}}><div style={{maxWidth:800,margin:"0 auto"}}>
      <Reveal><SH label="HISTORY" title="걸어온 길."/></Reveal>
      <div style={{display:"flex",flexDirection:"column",gap:16}}>
        {(() => {
          const { history: hist } = useHistory();
          const years = [...new Set(hist.map(h => h.y))].sort();
          return years.map((yr, yi) => {
            const items = hist.filter(h => h.y === yr);
            const tgColor = (tg: string) => ({ bg: tg==="투자"?"rgba(168,149,134,.1)":tg==="수상"?"rgba(16,185,129,.08)":tg==="현재"?"rgba(200,168,130,.12)":"var(--alt)", fg: tg==="투자"?"var(--br)":tg==="수상"?"var(--gn)":tg==="현재"?"var(--bw)":"var(--tm)" });
            return <Reveal key={yr} delay={yi * .08}>
              <div style={{display:"flex",gap:20,alignItems:"stretch",background:"#fff",borderRadius:12,border:"1px solid var(--bd)",overflow:"hidden"}}>
                <div style={{display:"flex",alignItems:"center",justifyContent:"center",minWidth:72,background:"var(--ny)",padding:"20px 0"}}>
                  <span style={{fontFamily:"var(--fd)",fontWeight:800,fontSize:22,color:"#fff",letterSpacing:"-.02em"}}>{yr}</span>
                </div>
                <div style={{flex:1,padding:"16px 20px 16px 0",display:"flex",flexDirection:"column",justifyContent:"center",gap:items.length > 1 ? 10 : 0}}>
                  {items.map((it, ii) => (
                    <div key={it.id} style={{display:"flex",alignItems:"center",gap:10,...(ii > 0 ? {borderTop:"1px solid var(--blt)",paddingTop:10} : {})}}>
                      <div style={{flex:1,fontSize:15,fontWeight:500,lineHeight:1.5}}>{it.e}</div>
                      <span style={{fontFamily:"var(--fm)",fontSize:11,padding:"3px 8px",borderRadius:4,background:tgColor(it.tg).bg,color:tgColor(it.tg).fg,fontWeight:600,flexShrink:0,whiteSpace:"nowrap"}}>{it.tg}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>;
          });
        })()}
      </div>
    </div></section>
    <section style={{padding:"96px 24px",background:"#fff"}}><div style={{maxWidth:1000,margin:"0 auto"}}>
      <Reveal><SH label="PARTNERS & INVESTORS" title="함께 성장하는 파트너들."/></Reveal>
      {(() => {
        const { partners: pts } = usePartners();
        return PARTNER_CATEGORIES.map((cat, gi) => {
          const items = pts.filter(p => p.cat === cat);
          if (items.length === 0) return null;
          return <Reveal key={cat} delay={gi * 0.12}>
            <div style={{marginBottom: gi < PARTNER_CATEGORIES.length - 1 ? 28 : 0}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12}}>
                <span style={{fontSize:13,fontWeight:700,color:"var(--td)"}}>{cat}</span>
                <span style={{display:"inline-flex",alignItems:"center",justifyContent:"center",width:20,height:20,background:"rgba(168,149,134,.1)",color:"var(--br)",fontSize:10,fontWeight:700,borderRadius:"50%"}}>{items.length}</span>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(140px, 1fr))",gap:6}}>
                {items.map(p => {
                  const keepSize = ["수이제네리스파트너스","두나미스자산운용","한국핀테크지원센터","서울창조경제센터","인천창조경제센터","서울다이나믹스"].includes(p.nm);
                  const logoH = keepSize ? 22 : 18;
                  return <div key={p.id} style={{background:"var(--alt)",borderRadius:8,padding: (PARTNER_LOGOS as Record<string, string>)[p.nm] ? "8px 12px" : "11px 14px",textAlign:"center",fontSize:12,fontWeight:600,color:"var(--tm)",transition:"all .2s",cursor:"default",display:"flex",alignItems:"center",justifyContent:"center",minHeight:40}}
                    onMouseEnter={e=>{e.currentTarget.style.background="rgba(168,149,134,.08)";e.currentTarget.style.color="var(--td)"}}
                    onMouseLeave={e=>{e.currentTarget.style.background="var(--alt)";e.currentTarget.style.color="var(--tm)"}}
                  >{(PARTNER_LOGOS as Record<string, string>)[p.nm] ? <img src={(PARTNER_LOGOS as Record<string, string>)[p.nm]} alt={p.nm} title={p.nm} style={{maxWidth:"100%",maxHeight:logoH,objectFit:"contain",filter:"grayscale(30%)",opacity:.75,transition:"all .3s"}} onMouseEnter={e=>{e.currentTarget.style.filter="grayscale(0%)";e.currentTarget.style.opacity="1"}} onMouseLeave={e=>{e.currentTarget.style.filter="grayscale(30%)";e.currentTarget.style.opacity=".75"}}/> : p.nm}</div>;
                })}
              </div>
            </div>
          </Reveal>;
        });
      })()}
    </div></section>
  </>;
}

export default function AboutPage() {
  return <Ab setPage={navigateTo} />;
}
