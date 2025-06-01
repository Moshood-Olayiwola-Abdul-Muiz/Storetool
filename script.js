let timer;
let countdown;
let counter = 600; // 10 minutes in seconds
let inactivityTime = 5000; // 5 seconds
let timerVisible = false;

// Create urgency timer
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

// Create form page overlay
const formOverlay = document.createElement('div');
formOverlay.style.position = 'fixed';
formOverlay.style.top = '0';
formOverlay.style.left = '0';
formOverlay.style.width = '100%';
formOverlay.style.height = '100%';
formOverlay.style.backgroundColor = 'rgba(0,0,0,0.8)';
formOverlay.style.color = '#fff';
formOverlay.style.display = 'flex';
formOverlay.style.flexDirection = 'column';
formOverlay.style.justifyContent = 'center';
formOverlay.style.alignItems = 'center';
formOverlay.style.zIndex = '10000';

const message = document.createElement('p');
message.textContent = 'Almost there! Enter your email to claim your offer.';
message.style.fontSize = '20px';
message.style.marginBottom = '20px';

const input = document.createElement('input');
input.type = 'email';
input.placeholder = 'Enter your email';
input.style.padding = '10px';
input.style.fontSize = '16px';
input.style.borderRadius = '5px';
input.style.border = 'none';
input.style.marginBottom = '20px';
input.style.width = '80%';
input.style.maxWidth = '300px';

const exitButton = document.createElement('button');
exitButton.textContent = 'Exit';
exitButton.style.padding = '10px 20px';
exitButton.style.fontSize = '16px';
exitButton.style.borderRadius = '5px';
exitButton.style.border = 'none';
exitButton.style.backgroundColor = '#ff0000';
exitButton.style.color = '#fff';
exitButton.style.cursor = 'pointer';
exitButton.onclick = () => {
  formOverlay.style.display = 'none'; // hide form
};

formOverlay.appendChild(message);
formOverlay.appendChild(input);
formOverlay.appendChild(exitButton);
document.body.appendChild(formOverlay);

// Timer logic
function showTimer() {
  if (!timerVisible) {
    urgencyBox.style.display = 'block';
    timerVisible = true;
    counter = 600;
    updateCountdown();
    countdown = setInterval(updateCountdown, 1000);
  }
}

function hideTimer() {
  urgencyBox.style.display = 'none';
  clearInterval(countdown);
  timerVisible = false;
}

function updateCountdown() {
  let minutes = Math.floor(counter / 60);
  let seconds = counter % 60;
  if (counter > 0) {
    urgencyBox.textContent = `Hurry! Your cart will expire in ${minutes}:${seconds
      .toString()
      .padStart(2, '0')}`;
    counter--;
  } else {
    urgencyBox.textContent = `Your cart has expired!`;
    clearInterval(countdown);
  }
}

function resetInactivityTimer() {
  clearTimeout(timer);
  hideTimer();
  showTimer(); // start countdown on first activity
}

['click', 'mousemove', 'keydown', 'touchstart', 'scroll'].forEach((event) => {
  document.addEventListener(event, resetInactivityTimer);
});

resetInactivityTimer();
