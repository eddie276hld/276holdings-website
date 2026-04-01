export interface Member {
  id: number;
  nm: string;
  rl: string;
  d: string;
  img: string;
}

export const DEFAULT_MEMBERS = [
  { id: 1, nm: "신인근", rl: "CEO · Founder", d: "종합상사(포스코인터내셔널)·금융권 10년 구조화 금융 전문", img: "" },
  { id: 2, nm: "박진용", rl: "CSO · Co-Founder", d: "코스콤, 투자 유치(IR), B2B 영업망 구축 총괄", img: "" },
  { id: 3, nm: "송인탁", rl: "COO · Co-Founder", d: "우리투자증권, 구조적 리스크 통제 시스템 설계", img: "" },
  { id: 4, nm: "임지훈", rl: "CIO · 혁신이사", d: "AI 동적 리스크 스코어링, 해외 R&D 총괄", img: "" },
];
