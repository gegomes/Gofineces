import React from 'react';
import { FlatList} from 'react-native'
import { Button } from '../../components/Forms/Button';
import { categories } from '../../utils/categories';
import {
  Container,
  Header,
  Title,
  Category,
  Icon,
  Name,
  Separator,
  Footer,
} from './styles'

interface Category {
  key: string
  name: string
}

interface Props {
  category: Category
  setCategory: (category: Category) => void
  closeSelectCategory: ()=> void
}

export function CategorySelect({
  category,
  setCategory,
  closeSelectCategory
}: Props) {
  function handCategorySelect(category: Category) {
    setCategory(category)
  }
  return (
    <Container>
      <Header>
        <Title>Selecione uma Categoria abaixo </Title>
      </Header>
      
      <FlatList
        data={categories}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <Category
            onPress={()=> handCategorySelect(item)}
            isActive={category.key === item.key}
          >
            <Icon name={item.icon} />
            <Name>{item.name}</Name>
          </Category>
        )}
        ItemSeparatorComponent={()=> <Separator/>}
      />
      <Footer>
        <Button title="Selecionar" 
          onPress={closeSelectCategory}
        />
      </Footer>
      </Container>
      
  )
}
