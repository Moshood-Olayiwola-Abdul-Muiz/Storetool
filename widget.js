(function () {
  // Only run after the page is fully loaded
  window.addEventListener("DOMContentLoaded", function () {
    // Create timer container
    const timerBox = document.createElement("div");
    timerBox.id = "urgentCartTimerBox";
    timerBox.style.position = "fixed";
    timerBox.style.bottom = "20px";
    timerBox.style.right = "20px";
    timerBox.style.background = "#000";
    timerBox.style.color = "#fff";
    timerBox.style.padding = "10px 20px";
    timerBox.style.borderRadius = "8px";
    timerBox.style.boxShadow = "0 4px 8px rgba(0,0,0,0.3)";
    timerBox.style.fontFamily = "Arial, sans-serif";
    timerBox.style.fontSize = "16px";
    timerBox.style.zIndex = "9999";
    timerBox.style.display = "none"; // hidden initially

    // Text content
    const timerText = document.createElement("span");
    timerText.textContent = "Hurry! Your cart will expire in ";
    timerBox.appendChild(timerText);

    // Countdown
    const countdown = document.createElement("span");
    countdown.id = "urgentCartCountdown";
    timerBox.appendChild(countdown);

    // Add to page
    document.body.appendChild(timerBox);

    // Inactivity timer (10 minutes)
    let secondsLeft = 600;
    let countdownStarted = false;
    let countdownInterval;

    function startCountdown() {
      if (countdownStarted) return;
      countdownStarted = true;
      timerBox.style.display = "block";

      countdownInterval = setInterval(() => {
        const minutes = Math.floor(secondsLeft / 60);
        const seconds = secondsLeft % 60;
        countdown.textContent = `${minutes}:${seconds
          .toString()
          .padStart(2, "0")}`;

        if (secondsLeft <= 0) {
          clearInterval(countdownInterval);
          timerBox.textContent = "Your cart has expired!";
        }

        secondsLeft--;
      }, 1000);
    }

    // Reset timer on user activity
    function resetTimer() {
      if (countdownInterval) clearInterval(countdownInterval);
      secondsLeft = 600;
      countdownStarted = false;
      timerBox.style.display = "none";
    }

    let inactivityTimeout;
    function handleActivity() {
      clearTimeout(inactivityTimeout);
      if (!countdownStarted) {
        inactivityTimeout = setTimeout(startCountdown, 5000); // 5 sec idle
      }
    }

    ["mousemove", "keydown", "scroll", "touchstart"].forEach((event) => {
      window.addEventListener(event, handleActivity);
    });

    handleActivity(); // initial call
  });
})();
