// SEO: JSON-LD Structured Data + Page Meta
const JSON_LD_ORG = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "276홀딩스",
  "alternateName": ["276 Holdings", "276Holdings", "이칠육홀딩스"],
  "url": "https://276holdings.com",
  "description": "중소기업 공급망 금융 플랫폼. 매출채권 유동화, 구매대금 선결제(SNPL), AI 신용평가 서비스를 제공하는 B2B 핀테크 기업",
  "foundingDate": "2019-12",
  "numberOfEmployees": {"@type": "QuantitativeValue", "value": 14},
  "address": [
    {"@type": "PostalAddress", "addressLocality": "인천", "addressRegion": "연수구", "streetAddress": "컨벤시아대로 204, 인천스타트업파크 인스타2 2층 213호", "addressCountry": "KR"},
    {"@type": "PostalAddress", "addressLocality": "서울", "addressRegion": "영등포구", "streetAddress": "의사당대로 83 오투타워 19층 104호", "addressCountry": "KR"}
  ],
  "telephone": "02-785-7080",
  "email": "contact@276holdings.com",
  "founder": {"@type": "Person", "name": "신인근", "jobTitle": "CEO"},
  "knowsAbout": ["공급망 금융", "매출채권 유동화", "SNPL", "Supply Now Pay Later", "B2B 핀테크", "AI 신용평가", "중소기업 금융", "구매대행", "FlowPay", "FlowScore", "FlowPoint"],
  "award": ["과기정통부 장관상 2024", "중소벤처기업부 장관상 2025", "중소벤처기업부 장관상 2026", "Most Innovative Wealth Management - GFM Review UK 2025", "혁신IT 대상 - 중앙일보 2026"]
};
const JSON_LD_PRODUCTS = [
  {"@context":"https://schema.org","@type":"Product","name":"FlowPay","description":"B2B SNPL(Supply Now, Pay Later) 구매대행 선지급 솔루션. 원자재 구매대금을 대신 결제하고 30/60/90일 후 정산. 부채 없는 공급망 금융.","brand":{"@type":"Brand","name":"276홀딩스"},"category":"B2B 핀테크/공급망 금융","url":"https://276holdings.com/products/flowpay"},
  {"@context":"https://schema.org","@type":"Product","name":"FlowScore","description":"491개 변수, 5-Dimension AI 기반 중소기업 동적 신용평가 엔진. 실시간 거래 데이터로 단기 매출채권 리스크를 평가. AR 0.60, KS 0.39 성능.","brand":{"@type":"Brand","name":"276홀딩스"},"category":"AI 신용평가","url":"https://276holdings.com/products/flowscore"},
  {"@context":"https://schema.org","@type":"Product","name":"FlowPoint","description":"매출채권 전자화 플랫폼. 종이 계약서를 디지털 자산으로 전환하여 온라인 양수도 및 유동화까지 연결. 국내 연간 외상 매출채권 5,000조원 시장의 금융 공백 해소.","brand":{"@type":"Brand","name":"276홀딩스"},"category":"매출채권 전자화","url":"https://276holdings.com/products/flowpoint"}
];
const JSON_LD_FAQ = {"@context":"https://schema.org","@type":"FAQPage","mainEntity":[
  {"@type":"Question","name":"FlowPay란 무엇인가요?","acceptedAnswer":{"@type":"Answer","text":"FlowPay는 B2B SNPL(Supply Now, Pay Later) 서비스입니다. 276홀딩스가 원자재·조달 물품을 대신 선결제하여 먼저 납품하고, 고객사는 30~90일 후 정산합니다. 대출이 아닌 구매대행 방식이므로 부채비율에 영향 없이 재무 건전성을 유지할 수 있습니다. 누적 1,295건 거래, 부도율 0.22%의 검증된 실적을 보유하고 있습니다."}},
  {"@type":"Question","name":"SNPL(Supply Now Pay Later)이란?","acceptedAnswer":{"@type":"Answer","text":"SNPL은 Supply Now, Pay Later의 약자로, B2B 공급망에 특화된 선공급 후결제 모델입니다. 소비자 BNPL(Buy Now Pay Later)의 B2B 버전으로, 중소기업이 원자재를 즉시 조달받고 매출 발생 후 대금을 정산하는 구조입니다. 276홀딩스의 FlowPay가 한국 시장에서 이 모델을 선도하고 있습니다."}},
  {"@type":"Question","name":"FlowScore는 기존 신용평가와 무엇이 다른가요?","acceptedAnswer":{"@type":"Answer","text":"FlowScore는 491개 변수를 활용한 5-Dimension AI 동적 신용평가 시스템입니다. 기존 신용평가가 재무제표 중심의 연 1회 갱신인 반면, FlowScore는 실시간 거래 흐름 데이터를 기반으로 거래 발생 단위로 업데이트합니다. '괜찮은 회사인가?'가 아니라 '지금 이 거래, 안전한가?'를 평가합니다. 정확도(AR) 0.60, 판별력(KS) 0.39의 성능을 보유하고 있습니다."}},
  {"@type":"Question","name":"FlowPoint란 무엇인가요?","acceptedAnswer":{"@type":"Answer","text":"FlowPoint는 매출채권 전자화 플랫폼입니다. 종이 계약서를 디지털 자산(전자채권)으로 전환하여 등록·보관·검색, 거래처 전달, 온라인 양수도, 유동화까지 한 곳에서 처리합니다. 국내 연간 외상 매출채권 약 5,000조원 시장에서 기존 금융이 커버하지 못하는 99%의 공백을 해소합니다."}},
  {"@type":"Question","name":"276홀딩스는 어떤 회사인가요?","acceptedAnswer":{"@type":"Answer","text":"276홀딩스는 2019년 설립된 B2B 핀테크 기업으로, 중소기업의 공급망 자금 흐름 문제를 데이터와 기술로 해결합니다. FlowPoint(매출채권 전자화), FlowScore(AI 신용평가), FlowPay(구매대행 선지급) 3개 서비스로 구성된 FLOW 슈퍼앱을 운영합니다. 누적 매출채권 중개액 6,890억원+, 회원사 1,100개사+, 2025년 매출 97억원(230% 성장), 부도율 0.22%의 성과를 달성했습니다."}},
  {"@type":"Question","name":"276홀딩스의 투자 이력은?","acceptedAnswer":{"@type":"Answer","text":"276홀딩스는 Seed(2020, 마그나인베스트먼트), Pre-A(2023, 인포뱅크·소풍벤처스), Bridge(2024, 수이제네리스파트너스), Series-A(2025, 한국투자AC·KB증권·빅베이슨 등 29억원) 라운드를 거쳤으며, 2026년 Pre Series-B(목표 50억원, 밸류 300억원)를 추진 중입니다."}},
  {"@type":"Question","name":"어떤 산업에서 FlowPay를 사용할 수 있나요?","acceptedAnswer":{"@type":"Answer","text":"FlowPay는 공급망 거래가 있는 모든 산업에 적용됩니다. 주요 고객 산업군으로는 식음료(F&B), 의료·헬스케어, 금속·부품, 전기·전자, 뷰티·럭셔리, 일상 소비재, 지역 생산품이 있으며, 현대제철, 삼성의료원, 아모레퍼시픽, 쿠팡, GS25, 롯데카드, COSRX 등 1,100개 이상의 파트너사와 거래하고 있습니다."}},
  {"@type":"Question","name":"FlowScore의 G-Score API란?","acceptedAnswer":{"@type":"Answer","text":"G-Score API는 FlowScore의 신용평가 기능을 외부 금융기관과 핀테크에 API로 제공하는 RaaS(Risk-as-a-Service) 모델입니다. 현재 싱가포르에서 Funding Societies와 PoC를 진행 중이며, KISTI 기술이전을 통해 GVC 위기예측 기술을 통합하여 복합 리스크 평가를 제공합니다."}}
]};



