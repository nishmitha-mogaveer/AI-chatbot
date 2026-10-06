
import { auth } from "./firebase-config.js";

import {
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";

const userInfo = document.getElementById("user-info");
const logoutBtn = document.getElementById("logout-btn");


// Check login
onAuthStateChanged(auth, (user) => {

    if (user) {

        userInfo.textContent =
            `Welcome, ${user.displayName || user.email}`;

    } else {

        window.location.href = "index.html";

    }

});


// Logout
logoutBtn.addEventListener("click", async () => {

    await signOut(auth);

    window.location.href = "index.html";

});


// Chatbot
async function sendMessage() {

    const input = document.getElementById("user-input");
    const chatBox = document.getElementById("chat-box");

    const message = input.value.trim();

    if (!message) return;

    const userMessage = document.createElement("div");

    userMessage.className = "user-message";
    userMessage.textContent = message;

    chatBox.appendChild(userMessage);

    input.value = "";

    try {

        const response = await fetch("/api/chat", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                message: message
            })

        });

        const data = await response.json();

        const botMessage = document.createElement("div");

        botMessage.className = "bot-message";
       botMessage.innerHTML=marked.parse(data.reply);

        chatBox.appendChild(botMessage);

        chatBox.scrollTop = chatBox.scrollHeight;

    } catch (error) {

        console.error(error);

        const botMessage = document.createElement("div");

        botMessage.className = "bot-message";

        botMessage.textContent =
            "Sorry, something went wrong. Please try again.";

        chatBox.appendChild(botMessage);

    }

}

window.sendMessage = sendMessage;
function quickQuestion(question) {

    const input = document.getElementById("user-input");

    input.value = question;

    sendMessage();
}

window.quickQuestion = quickQuestion;