import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  Image, 
  FlatList,
  TextInput,
  TouchableOpacity, 
  Dimensions,
  Picker, 
  ScrollView,
  ActivityIndicator,
  Switch, // Pour le filtre "En stock"
} from 'react-native';
// import { useNavigation } from '@react-navigation/native';
import { searchProducts } from '../api/searchProductApi';
import { fetchCategories } from '../api/categoriesApi';

const baseUrl = '/img/';
const { width } = Dimensions.get('window');

const RecherchePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    materiaux: [],
    prixMin: '',
    prixMax: '',
    categories: [],
    enStock: false,
  });
  const [sort, setSort] = useState('prix-asc');
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesData = await fetchCategories();
        setCategories(categoriesData);
        fetchDataProducts(); // Charger les produits initiaux
      } catch (error) {
        console.error('Erreur lors de la récupération des catégories:', error);
      }
    };
    fetchData();
  }, []);

  const fetchDataProducts = async () => {
    setIsLoading(true);
    try {
      const productsData = await searchProducts({
        search: searchTerm,
        materiaux: filters.materiaux.length > 0 ? filters.materiaux.join(',') : null,
        prixMin: filters.prixMin !== '' ? filters.prixMin : null,
        prixMax: filters.prixMax !== '' ? filters.prixMax : null,
        categories: filters.categories.length > 0 ? filters.categories.join(',') : null,
        enStock: filters.enStock,
        sort,
      });
      setProducts(productsData);
    } catch (error) {
      console.error('Erreur lors de la recherche de produits :', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchChange = (text) => {
    setSearchTerm(text);
  };

  const handleFilterChange = (filterName, filterValue) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [filterName]: filterValue,
    }));
  };

  const handleSortChange = (itemValue) => {
    setSort(itemValue);
  };

  const handleSubmit = () => {
    fetchDataProducts();
  };

  const renderProductItem = ({ item }) => (
    <TouchableOpacity
      style={styles.productCard}
      onPress={() => navigation.navigate('ProductDetails', { productId: item.productId })}
    >
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
      <TextInput
        style={styles.searchInput}
        placeholder="Rechercher un produit..."
        value={searchTerm}
        onChangeText={handleSearchChange}
        onSubmitEditing={handleSubmit}
      />
    
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.filters}>
          {/* Filtres */}
          {/* ... (Composants de filtre pour les matériaux, le prix, etc.) */}

          {/* Filtre "En stock" */}
          <View style={styles.filterItem}>
            <Text>En stock uniquement :</Text>
            <Switch
              value={filters.enStock}
              onValueChange={(value) => handleFilterChange('enStock', value)}
            />
          </View>

          {/* Tri */}
          <Picker
            selectedValue={sort}
            onValueChange={handleSortChange}
            style={styles.picker}
          >
            <Picker.Item label="Prix croissant" value="prix-asc" />
            <Picker.Item label="Prix décroissant" value="prix-desc" />
            {/* ... autres options de tri */}
          </Picker>
        </View>
      </ScrollView>

      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={products}
          renderItem={renderProductItem}
          keyExtractor={(item) => item.productId.toString()}
          numColumns={2}
          contentContainerStyle={styles.productGrid}
          ListEmptyComponent={<Text>Aucun produit ne correspond à votre recherche.</Text>}
        />
      )}
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  // ... (styles pour le container, searchInput, filters, productCard, etc.)
});

export default RecherchePage;
