function CategoryKpiCards({ data }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns:
          "repeat(auto-fit,minmax(220px,1fr))",
        gap: "20px",
        marginTop: "20px",
      }}
    >
      {data.map((item) => (
        <div
          key={item.category}
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "12px",
            boxShadow:
              "0 2px 10px rgba(0,0,0,0.1)",
          }}
        >
          <h3>{item.category}</h3>
          <h2>
            ₹{item.revenue.toLocaleString()}
          </h2>
        </div>
      ))}
    </div>
  );
}

export default CategoryKpiCards;