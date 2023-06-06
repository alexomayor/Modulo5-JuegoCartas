import "./style.css";

let puntuacionActual = 0;
let newCardValue = 0;
let newCardValuePoints = 0;
const mensajeSpan = document.getElementById("mensaje");
const currentImage = document.getElementById("cartaActual");

//////////////////////MENSAJES//////////////////////
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
const gameMessages: GameMessages = {
  messageStartGame: "Buena suerte!",
  messageWin: "¡Lo has clavado! ¡Enhorabuena!",
  messageLose: "No juegas muy bien...",
  messageWhatIfGoodDecision: "Pues si, hiciste bien!",
  messageWhatIfBadDecision: `Mala decision! Habrias tenido `,
  messageAbandonLowerThan4: "Has sido muy conservador",
  messageAbandonBetween4and5Half: "Te ha entrado el canguelo eh?",
  messageAbandonBetween6and7: "Casi casi...",
};

//////////////////////BOTON: DEALCARD//////////////////////
const dealCardButton = document.getElementById(
  "dealCardButton"
) as HTMLButtonElement;

if (dealCardButton) {
  dealCardButton.addEventListener("click", dameCarta);
}
//////////////////////BOTON: ABANDON//////////////////////
const abandonButton = document.getElementById(
  "forfeitButton"
) as HTMLButtonElement;

if (abandonButton) {
  abandonButton.addEventListener("click", abandonar);
}
//////////////////////BOTON: WHATIF//////////////////////
const whatIfButton = document.getElementById(
  "whatIfButton"
) as HTMLButtonElement;

if (whatIfButton) {
  whatIfButton.addEventListener("click", () => {
    whatIf();
    if (mensajeSpan && mensajeSpan instanceof HTMLSpanElement) {
      mensajeSpan.textContent = whatIfMessage(
        puntuacionActual,
        newCardValuePoints
      );
    }
  });
}
//////////////////////BOTON: RESET//////////////////////
const resetButton = document.getElementById("resetButton") as HTMLButtonElement;

if (resetButton) {
  resetButton.addEventListener("click", resetGame);
}

/////////////////////////////////////////////////BOTONES: FUNCIONES/////////////////////////////////////////////////

function whatIf() {
  disableButtonWhatIf(true);

  newCardValue = newCardValueCalc();
  newCardValue = newCardValueAdd(newCardValue);
  if (currentImage && currentImage instanceof HTMLImageElement) {
    updateCurrentImage(newCardValue);
  }
  newCardValuePoints = newCardValuePointsToSUM(newCardValue);
}

function resetGame() {
  puntuacionActual = 0;
  newCardValue = 0;
  newCardValuePoints = 0;

  allButtonsDisabledExceptDealCard();

  if (mensajeSpan && mensajeSpan instanceof HTMLSpanElement) {
    mensajeSpan.textContent = gameMessages.messageStartGame;
  }
  muestraPuntuacion(puntuacionActual.toString());
  if (currentImage && currentImage instanceof HTMLImageElement) {
    updateCurrentImage("Card Reverse");
  }
}

function abandonar() {
  allButtonsDisabledExceptResetGameWhatIf();

  let messageToShow = abandonMessage(puntuacionActual) as string;
  updateMessage(messageToShow);
}

function dameCarta() {
  gameStart();
  newCardValue = newCardValueCalc(); // calculo el valor aleatorio (1-10)
  newCardValue = newCardValueAdd(newCardValue); // calculo el numero de carta(1-7 / 10-12)
  if (currentImage && currentImage instanceof HTMLImageElement) {
    updateCurrentImage(newCardValue);
  } //  mostrarCarta() para traer URL y asignarla
  newCardValuePoints = newCardValuePointsToSUM(newCardValue); // calculo el valor a sumar (0.5 o 1-7)
  puntuacionActual += newCardValuePoints; // asigno el valor a sumar a puntuacionActual, que almacena los puntos de partida
  muestraPuntuacion(puntuacionActual.toString()); // muestra los puntos
  comprobarpartida(puntuacionActual);
}
/////////////////////////////////////////////////CALCULO VALORES/////////////////////////////////////////////////

function newCardValuePointsToSUM(value: number) {
  return value < 8 ? value : 0.5;
}
function newCardValueCalc() {
  return Math.round(Math.random() * 9 + 1);
}

function newCardValueAdd(value: number) {
  return value > 7 ? value + 2 : value;
}

/////////////////////////////////////////////////INICIO Y FIN DE PARTIDA/////////////////////////////////////////////////

function gameStart() {
  if (
    abandonButton &&
    resetButton &&
    abandonButton instanceof HTMLButtonElement &&
    resetButton instanceof HTMLButtonElement
  ) {
    disableButtonAbandonCard(false);
    disableButtonReset(false);
  }
  if (mensajeSpan && mensajeSpan instanceof HTMLSpanElement) {
    mensajeSpan.textContent = null;
  }
}

function comprobarpartida(value: number) {
  if (value > 7.5 || value === 7.5) {
    finDePartida(value);
    allButtonsDisabledExceptResetGame();
  }
}

function finDePartida(value: number) {
  if (mensajeSpan && mensajeSpan instanceof HTMLSpanElement) {
    let messageToShow = WinOrLoseMessage(value) as string;
    updateMessage(messageToShow);
  }
}

/////////////////////////////////////////////////ACTUALIZAR IMAGEN/////////////////////////////////////////////////

function updateCurrentImage(value: string | number): void {
  if (currentImage && currentImage instanceof HTMLImageElement) {
    currentImage.src = mostrarCarta(value.toString());
  }
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
    case "Card Reverse":
      value =
        "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/back.jpg";
  }
  return value;
}

/////////////////////////////////////////////////ACTUALIZAR MENSAJE/////////////////////////////////////////////////

function whatIfMessage(puntuacion: number, nuevospuntos: number) {
  return puntuacion + nuevospuntos > 7.5
    ? gameMessages.messageWhatIfGoodDecision
    : gameMessages.messageWhatIfBadDecision +
        `${puntuacion + nuevospuntos} puntos`;
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
  if (mensajeSpan && mensajeSpan instanceof HTMLSpanElement) {
    mensajeSpan.textContent = messageToShow;
  }
}

/////////////////////////////////////////////////DESHABILITAR BOTONES/////////////////////////////////////////////////

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

/////////////////////////////////////////////////ACTUALIZAR MARCADOR/////////////////////////////////////////////////

const muestraPuntuacion = (puntuacion: string) => {
  let textoMarcador = `Puntos: ` + puntuacion;
  let marcadorSpan = document.getElementById("marcador");
  marcadorSpan != null
    ? (marcadorSpan.innerHTML = textoMarcador)
    : console.log(`marcador: ${textoMarcador}`);
};

document.addEventListener("DOMContentLoaded", () => muestraPuntuacion("0"));
