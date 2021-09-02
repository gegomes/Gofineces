import React, { useCallback, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { useTheme } from 'styled-components'
import { useAuth } from '../../hooks/auth'

import AsyncStorang from "@react-native-async-storage/async-storage"
import { VictoryPie } from 'victory-native'
import { HistoryCard } from '../../components/HistoryCard'
import { RFValue } from 'react-native-responsive-fontsize'

import { categories } from '../../utils/categories'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { addMonths, subMonths, format } from 'date-fns'
import { ptBR } from 'date-fns/esm/locale'
import { ActivityIndicator } from 'react-native'

import {
  Container,
  Content,
  MonthSelect,
  MonthSelectButton,
  Month,
  MonthSelectIcon,
  Header,
  Title,
  ChartContainer,
  LoadContainer

} from './styles'

export interface TransactionData {

  type: 'positive' | 'negative'
  name: string
  amount: string
  category: string
  date: string
}

export interface CategoryData {
  key: string
  name: string
  color: string
  total: number
  totalFormatted: string
  percent: string
}

export function Resume() {
  
  const [setIsLoading, setSetIsLoading] = useState(true)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [totalByCategories, setTotalByCategorie] = useState<CategoryData[]>([])

  const theme = useTheme()
  const { user } = useAuth()

  function handDateChange(action: 'next' | 'prev') {
    setSetIsLoading(true)
    if (action === 'next') {
      setSelectedDate(addMonths(selectedDate, 1))
    } else {
      setSelectedDate(subMonths(selectedDate, 1))
    }
  }
  async function loadData() {

    const dataKey = `@gofinances:transactions_user:${user.id}`
    const response = await AsyncStorang.getItem(dataKey)
    const responseFormatted = response ? JSON.parse(response) : []

    const expensives = responseFormatted
      .filter((expensive: TransactionData) =>
        expensive.type === 'negative' &&
        new Date(expensive.date).getMonth() === selectedDate.getMonth() &&
        new Date(expensive.date).getFullYear() === selectedDate.getFullYear()
      )


    const expensiveTotal = expensives
      .reduce((acumullator: number, expensive: TransactionData) => {
        return acumullator + Number(expensive.amount)
      }, 0)

    const totalByCategory: CategoryData[] = []

    categories.forEach(category => {
      
      let categorySum = 0
      expensives.forEach((expansive: TransactionData) => {
        if (expansive.category === category.key) {
          categorySum += Number(expansive.amount)
        }
      })

      if (categorySum > 0) {
        
        const totalFormatted = categorySum
        .toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        })
      
        const percent = `${(categorySum / expensiveTotal * 100).toFixed(0)}%`

        totalByCategory.push({
          key: category.key,
          name: category.name,
          color: category.color,
          total: categorySum,
          totalFormatted,
          percent
        })
      }
    })
    setTotalByCategorie(totalByCategory)
    setSetIsLoading(false)
  }


  useFocusEffect(useCallback(() => {
    loadData()
  }, [selectedDate]))
  return (
    <Container>
      <Header>
        <Title>Resumo por categorias</Title>
      </Header>
      {
        setIsLoading ?
          <LoadContainer>
            <ActivityIndicator
              color={theme.colores.primaty}
              size='large'
            />
          </LoadContainer> :
          <Content
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: 24,
              paddingBottom: useBottomTabBarHeight(),
            }}>
            <MonthSelect>
              <MonthSelectButton onPress={() => handDateChange('prev')}>
                <MonthSelectIcon name="chevron-left" />
              </MonthSelectButton>
              <Month>
                {format(selectedDate, 'MMMM,yyyy', { locale: ptBR })}
              </Month>
              <MonthSelectButton onPress={() => handDateChange('next')}>
                <MonthSelectIcon name="chevron-right" />
              </MonthSelectButton>
            </MonthSelect>
            <ChartContainer>
              <VictoryPie
                data={totalByCategories}

                colorScale={totalByCategories.map(category => category.color)}
                style={{
                  labels: {
                    fontSize: RFValue(18),
                    fontWeight: 'bold',
                    fill: theme.colores.shape
                  }
                }}
                labelRadius={50}
                x="percent"
                y='total'
              />
            </ChartContainer>

            {
              totalByCategories.map(item => (
                <HistoryCard
                  key={item.key}
                  title={item.name}
                  amount={item.totalFormatted}
                  color={item.color}
                />
              ))
            }
          </Content>
      }
    </Container>
  )
}