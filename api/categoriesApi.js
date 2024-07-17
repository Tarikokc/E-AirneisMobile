// categoriesApi.js

const API_BASE_URL = 'http://192.168.1.110:8000'; 

async function fetchCategories() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/categories`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erreur lors de la récupération des catégories:", error);
    throw error;
  }
}

async function fetchCategory(categoryId) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/categories/${categoryId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erreur lors de la récupération de la catégorie:", error);
    throw error;
  }
}

async function fetchCategoryProducts(categoryId) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/categories/${categoryId}/produits`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erreur lors de la récupération des produits de la catégorie:", error);
    throw error;
  }
}

export { fetchCategories, fetchCategory, fetchCategoryProducts };
