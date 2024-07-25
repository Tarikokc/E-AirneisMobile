const API_BASE_URL = 'http://192.168.1.110:8000';  // Utilisez localhost

async function fetchProduits() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/produits`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erreur lors de la requête API :", error);
    throw error;
  }
}

  async function fetchProduit(productId) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/produit/${productId}`);
      const data = await response.json();
  
      if (response.ok) {
        return data;
      } else {
        throw new Error(data.message || 'Erreur lors de la récupération du produit.');
      }
    } catch (error) {
      console.error("Erreur lors de la requête API :", error);
      throw error;
    }
  }
  
export { fetchProduits, fetchProduit }; 
