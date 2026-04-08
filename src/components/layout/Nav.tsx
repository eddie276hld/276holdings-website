"use client";
import { useState, useEffect, useRef } from "react";
import { Logo276 } from "@/components/ui/Logo276";

function Nav({ page, setPage }: { page?: string; setPage: (id: string) => void; current?: string }) {
  const [sp, setSp] = useState(0); // scrollProgress 0~1
  const [menu, setMenu] = useState(false);
  const [dd, setDd] = useState(false);
  const isH = page === "home";
  const isHRef = useRef(isH);
  isHRef.current = isH;
  useEffect(() => {
    const f = () => {
      if (!isHRef.current) { setSp(1); return; }
      const max = window.innerHeight * 0.75;
      setSp(Math.min(1, Math.max(0, window.scrollY / max)));
    };
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  useEffect(() => {
    setMenu(false);
    window.scrollTo(0, 0);
    setSp(isH ? 0 : 1);
  }, [page]);
  const scr = !isH || sp >= 1;
  const lc = sp > 0.5 || !isH ? "brand" : "white";
  const tc = sp > 0.5 || !isH ? "var(--td)" : "#fff";
  const bgA = isH ? sp * 0.93 : 0.93;
  const blurPx = Math.round((isH ? sp : 1) * 16);
  const bdA = isH ? sp * 0.08 : 0.08;
  const navStyle = {
    position: "fixed" as const,
    top: 0, left: 0, right: 0,
    zIndex: 50,
    padding: "0 24px",
    height: 68,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    background: `rgba(255,255,255,${bgA.toFixed(3)})`,
    backdropFilter: blurPx > 0 ? `blur(${blurPx}px)` : "none",
    WebkitBackdropFilter: blurPx > 0 ? `blur(${blurPx}px)` : "none",
    borderBottom: `1px solid rgba(0,0,0,${bdA.toFixed(3)})`,
    transition: "color 0.2s ease",
  };
  return <>
    <nav style={navStyle}>
      <div style={{ cursor: "pointer" }} onClick={() => setPage("home")}><Logo276 color={lc} width={150} height={38}/></div>
      <div style={{ display: "flex", alignItems: "center", gap: 32 }} className="dnav">
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          <div style={{ position: "relative" }} onMouseEnter={() => setDd(true)} onMouseLeave={() => setDd(false)}>
            <span style={{ fontFamily: "var(--fd)", fontSize: 15, fontWeight: 500, color: tc, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}>서비스 <span style={{ fontSize: 10 }}>▼</span></span>
            {dd && <div style={{ position: "absolute", top: "100%", left: -16, paddingTop: 12, width: 240, zIndex: 60 }}>
              <div style={{ background: "#fff", borderRadius: 12, boxShadow: "0 16px 48px rgba(0,0,0,.12)", border: "1px solid var(--bd)", padding: 8, animation: "fadeUp .2s ease" }}>
                {[{id:"flowpay",l:"FLOW PAY",d:"구매대행 선지급"},{id:"flowscore",l:"FLOW SCORE",d:"AI 신용평가"},{id:"flowpoint",l:"FLOW POINT",d:"매출채권 전자화"}].map(i=>
                  <div key={i.id} onClick={()=>{setPage(i.id);setDd(false)}} style={{padding:"12px 16px",borderRadius:8,cursor:"pointer",transition:"background .2s"}} onMouseEnter={e=>e.currentTarget.style.background="var(--alt)"} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                    <div style={{fontFamily:"var(--fd)",fontWeight:600,fontSize:14,color:"var(--td)"}}>{i.l}</div>
                    <div style={{fontSize:13,color:"var(--tm)",marginTop:2}}>{i.d}</div>
                  </div>)}
              </div>
            </div>}
          </div>
          {[{id:"about",l:"회사 소개"},{id:"faq",l:"FAQ"}].map(i=><span key={i.id} onClick={()=>setPage(i.id)} style={{fontFamily:"var(--fd)",fontSize:15,fontWeight:500,color:tc,cursor:"pointer",transition:"opacity .2s"}} onMouseEnter={e=>e.currentTarget.style.opacity=".7"} onMouseLeave={e=>e.currentTarget.style.opacity="1"}>{i.l}</span>)}
        </div>
        <button className="bn" onClick={()=>setPage("contact")}>상담 문의</button>
      </div>
      <button onClick={()=>setMenu(!menu)} style={{display:"none",background:"none",border:"none",cursor:"pointer",padding:8,color:tc,fontSize:24}} className="mbtn">{menu?"✕":"☰"}</button>
    </nav>
    {menu && <div className="mmenu">
      {[["home","홈"],["flowpay","FLOW PAY"],["flowscore","FLOW SCORE"],["flowpoint","FLOW POINT"],["about","회사 소개"],["esg","ESG"],["notices","공지사항"],["faq","FAQ"],["terms","이용약관"],["contact","문의하기"]].map(([id,l])=><a key={id} href="#" onClick={e=>{e.preventDefault();setPage(id)}}>{l}</a>)}
    </div>}
  </>;
}

// === FOOTER ===

export default Nav;
