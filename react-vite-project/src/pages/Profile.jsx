import './Profile.css';

export default function Profile() {
    // временная заглушка на пользователя
    const user = {
        username: 'User1',
        email: 'user1@example.com',
    };

    return (
        <>
            <h1>PROFILE</h1>
            <div className="profile-info">
                <p><strong>Username:</strong> {user.username}</p>
                <p><strong>Email:</strong> {user.email}</p>
            </div>
            <div className="profile-actions">
                <button className="logout-btn">Log out</button>
                <buttom className="delete-btn">Delete Account</buttom>
            </div>
        </>
    )
}