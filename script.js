let timer;
let countdown;
let counter = 3600; // 1 hour in seconds
let timerVisible = false;
let inactivityTime = 3600000; // 1 hour in milliseconds

// ✅ Countdown timer box at bottom-right
const urgencyBox = document.createElement('div');
urgencyBox.style.position = 'fixed';
urgencyBox.style.bottom = '20px';
urgencyBox.style.right = '20px';
urgencyBox.style.padding = '10px 20px';
urgencyBox.style.backgroundColor = '#000';
urgencyBox.style.color = '#fff';
urgencyBox.style.fontSize = '16px';
urgencyBox.style.borderRadius = '5px';
urgencyBox.style.zIndex = '9999';
urgencyBox.style.display = 'none';
document.body.appendChild(urgencyBox);

// ✅ Overlay popup alert
const overlay = document.createElement('div');
overlay.style.position = 'fixed';
overlay.style.top = '0';
overlay.style.left = '0';
overlay.style.width = '100%';
overlay.style.height = '100%';
overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.95)';
overlay.style.display = 'flex';
overlay.style.flexDirection = 'column';
overlay.style.justifyContent = 'center';
overlay.style.alignItems = 'center';
overlay.style.zIndex = '10000';
overlay.style.color = '#fff';
overlay.style.fontSize = '22px';
overlay.style.textAlign = 'center';

// ✅ Overlay text message
const overlayText = document.createElement('div');
overlayText.innerText = '⏰ You are now on a 1-hour countdown.\nYour cart will expire if no activity happens.';
overlayText.style.marginBottom = '20px';
overlayText.style.whiteSpace = 'pre-line';
overlay.appendChild(overlayText);

// ✅ Exit button
const exitButton = document.createElement('button');
exitButton.innerText = 'Exit';
exitButton.style.padding = '12px 24px';
exitButton.style.fontSize = '18px';
exitButton.style.borderRadius = '5px';
exitButton.style.border = 'none';
exitButton.style.backgroundColor = '#fff';
exitButton.style.color = '#000';
exitButton.style.cursor = 'pointer';

exitButton.onclick = () => {
  overlay.remove();     // Hide overlay
  showTimer();          // Start countdown at bottom
};

overlay.appendChild(exitButton);

// ✅ Start countdown at bottom
function showTimer() {
  if (!timerVisible) {
    urgencyBox.style.display = 'block';
    timerVisible = true;
    counter = 3600;
    updateCountdown();
    countdown = setInterval(updateCountdown, 1000);
  }
}

// ✅ Hide bottom timer
function hideTimer() {
  urgencyBox.style.display = 'none';
  clearInterval(countdown);
  timerVisible = false;
}

// ✅ Update timer text
function updateCountdown() {
  let minutes = Math.floor(counter / 60);
  let seconds = counter % 60;
  if (counter > 0) {
    urgencyBox.textContent = `Hurry! Your cart will expire in ${minutes}:${seconds.toString().padStart(2, '0')}`;
    counter--;
  } else {
    urgencyBox.textContent = `Your cart has expired!`;
    clearInterval(countdown);
  }
}

// ✅ Reset inactivity timer
function resetInactivityTimer() {
  clearTimeout(timer);
  hideTimer();
  timer = setTimeout(() => {
    document.body.appendChild(overlay); // Show overlay popup
  }, inactivityTime);
}

// ✅ Watch user activity
['click', 'mousemove', 'keydown', 'touchstart', 'scroll'].forEach((event) => {
  document.addEventListener(event, resetInactivityTimer);
});

// ✅ Start checking
resetInactivityTimer();
