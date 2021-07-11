import React, { useState, useCallback, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { customGetAsyncStorage } from '../../hooks/customHooks';
import { SearchBar } from '../../components/SearchBar';
import { LoginDataItem } from '../../components/LoginDataItem';
import { useTheme } from 'styled-components'

import {
  Container,
  LoginList,
  EmptyListContainer,
  EmptyListMessage
} from './styles';

interface LoginDataProps {
  id: string;
  title: string;
  email: string;
  password: string;
};

type LoginListDataProps = LoginDataProps[];

export function Home() {
  const theme = useTheme()

  const [searchListData, setSearchListData] = useState<LoginListDataProps>([]);
  const [data, setData] = useState<LoginListDataProps>([]);

  useEffect(() => {
    customGetAsyncStorage().then(response => {
      setData(response);
    })
  }, []);

  useEffect(() => {
    customGetAsyncStorage().then(response => {
      setSearchListData(response);
    })
  }, []);
  
  useFocusEffect(useCallback(() => {
    customGetAsyncStorage().then(response => {
      setData(response);
    })
  }, []));

  useFocusEffect(useCallback(() => {
    customGetAsyncStorage().then(response => {
      setSearchListData(response);
    })
  }, []));

  function handleFilterLoginData(search: string) {
    const result: LoginListDataProps = data.filter((el: LoginDataProps) => el.title === search)

    if (result) return setSearchListData(result)
    return 
 }

  return (
    <Container background={theme.colors.background}>
      <SearchBar
        placeholder="Pesquise pelo nome do serviço"
        onChangeText={(value) => handleFilterLoginData(value)}
      />

      <LoginList
        keyExtractor={(item) => item.id}
        data={searchListData}
        ListEmptyComponent={(
          <EmptyListContainer>
            <EmptyListMessage>Nenhum item a ser mostrado</EmptyListMessage>
          </EmptyListContainer>
        )}
        renderItem={({ item: loginData }) => {
          return <LoginDataItem
            title={loginData.title}
            email={loginData.email}
            password={loginData.password}
          />
        }}
      />
    </Container>
  )
}