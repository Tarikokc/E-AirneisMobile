import axios from 'axios';

const API_URL = 'http://localhost:8000/api/register';

export async function register(userData) {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data; 
  } catch (error) {
    throw error.response?.data || error.message;
  }
}
