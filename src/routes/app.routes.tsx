import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useTheme } from 'styled-components'
import { MaterialIcons } from '@expo/vector-icons'

const { Navigator, Screen } = createBottomTabNavigator()

import { Dashboard } from '../views/Dashboard'
import { Register } from '../views/Register'
import { Resume } from '../views/Resumo'
import { Platform } from 'react-native'
export function AppRoutes() {
  const theme = useTheme()
  return (
    <Navigator
      screenOptions={{
        tabBarActiveTintColor: theme.colores.secundary,
        tabBarInactiveTintColor: theme.colores.text,
        tabBarLabelPosition: "beside-icon",
        tabBarStyle: {
          paddingVertical: Platform.OS === "ios" ? 20 : 0,
          height: 50
        }
      }}
    >
      <Screen
        name="Listagem"
        component={Dashboard}
        options={{
          tabBarIcon: (({ size, color }) => (
            <MaterialIcons
              size={size}
              color={color}
              name="format-list-bulleted"
            />
          )),
          headerShown: false
        }}
      />
      <Screen
        name="Cadastrar"
        component={Register}
        options={{
          tabBarIcon: (({ size, color }) => (
            <MaterialIcons
              size={size}
              color={color}
              name="attach-money"

            />
          )),
          headerShown: false
        }}
      />
      <Screen
        name="Resumo"
        component={Resume}
        options={{
          tabBarIcon: (({ size, color }) => (
            <MaterialIcons
              size={size}
              color={color}
              name="pie-chart"
            />
          )),
          headerShown: false
        }}
      />
    </Navigator>
  )
}