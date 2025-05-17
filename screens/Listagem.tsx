// /screens/Listagem.tsx
import React, { useEffect, useState, useLayoutEffect } from 'react'; // Adicionado useLayoutEffect
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity, // Adicionado para o botão estilizado
  ActivityIndicator // Para feedback de carregamento
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect } from '@react-navigation/native'; // Adicionado useFocusEffect
import { DrawerNavigationProp } from '@react-navigation/drawer'; // Para navegação do Drawer
import { DrawerParamList } from '../App'; // Importa a lista de parâmetros do Drawer

// Cores do tema
const radarMotuGreen = '#22DD44';
const screenDarkBackground = '#1A1D21';
const headerScreenColor = '#202328';
const textColorLight = '#FFFFFF';
const itemBackgroundColor = '#2C2F33'; // Fundo para os itens da lista
const itemTextColor = '#E0E0E0';       // Cor do texto nos itens
const itemTitleColor = '#FFFFFF';      // Cor do título de cada item
const buttonTextColor = '#FFFFFF';

// Interface para os veículos (consistente com Cadastro.tsx)
interface Veiculo {
  placa: string;
  marca: string;
  modelo: string;
  cor: string;
  anoFabricacao: string;
  anoModelo: string;
  chassi: string;
}

// Tipagem correta para a navegação
type ListagemScreenNavigationProp = DrawerNavigationProp<DrawerParamList, 'ListarVeiculos'>;

export default function Listagem() {
  const navigation = useNavigation<ListagemScreenNavigationProp>();
  const [veiculos, setVeiculos] = useState<Veiculo[]>([]);
  const [isLoading, setIsLoading] = useState(true); // Estado para feedback de carregamento

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: headerScreenColor,
      },
      headerTintColor: textColorLight,
    });
  }, [navigation]);

  // useFocusEffect para recarregar os dados sempre que a tela ganhar foco
  useFocusEffect(
    React.useCallback(() => {
      carregarVeiculos();
    }, [])
  );

  async function carregarVeiculos() {
    setIsLoading(true);
    try {
      const listaVeiculosJson = await AsyncStorage.getItem('@lista_veiculos'); // Usando a mesma chave de Cadastro.tsx
      const listaVeiculos = listaVeiculosJson ? JSON.parse(listaVeiculosJson) : [];
      setVeiculos(listaVeiculos);
    } catch (error) {
      console.error('Erro ao carregar os veículos:', error);
      // Adicionar um Alert aqui pode ser útil para o usuário
      // Alert.alert("Erro", "Não foi possível carregar a lista de veículos.");
    } finally {
      setIsLoading(false);
    }
  }

  const renderItem = ({ item }: { item: Veiculo }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemTitle}>{item.placa} - {item.modelo}</Text>
      <Text style={styles.itemText}>Marca: {item.marca}</Text>
      <Text style={styles.itemText}>Cor: {item.cor}</Text>
      <Text style={styles.itemText}>Ano: {item.anoFabricacao}/{item.anoModelo}</Text>
      <Text style={styles.itemText}>Chassi: {item.chassi}</Text>
    </View>
  );

  if (isLoading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color={radarMotuGreen} />
        <Text style={styles.loadingText}>Carregando Veículos...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Veículos Cadastrados</Text>
      <FlatList
        data={veiculos}
        keyExtractor={(item, index) => item.placa + index} // Chave mais robusta
        renderItem={renderItem}
        contentContainerStyle={styles.listContentContainer}
        ListEmptyComponent={
          <View style={styles.emptyListComponent}>
            <Text style={styles.emptyListText}>Nenhum veículo cadastrado ainda.</Text>
            <Text style={styles.emptyListSubText}>Vá para a tela de cadastro para adicionar.</Text>
          </View>
        }
      />
      <TouchableOpacity
        style={[styles.button, styles.secondaryButton]}
        onPress={() => navigation.navigate('CadastrarVeiculo')} // Rota correta do Drawer
      >
        <Text style={[styles.buttonText, styles.secondaryButtonText]}>Cadastrar Novo Veículo</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15, // Ajuste de padding
    paddingTop: 20,
    paddingBottom: 10,
    backgroundColor: screenDarkBackground,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: textColorLight,
  },
  heading: {
    fontSize: 24, // Aumentei um pouco
    fontWeight: 'bold',
    color: textColorLight,
    marginBottom: 20, // Aumentei a margem
    textAlign: 'center',
  },
  listContentContainer: {
    paddingBottom: 10, // Espaço no final da lista
  },
  itemContainer: {
    backgroundColor: itemBackgroundColor,
    padding: 18, // Aumentei o padding
    borderRadius: 10, // Bordas mais arredondadas
    marginBottom: 12, // Aumentei a margem
    shadowColor: '#000', // Sombra para dar profundidade
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: itemTitleColor,
    marginBottom: 8, // Aumentei a margem
  },
  itemText: {
    fontSize: 15, // Aumentei um pouco
    color: itemTextColor,
    lineHeight: 22, // Melhor espaçamento entre linhas
    marginBottom: 3,
  },
  emptyListComponent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  emptyListText: {
    fontSize: 18,
    color: textColorLight,
    marginBottom: 10,
  },
  emptyListSubText: {
    fontSize: 14,
    color: itemTextColor,
  },
  button: {
    backgroundColor: radarMotuGreen,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 10,
  },
  buttonText: {
    color: buttonTextColor,
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderColor: radarMotuGreen,
    borderWidth: 2,
  },
  secondaryButtonText: {
    color: radarMotuGreen,
  },
});