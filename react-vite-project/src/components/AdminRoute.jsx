import { Navigate, Outlet } from "react-router-dom";

export default function AdminRoute() {
    const token = localStorage.getItem('access_token')
    const user = JSON.parse(localStorage.getItem('user'))

    if (!token || !user || user.role !== 'admin') {
        return <Navigate to='/' replace />
        // если не админ, то перекидываем на / без сохранения в истории браузера
        // (<- не вернет к защищенной странице)
    }

    return <Outlet />
    // outlet подставляет соответствующие страницы в Routes
}