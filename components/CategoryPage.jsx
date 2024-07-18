import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native'; 
import { getCategory, getCategoryProducts } from '../api/productApi';

const baseUrl = '/img/'; 

const CategoryPage = () => {
  const route = useRoute();
  const { categoryId } = route.params; // Récupérer l'ID de la catégorie depuis les paramètres de la route
  const [category, setCategory] = useState(null);
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const categoryData = await getCategory(categoryId);
        const productsData = await getCategoryProducts(categoryId);
        setCategory(categoryData);
        setCategoryProducts(productsData);
      } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategoryData();
  }, [categoryId]); // Exécuter l'effet seulement lorsque categoryId change

  const renderProductItem = ({ item }) => (
    <TouchableOpacity style={styles.productCard} onPress={() => navigation.navigate('ProductDetails', { productId: item.productId })}>
      <Image 
        source={{ uri: baseUrl + item.productPhotos[0]?.photoUrl }}
        style={styles.productImage}
      />
      <View style={styles.productCardDetails}>
        <Text style={styles.productTitle}>{item.Nom}</Text>
        <Text style={styles.productPrice}>{item.prix} €</Text>
        <Text style={styles.productStock}>{item.Stock > 0 ? 'En stock' : 'Stock épuisé'}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          {category && (
            <View style={styles.categoryTitleContainer}>
              {categoryProducts.length > 0 && (
                <Image 
                  source={{ uri: baseUrl + categoryProducts[0].productPhotos[0]?.photoUrl }}
                  style={styles.categoryImage} 
                />
              )}
              <View style={styles.categoryTitleOverlay}>
                <Text style={styles.categoryTitle}>{category.categoryName}</Text>
                <Text style={styles.categoryDescription}>{category.description}</Text>
              </View>
            </View>
          )}

          <FlatList
            data={categoryProducts}
            renderItem={renderProductItem}
            keyExtractor={(item) => item.productId.toString()}
            numColumns={2} // Affiche deux produits par ligne
            contentContainerStyle={styles.productGrid}
          />
        </>
      )}
    </View>
  );
};

// // Styles (à personnaliser selon vos besoins)
// const styles = StyleSheet.create({
//   // ... 
// });

export default CategoryPage;
