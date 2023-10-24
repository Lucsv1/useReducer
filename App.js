import { StatusBar } from "expo-status-bar";
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useReducer, useState } from "react";

const Stack = createNativeStackNavigator();

const productReducer = (state, action) => {
  switch (action.type) {
    case "add":
      return {
        ...state,
        objetos: { nome: "", quantidade: "", preco: "" },
      };
    case "remover":
      return {
        ...state,
        objetos: { nome: "", quantidade: "", preco: "" },
      };
    default:
      return state;
  }
};

const Fomulario = () => {
  const Lista = () => {
    <View></View>;
  };

  const lista = [];

  const objetos = {
    nome: "",
    quantidade: "",
    preco: "",
  };
  const [state, dispatch] = useReducer(productReducer, objetos);

  const Registrar = () => {
    dispatch({ type: "add", payload: objetos });
  };

  const Remover = () => {
    dispatch({ type: "remover" });
  };

  return (
    <View>
      <View style={styles.container}>
        <Text>Nome</Text>
        <TextInput
          onChangeText={(txt) => {
            state.nome = txt;
          }}
        />
        <Text>Quantidade</Text>
        <TextInput
          onChangeText={(txt) => {
            state.quantidade = txt;
          }}
        />
        <Text>Preço</Text>
        <TextInput
          onChangeText={(txt) => {
            state.preco = txt;
          }}
        />
        <Button title="adicionar" onPress={Registrar} />
        <Button title="Remover" onPress={Remover} />
      </View>
      <View style={{ flex: 10 }}>
        <Text>Nome:{state.nome}</Text>
        <Text>Quantidade: {state.quantidade}</Text>
        <Text>Preço: {state.preco}</Text>
      </View>
    </View>
  );
};

export default function App() {
  return (
    <View>
      <Fomulario />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 100,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
