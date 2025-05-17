// /screens/SobreNosScreen.tsx
import React, { useLayoutEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native'; // Adicionado Image e ScrollView
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { DrawerParamList } from '../App'; // Certifique-se que está exportado

// Cores do tema
const screenDarkBackground = '#1A1D21';
const headerScreenColor = '#202328';
const textColorLight = '#FFFFFF';
const labelColor = '#A0A0A0'; // Ou radarMotuGreen para mais destaque
const versionColor = '#777777';
const radarMotuGreen = '#22DD44'; // Para destaque nos nomes, opcional

type SobreNosScreenNavigationProp = DrawerNavigationProp<DrawerParamList, 'Sobre'>;

export default function SobreNosScreen() {
  const navigation = useNavigation<SobreNosScreenNavigationProp>();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: headerScreenColor,
      },
      headerTintColor: textColorLight,
    });
  }, [navigation]);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.mainTitle}>Sobre o Radar Motu</Text>
        <Text style={styles.text}>
          Este aplicativo é um protótipo funcional para o mapeamento inteligente de pátios e gestão de motocicletas,
          visando otimizar o controle e a localização da sua frota.
        </Text>
        <Text style={styles.text}>
          Desenvolvido como parte do projeto de Desenvolvimento de Aplicações Móveis.
        </Text>

        <Text style={styles.sectionTitle}>Equipe de Desenvolvimento</Text>
        
        <View style={styles.integrantesContainer}>
          {/* Integrante 1 */}
          <View style={styles.integranteBox}>
            <Image 
              source={require('../assets/integrante1.png')} // ATUALIZE COM O NOME DA SUA IMAGEM
              style={styles.integranteImage} 
            />
            <Text style={styles.integranteNome}>[Arthur Bispo de Lima]</Text>
            <Text style={styles.integranteRM}>RM: [557568]</Text>
          </View>

          {/* Integrante 2 - Descomente e atualize se houver */}
          <View style={styles.integranteBox}>
            <Image 
              source={require('../assets/integrante2.png')} // ATUALIZE COM O NOME DA SUA IMAGEM
              style={styles.integranteImage} 
            />
            <Text style={styles.integranteNome}>[João Paulo Moreira dos Santos]</Text>
            <Text style={styles.integranteRM}>RM: [557808]</Text>
          </View>

          {/* Integrante 3 - Descomente e atualize se houver */}
          <View style={styles.integranteBox}>
            <Image 
              source={require('../assets/integrante3.png')} // ATUALIZE COM O NOME DA SUA IMAGEM
              style={styles.integranteImage} 
            />
            <Text style={styles.integranteNome}>[Paulo André Carminati]</Text>
            <Text style={styles.integranteRM}>RM: [557881]</Text>
          </View>
        </View>
        
        <Text style={styles.version}>Versão do App: 1.0.0 (Sprint 1)</Text>
        <Text style={styles.date}>Data da Versão: {new Date().toLocaleDateString('pt-BR')}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: screenDarkBackground,
  },
  container: {
    flex: 1,
    padding: 25, // Aumentei o padding geral
    alignItems: 'center',
    justifyContent: 'center', // Centraliza o conteúdo se for menor que a tela
  },
  mainTitle: {
    fontSize: 26, // Aumentei
    fontWeight: 'bold',
    color: textColorLight,
    marginBottom: 25, // Aumentei
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 20, // Novo título de seção
    fontWeight: 'bold',
    color: radarMotuGreen, // Destaque com o verde
    marginTop: 30,
    marginBottom: 20,
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 15, // Aumentei
    color: labelColor, // Usando labelColor para texto descritivo
    lineHeight: 24, // Melhor legibilidade
  },
  integrantesContainer: {
    flexDirection: 'row', // Imagens lado a lado
    justifyContent: 'space-around', // Espaça igualmente
    width: '100%', // Ocupa toda a largura
    marginBottom: 30,
    flexWrap: 'wrap', // Permite quebrar a linha se não couber
  },
  integranteBox: {
    alignItems: 'center',
    marginBottom: 20, // Espaço se quebrar a linha
    marginHorizontal: 10, // Espaço entre os boxes
    minWidth: 100, // Largura mínima para cada integrante
  },
  integranteImage: {
    width: 100, // Tamanho da imagem
    height: 100, // Tamanho da imagem
    borderRadius: 50, // Metade da largura/altura para ser redonda
    marginBottom: 10,
    borderWidth: 2,
    borderColor: radarMotuGreen, // Borda verde na foto
  },
  integranteNome: {
    fontSize: 15,
    fontWeight: 'bold',
    color: textColorLight,
    textAlign: 'center',
  },
  integranteRM: {
    fontSize: 13,
    color: labelColor,
    textAlign: 'center',
  },
  version: {
    fontSize: 14,
    color: versionColor,
    marginTop: 30,
    textAlign: 'center',
  },
  date: {
    fontSize: 12,
    color: versionColor,
    marginTop: 5,
    textAlign: 'center',
  }
});