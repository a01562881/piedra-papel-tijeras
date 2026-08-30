const VALID_CHOICES = ['piedra', 'papel', 'tijeras'];

class RandomManager {
  generateRandomChoice() {
    const index = Math.floor(Math.random() * VALID_CHOICES.length);
    return VALID_CHOICES[index];
  }
}

module.exports = RandomManager;