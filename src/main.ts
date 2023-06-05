import "./style.css";

let puntuacionActual = 0;
let newCardValue = 0;
let newCardValuePoints = 0;
let mensajeSpan = document.getElementById("mensaje") as HTMLSpanElement;
let currentImage = document.getElementById("cartaActual") as HTMLImageElement;

interface GameMessages {
  messageStartGame: string;
  messageWin: string;
  messageLose: string;
  messageWhatIfGoodDecision: string;
  messageWhatIfBadDecision: string;
  messageAbandonLowerThan4: string;
  messageAbandonBetween4and5Half: string;
  messageAbandonBetween6and7: string;
}
let gameMessages: GameMessages = {
  messageStartGame: "Buena suerte!",
  messageWin: "¡Lo has clavado! ¡Enhorabuena!",
  messageLose: "No juegas muy bien...",
  messageWhatIfGoodDecision: "Pues si, hiciste bien!",
  messageWhatIfBadDecision: `Mala decision! Habrias tenido `,
  messageAbandonLowerThan4: "Has sido muy conservador",
  messageAbandonBetween4and5Half: "Te ha entrado el canguelo eh?",
  messageAbandonBetween6and7: "Casi casi...",
};
mensajeSpan.textContent = gameMessages.messageStartGame;

interface Button {
  id: string;
  disabled: boolean;
}
interface GameButtons {
  dealCard: Button;
  abandon: Button;
  whatIf: Button;
  reset: Button;
}

let gameButtons: GameButtons = {
  dealCard: {
    id: "dealCardButton",
    disabled: false,
  },
  abandon: {
    id: "forfeitButton",
    disabled: false,
  },
  whatIf: {
    id: "whatIfButton",
    disabled: false,
  },
  reset: {
    id: "resetButton",
    disabled: false,
  },
};

let dealCardButton = document.getElementById(gameButtons.dealCard.id);
let abandonButton = document.getElementById(gameButtons.abandon.id);
let whatIfButton = document.getElementById(gameButtons.whatIf.id);
let resetButton = document.getElementById(gameButtons.reset.id);

function newCardValuePointsToSUM(value: number) {
  return value < 8 ? value : 0.5;
}

const muestraPuntuacion = (puntuacion: string) => {
  let textoMarcador = `Puntos: ` + puntuacion;
  let marcadorSpan = document.getElementById("marcador");
  marcadorSpan != null
    ? (marcadorSpan.innerHTML = textoMarcador)
    : console.log(`marcador: ${textoMarcador}`);
};

function dameCarta() {
  gameStart();
  newCardValue = newCardValueCalc();
  newCardValue = newCardValueAdd(newCardValue);
  if (currentImage.src && currentImage instanceof HTMLImageElement) {
    currentImage.src = updateCurrentImage("New Card") as string;
  }
  newCardValuePoints = newCardValuePointsToSUM(newCardValue);
  puntuacionActual += newCardValuePoints;
  muestraPuntuacion(puntuacionActual.toString());
  comprobarpartida(puntuacionActual);
}

function gameStart() {
  if (
    abandonButton &&
    resetButton &&
    abandonButton instanceof HTMLButtonElement &&
    resetButton instanceof HTMLButtonElement
  ) {
    disableButtonAbandonCard(false);
    disableButtonReset(false);
    // buttonsDisabled({
    //   abandonValue: false,
    //   resetValue: false,
    // });
  }
  mensajeSpan.textContent = null;
}

function comprobarpartida(value: number) {
  if (value > 7.5 || value === 7.5) {
    finDePartida(value);
    finDePartidaBotones(value);
  }
}

function newCardValueCalc() {
  return Math.round(Math.random() * 9 + 1);
}

function newCardValueAdd(value: number) {
  return value > 7 ? value + 2 : value;
}

function finDePartida(value: number) {
  if (mensajeSpan && mensajeSpan instanceof HTMLSpanElement) {
    let messageToShow = WinOrLoseMessage(value) as string;
    updateMessage(messageToShow);
  }
}

function finDePartidaBotones(value: number) {
  value > 7.5
    ? allButtonsDisabledExceptResetGame()
    : // buttonsDisabled({
      //     dealCardValue: true,
      //     abandonValue: true,
      //     whatIfValue: false,
      //     resetValue: false,
      //   })
      allButtonsDisabledExceptResetGame();
  // buttonsDisabled({
  //     dealCardValue: true,
  //     abandonValue: true,
  //     whatIfValue: true,
  //     resetValue: false,
  //   })
}

