import { StatusBar } from "expo-status-bar";
import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useReducer, useState, useContext } from "react";
import { object, string } from "yup";

const Stack = createNativeStackNavigator();



const Fomulario = () => {
  const schema = object({
    nome: string()
      .required("O campo é necessario")
      .min(5, "O nome precisa de pelo menos 5 caracteres")
      .max(10, "O nome deve conter até 10 caracteres  "),
    quantidade: string()
      .required("O campo é obrigatorio")
      .min(10, "é necessario pelo menos 10 caracteres")
      .max(15, "o maximo de caracteres é 15"),
    preco: string()
      .required("O campo é obrigatorio")
      .min(3, "é necessario 3 caracters")
      .max(10, "o maximo de caracteres é 10"),
  });

  const [nome, setNome] = useState("");
  const [nomeErro, setNomeErro] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [quantidadeErro, setQuantidadeErro] = useState("");
  const [preco, setPreco] = useState("");
  const [precoErro, setPrecoErro] = useState("")

  const productReducer = (state, action) => {
    switch (action.type) {
      case "add":
        return { ...state, nome: action.payload };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(productReducer, { nome: "" });

  const MudarName = (e) => {
    dispatch({ type: "add", payload: e });
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text>Nome</Text>
        <TextInput value={nome} onChangeText={setNome} />
        <Text style={{ color: "red" }}>{nomeErro}</Text>
        <Text>Quantidade</Text>
        <TextInput value={quantidade} onChangeText={setQuantidade} />
        <Text>{quantidadeErro}</Text>
        <Text>Preço</Text>
        <TextInput value={preco} onChangeText={setPreco} />
        <Text>{precoErro}</Text>
        <Button
          title="adicionar"
          onPress={() => {
            schema
              .validate({ nome, quantidade, preco }, { abortEarly: false })
              .then(() => {
                setNomeErro("");
                setQuantidadeErro("");
                setPrecoErro("")
              })
              .catch((err) => {
                setNomeErro("");
                setQuantidadeErro("");
                setPrecoErro("");
                err.inner.forEach((erro) => {
                  if (erro.path === "nome") {
                    setNomeErro(erro.message);
                  } else if (erro.path === "quantidade") {
                    setQuantidadeErro(erro.message);
                  } else if (erro.path === "preco"){
                    setPrecoErro(erro.message)
                  }
                });
              });
          }}
        />
      </View>
      <View>
        <Text>Nome:</Text>
      </View>
    </SafeAreaView>
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
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
