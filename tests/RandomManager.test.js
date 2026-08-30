const RandomManager = require('../models/managers/RandomManager');

describe('RandomManager', () => {
  test('generateRandomChoice only returns valid choices', () => {
    // GIVEN
    const manager = new RandomManager();
    const validChoices = ['piedra', 'papel', 'tijeras'];
    const results = new Set();

    // WHEN
    for (let i = 0; i < 100; i++) {
      const choice = manager.generateRandomChoice();
      results.add(choice);
      expect(validChoices).toContain(choice);
    }

    // THEN
    expect(results.size).toBe(3);
  });
});