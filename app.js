const chatInput = document.querySelector(".chat-input textarea");
const sendBtn = document.getElementById("send-btn");
const stopBtn = document.getElementById("stop-btn"); // Stop button
const chatbox = document.querySelector(".chatbox");
const chatContainer = document.querySelector(".chatContainer");

let userMessage;
let typingInterval; // Variable to store the typing interval

const createChatLi = (message, className) => {
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", className);
    let chatContent = className === "outgoing" 
        ? `<p></p>` 
        : `<span class="material-symbols-outlined">smart_toy</span><p></p>`;
    chatLi.innerHTML = chatContent;
    chatLi.querySelector("p").textContent = message;
    return chatLi;
}

const scrollToBottom = () => {
    chatContainer.scrollTo({
        top: chatContainer.scrollHeight,
        behavior: "smooth"
    });
}

const simulateTyping = (messageElement, text, speed = 16) => {
    let index = 0;
    messageElement.textContent = '';  // Clear the message before typing it out
    stopBtn.style.display = 'inline-block';  // Show the stop button when typing starts

    typingInterval = setInterval(() => {
        if (index < text.length) {
            messageElement.textContent += text.charAt(index);
            index++;

            // Automatically scroll down to keep new messages visible
            chatContainer.scrollTop = chatContainer.scrollHeight;
        } else {
            clearInterval(typingInterval);
            stopBtn.style.display = 'none';  // Hide the stop button when typing is complete
        }
    }, speed);
};

const generateResponse = (incomingChatLi) => {
    const messageElement = incomingChatLi.querySelector("p");

    const API_URL = "http://127.0.0.1:5000/ask";
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: userMessage })  
    };

    fetch(API_URL, requestOptions)
        .then(res => res.json())
        .then(data => {
            const answer = data.answer;
            simulateTyping(messageElement, answer);
        })
        .catch(() => {
            messageElement.textContent = "Oops! Something went wrong. Please try again.";
        })
        .finally(() => scrollToBottom()); // Ensure scrolling after the message is typed
}

const handleChat = () => {
    userMessage = chatInput.value.trim();
    if (!userMessage) return;

    // Append the user's message to the chatbox
    const outgoingChatLi = createChatLi(userMessage, "outgoing");
    chatbox.appendChild(outgoingChatLi);
    scrollToBottom();  // Scroll immediately to the new outgoing message

    setTimeout(() => {
        // Display "Thinking..." message while waiting for response
        const incomingChatLi = createChatLi("Thinking...", "incoming");
        chatbox.appendChild(incomingChatLi);
        scrollToBottom();
        generateResponse(incomingChatLi);
    }, 600);

    // Clear the text area after submitting
    chatInput.value = "";
}

const stopTyping = () => {
    clearInterval(typingInterval); // Stop the typing interval
    stopBtn.style.display = 'none'; // Hide the stop button
};

chatInput.addEventListener("input", () => {
    chatInput.style.height = `${Math.min(chatInput.scrollHeight, 60)}px`;
});

chatInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        handleChat();
    }
});

sendBtn.addEventListener("click", handleChat);
stopBtn.addEventListener("click", stopTyping);
