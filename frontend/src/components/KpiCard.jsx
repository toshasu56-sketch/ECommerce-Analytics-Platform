function KpiCard({
  title,
  value,
  trend,
  positive,
  darkMode,
}) {
  console.log(title, value);
  return (
    <div
      style={{
        background: darkMode ? "#1f2937" : "white",
        color: darkMode ? "white" : "#111827",
        padding: "22px",
        borderRadius: "14px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
      }}
    >
      <h3
        style={{
          color: darkMode ? "#d1d5db" : "#6b7280",
          marginBottom: "15px",
        }}
      >
        {title}
      </h3>

      <h1
        style={{
          color: darkMode ? "#ffffff" : "#111827",
          marginBottom: "22px",
          fontSize: "34px",
          fontWeight: "700",
        }}
      >
        {value}
      </h1>

      <p
        style={{
          color: positive ? "#16a34a" : "#dc2626",
          fontWeight: "bold",
          fontSize: "18px",
        }}
      >
        {positive ? "▲" : "▼"} {trend}
      </p>
    </div>
  );
}

export default KpiCard;