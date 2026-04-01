-- ============================================
-- 276홀딩스 웹사이트 데이터베이스 스키마
-- Supabase Migration
-- ============================================

-- 공지사항
CREATE TABLE IF NOT EXISTS notices (
  id SERIAL PRIMARY KEY,
  category TEXT NOT NULL DEFAULT '기타',
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  is_popup BOOLEAN DEFAULT false,
  popup_start DATE,
  popup_end DATE,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 언론보도
CREATE TABLE IF NOT EXISTS press (
  id SERIAL PRIMARY KEY,
  url TEXT,
  media TEXT NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT,
  date DATE DEFAULT CURRENT_DATE,
  image TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- FAQ
CREATE TABLE IF NOT EXISTS faqs (
  id SERIAL PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT '서비스',
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 연혁
CREATE TABLE IF NOT EXISTS history (
  id SERIAL PRIMARY KEY,
  year TEXT NOT NULL,
  event TEXT NOT NULL,
  tag TEXT NOT NULL DEFAULT '서비스',
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 멤버
CREATE TABLE IF NOT EXISTS members (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 파트너
CREATE TABLE IF NOT EXISTS partners (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT '투자회사',
  logo_url TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- 초기 데이터 INSERT
-- ============================================

-- 공지사항
INSERT INTO notices (category, title, content, date, is_popup, popup_start, popup_end) VALUES
('주주총회', '2026년 정기주주총회 소집 공고', 
'주주님의 건승과 댁내의 평안을 기원합니다.

당사는 상법 제363조 및 당사 정관의 규정에 의거하여, 제6기 정기주주총회를 아래와 같이 개최하오니 참석하여 주시기 바랍니다.

▣ 일시: 2026년 3월 31일(화) 오전 10시
▣ 장소: 인천광역시 연수구 컨벤시아대로 204, 인천스타트업파크 인스타2 2층 회의실

■ 회의목적사항

[부의안건]
  제1호 의안: 제6기(2025.01.01~2025.12.31) 재무제표 승인의 건
  제2호 의안: 정관 일부 변경의 건
  제3호 의안: 이사 선임의 건
  제4호 의안: 이사 보수한도 승인의 건',
'2026-03-10', true, '2026-03-10', '2026-03-31');

-- 언론보도
INSERT INTO press (url, media, title, excerpt, date) VALUES
('https://www.hankyung.com/article/202509251234', '한국일보', '276홀딩스, 제18회 디지털 이노베이션 대상 수상', '중소기업 매출채권 유동화 핀테크 기업 276홀딩스가 한국일보 주최 디지털 이노베이션 대상에서 핀테크 부문 대상을 수상했다.', '2023-09-15'),
('https://www.fnnews.com/news/202507151234', '파이낸셜뉴스', '276홀딩스, 시리즈A 투자 유치 성공…핀테크 성장 가속', '중소기업 자금 흐름 혁신 플랫폼 276홀딩스가 한국투자AC, HG Initiative 등으로부터 시리즈A 투자를 유치하며 사업 확장에 나선다.', '2025-07-15'),
('https://www.mk.co.kr/news/202412111234', '매일경제', '276홀딩스, 데이터스타즈 최우수기업상 수상', '한국데이터산업진흥원이 주관하는 2024 데이터스타즈에서 276홀딩스가 최우수기업상을 수상하며 데이터 활용 역량을 인정받았다.', '2024-12-11');

-- 멤버
INSERT INTO members (name, role, description, sort_order) VALUES
('신인근', 'CEO · Founder', '종합상사·금융권 10년 구조화 금융 전문', 1),
('박진용', 'CSO · Co-Founder', '투자 유치(IR), B2B 영업망 구축 총괄', 2),
('송인탁', 'COO · Co-Founder', '구조적 리스크 통제 시스템 설계', 3),
('임지훈', 'CIO · 혁신이사', 'AI 동적 리스크 스코어링, 해외 R&D 총괄', 4);

-- 연혁
INSERT INTO history (year, event, tag, sort_order) VALUES
('2019', '276홀딩스 법인 설립', '설립', 1),
('2020', 'Seed 투자 유치 (마그나, 한국사회투자)', '투자', 2),
('2022', '온라인 매출채권 플랫폼 오픈', '서비스', 3),
('2022', 'FlowPay 운용 개시', '서비스', 4),
('2023', 'FlowPay 정식 출시', '서비스', 5),
('2023', 'Pre-A 투자 유치', '투자', 6),
('2024', '과기부 장관상 수상', '수상', 7),
('2024', '인도 수출 거래 21억원 달성', '글로벌', 8),
('2025', 'Series-A 29억 유치', '투자', 9),
('2025', '중기부 장관상 수상', '수상', 10),
('2025', '연 매출 97억원 달성', '실적', 11),
('2026', '중기부 장관상 2년 연속 수상', '수상', 12),
('2026', 'Pre Series-B 추진', '현재', 13);

-- 파트너
INSERT INTO partners (name, category, sort_order) VALUES
('큐네스티', '투자회사', 1), ('마그나인베스트먼트', '투자회사', 2),
('인포뱅크', '투자회사', 3), ('소풍벤처스', '투자회사', 4),
('수이제네리스파트너스', '투자회사', 5), ('한국투자AC', '투자회사', 6),
('HG Initiative', '투자회사', 7), ('두나미스자산운용', '투자회사', 8),
('빅베이슨캐피탈', '투자회사', 9),
('한국핀테크지원센터', '지원사업 기관', 10), ('서울핀테크랩', '지원사업 기관', 11),
('서울창조경제센터', '지원사업 기관', 12), ('인천창조경제센터', '지원사업 기관', 13),
('전북창조경제센터', '지원사업 기관', 14), ('대구창조경제센터', '지원사업 기관', 15),
('IBK창공', '지원사업 기관', 16), ('신한퓨처스랩', '지원사업 기관', 17),
('아시아에프앤아이', '지원사업 기관', 18),
('더포스', '제휴사', 19), ('서울다이나믹스', '제휴사', 20),
('큰삼촌컴퍼니', '제휴사', 21), ('그랜터', '제휴사', 22),
('씨앤테크', '제휴사', 23), ('에이아이지먼트', '제휴사', 24);

-- FAQ (12개 항목)
INSERT INTO faqs (question, answer, category, sort_order) VALUES
('FlowPay란 무엇인가요?', 'FlowPay는 B2B SNPL(Supply Now, Pay Later) 서비스입니다. 276홀딩스가 원자재·조달 물품을 대신 선결제하여 먼저 납품하고, 고객사는 30~90일 후 정산합니다.', '서비스', 1),
('SNPL(Supply Now, Pay Later)이란?', 'SNPL은 Supply Now, Pay Later의 약자로, B2B 공급망에 특화된 선공급 후결제 모델입니다.', '개념', 2),
('FlowPay와 일반 대출은 어떻게 다른가요?', 'FlowPay는 대출이 아닌 유통 기반 구매대행입니다. 부채비율에 영향을 주지 않아 재무 건전성이 유지됩니다.', '서비스', 3),
('FlowScore는 기존 신용평가와 무엇이 다른가요?', 'FlowScore는 491개 변수를 활용한 5-Dimension AI 분석으로, 거래 발생 시마다 실시간 평가합니다.', '서비스', 4),
('FlowPoint란 무엇인가요?', 'FlowPoint는 매출채권 전자화 플랫폼입니다. 종이 계약서를 디지털 자산으로 전환합니다.', '서비스', 5),
('276홀딩스의 주요 실적은?', '2025년 기준 누적 매출채권 중개액 6,890억원 이상, 누적 회원사 1,100개사 이상, 연 매출 97억원입니다.', '회사', 6),
('어떤 산업에서 서비스를 이용할 수 있나요?', '공급망 거래가 있는 모든 산업에 적용됩니다. 현대제철, 삼성의료원, 쿠팡, GS25 등이 이용합니다.', '서비스', 7),
('FlowScore G-Score API란?', 'G-Score API는 FlowScore의 신용평가 기능을 외부 금융기관에 REST API로 제공하는 RaaS 모델입니다.', '기술', 8),
('276홀딩스에 투자한 기관은?', '주요 투자사로 한국투자AC, HG Initiative, KB증권(두나미스) 등이 있습니다.', '회사', 9),
('FlowPay의 서비스 프로세스는?', '6단계로 진행됩니다. ① 발주 신청 → ② AI 심사 → ③ 보증보험 → ④ 선결제 → ⑤ 선공급 → ⑥ 대금 회수', '서비스', 10),
('데이터 플라이휠이란?', '거래 발생 → 데이터 축적 → 신용 정교화 → 거래 확대의 선순환 구조입니다.', '기술', 11),
('글로벌 사업은 어떻게 진행되고 있나요?', '인도·미국·중국 3개국에서 총 37억원의 글로벌 매출을 달성했습니다.', '회사', 12);

-- ============================================
-- RLS (Row Level Security) 설정
-- ============================================
ALTER TABLE notices ENABLE ROW LEVEL SECURITY;
ALTER TABLE press ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE history ENABLE ROW LEVEL SECURITY;
ALTER TABLE members ENABLE ROW LEVEL SECURITY;
ALTER TABLE partners ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Public read notices" ON notices FOR SELECT USING (true);
CREATE POLICY "Public read press" ON press FOR SELECT USING (true);
CREATE POLICY "Public read faqs" ON faqs FOR SELECT USING (true);
CREATE POLICY "Public read history" ON history FOR SELECT USING (true);
CREATE POLICY "Public read members" ON members FOR SELECT USING (true);
CREATE POLICY "Public read partners" ON partners FOR SELECT USING (true);

-- Admin write access (authenticated users)
CREATE POLICY "Admin write notices" ON notices FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin write press" ON press FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin write faqs" ON faqs FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin write history" ON history FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin write members" ON members FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin write partners" ON partners FOR ALL USING (auth.role() = 'authenticated');
