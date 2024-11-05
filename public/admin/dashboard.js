import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, getDocs, where, query } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

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

const logoutButton = document.getElementById('btnlogout');
logoutButton.addEventListener('click', () => {
    localStorage.removeItem("isLoggedIn");
    window.location.href = "/index.php";
});

// Check if the user is logged in
window.onload = () => {
    if (localStorage.getItem("isLoggedIn") !== "true") {
        window.location.href = "/index.php";
    }
};

document.addEventListener('DOMContentLoaded', async () => {

    const loggedInUserEmail = localStorage.getItem("loggedInUserEmail");
    
    const q = query(collection(db, "teacher"), where("email", "==", loggedInUserEmail));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((docSnapshot) => {
        const accType = docSnapshot.data().type;
        if (accType === 'instructor') {
            window.location.href = "/index.php";
        }
    });
});
