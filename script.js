// ───── Storetool Inactivity Overlay ─────
(function () {
  const ONE_HOUR = 60 * 60 * 1000;
  const FORM_SHOWN_KEY = 'storetoolOverlayShown';
  let inactivityTimer;

  const overlay = document.createElement('div');
  overlay.id = 'storetoolOverlay';
  Object.assign(overlay.style, {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
    color: 'white',
    display: 'none',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    zIndex: 9999,
    fontFamily: 'Arial, sans-serif'
  });

  const exitBtn = document.createElement('button');
  exitBtn.textContent = 'Exit';
  Object.assign(exitBtn.style, {
    padding: '12px 24px',
    fontSize: '18px',
    backgroundColor: '#fff',
    color: '#000',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer'
  });

  overlay.appendChild(exitBtn);
  document.body.appendChild(overlay);

  function showOverlay() {
    if (!localStorage.getItem(FORM_SHOWN_KEY)) {
      overlay.style.display = 'flex';
      localStorage.setItem(FORM_SHOWN_KEY, 'true');
      console.log('🛒 Storetool overlay shown. Cart expired.');
    }
  }

  exitBtn.onclick = () => {
    overlay.style.display = 'none';
  };

  function resetTimer() {
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(showOverlay, ONE_HOUR);
  }

  ['mousemove', 'keydown', 'scroll', 'touchstart'].forEach(evt =>
    window.addEventListener(evt, resetTimer)
  );

  resetTimer();
})();