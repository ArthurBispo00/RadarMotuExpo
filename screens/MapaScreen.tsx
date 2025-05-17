// /screens/MapaScreen.tsx
import React, { useState, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { DrawerParamList } from '../App'; // Certifique-se que está exportado
import Svg, { Rect, G, Circle, Text as SvgText, Path } from 'react-native-svg';

// Cores do tema
const screenDarkBackground = '#1A1D21';
const headerScreenColor = '#202328';
const textColorLight = '#FFFFFF';
const radarMotuGreen = '#22DD44';
const itemBackgroundColor = '#2C2F33';
const itemBorderColor = '#4F545C';
const motoIconColor = '#FF6347';

const initialMapData = {
  patio: { width: 800, height: 600, backgroundColor: itemBackgroundColor },
  zonas: [
    { id: 'Z1', x: 50, y: 50, width: 300, height: 200, nome: 'Zona A', cor: 'rgba(34, 221, 68, 0.2)' },
    { id: 'Z2', x: 400, y: 80, width: 250, height: 300, nome: 'Zona B', cor: 'rgba(0, 100, 255, 0.2)' },
    { id: 'Z3', x: 50, y: 300, width: 300, height: 250, nome: 'Zona C Recebimento', cor: 'rgba(255, 165, 0, 0.2)' },
  ],
  boxes: [
    { id: 'B1', zonaId: 'Z1', x: 70, y: 70, width: 80, height: 50, nome: 'Box A1' },
    { id: 'B2', zonaId: 'Z1', x: 170, y: 70, width: 80, height: 50, nome: 'Box A2' },
    { id: 'B3', zonaId: 'Z2', x: 420, y: 100, width: 60, height: 120, nome: 'Box B1' },
    { id: 'B4', zonaId: 'Z3', x: 70, y: 320, width: 100, height: 70, nome: 'Box C1 Carga' },
  ],
  motos: [
    { id: 'MOTO001', placa: 'ABC1D23', x: 95, y: 95, nome: 'MOTO001' },
    { id: 'MOTO002', placa: 'XYZ7F89', x: 450, y: 160, nome: 'MOTO002' },
  ],
};

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const HEADER_ESTIMATED_HEIGHT = 60;
const TITLE_ESTIMATED_HEIGHT = 50;
// Ajustar a altura dos controles com base em 2 linhas de botões + botão de reset
const CONTROLS_ROW_HEIGHT = 60; // Altura estimada para uma linha de botões + margens
const CONTROLS_ESTIMATED_HEIGHT = CONTROLS_ROW_HEIGHT * 2 + 30; // 2 linhas + espaço para reset
const SVG_CONTAINER_HEIGHT = Dimensions.get('window').height - HEADER_ESTIMATED_HEIGHT - TITLE_ESTIMATED_HEIGHT - CONTROLS_ESTIMATED_HEIGHT - 20; // Padding extra

type MapaScreenNavigationProp = DrawerNavigationProp<DrawerParamList, 'MapaDoPatio'>;

export default function MapaScreen() {
  const navigation = useNavigation<MapaScreenNavigationProp>();
  const [mapData] = useState(initialMapData);
  
  const [scale, setScale] = useState(0.5);
  const [translateX, setTranslateX] = useState(SCREEN_WIDTH / 4); 
  const [translateY, setTranslateY] = useState(SVG_CONTAINER_HEIGHT / 4);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: { backgroundColor: headerScreenColor },
      headerTintColor: textColorLight,
    });
  }, [navigation]);

  const handleZoomIn = () => setScale(prev => Math.min(prev * 1.2, 3));
  const handleZoomOut = () => setScale(prev => Math.max(prev / 1.2, 0.2));
  
  const panAmount = 30; 
  const handlePan = (dx: number, dy: number) => {
    setTranslateX(prev => prev + dx / scale); 
    setTranslateY(prev => prev + dy / scale);
  };

  const MotoIcon = ({ x, y, size = 15, color = motoIconColor }: { x: number, y: number, size?: number, color?: string }) => (
    <G x={x - size / 2} y={y - size / 2}>
      <Circle cx={size / 2} cy={size / 2} r={size / 2} fill={color} />
      <Path
        d={`M${size*0.25},${size*0.75} L${size*0.5},${size*0.25} L${size*0.75},${size*0.75} Z`}
        fill={textColorLight}
      />
    </G>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Mapa do Pátio (Zoom e Pan)</Text>

        <View style={styles.mapContainer}>
          <Svg height="100%" width="100%" >
            <G transform={`scale(${scale}) translate(${-translateX}, ${-translateY})`}>
              <Rect
                x="0" y="0" width={mapData.patio.width} height={mapData.patio.height}
                fill={mapData.patio.backgroundColor}
              />
              {mapData.zonas.map(zona => (
                <G key={zona.id}>
                  <Rect
                    x={zona.x} y={zona.y} width={zona.width} height={zona.height}
                    fill={zona.cor} stroke={radarMotuGreen} strokeWidth={2 / scale}
                  />
                  <SvgText
                    x={zona.x + 10 / scale} y={zona.y + 20 / scale}
                    fill={textColorLight} fontSize={18 / scale} fontWeight="bold">
                    {zona.nome}
                  </SvgText>
                </G>
              ))}
              {mapData.boxes.map(box => (
                <G key={box.id}>
                  <Rect
                    x={box.x} y={box.y} width={box.width} height={box.height}
                    fill="rgba(100, 100, 100, 0.3)" stroke={itemBorderColor} strokeWidth={1 / scale}
                  />
                  <SvgText
                    x={box.x + box.width / 2} y={box.y + box.height / 2}
                    fill={textColorLight} fontSize={12 / scale} textAnchor="middle" alignmentBaseline="central">
                    {box.nome}
                  </SvgText>
                </G>
              ))}
              {mapData.motos.map(moto => (
                <MotoIcon key={moto.id} x={moto.x} y={moto.y} size={20 / scale} />
              ))}
            </G>
          </Svg>
        </View>

        {/* Controles com layout ajustado */}
        <View style={styles.controlsOuterContainer}>
          <View style={styles.controlsRow}>
            <TouchableOpacity style={styles.controlButton} onPress={handleZoomIn}><Text style={styles.controlText}>Zoom +</Text></TouchableOpacity>
            <TouchableOpacity style={styles.controlButton} onPress={handleZoomOut}><Text style={styles.controlText}>Zoom -</Text></TouchableOpacity>
          </View>
          <View style={styles.controlsRow}>
            <TouchableOpacity style={styles.controlButton} onPress={() => handlePan(panAmount, 0)}><Text style={styles.controlText}> ← </Text></TouchableOpacity>
            <TouchableOpacity style={styles.controlButton} onPress={() => handlePan(0, panAmount)}><Text style={styles.controlText}> ↑ </Text></TouchableOpacity>
            <TouchableOpacity style={styles.controlButton} onPress={() => handlePan(0, -panAmount)}><Text style={styles.controlText}> ↓ </Text></TouchableOpacity>
            <TouchableOpacity style={styles.controlButton} onPress={() => handlePan(-panAmount, 0)}><Text style={styles.controlText}> → </Text></TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: screenDarkBackground,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 5,
    paddingTop: 10,
    paddingBottom: 10, // Reduzido, pois o controlsOuterContainer terá sua própria margem
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: textColorLight,
    marginBottom: 10,
    textAlign: 'center',
  },
  mapContainer: {
    width: '100%',
    height: SVG_CONTAINER_HEIGHT,
    backgroundColor: '#000000',
    borderWidth: 1,
    borderColor: itemBorderColor,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 10,
  },
  // Novo container para todas as linhas de controles
  controlsOuterContainer: {
    width: '90%', // Controla a largura total da área de botões
    alignItems: 'center', // Centraliza as linhas de botões
    marginTop: 5,
  },
  controlsRow: {
    flexDirection: 'row',
    justifyContent: 'center', // Ou 'center' se preferir
    alignItems: 'center',
    width: '100%', // Linha ocupa toda a largura do controlsOuterContainer
    marginBottom: 8, // Espaço entre as linhas de botões
  },
  controlButton: {
    backgroundColor: radarMotuGreen,
    paddingVertical: 10,
    paddingHorizontal: 10, // Ajustado para caber melhor os textos/setas
    minWidth: 55, // Largura mínima para botões de seta/zoom
    height: 45, // Altura fixa para alinhar
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    marginHorizontal: 3, // Espaço horizontal entre botões na mesma linha
  },
  controlButtonWide: { // Para o botão de Resetar
    backgroundColor: itemBorderColor,
    paddingHorizontal: 20, // Mais padding para o texto maior
    // minWidth não é necessário se ele for o único na linha ou se ajusta bem
  },
  controlText: {
    color: textColorLight,
    fontSize: 16,
    fontWeight: 'bold',
  }
});