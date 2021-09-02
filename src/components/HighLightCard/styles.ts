
import styled,{ css} from 'styled-components/native';
import { Feather } from '@expo/vector-icons'
import { RFValue } from 'react-native-responsive-fontsize'
// passa propiedade do icon props no icon 
interface TypeProps {
  type: 'up'|"down"|"total"
}

export const Container = styled.View<TypeProps>`
  background-color:  ${({theme, type }) =>
  type === 'total'?  theme.colores.secundary :theme.colores.shape};
  width: ${RFValue(300)}px;
  border-radius: 5px;
  padding: 19px 23px;
  padding-bottom: ${RFValue(25)}px;
  margin-right: 16px;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const Title = styled.Text<TypeProps>`
  font-family: ${({theme }) => theme.fonts.regular};
  font-size: ${RFValue(18)}px;
  color:  ${({theme, type }) => type === 'total'?  theme.colores.shape :theme.colores.text_Dark};
`;

export const Icon = styled(Feather) <TypeProps>`
    font-size: ${RFValue(48)}px;
    ${({type}) => type === 'up' && css`
     color: ${({theme }) => theme.colores.success};
    `}
    ${({type}) => type === 'down' && css`
     color: ${({theme}) => theme.colores.attention};
    `}
    ${({type})=> type === 'total' && css`
     color: ${({theme}) => theme.colores.shape};
    `}
`;

export const Footer = styled.View`
  
`;

export const Amount = styled.Text<TypeProps>`
  font-family: ${({ theme }) => theme.fonts.medium};
  color:  ${({ theme, type }) => type === 'total' ? theme.colores.shape : theme.colores.text_Dark};
  font-size: ${RFValue(24)}px;
  margin-top: 38px;
`;

export const LastTransaction = styled.Text<TypeProps>`
  font-family: ${({ theme }) => theme.fonts.regular};
  color:  ${({theme, type }) => type === 'total'?  theme.colores.shape :theme.colores.text};
  font-size: ${RFValue(12)}px;
`;

