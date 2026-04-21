"use client";
import { navigateTo } from "@/lib/navigation";

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
  const { members } = useMembers();
  const { history: hist } = useHistory();
  const { partners: pts } = usePartners();

  const years = [...new Set(hist.map(h => h.y))].sort((a,b)=>b.localeCompare(a));
  const bgs = ["#0f1929","#132240","#1a2844","#1f3050","#243656","#2a3c5c"];

  return <>
    <section style={{padding:"180px 24px 140px",position:"relative",background:"linear-gradient(135deg,#080e1a 0%,#0f1929 40%,#132240 70%,#080e1a 100%)"}}>
      <div style={{maxWidth:1200,margin:"0 auto",position:"relative",zIndex:2}}>
        <h1 style={{fontFamily:"var(--fd)",fontSize:"clamp(32px,5vw,52px)",fontWeight:800,color:"#fff",lineHeight:1.3,letterSpacing:"-.03em",maxWidth:700,marginBottom:24}}>기업의 가치를 발견해<br/><span style={{background:"linear-gradient(135deg,var(--bw),var(--bl))",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>금융 자산으로 만들어요</span></h1>
        <p style={{fontSize:18,color:"rgba(255,255,255,.55)",maxWidth:600,lineHeight:1.7}}>현금흐름 문제로 멈추는 중소기업이 없도록,<br/>담보 없이 거래 이력만으로 국내외 중소기업의 성장을 연결해요</p>
      </div>
      <div style={{ position:"absolute",bottom:0,left:0,right:0,height:1,background:"rgba(255,255,255,0.08)" }}/>
    </section>

    <section style={{padding:"160px 24px",background:"#fff"}}><div style={{maxWidth:1200,margin:"0 auto"}}><Reveal>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",columnGap:96,rowGap:48}}>
        <div>
          <div style={{fontSize:13,fontWeight:700,letterSpacing:".06em",color:"var(--ny)",marginBottom:16,textTransform:"uppercase"}}>Mission</div>
          <h3 style={{fontFamily:"var(--fd)",fontWeight:700,fontSize:24,marginBottom:16,lineHeight:1.3}}>중소기업이 현금흐름 문제 없이 성장할 수 있는 금융 인프라를 만들어요</h3>
          <p style={{fontSize:17,color:"var(--tm)",lineHeight:1.7}}>연간 5,000조원 매출채권 시장의 99%는 공백이에요. 성장하는 기업이 자금 공백으로 탈락하지 않도록, 데이터와 기술로 금융의 빈틈을 채워요.</p>
        </div>
        <div>
          <div style={{fontSize:13,fontWeight:700,letterSpacing:".06em",color:"var(--ny)",marginBottom:16,textTransform:"uppercase"}}>Vision</div>
          <h3 style={{fontFamily:"var(--fd)",fontWeight:700,fontSize:24,marginBottom:16,lineHeight:1.3}}>국내와 글로벌 중소기업이 가장 신뢰하는 성장 파트너</h3>
          <p style={{fontSize:17,color:"var(--tm)",lineHeight:1.7}}>좋은 기회는 기다려 주지 않아요. 중소기업이 성장의 순간을 자금 문제로 놓치지 않도록, 항상 곁에 있는 파트너가 돼요.</p>
        </div>
      </div>
    </Reveal></div></section>

    <section style={{padding:"160px 24px",background:"var(--alt)"}}><div style={{maxWidth:1200,margin:"0 auto"}}>
      <Reveal><SH title="숫자로 증명해요"/></Reveal>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:20,marginTop:72}}>
        {[{v:6890,s:"억+",l:"누적 중개액"},{v:1100,s:"+",l:"회원사"},{v:97,s:"억",l:"연 매출 ('25)"},{v:37,s:"억",l:"글로벌 매출"},{v:230,s:"%",l:"매출 성장률"}].map((s,i)=><Reveal key={i} delay={i*.08}><Stat value={s.v} suffix={s.s} label={s.l}/></Reveal>)}
      </div>
    </div></section>

    <section style={{padding:"160px 24px",background:"#fff"}}><div style={{maxWidth:1200,margin:"0 auto"}}>
      <Reveal><SH title="이 팀이 만들어요." subtitle="금융의 전문성, 비즈니스의 실행력, 기술 기반의 리스크 통제"/></Reveal>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:24,marginTop:72}}>
        {members.map((m,i) =>
          <Reveal key={m.id} delay={i*.1}>
            <div style={{background:"#f8fafc",borderRadius:12,padding:"40px 24px",textAlign:"center",height:"100%"}}>
              {m.img
                ? <img src={m.img} alt={m.nm} style={{width:72,height:72,borderRadius:"50%",objectFit:"cover",margin:"0 auto 16px",display:"block"}}/>
                : <div style={{width:72,height:72,borderRadius:"50%",background:bgs[i%bgs.length],margin:"0 auto 16px",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"var(--fd)",fontWeight:700,fontSize:24,color:"#fff"}}>{m.nm[0]}</div>}
              <h3 style={{fontFamily:"var(--fd)",fontWeight:700,fontSize:18}}>{m.nm}</h3>
              <div style={{fontSize:13,color:"var(--br)",fontWeight:600,marginTop:4,fontFamily:"var(--fd)"}}>{m.rl}</div>
              <p style={{fontSize:15,color:"var(--tm)",marginTop:12,lineHeight:1.6}}>{m.d}</p>
            </div>
          </Reveal>)}
      </div>
    </div></section>

    <section style={{padding:"160px 24px",background:"var(--alt)"}}><div style={{maxWidth:800,margin:"0 auto"}}>
      <Reveal><SH title="걸어온 길"/></Reveal>
      <div style={{marginTop:72,position:"relative",paddingLeft:28}}>
        <div style={{position:"absolute",left:0,top:4,bottom:0,width:2,background:"var(--bd)"}}/>
        {years.map((yr, yi) => {
          const items = hist.filter(h => h.y === yr);
          return <Reveal key={yr} delay={yi * .06}>
            <div style={{marginBottom:40,position:"relative"}}>
              <div style={{position:"absolute",left:-33,top:5,width:10,height:10,borderRadius:"50%",background:"var(--ny)"}}/>
              <div style={{fontSize:13,fontWeight:700,color:"#aaa",letterSpacing:".06em",marginBottom:10}}>{yr}</div>
              <div style={{display:"flex",flexDirection:"column",gap:6}}>
                {items.map((it) => (
                  <div key={it.id} style={{fontSize:17,fontWeight:500,lineHeight:1.6,color:"var(--td)"}}>{it.e}</div>
                ))}
              </div>
            </div>
          </Reveal>;
        })}
      </div>
    </div></section>

    <section style={{padding:"160px 24px",background:"#fff"}}><div style={{maxWidth:1200,margin:"0 auto"}}>
      <Reveal><SH title="함께 성장하는 파트너들"/></Reveal>
      <div style={{marginTop:72,display:"flex",flexDirection:"column",gap:24}}>
        {PARTNER_CATEGORIES.map((cat, gi) => {
          const items = pts.filter(p => p.cat === cat);
          if (items.length === 0) return null;
          const doubled = [...items, ...items];
          const dur = `${items.length * 10}s`;
          const reverse = gi % 2 === 1;
          return (
            <div key={cat} className="marquee-wrap" style={{"--mdur":dur} as React.CSSProperties}>
              <div className={reverse ? "marquee-track-rev" : "marquee-track"} style={{gap:40}}>
                {doubled.map((p, idx) => {
                  const logo = (PARTNER_LOGOS as Record<string, string>)[p.nm];
                  const keepSize = ["수이제네리스파트너스","두나미스자산운용","한국핀테크지원센터","서울창조경제센터","인천창조경제센터","서울다이나믹스"].includes(p.nm);
                  const logoH = keepSize ? 26 : 20;
                  return (
                    <div key={idx} style={{flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",height:52,padding:"0 20px"}}>
                      {logo
                        ? <img src={logo} alt={p.nm} title={p.nm} style={{maxHeight:logoH,objectFit:"contain",filter:"grayscale(100%)",opacity:.45,transition:"all .3s"}}
                            onMouseEnter={e=>{e.currentTarget.style.filter="grayscale(0%)";e.currentTarget.style.opacity="1"}}
                            onMouseLeave={e=>{e.currentTarget.style.filter="grayscale(100%)";e.currentTarget.style.opacity=".45"}}
                          />
                        : <span style={{fontSize:13,fontWeight:600,color:"#bbb",whiteSpace:"nowrap",transition:"color .3s"}}
                            onMouseEnter={e=>{e.currentTarget.style.color="var(--td)"}}
                            onMouseLeave={e=>{e.currentTarget.style.color="#bbb"}}
                          >{p.nm}</span>
                      }
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div></section>
  </>;
}

export default function AboutPage() {
  return <Ab setPage={navigateTo} />;
}
