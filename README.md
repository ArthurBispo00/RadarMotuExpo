# 🏍️ Radar Motu - Protótipo Expo 🛰️

Protótipo funcional de um aplicativo em React Native com Expo, desenvolvido para simular o mapeamento inteligente de pátios e a gestão de motocicletas. Este projeto visa demonstrar as capacidades de localização, cadastro e visualização de veículos em um ambiente de pátio.

---

## 📍 Funcionalidades Implementadas (Protótipo Atual)

* **Navegação Principal:** Menu lateral (Drawer) customizado com a identidade visual do Radar Motu, permitindo acesso a todas as seções do app.
* **Tela Inicial (`HomeScreen`):** Apresentação do app e botões de navegação rápida para as principais funcionalidades.
* **Cadastro de Veículos (`CadastroScreen`):**
    * Formulário completo para registrar dados de motocicletas (placa, marca, modelo, cor, ano, chassi).
    * Integração com o componente `PlacaRecognition` para captura de imagem.
    * Salvamento dos dados localmente usando AsyncStorage.
* **Reconhecimento de Placa (`PlacaRecognition`):**
    * Utiliza `expo-image-picker` para permitir que o usuário tire uma foto com a câmera ou escolha uma imagem da galeria.
    * Envia a imagem para uma API externa de OCR (Reconhecimento Óptico de Caracteres) para identificar a placa.
    * Exibe a imagem selecionada para preview.
* **Listagem de Veículos (`ListagemScreen`):**
    * Exibe os veículos cadastrados que foram salvos no AsyncStorage.
    * Atualiza automaticamente a lista ao retornar para a tela (usando `useFocusEffect`).
* **Mapa do Pátio (`MapaScreen`):**
    * Visualização básica de um mapa de pátio renderizado com `react-native-svg`.
    * Exibe zonas, boxes e marcadores de motos baseados em dados JSON pré-definidos.
    * Controles de Zoom (+ / -) por botões para interação básica com o mapa.
    * Controles de Direcionais por setas em botões para interação básica com o mapa.
* **Sobre Nós (`SobreNosScreen`):**
    * Informações sobre o projeto e a equipe de desenvolvimento.
    * Exibição de imagens dos integrantes em formato redondo.
* **Estilização Consistente:** Tema escuro ("Radar Motu Dark") aplicado em todas as telas, com destaque na cor verde característica da marca.

---

## 🛠️ Tecnologias Utilizadas

* **React Native com Expo (Managed Workflow):** Plataforma de desenvolvimento.
* **TypeScript:** Para tipagem estática e desenvolvimento mais robusto.
* **React Navigation (v6):** Para a navegação entre telas (especificamente `DrawerNavigator`).
* **`expo-image-picker`:** Para acesso à câmera e galeria de imagens do dispositivo.
* **`react-native-svg`:** Para renderização de gráficos vetoriais (mapa do pátio).
* **`@react-native-async-storage/async-storage`:** Para armazenamento local de dados (lista de veículos).
* **Fetch API:** Para comunicação com a API externa de OCR.

---

## 📂 Estrutura do Projeto (Simplificada)

RadarMotuExpo/
├── assets/                 # Imagens, logos, fontes, etc.
│   ├── integrante1.png     # Exemplo de imagem de integrante
│   ├── integrante2.png     # Exemplo de imagem de integrante
│   ├── integrante3.png     # Exemplo de imagem de integrante
│   ├── metamind-logo.png   # Logo usado no Drawer
│   ├── radarmotu-adaptive-foreground.png  # Logo adaptativa para expo
│   ├── radarmotu-icon.png  # Ícone principal do app (1024x1024) 
│   ├── radarmotu-logo.png  # Logo usado no Drawer
│   └── splash.png          # Tela de splash
├── screens/                # Componentes de tela
│   ├── Cadastro.tsx
│   ├── HomeScreen.tsx
│   ├── Listagem.tsx
│   ├── MapaScreen.tsx
│   ├── PlacaRecognition.tsx
│   └── SobreNosScreen.tsx
├── app.json                # Configuração do projeto Expo
├── App.tsx                
├── babel.config.js         # Configuração do Babel
├── package.json            # Dependências e scripts
├── README.md               # Explicação do Projeto
└── tsconfig.json           # Configuração do TypeScript


---

## 🚀 Como Rodar o Projeto

Siga os passos abaixo para configurar e executar o projeto em seu ambiente de desenvolvimento.

### Pré-requisitos

* **Node.js:** Versão LTS recomendada (ex: 18.x ou 20.x). [Baixe aqui](https://nodejs.org/)
* **NPM** (geralmente vem com o Node.js) ou **Yarn**.
* **Expo Go App:** Aplicativo para celular (Android/iOS) para rodar o projeto. [Baixe na sua loja de apps](https://expo.dev/go)
    * OU um Emulador Android / Simulador iOS configurado.

### Instalação e Execução

1.  **Clone o Repositório:**
    ```bash
    git clone [https://github.com/SEU_USUARIO/NOME_DO_SEU_REPOSITORIO.git](https://github.com/SEU_USUARIO/NOME_DO_SEU_REPOSITORIO.git)
    cd NOME_DO_SEU_REPOSITORIO 
    ```
    *(Substitua pela URL do seu repositório)*

2.  **Instale as Dependências:**
    ```bash
    npm install
    ```
    ou
    ```bash
    yarn install
    ```

3.  **URL da API de OCR:**
    * Para este protótipo, a URL da API de Reconhecimento Óptico de Caracteres (OCR), utilizada para identificar placas de veículos, está configurada diretamente no código do componente `PlacaRecognition.tsx`:
      `http://191.234.177.200:3000/upload`
    * Certifique-se de que seu dispositivo de teste tenha acesso a este endereço IP e porta para que a funcionalidade de escaneamento de placa funcione. Nenhuma configuração de arquivo `.env` é necessária para esta URL específica no protótipo atual.

4.  **Execute o Projeto com Expo:**
    ```bash
    npx expo start
    ```
    Isso abrirá o Metro Bundler no seu navegador e exibirá um QR Code.

5.  **Abra no seu Celular:**
    * Abra o aplicativo **Expo Go** no seu celular (Android ou iOS).
    * Escaneie o QR Code exibido no terminal ou na página do Metro Bundler.

    Alternativamente, você pode usar os atalhos no terminal do Metro Bundler para tentar abrir em um emulador/simulador conectado (ex: pressione `a` para Android, `i` para iOS).

---

## 🔮 Funcionalidades Futuras Planejadas

O protótipo atual estabelece uma base sólida. As seguintes funcionalidades são planejadas para evoluções futuras do sistema Radar Motu:

* **Mapa Interativo Avançado:**
    * Zoom e Pan por gestos de pinça e arrastar.
    * Desenho e edição de zonas, boxes e caminhos diretamente no app mobile.
    * Carregamento dinâmico de dados do mapa a partir de um backend.
* **Integração BLE:**
    * Detecção real de tags BLE próximas para localização precisa.
    * Associação automática de tags BLE a veículos.
* **Localização GPS/GSM:**
    * Integração com rastreadores para localização externa.
* **Autenticação de Usuário:**
    * Login e perfis de usuário.
* **Backend Completo e Banco de Dados:**
    * API robusta para gerenciar todos os dados.
* **Sincronização em Tempo Real:**
    * Atualização da localização das motos no mapa em tempo real.
* **Consultas a APIs Externas (FIPE/Detran).**
* **Testes Unitários e de Integração.**
* **Melhorias de UI/UX.**

---

## 👥 Integrantes

* 