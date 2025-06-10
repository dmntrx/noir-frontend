import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Today from './pages/Today';
import Upcoming from './pages/Upcoming';
import Calendar from './pages/Calendar';
import Statistics from './pages/Statistics';
import Support from './pages/Support';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* подключение общего Layout */}
        <Route element={<Layout />}>
          {/* описываем соответствие между путем и отображаемым компонентом */}
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/today" element={<Today />} />
          <Route path="/upcoming" element={<Upcoming />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/support" element={<Support />} />
        </Route>
      </Routes>
    </Router>
  )
}