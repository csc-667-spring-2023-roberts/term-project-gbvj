// uno-game.js

// Initialize the game variables
const MAX_PLAYERS = 4;
let currentPlayer = 0;
let players = [];
let deck = [];
const COLORS = ["red", "yellow", "green", "blue"];

// Function to generate a random color
function getRandomColor() {
  return COLORS[Math.floor(Math.random() * COLORS.length)];
}

// Function to create a player's card box
function createPlayerCardBox(playerIndex) {
  const cardBox = document.getElementById(`card-box-${playerIndex}`);
  const cardCount = cardBox.children.length;

  const card = document.createElement("div");
  card.classList.add("card");
  card.style.backgroundColor = getRandomColor();

  cardBox.appendChild(card);
}

// Function to start the game
function startGame() {
  // Perform game setup tasks
  // Shuffle the deck, deal cards to players, etc.
  console.log("game started");
  // Create initial card boxes for each player
  for (let i = 0; i < players.length; i++) {
    for (let j = 0; j < 5; j++) {
      createPlayerCardBox(i);
    }
  }
}

// Function to handle drawing a card
function drawCard() {
  // Draw a card from the deck and add it to the current player's hand

  // Add a new card box for the current player
  createPlayerCardBox(currentPlayer);
}

// Function to play a turn
function playTurn(card) {
  // Check if the card can be played by the current player
  // If valid, update the game state and proceed to the next turn
}

// Add more game logic functions as needed

// Example usage
startGame();

// Event listener for the "Draw Card" button
const drawCardButton = document.getElementById("draw-card");
drawCardButton.addEventListener("click", drawCard);

const startGame = document.getElementById("start-game");
drawCardButton.addEventListener("click", startGame);
