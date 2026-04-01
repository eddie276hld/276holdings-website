export const HISTORY_CATEGORIES = ["설립", "투자", "서비스", "수상", "글로벌", "실적", "현재"] as const;
export type HistoryCategory = typeof HISTORY_CATEGORIES[number];

export interface HistoryEvent {
  id: number;
  y: string;
  e: string;
  tg: HistoryCategory;
}

export const DEFAULT_HISTORY = [
  { id: 1, y: "2019", e: "276홀딩스 법인 설립", tg: "설립" },
  { id: 2, y: "2020", e: "Seed 투자 유치 (마그나, 한국사회투자)", tg: "투자" },
  { id: 3, y: "2022", e: "온라인 매출채권 플랫폼 오픈", tg: "서비스" },
  { id: 4, y: "2022", e: "FlowPay 운용 개시", tg: "서비스" },
  { id: 5, y: "2023", e: "FlowPay 정식 출시", tg: "서비스" },
  { id: 6, y: "2023", e: "Pre-A 투자 유치", tg: "투자" },
  { id: 7, y: "2024", e: "과기부 장관상 수상", tg: "수상" },
  { id: 8, y: "2024", e: "인도 수출 거래 21억원 달성", tg: "글로벌" },
  { id: 9, y: "2025", e: "Series-A 29억 유치", tg: "투자" },
  { id: 10, y: "2025", e: "중기부 장관상 수상", tg: "수상" },
  { id: 11, y: "2025", e: "연 매출 97억원 달성", tg: "실적" },
  { id: 12, y: "2026", e: "중기부 장관상 2년 연속 수상", tg: "수상" },
  { id: 13, y: "2026", e: "Pre Series-B 추진", tg: "현재" },
];
