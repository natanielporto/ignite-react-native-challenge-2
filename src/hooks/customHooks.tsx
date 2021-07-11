import AsyncStorage from '@react-native-async-storage/async-storage';


interface DataProps {
  id: string,
  email: string,
  title: string,
  password: string,
}

export const customSetAsyncStorage = async ({id, email, title, password}: DataProps) => {
  const dataKey = "@passmanager:logins"
  
  const newLoginData = {
    id, title, email, password
  };

  const retrieveData = await AsyncStorage.getItem(dataKey);
  
  const currentData = retrieveData ? JSON.parse(retrieveData) : [];

  const newData = [...currentData, newLoginData];
  
  await AsyncStorage.setItem(dataKey, JSON.stringify(newData));

  return newData;
}

export const customGetAsyncStorage = async () => {
  const dataKey = "@passmanager:logins"

  const dataLoaded = await AsyncStorage.getItem(dataKey);
  
  const result = dataLoaded ? JSON.parse(dataLoaded) : [];
  
  return result;
}