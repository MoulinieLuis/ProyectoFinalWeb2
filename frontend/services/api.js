const API_BASE_URL = 'http://localhost:5182/api';

export async function getProducts() {
  try {
    const response = await fetch(`${API_BASE_URL}/products`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const products = await response.json();
    return products;

  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}
