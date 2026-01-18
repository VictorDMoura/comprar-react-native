# Comprar

Aplicativo mobile simples para gerenciar itens de compra (lista de compras), desenvolvido em React Native com Expo. Este projeto foi construído com base nos conteúdos do curso de React Native da Rocketseat, adaptando e expandindo para o contexto de uma lista de compras com filtros e persistência local.

## Visão Geral

- Adiciona, lista e remove itens de compra.
- Filtra itens por status (por exemplo: pendente, comprado, etc.).
- Persiste dados localmente utilizando AsyncStorage.
- Componentização e estilização com abordagem organizada por pastas.

## Tecnologias

- React Native (Expo)
- TypeScript
- AsyncStorage (`@react-native-async-storage/async-storage`)
- Ícones com `lucide-react-native`

## Scripts

- `npm start`: inicia o Expo
- `npm run android`: inicia o app no Android (emulador/dispositivo)
- `npm run ios`: inicia o app no iOS (apenas macOS)
- `npm run web`: inicia a versão web (Expo)

## Requisitos

- Node.js 18+
- NPM ou Yarn
- Expo CLI (opcional, mas recomendado)
- Android Studio (emulador) ou dispositivo físico com USB debugging

## Instalação e Execução

```bash
# Instalar dependências
npm install

# Iniciar o projeto (Expo)
npm start

# Rodar no Android (com emulador/dispositivo)
npm run android

# Alternativamente, usando Expo CLI
e npx expo start
```

## Estrutura do Projeto

Alguns diretórios e arquivos relevantes:

```
app.json
index.ts
package.json
tsconfig.json
assets/
src/
  app/
    Home/
      index.tsx
      styles.ts
  assets/
  components/
    Button/
      index.tsx
      styles.ts
    Filter/
      index.tsx
      styles.ts
    Input/
      index.tsx
      styles.ts
    Item/
      index.tsx
      styles.ts
    StatusIcon/
      index.tsx
  storage/
    itemsStorage.ts
  types/
    FilterStatus.ts
```

- Tela principal: [src/app/Home/index.tsx](src/app/Home/index.tsx)
- Estilos da Home: [src/app/Home/styles.ts](src/app/Home/styles.ts)
- Componentes:
  - Botão: [src/components/Button/index.tsx](src/components/Button/index.tsx)
  - Filtro: [src/components/Filter/index.tsx](src/components/Filter/index.tsx)
  - Input: [src/components/Input/index.tsx](src/components/Input/index.tsx)
  - Item da lista: [src/components/Item/index.tsx](src/components/Item/index.tsx)
  - Ícone de Status: [src/components/StatusIcon/index.tsx](src/components/StatusIcon/index.tsx)
- Persistência: [src/storage/itemsStorage.ts](src/storage/itemsStorage.ts)
- Tipos de filtro: [src/types/FilterStatus.ts](src/types/FilterStatus.ts)

## Principais Funcionalidades

- **Cadastro de itens:** cria novos itens de compra a partir do componente de input.
- **Listagem:** exibe os itens em uma lista e permite marcar/remover.
- **Filtros:** aplica filtros de status para visualizar rapidamente o que falta comprar.
- **Persistência local:** salva e lê os itens com AsyncStorage.

## Desenvolvimento

- Projeto configurado com TypeScript e Expo (`app.json`).
- Entrada da aplicação em [index.ts](index.ts).
- Estilos organizados por arquivo em cada componente/tela (`styles.ts`).

## Créditos

Este projeto foi criado com base no curso de React Native da Rocketseat. Agradecimentos à comunidade e aos materiais didáticos que inspiraram a arquitetura e as práticas utilizadas aqui.

## Licença

Sem licença definida. Sinta-se livre para utilizar para fins de estudo. Se desejar adicionar uma licença, crie o arquivo `LICENSE` e atualize esta seção.
