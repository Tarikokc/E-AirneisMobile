
const API_URL = 'http://localhost:8000';

// Fonction de connexion
export async function login(email, password) {
  try {
    const response = await axios.post(`${API_URL}/api/login`, { email, password });

    // Stockage du token après connexion réussie
    await AsyncStorage.setItem('token', response.data.token); // Adaptez la clé si nécessaire
    
    return response.data; // Renvoie les données de la réponse (token, utilisateur, etc.)
  } catch (error) {
    // Gestion des erreurs (par exemple, afficher un message d'erreur à l'utilisateur)
    throw error.response?.data || error.message;
  }
}
