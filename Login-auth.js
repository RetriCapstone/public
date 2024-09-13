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

const saveloadingIndicator= document.querySelector('.save-loading-indicator-bg');

const loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    saveloadingIndicator.style.display = 'block'; // Show loading indicator
    const email = document.getElementById('input-email').value;
    const password = document.getElementById('input-password').value;

    if (email && password) {
        try {
            const q = query(collection(db, "teacher"), where("email", "==", email));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                let userFound = false;
                querySnapshot.forEach((doc) => {
                    const userData = doc.data();
                    if (userData.password === password) {
                        userFound = true;
                        localStorage.setItem("isLoggedIn", "true");
                        localStorage.setItem("loggedInUserEmail", email); // Store the logged-in user's email
                        window.location.href = "teacher/classroom/classroom.php";
                        return; // Exit the function after successful login
                    }
                });
                
                if (!userFound) {
                    alert("Email or password is invalid.");
                }
            } else {
                alert("Email or password is invalid.");
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
            alert("Error logging in. Please try again.");
        } finally {
            saveloadingIndicator.style.display = 'none'; // Hide loading indicator
        }
    } 
});


const togglePassword = document.getElementById('togglePassword');
const passwordField = document.getElementById('input-password');

togglePassword.addEventListener('click', () => {
    const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordField.setAttribute('type', type);
    togglePassword.classList.toggle('bxs-show');
    togglePassword.classList.toggle('bxs-hide');
});

