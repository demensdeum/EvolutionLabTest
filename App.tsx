import React from 'react';
import { StyleSheet, SafeAreaView, StatusBar, Platform, useColorScheme } from 'react-native';
import GrowthMap from './components/GrowthMap';

export default function App() {
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';

  const containerStyle = {
    flex: 1,
    backgroundColor: isDark ? '#121212' : '#FAFAFA',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  };

  return (
    <SafeAreaView style={containerStyle}>
      <GrowthMap />
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
    </SafeAreaView>
  );
}
