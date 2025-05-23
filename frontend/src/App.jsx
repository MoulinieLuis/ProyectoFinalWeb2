import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppNavbar from './components/Navbar'; // Asumiendo que tu Navbar se llama AppNavbar y está en src/components/

// Ajuste de las rutas de importación:
// Si App.jsx está en 'src/', y tus páginas están en 'src/pages/',
// entonces la ruta relativa correcta es './pages/NombreDeLaPagina'.
import ProductCatalogPage from '../pages/ProductCatalogPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import HomePage from '../pages/HomePage';
import ProductDetailPage from '../pages/ProductDetailPage';

function App() {
  return (
    <Router>
      <AppNavbar /> {/* Tu barra de navegación */}
      <main className="container mt-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* CAMBIO CRÍTICO: La ruta para el catálogo de productos ahora es /products */}
          {/* El login te redirige a /products, así que esta ruta debe existir y ser /products */}
          <Route path="/products" element={<ProductCatalogPage />} />

          {/* CAMBIO: La ruta para el detalle de un producto ahora es /products/:id */}
          {/* Es más consistente tener una ruta base común para productos */}
          <Route path="/products/:id" element={<ProductDetailPage />} />

          {/* Ruta para manejar cualquier URL que no coincida (404) */}
          {/* Puedes dejar este elemento JSX simple o importar un componente NotFoundPage más elaborado */}
          <Route path="*" element={<h1>404 - Página No Encontrada</h1>} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;