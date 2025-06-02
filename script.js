let inactivityTime = 10000; // 10 seconds (set to 3600000 for 1 hour)
let timer;
let countdown;
let countdownValue = 60 * 60; // 1 hour in seconds

function createOverlay() {
  const overlay = document.createElement('div');
  overlay.id = 'overlay';
  overlay.style.position = 'fixed';
  overlay.style.top = '0';
  overlay.style.left = '0';
  overlay.style.width = '100vw';
  overlay.style.height = '100vh';
  overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
  overlay.style.color = 'white';
  overlay.style.zIndex = '9999';
  overlay.style.display = 'flex';
  overlay.style.flexDirection = 'column';
  overlay.style.justifyContent = 'center';
  overlay.style.alignItems = 'center';
  overlay.innerHTML = `
    <p style="font-size: 18px; margin-bottom: 20px;">product will be automatically removed from cart after session timeout</p>
    <button id="exitBtn" style="padding: 10px 20px; font-size: 16px; cursor: pointer;">Exit</button>
  `;
  document.body.appendChild(overlay);

  document.getElementById('exitBtn').onclick = () => {
    overlay.remove();
  };
}

function createTimer() {
  const timerBox = document.createElement('div');
  timerBox.id = 'countdownTimer';
  timerBox.style.position = 'fixed';
  timerBox.style.bottom = '10px';
  timerBox.style.left = '50%';
  timerBox.style.transform = 'translateX(-50%)';
  timerBox.style.backgroundColor = 'black';
  timerBox.style.color = 'white';
  timerBox.style.padding = '8px 16px';
  timerBox.style.borderRadius = '10px';
  timerBox.style.fontSize = '16px';
  timerBox.style.zIndex = '9999';
  document.body.appendChild(timerBox);

  updateTimer();
  countdown = setInterval(() => {
    countdownValue--;
    updateTimer();
    if (countdownValue <= 0) clearInterval(countdown);
  }, 1000);
}

function updateTimer() {
  const timerBox = document.getElementById('countdownTimer');
  if (timerBox) {
    const mins = Math.floor(countdownValue / 60).toString().padStart(2, '0');
    const secs = (countdownValue % 60).toString().padStart(2, '0');
    timerBox.textContent = `Section expires in ${mins}:${secs}`;
  }
}

function resetTimer() {
  clearTimeout(timer);
  timer = setTimeout(() => {
    createOverlay();
    createTimer();
  }, inactivityTime);
}

['mousemove', 'keydown', 'touchstart'].forEach(event => {
  document.addEventListener(event, resetTimer);
});

resetTimer(); // Start immediately
