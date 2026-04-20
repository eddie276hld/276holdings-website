"use client";

import { useState, useRef } from "react";
import { Mail, Phone, X } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

const ERR = { border: "1.5px solid #ef4444" };
const OK  = { border: "1px solid var(--bd)" };
const ErrMsg = ({ msg }: { msg: string }) => (
  <div style={{ fontSize: 12, color: "#ef4444", marginTop: 5, fontWeight: 500, minHeight: 18 }}>{msg}</div>
);
const Spacer = () => <div style={{ minHeight: 18, marginTop: 5 }} />;

function Ct() {
  const [vals, setVals]       = useState({ company: "", name: "", email: "", tel: "", type: "", msg: "" });
  const [agreed, setAgreed]   = useState(false);
  const [errs, setErrs]       = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [showModal, setShowModal] = useState(false);
  const [toast, setToast]     = useState(false);

  const refs = {
    company: useRef<HTMLInputElement>(null),
    name:    useRef<HTMLInputElement>(null),
    email:   useRef<HTMLInputElement>(null),
    msg:     useRef<HTMLTextAreaElement>(null),
    agree:   useRef<HTMLInputElement>(null),
  };

  const validateField = (k: string, v: string) => {
    if (k === "company" && !v.trim()) return "회사명을 입력해 주세요.";
    if (k === "name"    && !v.trim()) return "담당자명을 입력해 주세요.";
    if (k === "email") {
      if (!v.trim()) return "이메일을 입력해 주세요.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return "올바른 이메일 형식을 입력해 주세요.";
    }
    if (k === "msg" && !v.trim()) return "문의 내용을 입력해 주세요.";
    return "";
  };

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const v = e.target.value;
    setVals(prev => ({ ...prev, [k]: v }));
    if (touched[k]) {
      const err = validateField(k, v);
      setErrs(prev => { const n = { ...prev }; if (err) n[k] = err; else delete n[k]; return n; });
    }
  };

  const blur = (k: string) => () => {
    setTouched(prev => ({ ...prev, [k]: true }));
    const v = vals[k as keyof typeof vals];
    const err = validateField(k, v);
    setErrs(prev => { const n = { ...prev }; if (err) n[k] = err; else delete n[k]; return n; });
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!vals.company.trim()) e.company = "회사명을 입력해 주세요.";
    if (!vals.name.trim())    e.name    = "담당자명을 입력해 주세요.";
    if (!vals.email.trim())   e.email   = "이메일을 입력해 주세요.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(vals.email)) e.email = "올바른 이메일 형식을 입력해 주세요.";
    if (!vals.msg.trim())     e.msg     = "문의 내용을 입력해 주세요.";
    if (!agreed)              e.agree   = "개인정보 수집 및 이용에 동의해 주세요.";
    setErrs(e);
    setTouched({ company: true, name: true, email: true, msg: true });
    const order = ["company", "name", "email", "msg", "agree"] as const;
    for (const k of order) {
      if (e[k]) { (refs[k] as React.RefObject<HTMLInputElement | HTMLTextAreaElement>).current?.focus(); break; }
    }
    return Object.keys(e).length === 0;
  };

  const submit = () => {
    if (validate()) {
      setToast(true);
      setTimeout(() => setToast(false), 3000);
      setVals({ company: "", name: "", email: "", tel: "", type: "", msg: "" });
      setAgreed(false); setErrs({}); setTouched({});
    }
  };

  const fs = (k: string) => errs[k] ? ERR : OK;

  return (
    <section style={{ padding: "140px 24px 96px", background: "var(--alt)", position: "relative" }}>

      {/* 토스트 */}
      {toast && (
        <div style={{ position:"fixed", top:24, left:"50%", transform:"translateX(-50%)", zIndex:1000, background:"var(--ny)", color:"#fff", padding:"14px 28px", borderRadius:10, fontSize:15, fontWeight:500, boxShadow:"0 4px 20px rgba(0,0,0,.2)", animation:"fadeUp .3s ease", whiteSpace:"nowrap" }}>
          제출 완료했습니다. 1 영업일 내로 연락드리겠습니다.
        </div>
      )}

      {/* 개인정보 모달 */}
      {showModal && (
        <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,.5)", zIndex:999, display:"flex", alignItems:"center", justifyContent:"center", padding:24 }} onClick={() => setShowModal(false)}>
          <div style={{ background:"#fff", borderRadius:16, padding:40, maxWidth:560, width:"100%", maxHeight:"80vh", overflowY:"auto", position:"relative" }} onClick={e => e.stopPropagation()}>
            <button onClick={() => setShowModal(false)} style={{ position:"absolute", top:16, right:16, width:32, height:32, borderRadius:"50%", border:"1px solid var(--bd)", background:"#fff", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>
              <X size={16} color="var(--td)"/>
            </button>
            <h3 style={{ fontFamily:"var(--fd)", fontWeight:700, fontSize:20, marginBottom:20 }}>개인정보 수집 및 이용 동의</h3>
            <p style={{ fontSize:14, color:"var(--tm)", lineHeight:1.7, marginBottom:24 }}>
              (주)276홀딩스는 본인의 개인정보를 수집·이용하고자 하며, 이는 「개인정보 보호법」에 따라 정보 주체의 동의를 필요로 합니다.
            </p>
            <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
              {[
                { t:"1. 수집·이용 목적", c:"서비스 상담 및 안내, 상담 이력 관리 및 고객 응대" },
                { t:"2. 수집·이용할 내용", c:"회사명, 성명, 이메일, 휴대전화번호, 문의내용" },
                { t:"3. 보관 기간", c:"수집·이용 목적 달성 후 또는 계약 종료 후 5년까지 보관합니다. 단, 법령에 따라 보관이 요구되는 경우 해당 기간까지 보관합니다." },
                { t:"4. 동의 거부 권리", c:"귀하는 본 동의를 거부할 권리가 있습니다. 다만, 필수 정보에 대한 동의를 거부할 경우 ㈜276홀딩스의 서비스 이용이 제한될 수 있습니다." },
              ].map(item => (
                <div key={item.t}>
                  <div style={{ fontFamily:"var(--fd)", fontWeight:600, fontSize:14, marginBottom:6 }}>{item.t}</div>
                  <div style={{ fontSize:14, color:"var(--tm)", lineHeight:1.6 }}>{item.c}</div>
                </div>
              ))}
            </div>
            <button className="bp" style={{ width:"100%", justifyContent:"center", padding:12, fontSize:15, marginTop:32 }} onClick={() => setShowModal(false)}>확인</button>
          </div>
        </div>
      )}

      <div style={{ maxWidth:1100, margin:"0 auto" }}>
        <Reveal><div style={{ marginBottom:48 }}>
          <h1 style={{ fontFamily:"var(--fd)", fontSize:"clamp(32px,5vw,48px)", fontWeight:800, letterSpacing:"-.03em", marginBottom:12 }}>문의하기</h1>
          <p style={{ fontSize:17, color:"var(--tm)" }}>서비스 도입, 파트너십, API 문의 등 무엇이든 편하게 문의하세요.</p>
        </div></Reveal>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(340px,1fr))", gap:48 }}>
          {/* 폼 */}
          <Reveal><div className="cform" style={{ background:"#fff", padding:40, borderRadius:12, border:"1px solid var(--bd)" }}>
            <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
                <div>
                  <label style={{ fontSize:14, fontWeight:500, display:"block", marginBottom:6 }}>회사명 *</label>
                  <input ref={refs.company} type="text" placeholder="회사명" value={vals.company} onChange={set("company")} onBlur={blur("company")} style={fs("company")}/>
                  {errs.company ? <ErrMsg msg={errs.company}/> : <Spacer/>}
                </div>
                <div>
                  <label style={{ fontSize:14, fontWeight:500, display:"block", marginBottom:6 }}>담당자명 *</label>
                  <input ref={refs.name} type="text" placeholder="이름" value={vals.name} onChange={set("name")} onBlur={blur("name")} style={fs("name")}/>
                  {errs.name ? <ErrMsg msg={errs.name}/> : <Spacer/>}
                </div>
              </div>
              <div>
                <label style={{ fontSize:14, fontWeight:500, display:"block", marginBottom:6 }}>이메일 *</label>
                <input ref={refs.email} type="email" placeholder="email@company.com" value={vals.email} onChange={set("email")} onBlur={blur("email")} style={fs("email")}/>
                {errs.email ? <ErrMsg msg={errs.email}/> : <Spacer/>}
              </div>
              <div>
                <label style={{ fontSize:14, fontWeight:500, display:"block", marginBottom:6 }}>
                  휴대전화번호 <span style={{ color:"var(--tm)", fontWeight:400 }}>(선택)</span>
                </label>
                <input type="tel" placeholder="010-0000-0000" value={vals.tel} onChange={set("tel")}/>
                <Spacer/>
              </div>
              <div>
                <label style={{ fontSize:14, fontWeight:500, display:"block", marginBottom:6 }}>문의 유형</label>
                <select value={vals.type} onChange={set("type")}>
                  <option value="" disabled>선택해 주세요</option>
                  <option>서비스 도입 문의</option>
                  <option>파트너십 제안</option>
                  <option>API 문의</option>
                  <option>투자 문의</option>
                  <option>기타</option>
                </select>
                <Spacer/>
              </div>
              <div>
                <label style={{ fontSize:14, fontWeight:500, display:"block", marginBottom:6 }}>문의 내용 *</label>
                <textarea ref={refs.msg} rows={5} placeholder="문의 내용을 입력해 주세요" style={{ resize:"vertical", ...fs("msg") }} value={vals.msg} onChange={set("msg")} onBlur={blur("msg")}/>
                {errs.msg ? <ErrMsg msg={errs.msg}/> : <Spacer/>}
              </div>
              <div>
                <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                  <label style={{ display:"flex", gap:8, alignItems:"center", fontSize:13, color: errs.agree ? "#ef4444" : "var(--tm)", cursor:"pointer", flex:1 }}>
                    <input ref={refs.agree} type="checkbox" checked={agreed} onChange={e => { setAgreed(e.target.checked); if (e.target.checked) setErrs(ev => { const n = { ...ev }; delete n.agree; return n; }); }} style={{ width:14, height:14, flexShrink:0, cursor:"pointer", accentColor: errs.agree ? "#ef4444" : "var(--br)" }}/>
                    <span>개인정보 수집 및 이용에 동의합니다. (필수)</span>
                  </label>
                  <button onClick={() => setShowModal(true)} style={{ fontSize:13, color:"var(--br)", background:"none", border:"none", cursor:"pointer", textDecoration:"underline", flexShrink:0 }}>더보기</button>
                </div>
                {errs.agree ? <ErrMsg msg={errs.agree}/> : <Spacer/>}
              </div>
              <button className="bp" style={{ width:"100%", justifyContent:"center", padding:14, fontSize:16 }} onClick={submit}>상담 요청하기</button>
            </div>
          </div></Reveal>

          {/* 사이드바 */}
          <Reveal delay={.15}><div style={{ display:"flex", flexDirection:"column", gap:32 }}>
            {/* 연락처 */}
            <div>
              <h3 style={{ fontFamily:"var(--fd)", fontWeight:600, fontSize:18, marginBottom:20 }}>연락처</h3>
              <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
                <div style={{ display:"flex", gap:12 }}><Mail size={20} strokeWidth={1.5} color="var(--br)"/><div><div style={{ fontSize:13, color:"var(--tm)", marginBottom:2 }}>이메일</div><div style={{ fontSize:15, fontWeight:500 }}>contact@276holdings.com</div></div></div>
                <div style={{ display:"flex", gap:12 }}><Phone size={20} strokeWidth={1.5} color="var(--br)"/><div><div style={{ fontSize:13, color:"var(--tm)", marginBottom:2 }}>전화</div><div style={{ fontSize:15, fontWeight:500 }}>02-785-7080</div></div></div>
              </div>
            </div>
            {/* 빠른 상담 */}
            <div style={{ padding:24, background:"#f8f9fa", borderRadius:12, border:"1px solid var(--bd)" }}>
              <div style={{ fontFamily:"var(--fd)", fontWeight:600, fontSize:16, marginBottom:8, color:"#333" }}>빠른 상담이 필요하신가요?</div>
              <p style={{ fontSize:14, color:"#555", lineHeight:1.6, whiteSpace:"pre-line" }}>{"평일 09:00~18:00 전화 상담 가능합니다.\n서비스 도입 관련 문의는 1영업일 내 회신드립니다."}</p>
            </div>
            {/* 오피스 */}
            <div>
              <h3 style={{ fontFamily:"var(--fd)", fontWeight:600, fontSize:18, marginBottom:20 }}>오피스</h3>
              <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
                {[{l:"본사 (인천)",a:"인천광역시 연수구 컨벤시아대로 204, 인천스타트업파크 인스타2 2층 213호"},{l:"서울 연구소",a:"서울특별시 영등포구 의사당대로 83 오투타워 19층 104호"},{l:"전북 지사",a:"전북특별자치도 전주시 덕진구 기린대로 886"}].map(o =>
                  <div key={o.l} style={{ padding:"16px 20px", background:"#fff", borderRadius:12, border:"1px solid var(--bd)" }}>
                    <div style={{ fontFamily:"var(--fd)", fontWeight:600, fontSize:14, color:"var(--br)", marginBottom:4 }}>{o.l}</div>
                    <div style={{ fontSize:14, color:"var(--tm)", lineHeight:1.5 }}>{o.a}</div>
                  </div>
                )}
              </div>
            </div>
          </div></Reveal>
        </div>
      </div>
    </section>
  );
}

export default function ContactPage() {
  return <Ct />;
}
