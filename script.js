let inactivityTimeout;
let countdownInterval;
const SESSION_TIMEOUT = 60 * 60; // 1 hour in seconds
let timeLeft = SESSION_TIMEOUT;

function resetInactivityTimer() {
  clearTimeout(inactivityTimeout);
  clearInterval(countdownInterval);
  timeLeft = SESSION_TIMEOUT;
  inactivityTimeout = setTimeout(showOverlay, SESSION_TIMEOUT * 1000);
}

function showOverlay() {
  // Prevent duplicates
  if (document.getElementById("inactivity-overlay")) return;

  // Create overlay
  const overlay = document.createElement("div");
  overlay.id = "inactivity-overlay";
  Object.assign(overlay.style, {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.95)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    fontSize: "18px",
    zIndex: 9999,
    textAlign: "center",
  });

  // Message
  const message = document.createElement("div");
  message.textContent = "product will be automatically removed from cart after session timeout";
  message.style.marginBottom = "20px";

  // Exit button
  const exitBtn = document.createElement("button");
  exitBtn.textContent = "Exit";
  Object.assign(exitBtn.style, {
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#ffffff",
    color: "#000000",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginBottom: "20px"
  });

  // Timer at bottom
  const countdown = document.createElement("div");
  countdown.id = "countdown-timer";
  countdown.style.position = "absolute";
  countdown.style.bottom = "20px";
  countdown.style.fontSize = "16px";

  overlay.appendChild(message);
  overlay.appendChild(exitBtn);
  overlay.appendChild(countdown);
  document.body.appendChild(overlay);

  exitBtn.onclick = () => {
    clearInterval(countdownInterval);
    overlay.remove();
    resetInactivityTimer();
  };

  updateCountdown(countdown);
  countdownInterval = setInterval(() => updateCountdown(countdown), 1000);
}

function updateCountdown(display) {
  if (timeLeft <= 0) {
    clearInterval(countdownInterval);
    display.textContent = "Session expired.";
    return;
  }
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  display.textContent = `Session expires in ${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  timeLeft--;
}

function startWatcher() {
  ["mousemove", "keydown", "scroll", "touchstart"].forEach(evt =>
    document.addEventListener(evt, resetInactivityTimer)
  );
  resetInactivityTimer();
}

window.onload = startWatcher;
