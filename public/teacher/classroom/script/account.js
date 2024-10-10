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

async function updateUserProfile() {
    const inputFirstname = teacherFirstname.value.trim();
    const inputLastname = teacherLastname.value.trim();
    const inputEmail = teacherEmail.value.trim();
    const oldPassword = inputOldPassword.value.trim();
    const newPassword = inputNewPassword.value.trim();
    const confirmNewPassword = inputConfirmPassword.value.trim();
    const loggedInUserEmail = localStorage.getItem("loggedInUserEmail");

    // Early return if no logged in user
    if (!loggedInUserEmail) return;

    try {
        const q = query(collection(db, "teacher"), where("email", "==", loggedInUserEmail));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            let userFound = false;
            const loggedInTeacherDoc = querySnapshot.docs[0];
            const teacherId = loggedInTeacherDoc.id;
            
            // Update profile information (if changed)
            querySnapshot.forEach(async (doc) => {
                userFound = true;
                const teacherData = doc.data();
                const teacherPassword = teacherData.password;

                // Start the profile update object
                let updatedData = {};

                if (inputFirstname !== teacherData.firstname) {
                    updatedData.firstname = inputFirstname;
                }

                if (inputLastname !== teacherData.lastname) {
                    updatedData.lastname = inputLastname;
                }

                if (inputEmail !== teacherData.email) {
                    updatedData.email = inputEmail;
                }

                // If the password change checkbox is checked, validate and update password
                if (changePasswordCheckbox.checked) {
                    if (oldPassword !== teacherPassword) {
                        alert("Old password is incorrect");
                        return;
                    }

                    if (newPassword !== confirmNewPassword) {
                        alert("New password and confirm password do not match");
                        return;
                    }

                    if (newPassword.length < 6) {
                        alert("New password must be at least 6 characters long");
                        return;
                    }

                    updatedData.password = newPassword; 
                }

                if (Object.keys(updatedData).length > 0) {
                    const teacherDocRef = doc.ref;
                    await updateDoc(teacherDocRef, updatedData);
                    alert("Profile updated successfully");
                } else {
                    alert("No changes were made.");
                }
            });

            if (!userFound) {
                alert("User not found");
                return;
            }
        } else {
            alert("User not found in the database.");
            return;
        }

    } catch (error) {
        console.error("Error fetching user data:", error);
        alert("There was an error updating your profile.");
    }
}





















document.addEventListener('DOMContentLoaded', (event) => {

    fetchUserProfile();
    
    document.getElementById('acc-btn-update').addEventListener('click', function () {
        updateUserProfile();
    });
    
    changePasswordCheckbox.addEventListener('change', function() {
        var form = document.getElementById('form-change-password');
        if (this.checked) {
            form.style.display = 'block';
        } else {
            form.style.display = 'none';
        }
    });


});