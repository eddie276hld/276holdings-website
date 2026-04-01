export const PARTNER_CATEGORIES = ["투자회사", "지원사업 기관", "제휴사"] as const;
export type PartnerCategory = typeof PARTNER_CATEGORIES[number];

export interface Partner {
  id: number;
  nm: string;
  cat: PartnerCategory;
}

export const DEFAULT_PARTNERS = [
  { id:1, nm:"큐네스티", cat:"투자회사" },{ id:2, nm:"마그나인베스트먼트", cat:"투자회사" },{ id:3, nm:"인포뱅크", cat:"투자회사" },
  { id:4, nm:"소풍벤처스", cat:"투자회사" },{ id:5, nm:"수이제네리스파트너스", cat:"투자회사" },{ id:6, nm:"한국투자AC", cat:"투자회사" },
  { id:7, nm:"HG Initiative", cat:"투자회사" },{ id:8, nm:"두나미스자산운용", cat:"투자회사" },{ id:9, nm:"빅베이슨캐피탈", cat:"투자회사" },
  { id:10, nm:"한국핀테크지원센터", cat:"지원사업 기관" },{ id:11, nm:"서울핀테크랩", cat:"지원사업 기관" },{ id:12, nm:"서울창조경제센터", cat:"지원사업 기관" },
  { id:13, nm:"인천창조경제센터", cat:"지원사업 기관" },{ id:14, nm:"전북창조경제센터", cat:"지원사업 기관" },{ id:15, nm:"대구창조경제센터", cat:"지원사업 기관" },
  { id:16, nm:"IBK창공", cat:"지원사업 기관" },{ id:17, nm:"신한퓨처스랩", cat:"지원사업 기관" },{ id:18, nm:"아시아에프앤아이", cat:"지원사업 기관" },
  { id:19, nm:"더포스", cat:"제휴사" },{ id:20, nm:"서울다이나믹스", cat:"제휴사" },{ id:21, nm:"큰삼촌컴퍼니", cat:"제휴사" },
  { id:22, nm:"그랜터", cat:"제휴사" },{ id:23, nm:"씨앤테크", cat:"제휴사" },{ id:24, nm:"에이아이지먼트", cat:"제휴사" },
];
