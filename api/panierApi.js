import axios from 'axios';

const API_URL = 'http://localhost:8000'; 

export async function fetchPanier(userId) {
  try {
    const response = await axios.get(`${API_URL}/api/panier/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
}

export async function updateProductQuantity(productId, userId, newQuantity) {
  try {
    const response = await axios.put(`${API_URL}/api/panier/${productId}/${userId}`, {
      quantite: newQuantity
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
}

export async function removeProductFromCart(panierId, userId) {
  try {
    const response = await axios.delete(`${API_URL}/api/panier/${panierId}/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
}