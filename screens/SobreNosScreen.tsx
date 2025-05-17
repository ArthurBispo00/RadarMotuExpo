// /screens/SobreNosScreen.tsx
import React, { useLayoutEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { DrawerParamList } from '../App';

// Cores padrão da Aplicação
const screenDarkBackground = '#1A1D21';
const headerScreenColor = '#202328';
const textColorLight = '#FFFFFF';
const labelColor = '#A0A0A0'; 
const versionColor = '#777777';
const radarMotuGreen = '#22DD44'; 

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
              source={require('../assets/integrante1.png')} 
              style={styles.integranteImage} 
            />
            <Text style={styles.integranteNome}>[Arthur Bispo de Lima]</Text>
            <Text style={styles.integranteRM}>RM: [557568]</Text>
          </View>

          {/* Integrante 2 */}
          <View style={styles.integranteBox}>
            <Image 
              source={require('../assets/integrante2.png')} 
              style={styles.integranteImage} 
            />
            <Text style={styles.integranteNome}>[João Paulo Moreira dos Santos]</Text>
            <Text style={styles.integranteRM}>RM: [557808]</Text>
          </View>

          {/* Integrante 3 */}
          <View style={styles.integranteBox}>
            <Image 
              source={require('../assets/integrante3.png')} 
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
    padding: 25, 
    alignItems: 'center',
    justifyContent: 'center', 
  },
  mainTitle: {
    fontSize: 26, 
    fontWeight: 'bold',
    color: textColorLight,
    marginBottom: 25, 
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: radarMotuGreen,
    marginTop: 30,
    marginBottom: 20,
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 15,
    color: labelColor,
    lineHeight: 24, 
  },
  integrantesContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    width: '100%', 
    marginBottom: 30,
    flexWrap: 'wrap', 
  },
  integranteBox: {
    alignItems: 'center',
    marginBottom: 20, 
    marginHorizontal: 10, 
    minWidth: 100, 
  },
  integranteImage: {
    width: 100, 
    height: 100, 
    borderRadius: 50,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: radarMotuGreen, 
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