"use client";
import { useState, useEffect } from "react";
import { Bell, X } from "lucide-react";
import { DEFAULT_NOTICES } from "@/data/notices";
import { summarizeForPopup } from "@/lib/utils";

function NoticePopup({ setPage }: { setPage: (id: string) => void }) {
  const [show, setShow] = useState(false);
  const [popup, setPopup] = useState<any>(null);

  useEffect(() => {
    let dismissed = false;
    try { dismissed = !!sessionStorage.getItem("notice-popup-dismissed"); } catch {}
    if (dismissed) return;
    (async () => {
      let list = DEFAULT_NOTICES;
      try {
        const r = await window.storage.get("notices-data");
        if (r && r.value) list = JSON.parse(r.value);
      } catch {}
      const today = new Date().toISOString().slice(0, 10);
      const p = list.find(n => n.isPopup && (!n.popupStart || n.popupStart <= today) && (!n.popupEnd || n.popupEnd >= today));
      if (p) { setPopup(p); setTimeout(() => setShow(true), 800); }
    })();
  }, []);

  const close = () => setShow(false);
  const dismissToday = () => { try { sessionStorage.setItem("notice-popup-dismissed", "1"); } catch {} setShow(false); };

  if (!show || !popup) return null;

  return <>
    {/* Backdrop */}
    <div onClick={close} style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,.55)", backdropFilter: "blur(4px)",
      zIndex: 9998, animation: "fadeIn .3s ease"
    }}/>
    {/* Modal */}
    <div style={{
      position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
      width: "min(380px, calc(100vw - 40px))", maxHeight: "calc(100vh - 80px)",
      background: "#fff", borderRadius: 12, overflow: "hidden",
      boxShadow: "0 24px 80px rgba(0,0,0,.3), 0 4px 20px rgba(0,0,0,.15)",
      zIndex: 9999, animation: "fadeUp .4s cubic-bezier(.16,1,.3,1)",
      display: "flex", flexDirection: "column"
    }}>
      {/* Header */}
      <div style={{
        padding: "18px 20px", borderBottom: "1px solid #e2e8f0",
        display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Bell size={16} strokeWidth={1.5} color="var(--br)"/>
          <span style={{ fontSize: 14, fontWeight: 700, color: "var(--td)" }}>공지사항</span>
        </div>
        <button onClick={close} style={{
          background: "none", border: "none", cursor: "pointer", padding: 4,
          borderRadius: 6, display: "flex", transition: "background .2s"
        }} onMouseEnter={e => e.currentTarget.style.background = "#f1f5f9"}
           onMouseLeave={e => e.currentTarget.style.background = "none"}>
          <X size={18} strokeWidth={1.5} color="#94a3b8"/>
        </button>
      </div>

      {/* Body */}
      <div style={{ padding: "24px 20px", overflowY: "auto", flex: 1 }}>
        <div style={{
          display: "inline-block", background: "rgba(168,149,134,.1)", color: "var(--br)",
          fontSize: 11, fontWeight: 700, padding: "3px 8px", borderRadius: 4, marginBottom: 12
        }}>{popup.category}</div>
        <h3 style={{
          fontFamily: "var(--fd)", fontWeight: 700, fontSize: 18, color: "var(--td)",
          lineHeight: 1.4, marginBottom: 16
        }}>{popup.title}</h3>
        <div style={{ background: "#f8fafc", borderRadius: 8, padding: "14px 16px", border: "1px solid #e2e8f0", fontSize: 13, color: "var(--tm)", lineHeight: 1.7 }}>
          {summarizeForPopup(popup.content).map((item, i) => (
            <div key={i} style={{ display: "flex", gap: 8, marginBottom: i < summarizeForPopup(popup.content).length - 1 ? 8 : 0 }}>
              <span style={{ fontWeight: 600, color: "var(--td)", minWidth: 56, flexShrink: 0, fontSize: 12 }}>{item.label}</span>
              <span style={{ fontSize: 13 }}>{item.value}</span>
            </div>
          ))}
        </div>
        <p style={{ fontSize: 12, color: "#94a3b8", marginTop: 14 }}>{popup.date} · 주식회사 276홀딩스</p>
      </div>

      {/* Footer */}
      <div style={{
        padding: "14px 20px", borderTop: "1px solid #e2e8f0",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: "#fafbfc", flexShrink: 0
      }}>
        <button onClick={dismissToday} style={{
          background: "none", border: "none", fontSize: 12, color: "#94a3b8",
          cursor: "pointer", padding: "4px 0", transition: "color .2s"
        }} onMouseEnter={e => e.currentTarget.style.color = "#64748b"}
           onMouseLeave={e => e.currentTarget.style.color = "#94a3b8"}>
          오늘 하루 보지 않기
        </button>
        <button onClick={() => { close(); setPage("notices"); }} style={{
          background: "var(--br)", color: "#fff", border: "none", borderRadius: 8,
          padding: "8px 18px", fontSize: 13, fontWeight: 600, cursor: "pointer",
          transition: "opacity .2s"
        }} onMouseEnter={e => e.currentTarget.style.opacity = ".85"}
           onMouseLeave={e => e.currentTarget.style.opacity = "1"}>
          전체 공지 보기
        </button>
      </div>
    </div>
  </>;
}

export default NoticePopup;
