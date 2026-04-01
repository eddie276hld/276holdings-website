-- ============================================================
-- 276홀딩스 웹사이트 데이터베이스
-- Supabase Migration Script
-- Generated from 276holdings-v2.jsx production data
-- ============================================================

-- ============================================================
-- SECTION 1: DROP EXISTING (for clean migration)
-- ============================================================
DROP TABLE IF EXISTS notices CASCADE;
DROP TABLE IF EXISTS press CASCADE;
DROP TABLE IF EXISTS faqs CASCADE;
DROP TABLE IF EXISTS history CASCADE;
DROP TABLE IF EXISTS members CASCADE;
DROP TABLE IF EXISTS partners CASCADE;

-- ============================================================
-- SECTION 2: TABLE CREATION
-- ============================================================

-- 공지사항 (Notices)
CREATE TABLE notices (
  id           SERIAL PRIMARY KEY,
  category     TEXT NOT NULL DEFAULT '기타',
  title        TEXT NOT NULL,
  content      TEXT NOT NULL,
  date         DATE NOT NULL DEFAULT CURRENT_DATE,
  is_popup     BOOLEAN DEFAULT false,
  popup_start  DATE,
  popup_end    DATE,
  created_at   TIMESTAMPTZ DEFAULT now(),
  updated_at   TIMESTAMPTZ DEFAULT now()
);

COMMENT ON TABLE notices IS '공지사항 — 주주총회, 정관변경, 경영현안, 공시, 기타';
COMMENT ON COLUMN notices.is_popup IS '홈페이지 팝업 노출 여부';
COMMENT ON COLUMN notices.popup_start IS '팝업 노출 시작일';
COMMENT ON COLUMN notices.popup_end IS '팝업 노출 종료일';

-- 언론보도 (Press Coverage)
CREATE TABLE press (
  id           SERIAL PRIMARY KEY,
  url          TEXT,
  media        TEXT NOT NULL,
  title        TEXT NOT NULL,
  excerpt      TEXT,
  date         DATE DEFAULT CURRENT_DATE,
  image        TEXT,
  sort_order   INT DEFAULT 0,
  created_at   TIMESTAMPTZ DEFAULT now(),
  updated_at   TIMESTAMPTZ DEFAULT now()
);

COMMENT ON TABLE press IS '언론보도 — 관리자 URL 스크래핑으로 자동 입력 지원';

-- FAQ
CREATE TABLE faqs (
  id           SERIAL PRIMARY KEY,
  question     TEXT NOT NULL,
  answer       TEXT NOT NULL,
  category     TEXT NOT NULL DEFAULT '서비스'
                 CHECK (category IN ('서비스', '개념', '회사', '기술')),
  sort_order   INT DEFAULT 0,
  created_at   TIMESTAMPTZ DEFAULT now(),
  updated_at   TIMESTAMPTZ DEFAULT now()
);

COMMENT ON TABLE faqs IS 'FAQ — 카테고리: 서비스, 개념, 회사, 기술';

-- 연혁 (History)
CREATE TABLE history (
  id           SERIAL PRIMARY KEY,
  year         TEXT NOT NULL,
  event        TEXT NOT NULL,
  tag          TEXT NOT NULL DEFAULT '서비스'
                 CHECK (tag IN ('설립', '투자', '서비스', '수상', '글로벌', '실적', '현재')),
  sort_order   INT DEFAULT 0,
  created_at   TIMESTAMPTZ DEFAULT now()
);

COMMENT ON TABLE history IS '연혁 — 같은 연도에 복수 이벤트 등록 가능. About 페이지에서 연도별 그룹핑 표시';

-- 멤버 (Members)
CREATE TABLE members (
  id           SERIAL PRIMARY KEY,
  name         TEXT NOT NULL UNIQUE,
  role         TEXT NOT NULL,
  description  TEXT,
  image_url    TEXT,
  sort_order   INT DEFAULT 0,
  created_at   TIMESTAMPTZ DEFAULT now(),
  updated_at   TIMESTAMPTZ DEFAULT now()
);

COMMENT ON TABLE members IS '멤버 — 이름 기준 UNIQUE 제약. 중복 방지';

-- 파트너 (Partners)
CREATE TABLE partners (
  id           SERIAL PRIMARY KEY,
  name         TEXT NOT NULL,
  category     TEXT NOT NULL DEFAULT '투자회사'
                 CHECK (category IN ('투자회사', '지원사업 기관', '제휴사')),
  logo_url     TEXT,
  sort_order   INT DEFAULT 0,
  created_at   TIMESTAMPTZ DEFAULT now()
);

