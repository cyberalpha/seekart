// App.js
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigationContainer } from '@react-navigation/native'; // Si usas navegación
import { SplashScreen } from 'expo-router'; // Para cargar la pantalla inicial
import 'expo-router/entry';

export default function App() {
  return (
    <View style={styles.container}>
      {/* Componente principal */}
      <SplashScreen />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
