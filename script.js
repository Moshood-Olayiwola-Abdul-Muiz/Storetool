// == UrgentCart Lite Script v1.0 ==
// This script adds a countdown overlay after 1hr of inactivity and allows user to exit it cleanly.

let inactivityTime = 0;
const maxInactivity = 60 * 60; // 1 hour in seconds

// Create the overlay DOM
const overlay = document.createElement("div");
overlay.style.position = "fixed";
overlay.style.top = 0;
overlay.style.left = 0;
overlay.style.width = "100%";
overlay.style.height = "100%";
overlay.style.backgroundColor = "rgba(0, 0, 0, 0.85)";
overlay.style.zIndex = "9999";
overlay.style.display = "flex";
overlay.style.flexDirection = "column";
overlay.style.justifyContent = "center";
overlay.style.alignItems = "center";
overlay.style.color = "#fff";
overlay.style.fontFamily = "sans-serif";
overlay.style.textAlign = "center";
overlay.style.padding = "20px";
overlay.style.boxSizing = "border-box";
overlay.style.display = "none";

// Message
const message = document.createElement("div");
message.innerText = "Product will be automatically removed from cart after session timeout";
message.style.fontSize = "18px";
message.style.marginBottom = "20px";

// Exit Button
const exitButton = document.createElement("button");
exitButton.innerText = "Exit";
exitButton.style.padding = "10px 20px";
exitButton.style.fontSize = "16px";
exitButton.style.border = "none";
exitButton.style.borderRadius = "5px";
exitButton.style.cursor = "pointer";
exitButton.style.backgroundColor = "#ffffff";
exitButton.style.color = "#000000";

// Exit behavior
exitButton.onclick = () => {
    overlay.style.display = "none";
    inactivityTime = 0; // Reset inactivity
};

// Countdown Timer
const countdown = document.createElement("div");
countdown.style.position = "absolute";
countdown.style.bottom = "20px";
countdown.style.fontSize = "16px";
countdown.innerText = "";

// Append all
overlay.appendChild(message);
overlay.appendChild(exitButton);
overlay.appendChild(countdown);
document.body.appendChild(overlay);

// Timer logic
function formatTimeLeft(secondsLeft) {
    const minutes = Math.floor(secondsLeft / 60).toString().padStart(2, '0');
    const seconds = (secondsLeft % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
}

function updateCountdown() {
    const secondsLeft = Math.max(0, maxInactivity - inactivityTime);
    countdown.innerText = `Section expires in ${formatTimeLeft(secondsLeft)}`;
}

setInterval(() => {
    inactivityTime++;

    if (inactivityTime >= maxInactivity) {
        overlay.style.display = "flex";
    }

    if (overlay.style.display === "flex") {
        updateCountdown();
    }
}, 1000);

// Reset on activity
["mousemove", "keydown", "scroll", "touchstart"].forEach(evt =>
    document.addEventListener(evt, () => {
        if (overlay.style.display === "none") {
            inactivityTime = 0;
        }
    })
);
