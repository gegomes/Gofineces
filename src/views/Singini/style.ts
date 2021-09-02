import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import theme from '../../global/styles/theme';

export const Container = styled.View`
  flex:1;
`
export const Header = styled.View`
  width: 100%;
  height: 65%;
  background-color: ${theme.colores.primaty};
  justify-content: flex-end;
  align-items: center;
`;

export const TitleWrapper = styled.View`
`;

export const SingInTitle = styled.Text`
  font-family: ${theme.fonts.regular};
  font-size: ${RFValue(16)}px;
  color: ${theme.colores.shape};

  text-align: center;
  margin-top: 80px;
  margin-bottom: 67px;
`;

export const Footer = styled.View`
  background-color: ${theme.colores.secundary};;
  width: 100%;
  height: 35%;

`;

export const FooterWrapper = styled.View`
  margin-top: ${RFPercentage(-3)}PX;
  padding: 0 24px;
  justify-content: space-between;

`;