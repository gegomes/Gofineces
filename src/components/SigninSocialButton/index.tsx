import React from 'react'
import { RectButtonProps } from 'react-native-gesture-handler'
import { SvgProps } from 'react-native-svg'

import {
  Button,
  ImagemContainer,
  Texto,

} from './styles'

interface Props extends RectButtonProps {
  title: string;
  svg: React.FC<SvgProps>
}

export function SingnInSocialButton({
  title,
  svg: Svg,
  ...rest

}: Props) {
  return (
    <Button {...rest}>
      <ImagemContainer>
        <Svg />
      </ImagemContainer>
      <Texto>
        {title}
      </Texto>

    </Button>
  )
}