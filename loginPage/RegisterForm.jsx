import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, Text, TouchableOpacity } from 'react-native';
import { register } from '../api/api'; // Chemin vers votre fichier api.js
import { useNavigation } from '@react-navigation/native';

const RegisterForm = () => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigation = useNavigation();

  const handleSubmit = async () => {
    setError('');

    try {
      const response = await register({
        firstname,
        lastname,
        email,
        password,
        role: 'user', // Ou autre rôle si nécessaire
      });

      console.log('Inscription réussie', response);

      // Navigation vers l'écran de connexion après inscription réussie
      navigation.navigate('Login');
    } catch (error) {
      console.error('Inscription échouée', error);
      setError(error.message || 'Une erreur est survenue');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Prénom"
        value={firstname}
        onChangeText={setFirstname}
      />
      <TextInput
        style={styles.input}
        placeholder="Nom"
        value={lastname}
        onChangeText={setLastname}
      />
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

      {/* Affichage conditionnel du message d'erreur */}
      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Button title="S'inscrire" onPress={handleSubmit} />

      {/* Lien vers la page de connexion */}
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.loginLink}>
          Déjà un compte ? Connectez-vous.
        </Text>
      </TouchableOpacity>
    </View>
  );
};

// Styles 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
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
  loginLink: {
    marginTop: 10,
    color: 'blue',
    textAlign: 'center',
  },
});

export default RegisterForm;
