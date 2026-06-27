function Notifications({ darkMode }) {
  const notifications = [
    {
      id: 1,
      icon: "🛒",
      title: "New Order Received",
      desc: "Order #2035 has been placed.",
      time: "2 min ago",
    },
    {
      id: 2,
      icon: "💰",
      title: "Revenue Increased",
      desc: "Revenue increased by 12.5% today.",
      time: "15 min ago",
    },
    {
      id: 3,
      icon: "📦",
      title: "Low Stock Alert",
      desc: "Laptop Pro is running low.",
      time: "35 min ago",
    },
    {
      id: 4,
      icon: "👤",
      title: "New Customer",
      desc: "A new customer registered.",
      time: "1 hour ago",
    },
  ];

  return (
    <div
      style={{
        background: darkMode ? "#1f2937" : "#fff",
        color: darkMode ? "#fff" : "#111827",
        padding: "20px",
        borderRadius: "12px",
        marginTop: "30px",
        boxShadow: "0 2px 8px rgba(0,0,0,.15)",
      }}
    >
      <h2>🔔 Notifications</h2>

      {notifications.map((item) => (
        <div
          key={item.id}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "15px 0",
            borderBottom: "1px solid #374151",
          }}
        >
          <div>
            <div style={{ fontWeight: "bold" }}>
              {item.icon} {item.title}
            </div>

            <div
              style={{
                color: darkMode ? "#d1d5db" : "#6b7280",
                marginTop: "5px",
              }}
            >
              {item.desc}
            </div>
          </div>

          <small>{item.time}</small>
        </div>
      ))}
    </div>
  );
}

export default Notifications;