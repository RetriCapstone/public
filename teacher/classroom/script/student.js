import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, query, where, getDocs, doc, setDoc, getDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

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

const teacherId = localStorage.getItem("teacherId");
const selectedClassroomId = localStorage.getItem("selectedClassroomId");
const selectedClassroomName = localStorage.getItem("selectedClassroomName");

const loadingIndicator = document.querySelector('.loading-indicator');

async function getActiveStudents() {
    if (!selectedClassroomId || !teacherId) {
        console.error("Missing required identifiers");
        return;
    }

    try {
        loadingIndicator.style.display = 'block';

        const studentCollectionRef = collection(db, 'teacher', teacherId, 'classroom', selectedClassroomId, 'student');
        const studentSnapshot = await getDocs(studentCollectionRef);

        const activeStudentsContainer = document.querySelector('.container-students');
        activeStudentsContainer.innerHTML = '';

        for (const studentDoc of studentSnapshot.docs) {
            const studentId = studentDoc.id;
            const userDocRef = doc(db, 'users', studentId);
            const userDoc = await getDoc(userDocRef);
            const userData = userDoc.data();

            const studentElement = document.createElement('div');
            studentElement.className = 'style-student-list';
            studentElement.innerHTML = `
                <div style="display: flex; flex-direction: row; gap: 14px; align-items: center;">
                    <img src="" alt="" class="student-image" id="profile-image-student">
                    <p class="style-text" id="active-student-name">${userData.lastname}, ${userData.firstname}</p>
                </div>
                <i class="fa-solid fa-ellipsis-vertical"></i>
            `;

            activeStudentsContainer.appendChild(studentElement);
        }
        loadingIndicator.style.display = 'none';
    } catch (error) {
        console.error("Error getting active students:", error);
        loadingIndicator.style.display = 'none';
    }
}

async function getRequestStudents() {
    if (!selectedClassroomId || !teacherId) {
        console.error("Missing required identifiers");
        return;
    }

    try {
        loadingIndicator.style.display = 'block';

        const requestCollectionRef = collection(db, 'teacher', teacherId, 'classroom', selectedClassroomId, 'request');
        const requestSnapshot = await getDocs(requestCollectionRef);

        const requestStudentsContainer = document.querySelector('.container-request');
        requestStudentsContainer.innerHTML = '';

        for (const requestDoc of requestSnapshot.docs) {
            const studentId = requestDoc.id;
            const userDocRef = doc(db, 'users', studentId);
            const userDoc = await getDoc(userDocRef);
            const userData = userDoc.data();

            const requestElement = document.createElement('div');
            requestElement.className = 'style-student-list';
            requestElement.innerHTML = `
                <div style="display: flex; flex-direction: row; gap: 14px; align-items: center;">
                    <img src="" alt="" class="student-image">
                    <p class="style-text" id="request-student-name">${userData.lastname}, ${userData.firstname}</p>
                </div>
                <div style="gap: .8rem; display:flex; flex-direction:row;">
                    <button class="style-btn-add-1" id="btn-accept-student-${studentId}">Accept</button>
                    <button class="style-btn-del-1" id="btn-remove-student-${studentId}">Remove</button>
                </div>
            `;

            requestStudentsContainer.appendChild(requestElement);

            document.getElementById(`btn-accept-student-${studentId}`).addEventListener('click', () => acceptStudent(studentId));
            document.getElementById(`btn-remove-student-${studentId}`).addEventListener('click', () => removeStudent(studentId));
        }
        loadingIndicator.style.display = 'none';
    } catch (error) {
        console.error("Error getting request students:", error);
        loadingIndicator.style.display = 'none';
    }
}

async function acceptStudent(studentId) {
    try {
        const studentDocRef = doc(db, 'teacher', teacherId, 'classroom', selectedClassroomId, 'student', studentId);
        const requestDocRef = doc(db, 'teacher', teacherId, 'classroom', selectedClassroomId, 'request', studentId);

        // Move the student from 'request' to 'student'
        await setDoc(studentDocRef, {});

        // Delete the student from 'request'
        await deleteDoc(requestDocRef);

        // Add classroom info to the user's document
        const classroomDocRef = doc(db, 'users', studentId, 'classroom', selectedClassroomId);
        await setDoc(classroomDocRef, { teacher: teacherId });

        getRequestStudents();  // Refresh the request list
        getActiveStudents();   // Refresh the active students list
    } catch (error) {
        console.error('Error accepting student:', error);
        alert('Error accepting student. Please try again.');
    }
}

async function removeStudent(studentId) {
    try {
        const requestDocRef = doc(db, 'teacher', teacherId, 'classroom', selectedClassroomId, 'request', studentId);
        
        // Delete the student from 'request'
        await deleteDoc(requestDocRef);
        getRequestStudents();  // Refresh the request list
    } catch (error) {
        console.error('Error removing student:', error);
        alert('Error removing student. Please try again.');
    }
}

async function getClassroomName() {
    if (!selectedClassroomName || !teacherId) {
        console.error("Missing required identifiers");
        return;
    }

    try {
        document.getElementById('classroom-name').innerText = selectedClassroomName;
    } catch (error) {
        console.error("Error getting course name:", error);
    }
}

document.addEventListener('DOMContentLoaded', (event) => {
    getClassroomName(); 
    getActiveStudents();
    getRequestStudents();

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
});
