const card = document.querySelector(".card");
const candles = document.querySelectorAll(".candle");

let cardOpen = false;

// PAGE LOAD CONFETTI 
window.addEventListener("load", () => {
  if (window.confetti) {
    confetti.start();
  }
});

// SPACE → OPEN / CLOSE CARD
document.addEventListener("keydown", (e) => {
  if (e.code !== "Space") return;

  e.preventDefault();
  cardOpen = !cardOpen;
  card.classList.toggle("open", cardOpen);

  if (!cardOpen) {
    resetCandles();
  }
});

