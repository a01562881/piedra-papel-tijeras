import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, Dialog, Portal, Provider as PaperProvider } from 'react-native-paper';

import PlayerChoiceVO from '../models/valueobjects/PlayerChoiceVO';
import ScoreVO from '../models/valueobjects/ScoreVO';
import RandomManager from '../models/managers/RandomManager';
import MatchManager from '../models/managers/MatchManager';

const randomManager = new RandomManager();
const matchManager = new MatchManager();

const OPTIONS = [
  { value: 'piedra', icon: '✊' },
  { value: 'papel', icon: '✋' },
  { value: 'tijeras', icon: '✌️' },
];

export default function GameScreen() {
  const [score, setScore] = useState(new ScoreVO(0, 0));
  const [lastMatch, setLastMatch] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [dialogVisible, setDialogVisible] = useState(false);

  // Este es el "controller": recibe la acción de la vista,
  // le pide al modelo que procese, y actualiza el estado para la vista.
  const handlePlay = (choiceValue) => {
    const playerChoiceVO = new PlayerChoiceVO(choiceValue, 'jugador');
    const computerChoiceValue = randomManager.generateRandomChoice();
    const computerChoiceVO = new PlayerChoiceVO(computerChoiceValue, 'computadora');

    const matchVO = matchManager.checkWinner(playerChoiceVO, computerChoiceVO);
    const newScore = matchManager.updateScore(matchVO, score);

    setLastMatch(matchVO);
    setComputerChoice(computerChoiceVO);
    setScore(newScore);
    setDialogVisible(true);
  };

  return (
    <PaperProvider>
      <View style={styles.container}>
        <Text variant="headlineMedium" style={styles.title}>
          Piedra, Papel o Tijeras
        </Text>

        <View style={styles.scoreRow}>
          <View style={styles.scoreBox}>
            <Text variant="labelLarge">Jugador</Text>
            <Text variant="displaySmall">{score.playerScore}</Text>
          </View>
          <View style={styles.scoreBox}>
            <Text variant="labelLarge">Computadora</Text>
            <Text variant="displaySmall">{score.computerScore}</Text>
          </View>
        </View>

        <View style={styles.buttonsRow}>
          {OPTIONS.map((option) => (
            <Button
              key={option.value}
              mode="contained"
              onPress={() => handlePlay(option.value)}
              style={styles.choiceButton}
              labelStyle={styles.choiceLabel}
              contentStyle={styles.choiceButtonContent}
            >
              {option.icon}
            </Button>
          ))}
        </View>

        <Portal>
          <Dialog visible={dialogVisible} onDismiss={() => setDialogVisible(false)}>
            <Dialog.Title>Resultado</Dialog.Title>
            <Dialog.Content>
              {lastMatch && computerChoice && (
                <>
                  <Text>Tú elegiste: {lastMatch.choice.choice}</Text>
                  <Text>Computadora eligió: {computerChoice.choice}</Text>
                  <Text variant="titleMedium" style={styles.statusText}>
                    {lastMatch.status.toUpperCase()}
                  </Text>
                </>
              )}
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => setDialogVisible(false)}>Cerrar</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    marginBottom: 30,
  },
  scoreRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 40,
  },
  scoreBox: {
    alignItems: 'center',
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  choiceButton: {
    marginHorizontal: 8,
    borderRadius: 50,
    width: 80,
    height: 80,
  },
  choiceButtonContent: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  choiceLabel: {
    fontSize: 32,
    lineHeight: 36,
    marginVertical: 0,
    marginHorizontal: 0,
  },
  statusText: {
    marginTop: 10,
  },
});