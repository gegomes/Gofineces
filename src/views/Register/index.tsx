import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup"
import AsyncStorang from "@react-native-async-storage/async-storage"
import uuid from 'react-native-uuid'
import { InputForm } from '../../components/Forms/InputForm'
import { Button } from '../../components/Forms/Button/index'
import { TransactionTypeButton } from '../../components/Forms/TransactionTypeButton/index'
import { CategorySelectButton } from '../../components/Forms/CategorySelectButton'
import { useNavigation } from '@react-navigation/native'
import { useAuth } from '../../hooks/auth'
import {
  TouchableWithoutFeedback,
  Modal,
  Keyboard,
  Alert,
} from 'react-native'

import { CategorySelect } from '../CategorySelect'
import {
  Container,
  Header,
  Form,
  Fields,
  TransactionType,
  Title

} from './styles'
interface FormData {
  name: string
  amount: string
}

const schema = Yup.object().shape({
  name: Yup
    .string().
    required("Nome é obrigatório"),
  amount: Yup
    .number()
    .required("numero é obrigatório")
    .typeError("Informe um valor númerico")
    .positive("O valo não pode ser negativo")
})

export function Register() {

  const [transactionType, setTransactionType] = useState()
  const [categortyModalOpen, setcategortyModalOpen] = useState(false)

  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria'
  })

  const {user} = useAuth()

  const navigation = useNavigation()
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })

  function handleTransactionTypeSelect(type: 'positive' | 'negative') {
    setTransactionType(type)
  }

  function handleCloseSelectCategoryModal() {
    setcategortyModalOpen(false)
  }

  function handleOpeneSelectCategoryModal() {
    setcategortyModalOpen(true)
  }
  async function handleRegister(form: FormData) {
    if (!transactionType)
      return Alert.alert('Ops...', "Selecione o tipo da transarção.")
    if (category.key === 'category')
      return Alert.alert('Ops...', "Selecione a categoria.")

    const newTransaction = {
      id: String(uuid.v4()),
      name: form.name,
      amount: form.amount,
      type: transactionType,
      category: category,
      date: new Date()
    }

    try {
      const dataKey = `@gofinances:transactions_user:${user.id}`
      const data = await AsyncStorang.getItem(dataKey)
      const currentDate = data ? JSON.parse(data) : []

      const DataFormatted = [
        ...currentDate,
        newTransaction
      ]
      await AsyncStorang.setItem(dataKey, JSON.stringify(DataFormatted))
      reset()
      setTransactionType('')
      setCategory({
        key: 'category',
        name: 'Categoria'
      })

      navigation.navigate('Listagem')
    } catch (error) {
      Alert.alert("Não foi possivel salvar os dados ")
    }
  }
  return (
    <TouchableWithoutFeedback
      onPress={Keyboard.dismiss}
    >
      <Container>
        <Header>
          <Title>Cadastro</Title>
        </Header>
        <Form>
          <Fields>
            <InputForm
              control={control}
              name="name"
              placeholder='Nome'
              autoCapitalize="sentences"
              autoCorrect={false}
              error={errors.name && errors.name.message}
            />
            <InputForm
              control={control}
              name="amount"
              placeholder='Amount'
              keyboardType='numeric'
              error={errors.amount && errors.amount.message}
            />
            <TransactionType>
              <TransactionTypeButton
                type="up"
                title='Income'
                onPress={() => handleTransactionTypeSelect('positive')}
                isActive={transactionType === 'positive'}
              />
              <TransactionTypeButton
                type="down"
                title='Outcome'
                onPress={() => handleTransactionTypeSelect('negative')}
                isActive={transactionType === 'negative'}
              />
            </TransactionType>
            <CategorySelectButton
              title={category.name}
              onPress={handleOpeneSelectCategoryModal}
            />
          </Fields>
          <Button
            title="Enviar"
            onPress={handleSubmit(handleRegister)}
          />
        </Form>
        <Modal visible={categortyModalOpen}>
          <CategorySelect
            category={category}
            setCategory={setCategory}
            closeSelectCategory={handleCloseSelectCategoryModal}
          />
        </Modal>
      </Container>
    </TouchableWithoutFeedback>
  )
}