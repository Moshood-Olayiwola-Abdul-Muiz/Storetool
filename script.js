let timer;
let countdown;
let counter = 600; // 10 minutes in seconds
let inactivityTime = 5000; // 5 seconds
let timerVisible = false;

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
  hideTimer();
  clearTimeout(timer);
  timer = setTimeout(showTimer, inactivityTime);
}

['click', 'mousemove', 'keydown', 'touchstart', 'scroll'].forEach((event) => {
  document.addEventListener(event, resetInactivityTimer);
});

resetInactivityTimer();
