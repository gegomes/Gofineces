import React from 'react'
import { Container, Error } from './styles'
import { Input } from '../input'
import { Controller, Control } from 'react-hook-form'
import { TextInputProps } from 'react-native'


interface Props extends TextInputProps {
  control: Control;
  name: string
  error: string

}
export function InputForm({
  control,
  name,
  error,
  ...rest

}: Props) {
  return (

    <Container>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <Input
            onChangeText={onChange}
            value={value}
            {...rest}
          />
        )}
        name={name}
      />
     {error && <Error>{error}</Error>}  
    </Container>
  )
}