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

// Modal management
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

// Fetch classrooms and render
async function getClassrooms() {
    const loggedInUserEmail = localStorage.getItem("loggedInUserEmail");
    if (!loggedInUserEmail) return;

    try {
        const q = query(collection(db, "teacher"), where("email", "==", loggedInUserEmail));
        const querySnapshot = await getDocs(q);
        const classListContainer = document.querySelector('.class-list-container');
        classListContainer.innerHTML = ''; // Clear any existing classrooms

        for (const doc of querySnapshot.docs) {
            const classroomCollection = collection(db, 'teacher', doc.id, 'classroom');
            const classroomSnapshot = await getDocs(classroomCollection);

            classroomSnapshot.forEach((classroomDoc) => {
                const className = classroomDoc.id;
                const classData = classroomDoc.data();
                const classCode = classData.code;

                const classCard = document.createElement('div');
                classCard.className = 'style-card-1';
                classCard.innerHTML = `
                    <div class="style-display">
                        <h3 class="class-name">Classroom: ${className}</h3>
                        <span class="class-code">Code: ${classCode}</span>
                    </div>
                `;

                classCard.addEventListener('click', () => {
                    localStorage.setItem("selectedClassroomId", classroomDoc.id);
                    localStorage.setItem("selectedClassroomCode", classData.code);
                    localStorage.setItem("teacherId", doc.id);
                    window.location.href = "student.php";
                });

                classListContainer.appendChild(classCard);
            });
        }
    } catch (error) {
        console.error("Error getting classrooms:", error);
    }
}

// Create classroom
async function createClassroom(event) {
    event.preventDefault();

    const loggedInUserEmail = localStorage.getItem("loggedInUserEmail");
    if (!loggedInUserEmail) return;

    const className = document.getElementById("classname").value;
    const classCode = document.getElementById("classcode").value;

    try {
        const q = query(collection(db, "teacher"), where("email", "==", loggedInUserEmail));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            const teacherDoc = querySnapshot.docs[0];
            const teacherId = teacherDoc.id;

            const newClassroomRef = doc(db, 'teacher', teacherId, 'classroom', className);
            await setDoc(newClassroomRef, { code: classCode });

            // Refresh the classroom list
            getClassrooms();

            // Close the modal
            document.getElementById("modal-create-classroom").style.display = "none";
        }
    } catch (error) {
        console.error("Error creating classroom:", error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    setupModal("modal-create-classroom", "btn-create-classroom", "close-modal", "cancel-modal");
    getClassrooms();

    // Handle form submission
    document.getElementById("create-class-form").addEventListener("submit", createClassroom);
});
