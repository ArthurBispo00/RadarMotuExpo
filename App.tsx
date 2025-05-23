// App.tsx
import 'react-native-gesture-handler';
import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import {
    createDrawerNavigator,  
    DrawerContentScrollView,
    DrawerItemList,
    DrawerNavigationOptions 
} from '@react-navigation/drawer';

// Importação das telas
import Cadastro from './screens/Cadastro';
import Listagem from './screens/Listagem';
import HomeScreen from './screens/HomeScreen';
import MapaScreen from './screens/MapaScreen';
import SobreNosScreen from './screens/SobreNosScreen';

// Cores padrão da RadarMotu
const radarMotuGreen = '#22DD44';
const darkBackground = '#1A1D21';
const textColorLight = '#FFFFFF';
const inactiveColor = '#A0A0A0';
const metamindTextColor = '#B0B0B0';

// rotas para o Drawer
export type DrawerParamList = {
  Home: undefined;
  CadastrarVeiculo: undefined;
  ListarVeiculos: undefined;
  MapaDoPatio: undefined;
  Sobre: undefined;
};

const Drawer = createDrawerNavigator<DrawerParamList>();

// Componente para o cabeçalho customizado do Drawer
function CustomDrawerHeader() {
  return (
    <View style={styles.drawerHeader}>
      <Image source={require('./assets/radarmotu-logo.png')} style={styles.drawerLogo} />
      {/* <Text style={styles.drawerHeaderText}>Radar Motu</Text> */}
    </View>
  );
}

// Componente para customizar todo o conteúdo do Drawer
function CustomDrawerContent(props: any) {
  const currentYear = new Date().getFullYear(); // Pega o ano atual

  return (
    <View style={{flex: 1, backgroundColor: darkBackground}}>
        <DrawerContentScrollView {...props} contentContainerStyle={{paddingTop: 0}}>
            <CustomDrawerHeader />
            <DrawerItemList
                {...props}
                activeTintColor={radarMotuGreen}
                inactiveTintColor={inactiveColor}
                activeBackgroundColor={'rgba(34, 221, 68, 0.1)'}
                labelStyle={{ fontWeight: 'bold', fontSize: 15, marginLeft: -5 }}
                itemStyle={{marginVertical: 5}}
            />
        </DrawerContentScrollView>
        {/* Rodapé com logo Metamind e Direitos Reservados */}
        <View style={styles.drawerFooter}>
            <Image source={require('./assets/metamind-logo.png')} style={styles.drawerFooterLogo} />
            <Text style={styles.drawerFooterText}>
                METAMIND SOLUTION
            </Text>
            <Text style={styles.drawerFooterRightsText}>
                © {currentYear} Todos os direitos reservados.
            </Text>
        </View>
    </View>
  );
}

// Opções de tela padrão para todas as telas do Drawer
const globalScreenOptions: DrawerNavigationOptions = { 
    headerStyle: {
      backgroundColor: darkBackground,
    },
    headerTintColor: textColorLight,
    headerTitleStyle: {
      fontWeight: 'bold',
    },
    drawerStyle: {
      backgroundColor: darkBackground,
      width: 280, 
    },
  };

export default function App() {
  return (
    <NavigationContainer theme={{
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          background: darkBackground,
          card: darkBackground,
          text: textColorLight,
          primary: radarMotuGreen,
        },
      }}>
      <Drawer.Navigator
        initialRouteName="Home"
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={globalScreenOptions} 
      >
        <Drawer.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Início' }}
        />
        <Drawer.Screen
          name="CadastrarVeiculo"
          component={Cadastro}
          options={{ title: 'Cadastrar Veículo' }}
        />
        <Drawer.Screen
          name="ListarVeiculos"
          component={Listagem}
          options={{ title: 'Veículos Cadastrados' }}
        />
        <Drawer.Screen
          name="MapaDoPatio"
          component={MapaScreen}
          options={{ title: 'Mapa do Pátio' }}
        />
        <Drawer.Screen
          name="Sobre"
          component={SobreNosScreen}
          options={{ title: 'Sobre Nós' }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  drawerHeader: {
    backgroundColor: darkBackground,
    paddingVertical: 25, 
    paddingHorizontal: 20,
    alignItems: 'center',

  },
  drawerLogo: {
    width: 120, 
    height: 60, 
    resizeMode: 'contain',
  },

  drawerFooter: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#333333', 
    backgroundColor: darkBackground, 
  },
  drawerFooterLogo: {
    width: 100, 
    height: 30, 
    resizeMode: 'contain',
    marginBottom: 8,
  },
  drawerFooterText: {
    color: metamindTextColor,
    fontSize: 13,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  drawerFooterRightsText: {
    color: '#777',
    fontSize: 10,
    textAlign: 'center',
    marginTop: 4,
  }
});