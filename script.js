
function activateTimer() {
  let timeLeft = 30;
  const timerElement = document.getElementById("timer");
  timerElement.textContent = `Time left: ${timeLeft}s`;

  const interval = setInterval(() => {
    timeLeft--;
    timerElement.textContent = `Time left: ${timeLeft}s`;
    if (timeLeft <= 0) {
      clearInterval(interval);
      timerElement.textContent = "Cart expired!";
    }
  }, 1000);
}
