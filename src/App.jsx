import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './Home.jsx';
import LoginPage from './LoginPage.jsx';
import { useUser } from './UserContext.jsx';
import Registration from './Account/Registration.jsx';


export default function App() {
  const { user } = useUser();

  return (
    <Routes>
      <Route 
        path="/" 
        element={user ? <Home /> : <Navigate to="/LoginPage" replace />} 
      />
      <Route 
        path="/LoginPage" 
        element={user ? <Navigate to="/" replace /> : <LoginPage />} 
      />
      <Route 
        path="/Registration" 
        element={user ? <Navigate to="/" replace /> : <Registration />}
      />
    </Routes>
  );
}
