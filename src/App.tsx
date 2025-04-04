// src/App.tsx
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LoginModal from './components/LoginModal';
import RegisterModal from './components/RegisterModal';
import Header from './components/Header';
import Hero from './components/Hero';
import ContactQuickActions from './components/ContactQuickActions';
import Specialties from './components/Specialties';
import Footer from './components/Footer';
import PatientDashboard from './components/Dashboard/PatientDashboard';
import ScheduleAppointment from './components/ScheduleAppointment';
import PrivateRoute from './components/PrivateRoute';


function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const Home = () => (
    <>
      <Header onLoginClick={() => setShowLogin(true)} />
      <Hero />
      <ContactQuickActions />
      <Specialties />
      <Footer />
    </>
  );

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/agendar-cita" element={<ScheduleAppointment />} />
        <Route
          path="/dashboard/paciente"
          element={
            <PrivateRoute>
              <PatientDashboard />
            </PrivateRoute>
          }
        />

      </Routes>

      {/* Modales visibles desde cualquier ruta */}
      <LoginModal
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
        onSwitchToRegister={() => {
          setShowLogin(false);
          setShowRegister(true);
        }}
      />

      <RegisterModal
        isOpen={showRegister}
        onClose={() => setShowRegister(false)}
        onSwitchToRegister={() => {
          setShowLogin(true);
          setShowRegister(false);
        }}
      />
    </Router>
  );
}

export default App;
