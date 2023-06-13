import "./style.css";

let currentPoints = 0;
// const UNDER_SCORE = 0;
// const PERFECT_SCORE = 1;
// const OVER_SCORE = 2;
const targetPoints = 7.5;

//////////////////////MESSAGES//////////////////////
interface GameMessages {
  messageStartGame: string;
  messageGameWon: string;
  messageGameLost: string;
  messageWhatIfGoodDecision: string;
  messageWhatIfBadDecision: string;
  messageAbandonLowerThan4: string;
  messageAbandonBetween4and5Half: string;
  messageAbandonBetween6and7: string;
}
export const gameMessages: GameMessages = {
  messageStartGame: "Buena suerte!",
  messageGameWon: "¡Lo has clavado! ¡Enhorabuena!",
  messageGameLost: "No juegas muy bien...",
  messageWhatIfGoodDecision:
    "Plantarse fue una buena decision! Te habrias pasado.",
  messageWhatIfBadDecision: `Plantarse fue una mala decision! Habrias tenido `,
  messageAbandonLowerThan4: "Has sido muy conservador.",
  messageAbandonBetween4and5Half: "Te ha entrado el canguelo eh?",
  messageAbandonBetween6and7: "Casi casi...",
};

//////////////////////BUTTONS//////////////////////
const dealCardButton = document.getElementById("dealCardButton");
const abandonButton = document.getElementById("forfeitButton");
const whatIfButton = document.getElementById("whatIfButton");
const resetButton = document.getElementById("resetButton");
document.addEventListener("DOMContentLoaded", initGame);

/////////////////////////////////////////////////INIT GAME/////////////////////////////////////////////////
function initGame() {
  if (dealCardButton && dealCardButton instanceof HTMLButtonElement) {
    dealCardButton.addEventListener("click", dealCard);
  }
  if (abandonButton && abandonButton instanceof HTMLButtonElement) {
    abandonButton.addEventListener("click", abandon);
  }
  if (whatIfButton && whatIfButton instanceof HTMLButtonElement) {
    whatIfButton.addEventListener("click", whatIfClick);
  }
  if (resetButton && resetButton instanceof HTMLButtonElement) {
    resetButton.addEventListener("click", resetGame);
  }
  displayPoints("0");
}

/////////////////////////////////////////////////BUTTONS: FUNCTIONS/////////////////////////////////////////////////
function whatIfClick() {
  disableButtonWhatIf(true);
  whatIf();
}

function whatIf() {
  let newCardValue: number = newCardValueCalc(); // generates random value (1-10)
  let newCardNumber = newCardNumberCalc(newCardValue); // assigns card number from previous random value (1-7 / 10-12)
  let CardToBeDisplayed: string = fetchCardURL(newCardNumber.toString()); // fetches new card image URL
  let newCardPoints = newCardPointsToSUM(newCardNumber); // calculates new card points (0.5 or 1-7)
  updateCurrentImage(CardToBeDisplayed); // updates image displayed
  let messageToShow: string = whatIfMessage(currentPoints, newCardPoints);
  updateMessage(messageToShow);
  currentPoints += newCardPoints; // sums newCardPoints to currentPoints, which holds current game score
  displayPoints(currentPoints.toString()); // displays current game score in the scoreboard span
}

function resetGame() {
  currentPoints = 0;
  allButtonsDisabledExceptDealCard();
  updateMessage(gameMessages.messageStartGame);
  displayPoints(currentPoints.toString());
  let CardToBeDisplayed: string = fetchCardURL("Card Reverse");
  updateCurrentImage(CardToBeDisplayed);
}

function abandon() {
  allButtonsDisabledExceptResetGameWhatIf();
  let messageToShow: string = abandonMessage(currentPoints);
  updateMessage(messageToShow);
}

function dealCard() {
  let newCardValue: number = newCardValueCalc(); // generates random value (1-10)
  let newCardNumber = newCardNumberCalc(newCardValue); // assigns card number from previous random value (1-7 / 10-12)
  let CardToBeDisplayed: string = fetchCardURL(newCardNumber.toString()); // fetches new card image URL
  let newCardPoints = newCardPointsToSUM(newCardNumber); // calculates new card points (0.5 or 1-7)
  updateCurrentImage(CardToBeDisplayed); // updates image displayed
  currentPoints += newCardPoints; // sums newCardPoints to currentPoints, which holds current game score
  gameStart();
  displayPoints(currentPoints.toString()); // displays current game score in the scoreboard span
  gameCheck(currentPoints); // checks wether the current game is won or lost
}