COMMENT ON TABLE partners IS '파트너 — 카테고리: 투자회사, 지원사업 기관, 제휴사';

-- ============================================================
-- SECTION 3: INDEXES
-- ============================================================

CREATE INDEX idx_notices_date ON notices (date DESC);
CREATE INDEX idx_notices_popup ON notices (is_popup) WHERE is_popup = true;
CREATE INDEX idx_press_date ON press (date DESC);
CREATE INDEX idx_faqs_category ON faqs (category);
CREATE INDEX idx_history_year ON history (year);
CREATE INDEX idx_members_sort ON members (sort_order);
CREATE INDEX idx_partners_category ON partners (category);

-- ============================================================
-- SECTION 4: AUTO-UPDATE TRIGGER (updated_at)
-- ============================================================

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER notices_updated_at BEFORE UPDATE ON notices
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER press_updated_at BEFORE UPDATE ON press
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER faqs_updated_at BEFORE UPDATE ON faqs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER members_updated_at BEFORE UPDATE ON members
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- SECTION 5: ROW LEVEL SECURITY (RLS)
-- ============================================================

ALTER TABLE notices ENABLE ROW LEVEL SECURITY;
ALTER TABLE press ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE history ENABLE ROW LEVEL SECURITY;
ALTER TABLE members ENABLE ROW LEVEL SECURITY;
ALTER TABLE partners ENABLE ROW LEVEL SECURITY;

-- Public read access (모든 사용자 조회 가능)
CREATE POLICY "notices_public_read"  ON notices  FOR SELECT USING (true);
CREATE POLICY "press_public_read"    ON press    FOR SELECT USING (true);
CREATE POLICY "faqs_public_read"     ON faqs     FOR SELECT USING (true);
CREATE POLICY "history_public_read"  ON history  FOR SELECT USING (true);
CREATE POLICY "members_public_read"  ON members  FOR SELECT USING (true);
CREATE POLICY "partners_public_read" ON partners FOR SELECT USING (true);

-- Admin write access (인증된 사용자만 쓰기 가능)
CREATE POLICY "notices_admin_write"  ON notices  FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "press_admin_write"    ON press    FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "faqs_admin_write"     ON faqs     FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "history_admin_write"  ON history  FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "members_admin_write"  ON members  FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "partners_admin_write" ON partners FOR ALL USING (auth.role() = 'authenticated');

-- ============================================================
-- SECTION 6: INITIAL DATA — 공지사항 (1건)
-- ============================================================

INSERT INTO notices (id, category, title, content, date, is_popup, popup_start, popup_end) VALUES
(1, '주주총회', '2026년 정기주주총회 소집 공고',
'주주님의 건승과 댁내의 평안을 기원합니다.

당사는 상법 제363조 및 당사 정관의 규정에 의거하여, 제6기 정기주주총회를 아래와 같이 개최하오니 참석하여 주시기 바랍니다.

▣ 일시: 2026년 3월 31일(화) 오전 10시
▣ 장소: 인천광역시 연수구 컨벤시아대로 204, 인천스타트업파크 인스타2 2층 회의실

■ 회의목적사항

[보고사항]
  1. 감사 보고
  2. 영업 보고
  3. 내부회계관리제도 운영실태 보고

[부의안건]
  제1호 의안: 제6기(2025.01.01~2025.12.31) 재무제표 승인의 건
  제2호 의안: 정관 일부 변경의 건
  제3호 의안: 이사 선임의 건
  제4호 의안: 이사 보수한도 승인의 건

■ 의결권 행사에 관한 사항
  주주총회에 참석하지 못하실 경우, 상법 제368조의 3에 의거 서면에 의하여 의결권을 행사하실 수 있습니다. 서면에 의한 의결권 행사 시에는 당사가 보내드리는 참고서류 및 서면투표 용지를 이용하여 주시기 바랍니다.

2026년 3월 10일
주식회사 276홀딩스
대표이사 신인근',
'2026-03-10', true, '2026-03-10', '2026-03-31');

SELECT setval('notices_id_seq', (SELECT MAX(id) FROM notices));

-- ============================================================
-- SECTION 7: INITIAL DATA — 언론보도 (3건)
-- ============================================================

