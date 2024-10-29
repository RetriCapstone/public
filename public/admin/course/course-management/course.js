import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, query, where, getDocs, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

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


async function getClassrooms() {
    const loggedInUserEmail = localStorage.getItem("loggedInUserEmail");
    if (!loggedInUserEmail) return;

    try {
        const loadingIndicator = document.querySelector('.loading-indicator');
        loadingIndicator.style.display = 'block'; 

        const q = query(collection(db, "teacher"), where("email", "==", loggedInUserEmail));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            console.log("No Classroom found");
            loadingIndicator.style.display = 'none'; 
            return;
        }

        const classListContainer = document.querySelector('.class-list-container');
        classListContainer.innerHTML = '';

        const classrooms = [];

        for (const doc of querySnapshot.docs) {
            const classroomCollection = collection(db, 'course');
            const classroomSnapshot = await getDocs(classroomCollection);

            classroomSnapshot.forEach((classroomDoc) => {
                const classId = classroomDoc.id;
                const classData = classroomDoc.data();
                const className = classData.name;

                classrooms.push({ docId: doc.id, className, classroomDocId: classId });
            });
        }

        classrooms.forEach(classroom => {
            const classCard = document.createElement('div');
            classCard.className = 'style-card-1';
            classCard.innerHTML = `
                <div class="style-display">
                    <h3 class="class-name">Course: ${classroom.className}</h3>
                </div>
            `;
            classCard.addEventListener('click', () => {
                const url = `course-modules.php?Cid=${encodeURIComponent(classroom.classroomDocId)}&tid=${encodeURIComponent(classroom.docId)}`;
                window.location.href = url;
            });

            classListContainer.appendChild(classCard);
        });

        loadingIndicator.style.display = 'none';  
    } catch (error) {
        console.error("Error getting classrooms:", error);
        document.querySelector('.loading-indicator').style.display = 'none';  
    }
}

const saveloadingIndicator= document.querySelector('.save-loading-indicator-bg');
// Create classroom
async function createCourse(event) {
    event.preventDefault();

    const loggedInUserEmail = localStorage.getItem("loggedInUserEmail");
    if (!loggedInUserEmail) return;

    saveloadingIndicator.style.display = 'block'; 
    const className = document.getElementById("classname").value.trim().toUpperCase();

    try {
        const teachersQuery = query(collection(db, "teacher"));
        const teachersSnapshot = await getDocs(teachersQuery);

        let classCodeExists = false;

        for (const teacherDoc of teachersSnapshot.docs) {
            const teacherId = teacherDoc.id;

            const classCodeQuery = query(
                collection(db, 'course'),
                where("name", "==", className)
            );
            const classCodeSnapshot = await getDocs(classCodeQuery);

            if (!classCodeSnapshot.empty) {
                classCodeExists = true;
                break; 
            }
        }

        if (classCodeExists) {
            saveloadingIndicator.style.display = 'none'; 
            alert("Invalid course. Please change the Course name.");
            return;
        }

        const loggedInTeacherQuery = query(collection(db, "teacher"), where("email", "==", loggedInUserEmail));
        const loggedInTeacherSnapshot = await getDocs(loggedInTeacherQuery);

        if (!loggedInTeacherSnapshot.empty) {
            const loggedInTeacherDoc = loggedInTeacherSnapshot.docs[0];
            const loggedInTeacherId = loggedInTeacherDoc.id;
            const newClassroomRef = doc(collection(db, 'course'));
            await setDoc(newClassroomRef, { name: className, developer: loggedInTeacherId });

            await saveLog(`Created a course (${className})`, loggedInTeacherId);
            saveloadingIndicator.style.display = 'none'; 
            getClassrooms();
            document.getElementById("modal-create-classroom").style.display = "none";
        }
    } catch (error) {
        saveloadingIndicator.style.display = 'none'; 
        console.error("Error creating classroom:", error);
    }
}



async function saveLog(action, teacherId) {
    try {
        const currentDate = new Date();
        const timestamp = currentDate.toLocaleString(); 
        const logEntry = {
            action: action,
            timestamp: timestamp
        };

        const logRef = doc(collection(db, 'teacher', teacherId, 'logs'));
        await setDoc(logRef, logEntry);

        console.log("Log saved:", logEntry);
    } catch (error) {
        console.error("Error saving log:", error);
    }
}


document.addEventListener('DOMContentLoaded', () => {
    setupModal("modal-create-classroom", "btn-create-classroom", "close-modal", "cancel-modal");
    getClassrooms();

    document.getElementById("create-course-form").addEventListener("submit", createCourse);  
});
