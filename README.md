# GAS Mobile - Frontend

Aplicação mobile desenvolvida em React Native para gestão e análise de postos de combustível, permitindo que consumidores consultem empresas, visualizem análises e solicitem novas análises.

## 🚀 Tecnologias

- **React Native** 0.81.5
- **Expo SDK** 54.0.32
- **Expo Router** 6.0.22 (navegação file-based)
- **React Native Paper** 5.14.5 (UI components)
- **Axios** 1.7.9 (requisições HTTP)
- **Lottie React Native** 7.1.0 (animações)

## 📁 Estrutura do Projeto

```
front_new/
├── app/                      # Rotas da aplicação (expo-router)
│   ├── _layout.js           # Layout raiz com AuthContext
│   ├── index.js             # Redirecionamento inicial
│   ├── (auth)/              # Rotas de autenticação
│   │   ├── signin.js        # Tela de login
│   │   └── signup.js        # Tela de cadastro
│   ├── home/                # Tela principal (protegida)
│   │   └── index.js         # Listagem de empresas com busca e filtros
│   ├── company/             # Detalhes da empresa
│   │   └── [id].js          # Perfil completo da empresa
│   ├── requests/            # Solicitações de análise
│   │   ├── index.js         # Lista de solicitações do usuário
│   │   ├── [id].js          # Detalhes da solicitação
│   │   └── [id]/
│   │       └── edit.js      # Edição do motivo da solicitação
│   └── analysis-request.js  # Criar nova solicitação de análise
├── components/              # Componentes reutilizáveis
│   ├── authInputs.js       # Inputs de autenticação
│   ├── companyCard.js      # Card de empresa na listagem
│   ├── drawerContent.js    # Conteúdo do menu lateral
│   ├── header.js           # Header com menu e título
│   └── loading.js          # Indicador de carregamento
├── contexts/
│   └── AuthContext.js      # Gerenciamento de autenticação
├── hooks/
│   └── useAuth.js          # Hook customizado de autenticação
├── lib/
│   └── axios.js            # Configuração do axios
├── styles/                 # Estilos organizados por tela
├── utils/
│   ├── formatters.js       # Funções de formatação (CNPJ, data)
│   └── validators.js       # Validações de formulário
└── assets/
    └── loading.json        # Animação Lottie de loading
```

## 🎨 Design System

### Cores Principais
- **Primary Green**: `#189A46` - Cor principal da marca
- **Background**: `#f5f5f5` - Fundo padrão das telas
- **Card Background**: `#fff` - Fundo de cards e containers
- **Text Primary**: `#333` - Texto principal
- **Text Secondary**: `#666` - Texto secundário

### Componentes UI
- **Material Design**: Baseado no React Native Paper
- **Cards**: Elevação 2-3, bordas arredondadas (8-12px)
- **Botões**: Altura 48px, texto centralizado
- **Status Chips**: Cores dinâmicas por status (verde/amarelo/vermelho/cinza)

## 🔐 Autenticação

O sistema utiliza JWT (JSON Web Tokens) para autenticação:

1. **Login/Cadastro**: Usuário fornece credenciais
2. **Tokens**: Backend retorna accessToken e refreshToken
3. **Armazenamento**: Tokens salvos no AsyncStorage
4. **Interceptor**: Axios automaticamente adiciona token nas requisições
5. **Refresh**: Token expirado aciona renovação automática
6. **Proteção de Rotas**: AuthContext controla acesso às telas

## 📱 Funcionalidades Implementadas

### Autenticação
- ✅ Cadastro de novo usuário (consumidor)
- ✅ Login com email/senha
- ✅ Logout com remoção de tokens
- ✅ Refresh automático de tokens

### Empresas
- ✅ Listagem paginada de empresas
- ✅ Busca por nome/CNPJ
- ✅ Filtros (melhores/piores avaliadas)
- ✅ Detalhes completos da empresa
- ✅ Visualização de análises

### Solicitações de Análise
- ✅ Criar nova solicitação
- ✅ Listar solicitações do usuário
- ✅ Visualizar detalhes da solicitação
- ✅ Editar motivo (apenas status "Pendente" e "Em análise")
- ✅ Excluir solicitação (apenas status "Pendente" e "Em análise")
- ✅ Status dinâmicos com cores (Pendente/Em análise/Aprovado/Rejeitado)

