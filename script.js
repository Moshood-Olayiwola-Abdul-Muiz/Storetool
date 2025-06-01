// Storetool – Clean urgency overlay after 1 hour of inactivity
(function () {
  const INACTIVITY_LIMIT = 60 * 60 * 1000; // 1 hour
  const OVERLAY_SHOWN_KEY = 'storetool_overlay_shown';
  let inactivityTimer;

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

  // Exit button
  const exitButton = document.createElement('button');
  exitButton.textContent = 'Exit';
  exitButton.style.padding = '14px 28px';
  exitButton.style.fontSize = '18px';
  exitButton.style.backgroundColor = '#fff';
  exitButton.style.color = '#000';
  exitButton.style.border = 'none';
  exitButton.style.borderRadius = '8px';
  exitButton.style.cursor = 'pointer';

  // Add button to overlay
  overlay.appendChild(exitButton);
  overlay.style.display = 'none';
  overlay.style.display = 'flex';
  overlay.hidden = true;
  document.body.appendChild(overlay);

  // Function to show overlay
  function showOverlay() {
    if (!localStorage.getItem(OVERLAY_SHOWN_KEY)) {
      overlay.style.display = 'flex';
      localStorage.setItem(OVERLAY_SHOWN_KEY, 'true');

      // (Optional Future) Auto-expire cart logic here
      // localStorage.removeItem('cart');
    }
  }

  // Exit button click
  exitButton.addEventListener('click', () => {
    overlay.style.display = 'none';
  });

  // Reset timer on user activity
  function resetInactivityTimer() {
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(showOverlay, INACTIVITY_LIMIT);
  }

  // Track all user activity
  ['mousemove', 'keydown', 'touchstart', 'scroll'].forEach(event =>
    document.addEventListener(event, resetInactivityTimer)
  );

  // Start timer
  resetInactivityTimer();
})();
