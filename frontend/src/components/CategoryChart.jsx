import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

function CategoryChart({ data }) {
  return (
    <div
      style={{
        marginTop: "40px",
        backgroundColor: "white",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      }}
    >
      <h2>Category-wise Sales</h2>

      <ResponsiveContainer width="100%" height={350}>
        <BarChart
          data={data}
          margin={{
            top: 30,
            right: 30,
            left: 20,
            bottom: 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />

          <XAxis
            dataKey="category"
            tick={{ fill: "#000", fontSize: 14 }}
          />

          <YAxis
            tick={{ fill: "#000", fontSize: 14 }}
          />

          <Tooltip />

          <Bar
            dataKey="sales"
            fill="#2563eb"
            radius={[6, 6, 0, 0]}
            label={{
              position: "top",
              fill: "#000",
              fontSize: 14,
            }}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default CategoryChart;