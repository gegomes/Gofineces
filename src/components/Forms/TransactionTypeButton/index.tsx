import React from 'react'
import { RectButton } from 'react-native-gesture-handler' 

import {
  Container,
  Icon,
  Title,
  Button
} from './style'

const icons = {
  up: 'arrow-up-circle',
  down: 'arrow-down-circle'
}

interface Props  extends RectButton{
  type: 'up' | 'down'
  title: string
  isActive: boolean
}
 
export function TransactionTypeButton({
  type,
  title,
  isActive,
  ...rest

}: Props) {
  return (
    <Container
      type={type}
      isActive={isActive}
     
      
    >
    <Button
    {...rest}
    >
  
      <Icon
        name={icons[type]}
        type={type}
      />

      <Title>{title}</Title>
    </Button>
    </Container>
  )
}