import React from 'react'
import { RFValue } from 'react-native-responsive-fontsize'

import AppleSvg from '../../assets/apple.svg'
import GoogleSvg from '../../assets/google.svg'
import LogoSvg from '../../assets/logo.svg'
import { useAuth } from '../../hooks/auth'
import {ActivityIndicator, Alert, Platform } from 'react-native'

import { SingnInSocialButton } from '../../components/SigninSocialButton'

import {
  Container,
  Header,
  TitleWrapper,
  SingInTitle,
  Footer,
  FooterWrapper,
} from './style'
import { useState } from 'react'
import theme from '../../global/styles/theme'

export function SingnIn() {
  const { singnInWithGoogle } = useAuth()
  const { singnInWithApple } = useAuth()
  const [isloading, setIsloading] = useState(false)

  async function handleSingnInWithGoogle() {
    try {
      setIsloading(true)
     return  await singnInWithGoogle()
    } catch (error) {
      console.log(error)
      Alert.alert('Não foi possível conectar a conta do google')
      setIsloading(false)
    } 
  }

  async function handleSingnInWithApple() {
    try {
      setIsloading(true)
      return await singnInWithApple()

    } catch (error) {
      console.log(error)
      Alert.alert('Não foi possível conectar a conta da Apple')
      setIsloading(false)
    } 
  }

  return (
    <Container>
      <Header>
        <TitleWrapper>
          <LogoSvg
            width={RFValue(200)}
            height={RFValue(200)}
          />
        </TitleWrapper>
        <SingInTitle>Faça seu login abaixo</SingInTitle>
      </Header>
      <Footer>
        <FooterWrapper>

          <SingnInSocialButton
            title="Login com o Google"
            svg={GoogleSvg}
            onPress={handleSingnInWithGoogle}
          />
          { Platform.OS === 'ios' ??
             <SingnInSocialButton
             title="Login com a Apple"
             svg={AppleSvg}
             onPress={handleSingnInWithApple}
           />
          }
        
        </FooterWrapper>
        {isloading &&
         <ActivityIndicator
          color={theme.colores.shape}
          size={30}
          style={{marginTop: 25}}
        /> }
      </Footer>
    </Container>
  )
}