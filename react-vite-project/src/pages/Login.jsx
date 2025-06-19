import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
// хук для перенаправления
import axios from 'axios';
// для отправки HTTP-запросов (мощнее чем fetch)
import './AuthForm.css';
import API from '../api.js';

export default function Login() {
    // состояния для email, password, ошибки при логине
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();
    // определение функции для последующего редиректа

    // функция для отправки формы
    const handleSubmit = async (e) => {
        e.preventDefault();
        // отмена default поведения браузера (перезагрузка страницы)

        // объект для OAuth2PasswordRequestForm
        const formData = new URLSearchParams();
        formData.append('username', email);
        formData.append('password', password);

        try {
            // запрос авторизации
            const response = await API.post('/auth/login', formData, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });

            // обработка ответа
            const { access_token, user } = response.data;

            localStorage.removeItem('access_token');
            localStorage.removeItem('user');
            // сохранение токена и данных user в localStorage для дальнейшей работы
            localStorage.setItem('access_token', access_token);
            localStorage.setItem('user', JSON.stringify(user));

            // перенаправление по ролям
            if (user.role === 'admin') {
                navigate('/admin/profile');
            } else {
                navigate('/');
            }

        } catch (err) {
            setError('Invalid email or password')
        }
    };

    return (
        <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Log in</h2>

        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <button type="submit">Log in</button>
        <p>Don't have an account? <Link to="/register">Sign up</Link></p>
      </form>
    </div>
    );
}