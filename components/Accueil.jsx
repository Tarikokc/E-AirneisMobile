import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { fetchProduits } from '../api/productApi';

function ProduitsScreen() {
  const [produits, setProduits] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchProduits();
        setProduits(data);
      } catch (error) {
        console.error('Erreur lors du chargement des produits:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

   const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.Nom}</Text>
      <Text style={styles.price}>{item.prix} €</Text> 
    </View>
  );

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={produits}
          renderItem={renderItem}
          keyExtractor={(item) => item.productId.toString()} // Utiliser productId comme clé
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 18,
  },
});

export default ProduitsScreen;
