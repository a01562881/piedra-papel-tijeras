const MatchVO = require('../valueobjects/MatchVO');
const ScoreVO = require('../valueobjects/ScoreVO');

const WINNING_COMBOS = {
  piedra: 'tijeras',
  papel: 'piedra',
  tijeras: 'papel',
};

class MatchManager {
  checkWinner(playerChoiceVO, computerChoiceVO) {
    let status;

    if (playerChoiceVO.choice === computerChoiceVO.choice) {
      status = 'empate';
    } else if (WINNING_COMBOS[playerChoiceVO.choice] === computerChoiceVO.choice) {
      status = 'gana jugador';
    } else {
      status = 'gana computadora';
    }

    return new MatchVO(playerChoiceVO, status);
  }

  updateScore(matchVO, currentScoreVO) {
    let { playerScore, computerScore } = currentScoreVO;

    if (matchVO.status === 'gana jugador') {
      playerScore += 1;
    } else if (matchVO.status === 'gana computadora') {
      computerScore += 1;
    }

    return new ScoreVO(playerScore, computerScore);
  }
}

module.exports = MatchManager;