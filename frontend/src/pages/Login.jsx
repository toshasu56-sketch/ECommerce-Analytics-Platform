import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (
      email === "admin@gmail.com" &&
      password === "admin123"
    ) {
      localStorage.setItem("isLoggedIn", "true");
      navigate("/dashboard");
    } else {
      alert(
        "Invalid Credentials\n\nUse:\nadmin@gmail.com\nadmin123"
      );
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(135deg, #0f172a, #1e293b)",
      }}
    >
      <form
        onSubmit={handleLogin}
        style={{
          background: "white",
          padding: "40px",
          borderRadius: "16px",
          width: "380px",
          boxShadow:
            "0 10px 30px rgba(0,0,0,0.25)",
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: "30px",
          }}
        >
          <h1
            style={{
              margin: 0,
              color: "#111827",
            }}
          >
            🛒 E-Commerce
          </h1>

          <p
            style={{
              color: "#6b7280",
              marginTop: "10px",
            }}
          >
            Analytics Dashboard Login
          </p>
        </div>

        <label>Email</label>

        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          style={{
            width: "100%",
            padding: "12px",
            marginTop: "8px",
            marginBottom: "15px",
            borderRadius: "8px",
            border: "1px solid #d1d5db",
            boxSizing: "border-box",
          }}
        />

        <label>Password</label>

        <input
          type={showPassword ? "text" : "password"}
          placeholder="Enter password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          style={{
            width: "100%",
            padding: "12px",
            marginTop: "8px",
            borderRadius: "8px",
            border: "1px solid #d1d5db",
            boxSizing: "border-box",
          }}
        />

        <div
          style={{
            marginTop: "10px",
            marginBottom: "15px",
          }}
        >
          <label
            style={{
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            <input
              type="checkbox"
              checked={showPassword}
              onChange={() =>
                setShowPassword(!showPassword)
              }
              style={{
                marginRight: "8px",
              }}
            />
            Show Password
          </label>
        </div>

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "12px",
            background: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "16px",
          }}
        >
          Login
        </button>

        <div
          style={{
            marginTop: "20px",
            padding: "12px",
            background: "#eff6ff",
            borderRadius: "8px",
            fontSize: "13px",
          }}
        >
          <strong>Demo Login:</strong>
          <br />
          Email: admin@gmail.com
          <br />
          Password: admin123
        </div>
      </form>
    </div>
  );
}

export default Login;