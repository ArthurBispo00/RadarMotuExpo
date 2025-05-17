// /screens/Cadastro.tsx
import React, { useState, useLayoutEffect } from 'react'; // Adicionado useLayoutEffect
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  ScrollView,
  TouchableOpacity, // Adicionado para botões estilizados
  Platform
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer'; // Para navegação do Drawer
import { DrawerParamList } from '../App'; // Importa a lista de parâmetros do Drawer
import PlacaRecognition from './PlacaRecognition';

// Cores do tema (idealmente, viriam de um arquivo de constantes/tema)
const radarMotuGreen = '#22DD44';
const screenDarkBackground = '#1A1D21';
const headerScreenColor = '#202328'; // Cor para o header da tela (igual da HomeScreen)
const textColorLight = '#FFFFFF';
const placeholderTextColor = '#A0A0A0'; // Cor para placeholders dos inputs
const inputBackgroundColor = '#2C2F33'; // Fundo para os inputs
const inputBorderColor = '#4F545C'; // Borda sutil para os inputs
const buttonTextColor = '#FFFFFF';

// Tipagem correta para a navegação a partir desta tela dentro de um Drawer
type CadastroScreenNavigationProp = DrawerNavigationProp<DrawerParamList, 'CadastrarVeiculo'>;

export default function CadastroVeiculo() {
  const navigation = useNavigation<CadastroScreenNavigationProp>();

  const [placa, setPlaca] = useState('');
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [cor, setCor] = useState('');
  const [anoFabricacao, setAnoFabricacao] = useState('');
  const [anoModelo, setAnoModelo] = useState('');
  const [chassi, setChassi] = useState('');

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: headerScreenColor,
      },
      headerTintColor: textColorLight,
    });
  }, [navigation]);

  async function salvarVeiculo() { // Renomeado para Veiculo para consistência com o nome do componente
    if (!placa || !marca || !modelo || !cor || !anoFabricacao || !anoModelo || !chassi) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }
    if (!/^\d{4}$/.test(anoFabricacao) || !/^\d{4}$/.test(anoModelo)) {
        Alert.alert('Erro', 'Ano de Fabricação e Ano Modelo devem conter 4 dígitos numéricos.');
        return;
    }

    const novoVeiculo = { placa, marca, modelo, cor, anoFabricacao, anoModelo, chassi };

    try {
      const veiculosSalvos = await AsyncStorage.getItem('@lista_veiculos'); // Chave genérica
      const listaVeiculos = veiculosSalvos ? JSON.parse(veiculosSalvos) : [];
      listaVeiculos.push(novoVeiculo);
      await AsyncStorage.setItem('@lista_veiculos', JSON.stringify(listaVeiculos));
      Alert.alert('Sucesso', 'Veículo salvo com sucesso!');
      setPlaca(''); setMarca(''); setModelo(''); setCor('');
      setAnoFabricacao(''); setAnoModelo(''); setChassi('');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar o veículo.');
      console.error("Erro ao salvar veículo:", error);
    }
  }

  function irParaListagem() {
    // Navega para a rota definida no Drawer Navigator em App.tsx
    navigation.navigate('ListarVeiculos'); 
  }

  const handlePlacaRecognized = (placaReconhecida: string) => {
    // Validação de placa (Mercosul e antiga) - ajuste a regex conforme necessidade
    const placaRegex = /^[A-Z]{3}[0-9][A-Z0-9][0-9]{2}$/i; 
    if (placaReconhecida && placaRegex.test(placaReconhecida)) {
      setPlaca(placaReconhecida.toUpperCase());
      Alert.alert('Placa Reconhecida', `Placa detectada: ${placaReconhecida.toUpperCase()}`);
    } else {
      Alert.alert('Placa Inválida', `Texto detectado não parece ser uma placa válida: ${placaReconhecida}`);
    }
  };

  return (
    <ScrollView 
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled" // Ajuda com o fechamento do teclado ao tocar fora
    >
      <Text style={styles.label}>Placa</Text>
      <TextInput 
        style={styles.input} 
        value={placa} 
        onChangeText={setPlaca} 
        placeholder="AAA-1234 ou ABC1D23"
        placeholderTextColor={placeholderTextColor}
        autoCapitalize="characters"
      />

      <Text style={styles.label}>Marca</Text>
      <TextInput 
        style={styles.input} 
        value={marca} 
        onChangeText={setMarca} 
        placeholder="Ex: Honda"
        placeholderTextColor={placeholderTextColor}
      />

      <Text style={styles.label}>Modelo</Text>
      <TextInput 
        style={styles.input} 
        value={modelo} 
        onChangeText={setModelo} 
        placeholder="Ex: CG 160 Titan"
        placeholderTextColor={placeholderTextColor}
      />

      <Text style={styles.label}>Cor</Text>
      <TextInput 
        style={styles.input} 
        value={cor} 
        onChangeText={setCor} 
        placeholder="Ex: Vermelha"
        placeholderTextColor={placeholderTextColor}
      />

      <Text style={styles.label}>Ano Fabricação</Text>
      <TextInput
        style={styles.input}
        value={anoFabricacao}
        onChangeText={(text) => setAnoFabricacao(text.replace(/[^0-9]/g, ''))}
        keyboardType="numeric"
        maxLength={4}
        placeholder="Ex: 2023"
        placeholderTextColor={placeholderTextColor}
      />

      <Text style={styles.label}>Ano Modelo</Text>
      <TextInput
        style={styles.input}
        value={anoModelo}
        onChangeText={(text) => setAnoModelo(text.replace(/[^0-9]/g, ''))}
        keyboardType="numeric"
        maxLength={4}
        placeholder="Ex: 2024"
        placeholderTextColor={placeholderTextColor}
      />

      <Text style={styles.label}>Chassi</Text>
      <TextInput 
        style={styles.input} 
        value={chassi} 
        onChangeText={setChassi} 
        placeholder="Número do chassi"
        placeholderTextColor={placeholderTextColor}
        autoCapitalize="characters"
      />

      {/* Componente para captura da placa */}
      <View style={styles.placaRecognitionContainer}>
        <PlacaRecognition onPlacaRecognized={handlePlacaRecognized} />
      </View>

      <TouchableOpacity style={styles.button} onPress={salvarVeiculo}>
        <Text style={styles.buttonText}>Salvar Dados</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.secondaryButton]} onPress={irParaListagem}>
        <Text style={[styles.buttonText, styles.secondaryButtonText]}>Ir para Listagem</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: screenDarkBackground, // Fundo escuro
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: textColorLight, // Texto claro para labels
    marginBottom: 8,
    marginTop: 10,
  },
  input: {
    backgroundColor: inputBackgroundColor, // Fundo do input
    color: textColorLight, // Cor do texto digitado
    borderWidth: 1,
    borderColor: inputBorderColor, // Borda sutil
    paddingHorizontal: 15,
    paddingVertical: Platform.OS === 'ios' ? 15 : 10, // Ajuste de padding para iOS/Android
    marginBottom: 15,
    borderRadius: 8, // Bordas arredondadas
    fontSize: 16,
  },
  placaRecognitionContainer: {
    marginVertical: 20, // Espaçamento para o componente de OCR
    alignItems: 'center',
  },
  button: {
    backgroundColor: radarMotuGreen, // Cor verde para o botão primário
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20, // Espaçamento antes do botão
    marginBottom: 10,
  },
  buttonText: {
    color: buttonTextColor, // Texto claro para o botão
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButton: {
    backgroundColor: 'transparent', // Fundo transparente para botão secundário
    borderColor: radarMotuGreen, // Borda verde
    borderWidth: 2,
  },
  secondaryButtonText: {
    color: radarMotuGreen, // Texto verde para botão secundário
  },
});