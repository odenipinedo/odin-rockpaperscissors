// script.js

// ===== Global Variable Declaration =====
let humanScore = 0;
let computerScore = 0;
let round = 1;
let maxRounds = 5;

// ===== DOM Setup =====
const body = document.body;

// Create max rounds input
const maxRoundsContainer = document.createElement('div');
maxRoundsContainer.style.margin = '16px 0';
const maxRoundsLabel = document.createElement('label');
maxRoundsLabel.textContent = 'Max Rounds: ';
const maxRoundsInput = document.createElement('input');
maxRoundsInput.type = 'number';
maxRoundsInput.min = '1';
maxRoundsInput.max = '20';
maxRoundsInput.value = maxRounds;
maxRoundsInput.style.width = '60px';
maxRoundsInput.style.marginLeft = '8px';
maxRoundsContainer.appendChild(maxRoundsLabel);
maxRoundsContainer.appendChild(maxRoundsInput);
body.appendChild(maxRoundsContainer);

// Create score display
const scoreDiv = document.createElement('div');
scoreDiv.id = 'score';
scoreDiv.style.margin = '16px 0';
body.appendChild(scoreDiv);

// Create round display
const roundDiv = document.createElement('div');
roundDiv.id = 'round';
roundDiv.style.margin = '16px 0';
body.appendChild(roundDiv);

// Create result display
const resultDiv = document.createElement('div');
resultDiv.id = 'result';
resultDiv.style.margin = '16px 0';
body.appendChild(resultDiv);

// Create button container
const buttonContainer = document.createElement('div');
buttonContainer.id = 'buttons';
body.appendChild(buttonContainer);

// Create buttons for choices
const choices = ["rock", "paper", "scissors"];
choices.forEach(choice => {
  const btn = document.createElement('button');
  btn.textContent = choice.charAt(0).toUpperCase() + choice.slice(1);
  btn.value = choice;
  btn.style.marginRight = '8px';
  btn.addEventListener('click', () => handlePlayerChoice(choice));
  buttonContainer.appendChild(btn);
});

// Create play again container (hidden by default)
const playAgainContainer = document.createElement('div');
playAgainContainer.id = 'play-again';
playAgainContainer.style.margin = '16px 0';
playAgainContainer.style.display = 'none';
body.appendChild(playAgainContainer);

const yesBtn = document.createElement('button');
yesBtn.textContent = 'Yes';
yesBtn.style.marginRight = '8px';
yesBtn.addEventListener('click', restartGame);

const noBtn = document.createElement('button');
noBtn.textContent = 'No';
noBtn.addEventListener('click', sayGoodbye);

playAgainContainer.appendChild(document.createTextNode('Play again? '));
playAgainContainer.appendChild(yesBtn);
playAgainContainer.appendChild(noBtn);

// Add event listener for max rounds input
maxRoundsInput.addEventListener('change', (e) => {
  const newMaxRounds = parseInt(e.target.value);
  if (newMaxRounds >= 1 && newMaxRounds <= 20) {
    maxRounds = newMaxRounds;
    updateRound();
    // Reset game if currently in progress
    if (round > 1 || humanScore > 0 || computerScore > 0) {
      restartGame();
    }
  } else {
    // Reset to previous valid value
    e.target.value = maxRounds;
  }
});

// ===== Function Declarations =====
function getComputerChoice() {
  // Create an array with the possible choices
  const choices = ["rock", "paper", "scissors"];
  // Generate a random index (0, 1, or 2)
  const randomIndex = Math.floor(Math.random() * choices.length);
  // Return the randomly selected choice
  return choices[randomIndex];
}

function playRound(humanChoice, computerChoice) {
  // Compare humanChoice and computerChoice to determine the winner
  if (humanChoice === computerChoice) {
    return "It's a tie!";
  } else if (
    (humanChoice === "rock" && computerChoice === "scissors") ||
    (humanChoice === "paper" && computerChoice === "rock") ||
    (humanChoice === "scissors" && computerChoice === "paper")
  ) {
    humanScore++; // Human wins, increment humanScore
    return `You win! ${humanChoice} beats ${computerChoice}.`;
  } else {
    computerScore++; // Computer wins, increment computerScore
    return `You lose! ${computerChoice} beats ${humanChoice}.`;
  }
}

function updateScore() {
  scoreDiv.textContent = `Score - You: ${humanScore}, Computer: ${computerScore}`;
}

function updateRound() {
  roundDiv.textContent = `Round ${round <= maxRounds ? round : maxRounds} of ${maxRounds}`;
}

function announceWinner() {
  let winnerMsg = '';
  if (round > maxRounds) {
    if (humanScore > computerScore) {
      winnerMsg = "Congratulations! You won the game!";
    } else if (computerScore > humanScore) {
      winnerMsg = "Sorry, you lost the game.";
    } else {
      winnerMsg = "The game is a tie!";
    }
    resultDiv.textContent = resultDiv.textContent + `\n\n${winnerMsg}`;
    // Disable buttons
    Array.from(buttonContainer.children).forEach(btn => btn.disabled = true);
    // Show play again prompt
    playAgainContainer.style.display = 'block';
  }
}

function handlePlayerChoice(humanChoice) {
  if (round > maxRounds) return; // Prevent further play after game ends
  const computerChoice = getComputerChoice();
  const roundResult = playRound(humanChoice, computerChoice);

  // Display round result
  resultDiv.textContent = `You chose: ${humanChoice}\nComputer chose: ${computerChoice}\n${roundResult}`;
  updateScore();
  
  // Check if this completes the final round
  if (round === maxRounds) {
    // This was the final round, announce winner
    round++; // Increment to prevent further play
    updateRound();
    announceWinner();
  } else {
    // Continue to next round
    round++;
    updateRound();
  }
}

function restartGame() {
  humanScore = 0;
  computerScore = 0;
  round = 1;
  updateScore();
  updateRound();
  resultDiv.textContent = `Best of ${maxRounds} rounds! Make your move.`;
  Array.from(buttonContainer.children).forEach(btn => btn.disabled = false);
  playAgainContainer.style.display = 'none';
}

function sayGoodbye() {
  scoreDiv.textContent = '';
  roundDiv.textContent = '';
  resultDiv.textContent = 'Goodbye!';
  buttonContainer.style.display = 'none';
  playAgainContainer.style.display = 'none';
  maxRoundsContainer.style.display = 'none';
}

// ===== Main =====
updateScore();
updateRound();
resultDiv.textContent = `Best of ${maxRounds} rounds! Make your move.`;