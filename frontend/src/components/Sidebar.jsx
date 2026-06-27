function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const menuStyle = {
    padding: "14px 16px",
    borderRadius: "10px",
    cursor: "pointer",
    marginBottom: "10px",
    transition: "all 0.3s ease",
    whiteSpace: "nowrap",
    fontWeight: "500",
  };

  const scrollToSection = (id) => {
    const section = document.getElementById(id);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <aside
      style={{
        width: sidebarOpen ? "250px" : "80px",
        height: "100vh",
        background: "#0f172a",
        color: "#ffffff",
        position: "fixed",
        top: 0,
        left: 0,
        padding: "20px",
        boxSizing: "border-box",
        overflowY: "auto",
        borderRight: "1px solid #1e293b",
        transition: "all 0.3s ease",
        zIndex: 1000,
      }}
    >
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        style={{
          background: "transparent",
          border: "none",
          color: "white",
          fontSize: "24px",
          cursor: "pointer",
          marginBottom: "25px",
        }}
      >
        ☰
      </button>

      {sidebarOpen && (
        <h1
          style={{
            fontSize: "28px",
            fontWeight: "bold",
            marginBottom: "30px",
            textAlign: "center",
          }}
        >
          E-Commerce
        </h1>
      )}

      <ul
        style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
        }}
      >
        <li
          style={menuStyle}
          onClick={() => scrollToSection("dashboard")}
        >
          📊 {sidebarOpen && "Dashboard"}
        </li>

        <li
          style={menuStyle}
          onClick={() => scrollToSection("analytics")}
        >
          📈 {sidebarOpen && "Revenue Trend"}
        </li>

        <li
          style={menuStyle}
          onClick={() => scrollToSection("revenue")}
        >
          💰 {sidebarOpen && "Monthly Revenue"}
        </li>

        <li
          style={menuStyle}
          onClick={() => scrollToSection("customers")}
        >
          👥 {sidebarOpen && "Top Customers"}
        </li>

        <li
          style={menuStyle}
          onClick={() => scrollToSection("topproducts")}
        >
          🏆 {sidebarOpen && "Top Products"}
        </li>

        <li
          style={menuStyle}
          onClick={() => scrollToSection("category")}
        >
          🥧 {sidebarOpen && "Category Sales"}
        </li>

        <li
          style={menuStyle}
          onClick={() => scrollToSection("products")}
        >
          📦 {sidebarOpen && "Products Table"}
        </li>

        <li
          style={menuStyle}
          onClick={() => scrollToSection("filters")}
        >
          🔍 {sidebarOpen && "Filters"}
        </li>

        <li
          style={menuStyle}
          onClick={() => scrollToSection("export")}
        >
          📥 {sidebarOpen && "Export CSV"}
        </li>

        <li
  style={menuStyle}
  onClick={() => scrollToSection("insights")}
>
  🤖 {sidebarOpen && "Insights"}
</li>

<li
  style={menuStyle}
  onClick={() => scrollToSection("notifications")}
>
  🔔 {sidebarOpen && "Notifications"}
</li>

<li
  style={menuStyle}
  onClick={() => scrollToSection("forecast")}
>
  🔮 {sidebarOpen && "Forecast"}
</li>
      </ul>
    </aside>
  );
}

export default Sidebar;