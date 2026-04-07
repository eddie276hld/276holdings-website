"use client";
import { MARQUEE_LOGOS } from "@/data/logos";

function LogoMarquee() {
  const L = ["현대제철","삼성의료원","아모레퍼시픽","한독약품","쿠팡","GS25","롯데카드","COSRX","서울대병원","KISTI","Funding Societies"];
  return <div style={{ overflow: "hidden", padding: "24px 0" }}>
    <div className="ltrack">
      {[...L,...L].map((l,i) => {
        const small = ["삼성의료원","쿠팡","GS25","롯데카드","COSRX"].includes(l);
        return <span key={i} className="litem" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", minWidth: 100 }}>
          {MARQUEE_LOGOS[l] ? <img src={MARQUEE_LOGOS[l]} alt={l} title={l} style={{ maxHeight: small ? 17 : 22, maxWidth: small ? 77 : 96, objectFit: "contain" }}/> : l}
        </span>;
      })}
    </div>
  </div>;
}

export default LogoMarquee;
