// frontend/src/main.jsx

// Importa React (necesario para JSX en versiones más recientes de React)
import React from 'react';
// Importa createRoot desde 'react-dom/client' para renderizar la aplicación en el DOM
// ¡Esta importación es crucial y faltaba según el error!
import { createRoot } from 'react-dom/client';

// Importa tu componente principal App
import App from './App.jsx';
// Importa tus estilos CSS personalizados (donde estaban las directivas de Tailwind, ahora puede estar vacío o tener tus estilos)
import './index.css';

// Importa el archivo CSS principal de Bootstrap
// Esta línea es necesaria para que los estilos de Bootstrap se carguen
import 'bootstrap/dist/css/bootstrap.min.css'

// Encuentra el elemento HTML con el ID 'root' en tu index.html
const container = document.getElementById('root');

// Si el contenedor existe, crea una raíz de renderizado para tu aplicación React
if (container) {
  const root = createRoot(container);

  // Renderiza tu componente principal App dentro del modo estricto de React
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  // Opcional: Muestra un mensaje de error si el elemento 'root' no se encuentra
  console.error('El elemento con ID "root" no se encontró en el DOM. Asegúrate de que tu index.html lo contenga.');
}
