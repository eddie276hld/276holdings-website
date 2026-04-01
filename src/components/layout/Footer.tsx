"use client";
import { Logo276 } from "@/components/ui/Logo276";

function Foot({ setPage }: { setPage: (id: string) => void }) {
  return <footer style={{ background: "var(--nd)", color: "#fff", padding: "80px 24px 40px" }}>
    <div style={{ maxWidth: 1200, margin: "0 auto" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 48, marginBottom: 64 }}>
        <div><div style={{ marginBottom: 16 }}><Logo276 color="white" width={140} height={36}/></div><p style={{ fontSize: 14, color: "rgba(255,255,255,.45)", lineHeight: 1.7 }}>공급망 데이터 기반 중소기업 금융 플랫폼</p></div>
        <div><h4 style={{ fontFamily: "var(--fd)", fontWeight: 600, fontSize: 14, marginBottom: 20, color: "rgba(255,255,255,.35)", textTransform: "uppercase", letterSpacing: ".05em" }}>서비스</h4>{["FlowPay","FlowScore","FlowPoint"].map(s=><div key={s} onClick={()=>setPage(s.toLowerCase())} style={{fontSize:14,color:"rgba(255,255,255,.6)",marginBottom:12,cursor:"pointer",transition:"color .2s"}} onMouseEnter={e=>e.currentTarget.style.color="#fff"} onMouseLeave={e=>e.currentTarget.style.color="rgba(255,255,255,.6)"}>{s}</div>)}</div>
        <div><h4 style={{ fontFamily: "var(--fd)", fontWeight: 600, fontSize: 14, marginBottom: 20, color: "rgba(255,255,255,.35)", textTransform: "uppercase", letterSpacing: ".05em" }}>회사</h4>{[["about","회사 소개"],["faq","FAQ"],["esg","ESG"],["notices","공지사항"],["terms","이용약관"],["contact","문의하기"]].map(([id,l])=><div key={id} onClick={()=>setPage(id)} style={{fontSize:14,color:"rgba(255,255,255,.6)",marginBottom:12,cursor:"pointer",transition:"color .2s"}} onMouseEnter={e=>e.currentTarget.style.color="#fff"} onMouseLeave={e=>e.currentTarget.style.color="rgba(255,255,255,.6)"}>{l}</div>)}<div style={{fontSize:14,color:"rgba(255,255,255,.6)"}}>개인정보처리방침</div></div>
        <div><h4 style={{ fontFamily: "var(--fd)", fontWeight: 600, fontSize: 14, marginBottom: 20, color: "rgba(255,255,255,.35)", textTransform: "uppercase", letterSpacing: ".05em" }}>연락처</h4><div style={{ fontSize: 14, color: "rgba(255,255,255,.6)", lineHeight: 2 }}>contact@276holdings.com<br/>02-785-7080<br/>인천광역시 연수구 컨벤시아대로 204</div></div>
      </div>
      <div style={{ borderTop: "1px solid rgba(255,255,255,.06)", paddingTop: 24, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
        <span style={{ fontSize: 13, color: "rgba(255,255,255,.3)" }}>© 2026 276홀딩스. All rights reserved.</span>
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>{["276holdings.com","flowpoint.kr","flowpay.kr"].map(s=><span key={s} style={{fontSize:13,color:"rgba(255,255,255,.3)"}}>{s}</span>)}<span onClick={()=>setPage("admin")} style={{fontSize:11,color:"rgba(255,255,255,.12)",cursor:"pointer",transition:"color .3s"}} onMouseEnter={e=>e.currentTarget.style.color="rgba(255,255,255,.4)"} onMouseLeave={e=>e.currentTarget.style.color="rgba(255,255,255,.12)"}>Admin</span></div>
      </div>
    </div>
  </footer>;
}

export default Foot;
