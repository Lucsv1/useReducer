import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useReducer, useState } from 'react';

const Stack = createNativeStackNavigator();





const Fomulario = () =>{

  const productReducer = (state, action) =>{
    switch (action.type){
      case 'add':
        return {...state, nome: action.payload};
      default:
        return state
    }
  }


  const [state, dispatch] = useReducer(productReducer, {nome: ''})

  const MudarName = (e) =>{
    dispatch({type: 'add', payload: e })
  }
  

  return(<View >
    <View style={styles.container}>
      <Text>Nome</Text>
      <TextInput value={state.nome} onChangeText={MudarName}/>
      <Text>Quantidade</Text>
      <TextInput/>
      <Text>Preço</Text>
      <TextInput/>
      <Button title='adicionar' onPress={productReducer}/>
    </View>
    <View>
      <Text>Nome:{state.nome}</Text>
    </View>
  </View>)
}

export default function App() {
  return (
    <View>
      <Fomulario/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
