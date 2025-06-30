import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import './AuthForm.css';
import API from '../api.js';

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await API.post("/auth/register", {
        email,
        password,
        role,
      });

      alert("Registration succeeded!");
      // navigate("/login"); // переход на страницу входа
      // сразу логиним
      const formData = new URLSearchParams();
      formData.append('username', email);
      formData.append('password', password);

      const loginResponse = await API.post("/auth/login", formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });

      const { access_token, user } = loginResponse.data;

      // сохраняем токен и юзера
      localStorage.setItem('access_token', access_token);
      localStorage.setItem('user', JSON.stringify(user));

      // редирект по роли
      if (user.role === 'admin') {
        navigate('/admin/profile');
      } else {
        navigate('/');
      }
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

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <button type="submit">Sign up</button>
        <p>Already have an account? <Link to="/login">Log in</Link></p>
      </form>
    </div>
  );
}
