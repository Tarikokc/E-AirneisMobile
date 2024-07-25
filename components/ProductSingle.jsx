import React, { useState, useEffect } from 'react';
import { 
    StyleSheet, 
    View, 
    Text, 
    Image, 
    ScrollView,
    TouchableOpacity, 
    Dimensions
} from 'react-native';
// import { useRoute } from '@react-navigation/native';
import { fetchProduit } from '../api/productApi';

const baseUrl = '/img/'; 
const {width} = Dimensions.get('window');

const ProductSingle = () => {
  const route = useRoute();
  const { productId } = route.params;
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const productData = await fetchProduit(productId);
        setProduct(productData);
        setSimilarProducts(productData.similarProducts || []); // Handle the case where similarProducts is not present
      } catch (err) {
        setError("Erreur lors du chargement du produit");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductData();
  }, [productId]);

  if (isLoading) return <ActivityIndicator size="large" color="#0000ff" />;
  if (error) return <Text>{error}</Text>;

  const renderCarouselItem = ({item}) => (
    <Image source={{ uri: baseUrl + item.photoUrl }} style={styles.productImage} />
  );

  return (
    <ScrollView style={styles.container}>
      {product && (
        <>
          <FlatList
            data={product.productPhotos}
            renderItem={renderCarouselItem}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
          />
          <View style={styles.productInfo}>
            <Text style={styles.productName}>{product.Nom}</Text>
            <Text style={styles.productPrice}>{product.prix} €</Text>
            <Text style={styles.productStock}>
              {product.Stock > 0 ? "En stock" : "Stock épuisé"}
            </Text>
            <Text style={styles.productDescription}>{product.Description}</Text>
            <Button 
              title={product.Stock === 0 ? "STOCK ÉPUISÉ" : "AJOUTER AU PANIER"}
              disabled={product.Stock === 0}
              onPress={() => {
                // Logique pour ajouter au panier
              }}
            />
          </View>

          {/* Produits similaires */}
          {similarProducts.length > 0 && (
            <View style={styles.similarProducts}>
              <Text style={styles.similarProductsTitle}>Produits similaires</Text>
              <FlatList
                data={similarProducts}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => navigation.navigate('ProductSingle', { productId: item.productId })}>
                    <Image 
                      source={{ uri: baseUrl + item.productPhotos[0]?.photoUrl }}
                      style={styles.similarProductImage}
                    />
                    <Text>{item.Nom}</Text>
                    <Text>Prix : {item.prix} €</Text>
                  </TouchableOpacity>
                )}
                keyExtractor={(item) => item.productId.toString()}
                horizontal // Afficher les produits similaires horizontalement
              />
            </View>
          )}
        </>
      )}
    </ScrollView>
  );
};

// // Styles (à personnaliser selon vos besoins)
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 10,
//   },
//   productImage: {
//     width: width - 20,
//     height: 200,
//     resizeMode: 'cover',
//   },
//   // ... styles pour productInfo, similarProducts, etc.
// });


export default ProductSingle;
