export default function Loading() {
  return (
    <section
      style={{
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: 32,
          height: 32,
          border: "3px solid #e2e8f0",
          borderTopColor: "var(--br)",
          borderRadius: "50%",
          animation: "spin 0.8s linear infinite",
        }}
      />
    </section>
  );
}
