(function () {
  const INACTIVITY_LIMIT = 60 * 60 * 1000; // 1 hour
  const OVERLAY_SHOWN_KEY = 'storetool_overlay_shown';
  let inactivityTimer;
  let countdownInterval;

  // Create overlay
  const overlay = document.createElement('div');
  overlay.style.position = 'fixed';
  overlay.style.top = 0;
  overlay.style.left = 0;
  overlay.style.width = '100%';
  overlay.style.height = '100%';
  overlay.style.backgroundColor = '#000';
  overlay.style.display = 'none';
  overlay.style.zIndex = 9999;
  overlay.style.justifyContent = 'center';
  overlay.style.alignItems = 'center';
  overlay.style.flexDirection = 'column';
  overlay.style.fontFamily = 'Arial, sans-serif';
  document.body.appendChild(overlay);

  // Create message + exit button container
  const messageBox = document.createElement('div');
  messageBox.style.display = 'flex';
  messageBox.style.flexDirection = 'column';
  messageBox.style.alignItems = 'center';
  messageBox.style.gap = '20px';

  // Exit Button
  const exitButton = document.createElement('button');
  exitButton.textContent = 'Exit';
  exitButton.style.padding = '14px 28px';
  exitButton.style.fontSize = '18px';
  exitButton.style.backgroundColor = '#fff';
  exitButton.style.color = '#000';
  exitButton.style.border = 'none';
  exitButton.style.borderRadius = '8px';
  exitButton.style.cursor = 'pointer';

  // Side Message
  const sideMessage = document.createElement('p');
  sideMessage.textContent = 'Your item will expire after 1hr delay';
  sideMessage.style.color = '#fff';
  sideMessage.style.fontSize = '16px';
  sideMessage.style.margin = 0;
  sideMessage.style.marginTop = '10px';

  // Timer at the bottom
  const timerDisplay = document.createElement('div');
  timerDisplay.style.position = 'fixed';
  timerDisplay.style.bottom = '10px';
  timerDisplay.style.left = '50%';
  timerDisplay.style.transform = 'translateX(-50%)';
  timerDisplay.style.backgroundColor = '#000';
  timerDisplay.style.color = '#fff';
  timerDisplay.style.padding = '6px 12px';
  timerDisplay.style.borderRadius = '6px';
  timerDisplay.style.fontSize = '14px';
  timerDisplay.style.zIndex = 9999;
  timerDisplay.style.display = 'none';
  document.body.appendChild(timerDisplay);

  // Add to overlay
  messageBox.appendChild(exitButton);
  messageBox.appendChild(sideMessage);
  overlay.appendChild(messageBox);

  // Show overlay function
  function showOverlay() {
    if (!localStorage.getItem(OVERLAY_SHOWN_KEY)) {
      overlay.style.display = 'flex';
      localStorage.setItem(OVERLAY_SHOWN_KEY, 'true');
      clearInterval(countdownInterval);
    }
  }

  // Countdown timer logic
  function startCountdown(duration) {
    let remaining = duration;
    timerDisplay.style.display = 'block';

    function updateDisplay() {
      const mins = String(Math.floor(remaining / 60)).padStart(2, '0');
      const secs = String(remaining % 60).padStart(2, '0');
      timerDisplay.textContent = `Session expires in ${mins}:${secs}`;
      if (remaining > 0) remaining--;
      else {
        clearInterval(countdownInterval);
        showOverlay();
      }
    }

    updateDisplay();
    countdownInterval = setInterval(updateDisplay, 1000);
  }

  // Exit click
  exitButton.addEventListener('click', () => {
    overlay.style.display = 'none';
  });

  // Reset inactivity timer
  function resetInactivityTimer() {
    clearTimeout(inactivityTimer);
    clearInterval(countdownInterval);
    timerDisplay.style.display = 'none';

    inactivityTimer = setTimeout(() => {
      showOverlay();
    }, INACTIVITY_LIMIT);

    startCountdown(INACTIVITY_LIMIT / 1000);
  }

  // Detect user activity
  ['mousemove', 'keydown', 'touchstart', 'scroll'].forEach(event =>
    document.addEventListener(event, resetInactivityTimer)
  );

  resetInactivityTimer();
})();