INSERT INTO press (id, url, media, title, excerpt, date, sort_order) VALUES
(1, 'https://www.hankyung.com/article/202509251234', '한국일보', '276홀딩스, 제18회 디지털 이노베이션 대상 수상', '중소기업 매출채권 유동화 핀테크 기업 276홀딩스가 한국일보 주최 디지털 이노베이션 대상에서 핀테크 부문 대상을 수상했다.', '2023-09-15', 1),
(2, 'https://www.fnnews.com/news/202507151234', '파이낸셜뉴스', '276홀딩스, 시리즈A 투자 유치 성공…핀테크 성장 가속', '중소기업 자금 흐름 혁신 플랫폼 276홀딩스가 한국투자AC, HG Initiative 등으로부터 시리즈A 투자를 유치하며 사업 확장에 나선다.', '2025-07-15', 2),
(3, 'https://www.mk.co.kr/news/202412111234', '매일경제', '276홀딩스, 데이터스타즈 최우수기업상 수상', '한국데이터산업진흥원이 주관하는 2024 데이터스타즈에서 276홀딩스가 최우수기업상을 수상하며 데이터 활용 역량을 인정받았다.', '2024-12-11', 3);

SELECT setval('press_id_seq', (SELECT MAX(id) FROM press));

-- ============================================================
-- SECTION 8: INITIAL DATA — FAQ (12건)
-- ============================================================

