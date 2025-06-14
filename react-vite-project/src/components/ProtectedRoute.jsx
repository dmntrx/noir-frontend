import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoute() {
  const token = localStorage.getItem('access_token');
  console.log('TOKEN IN ProtectedRoute:', token);

  return token ? <Outlet /> : <Navigate to="/register" replace />;
}
