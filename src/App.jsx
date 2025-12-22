import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import CarbonInputForm from './components/CarbonInputForm';
import Leaderboard from './components/Leaderboard';

import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import LandingPage from './components/LandingPage';
import Privacy from './components/Privacy';
import Terms from './components/Terms';
import Support from './components/Support';
import { UserProvider } from './context/UserContext';

import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <UserProvider>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/support" element={<Support />} />
        <Route path="/dashboard" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="input" element={<CarbonInputForm />} />
          <Route path="leaderboard" element={<Leaderboard />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </UserProvider>
  );
}

export default App;
