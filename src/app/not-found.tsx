"use client";

export default function NotFound() {
  return (
    <section
      style={{
        padding: "180px 24px 120px",
        textAlign: "center",
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div>
        <h1
          style={{
            fontFamily: "var(--fd)",
            fontWeight: 800,
            fontSize: 72,
            color: "var(--br)",
            marginBottom: 16,
          }}
        >
          404
        </h1>
        <h2
          style={{
            fontFamily: "var(--fd)",
            fontWeight: 700,
            fontSize: 24,
            marginBottom: 12,
          }}
        >
          페이지를 찾을 수 없습니다
        </h2>
        <p style={{ fontSize: 16, color: "var(--tm)", marginBottom: 36 }}>
          요청하신 페이지가 존재하지 않거나 이동되었습니다.
        </p>
        <a
          href="/"
          style={{
            padding: "14px 32px",
            background: "var(--br)",
            color: "#fff",
            borderRadius: 8,
            textDecoration: "none",
            fontWeight: 600,
            fontSize: 16,
          }}
        >
          홈으로 돌아가기
        </a>
      </div>
    </section>
  );
}
