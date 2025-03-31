async function sendMessage() {
    const userInput = document.getElementById("userInput");
    const chatLog = document.getElementById("chatLog");

    const userMessage = userInput.value.trim();
    if (!userMessage) return;

    // Display user message
    const userDiv = document.createElement("div");
    userDiv.classList.add("user-message");
    userDiv.innerHTML = `<strong>You:</strong> ${userMessage}`;
    chatLog.appendChild(userDiv);

    // Clear input
    userInput.value = "";

    try {
        const response = await fetch("/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: userMessage })
        });

        const data = await response.json();
        const botReply = data.reply || "No response received.";

        // Display bot's response
        const botDiv = document.createElement("div");
        botDiv.classList.add("bot-message");
        botDiv.innerHTML = `<strong>Bot:</strong> ${botReply}`;
        chatLog.appendChild(botDiv);

        // Auto-scroll to bottom
        chatLog.scrollTop = chatLog.scrollHeight;
    } catch (error) {
        console.error("Error:", error);
        const errorDiv = document.createElement("div");
        errorDiv.classList.add("bot-message");
        errorDiv.innerHTML = `<strong>Bot:</strong> Error occurred.`;
        chatLog.appendChild(errorDiv);
    }
}

// Send message on Enter key press
document.getElementById("userInput").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});
