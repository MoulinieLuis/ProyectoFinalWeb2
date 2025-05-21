import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppNavbar from './components/Navbar';

import ProductCatalogPage from '../pages/ProductCatalogPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import HomePage from '../pages/HomePage';

function App() {
  return (
    <Router>
      <AppNavbar />
      <main className="container mt-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/catalog" element={<ProductCatalogPage />} />
          {/* AdminDashboard y NotFoundPage no están importados, así que se omiten o se usan placeholders */}
          {/* <Route path="/admin" element={<AdminDashboard />} /> */}
          <Route path="*" element={<h1>404 - Página No Encontrada</h1>} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
