import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginForm from '../../loginPage/LoginForm';
import RegisterForm from '../../loginPage/RegisterForm';
import Accueil from '../Accueil';
import CategoryPage from '../CategoryPage';
import ProductSingle from '../ProductSingle';
import ResearchPage from '../ResearchPage';


const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      {/* <Stack.Screen name="LoginForm" component={LoginForm} />
      <Stack.Screen name="RegisterForm" component={RegisterForm} /> */}
      <Stack.Screen name="Accueil" component={Accueil} />
      <Stack.Screen name="CategoryPage" component={CategoryPage} />
      <Stack.Screen name="ProductSingle" component={ProductSingle} />
      <Stack.Screen name="ResearchPage" component={ResearchPage} />
      {/* ... autres écrans */}
    </Stack.Navigator>
  );
}