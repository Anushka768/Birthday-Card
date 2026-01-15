// ===============================
// ELEMENTS
// ===============================
const card = document.querySelector(".card");
const candles = document.querySelectorAll(".candle");

// ===============================
// STATE
// ===============================
let cardOpen = false;
let blown = false; // tracks if candles blown

// ===============================
// PAGE LOAD CONFETTI (auto stop)
// ===============================
window.addEventListener("load", () => {
  if (window.confetti) {
    confetti.start();
  }
});

// ===============================
// SPACE → OPEN / CLOSE CARD
// ===============================
document.addEventListener("keydown", (e) => {
  if (e.code !== "Space") return;

  e.preventDefault();
  cardOpen = !cardOpen;
  card.classList.toggle("open", cardOpen);

  if (!cardOpen) {
    resetCandles();
  }
});

// ===============================
// RESET CANDLES
// ===============================
function resetCandles() {
  blown = false;
  candles.forEach((c) => c.classList.remove("blown"));
}