INSERT INTO faqs (id, question, answer, category, sort_order) VALUES
(1, 'FlowPay란 무엇인가요?', 'FlowPay는 B2B SNPL(Supply Now, Pay Later) 서비스입니다. 276홀딩스가 원자재·조달 물품을 대신 선결제하여 먼저 납품하고, 고객사는 30~90일 후 정산합니다. 대출이 아닌 구매대행 방식이므로 부채비율에 영향 없이 재무 건전성을 유지할 수 있습니다. 운용 기간(2022.9~2025.11) 기준 총 1,295건 거래, 거래 당 실현 수익률 5.07%, 최종 부도율 0.22%의 검증된 실적을 보유하고 있습니다.', '서비스', 1),
(2, 'SNPL(Supply Now, Pay Later)이란?', 'SNPL은 Supply Now, Pay Later의 약자로, B2B 공급망에 특화된 선공급 후결제 모델입니다. 소비자 대상 BNPL(Buy Now, Pay Later)의 B2B 버전으로 이해하시면 됩니다. 중소기업이 원자재를 즉시 조달받고, 최종 제품을 판매한 뒤 대금을 정산하는 구조입니다. 이를 통해 납품과 매출 회수 사이의 자금 공백(Death Valley)을 해소합니다. 276홀딩스의 FlowPay가 한국 시장에서 이 모델을 선도하고 있습니다.', '개념', 2),
(3, 'FlowPay와 일반 대출은 어떻게 다른가요?', 'FlowPay는 대출이 아닌 유통 기반 구매대행입니다. 276홀딩스가 직접 원자재를 구매하여 납품하는 상거래 구조이므로 매입/매출 계산서가 발행됩니다. 따라서 고객사의 부채비율에 영향을 주지 않아 재무 건전성이 유지됩니다. 또한 FlowScore AI 심사와 보증보험 연계의 이중 안전장치로 구조적 리스크를 통제합니다.', '서비스', 3),
(4, 'FlowScore는 기존 신용평가와 무엇이 다른가요?', '기존 신용평가는 재무제표 중심으로 연 1회 갱신되며 ''괜찮은 회사인가?''를 평가합니다. FlowScore는 491개 변수를 활용한 5-Dimension(재무적 건전성, 구조적 안정성, 운영 의지, 거래 건전성, 소통 및 이슈) AI 분석으로, 거래 발생 시마다 ''지금 이 거래, 안전한가?''를 실시간 평가합니다. 정확도(AR) 0.60, 판별력(KS) 0.39의 성능을 보유하고 있으며, 실증 사례에서 재무적으로 양호해 보이지만 비재무적 이상 징후가 있는 기업을 사전에 포착하여 손실을 방어한 바 있습니다.', '서비스', 4),
(5, 'FlowPoint란 무엇인가요?', 'FlowPoint는 매출채권 전자화 플랫폼입니다. 종이 계약서를 디지털 자산(전자채권)으로 전환하여 등록·보관·검색을 한 곳에서 관리하고, 거래처 전달, 온라인 양수도, 유동화 활용까지 연결합니다. 276홀딩스 FLOW 생태계의 데이터 입력 레이어로, FlowPoint에서 축적된 거래 데이터가 FlowScore의 평가 정확도를 높이고, FlowPay의 한도를 산정하는 기반이 됩니다.', '서비스', 5),
(6, '276홀딩스의 주요 실적은?', '2025년 기준 누적 매출채권 중개액 6,890억원 이상, 누적 회원사 1,100개사 이상, 연 매출 97억원(전년 대비 230% 성장), 월간 BEP 달성, 글로벌 매출 37억원(인도·미국·중국 3개국), FlowPay 부도율 0.22%, 재구매 고객 비중 65% 이상입니다.', '회사', 6),
(7, '어떤 산업에서 서비스를 이용할 수 있나요?', '공급망 거래가 있는 모든 산업에 적용됩니다. 현재 식음료(F&B), 의료·헬스케어, 금속·부품, 전기·전자·반도체, 뷰티·럭셔리, 일상 소비재, 지역 생산품 등의 산업에서 이용하고 있습니다. 주요 고객으로는 현대제철, 삼성의료원, 한독약품, 아모레퍼시픽, 쿠팡, GS25, 롯데카드, COSRX 등이 있습니다.', '서비스', 7),
(8, 'FlowScore G-Score API란?', 'G-Score API는 FlowScore의 신용평가 기능을 외부 금융기관과 핀테크에 REST API로 제공하는 RaaS(Risk-as-a-Service) 모델입니다. PII 자동 마스킹, Audit 로깅 등 엔터프라이즈 수준의 보안을 갖추고 있으며, 현재 싱가포르 Funding Societies와 PoC를 진행 중입니다.', '기술', 8),
(9, '276홀딩스에 투자한 기관은?', '주요 투자사로 한국투자AC, HG Initiative, KB증권(두나미스), 빅베이슨캐피탈, 마그나인베스트먼트, 인포뱅크, 소풍벤처스, 수이제네리스파트너스, 한국사회투자 등이 있습니다. Seed(2020)부터 Series-A(2025, 29억원)까지 총 4라운드를 완료하였으며, 2026년 Pre Series-B(목표 50억원)를 추진 중입니다.', '회사', 9),
(10, 'FlowPay의 서비스 프로세스는?', '6단계로 진행됩니다. ① 고객사 발주 신청 → ② FlowScore AI 심사 → ③ 보증보험 연계(2차 안전장치) → ④ 276홀딩스 선결제(조달처에 즉시 현금 구매) → ⑤ 원자재 선공급(고객사 생산·납품 정상 진행) → ⑥ 대금 회수(납품 완료 후 정산 주기 회수). 평균 거래 만기일은 44일입니다.', '서비스', 10),
(11, '데이터 플라이휠이란?', '276홀딩스의 핵심 경쟁력 구조입니다. 거래 발생 → 데이터 축적(FlowPoint) → 신용 정교화(FlowScore AI 분석) → 거래 확대(한도 상향, 우량 고객 유입) → 다시 거래 발생. 이 선순환으로 데이터가 누적될수록 부실 징후를 사전 포착하여 손실률이 구조적으로 하향 안정화되고, 우량 고객에 대한 교차 판매가 확대됩니다.', '기술', 11),
(12, '글로벌 사업은 어떻게 진행되고 있나요?', '2024년 인도(아모레퍼시픽 제품 수출, 21억원), 2025년 미국(K뷰티 아마존 판매향, 20억원)·중국(비료 원료 수입, 1억원) 등 3개국에서 총 37억원의 글로벌 매출을 달성했습니다. 싱가포르 Regional HQ 설립을 준비 중이며, ASEAN 공급망 금융 시장 진출을 추진하고 있습니다.', '회사', 12);

SELECT setval('faqs_id_seq', (SELECT MAX(id) FROM faqs));

-- ============================================================
-- ============================================================
-- SECTION 9: INITIAL DATA — 연혁 (45건, 옵시디언 볼트 완전 반영)
-- ============================================================

