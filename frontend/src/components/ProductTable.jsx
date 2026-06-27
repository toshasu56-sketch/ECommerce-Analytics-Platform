function ProductTable({ products, darkMode }) {
  return (
    <div
      style={{
        background: darkMode ? "#1f2937" : "#ffffff",
        color: darkMode ? "#ffffff" : "#111827",
        padding: "20px",
        borderRadius: "12px",
        marginTop: "40px",
        overflowX: "auto",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      }}
    >
      <h2
        style={{
          marginBottom: "20px",
        }}
      >
        Products
      </h2>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          tableLayout: "fixed",
        }}
      >
        <thead>
          <tr
            style={{
              background: darkMode ? "#374151" : "#f3f4f6",
            }}
          >
            <th style={headerStyle}>ID</th>
            <th style={headerStyle}>Product</th>
            <th style={headerStyle}>Category</th>
            <th style={headerStyle}>Price</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product, index) => (
            <tr
              key={product.id}
              style={{
                background:
                  index % 2 === 0
                    ? darkMode
                      ? "#1f2937"
                      : "#ffffff"
                    : darkMode
                    ? "#111827"
                    : "#f9fafb",
              }}
            >
              <td style={cellStyle}>{product.id}</td>

              <td style={cellStyle}>
                {product.name}
              </td>

              <td style={cellStyle}>
                {product.category}
              </td>

              <td style={cellStyle}>
                ₹{product.price.toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const headerStyle = {
  border: "1px solid #d1d5db",
  padding: "14px",
  textAlign: "left",
  fontWeight: "bold",
};

const cellStyle = {
  border: "1px solid #d1d5db",
  padding: "12px",
  height: "50px",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
};

export default ProductTable;