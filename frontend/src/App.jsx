import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppNavbar from './components/Navbar';
import ProductCatalogPage from '../pages/ProductCatalogPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import HomePage from '../pages/HomePage';
import ProductDetailPage from '../pages/ProductDetailPage';

function App() {
  return (
    <Router>
      <AppNavbar />
      <main className="container mt-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route path="/products" element={<ProductCatalogPage />} />


          <Route path="/products/:id" element={<ProductDetailPage />} />

          <Route path="*" element={<h1>404 - Página No Encontrada</h1>} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;