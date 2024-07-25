import { Image, StyleSheet, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import AppNavigator from './components/navigation/AppNavigator'


export default function App() {
  return (
    <NavigationContainer>
        <AppNavigator />
    </NavigationContainer>
  );
};
