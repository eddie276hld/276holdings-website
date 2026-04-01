export interface PressItem {
  id: number;
  url: string;
  media: string;
  title: string;
  excerpt: string;
  date: string;
  image: string;
}

export const DEFAULT_PRESS = [
  { id: 1, url: "https://www.hankyung.com/article/202509251234", media: "한국일보", title: "276홀딩스, 제18회 디지털 이노베이션 대상 수상", excerpt: "중소기업 매출채권 유동화 핀테크 기업 276홀딩스가 한국일보 주최 디지털 이노베이션 대상에서 핀테크 부문 대상을 수상했다.", date: "2023-09-15", image: "" },
  { id: 2, url: "https://www.fnnews.com/news/202507151234", media: "파이낸셜뉴스", title: "276홀딩스, 시리즈A 투자 유치 성공…핀테크 성장 가속", excerpt: "중소기업 자금 흐름 혁신 플랫폼 276홀딩스가 한국투자AC, HG Initiative 등으로부터 시리즈A 투자를 유치하며 사업 확장에 나선다.", date: "2025-07-15", image: "" },
  { id: 3, url: "https://www.mk.co.kr/news/202412111234", media: "매일경제", title: "276홀딩스, 데이터스타즈 최우수기업상 수상", excerpt: "한국데이터산업진흥원이 주관하는 2024 데이터스타즈에서 276홀딩스가 최우수기업상을 수상하며 데이터 활용 역량을 인정받았다.", date: "2024-12-11", image: "" },
];
