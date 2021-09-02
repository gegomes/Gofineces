
import React from 'react'
import { TextInputProps} from 'react-native'
import { Container } from './styles'

type  Props = TextInputProps  // tipando a variavel 

export function Input({...rest}: Props) {
  return (
    <Container {...rest}/>
  )
}