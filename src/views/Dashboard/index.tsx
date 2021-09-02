import React, { useState, useEffect, useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { useTheme } from 'styled-components'
import { useAuth } from '../../hooks/auth'

import { ActivityIndicator } from 'react-native'
import {
  Container,
  Header,
  UserInfo,
  Photo,
  UserGreetins,
  User,
  UserName,
  UserWrapper,
  LogoutButton,
  Icon,
  HighLightCards,
  Transactions,
  Title,
  TransactionList,
  LoadContainer
} from './styles'
import { HighLightCard } from '../../components/HighLightCard'
import { TransactionCard, TransactionCardProps } from '../../components/TransactionCard'
import AsyncStorang from "@react-native-async-storage/async-storage"

export interface DataListProps extends TransactionCardProps {
  id: string
}

interface HighlightProps {
  amount: string
  lastTransaction: string
}
interface HighlightData {
  entries: HighlightProps
  expensives: HighlightProps
  total: HighlightProps
}

export function Dashboard() {
  const [isLoading, setIsLoading] = useState(true)
  const [transactions, setTransactions] = useState<DataListProps[]>([])
  const [highLightData, setHighLightDate] = useState<HighlightData>({} as HighlightData)

  const theme = useTheme()
  const {signOut, user} = useAuth()

  function getLastTransaction(
    collection: DataListProps[],
    type: 'positive' | 'negative'
  ) {

    const collectionFiltered = collection
      .filter((transaction) => transaction.type === type)

    if (collectionFiltered.length === 0) {
      return 0;
    }
    const lastTransaction = new Date(Math.max.apply(
      Math, collectionFiltered
        .map((transaction) => new Date(transaction.date).getTime())
    )
    );

    return `${lastTransaction.getDate()} de ${lastTransaction.toLocaleString('pt-BR', { month: 'long' })}`;
  }

  async function loadTransactions() {
    const dataKey =`@gofinances:transactions_user:${user.id}`
    const response = await AsyncStorang.getItem(dataKey)
    const transactions = response ? JSON.parse(response) : []

    let entriesTotal = 0
    let expensiveTotal = 0
    const transactionFormated: DataListProps[] = transactions
      .map((item: DataListProps) => {

        if (item.type === 'positive') {
          entriesTotal += Number(item.amount)
        } else {
          expensiveTotal += Number(item.amount)
        }
        const amount = Number(item.amount)
          .toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          })

        const date = Intl.DateTimeFormat('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: '2-digit'
        }).format(new Date(item.date));

        return {
          id: item.id,
          name: item.name,
          amount,
          type: item.type,
          category: item.category,
          date
        }
      })
    setTransactions(transactionFormated)
    const lastTransactionEntries = getLastTransaction(transactions, 'positive')
    const lastTransactionExpensive = getLastTransaction(transactions, 'negative')
    const totapInterval = lastTransactionExpensive === 0
     ? "Sem transações" : `01 a ${lastTransactionExpensive}`

    const total = entriesTotal - expensiveTotal
    setHighLightDate({
      entries: { 
        amount:
          entriesTotal.toLocaleString('pt-BR',
            {
              style:'currency',
              currency: 'BRL'
            }),
            lastTransaction: lastTransactionEntries === 0 ? "Não ha transações":`Última saida dia ${lastTransactionEntries}`
      },
      expensives: {
        amount:
          expensiveTotal.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          }),
        lastTransaction: lastTransactionExpensive === 0 ? "Não ha transações":`Última saida dia ${lastTransactionExpensive}`

      },
      total: {
        amount: total.toLocaleString('pt-BR',
          {
            style:'currency',
            currency: 'BRL'
          }),
        lastTransaction: totapInterval
      }
    })
    setIsLoading(false)
  }
  useEffect(() => {
    loadTransactions()
  }, [])
  useFocusEffect(useCallback(() => {
    loadTransactions()
  }, []))

  return (
    <Container>
      {
        isLoading ?
          <LoadContainer>
            <ActivityIndicator
              color={theme.colores.primaty}
              size='large'
            />
          </LoadContainer>:
          <>
            <Header>
              <UserWrapper>
                <UserInfo>
                  <Photo source={{uri: user.photo}}/>
                  <User>
                    <UserGreetins>Olá,</UserGreetins>
                    <UserName>{user.name ? user.name : 'Fulano'}</UserName>
                  </User>
                </UserInfo>
                <LogoutButton onPress={signOut}>
                  <Icon name="power" />
                </LogoutButton>
              </UserWrapper>
            </Header>
            <HighLightCards>

              <HighLightCard
                type='up'
                title="Entrada"
                amount={highLightData.entries.amount}
                lastTransaction={highLightData.entries.lastTransaction}
              />
              <HighLightCard
                type='down'
                title="Saida"
                amount={highLightData.expensives.amount}
                lastTransaction={highLightData.expensives.lastTransaction}
              />
              <HighLightCard
                type='total'
                title="Total"
                amount={highLightData.total.lastTransaction}
                lastTransaction={highLightData.entries.lastTransaction}
              />
            </HighLightCards>
            <Transactions>
              <Title>Listagem</Title>

              <TransactionList // flatList
                data={transactions}
                keyExtractor={item => item.id}
                renderItem={({ item }) =>
                  <TransactionCard data={item} />}
              />
            </Transactions>
          </>
      }
    </Container>
  )
}
