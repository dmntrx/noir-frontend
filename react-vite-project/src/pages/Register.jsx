import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import './AuthForm.css';

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8000/auth/register", {
        email,
        password,
        role,
      });

      alert("Registration succeeded!");
      navigate("/login"); // переход на страницу входа
    } catch (err) {
      setError(err.response?.data?.detail || "Registration error");
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Sign up</h2>

        <label>Email:</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required />

        <label>Password:</label>
        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required />

        <label>Role:</label>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <button type="submit">Sign up</button>
        <p>Already have an account? <Link to="/login">Log in</Link></p>
      </form>
    </div>
  );
}
