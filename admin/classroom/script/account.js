import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, getDocs,where, doc, setDoc, deleteDoc, getDoc, updateDoc, query, orderBy } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

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

const teacherFirstname = document.getElementById('teacher-firstname');
const teacherLastname = document.getElementById('teacher-lastname');
const teacherEmail = document.getElementById('teacher-email');
const changePasswordCheckbox = document.getElementById('change-pass');
const updateButton = document.getElementById('acc-btn-update');

const inputOldPassword = document.getElementById('input-old-pass');
const inputNewPassword = document.getElementById('input-new-pass');
const inputConfirmPassword = document.getElementById('input-confirm-new-pass');



async function fetchUserProfile() {
    const loggedInUserEmail = localStorage.getItem("loggedInUserEmail");
    if (!loggedInUserEmail) return;

    try {

        const q = query(collection(db, "teacher"), where("email", "==", loggedInUserEmail));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            let userFound = false;
            querySnapshot.forEach((doc) => {
                userFound = true;
                const teacherData = doc.data();
                const fieldFirstname = teacherData.firstname;
                const fieldLastname = teacherData.lastname;
                const fieldEmail = teacherData.email;
                const fieldPassword = teacherData.password;
                
                teacherFirstname.value = fieldFirstname || '';
                teacherLastname.value = fieldLastname || '';
                teacherEmail.value = fieldEmail || '';

            });
            if (!userFound) {
                return;
            }
        } else {
            return;
        }

        
    } catch (error) {
        console.error("Error fetching user data:", error);
        
    }


}






















document.addEventListener('DOMContentLoaded', (event) => {

    fetchUserProfile();
    
    
    changePasswordCheckbox.addEventListener('change', function() {
        var form = document.getElementById('form-change-password');
        if (this.checked) {
            form.style.display = 'block';
        } else {
            form.style.display = 'none';
        }
    });


});