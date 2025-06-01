import { useEffect, useState } from 'react';

export default function UrgentCartForm() {
  const [showForm, setShowForm] = useState(false);
  const ONE_HOUR = 60 * 60 * 1000; // 1 hour
  const FORM_SHOWN_KEY = 'urgentCartFormShown';
  let inactivityTimer;

  // Show form only if not shown before
  const handleInactivity = () => {
    if (!localStorage.getItem(FORM_SHOWN_KEY)) {
      setShowForm(true);
      localStorage.setItem(FORM_SHOWN_KEY, 'true');
      expireCart(); // trigger cart expiration when form shows
    }
  };

  // Set inactivity timer
  const resetInactivityTimer = () => {
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(handleInactivity, ONE_HOUR);
  };

  const expireCart = () => {
    console.log('Cart expired');
    alert('Cart expired due to 1 hour of inactivity.');
    // TODO: Add your real cart-clearing logic here
  };

  const handleExit = () => {
    setShowForm(false);
  };

  useEffect(() => {
    // Start listening for activity
    const events = ['mousemove', 'keydown', 'scroll', 'touchstart'];
    events.forEach(event => window.addEventListener(event, resetInactivityTimer));
    resetInactivityTimer();

    return () => {
      events.forEach(event => window.removeEventListener(event, resetInactivityTimer));
      clearTimeout(inactivityTimer);
    };
  }, []);

  if (!showForm) return null;

  return (
    <div style={styles.overlay}>
      <button style={styles.button} onClick={handleExit}>
        Exit
      </button>
    </div>
  );
}

const styles = {
  overlay: {
    position: 'fixed',
    top: 0, left: 0, bottom: 0, right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    zIndex: 9999,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    padding: '16px 32px',
    fontSize: '20px',
    cursor: 'pointer',
  }
};
