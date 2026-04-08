"use client";
import { Reveal } from "@/components/ui/Reveal";

// === PRIVACY POLICY PAGE ===

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div style={{ marginBottom: 48 }}>
    <h2 style={{ fontFamily: "var(--fd)", fontWeight: 700, fontSize: 18, color: "var(--td)", borderBottom: "2px solid var(--bd)", paddingBottom: 12, marginBottom: 20 }}>{title}</h2>
    {children}
  </div>
);

const Para = ({ children }: { children: React.ReactNode }) => (
  <p style={{ fontSize: 14, color: "var(--tm)", lineHeight: 1.85, marginBottom: 12 }}>{children}</p>
);

const Tbl = ({ headers, rows }: { headers: string[]; rows: string[][] }) => (
  <div style={{ overflowX: "auto", borderRadius: 8, border: "1px solid var(--bd)", marginBottom: 20 }}>
    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
      <thead>
        <tr style={{ background: "var(--alt)" }}>
          {headers.map((h, i) => (
            <th key={i} style={{ padding: "10px 14px", textAlign: "left", fontFamily: "var(--fd)", fontWeight: 600, color: "var(--td)", borderBottom: "1px solid var(--bd)", whiteSpace: "nowrap" }}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, ri) => (
          <tr key={ri} style={{ borderBottom: ri < rows.length - 1 ? "1px solid var(--blt)" : "none" }}>
            {row.map((cell, ci) => (
              <td key={ci} style={{ padding: "10px 14px", color: "var(--tm)", lineHeight: 1.7, verticalAlign: "top" }}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const Li = ({ children }: { children: React.ReactNode }) => (
  <li style={{ fontSize: 14, color: "var(--tm)", lineHeight: 1.85, marginBottom: 6 }}>{children}</li>
);

const InfoBox = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: "var(--alt)", border: "1px solid var(--bd)", borderRadius: 10, padding: "16px 20px", marginBottom: 20 }}>
    {children}
  </div>
);

const SubHead = ({ children }: { children: React.ReactNode }) => (
  <h3 style={{ fontFamily: "var(--fd)", fontWeight: 600, fontSize: 15, color: "var(--td)", marginBottom: 10, marginTop: 20 }}>{children}</h3>
);

const Divider = () => (
  <div style={{ height: 1, background: "var(--bd)", margin: "56px 0" }} />
);

export default function PrivacyPage() {
  return <>
    {/* Hero */}
    <section style={{ padding: "140px 24px 80px", background: "var(--nd)" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <Reveal>
          <div className="slbl" style={{ color: "var(--bw)" }}>LEGAL</div>
          <h1 style={{ fontFamily: "var(--fd)", fontWeight: 900, fontSize: "clamp(32px,5vw,52px)", color: "#fff", letterSpacing: "-.03em", lineHeight: 1.1, margin: "8px 0 20px" }}>개인정보 처리방침</h1>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,.5)", lineHeight: 1.7 }}>주식회사 276홀딩스는 이용자의 개인정보를 소중히 보호하며<br/>관련 법규를 성실히 준수합니다.</p>
        </Reveal>
      </div>
    </section>

    {/* Body */}
    <section style={{ padding: "72px 24px 96px", background: "#fff" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>

          {/* Preamble */}
          <div style={{ marginBottom: 48 }}>
            <Para>주식회사 276홀딩스(이하 "회사")는 정보통신망 이용촉진 및 정보보호 등에 관한 법률, 개인정보 보호법 등에서 정한 개인정보보호규정을 준수하며, 관련 법규에 의거한 개인정보 처리방침(이하 '개인정보처리방침')을 정하여 이용자 권익보호에 최선을 다하고 있습니다.</Para>
            <Para>"회사"는 개인정보처리방침을 통하여 회원님께서 제공하시는 개인정보가 어떠한 용도와 방식으로 이용되고 있으며, 개인정보보호를 위해 어떠한 조치가 취해지고 있는지 알려드립니다. "회사"는 개인정보처리방침을 개정하는 경우 "회사"가 운영하는 웹사이트(이하 "사이트")에 공지사항(또는 개별공지)을 통하여 공지할 것입니다.</Para>
            <Para>"회사"는 이용자의 동의를 기반으로 개인정보를 수집·이용 및 제공하고 있으며, 이용자의 권리(개인정보 자기결정권)를 적극적으로 보장합니다. 개인정보처리방침이란 이용자의 소중한 개인정보를 보호함으로써 이용자가 안심하고 서비스를 이용할 수 있도록 회사가 준수해야 할 지침을 의미합니다.</Para>
            <Para>개인정보처리방침의 '이용자'는 처리되는 정보에 의하여 알아볼 수 있는 사람으로서 그 정보의 주체가 되는 사람을 말합니다. "회원"은 "이용자" 중 회사가 제공하는 서비스를 이용하는 자(이용하려는 자 포함)를 의미합니다. "차입회원"은 주식회사 한국기업금융대부(이하 '연계 금융회사')로부터 전자어음대출 약정을 체결한 회원(체결하려는 회원 포함)를 의미하고, "투자회원"은 연계 금융회사가 보유한 대출채권에 기반한 원리금수취권을 매입한 회원을 의미합니다.</Para>
          </div>

          {/* 제1조 */}
          <Section title="제1조 개인정보의 수집·이용 목적">
            <Para>"회사"는 다음과 같은 목적을 위해 이용자의 개인정보를 수집·이용합니다.</Para>
            <SubHead>① 회원관리</SubHead>
            <ul style={{ paddingLeft: 20, marginBottom: 12 }}>
              <Li>회원 가입 의사의 확인, 연령 확인, 이용자 및 법정대리인의 본인 확인, 이용자 식별, 회원탈퇴 의사의 확인, 고지사항 전달</Li>
              <Li>법령 및 이용약관을 위반하는 회원에 대한 이용 제한 조치, 부정 이용행위 방지 및 제재, 계정도용 및 부정거래 방지, 약관 개정 등의 고지사항 전달</Li>
            </ul>
            <SubHead>② 온라인 대출정보 중개</SubHead>
            <Para>이용자를 위한 온라인 대출정보 중개(차입회원이 할인의뢰한 어음 게시, 투자회원에 대한 해당 어음대출채권에 대한 투자 안내 등), 이용자와 주식회사 한국기업금융대부 간 대출채권에 기초한 원리금수취권 양수도 거래를 위한 중개 및 지원</Para>
            <SubHead>③ 민원업무 처리</SubHead>
            <Para>민원인의 신원 확인, 민원사항 확인, 사실조사를 위한 연락·통지, 처리결과 통보, 분쟁조정을 위한 기록 보존 등</Para>
            <SubHead>④ 서비스 개발·제공·향상</SubHead>
            <Para>콘텐츠 등 기존 서비스 제공에 더하여, 인구통계학적 분석, 서비스 방문 및 이용기록의 분석, 개인정보 및 관심에 기반한 이용자간 관계의 형성, 지인 및 관심사 등에 기반한 맞춤형 서비스 제공 등 신규 서비스 요소의 발굴 및 기존 서비스 개선</Para>
            <SubHead>⑤ 마케팅 및 광고에의 활용</SubHead>
            <Para>신규 상품 및 서비스 홍보 및 매출권유, 경품지급, 사은행사 등 이용자에 대한 편의 제공. 단, 이용자가 마케팅 정보 수신에 동의한 경우에 한하여 적용됩니다.</Para>
          </Section>

          {/* 제2조 */}
          <Section title="제2조 수집하는 개인정보의 항목 및 수집방법">
            <SubHead>① 개인정보 항목</SubHead>
            <Para>"회사"는 회원가입, 원활한 고객 상담, 각종 서비스 등 기본적인 서비스 제공을 위해 아래와 같은 개인정보를 수집하고 있습니다.</Para>
            <Tbl
              headers={["구분", "항목"]}
              rows={[
                ["개인투자회원", "주민등록번호(법령상 허용되는 처리 목적 이용에 한함), 성명, 휴대폰 번호, 자택주소, 계좌정보(은행명, 예금주명, 계좌번호)"],
                ["법인투자회원", "사업자등록번호, 상호, 전화번호, 주소, 사업자등록증에 포함된 모든 정보, 계좌정보(은행명, 예금주명, 계좌번호)"],
                ["대부업등록 투자회원", "사업자등록번호, 상호, 전화번호, 주소, 사업자등록증 및 대부업등록증에 포함된 모든 정보, 계좌정보(은행명, 예금주명, 계좌번호)"],
                ["국내거주 외국인 투자회원", "외국인 등록번호, 자택주소, 외국인 등록증에 포함된 모든 정보, 계좌정보(은행명, 예금주명, 계좌번호)"],
                ["재외국인 투자회원", "재외국민 주민등록번호(법령상 허용되는 처리 목적 이용에 한함), 자택주소, 재외국민 주민등록증에 포함된 모든 정보, 계좌정보(은행명, 예금주명, 계좌번호)"],
                ["(금융)거래정보", "투자회원이 투자한 대출채권의 종류 및 내용, 대출채권 원리금양수도 거래조건(금액, 수익률, 만기일 등), 거래 설정·내역 정보"],
                ["투자 한도 초과 예외 요청 시", "금융투자자산 잔액 현황, 연소득 증빙 서류, 총자산 증빙 서류, 전문투자자 확인증 등"],
                ["회원 부가정보", "자택주소, 전화번호, 생년월일, 계좌번호, 대출환급계좌번호"],
                ["회원 관리정보", "회원의 등급, 회원자격의 정지 또는 서비스 이용제한의 이력"],
              ]}
            />
            <Para>※ 서비스 이용과정에서 자동 수집될 수 있는 항목: 브라우저 종류 및 OS, 검색어, 서비스 이용 기록, IP Address, CPU ID, HDD Serial number, IMEI, UUID, 방문 일시, 결제기록, 쿠키</Para>
            <SubHead>② 개인정보 수집방법</SubHead>
            <ul style={{ paddingLeft: 20 }}>
              <Li>홈페이지·팩스·전화를 통한 회원가입, 서비스 이용, 이벤트 응모, 회원정보수정, 고객센터 문의</Li>
              <Li>스크래핑, 생성정보 수집툴을 통한 수집</Li>
              <Li>협력회사로부터의 제공</Li>
            </ul>
          </Section>

          {/* 제3조 */}
          <Section title="제3조 개인정보 제3자 제공 현황">
            <Para>회사는 원칙적으로 고객의 개인정보를 제1조에서 명시한 목적 범위 내에서 처리하며, 회원의 사전 동의 없이는 본래의 범위를 초과하여 처리하거나 제3자에게 제공하지 않습니다. 단, 다음 각 호의 경우에는 예외가 적용됩니다.</Para>
            <ul style={{ paddingLeft: 20, marginBottom: 20 }}>
              <Li>회원이 사전에 제3자 제공 및 공개에 동의한 경우</Li>
              <Li>다른 법률에 특별한 규정에 의거하거나, 수사 목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구가 있는 경우</Li>
              <Li>회원 또는 그 법정대리인이 의사표시를 할 수 없는 상태에 있거나, 주소불명 등으로 사전 동의를 받을 수 없는 경우로서 명백히 회원 또는 제3자의 급박한 생명, 신체, 재산의 이익을 위하여 필요하다고 인정되는 경우</Li>
              <Li>통계작성 및 학술연구 등의 목적을 위하여 필요한 경우로서 특정 개인을 알아볼 수 없는 형태로 개인정보를 제공하는 경우</Li>
            </ul>
            <Tbl
              headers={["제공받는 자", "이용목적", "제공하는 개인정보 항목"]}
              rows={[
                ["웰컴저축은행 주식회사, 웰컴페이먼츠 주식회사", "투자금의 예치 및 관리를 위한 업무", "(투자자) 성명, 암호화된 주민등록번호, 생년월일, 성별, 휴대폰번호, 이메일주소, 투자금관리번호 및 출금계좌 정보, 금융거래정보\n(차입자) 성명, 생년월일, 성별, 휴대폰번호, 이메일주소, 주소 및 우편번호, 대출정보, 대출금입금계좌"],
                ["나이스평가정보 주식회사", "본인인증", "성명, 휴대폰번호, 생년월일"],
              ]}
            />
          </Section>

          {/* 제4조 */}
          <Section title="제4조 개인정보 위탁 현황">
            <Para>"회사"는 더 나은 서비스를 제공하기 위하여 필요한 업무 중 일부를 외부 업체에 위탁하고 있으며, 위탁받은 업체가 정보통신망법에 따라 개인정보를 안전하게 처리하도록 관리·감독하고 있습니다.</Para>
            <Tbl
              headers={["수탁업체", "위탁 업무내용"]}
              rows={[
                ["사단법인 금융결제원", "CMS 출금이체 서비스"],
                ["신승회계법인", "소득세 원천징수영수증의 작성"],
                ["주식회사 누리고", "비즈 메시징 서비스(SMS, 알림톡, 비즈메시지 발송대행)"],
                ["주식회사 코스콤", "온라인 인프라(서버, 데이터베이스, CDN, 파일관리 등) 관리 및 메일, Mobile push 발송"],
                ["Amazon Web Service, Inc.", "온라인 인프라(서버, 데이터베이스, CDN, 파일관리 등) 관리 및 메일, Mobile push 발송"],
                ["Google Asia Pacific Pte. Ltd.", "사내 업무 플랫폼"],
                ["주식회사 지제이텍", "전산설비 유지보수"],
              ]}
            />
          </Section>

          {/* 제5조 */}
          <Section title="제5조 개인정보의 보유 및 이용기간">
            <Para>"회사"는 이용자에게 서비스이용 및 제공에 관한 동의를 얻은 시점으로부터, 서비스 목적이 달성될 때까지 이용자의 개인정보를 보유 및 이용합니다. 회원이 탈퇴를 요청하거나 개인정보의 수집 및 이용에 대한 동의를 철회하는 경우, 수집 및 이용목적이 달성되거나 보유 및 이용기간이 종료한 경우 해당 개인정보를 지체 없이 파기합니다.</Para>
            <Para>다만, "회사"는 이용자가 플랫폼 서비스 회원에서 탈퇴하거나, "회사가" 회원을 제명하는 경우 권리남용, 악용방지, 권리침해, 명예훼손 분쟁 및 수사협조 의뢰에 대비하여 이용계약 해지일로부터 3년 동안 개인정보를 보존합니다.</Para>
            <Para>관계법령의 규정에 의하여 보존할 필요가 있는 경우 아래와 같이 관계법령에서 정한 일정한 기간 동안 회원정보를 보관합니다.</Para>
            <InfoBox>
              <SubHead>① 전자상거래 등에서의 소비자 보호에 관한 법률</SubHead>
              <ul style={{ paddingLeft: 20 }}>
                <Li>계약 또는 청약철회 등에 관한 기록: 5년 보관</Li>
                <Li>대금결제 및 재화 등의 공급에 관한 기록: 5년 보관</Li>
                <Li>소비자의 불만 또는 분쟁처리에 관한 기록: 3년 보관</Li>
                <Li>표시·광고에 관한 기록: 6개월 보관</Li>
              </ul>
              <SubHead>② 통신비밀보호법</SubHead>
              <ul style={{ paddingLeft: 20 }}>
                <Li>접속로그 등 서비스 이용에 관한 기록: 3개월</Li>
              </ul>
              <SubHead>③ 기타</SubHead>
              <ul style={{ paddingLeft: 20 }}>
                <Li>고객의 동의를 받은 경우: 동의를 받은 기간까지</Li>
              </ul>
            </InfoBox>
          </Section>

          {/* 제6조 */}
          <Section title="제6조 개인정보의 파기 절차 및 방법">
            <Para>"회사"는 원칙적으로 이용자의 개인정보를 회원 탈퇴 시 지체없이 파기하고 있습니다. 다만, 이용자에게 개인정보 보관기간에 대해 별도의 동의를 얻은 경우, 또는 법령에서 일정기간 정보보관 의무를 부과하는 경우에는 해당 기간 동안 개인정보를 안전하게 보관합니다.</Para>
            <ul style={{ paddingLeft: 20 }}>
              <Li><strong>파기절차:</strong> 이용자가 회원가입 등을 위해 입력한 정보는 목적이 달성된 후 별도의 DB로 옮겨져(종이의 경우 별도의 서류함) 「개인정보의 처리 및 보유기간」에 따라 일정 기간 보관된 후 파기됩니다. 개인정보는 법률에 의한 경우가 아니고서는 보존 이외의 다른 목적으로 이용되거나 제공되지 않습니다.</Li>
              <Li><strong>파기방법:</strong> 전자적 파일 형태인 경우 복원이 불가능한 방법으로 영구 삭제하며, 그 외의 기록물, 인쇄물, 서면, 기타 기록매체인 경우에는 파쇄, 소각, 용해 등의 방법으로 파기합니다.</Li>
            </ul>
          </Section>

          {/* 제7조 */}
          <Section title="제7조 이용자 및 법정대리인의 권리와 행사방법">
            <SubHead>① 개인정보의 열람·정정</SubHead>
            <ul style={{ paddingLeft: 20, marginBottom: 16 }}>
              <Li>이용자 및 법정대리인은 언제든지 등록되어 있는 이용자의 개인정보를 열람하거나 정정할 수 있습니다. 개인정보 열람 및 정정은 '개인정보변경' 또는 '회원정보수정'에서 직접 처리할 수 있으며, 개인정보 보호 책임자에게 서면, 전화 또는 E-mail을 통해서도 가능합니다.</Li>
              <Li>이용자가 개인정보 오류 정정을 요청한 경우, 정정 완료 전까지 당해 개인정보를 이용 또는 제공하지 않습니다.</Li>
              <Li>잘못된 개인정보를 제3자에게 이미 제공한 경우에는 정정 처리결과를 제3자에게 지체없이 통지하여 정정하도록 조치하겠습니다.</Li>
            </ul>
            <SubHead>② 개인정보의 수집·이용·제공 동의철회</SubHead>
            <ul style={{ paddingLeft: 20 }}>
              <Li>이용자 및 법정대리인은 언제든지 개인정보의 수집, 이용, 제공에 대한 동의내용을 철회할 수 있습니다. 동의철회는 개인정보 보호 책임자에게 서면, 전화, E-mail을 통해서 신청할 수 있으며, 담당자는 접수 즉시 동의철회 등록, 개인정보 파기 등의 조치를 취한 후 해당사실을 이용자에게 통지합니다.</Li>
              <Li>회사는 이용자 혹은 법정 대리인의 요청에 의해 동의철회된 개인정보를 제5조 및 제6조에 명시된 바에 따라 파기하고 그 외의 용도로 열람 또는 이용할 수 없도록 처리하고 있습니다.</Li>
            </ul>
          </Section>

          {/* 제8조 */}
          <Section title="제8조 쿠키(Cookie) 수집 장치의 설치·운영 및 거부">
            <Para>회사는 고객의 정보를 수시로 저장하고 찾아내는 '쿠키(cookie)'를 이용합니다. 쿠키란 회사의 웹사이트를 운영하는데 이용되는 서버가 고객의 브라우저에 보내는 아주 작은 텍스트 파일로서 고객의 컴퓨터 하드디스크에 저장됩니다.</Para>
            <SubHead>① 쿠키 사용 목적</SubHead>
            <InfoBox>
              <Para>수집목적: 고객 편의 제공 (웹 페이지 맞춤 설정, 웹페이지 탐색 등)</Para>
              <Para>수집항목: 접속빈도, 방문시간, 웹사이트 이용내역 정보 등 쿠키정보</Para>
              <Para style={{ marginBottom: 0 }}>보유기간: 웹페이지 종료시까지</Para>
            </InfoBox>
            <SubHead>② 쿠키 설정 거부 방법</SubHead>
            <ul style={{ paddingLeft: 20 }}>
              <Li>Internet Explorer: 웹 브라우저 상단의 도구 → 인터넷 옵션 → 개인정보 → 고급 → 쿠키 설정</Li>
              <Li>Chrome: 웹 브라우저 상단 설정 → 화면 하단 고급 설정 → 개인정보 → 쿠키설정</Li>
              <Li>고객님은 쿠키 설치에 대한 선택권을 가지고 있습니다. 따라서 고객님은 웹 브라우저에서 옵션을 설정함으로써 모든 쿠키를 허용하거나, 쿠키가 저장될 때마다 확인을 거치거나, 아니면 모든 쿠키의 저장을 거부할 수도 있습니다.</Li>
              <Li>단, 쿠키 설치를 거부하였을 경우 서비스 제공에 어려움이 있을 수 있습니다.</Li>
            </ul>
          </Section>

          {/* 제9조 */}
          <Section title="제9조 개인정보의 안전성 확보 조치">
            <Para>회사는 개인정보를 처리할 때 개인정보가 분실, 도난, 유출, 변조 또는 훼손되지 않도록 안전성 확보를 위하여 다음과 같은 조치를 하고 있습니다.</Para>
            <ul style={{ paddingLeft: 20 }}>
              <Li><strong>내부관리계획의 수립·시행:</strong> 개인정보의 안전한 처리를 위하여 내부관리계획을 수립·시행하고 있습니다.</Li>
              <Li><strong>개인정보에 대한 접근 통제:</strong> 데이터베이스시스템에 대한 접근권한의 부여, 변경, 말소를 통하여 접근통제를 위한 조치를 하고 있으며, 침입차단시스템을 이용하여 외부로부터의 무단접근을 통제하고 있습니다.</Li>
              <Li><strong>개인정보의 암호화:</strong> 개인정보는 암호화 등을 통해 안전하게 저장 및 관리되고 있습니다. 또한 중요한 데이터는 저장 및 전송 시 암호화하여 사용하는 등의 별도 보안기능을 사용하고 있습니다.</Li>
              <Li><strong>보안 프로그램 설치 및 주기적인 점검·갱신:</strong> 해킹이나 컴퓨터 바이러스 등에 의한 개인정보 유출 및 훼손을 막기 위하여 보안프로그램을 설치하고 주기적인 갱신·점검을 합니다.</Li>
              <Li><strong>비인가자에 대한 출입통제:</strong> 개인정보처리시스템의 물리적 보관 장소를 별도로 두고 이에 대해 출입통제 절차를 수립·운영하고 있습니다.</Li>
              <Li><strong>개인정보 취급 직원의 최소화 및 교육:</strong> 개인정보를 취급하는 직원을 지정하고 담당자에 한정시켜 최소화하여 개인정보를 관리하는 대책을 시행하고 있습니다.</Li>
              <Li><strong>접속기록의 보관:</strong> 개인정보처리시스템에 접속한 기록을 최소 6개월 이상 보관·관리하고 있습니다.</Li>
            </ul>
          </Section>

          {/* 제10조 */}
          <Section title="제10조 개인정보 보호책임자">
            <Para>회사는 고객의 개인정보를 보호하고 개인정보와 관련한 고객의 불만사항을 처리하기 위하여 개인정보보호책임자 및 실무담당자를 두고 있습니다.<br/>(개인정보보호법 제31조 제1항 및 정보통신망 이용촉진 및 정보보호 등에 관한 법률 제27조 제1항에 따른 개인정보보호책임자)</Para>
            <Tbl
              headers={["구분", "내용"]}
              rows={[
                ["성명", "박충만"],
                ["소속/직책", "276홀딩스 / 개발팀장"],
                ["전화번호", "02-785-7080"],
                ["주소", "서울특별시 영등포구 여의서로 43, 913호 (한서리버파크)"],
                ["E-mail", "captain@276holdings.com"],
              ]}
            />
          </Section>

          {/* 제11조 */}
          <Section title="제11조 권익침해 구제방법">
            <Para>이용자는 개인정보침해로 인한 구제를 받기 위하여 개인정보분쟁조정위원회, 한국인터넷진흥원 개인정보침해신고센터 등에 분쟁해결이나 상담 등을 신청할 수 있습니다.</Para>
            <ul style={{ paddingLeft: 20 }}>
              <Li>개인정보분쟁조정위원회: <a href="https://www.kopico.go.kr" target="_blank" rel="noopener noreferrer" style={{ color: "var(--br)" }}>www.kopico.go.kr</a> / 1833-6972</Li>
              <Li>한국인터넷진흥원 개인정보침해신고센터: <a href="https://www.privacy.go.kr" target="_blank" rel="noopener noreferrer" style={{ color: "var(--br)" }}>www.privacy.go.kr</a> / 국번 없이 118</Li>
              <Li>정보보호마크인증위원회: <a href="https://www.eprivacy.or.kr" target="_blank" rel="noopener noreferrer" style={{ color: "var(--br)" }}>www.eprivacy.or.kr</a> / 02-550-9531</Li>
              <Li>대검찰청 첨단범죄수사과: <a href="https://www.spo.go.kr" target="_blank" rel="noopener noreferrer" style={{ color: "var(--br)" }}>www.spo.go.kr</a> / 02-3480-2000</Li>
              <Li>경찰청 사이버안전국: <a href="https://cyberbureau.police.go.kr" target="_blank" rel="noopener noreferrer" style={{ color: "var(--br)" }}>cyberbureau.police.go.kr</a> / 국번없이 182</Li>
            </ul>
          </Section>

          {/* 제12조 */}
          <Section title="제12조 개인정보 처리방침 변경">
            <Para>본 『개인정보 처리방침』은 2017년 7월 19일에 최초 게시되며, 내용 추가, 삭제 및 수정이 있을 시에는 홈페이지의 "공지사항"을 통해 고지합니다.</Para>
          </Section>

          <Divider />

          {/* 한국기업금융대부 */}
          <div style={{ marginBottom: 32 }}>
            <div className="slbl">연계 금융회사</div>
            <h2 style={{ fontFamily: "var(--fd)", fontWeight: 800, fontSize: "clamp(20px,3vw,28px)", color: "var(--td)", letterSpacing: "-.02em", margin: "8px 0 16px" }}>개인정보 처리방침<br/><span style={{ color: "var(--br)", fontSize: "0.7em", fontWeight: 600 }}>주식회사 한국기업금융대부</span></h2>
            <Para>'주식회사 한국기업금융대부'(이하 '회사')는 정보통신망 이용촉진 및 정보보호 등에 관한 법률, 개인정보 보호법 등 관련 법규상의 개인정보보호규정을 준수하며, 관련 법규에 의거한 개인정보 처리방침을 정하여 고객의 개인정보 보호 및 권익보호에 최선을 다하고 있습니다.</Para>
          </div>

          <Section title="① 개인정보의 처리 목적">
            <SubHead>1. (금융)거래 설정 등</SubHead>
            <ul style={{ paddingLeft: 20, marginBottom: 16 }}>
              <Li>(금융)거래관계의 설정 여부 판단</Li>
              <Li>(금융)거래의 설정·유지·이행·사후관리 목적을 위한 개인(신용)정보의 조회</Li>
              <Li>회사는 개인(신용)정보 조회를 통하여 신용정보회사(NICE평가정보㈜)로부터 고객님의 개인(신용)정보를 제공받고 있습니다.</Li>
              <Li>(금융)거래관계의 설정·유지·이행·사후관리(신용관련 통계분석 모형개발 포함)</Li>
              <Li>금융사고 조사, 분쟁 해결, 민원 처리, 수사협조 및 법령상 의무이행 등</Li>
            </ul>
            <SubHead>2. 상품서비스 안내 등 마케팅 활동</SubHead>
            <ul style={{ paddingLeft: 20 }}>
              <Li>회사와 주식회사 한국어음중개의 상품·서비스 홍보 및 이용권유, 고객에 대한 사은행사 및 판촉행사 등의 마케팅 활동 서비스 제공</Li>
              <Li>당사 내부의 시장조사 및 상품개발 연구 등</Li>
              <Li>고객 만족도 조사</Li>
            </ul>
          </Section>

          <Section title="② 처리하는 개인정보의 항목">
            <Tbl
              headers={["구분", "항목"]}
              rows={[
                ["대출자 식별정보", "성명, 주소, (휴대)전화번호, 계좌번호, 이메일주소"],
                ["신용거래정보", "본 거래 이전, 이후의 실적을 포함한 거래내용을 판단할 수 있는 정보"],
                ["신용능력정보", "재산·채무·소득의 총액·납세실적"],
                ["신용평가정보", "신용등급, 신용평점 등"],
                ["신용도판단정보", "연체, 부도, 대지급, 신용질서 문란행위 신용정보 일체"],
                ["대출신청정보", "대출신청일자, 신청채널, 신청상품"],
                ["공공기관정보", "개인회생, 파산, 면책, 채무불이행등재 등 법원의 재판·결정 정보, 각종 체납정보, 주민등록 관련정보 등"],
                ["기타 정보", "기타 (금융)거래의 설정·유지·이행 관리 및 신용도 판단을 위한 상담, 채권관리 등을 통해 생성되는 정보"],
              ]}
            />
            <Para>※ 본 동의 이전에 발생한 개인(신용)정보도 포함합니다.</Para>
            <Para>수집방법: 홈페이지·팩스·전화·서면·SNS(카카오톡 등)·APP, 스크래핑·생성정보 수집 툴을 통한 수집</Para>
          </Section>

          <Section title="③ 개인정보의 처리 및 보유 기간">
            <Para>(금융)거래와 관련한 개인(신용)정보는 (금융)계약 종료일로부터 5년까지 보유·이용됩니다. 단, (금융)계약 종료일 후에는 금융사고, 조사, 분쟁 해결, 민원처리, 법령상 의무이행, 리스크 관리업무를 위하여만 보유·이용됩니다.</Para>
            <Para>상품서비스 안내 등과 관련한 개인(신용)정보는 수집·이용에 관한 동의일로부터 (금융)계약 종료 후 3개월까지 또는 동의철회시까지 보유·이용됩니다.</Para>
            <InfoBox>
              <ul style={{ paddingLeft: 20 }}>
                <Li>전자금융거래법 — 전자금융 거래에 관한 기록: 5년 보관</Li>
                <Li>국세기본법 — 거래에 관한 장부 및 증거서류 등에 관한 기록: 5년</Li>
                <Li>기타 고객의 동의를 받은 경우: 동의를 받은 기간까지</Li>
              </ul>
            </InfoBox>
          </Section>

          <Section title="④ 제3자 제공 현황">
            <Tbl
              headers={["제공받는 자", "이용목적", "제공하는 개인정보 항목"]}
              rows={[
                ["주식회사 276홀딩스", "대출심사 및 대출계약 체결·이행·유지·관리, 추심 및 매각", "성명, 생년월일, 성별, 신용등급, 대출 신청정보 등"],
                ["사단법인 한국신용정보원", "신용정보의 집중관리 및 활용 등 신용정보집중기관의 업무", "개인식별정보, 신용거래정보, 신용능력정보, 신용평가정보, 신용도판단정보, 공공기관정보, 대출신청정보"],
                ["금융감독원·지방자치단체·대부금융협회", "감독업무 정책자료활용 및 법령상 의무이행", "법령상 근거규정이 있는 경우에만 개인식별정보, 신용거래정보, 신용능력정보, 신용평가정보 등 선택적 제공"],
              ]}
            />
          </Section>

          <Section title="⑤ 개인정보처리 위탁">
            <Tbl
              headers={["수탁업체", "위탁 업무내용"]}
              rows={[
                ["주식회사 276홀딩스", "중개시스템 운영관리 및 시스템 개발, 개인정보보호업무의 수행, 홈페이지 유지보수"],
                ["사단법인 금융결제원", "CMS 출금이체 서비스"],
                ["나이스신용정보 주식회사", "채권추심"],
                ["주식회사 누리고", "비즈 메시징 서비스(SMS, 알림톡, 비즈메시지 발송대행)"],
                ["주식회사 코스콤", "온라인 인프라(서버, 데이터베이스, CDN, 파일관리 등) 관리 및 메일, Mobile push 발송"],
                ["Amazon Web Service, Inc.", "온라인 인프라(서버, 데이터베이스, CDN, 파일관리 등) 관리 및 메일, Mobile push 발송"],
                ["Google Asia Pacific Pte. Ltd.", "사내 업무 플랫폼"],
                ["주식회사 지제이텍", "전산설비 유지보수"],
              ]}
            />
            <Para>※ 제공한 개인(신용)정보는 제공목적 달성 시까지 또는 위탁계약 종료 시까지 보유·이용됩니다.</Para>
          </Section>

          <Section title="⑥~⑫ 파기 절차·이용자 권리·쿠키·안전조치·보호책임자·구제방법·변경">
            <Para>파기 절차 및 방법, 이용자 및 법정대리인의 권리와 행사방법, 쿠키 수집 장치의 설치·운영 및 거부에 관한 사항, 개인정보의 안전성 확보 조치, 개인정보 보호책임자 및 권익침해 구제방법에 관한 사항은 위 주식회사 276홀딩스의 개인정보처리방침 제6조~제11조와 동일한 기준을 적용합니다.</Para>
            <InfoBox>
              <Para style={{ marginBottom: 4 }}><strong>개인정보보호책임자</strong></Para>
              <Para style={{ marginBottom: 2 }}>성명: 박충만 | 소속/직책: 276홀딩스 / 개발팀장</Para>
              <Para style={{ marginBottom: 2 }}>전화번호: 02-785-7080</Para>
              <Para style={{ marginBottom: 0 }}>E-mail: captain@276holdings.com</Para>
            </InfoBox>
            <Para>본 처리방침은 2017년 7월 19일에 최초 게시되며, 내용 추가, 삭제 및 수정이 있을 시에는 홈페이지의 "공지사항"을 통해 고지합니다.</Para>
          </Section>

      </div>
    </section>
  </>;
}
