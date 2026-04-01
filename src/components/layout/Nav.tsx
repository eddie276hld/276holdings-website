"use client";
import { useState } from "react";
import { Logo276 } from "@/components/ui/Logo276";

function Nav({ page, setPage }) {
  const [scr, setScr] = useState(false);
  const [menu, setMenu] = useState(false);
  const [dd, setDd] = useState(false);
  const isH = page === "home";
  useEffect(() => { const f = () => setScr(window.scrollY > 40); window.addEventListener("scroll", f); return () => window.removeEventListener("scroll", f); }, []);
  useEffect(() => { setMenu(false); window.scrollTo(0, 0); }, [page]);
  const nCls = scr || !isH ? "nav-s" : "nav-t";
  const lc = scr || !isH ? "brand" : "white";
  const tc = scr || !isH ? "var(--td)" : "white";
  return <>
    <nav className={nCls} style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, padding: "0 24px", height: 68, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <div style={{ cursor: "pointer" }} onClick={() => setPage("home")}><Logo276 color={lc} width={150} height={38}/></div>
      <div style={{ display: "flex", alignItems: "center", gap: 32 }} className="dnav">
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          <div style={{ position: "relative" }} onMouseEnter={() => setDd(true)} onMouseLeave={() => setDd(false)}>
            <span style={{ fontFamily: "var(--fd)", fontSize: 15, fontWeight: 500, color: tc, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}>서비스 <span style={{ fontSize: 10 }}>▼</span></span>
            {dd && <div style={{ position: "absolute", top: "100%", left: -16, paddingTop: 12, width: 240, zIndex: 60 }}>
              <div style={{ background: "#fff", borderRadius: 12, boxShadow: "0 16px 48px rgba(0,0,0,.12)", border: "1px solid var(--bd)", padding: 8, animation: "fadeUp .2s ease" }}>
                {[{id:"flowpay",l:"FlowPay",d:"구매대행 선지급"},{id:"flowscore",l:"FlowScore",d:"AI 신용평가"},{id:"flowpoint",l:"FlowPoint",d:"매출채권 전자화"}].map(i=>
                  <div key={i.id} onClick={()=>{setPage(i.id);setDd(false)}} style={{padding:"12px 16px",borderRadius:8,cursor:"pointer",transition:"background .2s"}} onMouseEnter={e=>e.currentTarget.style.background="var(--alt)"} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                    <div style={{fontFamily:"var(--fd)",fontWeight:600,fontSize:14,color:"var(--td)"}}>{i.l}</div>
                    <div style={{fontSize:13,color:"var(--tm)",marginTop:2}}>{i.d}</div>
                  </div>)}
              </div>
            </div>}
          </div>
          {[{id:"about",l:"회사 소개"},{id:"faq",l:"FAQ"},{id:"contact",l:"문의"}].map(i=><span key={i.id} onClick={()=>setPage(i.id)} style={{fontFamily:"var(--fd)",fontSize:15,fontWeight:500,color:tc,cursor:"pointer",transition:"opacity .2s"}} onMouseEnter={e=>e.currentTarget.style.opacity=".7"} onMouseLeave={e=>e.currentTarget.style.opacity="1"}>{i.l}</span>)}
        </div>
        <button className="bn" onClick={()=>setPage("contact")}>상담 문의</button>
      </div>
      <button onClick={()=>setMenu(!menu)} style={{display:"none",background:"none",border:"none",cursor:"pointer",padding:8,color:tc,fontSize:24}} className="mbtn">{menu?"✕":"☰"}</button>
    </nav>
    {menu && <div className="mmenu">
      {[["home","홈"],["flowpay","FlowPay"],["flowscore","FlowScore"],["flowpoint","FlowPoint"],["about","회사 소개"],["esg","ESG"],["notices","공지사항"],["faq","FAQ"],["terms","이용약관"],["contact","문의하기"]].map(([id,l])=><a key={id} href="#" onClick={e=>{e.preventDefault();setPage(id)}}>{l}</a>)}
    </div>}
  </>;
}

// === FOOTER ===

export default Nav;
