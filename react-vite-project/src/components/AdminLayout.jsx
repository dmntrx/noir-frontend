import { Outlet, Link } from 'react-router-dom';
import './Layout.css'; // стили для сайдбара и общего лейаута (базового шаблона)

export default function AdminLayout() {
    return (
        <div className='layout'>
            <aside className='sidebar'>
                <h2 className='noir'>Noir</h2>
                <nav>
                    <ul>
                        <li><Link to="/admin/profile">Profile</Link></li>
                        <li><Link to="/admin/users">Users</Link></li>
                        <li><Link to="/admin/requests">Requests</Link></li>
                    </ul>
                </nav>
            </aside>

            <main className='content'>
                <Outlet />
            </main>
        </div>
    )
}