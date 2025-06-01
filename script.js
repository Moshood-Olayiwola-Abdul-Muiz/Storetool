(function () {
  const INACTIVITY_LIMIT = 60 * 60 * 1000; // 1 hour
  const OVERLAY_SHOWN_KEY = 'storetool_overlay_shown';
  let inactivityTimer;
  let countdownInterval;

  // Overlay
  const overlay = document.createElement('div');
  overlay.style.position = 'fixed';
  overlay.style.top = 0;
  overlay.style.left = 0;
  overlay.style.width = '100%';
  overlay.style.height = '100%';
  overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
  overlay.style.display = 'none';
  overlay.style.zIndex = 9999;
  overlay.style.justifyContent = 'center';
  overlay.style.alignItems = 'center';
  overlay.style.flexDirection = 'column';
  overlay.style.fontFamily = 'Arial, sans-serif';
  document.body.appendChild(overlay);

  // Message box
  const messageBox = document.createElement('div');
  messageBox.style.textAlign = 'center';
  messageBox.style.color = '#fff';

  const overlayText = document.createElement('p');
  overlayText.textContent = 'Product will be automatically removed from cart after session timeout';
  overlayText.style.fontSize = '18px';
  overlayText.style.marginBottom = '20px';

  const exitButton = document.createElement('button');
  exitButton.textContent = 'Exit';
  exitButton.style.padding = '12px 24px';
  exitButton.style.fontSize = '16px';
  exitButton.style.backgroundColor = '#fff';
  exitButton.style.color = '#000';
  exitButton.style.border = 'none';
  exitButton.style.borderRadius = '8px';
  exitButton.style.cursor = 'pointer';

  messageBox.appendChild(overlayText);
  messageBox.appendChild(exitButton);
  overlay.appendChild(messageBox);

  // Countdown timer at bottom
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
  document.body.appendChild(timerDisplay);

  // Show overlay
  function showOverlay() {
    if (!localStorage.getItem(OVERLAY_SHOWN_KEY)) {
      overlay.style.display = 'flex';
      localStorage.setItem(OVERLAY_SHOWN_KEY, 'true');
      clearInterval(countdownInterval);
    }
  }

  // Timer
  function startCountdown(seconds) {
    let remaining = seconds;

    function update() {
      const mins = String(Math.floor(remaining / 60)).padStart(2, '0');
      const secs = String(remaining % 60).padStart(2, '0');
      timerDisplay.textContent = `Session expires in ${mins}:${secs}`;
      if (remaining > 0) remaining--;
      else {
        clearInterval(countdownInterval);
        showOverlay();
      }
    }

    update();
    countdownInterval = setInterval(update, 1000);
  }

  // Exit
  exitButton.onclick = () => {
    overlay.style.display = 'none';
  };

  // Reset inactivity timer
  function resetTimer() {
    clearTimeout(inactivityTimer);
    clearInterval(countdownInterval);
    inactivityTimer = setTimeout(() => {
      showOverlay();
    }, INACTIVITY_LIMIT);
    startCountdown(INACTIVITY_LIMIT / 1000);
  }

  // User activity
  ['mousemove', 'keydown', 'touchstart', 'scroll'].forEach(evt => {
    document.addEventListener(evt, resetTimer);
  });

  resetTimer();
})();
