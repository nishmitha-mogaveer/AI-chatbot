import { auth } from "./firebase-config.js";

import {
    GoogleAuthProvider,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";

const googleBtn = document.getElementById("google-btn");
const authBtn = document.getElementById("auth-btn");
const switchBtn = document.getElementById("switch-btn");

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

const message = document.getElementById("message");
const formTitle = document.getElementById("form-title");
const formSubtitle = document.getElementById("form-subtitle");

let isSignUp = false;


// Google Login
googleBtn.addEventListener("click", async () => {

    try {

        const provider = new GoogleAuthProvider();

        await signInWithPopup(auth, provider);

        window.location.href = "dashboard.html";

    } catch (error) {

        message.textContent = error.message;

    }

});


// Email Login / Signup
authBtn.addEventListener("click", async () => {

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    if (!email || !password) {
        message.textContent = "Please enter email and password.";
        return;
    }

    if (password.length < 6) {
        message.textContent = "Password must contain at least 6 characters.";
        return;
    }

    try {

        if (isSignUp) {

            await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

        } else {

            await signInWithEmailAndPassword(
                auth,
                email,
                password
            );

        }

        window.location.href = "dashboard.html";

    } catch (error) {

        message.textContent = error.message;

    }

});


// Switch Login / Signup
switchBtn.addEventListener("click", () => {

    isSignUp = !isSignUp;

    if (isSignUp) {

        formTitle.textContent = "Create Account";
        formSubtitle.textContent = "Create your JobPlacer account";
        authBtn.textContent = "Create Account";
        switchBtn.textContent = "Sign In";
        document.getElementById("switch-text").textContent="Already have an account?";

    } else {

        formTitle.textContent = "Sign in";
        formSubtitle.textContent = "Access your JobPlacer account";
        authBtn.textContent = "Sign In";
        switchBtn.textContent = "Create Account";
       document.getElementById("switch-text").textContent="Don't have an account?";
    }

});