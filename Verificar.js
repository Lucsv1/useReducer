// loja.js
import { createStore } from 'redux';

const estadoInicial = {
  produtos: [],
};

const redutorDeProdutos = (estado = estadoInicial, acao) => {
  switch (acao.type) {
    case 'ADICIONAR_PRODUTO':
      return {
        ...estado,
        produtos: [...estado.produtos, acao.payload],
      };
    case 'ATUALIZAR_PRODUTO':
      const produtosAtualizados = estado.produtos.map((produto) =>
        produto.id === acao.payload.id ? acao.payload : produto
      );
      return {
        ...estado,
        produtos: produtosAtualizados,
      };
    case 'EXCLUIR_PRODUTO':
      const produtosFiltrados = estado.produtos.filter(
        (produto) => produto.id !== acao.payload
      );
      return {
        ...estado,
        produtos: produtosFiltrados,
      };
    default:
      return estado;
  }
};  

export const loja = createStore(redutorDeProdutos);

// AppProdutos.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

const AppProdutos = () => {
  const produtos = useSelector((state) => state.produtos);
  const dispatch = useDispatch();

  const [nome, setNome] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [preco, setPreco] = useState('');

  const adicionarProduto = () => {
    // Realize a validação dos campos aqui, se necessário
    if (nome && quantidade && preco) {
      const novoProduto = {
        id: Date.now(),
        nome,
        quantidade,
        preco,
      };
      dispatch({ type: 'ADICIONAR_PRODUTO', payload: novoProduto });
      setNome('');
      setQuantidade('');
      setPreco('');
    }
  };

  const excluirProduto = (id) => {
    dispatch({ type: 'EXCLUIR_PRODUTO', payload: id });
  };

  const editarProduto = (produto) => {
    // Implemente a edição do produto aqui, se necessário
  };

  return (
    <View>
      <Text>Produto</Text>
      <TextInput
        placeholder="Nome"
        value={nome}
        onChangeText={(text) => setNome(text)}
      />
      <TextInput
        placeholder="Quantidade"
        value={quantidade}
        onChangeText={(text) => setQuantidade(text)}
      />
      <TextInput
        placeholder="Preço"
        value={preco}
        onChangeText={(text) => setPreco(text)}
      />
      <Button title="Adicionar" onPress={adicionarProduto} />
      <FlatList
        data={produtos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.nome}</Text>
            <Text>Quantidade: {item.quantidade}</Text>
            <Text>Preço: {item.preco}</Text>
            <Button title="Editar" onPress={() => editarProduto(item)} />
            <Button title="Excluir" onPress={() => excluirProduto(item.id)} />
          </View>
        )}
      />
    </View>
  );
};

export default AppProdutos;