INSERT INTO history (id, year, event, tag, sort_order) VALUES
(1, '2019', '(주)276홀딩스 법인 설립', '설립', 1),
(2, '2020', '전자어음 담보 사모펀드 37.5억원 유치', '투자', 2),
(3, '2020', 'Seed 투자 유치 (마그나인베스트먼트, 한국사회투자) — Value 26.4억', '투자', 3),
(4, '2020', 'MetLife Inclusion Plus 2.0 Top3 선정', '수상', 4),
(5, '2020', '초기창업패키지 대상 기업 선정 / 중소기업 자금 중개 실적 1,000억원 달성', '실적', 5),
(6, '2021', '한국벤처캐피탈협회 벤처기업확인서 획득', '서비스', 6),
(7, '2021', '골든브릿지 매출채권 사모펀드 상환 완료 (731건/293억/부도율 0%)', '실적', 7),
(8, '2022', '온라인 매출채권 플랫폼 서비스 오픈 (기업 1,063개사, 채권 13,953건, 누적 중개액 6,662억원)', '서비스', 8),
(9, '2022', 'FlowPay 운용 개시', '서비스', 9),
(10, '2022', '프롭핀테크 게임체인저2 신기술상 수상 (ASIA F&I / 신한퓨처스랩)', '수상', 10),
(11, '2022', 'IBK창공 마포 10기 회원사 선정', '서비스', 11),
(12, '2023', '276홀딩스 기업부설연구소 설립', '서비스', 12),
(13, '2023', '기업용 BNPL 서비스 플로우페이 출시', '서비스', 13),
(14, '2023', 'Pre-A 투자 유치 (인포뱅크 & 소풍벤처스) — Value 50억', '투자', 14),
(15, '2023', '한국일보 2023 제18회 디지털 이노베이션 대상 선정', '수상', 15),
(16, '2024', 'Bridge 투자 유치 (수이제네리스파트너스) — Value 70억', '투자', 16),
(17, '2024', 'FlowPay 런칭 및 본격 가동, 120억 규모 요청 대기', '서비스', 17),
(18, '2024', '한국데이터산업진흥원 데이터스타즈 선정', '수상', 18),
(19, '2024', '한국핀테크지원센터 글로벌 엑셀러레이팅 지원사업 선정', '서비스', 19),
(20, '2024', '인도 수출 거래 발생 (아모레퍼시픽 제품, 인도 대형 체인 공급, 21억원)', '글로벌', 20),
(21, '2024', '과기정통부 장관상 수상 (K-Global 창업멘토링 23기 우수멘티상)', '수상', 21),
(22, '2024', 'TIPS 대상 기업 선정', '수상', 22),
(23, '2024', '한국데이터산업진흥원장상 (데이터스타즈 최우수기업)', '수상', 23),
(24, '2024', 'S to Global 사업 최우수상 (서울창조경제센터)', '수상', 24),
(25, '2024', '핀테크 데모데이 대상 수상 (한국핀테크지원센터)', '수상', 25),
(26, '2025', 'AI바우처 활용 서비스 분야 공급기업 선정', '서비스', 26),
(27, '2025', 'Series-A 투자 유치 (한국투자AC, HG Initiative, KB증권, 빅베이슨, 마그나) — 총 29억', '투자', 27),
(28, '2025', 'Most Innovative Wealth Management in Korea (GFM Review, UK)', '수상', 28),
(29, '2025', '글로벌창업사관학교 선정 (중소벤처진흥공단)', '서비스', 29),
(30, '2025', '전북창조경제혁신센터 금융 빅데이터 스타트업 지원사업 선정', '서비스', 30),
(31, '2025', '2025 신한퓨처스랩 11기 선정', '서비스', 31),
(32, '2025', '한국데이터산업진흥원 데이터 글로벌 지원사업 선정', '서비스', 32),
(33, '2025', '핀커넥트 데모데이 최우수상', '수상', 33),
(34, '2025', '중소벤처기업부 장관상 (벤처창업진흥 유공 표창)', '수상', 34),
(35, '2025', 'ESG경영 최우수기업 (서울경제진흥원장상)', '수상', 35),
(36, '2025', '라이징스타 5기 최우수상 (인천광역시장상)', '수상', 36),
(37, '2025', '미국 수출 거래 발생 (K뷰티 아마존 판매향 공급, 20억원)', '글로벌', 37),
(38, '2025', '중국 수입 거래 발생 (비료 제조용 원료, 1억원)', '글로벌', 38),
(39, '2025', '연 매출액 97억원 달성 / 월간 BEP 달성', '실적', 39),
(40, '2025', '회원사 1,100개 확보', '실적', 40),
(41, '2026', '창업진흥원 초청 한중 공급망 협업 모델 발표 (상해 현지)', '글로벌', 41),
(42, '2026', '2026 상반기 혁신IT 대상 기업 선정 (중앙일보)', '수상', 42),
(43, '2026', '서민금융대상 서민금융진흥원장상 수상', '수상', 43),
(44, '2026', '중소벤처기업부 장관상 (글로벌창업사관학교 최우수) — 2년 연속 장관상', '수상', 44),
(45, '2026', 'Pre Series-B 라운드 추진 — Target Value 300억', '현재', 45);