function mostrarCarta(value: string) {
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
  }
  return value;
}

function whatIf() {
  if (whatIfButton && whatIfButton instanceof HTMLButtonElement) {
    disableButtonWhatIf(true);
    // buttonsDisabled({ whatIfValue: true });
  }

  newCardValue = newCardValueCalc();
  newCardValue = newCardValueAdd(newCardValue);
  currentImage.src = updateCurrentImage("New Card") as string;
  newCardValuePoints = newCardValuePointsToSUM(newCardValue);
}

function whatIfMessage(puntuacion: number, nuevospuntos: number) {
  return puntuacion + nuevospuntos > 7.5
    ? gameMessages.messageWhatIfGoodDecision
    : gameMessages.messageWhatIfBadDecision +
        `${puntuacion + nuevospuntos} puntos`;
}

function resetGame() {
  puntuacionActual = 0;
  newCardValue = 0;
  newCardValuePoints = 0;

  allButtonsDisabledExceptDealCard();
  //  buttonsDisabled({
  //   dealCardValue: false,
  //   abandonValue: true,
  //   whatIfValue: true,
  //   resetValue: true,
  // })
  mensajeSpan.textContent = gameMessages.messageStartGame;
  muestraPuntuacion(puntuacionActual.toString());
  currentImage.src = updateCurrentImage("Card Reverse") as string;
}

function updateCurrentImage(value: string) {
  if (value === "New Card") {
    return mostrarCarta(newCardValue.toString());
  }
  if (value === "Card Reverse") {
    return "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/back.jpg";
  }
  return null;
}

function abandonar() {
  allButtonsDisabledExceptResetGameWhatIf();
  // buttonsDisabled({
  //   dealCardValue: true,
  //   abandonValue: true,
  //   whatIfValue: false,
  //   resetValue: false,
  // });
  let messageToShow = abandonMessage(puntuacionActual) as string;
  updateMessage(messageToShow);
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
  return null;
}
function WinOrLoseMessage(value: number) {
  if (value === 7.5) {
    return gameMessages.messageWin;
  }
  if (value > 7.5) {
    return gameMessages.messageLose;
  }
  return null;
}
function updateMessage(messageToShow: string) {
  mensajeSpan.textContent = messageToShow;
}

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

// function disableButton(buttonToDisable: HTMLElement, value: boolean) {
//   if (buttonToDisable && buttonToDisable instanceof HTMLButtonElement) {
//     buttonToDisable.disabled = value;
//   }
// }
// function buttonsDisabled(botones: {
//   dealCardValue?: boolean;
//   abandonValue?: boolean;
//   whatIfValue?: boolean;
//   resetValue?: boolean;
// }) {
//   if (
//     dealCardButton &&
//     dealCardButton instanceof HTMLButtonElement &&
//     botones.dealCardValue !== undefined &&
//     botones.dealCardValue !== null
//   ) {
//     disableButton(dealCardButton, botones.dealCardValue);
//   }
//   if (
//     abandonButton &&
//     abandonButton instanceof HTMLButtonElement &&
//     botones.abandonValue !== undefined &&
//     botones.abandonValue !== null
//   ) {
//     disableButton(abandonButton, botones.abandonValue);
//   }
//   if (
//     whatIfButton &&
//     whatIfButton instanceof HTMLButtonElement &&
//     botones.whatIfValue !== undefined &&
//     botones.whatIfValue !== null
//   ) {
//     disableButton(whatIfButton, botones.whatIfValue);
//   }
//   if (
//     resetButton &&
//     resetButton instanceof HTMLButtonElement &&
//     botones.resetValue !== undefined &&
//     botones.resetValue !== null
//   ) {
//     disableButton(resetButton, botones.resetValue);
//   }
// }

document.addEventListener("DOMContentLoaded", () => muestraPuntuacion("0"));
if (dealCardButton) {
  dealCardButton.addEventListener("click", dameCarta);
}
if (abandonButton) {
  abandonButton.addEventListener("click", abandonar);
}
if (whatIfButton) {
  whatIfButton.addEventListener("click", () => {
    whatIf();
    mensajeSpan.textContent = whatIfMessage(
      puntuacionActual,
      newCardValuePoints
    );
  });
}
if (resetButton) {
  resetButton.addEventListener("click", resetGame);
}
