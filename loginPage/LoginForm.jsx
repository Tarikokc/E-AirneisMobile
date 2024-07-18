import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, Text } from 'react-native';
import { login } from '../api/LoginApi'; 
import { useNavigation } from '@react-navigation/native';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigation = useNavigation();

  const handleSubmit = async () => {
    setError(''); // Réinitialiser le message d'erreur

    try {
      const response = await login(email, password);
      console.log('Connexion réussie', response);

      // Stockage du token et des informations utilisateur (adaptez si nécessaire)
      // Par exemple:
      // await AsyncStorage.setItem('token', response.data.token);
      // await AsyncStorage.setItem('user', JSON.stringify(response.data.user));

      // Navigation vers l'écran d'accueil après connexion réussie
      navigation.navigate('Home'); 
    } catch (error) {
      console.error('Connexion échouée', error);
      setError(error.message || 'Une erreur est survenue');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Button title="Se connecter" onPress={handleSubmit} />
      <Text style={styles.registerLink} onPress={() => navigation.navigate('Register')}>
        Pas de compte ? Inscrivez-vous.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  registerLink: {
    marginTop: 10,
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default LoginForm;
