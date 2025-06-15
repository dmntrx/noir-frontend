import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import UserLayout from './components/UserLayout';
import AdminLayout from './components/AdminLayout';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Today from './pages/Today';
import Upcoming from './pages/Upcoming';
import Calendar from './pages/Calendar';
import Statistics from './pages/Statistics';
import Support from './pages/Support';
import Users from './pages/Users';
import Requests from './pages/Requests';

import Login from './pages/Login';
import Register from './pages/Register';

import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';

export default function App() {
  return (
    <Router>
      <Routes>
       {/* открытые маршруты */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* защищённые маршруты */}
        <Route element={<ProtectedRoute />}>
          <Route element={<UserLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/today" element={<Today />} />
            <Route path="/upcoming" element={<Upcoming />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/statistics" element={<Statistics />} />
            <Route path="/support" element={<Support />} />
          </Route>
        </Route>

         {/* админские маршруты */}
        <Route element={<AdminRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin/profile" element={<Profile />} />
            <Route path="/admin/users" element={<Users />} />
            <Route path="/admin/requests" element={<Requests />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  )
}