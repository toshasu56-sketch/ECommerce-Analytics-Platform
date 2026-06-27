import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUserCircle,
  FaCog,
  FaMoon,
  FaSignOutAlt,
  FaBell,
  FaSearch
} from "react-icons/fa";
function Navbar({ darkMode, lastUpdated }) {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showMenu, setShowMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
const handleLogout = () => {
  localStorage.removeItem("isLoggedIn");
  navigate("/");
};
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);
useEffect(() => {
  const closeMenus = () => {
    setShowMenu(false);
    setShowNotifications(false);
  };

  window.addEventListener("click", closeMenus);

  return () =>
    window.removeEventListener("click", closeMenus);
}, []);
  const notifications = [
    { id: 1, text: "🛒 New Order #1024" },
    { id: 2, text: "👤 New Customer Joined" },
    { id: 3, text: "💰 Revenue increased by 12%" },
    { id: 4, text: "⚠ Low Stock: Gaming Laptop" },
  ];

  return (
    <div
      style={{
        background: darkMode ? "#1e293b" : "#ffffff",
        color: darkMode ? "#ffffff" : "#111827",
        padding: "18px 25px",
        borderRadius: "12px",
        marginBottom: "20px",
        boxShadow: darkMode
          ? "0 2px 10px rgba(0,0,0,0.4)"
          : "0 2px 10px rgba(0,0,0,0.1)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: "relative",
      }}
    >
      {/* Left Side */}
      <div>
        <h2
          style={{
            margin: 0,
            color: darkMode ? "#ffffff" : "#111827",
          }}
        >
          E-Commerce Analytics Platform
        </h2>

        <small
          style={{
            color: darkMode ? "#cbd5e1" : "#6b7280",
          }}
        >
          Last Updated:{" "}
          {lastUpdated
            ? lastUpdated.toLocaleTimeString()
            : currentTime.toLocaleTimeString()}
        </small>
      </div>

      {/* Right Side */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "25px",
        }}
      >
        {/* Live Clock */}
        <div
          style={{
            fontWeight: "bold",
            fontSize: "15px",
          }}
        >
          🕒 {currentTime.toLocaleTimeString()}
        </div>

        {/* Notification */}
        <div
          style={{
            position: "relative",
          }}
        >
          <button
            onClick={() =>
              setShowNotifications(!showNotifications)
            }
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              fontSize: "24px",
              color: darkMode ? "#ffffff" : "#111827",
            }}
          >
            <div
  style={{
    cursor: "pointer",
    fontSize: "20px",
  }}
>
  <FaSearch />
</div>
            <FaBell />
          </button>

          <span
            style={{
              position: "absolute",
              top: "-5px",
              right: "-5px",
              background: "red",
              color: "white",
              width: "20px",
              height: "20px",
              borderRadius: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "11px",
            }}
          >
            {notifications.length}
          </span>

          {showNotifications && (
            <div
              style={{
                position: "absolute",
                top: "45px",
                right: 0,
                width: "320px",
                background: darkMode ? "#0f172a" : "#ffffff",
                color: darkMode ? "#ffffff" : "#111827",
                borderRadius: "10px",
                boxShadow: "0 5px 20px rgba(0,0,0,.25)",
                padding: "15px",
                zIndex: 1000,
              }}
            >
              <h3
                style={{
                  marginTop: 0,
                }}
              >
                Notifications
              </h3>

              <hr />

              {notifications.map((item) => (
                <div
                  key={item.id}
                  style={{
                    padding: "12px 0",
                    borderBottom: "1px solid #ddd",
                  }}
                >
                  {item.text}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Admin Profile */}
<div
  onClick={(e) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  }}
  style={{
    display: "flex",
    alignItems: "center",
    gap: "12px",
    cursor: "pointer",
    position: "relative",
  }}
>
  <div
    style={{
      width: "42px",
      height: "42px",
      borderRadius: "50%",
      background: "#2563eb",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: "white",
      fontWeight: "bold",
      fontSize: "18px",
    }}
  >
    A
  </div>

  <div>
    <div style={{ fontWeight: "bold" }}>
      Admin
    </div>

    <small
      style={{
        color: darkMode ? "#cbd5e1" : "#6b7280",
      }}
    >
      Administrator
    </small>
  </div>

  <span
    style={{
      fontSize: "18px",
      marginLeft: "5px",
    }}
  >
    ▼
  </span>

  {showMenu && (
    <div
      onClick={(e) => e.stopPropagation()}
      style={{
        position: "absolute",
        top: "60px",
        right: 0,
        width: "260px",
        background: darkMode ? "#0f172a" : "#ffffff",
        color: darkMode ? "white" : "#111827",
        borderRadius: "12px",
        boxShadow: "0 10px 30px rgba(0,0,0,.25)",
        overflow: "hidden",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          padding: "18px",
          borderBottom: "1px solid #334155",
          textAlign: "center",
        }}
      >
        <FaUserCircle
          size={45}
          color="#2563eb"
        />

        <h3
          style={{
            margin: "10px 0 0",
          }}
        >
          Admin
        </h3>

        <small>
          admin@gmail.com
        </small>
      </div>

      <div
        style={{
          padding: "14px 20px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <FaUserCircle />
        Profile
      </div>

      <div
        style={{
          padding: "14px 20px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <FaCog />
        Settings
      </div>

      <div
        style={{
          padding: "14px 20px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <FaMoon />
        Dark Mode
      </div>

      <div
        onClick={handleLogout}
        style={{
          padding: "14px 20px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          color: "#ef4444",
        }}
      >
        <FaSignOutAlt />
        Logout
      </div>
    </div>
  )}
</div>
        </div>
      </div>

  );
}

export default Navbar;