### UX Features
- ✅ Loading states em todas as operações assíncronas
- ✅ Mensagens de erro amigáveis
- ✅ Confirmações para ações destrutivas
- ✅ Auto-reload após edições
- ✅ Infinite scroll na listagem de empresas
- ✅ Pull-to-refresh nas listas

## 🔧 Configuração e Execução

### Pré-requisitos
- Node.js 18+ e npm
- Expo CLI instalado globalmente
- Backend da API rodando (porta 8000)

### Instalação

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm start

# Ou diretamente
npx expo start
```

### Variáveis de Ambiente

Configurar a URL base da API em `lib/axios.js`:

```javascript
baseURL: 'http://10.0.0.160:8000/api/v1'
```

**Importante**: Ajustar o IP conforme sua rede local.

### Executar em Dispositivo

```bash
# Android
npx expo start --android

# iOS
npx expo start --ios

# Web (experimental)
npx expo start --web
```

### Build de Produção

```bash
# Build Android (APK)
eas build --platform android --profile preview

# Build iOS
eas build --platform ios --profile preview
```

## 🧪 Estrutura de Navegação

```
app/
├── _layout.js (Root Layout)
│   ├── index.js → Redirect
│   ├── (auth)/
│   │   ├── signin.js
│   │   └── signup.js
│   └── (protected - requer autenticação)
│       ├── home/index.js
│       ├── company/[id].js
│       ├── requests/
│       │   ├── index.js
│       │   ├── [id].js
│       │   └── [id]/edit.js
│       └── analysis-request.js
```

## 📊 Gerenciamento de Estado

- **AuthContext**: Estado global de autenticação
- **useState**: Estado local de componentes
- **useFocusEffect**: Reload automático ao focar tela
- **AsyncStorage**: Persistência de tokens

## 🔄 Integração com API

### Endpoints Utilizados

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | `/auth/signup` | Cadastro de usuário |
| POST | `/auth/signin` | Login |
| POST | `/auth/refresh-token` | Renovar token |
| POST | `/auth/signout` | Logout |
| GET | `/companies` | Listar empresas |
| GET | `/companies/:id` | Detalhes da empresa |
| GET | `/requests` | Solicitações do usuário |
| GET | `/requests/:id` | Detalhes da solicitação |
| POST | `/requests` | Criar solicitação |
| PUT | `/requests/:id` | Editar motivo |
| DELETE | `/requests/:id` | Excluir solicitação |

## 🎯 Decisões Técnicas

### Expo Router
Escolhido pela navegação file-based moderna, reduzindo boilerplate e facilitando manutenção da estrutura de rotas.

### React Native Paper
UI library consistente com Material Design, acelerando desenvolvimento com componentes prontos e acessíveis.

### Context API
Gerenciamento de autenticação simples e eficaz sem necessidade de bibliotecas externas como Redux.

### Formatação e Validação
Utilitários centralizados para garantir consistência na exibição de dados (CNPJ, datas) e validação de inputs.

### Auto-reload com useFocusEffect
Garante que dados sempre estejam atualizados após navegação, melhorando experiência do usuário.

## 🚧 Possíveis Melhorias

- [ ] Modo offline com cache local
- [ ] Notificações push para status de solicitações
- [ ] Tema escuro (dark mode)
- [ ] Testes unitários e E2E
- [ ] Otimização de imagens
- [ ] Internacionalização (i18n)
- [ ] Feedback háptico em ações
- [ ] Analytics e tracking de eventos

## 📝 Convenções de Código

- **Componentes**: PascalCase (ex: `CompanyCard.js`)
- **Utilitários**: camelCase (ex: `formatters.js`)
- **Estilos**: arquivos separados por tela com sufixo `Styles.js`
- **Constantes**: UPPER_SNAKE_CASE
- **Indentação**: 2 espaços
- **Aspas**: Simples para strings

## 📄 Licença

Este projeto é licenciado sob a licença MIT - veja o arquivo LICENSE.md para detalhes.

---

**Desenvolvido como projeto técnico para demonstração de habilidades em React Native e integração com APIs RESTful.**
