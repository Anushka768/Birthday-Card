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
    setTimeout(() => confetti.stop(), 2000);
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
    confetti.stop();
  }
});

document.addEventListener("click", (e) => {
  if (blown) return;

  // Check if a candle or its flame was clicked
  const candle = e.target.closest(".candle");
  if (!candle) return;

  blowOutCandles();
});

function blowOutCandles() {
  blown = true;

  const candles = document.querySelectorAll(".candle");

  candles.forEach((candle, index) => {
    setTimeout(() => {
      candle.classList.add("blown");
    }, index * 120);
  });

  // 🎉 CONFETTI
  setTimeout(() => {
    if (window.confetti) {
      confetti.start(3000);
    }
  }, 800);
}
// ===============================
// RESET CANDLES
// ===============================
function resetCandles() {
  blown = false;
  candles.forEach((c) => c.classList.remove("blown"));
}
