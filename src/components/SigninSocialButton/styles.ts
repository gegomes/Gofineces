import styled  from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import theme from '../../global/styles/theme';

export const Button = styled(RectButton)`
  height: ${RFValue(50)}px;
  background-color: ${theme.colores.shape};
  border-radius: 5px;
  align-items: center;
  flex-direction: row;
  margin-bottom: 16px;
`;

export const ImagemContainer = styled.View`
  height: 100%;
  justify-content: center;
  align-items: center;

  padding: ${RFValue(16)}px;
  border-color: ${theme.colores.background};
  border-right-width:1px;

`;

export const Texto = styled.Text`
  flex: 1;
  text-align: center;
  font-family: ${theme.fonts.medium};
  font-size: ${RFValue(14)}px;
`