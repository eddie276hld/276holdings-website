export interface Award {
  id: number;
  y: string;   // 연도
  t: string;   // 수상명
  o: string;   // 수여 기관/설명
}

export const DEFAULT_AWARDS: Award[] = [
  { id: 1, y: "2024", t: "과기정통부 장관상",          o: "K-Global 창업멘토링 우수멘티" },
  { id: 2, y: "2025", t: "중소벤처기업부 장관상",       o: "벤처창업진흥 유공 표창" },
  { id: 3, y: "2025", t: "Most Innovative Wealth Mgmt", o: "GFM Review, UK" },
  { id: 4, y: "2026", t: "중기부 장관상 (2년 연속)",    o: "글로벌창업사관학교 최우수" },
  { id: 5, y: "2026", t: "혁신IT 대상",                o: "중앙일보" },
  { id: 6, y: "2026", t: "서민금융대상",               o: "서민금융진흥원장상" },
];
