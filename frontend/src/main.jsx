// frontend/src/main.jsx

import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import './App.css'; // Asegúrate de que este archivo exista y contenga tus estilos personalizados

const container = document.getElementById('root');

if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error('El elemento con ID "root" no se encontró en el DOM. Asegúrate de que tu index.html lo contenga.');
}