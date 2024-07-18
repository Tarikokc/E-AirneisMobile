const API_BASE_URL = 'http://192.168.1.110:8000';

export async function searchProducts(params) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/recherche`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Erreur lors de la recherche de produits:", error);
      throw error; // Rethrow the error to handle it in the component
    }
  }