SELECT setval('history_id_seq', (SELECT MAX(id) FROM history));

-- ============================================================
-- SECTION 10: INITIAL DATA — 멤버 (4명)
-- ============================================================

INSERT INTO members (id, name, role, description, image_url, sort_order) VALUES
(1, '신인근', 'CEO · Founder', '종합상사·금융권 10년 구조화 금융 전문', NULL, 1),
(2, '박진용', 'CSO · Co-Founder', '투자 유치(IR), B2B 영업망 구축 총괄', NULL, 2),
(3, '송인탁', 'COO · Co-Founder', '구조적 리스크 통제 시스템 설계', NULL, 3),
(4, '임지훈', 'CIO · 혁신이사', 'AI 동적 리스크 스코어링, 해외 R&D 총괄', NULL, 4);

SELECT setval('members_id_seq', (SELECT MAX(id) FROM members));

-- ============================================================
-- SECTION 11: INITIAL DATA — 파트너 (24개사)
-- ============================================================

INSERT INTO partners (id, name, category, logo_url, sort_order) VALUES
-- 투자회사 (9개)
(1, '큐네스티', '투자회사', NULL, 1),
(2, '마그나인베스트먼트', '투자회사', NULL, 2),
(3, '인포뱅크', '투자회사', NULL, 3),
(4, '소풍벤처스', '투자회사', NULL, 4),
(5, '수이제네리스파트너스', '투자회사', NULL, 5),
(6, '한국투자AC', '투자회사', NULL, 6),
(7, 'HG Initiative', '투자회사', NULL, 7),
(8, '두나미스자산운용', '투자회사', NULL, 8),
(9, '빅베이슨캐피탈', '투자회사', NULL, 9),
-- 지원사업 기관,
(10, '한국핀테크지원센터', '지원사업 기관', NULL, 10),
(11, '서울핀테크랩', '지원사업 기관', NULL, 11),
(12, '서울창조경제센터', '지원사업 기관', NULL, 12),
(13, '인천창조경제센터', '지원사업 기관', NULL, 13),
(14, '전북창조경제센터', '지원사업 기관', NULL, 14),
(15, '대구창조경제센터', '지원사업 기관', NULL, 15),
(16, 'IBK창공', '지원사업 기관', NULL, 16),
(17, '신한퓨처스랩', '지원사업 기관', NULL, 17),
(18, '아시아에프앤아이', '지원사업 기관', NULL, 18),
-- 제휴사,
(19, '더포스', '제휴사', NULL, 19),
(20, '서울다이나믹스', '제휴사', NULL, 20),
(21, '큰삼촌컴퍼니', '제휴사', NULL, 21),
(22, '그랜터', '제휴사', NULL, 22),
(23, '씨앤테크', '제휴사', NULL, 23),
(24, '에이아이지먼트', '제휴사', NULL, 24);

SELECT setval('partners_id_seq', (SELECT MAX(id) FROM partners));

-- ============================================================
-- SECTION 12: VERIFICATION QUERIES
-- ============================================================

-- 데이터 건수 확인
SELECT 'notices' AS table_name, COUNT(*) AS row_count FROM notices
UNION ALL
SELECT 'press', COUNT(*) FROM press
UNION ALL
SELECT 'faqs', COUNT(*) FROM faqs
UNION ALL
SELECT 'history', COUNT(*) FROM history
UNION ALL
SELECT 'members', COUNT(*) FROM members
UNION ALL
SELECT 'partners', COUNT(*) FROM partners;

-- 파트너 카테고리별 건수
SELECT category, COUNT(*) AS count
FROM partners
GROUP BY category
ORDER BY category;

-- FAQ 카테고리별 건수
SELECT category, COUNT(*) AS count
FROM faqs
GROUP BY category
ORDER BY category;

-- 연혁 연도별 이벤트 수
SELECT year, COUNT(*) AS events
FROM history
GROUP BY year
ORDER BY year;

-- 팝업 공지사항 확인
SELECT id, title, is_popup, popup_start, popup_end
FROM notices
WHERE is_popup = true;
