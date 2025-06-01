let inactivityTimeout;
let overlayDisplayed = false;
let countdownInterval;
const SESSION_TIMEOUT = 60 * 60; // 1 hour in seconds

let timeLeft = SESSION_TIMEOUT;

function resetInactivityTimer() {
  clearTimeout(inactivityTimeout);
  clearInterval(countdownInterval);
  startCountdown();
  inactivityTimeout = setTimeout(showOverlay, SESSION_TIMEOUT * 1000);
}

function showOverlay() {
  if (overlayDisplayed) return;
  overlayDisplayed = true;

  const overlay = document.createElement("div");
  overlay.id = "inactivity-overlay";
  overlay.style.position = "fixed";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.width = "100%";
  overlay.style.height = "100%";
  overlay.style.backgroundColor = "rgba(0, 0, 0, 0.9)";
  overlay.style.display = "flex";
  overlay.style.flexDirection = "column";
  overlay.style.justifyContent = "center";
  overlay.style.alignItems = "center";
  overlay.style.zIndex = "9999";
  overlay.style.color = "white";
  overlay.style.fontSize = "18px";
  overlay.style.textAlign = "center";

  const message = document.createElement("p");
  message.textContent = "product will be automatically removed from cart after session timeout";

  const exitBtn = document.createElement("button");
  exitBtn.textContent = "Exit";
  exitBtn.style.marginTop = "20px";
  exitBtn.style.padding = "10px 20px";
  exitBtn.style.fontSize = "16px";
  exitBtn.style.cursor = "pointer";
  exitBtn.style.backgroundColor = "#ffffff";
  exitBtn.style.color = "#000000";
  exitBtn.style.border = "none";
  exitBtn.style.borderRadius = "5px";

  exitBtn.onclick = () => {
    document.body.removeChild(overlay);
    overlayDisplayed = false;
    resetInactivityTimer();
  };

  const countdown = document.createElement("div");
  countdown.id = "countdown-timer";
  countdown.style.position = "absolute";
  countdown.style.bottom = "10px";
  countdown.style.fontSize = "16px";

  overlay.appendChild(message);
  overlay.appendChild(exitBtn);
  overlay.appendChild(countdown);
  document.body.appendChild(overlay);

  updateCountdown(countdown);
  countdownInterval = setInterval(() => updateCountdown(countdown), 1000);
}

function updateCountdown(element) {
  if (timeLeft <= 0) {
    clearInterval(countdownInterval);
    element.textContent = "Session expired.";
    return;
  }
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  element.textContent = `Session expires in ${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  timeLeft--;
}

// Start the timer
function initInactivityWatcher() {
  document.addEventListener("mousemove", resetInactivityTimer);
  document.addEventListener("keydown", resetInactivityTimer);
  document.addEventListener("scroll", resetInactivityTimer);
  document.addEventListener("touchstart", resetInactivityTimer);
  resetInactivityTimer();
}

// Run it
window.onload = initInactivityWatcher;
