import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {  registerUser } from "../utils/auth";

const Signup = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
try{
    const result = await registerUser({
  name: `${firstName} ${lastName}`,
  email,
  password
});


    if (!result.success) {
      alert(result.message);
      return;
    }

    alert("✅ Sign up successful! Please log in.");
    navigate("/login");}
    catch (error) {
    alert(
      error.response?.data?.message || "Signup failed"
    );
  }
  };

  return (
    <section className="auth-container">
      <h1>Create an Account</h1>

      <form className="auth-form" onSubmit={handleSubmit}>
        <ul>
          <li>
            <label htmlFor="first-name">First Name</label>
            <input
              id="first-name"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </li>

          <li>
            <label htmlFor="last-name">Last Name</label>
            <input
              id="last-name"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </li>

          <li>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </li>

          <li>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </li>
        </ul>

        <button type="submit" className="btn btn-primary">
          Sign Up
        </button>

        <p className="muted">
          Already have an account?{" "}
          <Link to="/login">Login here</Link>
        </p>
      </form>
    </section>
  );
};

export default Signup;
