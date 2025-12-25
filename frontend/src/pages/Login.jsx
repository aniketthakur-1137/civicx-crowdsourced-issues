import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../utils/auth";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 🔐 API CALL
      const data = await loginUser({ email, password });

      // ✅ SAVE TOKEN & USER
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // 🔔 NAVBAR UPDATE SIGNAL
      window.dispatchEvent(new Event("auth-change"));

      alert("Login successful");
      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <section className="auth-container">
      <h1>Login to CivicX</h1>

      <form className="auth-form" onSubmit={handleSubmit}>
        <ul>
          <li>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </li>

          <li>
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </li>
        </ul>

        <button type="submit" className="btn btn-primary">
          Login
        </button>

        <p className="muted">
          Don&apos;t have an account? <Link to="/signup">Sign up</Link>
        </p>
      </form>
    </section>
  );
};

export default Login;























