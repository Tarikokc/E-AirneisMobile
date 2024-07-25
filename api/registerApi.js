
const API_URL = 'http://localhost:8000';

export async function register(userData) {
  try {
    const response = await axios.post(`${API_URL}/api/register`, userData);
    return response.data; 
  } catch (error) {
    throw error.response?.data || error.message;
  }
}
