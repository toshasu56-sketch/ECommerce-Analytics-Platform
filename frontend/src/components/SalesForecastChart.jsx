import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";

function SalesForecastChart({ data, darkMode }) {
  return (
    <div
      style={{
        background: darkMode ? "#1f2937" : "#ffffff",
        color: darkMode ? "#ffffff" : "#111827",
        padding: "20px",
        borderRadius: "12px",
        marginTop: "30px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
      }}
    >
      <h2 style={{ marginBottom: "20px" }}>
        📈 Sales Forecast
      </h2>

      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip />

          <Legend />

          <Line
            type="monotone"
            dataKey="actual"
            stroke="#2563eb"
            strokeWidth={3}
            name="Actual Revenue"
          />

          <Line
            type="monotone"
            dataKey="forecast"
            stroke="#16a34a"
            strokeDasharray="6 6"
            strokeWidth={3}
            name="Forecast"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default SalesForecastChart;