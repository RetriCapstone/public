import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDYAThg1ostKvmq6d0eFQaGaKywsjs-rEA",
    authDomain: "code-dojo-4e4e5.firebaseapp.com",
    databaseURL: "https://code-dojo-4e4e5-default-rtdb.firebaseio.com",
    projectId: "code-dojo-4e4e5",
    storageBucket: "code-dojo-4e4e5.appspot.com",
    messagingSenderId: "116382053512",
    appId: "1:116382053512:web:9df203d93ab781d9e09b3d",
    measurementId: "G-KR3DL2EF19"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const loginForm = document.getElementById('signUpForm');
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const signupFirstname = document.getElementById('input-firstname').value;
    const signupLastname = document.getElementById('input-lastname').value;
    const signupEmail = document.getElementById('input-email').value;
    const signupCode = document.getElementById('input-code').value;
    const signupPassword = document.getElementById('input-password').value;
    const signupConfirmPass = document.getElementById('input-confirm-password').value;



});

