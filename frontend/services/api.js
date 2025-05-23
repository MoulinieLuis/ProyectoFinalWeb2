// frontend/src/services/api.js

const API_BASE_URL = 'http://localhost:5182/api'; 

// Función para obtener productos
export async function getProducts() {
  try {
    const response = await fetch(`${API_BASE_URL}/products`);
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: `HTTP error! status: ${response.status}` }));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    const products = await response.json();
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}


export async function getProductById(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}`);
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: `HTTP error! status: ${response.status}` }));
      if (response.status === 404) {
        throw new Error("Producto no encontrado.");
      }
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    const product = await response.json();
    return product;
  } catch (error) {
    console.error(`Error fetching product with ID ${id}:`, error);
    throw error;
  }
}

// Función para iniciar sesión
export async function login(username, password) { 
  try {
    const response = await fetch(`${API_BASE_URL}/account/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({ UserName: username, Password: password }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Error de credenciales o servidor.' }));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
}

// Función para registrar un usuario
export async function register(username, email, password) {
  try {
    const response = await await fetch(`${API_BASE_URL}/account/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ Username: username, Email: email, Password: password }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Error al registrar el usuario.' }));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
}