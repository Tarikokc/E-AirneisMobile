import { Image, StyleSheet, Platform } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import ProduitsScreen from '../../components/Accueil'; // Ajustez le chemin d'importation si nécessaire


export default function HomeScreen() {
  return (
    <ProduitsScreen /> 
  );
};
