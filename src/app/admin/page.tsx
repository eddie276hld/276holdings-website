"use client";
import { navigateTo } from "@/lib/navigation";

import { useState, useEffect, useRef } from "react";
import { Clock, Building2, MessageCircle, CheckCircle2, X, Bell, Settings, Save, Edit3, Trash2, Plus, Eye, Calendar, Globe, Loader, Users } from "lucide-react";
import { PARTNER_LOGOS } from "@/data/logos";
import { useNotices } from "@/hooks/useNotices";
import { usePress } from "@/hooks/usePress";
import { useFaqs } from "@/hooks/useFaqs";
import { useHistory } from "@/hooks/useHistory";
import { useMembers } from "@/hooks/useMembers";
import { usePartners } from "@/hooks/usePartners";
import { useAwards } from "@/hooks/useAwards";
import { PARTNER_CATEGORIES } from "@/data/partners";
import { FAQ_CATEGORIES } from "@/data/faqs";
import { HISTORY_CATEGORIES } from "@/data/history";
import { summarizeForPopup } from "@/lib/utils";

// === ADMIN PAGE ===
function Admin({ setPage }: { setPage: (id: string) => void }) {
  const { notices, loaded, save } = useNotices();
  const { press, loaded: pLoaded, save: pSave } = usePress();
  const { faqs: faqItems, loaded: fLoaded, save: fSave } = useFaqs();
  const { history: histItems, loaded: hLoaded, save: hSave } = useHistory();
  const { members: memberItems, loaded: mLoaded, save: mSave } = useMembers();
  const { partners: partnerItems, loaded: ptLoaded, save: ptSave } = usePartners();
  const { awards: awardItems, loaded: awLoaded, save: awSave } = useAwards();
  const [tab, setTab] = useState("notices"); // notices | press | faq | history | members | partners | awards
  const [mode, setMode] = useState("list"); // list | add | edit
  const [editId, setEditId] = useState<any>(null);
  const [form, setForm] = useState({ category: "주주총회", date: "", title: "", content: "", isPopup: false, popupStart: "", popupEnd: "" });
  const [confirmDelete, setConfirmDelete] = useState<any>(null);
  const [preview, setPreview] = useState<any>(null);
  const [auth, setAuth] = useState(false);
  const [pw, setPw] = useState("");
  // Press states
  const [pMode, setPMode] = useState("list");
  const [pEditId, setPEditId] = useState<any>(null);
  const [pForm, setPForm] = useState({ url: "", media: "", title: "", excerpt: "", date: "", image: "" });
  const [scraping, setScraping] = useState(false);
  const [pDel, setPDel] = useState<any>(null);
  // FAQ states
  const [fMode, setFMode] = useState("list");
  const [fEditId, setFEditId] = useState<any>(null);
  const [fForm, setFForm] = useState({ q: "", a: "", cat: "서비스" });
  const [fDel, setFDel] = useState<any>(null);
  const [fCustomCat, setFCustomCat] = useState("");
  const [fShowCustom, setFShowCustom] = useState(false);
  // History states
  const [hMode, setHMode] = useState("list");
  const [hEditId, setHEditId] = useState<any>(null);
  const [hForm, setHForm] = useState({ y: "", e: "", tg: "서비스" });
  const [hDel, setHDel] = useState<any>(null);
  const [hCustomCat, setHCustomCat] = useState("");
  const [hShowCustom, setHShowCustom] = useState(false);
  // Member states
  const [mMode, setMMode] = useState("list");
  const [mEditId, setMEditId] = useState<any>(null);
  const [mForm, setMForm] = useState({ nm: "", rl: "", d: "", img: "" });
  const [mDel, setMDel] = useState<any>(null);
  const [mMsg, setMMsg] = useState<string | null>(null);
  // Partner states
  const [ptMode, setPtMode] = useState("list");
  const [ptEditId, setPtEditId] = useState<any>(null);
  const [ptForm, setPtForm] = useState({ nm: "", cat: "투자회사", logo: "" });
  const [ptDel, setPtDel] = useState<any>(null);
  const [ptCustomCat, setPtCustomCat] = useState("");
  const [ptShowCustom, setPtShowCustom] = useState(false);
  // Awards states
  const [awMode, setAwMode] = useState("list");
  const [awEditId, setAwEditId] = useState<any>(null);
  const [awForm, setAwForm] = useState({ y: "", t: "", o: "" });
  const [awDel, setAwDel] = useState<any>(null);

  const CATEGORIES = ["주주총회", "정관변경", "경영현안", "공시", "기타"];

  if (!auth) return <section style={{ padding: "180px 24px 120px", minHeight: "100vh", background: "#f1f5f9", display: "flex", alignItems: "center", justifyContent: "center" }}>
    <div style={{ maxWidth: 360, width: "100%", background: "#fff", borderRadius: 12, padding: 40, border: "1px solid #e2e8f0", textAlign: "center" }}>
      <Settings size={32} strokeWidth={1.2} color="var(--br)" style={{ marginBottom: 16 }}/>
      <h2 style={{ fontFamily: "var(--fd)", fontWeight: 700, fontSize: 20, marginBottom: 8 }}>관리자 로그인</h2>
      <p style={{ fontSize: 13, color: "#94a3b8", marginBottom: 24 }}>관리 페이지에 접근하려면 비밀번호를 입력하세요.</p>
      <input type="password" placeholder="비밀번호" value={pw} onChange={e => setPw(e.target.value)} onKeyDown={e => e.key === "Enter" && pw === "276admin" && setAuth(true)}
        style={{ width: "100%", padding: "12px 16px", border: "1px solid #e2e8f0", borderRadius: 8, fontSize: 14, marginBottom: 12, boxSizing: "border-box" }}/>
      <button onClick={() => pw === "276admin" && setAuth(true)} style={{ width: "100%", padding: "12px 0", background: "var(--br)", color: "#fff", border: "none", borderRadius: 8, fontWeight: 600, fontSize: 14, cursor: "pointer" }}>접속</button>
      <p style={{ fontSize: 11, color: "#cbd5e1", marginTop: 12 }}>기본 비밀번호: 276admin</p>
    </div>
  </section>;

  // === NOTICE handlers ===
  const startAdd = () => { const d = new Date().toISOString().slice(0, 10); setForm({ category: "주주총회", date: d, title: "", content: "", isPopup: false, popupStart: d, popupEnd: "" }); setMode("add"); };
  const startEdit = (n) => { setForm({ category: n.category, date: n.date, title: n.title, content: n.content, isPopup: !!n.isPopup, popupStart: n.popupStart || "", popupEnd: n.popupEnd || "" }); setEditId(n.id); setMode("edit"); };
  const cancelForm = () => { setMode("list"); setEditId(null); };

  const handleSave = async () => {
    if (!form.title.trim() || !form.content.trim() || !form.date) return;
    let next;
    if (mode === "add") {
      const newId = notices.length > 0 ? Math.max(...notices.map(n => n.id)) + 1 : 1;
      const item = { id: newId, ...form };
      if (form.isPopup) next = notices.map(n => ({ ...n, isPopup: false })).concat(item);
      else next = [...notices, item];
    } else {
      next = notices.map(n => {
        if (n.id === editId) return { ...n, ...form };
        if (form.isPopup && n.id !== editId) return { ...n, isPopup: false };
        return n;
      });
    }
    await save(next);
    setMode("list"); setEditId(null);
  };

  const handleDelete = async (id) => { await save(notices.filter(n => n.id !== id)); setConfirmDelete(null); };
  const togglePopup = async (id) => {
    const isCurrently = notices.find(n => n.id === id)?.isPopup;
    const next = notices.map(n => ({ ...n, isPopup: n.id === id ? !isCurrently : false }));
    await save(next);
  };

  // === PRESS handlers ===
  const scrapeUrl = async () => {
    if (!pForm.url.trim()) return;
    setScraping(true);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514", max_tokens: 1000,
          tools: [{ type: "web_search_20250305", name: "web_search" }],
          messages: [{ role: "user", content: `다음 URL의 뉴스 기사 정보를 추출해주세요: ${pForm.url}\n\nJSON으로만 응답하세요 (다른 텍스트 없이):\n{"title":"기사 제목","media":"언론사명","excerpt":"첫 문단 요약 (80자 이내)","date":"YYYY-MM-DD","image":"대표 이미지 URL 또는 빈 문자열"}` }]
        })
      });
      const data = await res.json();
      const text = data.content?.map(i => i.text || "").join("") || "";
      const clean = text.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(clean);
      setPForm(f => ({ ...f, ...parsed }));
    } catch (e) { console.error("Scrape failed:", e); }
    setScraping(false);
  };

  const pStartAdd = () => { setPForm({ url: "", media: "", title: "", excerpt: "", date: new Date().toISOString().slice(0, 10), image: "" }); setPMode("add"); };
  const pStartEdit = (p) => { setPForm({ url: p.url, media: p.media, title: p.title, excerpt: p.excerpt, date: p.date, image: p.image || "" }); setPEditId(p.id); setPMode("edit"); };
  const pCancel = () => { setPMode("list"); setPEditId(null); };

  const pHandleSave = async () => {
    if (!pForm.title.trim() || !pForm.media.trim()) return;
    let next;
    if (pMode === "add") {
      const newId = press.length > 0 ? Math.max(...press.map(p => p.id)) + 1 : 1;
      next = [...press, { id: newId, ...pForm }];
    } else {
      next = press.map(p => p.id === pEditId ? { ...p, ...pForm } : p);
    }
    await pSave(next);
    setPMode("list"); setPEditId(null);
  };

  const pHandleDelete = async (id) => { await pSave(press.filter(p => p.id !== id)); setPDel(null); };

  // === FAQ handlers ===
  const fStartAdd = () => { setFForm({ q: "", a: "", cat: FAQ_CATEGORIES[0] }); setFMode("add"); };
  const fStartEdit = (f) => { setFForm({ q: f.q, a: f.a, cat: f.cat }); setFEditId(f.id); setFMode("edit"); };
  const fCancel = () => { setFMode("list"); setFEditId(null); };
  const fHandleSave = async () => {
    if (!fForm.q.trim() || !fForm.a.trim()) return;
    let next;
    if (fMode === "add") {
      const newId = faqItems.length > 0 ? Math.max(...faqItems.map(f => f.id)) + 1 : 1;
      next = [...faqItems, { id: newId, ...fForm }];
    } else {
      next = faqItems.map(f => f.id === fEditId ? { ...f, ...fForm } : f);
    }
    await fSave(next);
    setFMode("list"); setFEditId(null);
  };
  const fHandleDelete = async (id) => { await fSave(faqItems.filter(f => f.id !== id)); setFDel(null); };

  // === HISTORY handlers ===
  const hStartAdd = () => { setHForm({ y: new Date().getFullYear().toString(), e: "", tg: HISTORY_CATEGORIES[0] }); setHMode("add"); };
  const hStartEdit = (h) => { setHForm({ y: h.y, e: h.e, tg: h.tg }); setHEditId(h.id); setHMode("edit"); };
  const hCancel = () => { setHMode("list"); setHEditId(null); };
  const hHandleSave = async () => {
    if (!hForm.y.trim() || !hForm.e.trim()) return;
    let next;
    if (hMode === "add") {
      const newId = histItems.length > 0 ? Math.max(...histItems.map(h => h.id)) + 1 : 1;
      next = [...histItems, { id: newId, ...hForm }].sort((a, b) => a.y.localeCompare(b.y));
    } else {
      next = histItems.map(h => h.id === hEditId ? { ...h, ...hForm } : h).sort((a, b) => a.y.localeCompare(b.y));
    }
    await hSave(next);
    setHMode("list"); setHEditId(null);
  };
  const hHandleDelete = async (id) => { await hSave(histItems.filter(h => h.id !== id)); setHDel(null); };

  // === MEMBER handlers ===
  const mStartAdd = () => { setMForm({ nm: "", rl: "", d: "", img: "" }); setMMode("add"); };
  const mStartEdit = (m) => { setMForm({ nm: m.nm, rl: m.rl, d: m.d, img: m.img || "" }); setMEditId(m.id); setMMode("edit"); };
  const mCancel = () => { setMMode("list"); setMEditId(null); };
  const mHandleSave = async () => {
    if (!mForm.nm.trim() || !mForm.rl.trim()) return;
    const isAdd = mMode === "add";
    let next;
    if (isAdd) {
      const newId = memberItems.length > 0 ? Math.max(...memberItems.map(m => m.id)) + 1 : 1;
      next = [...memberItems, { id: newId, ...mForm }];
    } else {
      next = memberItems.map(m => m.id === mEditId ? { ...m, ...mForm } : m);
    }
    await mSave(next);
    setMForm({ nm: "", rl: "", d: "", img: "" });
    setMMode("list"); setMEditId(null);
    if (isAdd) setMMsg("멤버가 추가되었습니다.");
  };
  const mHandleDelete = async (id) => { await mSave(memberItems.filter(m => m.id !== id)); setMDel(null); setMMsg("멤버가 삭제되었습니다."); };

  // === PARTNER handlers ===
  const ptStartAdd = () => { setPtForm({ nm: "", cat: PARTNER_CATEGORIES[0], logo: "" }); setPtMode("add"); };
  const ptStartEdit = (p) => { setPtForm({ nm: p.nm, cat: p.cat, logo: PARTNER_LOGOS[p.nm] || "" }); setPtEditId(p.id); setPtMode("edit"); };
  const ptCancel = () => { setPtMode("list"); setPtEditId(null); };
  const ptHandleSave = async () => {
    if (!ptForm.nm.trim()) return;
    let next;
    if (ptMode === "add") {
      const newId = partnerItems.length > 0 ? Math.max(...partnerItems.map(p => p.id)) + 1 : 1;
      next = [...partnerItems, { id: newId, nm: ptForm.nm, cat: ptForm.cat }];
    } else {
      next = partnerItems.map(p => p.id === ptEditId ? { ...p, nm: ptForm.nm, cat: ptForm.cat } : p);
    }
    await ptSave(next);
    setPtMode("list"); setPtEditId(null);
  };
  const ptHandleDelete = async (id) => { await ptSave(partnerItems.filter(p => p.id !== id)); setPtDel(null); };

  // === AWARDS handlers ===
  const awStartAdd = () => { setAwForm({ y: new Date().getFullYear().toString(), t: "", o: "" }); setAwMode("add"); };
  const awStartEdit = (a) => { setAwForm({ y: a.y, t: a.t, o: a.o }); setAwEditId(a.id); setAwMode("edit"); };
  const awCancel = () => { setAwMode("list"); setAwEditId(null); };
  const awHandleSave = async () => {
    if (!awForm.y.trim() || !awForm.t.trim()) return;
    let next;
    if (awMode === "add") {
      const newId = awardItems.length > 0 ? Math.max(...awardItems.map(a => a.id)) + 1 : 1;
      next = [...awardItems, { id: newId, ...awForm }].sort((a, b) => a.y.localeCompare(b.y));
    } else {
      next = awardItems.map(a => a.id === awEditId ? { ...a, ...awForm } : a).sort((a, b) => a.y.localeCompare(b.y));
    }
    await awSave(next);
    setAwMode("list"); setAwEditId(null);
  };
  const awHandleDelete = async (id) => { await awSave(awardItems.filter(a => a.id !== id)); setAwDel(null); };

  const fs = { fontSize: 13, color: "var(--tm)" };
  const lbl: React.CSSProperties = { fontSize: 12, fontWeight: 600, color: "var(--td)", marginBottom: 6, display: "block" };
  const inp: React.CSSProperties = { width: "100%", padding: "10px 14px", border: "1px solid #e2e8f0", borderRadius: 8, fontSize: 14, boxSizing: "border-box" };
  const tabStyle = (active) => ({ padding: "10px 20px", background: active ? "var(--br)" : "none", color: active ? "#fff" : "#64748b", border: active ? "none" : "1px solid #e2e8f0", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 6, transition: "all .2s" });

  // === FORM VIEW ===
  if (mode === "add" || mode === "edit") return <section style={{ padding: "140px 24px 96px", background: "#f1f5f9", minHeight: "100vh" }}>
    <div style={{ maxWidth: 680, margin: "0 auto" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
        <h1 style={{ fontFamily: "var(--fd)", fontWeight: 700, fontSize: 22 }}>{mode === "add" ? "새 공지 작성" : "공지 수정"}</h1>
        <button onClick={cancelForm} style={{ background: "none", border: "none", fontSize: 13, color: "#94a3b8", cursor: "pointer" }}>← 목록으로</button>
      </div>
      <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #e2e8f0", padding: 32 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
          <div>
            <label style={lbl}>분류 *</label>
            <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} style={inp}>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label style={lbl}>날짜 *</label>
            <input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} style={inp}/>
          </div>
        </div>
        <div style={{ marginBottom: 16 }}>
          <label style={lbl}>제목 *</label>
          <input type="text" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="공지 제목을 입력하세요" style={inp}/>
        </div>
        <div style={{ marginBottom: 20 }}>
          <label style={lbl}>내용 *</label>
          <textarea value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} placeholder="공지 내용을 입력하세요" rows={14} style={{ ...inp, resize: "vertical", lineHeight: 1.7, fontFamily: "inherit" }}/>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: form.isPopup ? 12 : 28, padding: "14px 16px", background: form.isPopup ? "rgba(168,149,134,.06)" : "#f8fafc", borderRadius: 8, border: `1px solid ${form.isPopup ? "var(--br)" : "#e2e8f0"}`, cursor: "pointer", transition: "all .2s" }}
          onClick={() => setForm({ ...form, isPopup: !form.isPopup })}>
          <div style={{ width: 38, height: 22, borderRadius: 11, background: form.isPopup ? "var(--br)" : "#cbd5e1", position: "relative", transition: "background .2s", flexShrink: 0 }}>
            <div style={{ width: 16, height: 16, borderRadius: "50%", background: "#fff", position: "absolute", top: 3, left: form.isPopup ? 19 : 3, transition: "left .2s", boxShadow: "0 1px 3px rgba(0,0,0,.2)" }}/>
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: "var(--td)" }}>홈 팝업으로 표시</div>
            <div style={{ fontSize: 11, color: "#94a3b8" }}>활성화하면 홈 페이지 진입 시 이 공지가 모달 팝업으로 표시됩니다</div>
          </div>
        </div>
        {form.isPopup && <div style={{ marginBottom: 28, padding: "16px", background: "#f8fafc", borderRadius: 8, border: "1px solid #e2e8f0" }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "var(--td)", marginBottom: 12, display: "flex", alignItems: "center", gap: 6 }}>
            <Calendar size={13} strokeWidth={2}/>팝업 노출 기간
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: 8, alignItems: "center" }}>
            <div>
              <label style={{ fontSize: 11, color: "#94a3b8", display: "block", marginBottom: 4 }}>시작일</label>
              <input type="date" value={form.popupStart} onChange={e => setForm({ ...form, popupStart: e.target.value })} style={{ ...inp, fontSize: 13 }}/>
            </div>
            <span style={{ fontSize: 12, color: "#cbd5e1", paddingTop: 16 }}>~</span>
            <div>
              <label style={{ fontSize: 11, color: "#94a3b8", display: "block", marginBottom: 4 }}>종료일</label>
              <input type="date" value={form.popupEnd} onChange={e => setForm({ ...form, popupEnd: e.target.value })} style={{ ...inp, fontSize: 13 }}/>
            </div>
          </div>
          <p style={{ fontSize: 11, color: "#94a3b8", marginTop: 8 }}>
            {form.popupStart && form.popupEnd
              ? `${form.popupStart} ~ ${form.popupEnd} (${Math.max(0, Math.ceil((new Date(form.popupEnd).getTime() - new Date(form.popupStart).getTime()) / 86400000) + 1)}일간 노출)`
              : form.popupStart ? `${form.popupStart}부터 종료일 미지정 (무기한 노출)` : "기간을 설정하지 않으면 팝업이 무기한 노출됩니다"}
          </p>
        </div>}
        <div style={{ display: "flex", gap: 12, justifyContent: "flex-end" }}>
          <button onClick={cancelForm} style={{ padding: "10px 24px", background: "none", border: "1px solid #e2e8f0", borderRadius: 8, fontSize: 14, cursor: "pointer", color: "#64748b" }}>취소</button>
          <button onClick={handleSave} style={{ padding: "10px 24px", background: "var(--br)", color: "#fff", border: "none", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
            <Save size={14} strokeWidth={2}/>{mode === "add" ? "등록" : "저장"}
          </button>
        </div>
      </div>
    </div>
  </section>;

  // === LIST VIEW ===
  const popupNotice = notices.find(n => n.isPopup);

  // === PARTNER FORM VIEW ===
  if (ptMode === "add" || ptMode === "edit") return <section style={{ padding: "140px 24px 96px", background: "#f1f5f9", minHeight: "100vh" }}>
    <div style={{ maxWidth: 680, margin: "0 auto" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
        <h1 style={{ fontFamily: "var(--fd)", fontWeight: 700, fontSize: 22 }}>{ptMode === "add" ? "파트너 추가" : "파트너 수정"}</h1>
        <button onClick={ptCancel} style={{ background: "none", border: "none", fontSize: 13, color: "#94a3b8", cursor: "pointer" }}>← 목록으로</button>
      </div>
      <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #e2e8f0", padding: 32 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
          <div><label style={lbl}>기업명 *</label><input value={ptForm.nm} onChange={e => setPtForm({ ...ptForm, nm: e.target.value })} placeholder="예: 한국투자AC" style={inp}/></div>
          <div><label style={lbl}>카테고리 *</label>
            <div style={{ display: "flex", gap: 8 }}>
              <select value={ptShowCustom ? "__custom__" : ptForm.cat} onChange={e => { if (e.target.value === "__custom__") { setPtShowCustom(true); } else { setPtShowCustom(false); setPtForm({ ...ptForm, cat: e.target.value }); } }} style={{ ...inp, cursor: "pointer" }}>
                {PARTNER_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                {[...new Set(partnerItems.map(p => p.cat))].filter(c => !PARTNER_CATEGORIES.includes(c as any)).map(c => <option key={c} value={c}>{c}</option>)}
                <option value="__custom__">+ 새 카테고리 입력...</option>
              </select>
            </div>
            {ptShowCustom && <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
              <input value={ptCustomCat} onChange={e => setPtCustomCat(e.target.value)} placeholder="새 카테고리명 입력" style={{ ...inp, flex: 1 }}/>
              <button onClick={() => { if (ptCustomCat.trim()) { setPtForm({ ...ptForm, cat: ptCustomCat.trim() }); setPtShowCustom(false); setPtCustomCat(""); } }} style={{ padding: "10px 16px", background: "var(--br)", color: "#fff", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" }}>추가</button>
              <button onClick={() => { setPtShowCustom(false); setPtCustomCat(""); }} style={{ padding: "10px 12px", background: "none", border: "1px solid #e2e8f0", borderRadius: 8, fontSize: 13, cursor: "pointer" }}>취소</button>
            </div>}
            {ptShowCustom && <p style={{ fontSize: 11, color: "#94a3b8", marginTop: 6 }}>현재 선택된 카테고리: <strong>{ptForm.cat}</strong></p>}
          </div>
        </div>
        <div style={{ marginBottom: 24 }}>
          <label style={lbl}>로고 이미지 URL</label>
          <input value={ptForm.logo} onChange={e => setPtForm({ ...ptForm, logo: e.target.value })} placeholder="https://... (비워두면 텍스트로 표시)" style={inp}/>
          <p style={{ fontSize: 11, color: "#94a3b8", marginTop: 6 }}>로고 이미지는 public/logos/ 폴더에 PNG 파일을 추가해 주세요</p>
        </div>
        {ptForm.logo && <div style={{ marginBottom: 20, padding: 16, background: "var(--alt)", borderRadius: 8, textAlign: "center" }}><img src={ptForm.logo} alt="미리보기" style={{ maxHeight: 32, objectFit: "contain" }}/></div>}
        <div style={{ display: "flex", gap: 12, justifyContent: "flex-end" }}>
          <button onClick={ptCancel} style={{ padding: "10px 20px", background: "none", border: "1px solid #e2e8f0", borderRadius: 8, fontSize: 14, cursor: "pointer" }}>취소</button>
          <button onClick={ptHandleSave} style={{ padding: "10px 24px", background: "var(--br)", color: "#fff", border: "none", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}><Save size={14}/>{ptMode === "add" ? "추가" : "저장"}</button>
        </div>
      </div>
    </div>
  </section>;

  // === MEMBER FORM VIEW ===
  if (mMode === "add" || mMode === "edit") return <section style={{ padding: "140px 24px 96px", background: "#f1f5f9", minHeight: "100vh" }}>
    <div style={{ maxWidth: 680, margin: "0 auto" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
        <h1 style={{ fontFamily: "var(--fd)", fontWeight: 700, fontSize: 22 }}>{mMode === "add" ? "멤버 추가" : "멤버 수정"}</h1>
        <button onClick={mCancel} style={{ background: "none", border: "none", fontSize: 13, color: "#94a3b8", cursor: "pointer" }}>← 목록으로</button>
      </div>
      <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #e2e8f0", padding: 32 }}>
        <div style={{ marginBottom: 20, textAlign: "center" }}>
          {mForm.img
            ? <img src={mForm.img} alt="미리보기" style={{ width: 80, height: 80, borderRadius: "50%", objectFit: "cover", border: "2px solid #e2e8f0", marginBottom: 8 }}/>
            : <div style={{ width: 80, height: 80, borderRadius: "50%", background: "#0f1929", margin: "0 auto 8px", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--fd)", fontWeight: 700, fontSize: 28, color: "#fff" }}>{mForm.nm ? mForm.nm[0] : "?"}</div>}
        </div>
        <div style={{ marginBottom: 16 }}>
          <label style={lbl}>사진 이미지 업로드</label>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <label style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 16px", border: "2px dashed #e2e8f0", borderRadius: 8, cursor: "pointer", background: "#fafafa", transition: "border-color .2s" }}
              onMouseEnter={e=>e.currentTarget.style.borderColor="var(--br)"} onMouseLeave={e=>e.currentTarget.style.borderColor="#e2e8f0"}>
              <input type="file" accept="image/*" style={{ display: "none" }} onChange={e => {
                const file = e.target.files?.[0];
                if (!file) return;
                const reader = new FileReader();
                reader.onload = ev => setMForm({ ...mForm, img: ev.target?.result as string });
                reader.readAsDataURL(file);
              }}/>
              <span style={{ fontSize: 20 }}>📷</span>
              <span style={{ fontSize: 13, color: "#64748b" }}>{mForm.img ? "다른 이미지로 변경하기" : "이미지 파일 선택 (JPG, PNG, WebP)"}</span>
            </label>
            {mForm.img && <button onClick={() => setMForm({ ...mForm, img: "" })} style={{ alignSelf: "flex-start", fontSize: 12, color: "#ef4444", background: "none", border: "none", cursor: "pointer", padding: 0 }}>✕ 이미지 제거</button>}
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
          <div><label style={lbl}>이름 *</label><input value={mForm.nm} onChange={e => setMForm({ ...mForm, nm: e.target.value })} placeholder="예: 홍길동" style={inp}/></div>
          <div><label style={lbl}>직책 *</label><input value={mForm.rl} onChange={e => setMForm({ ...mForm, rl: e.target.value })} placeholder="예: CTO · Co-Founder" style={inp}/></div>
        </div>
        <div style={{ marginBottom: 24 }}>
          <label style={lbl}>역할 설명</label>
          <input value={mForm.d} onChange={e => setMForm({ ...mForm, d: e.target.value })} placeholder="예: 백엔드 아키텍처 설계, 데이터 파이프라인 총괄" style={inp}/>
        </div>
        <div style={{ display: "flex", gap: 12, justifyContent: "flex-end" }}>
          <button onClick={mCancel} style={{ padding: "10px 20px", background: "none", border: "1px solid #e2e8f0", borderRadius: 8, fontSize: 14, cursor: "pointer" }}>취소</button>
          <button onClick={mHandleSave} style={{ padding: "10px 24px", background: "var(--br)", color: "#fff", border: "none", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}><Save size={14}/>{mMode === "add" ? "추가" : "저장"}</button>
        </div>
      </div>
    </div>
  </section>;

  // === HISTORY FORM VIEW ===
  if (hMode === "add" || hMode === "edit") return <section style={{ padding: "140px 24px 96px", background: "#f1f5f9", minHeight: "100vh" }}>
    <div style={{ maxWidth: 680, margin: "0 auto" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
        <h1 style={{ fontFamily: "var(--fd)", fontWeight: 700, fontSize: 22 }}>{hMode === "add" ? "히스토리 추가" : "히스토리 수정"}</h1>
        <button onClick={hCancel} style={{ background: "none", border: "none", fontSize: 13, color: "#94a3b8", cursor: "pointer" }}>← 목록으로</button>
      </div>
      <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #e2e8f0", padding: 32 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
          <div><label style={lbl}>연도 *</label><input value={hForm.y} onChange={e => setHForm({ ...hForm, y: e.target.value })} placeholder="예: 2025" style={inp}/></div>
          <div><label style={lbl}>카테고리 *</label>
            <div style={{ display: "flex", gap: 8 }}>
              <select value={hShowCustom ? "__custom__" : hForm.tg} onChange={e => { if (e.target.value === "__custom__") { setHShowCustom(true); } else { setHShowCustom(false); setHForm({ ...hForm, tg: e.target.value }); } }} style={{ ...inp, cursor: "pointer" }}>
                {HISTORY_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                {[...new Set(histItems.map(h => h.tg))].filter(c => !HISTORY_CATEGORIES.includes(c as any)).map(c => <option key={c} value={c}>{c}</option>)}
                <option value="__custom__">+ 새 카테고리 입력...</option>
              </select>
            </div>
            {hShowCustom && <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
              <input value={hCustomCat} onChange={e => setHCustomCat(e.target.value)} placeholder="새 카테고리명 입력" style={{ ...inp, flex: 1 }}/>
              <button onClick={() => { if (hCustomCat.trim()) { setHForm({ ...hForm, tg: hCustomCat.trim() }); setHShowCustom(false); setHCustomCat(""); } }} style={{ padding: "10px 16px", background: "var(--br)", color: "#fff", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" }}>추가</button>
              <button onClick={() => { setHShowCustom(false); setHCustomCat(""); }} style={{ padding: "10px 12px", background: "none", border: "1px solid #e2e8f0", borderRadius: 8, fontSize: 13, cursor: "pointer" }}>취소</button>
            </div>}
            {hShowCustom && <p style={{ fontSize: 11, color: "#94a3b8", marginTop: 6 }}>현재 선택된 카테고리: <strong>{hForm.tg}</strong></p>}
          </div>
        </div>
        <div style={{ marginBottom: 24 }}>
          <label style={lbl}>이벤트 내용 *</label>
          <input value={hForm.e} onChange={e => setHForm({ ...hForm, e: e.target.value })} placeholder="예: Series-A 29억 유치" style={inp}/>
        </div>
        <div style={{ display: "flex", gap: 12, justifyContent: "flex-end" }}>
          <button onClick={hCancel} style={{ padding: "10px 20px", background: "none", border: "1px solid #e2e8f0", borderRadius: 8, fontSize: 14, cursor: "pointer" }}>취소</button>
          <button onClick={hHandleSave} style={{ padding: "10px 24px", background: "var(--br)", color: "#fff", border: "none", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}><Save size={14}/>{hMode === "add" ? "추가" : "저장"}</button>
        </div>
      </div>
    </div>
  </section>;

  // === FAQ FORM VIEW ===
  if (fMode === "add" || fMode === "edit") return <section style={{ padding: "140px 24px 96px", background: "#f1f5f9", minHeight: "100vh" }}>
    <div style={{ maxWidth: 680, margin: "0 auto" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
        <h1 style={{ fontFamily: "var(--fd)", fontWeight: 700, fontSize: 22 }}>{fMode === "add" ? "FAQ 추가" : "FAQ 수정"}</h1>
        <button onClick={fCancel} style={{ background: "none", border: "none", fontSize: 13, color: "#94a3b8", cursor: "pointer" }}>← 목록으로</button>
      </div>
      <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #e2e8f0", padding: 32 }}>
        <div style={{ marginBottom: 16 }}>
          <label style={lbl}>카테고리 *</label>
          <div style={{ display: "flex", gap: 8 }}>
            <select value={fShowCustom ? "__custom__" : fForm.cat} onChange={e => { if (e.target.value === "__custom__") { setFShowCustom(true); } else { setFShowCustom(false); setFForm({ ...fForm, cat: e.target.value }); } }} style={{ ...inp, cursor: "pointer", flex: 1 }}>
              {FAQ_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              {/* dynamic cats from existing data */}
              {[...new Set(faqItems.map(f => f.cat))].filter(c => !FAQ_CATEGORIES.includes(c as any)).map(c => <option key={c} value={c}>{c}</option>)}
              <option value="__custom__">+ 새 카테고리 입력...</option>
            </select>
          </div>
          {fShowCustom && <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
            <input value={fCustomCat} onChange={e => setFCustomCat(e.target.value)} placeholder="새 카테고리명 입력" style={{ ...inp, flex: 1 }}/>
            <button onClick={() => { if (fCustomCat.trim()) { setFForm({ ...fForm, cat: fCustomCat.trim() }); setFShowCustom(false); setFCustomCat(""); } }} style={{ padding: "10px 16px", background: "var(--br)", color: "#fff", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" }}>추가</button>
            <button onClick={() => { setFShowCustom(false); setFCustomCat(""); }} style={{ padding: "10px 12px", background: "none", border: "1px solid #e2e8f0", borderRadius: 8, fontSize: 13, cursor: "pointer" }}>취소</button>
          </div>}
          {fShowCustom && <p style={{ fontSize: 11, color: "#94a3b8", marginTop: 6 }}>현재 선택된 카테고리: <strong>{fForm.cat}</strong></p>}
        </div>
        <div style={{ marginBottom: 16 }}>
          <label style={lbl}>질문 (Q) *</label>
          <input value={fForm.q} onChange={e => setFForm({ ...fForm, q: e.target.value })} placeholder="예: FlowPay란 무엇인가요?" style={inp}/>
        </div>
        <div style={{ marginBottom: 24 }}>
          <label style={lbl}>답변 (A) *</label>
          <textarea value={fForm.a} onChange={e => setFForm({ ...fForm, a: e.target.value })} placeholder="답변 내용을 입력하세요" rows={6} style={{ ...inp, resize: "vertical", lineHeight: 1.7, fontFamily: "inherit" }}/>
        </div>
        <div style={{ display: "flex", gap: 12, justifyContent: "flex-end" }}>
          <button onClick={fCancel} style={{ padding: "10px 20px", background: "none", border: "1px solid #e2e8f0", borderRadius: 8, fontSize: 14, cursor: "pointer" }}>취소</button>
          <button onClick={fHandleSave} style={{ padding: "10px 24px", background: "var(--br)", color: "#fff", border: "none", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}><Save size={14}/>{fMode === "add" ? "추가" : "저장"}</button>
        </div>
      </div>
    </div>
  </section>;

  // === PRESS FORM VIEW ===
  if (pMode === "add" || pMode === "edit") return <section style={{ padding: "140px 24px 96px", background: "#f1f5f9", minHeight: "100vh" }}>
    <div style={{ maxWidth: 680, margin: "0 auto" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
        <h1 style={{ fontFamily: "var(--fd)", fontWeight: 700, fontSize: 22 }}>{pMode === "add" ? "언론보도 등록" : "언론보도 수정"}</h1>
        <button onClick={pCancel} style={{ background: "none", border: "none", fontSize: 13, color: "#94a3b8", cursor: "pointer" }}>← 목록으로</button>
      </div>
      <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #e2e8f0", padding: 32 }}>
        <div style={{ marginBottom: 16 }}>
          <label style={lbl}>기사 URL</label>
          <div style={{ display: "flex", gap: 8 }}>
            <input type="url" value={pForm.url} onChange={e => setPForm({ ...pForm, url: e.target.value })} placeholder="https://..." style={{ ...inp, flex: 1 }}/>
            <button onClick={scrapeUrl} disabled={scraping || !pForm.url.trim()} style={{ padding: "10px 18px", background: "var(--br)", color: "#fff", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 6, opacity: scraping ? .6 : 1, whiteSpace: "nowrap" }}>
              {scraping ? <><Loader size={14} className="spin"/>스크래핑 중...</> : <><Globe size={14}/>스크래핑</>}
            </button>
          </div>
          <p style={{ fontSize: 11, color: "#94a3b8", marginTop: 6 }}>URL을 입력하고 스크래핑 버튼을 누르면 기사 정보가 자동으로 채워집니다</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
          <div><label style={lbl}>언론사명 *</label><input value={pForm.media} onChange={e => setPForm({ ...pForm, media: e.target.value })} placeholder="예: 한국경제" style={inp}/></div>
          <div><label style={lbl}>보도일자 *</label><input type="date" value={pForm.date} onChange={e => setPForm({ ...pForm, date: e.target.value })} style={inp}/></div>
        </div>
        <div style={{ marginBottom: 16 }}><label style={lbl}>기사 제목 *</label><input value={pForm.title} onChange={e => setPForm({ ...pForm, title: e.target.value })} placeholder="기사 제목" style={inp}/></div>
        <div style={{ marginBottom: 16 }}><label style={lbl}>요약 (첫 문단)</label><textarea value={pForm.excerpt} onChange={e => setPForm({ ...pForm, excerpt: e.target.value })} placeholder="기사 요약 내용" rows={3} style={{ ...inp, resize: "vertical", lineHeight: 1.7, fontFamily: "inherit" }}/></div>
        <div style={{ marginBottom: 24 }}><label style={lbl}>썸네일 이미지 URL</label><input value={pForm.image} onChange={e => setPForm({ ...pForm, image: e.target.value })} placeholder="https://..." style={inp}/></div>
        {pForm.image && <div style={{ marginBottom: 20, borderRadius: 8, overflow: "hidden", border: "1px solid #e2e8f0" }}><img src={pForm.image} alt="미리보기" style={{ width: "100%", height: 140, objectFit: "cover" }}/></div>}
        <div style={{ display: "flex", gap: 12, justifyContent: "flex-end" }}>
          <button onClick={pCancel} style={{ padding: "10px 20px", background: "none", border: "1px solid #e2e8f0", borderRadius: 8, fontSize: 14, cursor: "pointer" }}>취소</button>
          <button onClick={pHandleSave} style={{ padding: "10px 24px", background: "var(--br)", color: "#fff", border: "none", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}><Save size={14}/>{pMode === "add" ? "등록" : "저장"}</button>
        </div>
      </div>
    </div>
  </section>;

  // === AWARDS FORM VIEW ===
  if (awMode === "add" || awMode === "edit") return <section style={{ padding: "140px 24px 96px", background: "#f1f5f9", minHeight: "100vh" }}>
    <div style={{ maxWidth: 680, margin: "0 auto" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
        <h1 style={{ fontFamily: "var(--fd)", fontWeight: 700, fontSize: 22 }}>{awMode === "add" ? "수상 실적 추가" : "수상 실적 수정"}</h1>
        <button onClick={awCancel} style={{ background: "none", border: "none", fontSize: 13, color: "#94a3b8", cursor: "pointer" }}>← 목록으로</button>
      </div>
      <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #e2e8f0", padding: 32 }}>
        <div style={{ display: "grid", gridTemplateColumns: "120px 1fr", gap: 16, marginBottom: 16 }}>
          <div>
            <label style={lbl}>연도 *</label>
            <input type="number" value={awForm.y} onChange={e => setAwForm({ ...awForm, y: e.target.value })} placeholder="2026" style={inp}/>
          </div>
          <div>
            <label style={lbl}>수상명 *</label>
            <input value={awForm.t} onChange={e => setAwForm({ ...awForm, t: e.target.value })} placeholder="예: 과기정통부 장관상" style={inp}/>
          </div>
        </div>
        <div style={{ marginBottom: 24 }}>
          <label style={lbl}>수여 기관 / 설명</label>
          <input value={awForm.o} onChange={e => setAwForm({ ...awForm, o: e.target.value })} placeholder="예: K-Global 창업멘토링 우수멘티" style={inp}/>
        </div>
        <div style={{ display: "flex", gap: 12, justifyContent: "flex-end" }}>
          <button onClick={awCancel} style={{ padding: "10px 20px", background: "none", border: "1px solid #e2e8f0", borderRadius: 8, fontSize: 14, cursor: "pointer" }}>취소</button>
          <button onClick={awHandleSave} style={{ padding: "10px 24px", background: "var(--br)", color: "#fff", border: "none", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}><Save size={14}/>{awMode === "add" ? "추가" : "저장"}</button>
        </div>
      </div>
    </div>
  </section>;

  return <section style={{ padding: "140px 24px 96px", background: "#f1f5f9", minHeight: "100vh" }}>
    <div style={{ maxWidth: 900, margin: "0 auto" }}>
      {/* Header + Tabs */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20, flexWrap: "wrap", gap: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Settings size={20} strokeWidth={1.5} color="var(--br)"/>
          <h1 style={{ fontFamily: "var(--fd)", fontWeight: 700, fontSize: 24 }}>관리자</h1>
        </div>
        <button onClick={() => setPage("home")} style={{ padding: "9px 16px", background: "none", border: "1px solid #e2e8f0", borderRadius: 8, fontSize: 13, cursor: "pointer", color: "#64748b", display: "flex", alignItems: "center", gap: 5 }}><Eye size={13}/>사이트 보기</button>
      </div>
      <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
        <button onClick={() => setTab("notices")} style={tabStyle(tab === "notices")}><Bell size={14}/>공지사항 ({notices.length})</button>
        <button onClick={() => setTab("press")} style={tabStyle(tab === "press")}><Globe size={14}/>언론보도 ({press.length})</button>
        <button onClick={() => setTab("faq")} style={tabStyle(tab === "faq")}><MessageCircle size={14}/>FAQ ({faqItems.length})</button>
        <button onClick={() => setTab("history")} style={tabStyle(tab === "history")}><Clock size={14}/>연혁 ({histItems.length})</button>
        <button onClick={() => setTab("members")} style={tabStyle(tab === "members")}><Users size={14}/>멤버 ({memberItems.length})</button>
        <button onClick={() => setTab("partners")} style={tabStyle(tab === "partners")}><Building2 size={14}/>파트너 ({partnerItems.length})</button>
        <button onClick={() => setTab("awards")} style={tabStyle(tab === "awards")}>🏆 수상 ({awardItems.length})</button>
      </div>

      {/* === NOTICES TAB === */}
      {tab === "notices" && <>
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 16 }}>
          <button onClick={startAdd} style={{ padding: "9px 16px", background: "var(--br)", color: "#fff", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 5 }}><Plus size={14}/>새 공지</button>
        </div>

      {/* Popup Status Card */}
      {(() => {
        const today = new Date().toISOString().slice(0, 10);
        const isActive = popupNotice && (!popupNotice.popupStart || popupNotice.popupStart <= today) && (!popupNotice.popupEnd || popupNotice.popupEnd >= today);
        const isScheduled = popupNotice && popupNotice.popupStart && popupNotice.popupStart > today;
        const isExpired = popupNotice && popupNotice.popupEnd && popupNotice.popupEnd < today;
        return <div style={{ background: "#fff", borderRadius: 12, border: `1px solid ${isActive ? "rgba(34,197,94,.3)" : "#e2e8f0"}`, padding: "20px 24px", marginBottom: 20 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: isActive ? "#22c55e" : isScheduled ? "#facc15" : popupNotice ? "#94a3b8" : "#e2e8f0", flexShrink: 0 }}/>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "var(--td)" }}>홈 팝업 {isActive ? "노출 중" : isScheduled ? "예약됨" : isExpired ? "기간 만료" : popupNotice ? "설정됨" : "비활성"}</div>
                <div style={{ fontSize: 12, color: "#94a3b8" }}>
                  {popupNotice
                    ? `"${popupNotice.title}" · ${popupNotice.popupStart || "시작일 없음"} ~ ${popupNotice.popupEnd || "종료일 없음"}`
                    : "팝업이 표시되지 않습니다"}
                </div>
              </div>
            </div>
            {popupNotice && <button onClick={() => setPreview(popupNotice)} style={{ padding: "7px 14px", background: "none", border: "1px solid #e2e8f0", borderRadius: 6, fontSize: 12, cursor: "pointer", color: "#64748b" }}>미리보기</button>}
          </div>
        </div>;
      })()}

      {/* Table */}
      <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #e2e8f0", overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: "70px 1fr 90px 60px 100px", padding: "12px 20px", borderBottom: "1px solid #e2e8f0", background: "#f8fafc" }}>
          {["분류", "제목", "날짜", "팝업", "관리"].map(h => <span key={h} style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase" }}>{h}</span>)}
        </div>
        {!loaded ? <div style={{ padding: 32, textAlign: "center", ...fs }}>불러오는 중...</div> :
          notices.length === 0 ? <div style={{ padding: 48, textAlign: "center", ...fs }}>등록된 공지가 없습니다. "새 공지" 버튼으로 첫 공지를 작성하세요.</div> :
          notices.sort((a, b) => b.date.localeCompare(a.date)).map(n => (
            <div key={n.id} style={{ display: "grid", gridTemplateColumns: "70px 1fr 90px 60px 100px", padding: "14px 20px", borderBottom: "1px solid #f1f5f9", alignItems: "center" }}>
              <span style={{ fontSize: 11, color: "var(--br)", fontWeight: 600, background: "rgba(168,149,134,.08)", padding: "2px 6px", borderRadius: 4, justifySelf: "start" }}>{n.category}</span>
              <span style={{ fontSize: 13, fontWeight: 500, color: "var(--td)", paddingRight: 12, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{n.title}</span>
              <span style={{ fontSize: 12, color: "#94a3b8", fontFamily: "var(--fm)" }}>{n.date}</span>
              <div style={{ justifySelf: "center" }}>
                {(() => {
                  const today = new Date().toISOString().slice(0, 10);
                  const active = n.isPopup && (!n.popupStart || n.popupStart <= today) && (!n.popupEnd || n.popupEnd >= today);
                  return <div onClick={() => togglePopup(n.id)} title={n.isPopup ? `${n.popupStart||"?"} ~ ${n.popupEnd||"무기한"}` : "클릭하여 팝업 활성화"} style={{ width: 34, height: 20, borderRadius: 10, background: active ? "#22c55e" : n.isPopup ? "#facc15" : "#e2e8f0", position: "relative", cursor: "pointer", transition: "background .2s" }}>
                    <div style={{ width: 14, height: 14, borderRadius: "50%", background: "#fff", position: "absolute", top: 3, left: n.isPopup ? 17 : 3, transition: "left .2s", boxShadow: "0 1px 2px rgba(0,0,0,.15)" }}/>
                  </div>;
                })()}
              </div>
              <div style={{ display: "flex", gap: 4 }}>
                <button onClick={() => setPreview(n)} style={{ padding: "5px 7px", background: "none", border: "1px solid #e2e8f0", borderRadius: 6, cursor: "pointer", display: "flex" }} title="미리보기"><Eye size={13} color="#94a3b8"/></button>
                <button onClick={() => startEdit(n)} style={{ padding: "5px 7px", background: "none", border: "1px solid #e2e8f0", borderRadius: 6, cursor: "pointer", display: "flex" }} title="수정"><Edit3 size={13} color="#64748b"/></button>
                <button onClick={() => setConfirmDelete(n.id)} style={{ padding: "5px 7px", background: "none", border: "1px solid #fecaca", borderRadius: 6, cursor: "pointer", display: "flex" }} title="삭제"><Trash2 size={13} color="#f87171"/></button>
              </div>
            </div>
          ))
        }
      </div>
      <div style={{ marginTop: 16, fontSize: 11, color: "#cbd5e1", textAlign: "center" }}>276홀딩스 공지사항 관리 시스템 · 데이터는 브라우저 스토리지에 저장됩니다</div>
      </>}

      {/* === PRESS TAB === */}
      {tab === "press" && <>
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 16 }}>
          <button onClick={pStartAdd} style={{ padding: "9px 16px", background: "var(--br)", color: "#fff", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 5 }}><Plus size={14}/>언론보도 등록</button>
        </div>
        <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #e2e8f0", overflow: "hidden" }}>
          <div style={{ display: "grid", gridTemplateColumns: "100px 1fr 100px 60px", padding: "12px 20px", borderBottom: "1px solid #e2e8f0", background: "#f8fafc" }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: "#64748b" }}>언론사</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: "#64748b" }}>제목</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: "#64748b", textAlign: "center" }}>보도일</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: "#64748b", textAlign: "center" }}>관리</span>
          </div>
          {press.length === 0 && <div style={{ padding: 40, textAlign: "center", color: "#94a3b8", fontSize: 14 }}>등록된 언론보도가 없습니다</div>}
          {press.map(p => (
            <div key={p.id} style={{ display: "grid", gridTemplateColumns: "100px 1fr 100px 60px", padding: "14px 20px", borderBottom: "1px solid #f1f5f9", alignItems: "center" }}>
              <span style={{ fontSize: 12, color: "var(--br)", fontWeight: 600 }}>{p.media}</span>
              <div>
                <div style={{ fontSize: 14, color: "var(--td)", fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.title}</div>
                {p.url && <a href={p.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: 11, color: "#94a3b8", textDecoration: "none" }}>{p.url.length > 50 ? p.url.slice(0, 50) + "…" : p.url}</a>}
              </div>
              <span style={{ fontSize: 12, color: "#64748b", textAlign: "center", fontFamily: "var(--fm)" }}>{p.date}</span>
              <div style={{ display: "flex", gap: 6, justifyContent: "center" }}>
                <button onClick={() => pStartEdit(p)} title="수정" style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}><Edit3 size={14} color="#64748b"/></button>
                <button onClick={() => setPDel(p.id)} title="삭제" style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}><Trash2 size={14} color="#f87171"/></button>
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 16, fontSize: 11, color: "#cbd5e1", textAlign: "center" }}>276홀딩스 언론보도 관리 · URL 스크래핑으로 자동 입력 지원</div>
      </>}

      {/* === FAQ TAB === */}
      {tab === "faq" && <>
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 16 }}>
          <button onClick={fStartAdd} style={{ padding: "9px 16px", background: "var(--br)", color: "#fff", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 5 }}><Plus size={14}/>FAQ 추가</button>
        </div>
        {FAQ_CATEGORIES.map(cat => {
          const items = faqItems.filter(f => f.cat === cat);
          if (items.length === 0) return null;
          return <div key={cat} style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "var(--br)", marginBottom: 8, padding: "6px 12px", background: "rgba(168,149,134,.06)", borderRadius: 6, display: "inline-block" }}>{cat} ({items.length})</div>
            <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #e2e8f0", overflow: "hidden" }}>
              {items.map((f, fi) => (
                <div key={f.id} style={{ padding: "14px 20px", borderBottom: fi < items.length - 1 ? "1px solid #f1f5f9" : "none", display: "flex", alignItems: "flex-start", gap: 12 }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "var(--td)", marginBottom: 4 }}>Q. {f.q}</div>
                    <div style={{ fontSize: 12, color: "#94a3b8", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{f.a.length > 80 ? f.a.slice(0, 80) + "…" : f.a}</div>
                  </div>
                  <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                    <button onClick={() => fStartEdit(f)} title="수정" style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}><Edit3 size={14} color="#64748b"/></button>
                    <button onClick={() => setFDel(f.id)} title="삭제" style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}><Trash2 size={14} color="#f87171"/></button>
                  </div>
                </div>
              ))}
            </div>
          </div>;
        })}
        <div style={{ marginTop: 16, fontSize: 11, color: "#cbd5e1", textAlign: "center" }}>276홀딩스 FAQ 관리 · 카테고리: {FAQ_CATEGORIES.join(", ")}</div>
      </>}

      {/* === HISTORY TAB === */}
      {tab === "history" && <>
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 16 }}>
          <button onClick={hStartAdd} style={{ padding: "9px 16px", background: "var(--br)", color: "#fff", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 5 }}><Plus size={14}/>연혁 추가</button>
        </div>
        {(() => {
          const years = [...new Set(histItems.map(h => h.y))].sort();
          return years.map(yr => {
            const items = histItems.filter(h => h.y === yr);
            return <div key={yr} style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: "var(--ny)", marginBottom: 8, fontFamily: "var(--fd)" }}>{yr}</div>
              <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #e2e8f0", overflow: "hidden" }}>
                {items.map((h, hi) => (
                  <div key={h.id} style={{ padding: "12px 20px", borderBottom: hi < items.length - 1 ? "1px solid #f1f5f9" : "none", display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ fontFamily: "var(--fm)", fontSize: 11, padding: "3px 8px", borderRadius: 4, background: h.tg === "투자" ? "rgba(168,149,134,.1)" : h.tg === "수상" ? "rgba(16,185,129,.08)" : "var(--alt)", color: h.tg === "투자" ? "var(--br)" : h.tg === "수상" ? "var(--gn)" : "var(--tm)", fontWeight: 600, flexShrink: 0, minWidth: 40, textAlign: "center" }}>{h.tg}</span>
                    <div style={{ flex: 1, fontSize: 14, color: "var(--td)", fontWeight: 500 }}>{h.e}</div>
                    <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                      <button onClick={() => hStartEdit(h)} title="수정" style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}><Edit3 size={14} color="#64748b"/></button>
                      <button onClick={() => setHDel(h.id)} title="삭제" style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}><Trash2 size={14} color="#f87171"/></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>;
          });
        })()}
        <div style={{ marginTop: 16, fontSize: 11, color: "#cbd5e1", textAlign: "center" }}>276홀딩스 연혁 관리 · 한 해에 복수 이벤트 등록 가능</div>
      </>}

      {/* === MEMBERS TAB === */}
      {tab === "members" && <>
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 16 }}>
          <button onClick={mStartAdd} style={{ padding: "9px 16px", background: "var(--br)", color: "#fff", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 5 }}><Plus size={14}/>멤버 추가</button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 16 }}>
          {memberItems.map((m, mi) => (
            <div key={m.id} style={{ background: "#fff", borderRadius: 12, border: "1px solid #e2e8f0", padding: "24px 20px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", position: "relative" }}>
              <div style={{ position: "absolute", top: 12, right: 12, display: "flex", gap: 4 }}>
                <button onClick={() => mStartEdit(m)} title="수정" style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}><Edit3 size={13} color="#64748b"/></button>
                <button onClick={() => setMDel(m.id)} title="삭제" style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}><Trash2 size={13} color="#f87171"/></button>
              </div>
              {m.img
                ? <img src={m.img} alt={m.nm} style={{ width: 56, height: 56, borderRadius: "50%", objectFit: "cover", marginBottom: 12 }}/>
                : <div style={{ width: 56, height: 56, borderRadius: "50%", background: ["#0f1929","#132240","#1a2844","#1f3050"][mi%4], display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--fd)", fontWeight: 700, fontSize: 20, color: "#fff", marginBottom: 12 }}>{m.nm[0]}</div>}
              <div style={{ fontSize: 16, fontWeight: 700, color: "var(--td)" }}>{m.nm}</div>
              <div style={{ fontSize: 12, color: "var(--br)", fontWeight: 600, marginTop: 4, fontFamily: "var(--fd)" }}>{m.rl}</div>
              {m.d && <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 8, lineHeight: 1.5 }}>{m.d}</div>}
            </div>
          ))}
        </div>
        <div style={{ marginTop: 16, fontSize: 11, color: "#cbd5e1", textAlign: "center" }}>276홀딩스 멤버 관리 · 사진 URL, 이름, 직책, 역할</div>
      </>}

      {/* === PARTNERS TAB === */}
      {tab === "partners" && <>
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 16 }}>
          <button onClick={ptStartAdd} style={{ padding: "9px 16px", background: "var(--br)", color: "#fff", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 5 }}><Plus size={14}/>파트너 추가</button>
        </div>
        {PARTNER_CATEGORIES.map(cat => {
          const items = partnerItems.filter(p => p.cat === cat);
          if (items.length === 0) return null;
          return <div key={cat} style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "var(--br)", marginBottom: 8, padding: "6px 12px", background: "rgba(168,149,134,.06)", borderRadius: 6, display: "inline-flex", alignItems: "center", gap: 6 }}>{cat} <span style={{ fontSize: 10, color: "#94a3b8" }}>({items.length})</span></div>
            <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #e2e8f0", overflow: "hidden" }}>
              {items.map((p, pi) => (
                <div key={p.id} style={{ padding: "12px 20px", borderBottom: pi < items.length - 1 ? "1px solid #f1f5f9" : "none", display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 36, height: 24, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    {PARTNER_LOGOS[p.nm] ? <img src={PARTNER_LOGOS[p.nm]} alt={p.nm} style={{ maxWidth: 36, maxHeight: 20, objectFit: "contain" }}/> : <Building2 size={16} color="#cbd5e1"/>}
                  </div>
                  <div style={{ flex: 1, fontSize: 14, fontWeight: 500, color: "var(--td)" }}>{p.nm}</div>
                  <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                    <button onClick={() => ptStartEdit(p)} title="수정" style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}><Edit3 size={14} color="#64748b"/></button>
                    <button onClick={() => setPtDel(p.id)} title="삭제" style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}><Trash2 size={14} color="#f87171"/></button>
                  </div>
                </div>
              ))}
            </div>
          </div>;
        })}
        <div style={{ marginTop: 16, fontSize: 11, color: "#cbd5e1", textAlign: "center" }}>276홀딩스 파트너 관리 · 카테고리: {PARTNER_CATEGORIES.join(", ")}</div>
      </>}

      {/* === AWARDS TAB === */}
      {tab === "awards" && <>
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 16 }}>
          <button onClick={awStartAdd} style={{ padding: "9px 16px", background: "var(--br)", color: "#fff", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 5 }}><Plus size={14}/>수상 추가</button>
        </div>
        {!awLoaded ? <div style={{ padding: 32, textAlign: "center", ...fs }}>불러오는 중...</div> :
          awardItems.length === 0 ? <div style={{ padding: 48, textAlign: "center", ...fs }}>등록된 수상 실적이 없습니다.</div> : (() => {
            const years = [...new Set(awardItems.map(a => a.y))].sort((a,b) => b.localeCompare(a));
            return years.map(yr => {
              const items = awardItems.filter(a => a.y === yr);
              return <div key={yr} style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: "var(--ny)", marginBottom: 8, fontFamily: "var(--fd)" }}>{yr}</div>
                <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #e2e8f0", overflow: "hidden" }}>
                  {items.map((a, ai) => (
                    <div key={a.id} style={{ padding: "14px 20px", borderBottom: ai < items.length - 1 ? "1px solid #f1f5f9" : "none", display: "flex", alignItems: "center", gap: 12 }}>
                      <div style={{ width: 36, height: 22, background: "linear-gradient(135deg,var(--bw),var(--br))", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, flexShrink: 0 }}>🏆</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 14, fontWeight: 600, color: "var(--td)" }}>{a.t}</div>
                        <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 2 }}>{a.o}</div>
                      </div>
                      <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                        <button onClick={() => awStartEdit(a)} title="수정" style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}><Edit3 size={14} color="#64748b"/></button>
                        <button onClick={() => setAwDel(a.id)} title="삭제" style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}><Trash2 size={14} color="#f87171"/></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>;
            });
          })()
        }
        <div style={{ marginTop: 16, fontSize: 11, color: "#cbd5e1", textAlign: "center" }}>수상 실적은 홈페이지 AWARDS & RECOGNITION 섹션에 반영됩니다</div>
      </>}
    </div>

    {/* Delete Confirmation Modal */}
    {confirmDelete && <>
      <div onClick={() => setConfirmDelete(null)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.4)", zIndex: 9998, animation: "fadeIn .2s ease" }}/>
      <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%,-50%)", background: "#fff", borderRadius: 12, padding: 32, width: "min(360px, calc(100vw - 40px))", zIndex: 9999, textAlign: "center", boxShadow: "0 20px 60px rgba(0,0,0,.2)" }}>
        <Trash2 size={28} strokeWidth={1.2} color="#f87171" style={{ marginBottom: 12 }}/>
        <h3 style={{ fontFamily: "var(--fd)", fontWeight: 700, fontSize: 18, marginBottom: 8 }}>공지 삭제</h3>
        <p style={{ fontSize: 13, color: "#94a3b8", marginBottom: 24 }}>삭제된 공지는 복구할 수 없습니다.<br/>정말 삭제하시겠습니까?</p>
        <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
          <button onClick={() => setConfirmDelete(null)} style={{ padding: "10px 24px", background: "none", border: "1px solid #e2e8f0", borderRadius: 8, fontSize: 14, cursor: "pointer" }}>취소</button>
          <button onClick={() => handleDelete(confirmDelete)} style={{ padding: "10px 24px", background: "#ef4444", color: "#fff", border: "none", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>삭제</button>
        </div>
      </div>
    </>}

    {/* Press Delete Confirmation Modal */}
    {pDel && <>
      <div onClick={() => setPDel(null)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.4)", zIndex: 9998, animation: "fadeIn .2s ease" }}/>
      <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%,-50%)", background: "#fff", borderRadius: 12, padding: 32, width: "min(360px, calc(100vw - 40px))", zIndex: 9999, textAlign: "center", boxShadow: "0 20px 60px rgba(0,0,0,.2)" }}>
        <Trash2 size={28} strokeWidth={1.2} color="#f87171" style={{ marginBottom: 12 }}/>
        <h3 style={{ fontFamily: "var(--fd)", fontWeight: 700, fontSize: 18, marginBottom: 8 }}>언론보도 삭제</h3>
        <p style={{ fontSize: 13, color: "#94a3b8", marginBottom: 24 }}>삭제된 언론보도는 복구할 수 없습니다.<br/>정말 삭제하시겠습니까?</p>
        <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
          <button onClick={() => setPDel(null)} style={{ padding: "10px 24px", background: "none", border: "1px solid #e2e8f0", borderRadius: 8, fontSize: 14, cursor: "pointer" }}>취소</button>
          <button onClick={() => pHandleDelete(pDel)} style={{ padding: "10px 24px", background: "#ef4444", color: "#fff", border: "none", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>삭제</button>
        </div>
      </div>
    </>}

    {/* FAQ Delete Confirmation Modal */}
    {fDel && <>
      <div onClick={() => setFDel(null)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.4)", zIndex: 9998, animation: "fadeIn .2s ease" }}/>
      <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%,-50%)", background: "#fff", borderRadius: 12, padding: 32, width: "min(360px, calc(100vw - 40px))", zIndex: 9999, textAlign: "center", boxShadow: "0 20px 60px rgba(0,0,0,.2)" }}>
        <Trash2 size={28} strokeWidth={1.2} color="#f87171" style={{ marginBottom: 12 }}/>
        <h3 style={{ fontFamily: "var(--fd)", fontWeight: 700, fontSize: 18, marginBottom: 8 }}>FAQ 삭제</h3>
        <p style={{ fontSize: 13, color: "#94a3b8", marginBottom: 24 }}>삭제된 FAQ는 복구할 수 없습니다.<br/>정말 삭제하시겠습니까?</p>
        <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
          <button onClick={() => setFDel(null)} style={{ padding: "10px 24px", background: "none", border: "1px solid #e2e8f0", borderRadius: 8, fontSize: 14, cursor: "pointer" }}>취소</button>
          <button onClick={() => fHandleDelete(fDel)} style={{ padding: "10px 24px", background: "#ef4444", color: "#fff", border: "none", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>삭제</button>
        </div>
      </div>
    </>}

    {/* History Delete Confirmation Modal */}
    {hDel && <>
      <div onClick={() => setHDel(null)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.4)", zIndex: 9998, animation: "fadeIn .2s ease" }}/>
      <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%,-50%)", background: "#fff", borderRadius: 12, padding: 32, width: "min(360px, calc(100vw - 40px))", zIndex: 9999, textAlign: "center", boxShadow: "0 20px 60px rgba(0,0,0,.2)" }}>
        <Trash2 size={28} strokeWidth={1.2} color="#f87171" style={{ marginBottom: 12 }}/>
        <h3 style={{ fontFamily: "var(--fd)", fontWeight: 700, fontSize: 18, marginBottom: 8 }}>연혁 삭제</h3>
        <p style={{ fontSize: 13, color: "#94a3b8", marginBottom: 24 }}>삭제된 연혁은 복구할 수 없습니다.<br/>정말 삭제하시겠습니까?</p>
        <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
          <button onClick={() => setHDel(null)} style={{ padding: "10px 24px", background: "none", border: "1px solid #e2e8f0", borderRadius: 8, fontSize: 14, cursor: "pointer" }}>취소</button>
          <button onClick={() => hHandleDelete(hDel)} style={{ padding: "10px 24px", background: "#ef4444", color: "#fff", border: "none", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>삭제</button>
        </div>
      </div>
    </>}

    {/* Member Delete Confirmation Modal */}
    {mDel && <>
      <div onClick={() => setMDel(null)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.4)", zIndex: 9998, animation: "fadeIn .2s ease" }}/>
      <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%,-50%)", background: "#fff", borderRadius: 12, padding: 32, width: "min(360px, calc(100vw - 40px))", zIndex: 9999, textAlign: "center", boxShadow: "0 20px 60px rgba(0,0,0,.2)" }}>
        <Trash2 size={28} strokeWidth={1.2} color="#f87171" style={{ marginBottom: 12 }}/>
        <h3 style={{ fontFamily: "var(--fd)", fontWeight: 700, fontSize: 18, marginBottom: 8 }}>멤버 삭제</h3>
        <p style={{ fontSize: 13, color: "#94a3b8", marginBottom: 24 }}>삭제된 멤버는 복구할 수 없습니다.<br/>정말 삭제하시겠습니까?</p>
        <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
          <button onClick={() => setMDel(null)} style={{ padding: "10px 24px", background: "none", border: "1px solid #e2e8f0", borderRadius: 8, fontSize: 14, cursor: "pointer" }}>취소</button>
          <button onClick={() => mHandleDelete(mDel)} style={{ padding: "10px 24px", background: "#ef4444", color: "#fff", border: "none", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>삭제</button>
        </div>
      </div>
    </>}

    {/* Member Message Modal */}
    {mMsg && <>
      <div onClick={() => setMMsg(null)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.4)", zIndex: 9998, animation: "fadeIn .2s ease" }}/>
      <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%,-50%)", background: "#fff", borderRadius: 12, padding: 32, width: "min(360px, calc(100vw - 40px))", zIndex: 9999, textAlign: "center", boxShadow: "0 20px 60px rgba(0,0,0,.2)", animation: "fadeUp .3s cubic-bezier(.16,1,.3,1)" }}>
        <CheckCircle2 size={28} strokeWidth={1.2} color="var(--br)" style={{ marginBottom: 12 }}/>
        <p style={{ fontSize: 15, fontWeight: 600, color: "var(--td)", marginBottom: 24 }}>{mMsg}</p>
        <button onClick={() => setMMsg(null)} style={{ padding: "10px 32px", background: "var(--br)", color: "#fff", border: "none", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>확인</button>
      </div>
    </>}

    {/* Awards Delete Confirmation Modal */}
    {awDel && <>
      <div onClick={() => setAwDel(null)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.4)", zIndex: 9998, animation: "fadeIn .2s ease" }}/>
      <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%,-50%)", background: "#fff", borderRadius: 12, padding: 32, width: "min(360px, calc(100vw - 40px))", zIndex: 9999, textAlign: "center", boxShadow: "0 20px 60px rgba(0,0,0,.2)" }}>
        <Trash2 size={28} strokeWidth={1.2} color="#f87171" style={{ marginBottom: 12 }}/>
        <h3 style={{ fontFamily: "var(--fd)", fontWeight: 700, fontSize: 18, marginBottom: 8 }}>수상 실적 삭제</h3>
        <p style={{ fontSize: 13, color: "#94a3b8", marginBottom: 24 }}>삭제된 수상 실적은 복구할 수 없습니다.<br/>정말 삭제하시겠습니까?</p>
        <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
          <button onClick={() => setAwDel(null)} style={{ padding: "10px 24px", background: "none", border: "1px solid #e2e8f0", borderRadius: 8, fontSize: 14, cursor: "pointer" }}>취소</button>
          <button onClick={() => awHandleDelete(awDel)} style={{ padding: "10px 24px", background: "#ef4444", color: "#fff", border: "none", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>삭제</button>
        </div>
      </div>
    </>}

    {/* Partner Delete Confirmation Modal */}
    {ptDel && <>
      <div onClick={() => setPtDel(null)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.4)", zIndex: 9998, animation: "fadeIn .2s ease" }}/>
      <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%,-50%)", background: "#fff", borderRadius: 12, padding: 32, width: "min(360px, calc(100vw - 40px))", zIndex: 9999, textAlign: "center", boxShadow: "0 20px 60px rgba(0,0,0,.2)" }}>
        <Trash2 size={28} strokeWidth={1.2} color="#f87171" style={{ marginBottom: 12 }}/>
        <h3 style={{ fontFamily: "var(--fd)", fontWeight: 700, fontSize: 18, marginBottom: 8 }}>파트너 삭제</h3>
        <p style={{ fontSize: 13, color: "#94a3b8", marginBottom: 24 }}>삭제된 파트너는 복구할 수 없습니다.<br/>정말 삭제하시겠습니까?</p>
        <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
          <button onClick={() => setPtDel(null)} style={{ padding: "10px 24px", background: "none", border: "1px solid #e2e8f0", borderRadius: 8, fontSize: 14, cursor: "pointer" }}>취소</button>
          <button onClick={() => ptHandleDelete(ptDel)} style={{ padding: "10px 24px", background: "#ef4444", color: "#fff", border: "none", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>삭제</button>
        </div>
      </div>
    </>}

    {/* Preview Modal — matches actual homepage popup */}
    {preview && <>
      <div onClick={() => setPreview(null)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.55)", backdropFilter: "blur(4px)", zIndex: 9998, animation: "fadeIn .2s ease" }}/>
      <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "min(380px, calc(100vw - 40px))", maxHeight: "calc(100vh - 80px)", background: "#fff", borderRadius: 12, overflow: "hidden", boxShadow: "0 24px 80px rgba(0,0,0,.3), 0 4px 20px rgba(0,0,0,.15)", zIndex: 9999, animation: "fadeUp .3s cubic-bezier(.16,1,.3,1)", display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "18px 20px", borderBottom: "1px solid #e2e8f0", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Bell size={16} strokeWidth={1.5} color="var(--br)"/>
            <span style={{ fontSize: 14, fontWeight: 700, color: "var(--td)" }}>공지사항</span>
          </div>
          <button onClick={() => setPreview(null)} style={{ background: "none", border: "none", cursor: "pointer", padding: 4, borderRadius: 6, display: "flex" }}><X size={18} strokeWidth={1.5} color="#94a3b8"/></button>
        </div>
        <div style={{ padding: "24px 20px", overflowY: "auto", flex: 1 }}>
          <div style={{ display: "inline-block", background: "rgba(168,149,134,.1)", color: "var(--br)", fontSize: 11, fontWeight: 700, padding: "3px 8px", borderRadius: 4, marginBottom: 12 }}>{preview.category}</div>
          <h3 style={{ fontFamily: "var(--fd)", fontWeight: 700, fontSize: 18, color: "var(--td)", lineHeight: 1.4, marginBottom: 16 }}>{preview.title}</h3>
          <div style={{ background: "#f8fafc", borderRadius: 8, padding: "14px 16px", border: "1px solid #e2e8f0", fontSize: 13, color: "var(--tm)", lineHeight: 1.7 }}>
            {summarizeForPopup(preview.content).map((item, i) => (
              <div key={i} style={{ display: "flex", gap: 8, marginBottom: i < summarizeForPopup(preview.content).length - 1 ? 8 : 0 }}>
                <span style={{ fontWeight: 600, color: "var(--td)", minWidth: 56, flexShrink: 0, fontSize: 12 }}>{item.label}</span>
                <span style={{ fontSize: 13 }}>{item.value}</span>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 12, color: "#94a3b8", marginTop: 14 }}>{preview.date} · 주식회사 276홀딩스</p>
        </div>
        <div style={{ padding: "14px 20px", borderTop: "1px solid #e2e8f0", display: "flex", alignItems: "center", justifyContent: "space-between", background: "#fafbfc", flexShrink: 0 }}>
          <span style={{ fontSize: 11, color: "#94a3b8" }}>
            {preview.isPopup
              ? `✅ 팝업 활성 · ${preview.popupStart || "시작일 없음"} ~ ${preview.popupEnd || "종료일 없음"}`
              : "팝업 비활성 상태"}
          </span>
          <span style={{ fontSize: 11, color: "#cbd5e1" }}>실제 팝업과 동일</span>
        </div>
      </div>
    </>}
  </section>;
}

export default function AdminPage() {
  return <Admin setPage={navigateTo} />;
}