/////////////////////////////////////////////////CALC VALUES/////////////////////////////////////////////////
function newCardPointsToSUM(value: number): number {
  return value < 8 ? value : 0.5;
}
function newCardValueCalc() {
  return Math.round(Math.random() * 9 + 1);
}
function newCardNumberCalc(value: number) {
  return value > 7 ? value + 2 : value;
}

/////////////////////////////////////////////////GAME START & GAME OVER/////////////////////////////////////////////////
function gameStart() {
  disableButtonAbandonCard(false);
  disableButtonReset(false);
  updateMessage("");
}

function gameCheck(value: number) {
  if (value > targetPoints) {
    gameLost();
  }
  if (value === targetPoints) {
    gameWon();
  }
}

function gameWon() {
  allButtonsDisabledExceptResetGame();
  updateMessage(gameMessages.messageGameWon);
}

function gameLost() {
  allButtonsDisabledExceptResetGame();
  updateMessage(gameMessages.messageGameLost);
}

/////////////////////////////////////////////////UPDATE IMAGE/////////////////////////////////////////////////
function updateCurrentImage(value: string): void {
  const currentImage = document.getElementById("cartaActual");
  if (currentImage && currentImage instanceof HTMLImageElement) {
    currentImage.src = value;
  }
}

function fetchCardURL(value: string) {
  switch (value) {
    case "1":
      value =
        "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/1_as-copas.jpg";
      break;
    case "2":
      value =
        "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/2_dos-copas.jpg";
      break;
    case "3":
      value =
        "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/3_tres-copas.jpg";
      break;
    case "4":
      value =
        "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/4_cuatro-copas.jpg";
      break;
    case "5":
      value =
        "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/5_cinco-copas.jpg";
      break;
    case "6":
      value =
        "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/6_seis-copas.jpg";
      break;
    case "7":
      value =
        "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/7_siete-copas.jpg";
      break;
    case "10":
      value =
        "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/10_sota-copas.jpg";
      break;
    case "11":
      value =
        "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/11_caballo-copas.jpg";
      break;
    case "12":
      value =
        "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/12_rey-copas.jpg";
      break;
    case "Card Reverse":
      value =
        "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/back.jpg";
  }
  return value;
}

/////////////////////////////////////////////////MESSAGES & SCOREBOARD UPDATES/////////////////////////////////////////////////
function whatIfMessage(pointsNow: number, newPoints: number) {
  return pointsNow + newPoints > targetPoints
    ? gameMessages.messageWhatIfGoodDecision
    : gameMessages.messageWhatIfBadDecision + `${pointsNow + newPoints} puntos`;
}

function abandonMessage(value: number) {
  if (value < 4) {
    return gameMessages.messageAbandonLowerThan4;
  }
  if (value < 6) {
    return gameMessages.messageAbandonBetween4and5Half;
  }
  if (value < 7.5) {
    return gameMessages.messageAbandonBetween6and7;
  }
  return "";
}

function updateMessage(messageToShow: string) {
  const messageSpan = document.getElementById("message");
  if (messageSpan && messageSpan instanceof HTMLSpanElement) {
    messageSpan.textContent = messageToShow;
  }
}
const displayPoints = (points: string) => {
  let scoreboardText = `Puntos: ` + points;
  let scoreboardSpan = document.getElementById("scoreboard");
  if (scoreboardSpan && scoreboardSpan instanceof HTMLSpanElement) {
    scoreboardSpan.innerHTML = scoreboardText;
  }
};

/////////////////////////////////////////////////DISABLING BUTTONS/////////////////////////////////////////////////
function disableButtonDealCard(value: boolean) {
  if (dealCardButton && dealCardButton instanceof HTMLButtonElement) {
    dealCardButton.disabled = value;
  }
}
function disableButtonAbandonCard(value: boolean) {
  if (abandonButton && abandonButton instanceof HTMLButtonElement) {
    abandonButton.disabled = value;
  }
}
function disableButtonWhatIf(value: boolean) {
  if (whatIfButton && whatIfButton instanceof HTMLButtonElement) {
    whatIfButton.disabled = value;
  }
}
function disableButtonReset(value: boolean) {
  if (resetButton && resetButton instanceof HTMLButtonElement) {
    resetButton.disabled = value;
  }
}

function allButtonsDisabledExceptDealCard() {
  disableButtonDealCard(false);
  disableButtonAbandonCard(true);
  disableButtonWhatIf(true);
  disableButtonReset(true);
}

function allButtonsDisabledExceptResetGame() {
  disableButtonDealCard(true);
  disableButtonAbandonCard(true);
  disableButtonWhatIf(true);
  disableButtonReset(false);
}

function allButtonsDisabledExceptResetGameWhatIf() {
  disableButtonDealCard(true);
  disableButtonAbandonCard(true);
  disableButtonWhatIf(false);
  disableButtonReset(false);
}