const PAGE_META = {
  home: { title: "276홀딩스 | 중소기업 공급망 금융 플랫폼 — FlowPay · FlowScore · FlowPoint", desc: "매출채권 유동화, 구매대금 선결제(SNPL), AI 신용평가로 중소기업의 자금 흐름을 개선하는 B2B 핀테크 플랫폼. 누적 6,890억원+ 중개, 1,100개사 파트너." },
  flowpay: { title: "FlowPay | 원자재 선결제 · B2B SNPL 서비스 — 276홀딩스", desc: "원자재 구매대금을 대신 결제하고 30~90일 후 정산. 대출 아닌 구매대행으로 부채 없이 매출 확장. 부도율 0.22%, 재구매율 65%+." },
  flowscore: { title: "FlowScore | AI 중소기업 신용평가 엔진 — 276홀딩스", desc: "491개 변수, 5-Dimension AI 동적 신용평가. 실시간 거래 데이터 기반 단기 매출채권 리스크 평가. AR 0.60, KS 0.39. RaaS API 제공." },
  flowpoint: { title: "FlowPoint | 매출채권 전자화 플랫폼 — 276홀딩스", desc: "종이 계약서를 전자채권으로 전환. 등록·관리·양수도·유동화까지 한 곳에서. 5,000조원 매출채권 시장의 99% 금융 공백 해소." },
  about: { title: "회사 소개 | 276홀딩스 — 공급망 데이터 기반 핀테크", desc: "2019년 설립. 누적 6,890억원+ 중개, 매출 97억(230% 성장), Series-A 29억 유치. 과기부·중기부 장관상 수상. 14명의 금융·AI 전문팀." },
  contact: { title: "문의하기 | 276홀딩스 — 서비스 도입·파트너십·API", desc: "FlowPay 도입, FlowScore API, 파트너십, 투자 문의. 평일 24시간 내 회신. 02-785-7080, contact@276holdings.com" },
  faq: { title: "자주 묻는 질문 | 276홀딩스 — FlowPay · FlowScore · FlowPoint", desc: "SNPL이란? FlowPay 도입 조건은? FlowScore와 기존 신용평가의 차이는? 276홀딩스 서비스에 대해 자주 묻는 질문과 답변." },
  terms: { title: "서비스 이용약관 | 276홀딩스", desc: "주식회사 276홀딩스 서비스 이용에 관한 약관. 회원의 권리와 의무, 서비스 이용절차, 거래보호 서비스에 대한 규정." },
  esg: { title: "ESG | 276홀딩스 — 환경·인권·윤리 경영", desc: "276홀딩스의 ESG 경영 선언. 환경 경영 원칙, 인권 경영 헌장, 윤리 경영 실천 방안. 중소기업 금융 파트너로서의 지속가능한 미래 약속." },
  notices: { title: "공지사항 | 276홀딩스", desc: "276홀딩스의 주요 공지사항. 주주총회, 정관 변경, 경영 현안 등 기업 공시 정보." },
  admin: { title: "관리자 | 276홀딩스", desc: "" },
};
