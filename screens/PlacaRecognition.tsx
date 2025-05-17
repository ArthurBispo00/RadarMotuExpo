// /screens/PlacaRecognition.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator // Adicionado para feedback de loading
} from 'react-native';
import * as ImagePicker from 'expo-image-picker'; // Import do Expo Image Picker

// Cores do tema (para consistência, idealmente viriam de um arquivo central)
const radarMotuGreen = '#22DD44';
const textColorLight = '#FFFFFF';
const screenDarkBackground = '#1A1D21'; // Ou a cor de fundo da tela onde ele será usado
const labelColor = '#A0A0A0';
const inputBorderColor = '#4F545C';

interface PlacaRecognitionProps {
  onPlacaRecognized: (placa: string) => void;
}

export default function PlacaRecognition({ onPlacaRecognized }: PlacaRecognitionProps) {
  const [imagemPlaca, setImagemPlaca] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false); // Para o loading da API
  const [isPickingImage, setIsPickingImage] = useState<boolean>(false); // Para o loading do image picker

  // TODO: Mover para .env no futuro
  const apiUrl = 'http://191.234.177.200:3000/upload'; 

  const selectImage = async (useCamera: boolean) => {
    setIsPickingImage(true);
    let result;
    const options: ImagePicker.ImagePickerOptions = {
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false, // Pode mudar para true se quiser edição básica
      // aspect: [4, 3], // Opcional: força uma proporção
      quality: 0.7,   // Qualidade da imagem de 0 a 1
    };

    try {
      if (useCamera) {
        const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
        if (cameraPermission.status !== 'granted') {
          Alert.alert('Permissão Necessária', 'Acesso à câmera é necessário para tirar fotos.');
          setIsPickingImage(false);
          return;
        }
        result = await ImagePicker.launchCameraAsync(options);
      } else {
        const mediaLibraryPermission = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (mediaLibraryPermission.status !== 'granted') {
          Alert.alert('Permissão Necessária', 'Acesso à galeria é necessário para escolher fotos.');
          setIsPickingImage(false);
          return;
        }
        result = await ImagePicker.launchImageLibraryAsync(options);
      }

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const asset = result.assets[0];
        setImagemPlaca(asset.uri);
        // O nome do arquivo pode não ser robusto ou sempre disponível
        const fileName = asset.fileName || asset.uri.split('/').pop() || `image_${Date.now()}.jpg`;
        recognizeTextFromImage(asset.uri, fileName);
      }
    } catch (error) {
      console.error("Erro ao selecionar imagem:", error);
      Alert.alert("Erro", "Não foi possível selecionar a imagem.");
    } finally {
      setIsPickingImage(false);
    }
  };

  const handleChooseImageSource = () => {
    Alert.alert(
      "Escanear Placa",
      "Escolha a origem da imagem:",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Tirar Foto...", onPress: () => selectImage(true) },
        { text: "Escolher da Galeria...", onPress: () => selectImage(false) }
      ]
    );
  };

  const recognizeTextFromImage = async (imageUri: string, fileName: string) => {
    setIsLoading(true); // Loading para a chamada da API
    const formData = new FormData();
    // O tipo pode precisar ser inferido ou definido explicitamente se 'asset.type' não estiver disponível
    // Para expo-image-picker, a URI já aponta para um arquivo local cacheado.
    let fileType = fileName.includes('.') ? `image/${fileName.split('.').pop()}` : 'image/jpeg';
    if (fileType === 'image/jpg') fileType = 'image/jpeg';


    formData.append('image', {
      uri: imageUri,
      name: fileName,
      type: fileType,
    } as any);

    try {
      const apiResponse = await fetch(apiUrl, {
        method: 'POST',
        body: formData,
        // FormData define o Content-Type, mas se houver problemas, pode tentar adicionar:
        // headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (!apiResponse.ok) {
        let errorMsg = `Erro do servidor: ${apiResponse.status}`;
        try {
          const errorData = await apiResponse.json();
          errorMsg = errorData.error || errorData.message || errorMsg; // Ajustado para 'message'
        } catch (e) {
          const textError = await apiResponse.text();
          errorMsg = textError || errorMsg;
        }
        throw new Error(errorMsg);
      }

      const responseData = await apiResponse.json();
      if (responseData.placa) {
        onPlacaRecognized(responseData.placa);
      } else {
        // Ajustado para 'message' vindo do seu exemplo de Cadastro.tsx
        onPlacaRecognized(responseData.message || responseData.mensagem || 'Placa não reconhecida pelo servidor');
      }
    } catch (error: any) {
      console.error('Erro na API de OCR:', error);
      Alert.alert('Erro de OCR', error.message || 'Não foi possível processar a imagem da placa.');
      onPlacaRecognized('Erro ao processar imagem'); // Feedback para a tela de Cadastro
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        onPress={handleChooseImageSource} 
        style={styles.styledButton}
        disabled={isPickingImage || isLoading} // Desabilita o botão durante o carregamento
      >
        {isPickingImage ? (
          <ActivityIndicator color={textColorLight} />
        ) : (
          <Text style={styles.buttonText}>Escanear Placa</Text>
        )}
      </TouchableOpacity>

      {isLoading && ( // Feedback de loading da API de OCR
        <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color={radarMotuGreen} />
            <Text style={styles.loadingText}>Reconhecendo Placa...</Text>
        </View>
      )}

      {imagemPlaca && !isLoading && ( // Mostra a imagem apenas se não estiver em loading da API
        <View style={styles.imagePreviewContainer}>
          <Text style={styles.previewLabel}>Imagem da Placa:</Text>
          <Image source={{ uri: imagemPlaca }} style={styles.image} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
    paddingVertical: 10, // Adicionado padding vertical
    // backgroundColor: screenDarkBackground, // Removido para herdar da tela pai (Cadastro.tsx)
  },
  styledButton: {
    backgroundColor: radarMotuGreen, // Cor RadarMotu
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    minWidth: '70%', // Ajuste conforme necessário
    alignItems: 'center',
    justifyContent: 'center', // Para o ActivityIndicator
    height: 48, // Altura fixa para o botão
  },
  buttonText: {
    color: textColorLight, // Cor do texto do botão
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  loadingOverlay: { // Para cobrir a tela durante o loading da API
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10, // Para ficar por cima
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: textColorLight, // Cor do texto de loading
  },
  imagePreviewContainer: {
    alignItems: 'center',
    marginTop: 20, // Aumentei a margem
    marginBottom: 10,
  },
  previewLabel: {
    fontSize: 14,
    color: labelColor, // Cor do label
    marginBottom: 8,
  },
  image: {
    width: 280, // Ajuste conforme necessário
    height: 180, // Ajuste
    resizeMode: 'contain',
    borderWidth: 1,
    borderColor: inputBorderColor, // Cor da borda da imagem
    borderRadius: 8,
  },
});