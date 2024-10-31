import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, getDocs,query,where,addDoc, getDoc, deleteDoc, updateDoc, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

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


function setupModal(modalId, btnId, closeClass, btnCancel) {
    const modal = document.getElementById(modalId);
    const btn = document.getElementById(btnId);
    const span = document.getElementsByClassName(closeClass)[0];
    const cancel = document.getElementById(btnCancel);

    btn.onclick = () => modal.style.display = "block";
    span.onclick = () => modal.style.display = "none";
    cancel.onclick = () => modal.style.display = "none";
    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };
}

const reportsubject = document.getElementById('report-subject');
const reportdesc = document.getElementById('report-desc');
const featuredesc = document.getElementById('feature-desc');

async function submitReport(event) {
    event.preventDefault();
    const loggedInUserEmail = localStorage.getItem("loggedInUserEmail");
    if (!loggedInUserEmail) return;

    const inputSubject = reportsubject.value.trim();
    const inputDescription = reportdesc.value.trim();
    const accountType = 'Instructor';

    const saveloadingIndicator= document.querySelector('.save-loading-indicator-bg');
    try {
        saveloadingIndicator.style.display = 'block'; 
        const q = query(collection(db, "teacher"), where("email", "==", loggedInUserEmail));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            let userFound = false;
            let Firstname, Lastname, Email;

            querySnapshot.forEach((doc) => {
                userFound = true;
                const teacherData = doc.data();
                Firstname = teacherData.firstname;
                Lastname = teacherData.lastname;
                Email = teacherData.email;
            });

            if (!userFound) {
                return; // User not found, stop execution
            }

            // Get the current date and time
            const timeStamp = new Date();

            // Create the report data
            const reportData = {
                email: Email,
                fullname: `${Lastname}, ${Firstname}`,
                subject: inputSubject,
                description: inputDescription,
                type: accountType,
                timeStamp: timeStamp,
                platform: 'Website'
            };

            // Submit the report to Firestore under the "help" collection
            await addDoc(collection(db, "help"), reportData);

            console.log("Report submitted successfully!");

            // Optionally, reset the form fields after submission
            reportsubject.value = '';
            reportdesc.value = '';
            saveloadingIndicator.style.display = 'none'; 
        } else {
            saveloadingIndicator.style.display = 'none'; 
            console.log("No matching user found.");
        }

    } catch (error) {
        saveloadingIndicator.style.display = 'none'; 
        console.error("Error fetching user data or submitting report:", error);
    }
}

async function submitFeature(event) {
    event.preventDefault();
    const loggedInUserEmail = localStorage.getItem("loggedInUserEmail");
    if (!loggedInUserEmail) return;

    const inputDescription = featuredesc.value.trim();
    const accountType = 'Instructor';

    const saveloadingIndicator= document.querySelector('.save-loading-indicator-bg-feat');
    try {
        saveloadingIndicator.style.display = 'block'; 
        const q = query(collection(db, "teacher"), where("email", "==", loggedInUserEmail));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            let userFound = false;
            let Firstname, Lastname, Email;

            querySnapshot.forEach((doc) => {
                userFound = true;
                const teacherData = doc.data();
                Firstname = teacherData.firstname;
                Lastname = teacherData.lastname;
                Email = teacherData.email;
            });

            if (!userFound) {
                return; 
            }

            const timeStamp = new Date();
            const reportData = {
                email: Email,
                fullname: `${Lastname}, ${Firstname}`,
                description: inputDescription,
                type: accountType,
                timeStamp: timeStamp,
                platform: 'Website'
            };

            await addDoc(collection(db, "feature"), reportData);

            console.log("Report submitted successfully!");

            saveloadingIndicator.style.display = 'none'; 
            reportsubject.value = '';
            reportdesc.value = '';
        } else {
            console.log("No matching user found.");
            saveloadingIndicator.style.display = 'none'; 
        }

    } catch (error) {
        console.error("Error fetching user data or submitting report:", error);
        saveloadingIndicator.style.display = 'none'; 
    }
}


document.addEventListener('DOMContentLoaded', () => {
    setupModal("modal-feature", "btn-feature", "close-feature", "cancel-feature");
    setupModal("modal-report", "btn-report", "close-report", "cancel-report");
        
    document.getElementById("submit-report").addEventListener("submit", submitReport);
    document.getElementById("submit-feature").addEventListener("submit", submitFeature);
});
