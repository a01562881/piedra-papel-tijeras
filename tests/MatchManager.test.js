const MatchManager = require('../models/managers/MatchManager');
const PlayerChoiceVO = require('../models/valueobjects/PlayerChoiceVO');

describe('MatchManager', () => {
  const manager = new MatchManager();

  test('piedra vs tijeras - gana jugador', () => {
    // GIVEN
    const player = new PlayerChoiceVO('piedra', 'jugador');
    const computer = new PlayerChoiceVO('tijeras', 'computadora');

    // WHEN
    const result = manager.checkWinner(player, computer);

    // THEN
    expect(result.status).toBe('gana jugador');
  });

  test('piedra vs papel - gana computadora', () => {
    const player = new PlayerChoiceVO('piedra', 'jugador');
    const computer = new PlayerChoiceVO('papel', 'computadora');
    const result = manager.checkWinner(player, computer);
    expect(result.status).toBe('gana computadora');
  });

  test('piedra vs piedra - empate', () => {
    const player = new PlayerChoiceVO('piedra', 'jugador');
    const computer = new PlayerChoiceVO('piedra', 'computadora');
    const result = manager.checkWinner(player, computer);
    expect(result.status).toBe('empate');
  });

  test('papel vs piedra - gana jugador', () => {
    const player = new PlayerChoiceVO('papel', 'jugador');
    const computer = new PlayerChoiceVO('piedra', 'computadora');
    const result = manager.checkWinner(player, computer);
    expect(result.status).toBe('gana jugador');
  });

  test('papel vs tijeras - gana computadora', () => {
    const player = new PlayerChoiceVO('papel', 'jugador');
    const computer = new PlayerChoiceVO('tijeras', 'computadora');
    const result = manager.checkWinner(player, computer);
    expect(result.status).toBe('gana computadora');
  });

  test('papel vs papel - empate', () => {
    const player = new PlayerChoiceVO('papel', 'jugador');
    const computer = new PlayerChoiceVO('papel', 'computadora');
    const result = manager.checkWinner(player, computer);
    expect(result.status).toBe('empate');
  });

  test('tijeras vs papel - gana jugador', () => {
    const player = new PlayerChoiceVO('tijeras', 'jugador');
    const computer = new PlayerChoiceVO('papel', 'computadora');
    const result = manager.checkWinner(player, computer);
    expect(result.status).toBe('gana jugador');
  });

  test('tijeras vs piedra - gana computadora', () => {
    const player = new PlayerChoiceVO('tijeras', 'jugador');
    const computer = new PlayerChoiceVO('piedra', 'computadora');
    const result = manager.checkWinner(player, computer);
    expect(result.status).toBe('gana computadora');
  });

  test('tijeras vs tijeras - empate', () => {
    const player = new PlayerChoiceVO('tijeras', 'jugador');
    const computer = new PlayerChoiceVO('tijeras', 'computadora');
    const result = manager.checkWinner(player, computer);
    expect(result.status).toBe('empate');
  });
});