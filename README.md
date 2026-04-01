# 276홀딩스 기업 웹사이트

> 중소기업 공급망 금융 플랫폼 — FlowPay · FlowScore · FlowPoint

## 기술 스택

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + CSS Variables (인라인 → 점진적 전환)
- **Database**: Supabase (계획) / localStorage (현재 전환 중)
- **Icons**: Lucide React
- **Fonts**: Pretendard (본문), JetBrains Mono (코드/수치)
- **Deployment**: Vercel (예정)

## 프로젝트 구조

```
src/
├── app/                    # Next.js App Router 페이지
│   ├── layout.tsx          # 공통 레이아웃 (Nav, Footer, GeoHead)
│   ├── page.tsx            # 홈페이지
│   ├── flowpay/            # FlowPay 서비스 페이지
│   ├── flowscore/          # FlowScore 서비스 페이지
│   ├── flowpoint/          # FlowPoint 서비스 페이지
│   ├── about/              # 회사 소개
│   ├── contact/            # 문의하기
│   ├── faq/                # FAQ
│   ├── esg/                # ESG 보고서
│   ├── notices/            # 공지사항
│   ├── terms/              # 이용약관
│   └── admin/              # 관리자 패널
├── components/
│   ├── layout/             # Nav, Footer
│   ├── ui/                 # Reveal, Stat, SH, LI, Logo276
│   ├── home/               # HeroCanvas, LogoMarquee, NoticePopup, GeoHead
│   ├── service/            # FlowPayVisual, FlowScoreVisual, FlowPointVisual
│   └── admin/              # 관리자 UI 컴포넌트
├── hooks/                  # useNotices, usePress, useFaqs, useHistory, useMembers, usePartners
├── lib/                    # constants, supabase client, utils
├── data/                   # 기본 데이터 (partners, members, history, faqs, press, notices, logos, seo)
└── styles/                 # globals.css
```

## 관리자 기능 (6개 탭)

| 탭 | 기능 |
|---|---|
| 공지사항 | CRUD + 팝업 on/off + 캘린더 기반 노출 기간 |
| 언론보도 | URL 스크래핑 + CRUD |
| FAQ | 카테고리별 Q&A 관리 |
| 연혁 | 연도별 이벤트 관리 (복수 이벤트/년) |
| 멤버 | 프로필 사진 + 이름/직책/역할 관리 |
| 파트너 | 카테고리별 파트너 + 로고 이미지 관리 |

## 개발 환경 설정

```bash
# 1. 의존성 설치
npm install

# 2. 환경변수 설정
cp .env.local.example .env.local
# .env.local 파일에 Supabase 키 입력

# 3. 개발 서버 시작
npm run dev
```

## 배포

```bash
# GitHub 푸시
git add .
git commit -m "feat: initial setup"
git push origin main

# Vercel 자동 배포 (GitHub 연동 시)
```

## 데이터 마이그레이션 로드맵

1. **현재**: localStorage 기반 (아티팩트 환경 호환)
2. **Phase 1**: Supabase 테이블 생성 + hooks 전환
3. **Phase 2**: Supabase Auth 관리자 인증
4. **Phase 3**: Supabase Storage 이미지 호스팅 (base64 → URL)

## 디자인 시스템

| 요소 | 값 |
|---|---|
| Brand Color | `#a89586` |
| Brand Warm | `#c8a882` |
| Navy | `#0f1929` |
| Border Radius | `12px` |
| Font Display | Pretendard |
| Font Mono | JetBrains Mono |

---

© 2026 주식회사 276홀딩스
