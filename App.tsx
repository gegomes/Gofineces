import 'react-native-gesture-handler'
import 'intl'
import 'intl/locale-data/jsonp/pt-BR'
import React from 'react';
import { ThemeProvider } from 'styled-components';
import AppLoading from 'expo-app-loading'
import { Routes } from './src/routes';
import { StatusBar } from 'react-native'
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold
} from '@expo-google-fonts/poppins'

import theme from './src/global/styles/theme'
import { AutoProvider, useAuth } from './src/hooks/auth';

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  })

  const {useLoading} = useAuth()
  if (!fontsLoaded || useLoading) {
    return <AppLoading />
  }

  return (
    <ThemeProvider theme={theme}>
        <StatusBar barStyle="light-content" />
        <AutoProvider>
          <Routes />
        </AutoProvider>  
    </ThemeProvider>
  )
}
