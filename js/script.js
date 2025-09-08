// script.js

// Global variables
let humanScore = 0;
let computerScore = 0;

function getComputerChoice() {
  // Create an array with the possible choices
  const choices = ["rock", "paper", "scissors"];
  // Generate a random index (0, 1, or 2)
  const randomIndex = Math.floor(Math.random() * choices.length);
  // Return the randomly selected choice
  return choices[randomIndex];
}

function getHumanChoice(message = 'Enter your choice: "rock", "paper", or "scissors"') {
  // Prompt the user to enter "rock", "paper", or "scissors"
  let choice = prompt(message).toLowerCase();
  // Validate input
  while (!["rock", "paper", "scissors"].includes(choice)) {
    choice = prompt('Invalid input. Please enter "rock", "paper", or "scissors"').toLowerCase();
  }
  // Return the validated choice
  return choice;
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
    return "You win! " + humanChoice + " beats " + computerChoice + ".";
  } else {
    computerScore++; // Computer wins, increment computerScore
    return "You lose! " + computerChoice + " beats " + humanChoice + ".";
  }
}

function playGame() {
  // Reset scores at the start of the game
  humanScore = 0;
  computerScore = 0;

  // Play 5 rounds and update scores
  for (let i = 1; i <= 5; i++) {
    const humanChoice = getHumanChoice(
      `Round ${i} - Enter your choice: "rock", "paper", or "scissors"\n
      Current Score - You: ${humanScore}, Computer: ${computerScore}`
    );
    const computerChoice = getComputerChoice();
    const result = playRound(humanChoice, computerChoice);

    // Show round result and updated score to the user
    alert(
      `Round ${i} Results:\n` +
      `You chose: ${humanChoice}\n` +
      `Computer chose: ${computerChoice}\n` +
      `${result}\n\n` +
      `Score - You: ${humanScore}, Computer: ${computerScore}`
    );

    // Also log to console for reference
    console.log(`Round ${i}:`);
    console.log(`You chose: ${humanChoice}`);
    console.log(`Computer chose: ${computerChoice}`);
    console.log(result);
    console.log(`Score - You: ${humanScore}, Computer: ${computerScore}`);
  }

  // Final result
  if (humanScore > computerScore) {
    alert("Congratulations! You won the game!");
    console.log("Congratulations! You won the game!");
  } else if (humanScore < computerScore) {
    alert("Sorry, you lost the game.");
    console.log("Sorry, you lost the game.");
  } else {
    alert("The game is a tie!");
    console.log("The game is a tie!");
  }
}

// ===== Main =====
do {
  playGame();
  let playAgain = prompt('Play again? (y/n)').toLowerCase();
  while (playAgain !== 'y' && playAgain !== 'n') {
    playAgain = prompt('Invalid input. Play again? (y/n)').toLowerCase();
  }
} while (playAgain === 'y');

alert("Thank you for playing!");