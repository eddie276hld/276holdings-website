"use client";

import { useState, useEffect, useRef } from "react";
import { Mail, Phone, CheckCircle2 } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

// === CONTACT PAGE ===
function Ct() {
  const [done, setDone] = useState(false);
  if (done) return <section style={{padding:"180px 24px 120px",textAlign:"center",minHeight:"80vh",display:"flex",alignItems:"center",justifyContent:"center"}}><div><div style={{marginBottom:24,display:"flex",justifyContent:"center"}}><CheckCircle2 size={64} strokeWidth={1.2} color="var(--br)"/></div><h2 style={{fontFamily:"var(--fd)",fontWeight:700,fontSize:32,marginBottom:16}}>감사합니다</h2><p style={{fontSize:16,color:"var(--tm)"}}>문의가 접수되었습니다. 빠른 시일 내 연락드리겠습니다.</p></div></section>;
  return <section style={{padding:"140px 24px 96px",background:"var(--alt)"}}>
    <div style={{maxWidth:1100,margin:"0 auto"}}>
      <Reveal><div style={{marginBottom:48}}><div className="slbl">CONTACT US</div><h1 style={{fontFamily:"var(--fd)",fontSize:"clamp(32px,5vw,48px)",fontWeight:800,letterSpacing:"-.03em",marginBottom:12}}>문의하기</h1><p style={{fontSize:17,color:"var(--tm)"}}>서비스 도입, 파트너십, API 문의 등 무엇이든 편하게 문의하세요.</p></div></Reveal>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(340px,1fr))",gap:48}}>
        <Reveal><div className="cform" style={{background:"#fff",padding:40,borderRadius:12,border:"1px solid var(--bd)"}}>
          <div style={{display:"flex",flexDirection:"column",gap:20}}>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
              <div><label style={{fontSize:14,fontWeight:500,display:"block",marginBottom:6}}>회사명 *</label><input type="text" placeholder="회사명"/></div>
              <div><label style={{fontSize:14,fontWeight:500,display:"block",marginBottom:6}}>담당자명 *</label><input type="text" placeholder="이름"/></div>
            </div>
            <div><label style={{fontSize:14,fontWeight:500,display:"block",marginBottom:6}}>이메일 *</label><input type="email" placeholder="email@company.com"/></div>
            <div><label style={{fontSize:14,fontWeight:500,display:"block",marginBottom:6}}>전화번호</label><input type="tel" placeholder="010-0000-0000"/></div>
            <div><label style={{fontSize:14,fontWeight:500,display:"block",marginBottom:6}}>문의 유형</label><select defaultValue=""><option value="" disabled>선택해 주세요</option><option>서비스 도입 문의</option><option>파트너십 제안</option><option>API 문의</option><option>투자 문의</option><option>기타</option></select></div>
            <div><label style={{fontSize:14,fontWeight:500,display:"block",marginBottom:6}}>문의 내용</label><textarea rows={5} placeholder="문의 내용을 입력해 주세요" style={{resize:"vertical"}}/></div>
            <label style={{display:"flex",gap:8,alignItems:"center",fontSize:13,color:"var(--tm)"}}><input type="checkbox" style={{width:14,height:14,flexShrink:0,cursor:"pointer"}}/><span style={{flex:1,whiteSpace:"nowrap"}}>개인정보 수집 및 이용에 동의합니다.</span></label>
            <button className="bp" style={{width:"100%",justifyContent:"center",padding:14,fontSize:16}} onClick={()=>setDone(true)}>문의 보내기</button>
          </div>
        </div></Reveal>
        <Reveal delay={.15}><div style={{display:"flex",flexDirection:"column",gap:32}}>
          <div><h3 style={{fontFamily:"var(--fd)",fontWeight:600,fontSize:18,marginBottom:20}}>연락처</h3>
            <div style={{display:"flex",flexDirection:"column",gap:16}}>
              <div style={{display:"flex",gap:12}}><Mail size={20} strokeWidth={1.5} color="var(--br)"/><div><div style={{fontSize:13,color:"var(--tm)",marginBottom:2}}>이메일</div><div style={{fontSize:15,fontWeight:500}}>contact@276holdings.com</div></div></div>
              <div style={{display:"flex",gap:12}}><Phone size={20} strokeWidth={1.5} color="var(--br)"/><div><div style={{fontSize:13,color:"var(--tm)",marginBottom:2}}>전화</div><div style={{fontSize:15,fontWeight:500}}>02-785-7080</div></div></div>
            </div>
          </div>
          <div><h3 style={{fontFamily:"var(--fd)",fontWeight:600,fontSize:18,marginBottom:20}}>오피스</h3>
            <div style={{display:"flex",flexDirection:"column",gap:16}}>
              {[{l:"본사 (인천)",a:"인천광역시 연수구 컨벤시아대로 204, 인천스타트업파크 인스타2 2층 213호"},{l:"서울 연구소",a:"서울특별시 영등포구 의사당대로 83 오투타워 19층 104호"},{l:"전북 지사",a:"전북특별자치도 전주시 덕진구 기린대로 886"}].map(o=><div key={o.l} style={{padding:"16px 20px",background:"#fff",borderRadius:12,border:"1px solid var(--bd)"}}><div style={{fontFamily:"var(--fd)",fontWeight:600,fontSize:14,color:"var(--br)",marginBottom:4}}>{o.l}</div><div style={{fontSize:14,color:"var(--tm)",lineHeight:1.5}}>{o.a}</div></div>)}
            </div>
          </div>
          <div style={{padding:24,background:"var(--nd)",borderRadius:12,color:"#fff"}}><div style={{fontFamily:"var(--fd)",fontWeight:600,fontSize:16,marginBottom:8}}>빠른 상담이 필요하신가요?</div><p style={{fontSize:14,color:"rgba(255,255,255,.55)",lineHeight:1.6}}>평일 09:00~18:00 전화 상담 가능합니다. 서비스 도입 관련 문의는 1영업일 내 회신드립니다.</p></div>
        </div></Reveal>
      </div>
    </div>
  </section>;
}

export default function ContactPage() {
  return <Ct />;
}
