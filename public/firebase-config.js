import { initializeApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyBVhXhIzpH_-DjmqeSs-W3tsaqMTcgmd1Q",
    authDomain: "jobplacer-edeaf.firebaseapp.com",
    projectId: "jobplacer-edeaf",
    storageBucket: "jobplacer-edeaf.firebasestorage.app",
    messagingSenderId: "811286727180",
    appId: "1:811286727180:web:46f31c9a4912fb48d93c29"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);