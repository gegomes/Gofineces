import { DataListProps } from './index';
import {FlatList} from 'react-native'
import styled from 'styled-components/native'
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize'
import { Feather } from "@expo/vector-icons"
import { getBottomSpace } from 'react-native-iphone-x-helper'
import { BorderlessButton } from 'react-native-gesture-handler';

export const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.colores.background};
`;

export const Header = styled.View`
width: 100%;
height: ${RFPercentage(42)}px;
background-color: ${({ theme }) => theme.colores.primaty};
justify-content: center;
align-items: center;
flex-direction: row;
`;

export const UserWrapper = styled.View`
  width: 100%;
  padding: 0 20px;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  margin-top: -100px;
`;

export const UserInfo = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Photo = styled.Image`
  width: ${RFValue(48)}px;
  height: ${RFValue(48)}px;
  border-radius: 10px;
`;

export const User = styled.View`
  margin-left: 17px;
`;

export const UserGreetins = styled.Text`
  
  color: ${({ theme }) => theme.colores.shape};
  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.bold};
`;

export const UserName = styled.Text`
  color: ${({ theme }) => theme.colores.shape};
  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.bold};
`;
export const LogoutButton = styled(BorderlessButton)`

`;

export const Icon = styled(Feather)`
  color: ${({ theme }) => theme.colores.secundary};
  font-size: ${RFValue(24)}px;

`;
// o attts acessa a propiedade direto do component acesssa a propietade do componente
export const HighLightCards = styled.ScrollView.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: { paddingHorizontal: 24 }

})`
width: 100%;
position: absolute;
margin-top: ${RFPercentage(25)}px;
`;

export const Transactions = styled.View`
flex: 1%;
padding: 0 24px;

margin-top: ${RFPercentage(12)}px;
`;

export const Title = styled.Text`
font-size: ${RFValue(18)}px;
font-family: ${({ theme }) => theme.fonts.regular};
margin-bottom: 16px;

`;

export const TransactionList = styled(
  FlatList as new() => FlatList<DataListProps>

).attrs({
  showsVerticalScrollIndicator:false,
  contentContainerStyle:{
    paddingBottom: getBottomSpace()
  }
})``;

export const LoadContainer = styled.View`
  flex:1;
  justify-content: center;
  align-items: center;
`;