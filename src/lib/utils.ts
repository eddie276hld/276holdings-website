// Utility functions

// Summarize notice content for popup display
export function summarizeForPopup(content) {
  if (!content) return [];
  const lines = content.split("\n").map(l => l.trim()).filter(Boolean);
  const items = [];
  const kwMap = [
    { keys: ["일시","일자","날짜","기간","시간"], label: "일시" },
    { keys: ["장소","위치","주소","개최지"], label: "장소" },
    { keys: ["의안","안건","목적사항","내용","주요"], label: "주요 안건" },
    { keys: ["대상","참석","참가","신청"], label: "대상" },
    { keys: ["문의","연락","담당"], label: "문의" },
  ];
  for (const line of lines) {
    for (const { keys, label } of kwMap) {
      if (keys.some(k => line.includes(k)) && !items.find(i => i.label === label)) {
        let val = line.replace(/^[▣■●◆▶\-\*\[\]#\s]*/, "");
        const colonIdx = val.search(/[:：]/);
        if (colonIdx >= 0) val = val.slice(colonIdx + 1).trim();
        if (label === "주요 안건") {
          const agenda = [];
          let started = false;
          for (const l of lines) {
            if (l.includes("의안") || l.includes("안건")) started = true;
            if (started && /^\s*(제?\d+호?\s*의안|제?\d+[\.)]|\d+[\.\)])/.test(l)) {
              const clean = l.replace(/^\s*(제?\d+호?\s*의안\s*[:：]?\s*|\d+[\.\)]\s*)/, "").trim();
              if (clean) agenda.push(clean);
            }
          }
          if (agenda.length > 0) { items.push({ label, value: agenda.join(" / ") }); break; }
        }
        if (val.length > 3 && label !== "주요 안건") { items.push({ label, value: val }); break; }
      }
    }
  }
  if (items.length === 0) {
    const first = lines.find(l => l.length > 10 && !/^[▣■●◆▶\[\]#]/.test(l));
    if (first) items.push({ label: "요약", value: first.length > 80 ? first.slice(0, 80) + "…" : first });
  }
  return items;
}

// Counter animation hook (extracted)
export function animateCounter(target: number, duration: number = 1500): (progress: number) => number {
  return (progress: number) => Math.round(target * Math.min(progress, 1));
}
