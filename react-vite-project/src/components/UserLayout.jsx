import { Outlet, Link } from 'react-router-dom';
import './Layout.css'; // стили для сайдбара и общего лейаута (базового шаблона)

export default function UserLayout() {
    return (
        <div className='layout'>
            <aside className='sidebar'>
                <h2 className='noir'>Noir</h2>
                <nav>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/profile">Profile</Link></li>
                        <li><Link to="/today">Today</Link></li>
                        {/* <li><Link to="/upcoming">Upcoming</Link></li> */}
                        <li><Link to="/calendar">Calendar</Link></li>
                        <li><Link to="/statistics">Statistics</Link></li>
                        <li><Link to="/support">Support</Link></li>
                    </ul>
                </nav>
            </aside>

            <main className='content'>
                <Outlet />
            </main>
        </div>
    )
}