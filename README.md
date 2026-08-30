# Piedra, Papel o Tijeras 🪨📄✂️

App móvil desarrollada en React Native con Expo para jugar Piedra, Papel o Tijeras contra la computadora. Proyecto realizado para la materia **Desarrollo de interfaces de usuario** del Tecnológico de Monterrey.

## Descripción

El juego permite al usuario elegir entre piedra, papel o tijeras. La computadora genera su jugada de forma aleatoria, se compara contra la del jugador, y se muestra el resultado en un cuadro de diálogo. El marcador acumula los puntos de cada jugador a lo largo de la partida.

## Arquitectura

El proyecto sigue el patrón de diseño **MVC (Model-View-Controller)**:

- **Model** (`models/`): contiene la lógica del juego, separada en:
  - `valueobjects/`: objetos de datos simples (`PlayerChoiceVO`, `ScoreVO`, `MatchVO`)
  - `managers/`: lógica de negocio (`RandomManager` genera la jugada de la computadora, `MatchManager` calcula el ganador y actualiza el marcador)
- **View** (`screens/GameScreen.js`): la interfaz visual — botones, marcador y cuadro de diálogo, construida con `react-native-paper`
- **Controller**: la función `handlePlay` dentro de `GameScreen.js` conecta la vista con el modelo — recibe la acción del usuario, le pide al modelo que la procese, y actualiza la vista con el resultado

Model y View nunca se comunican directamente entre sí; todo pasa por el Controller.

## Pruebas

El proyecto sigue **TDD (Test-Driven Development)**. Las pruebas cubren:

- `RandomManager`: verifica que solo genere valores válidos (piedra, papel o tijeras)
- `MatchManager`: verifica los 9 escenarios posibles del juego (todas las combinaciones de jugadas)

Para correr las pruebas:

\`\`\`bash
npx jest
\`\`\`

## Cómo correr el proyecto

\`\`\`bash
npm install
npx expo start --tunnel
\`\`\`

Escanea el código QR con la app **Expo Go** desde tu celular para ver la app en tiempo real.

## Tecnologías

- React Native
- Expo
- react-native-paper
- Jest
