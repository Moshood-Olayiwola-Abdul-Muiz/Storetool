// ───── UrgentCart Inactivity Logic (1-Time Overlay After 1 Hour) ─────
(function () {
  const ONE_HOUR = 60 * 60 * 1000;
  const FORM_SHOWN_KEY = 'urgentCartFormShown';
  let inactivityTimer;

  // Create overlay
  const overlay = document.createElement('div');
  overlay.id = 'urgentCartOverlay';
  Object.assign(overlay.style, {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.95)',
    color: 'white',
    display: 'none',
    zIndex: 9999,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    fontFamily: 'Arial, sans-serif'
  });

  // Exit button
  const exitBtn = document.createElement('button');
  exitBtn.textContent = 'Exit';
  Object.assign(exitBtn.style, {
    padding: '12px 24px',
    fontSize: '18px',
    backgroundColor: '#fff',
    color: '#000',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '8px',
    marginTop: '20px'
  });

  overlay.appendChild(exitBtn);
  document.body.appendChild(overlay);

  // Show overlay only once
  function showOverlayOnce() {
    if (!localStorage.getItem(FORM_SHOWN_KEY)) {
      overlay.style.display = 'flex';
      localStorage.setItem(FORM_SHOWN_KEY, 'true');
      expireCart();
    }
  }

  // Example cart-expiry logic (replace with your real one)
  function expireCart() {
    console.log('Cart expired due to inactivity');
    // TODO: You can clear the cart using backend call here
  }

  // Exit hides overlay
  exitBtn.addEventListener('click', () => {
    overlay.style.display = 'none';
  });

  // Reset timer on activity
  function resetInactivityTimer() {
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(showOverlayOnce, ONE_HOUR);
  }

  ['mousemove', 'keydown', 'scroll', 'touchstart'].forEach(evt =>
    window.addEventListener(evt, resetInactivityTimer)
  );

  // Start timer immediately
  resetInactivityTimer();
})();
