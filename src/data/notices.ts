export interface Notice {
  id: number;
  category: string;
  date: string;
  title: string;
  content: string;
  isPopup: boolean;
  popupStart?: string;
  popupEnd?: string;
}

export const NOTICE_CATEGORIES = ["주주총회", "정관변경", "경영현안", "공시", "기타"] as const;

export const DEFAULT_NOTICES = [
  { id: 1, category: "주주총회", date: "2026-03-10", title: "2026년 정기주주총회 소집 공고", isPopup: true, popupStart: "2026-03-10", popupEnd: "2026-03-31",
    content: `주주님의 건승과 댁내의 평안을 기원합니다.\n\n당사는 상법 제363조 및 당사 정관의 규정에 의거하여, 제6기 정기주주총회를 아래와 같이 개최하오니 참석하여 주시기 바랍니다.\n\n▣ 일시: 2026년 3월 31일(화) 오전 10시\n▣ 장소: 인천광역시 연수구 컨벤시아대로 204, 인천스타트업파크 인스타2 2층 회의실\n\n■ 회의목적사항\n\n[보고사항]\n  1. 감사 보고\n  2. 영업 보고\n  3. 내부회계관리제도 운영실태 보고\n\n[부의안건]\n  제1호 의안: 제6기(2025.01.01~2025.12.31) 재무제표 승인의 건\n  제2호 의안: 정관 일부 변경의 건\n  제3호 의안: 이사 선임의 건\n  제4호 의안: 이사 보수한도 승인의 건\n\n■ 의결권 행사에 관한 사항\n  주주총회에 참석하지 못하실 경우, 상법 제368조의 3에 의거 서면에 의하여 의결권을 행사하실 수 있습니다. 서면에 의한 의결권 행사 시에는 당사가 보내드리는 참고서류 및 서면투표 용지를 이용하여 주시기 바랍니다.\n\n2026년 3월 10일\n주식회사 276홀딩스\n대표이사 신인근` },
];
