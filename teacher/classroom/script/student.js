import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, query, where, getDocs, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

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

// Fetch classroom name and code
async function getCourses() {
    const classroomNameLabel = document.getElementById("classroomName");
    const classroomCodeLabel = document.getElementById("classroomCode");

    const selectedClassroomId = localStorage.getItem("selectedClassroomId");
    const teacherId = localStorage.getItem("teacherId");
    if (!selectedClassroomId || !teacherId) return;

    try {
        const classroomDocRef = doc(db, 'teacher', teacherId, 'classroom', selectedClassroomId);
        const classroomDoc = await getDoc(classroomDocRef);

        if (classroomDoc.exists()) {
            const classroomData = classroomDoc.data();
            classroomNameLabel.textContent = selectedClassroomId;
            classroomCodeLabel.textContent = classroomData.code;
        } else {
            console.error("No such classroom document!");
        }
    } catch (error) {
        console.error("Error fetching classroom details:", error);
    }
}

document.addEventListener('DOMContentLoaded', (event) => {
    const studentBtn = document.getElementById('nav-btn-student');
    const requestBtn = document.getElementById('nav-btn-request');
    const studentContainer = document.querySelector('.container-students');
    const requestContainer = document.querySelector('.container-request');

    studentBtn.addEventListener('click', () => {
        // Show student container and hide request container
        studentContainer.style.display = 'block';
        requestContainer.style.display = 'none';

        // Update button styles
        studentBtn.classList.add('active-btn');
        requestBtn.classList.remove('active-btn');
    });

    requestBtn.addEventListener('click', () => {
        // Show request container and hide student container
        requestContainer.style.display = 'block';
        studentContainer.style.display = 'none';

        // Update button styles
        requestBtn.classList.add('active-btn');
        studentBtn.classList.remove('active-btn');
    });

    // Fetch classroom details on page load
    getCourses();
});
