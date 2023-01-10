import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import Layout from './components/Layout';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import EmailVerify from './pages/EmailVerify';
function App() {
 
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Login />} />
            <Route path="/register" element={<Signup />} />
            <Route path="/home" element={<Home />} />
            <Route path="/users/:id/verify/:token" element={<EmailVerify />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
