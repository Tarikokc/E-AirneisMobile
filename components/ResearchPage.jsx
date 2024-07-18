import React, { useState } from 'react';
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
} from 'react-native';

const baseUrl = '/img/'; 
const {width} = Dimensions.get('window'); 

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
  const [products, setProducts] = useState([]); // Données de produits (à remplacer par vos données)
  const [categories, setCategories] = useState([]); // Données de catégories (à remplacer par vos données)

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
    // Ici, vous appelleriez votre fonction de recherche pour récupérer les produits
    // en fonction des critères de recherche et des filtres
    console.log('Recherche avec les critères :', searchTerm, filters, sort);
  };

  const renderProductItem = ({ item }) => (
    <TouchableOpacity style={styles.productCard}>
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
      {/* Filtres (dans un ScrollView pour les rendre défilants) */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.filters}>
          {/* ... Vos composants de filtre ici (Picker, CheckBox, etc.) */}
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
      <FlatList
        data={products}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.productId.toString()}
        numColumns={2}
        contentContainerStyle={styles.productGrid}
        ListEmptyComponent={<Text>Aucun produit ne correspond à votre recherche.</Text>}
      />
    </View>
  );
};

// // Styles (à personnaliser selon vos besoins)
// const styles = StyleSheet.create({
//   // ... styles pour container, searchInput, filters, productCard, etc.
// });

export default RecherchePage;
