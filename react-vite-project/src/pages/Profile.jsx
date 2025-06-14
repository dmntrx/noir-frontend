import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

export default function Profile() {
    
    // получение user
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
        setUser(JSON.parse(storedUser));
        }
    }, []);

    // logout
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    if (!user) {
        return <p>Loading...</p>;
    }

    return (
        <>
            <h1>PROFILE</h1>
            <div className="profile-info">
                {/* <p><strong>Username:</strong> {user.username}</p> */}
                <p><strong>Email:</strong> {user.email}</p>
            </div>
            <div className="profile-actions">
                <button className="logout-btn" onClick={handleLogout}>Log out</button>
                <buttom className="delete-btn">Delete Account</buttom>
            </div>
        </>
    )
}