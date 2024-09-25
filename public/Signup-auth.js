import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, query, where, getDocs, addDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Initialize Firebase
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

const saveloadingIndicator = document.querySelector('.save-loading-indicator-bg');
const signUp = document.getElementById('signUpForm');

let userFound = false;

signUp.addEventListener('submit', async (e) => {
    e.preventDefault();
    saveloadingIndicator.style.display = 'block'; // Show loading indicator

    const signupFirstname = document.getElementById('input-firstname').value.trim();
    const signupLastname = document.getElementById('input-lastname').value.trim();
    const signupEmail = document.getElementById('input-email').value.trim();
    const signupCode = document.getElementById('input-code').value.trim();
    const signupPassword = document.getElementById('input-password').value;
    const signupConfirmPass = document.getElementById('input-confirm-password').value;

    // Step 1: Check if passwords match
    if (signupPassword !== signupConfirmPass) {
        alert('Passwords do not match!');
        saveloadingIndicator.style.display = 'none'; // Hide loading indicator
        return;
    }

    try {
        // Step 2: Check if the signup code matches
        const adminCollectionRef = collection(db, 'admin');
        const adminSnapshot = await getDocs(adminCollectionRef);
        let codeMatched = false;

        for (const adminDoc of adminSnapshot.docs) {
            const teacherCollectionRef = collection(db, 'admin', adminDoc.id, 'teacher');
            const teacherQuery = query(teacherCollectionRef, where('code', '==', signupCode));
            const teacherSnapshot = await getDocs(teacherQuery);

            if (!teacherSnapshot.empty) {
                codeMatched = true;
                break;
            }
        }

        if (!codeMatched) {
            alert('Invalid Instructor Code');
            saveloadingIndicator.style.display = 'none'; // Hide loading indicator
            return;
        }

        // Step 3: If all checks are successful, sign up the user
        const newTeacherData = {
            email: signupEmail,
            firstname: signupFirstname,
            lastname: signupLastname,
            password: signupPassword // In a real application, consider hashing passwords for security
        };

        // Save the new teacher account
        const teacherCollectionRef = collection(db, 'teacher');
        await addDoc(teacherCollectionRef, newTeacherData);


        alert('Signup successful!');
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("loggedInUserEmail", signupEmail); // Store the logged-in user's email
        window.location.href = "/teacher/classroom/classroom.php";

    } catch (error) {
        console.error('Error during signup:', error);
        alert('An error occurred during signup. Please try again.');
    } finally {
        saveloadingIndicator.style.display = 'none'; // Hide loading indicator
    }
});



const togglePassword = document.getElementById('togglePassword');
const toggleConfirmPassword = document.getElementById('toggleConPassword');

const passwordField = document.getElementById('input-password');
const ConfirmPasswordField = document.getElementById('input-confirm-password');

togglePass(togglePassword, passwordField)
togglePass(toggleConfirmPassword, ConfirmPasswordField)

function togglePass(icon, inputField) {
    
    icon.addEventListener('click', () => {
        const type = inputField.getAttribute('type') === 'password' ? 'text' : 'password';
        inputField.setAttribute('type', type);
        icon.classList.toggle('bxs-show');
        icon.classList.toggle('bxs-hide');
    });
}