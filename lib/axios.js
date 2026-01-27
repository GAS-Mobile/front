import axios from 'axios';
import { Platform } from 'react-native';

// Para Genymotion use o IP da sua máquina na rede local
// Para Android Studio Emulator use 10.0.2.2
// Para dispositivo físico use o IP da sua máquina na rede (ex: 192.168.x.x)
const getBaseURL = () => {
  if (__DEV__) {
    // Durante desenvolvimento
    if (Platform.OS === 'android') {
      return 'http://10.0.0.160:8000/api/v1/'; // IP da rede local (Genymotion)
      // return 'http://10.0.2.2:8000/api/v1/'; // Android Studio Emulator
    }
    return 'http://localhost:8000/api/v1/'; // iOS Simulator / Web
  }
  // Em produção, use a URL do seu servidor
  return 'https://sua-api-producao.com/api/v1/';
};

export const api = axios.create({
  baseURL: getBaseURL()
});
