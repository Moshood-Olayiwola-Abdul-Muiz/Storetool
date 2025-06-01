let timer;
let countdown;
let counter = 3600; // 1 hour in seconds
let timerVisible = false;
let inactivityTime = 3600000; // 1 hour in milliseconds

// Create the urgency box (the black countdown box)
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

// Create a full-screen overlay form
const overlay = document.createElement('div');
overlay.style.position = 'fixed';
overlay.style.top = 0;
overlay.style.left = 0;
overlay.style.width = '100%';
overlay.style.height = '100%';
overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
overlay.style.color = '#fff';
overlay.style.display = 'flex';
overlay.style.flexDirection = 'column';
overlay.style.justifyContent = 'center';
overlay.style.alignItems = 'center';
overlay.style.zIndex = '10000';
overlay.style.fontSize = '24px';

// Exit button
const exitButton = document.createElement('button');
exitButton.textContent = 'Exit';
exitButton.style.marginTop = '20px';
exitButton.style.padding = '10px 20px';
exitButton.style.fontSize = '18px';
exitButton.style.cursor = 'pointer';
exitButton.style.border = 'none';
exitButton.style.borderRadius = '5px';
exitButton.style.backgroundColor = '#fff';
exitButton.style.color = '#000';

exitButton.onclick = () => {
  overlay.remove(); // hide the form
  showTimer(); // continue showing countdown
};

overlay.appendChild(exitButton);

// Show timer countdown
function showTimer() {
  if (!timerVisible) {
    urgencyBox.style.display = 'block';
    timerVisible = true;
    counter = 3600;
    updateCountdown();
    countdown = setInterval(updateCountdown, 1000);
  }
}

// Hide timer
function hideTimer() {
  urgencyBox.style.display = 'none';
  clearInterval(countdown);
  timerVisible = false;
}

// Update countdown display
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

// Reset inactivity timer and start over
function resetInactivityTimer() {
  clearTimeout(timer);
  hideTimer();
  timer = setTimeout(() => {
    document.body.appendChild(overlay); // show form/overlay
  }, inactivityTime);
}

// User activity detection
['click', 'mousemove', 'keydown', 'touchstart', 'scroll'].forEach(event => {
  document.addEventListener(event, resetInactivityTimer);
});

// Start the inactivity watcher
resetInactivityTimer();
