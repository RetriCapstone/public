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
        const loadingIndicator = document.querySelector('.loading-indicator');
        loadingIndicator.style.display = 'block';  // Show loading indicator

        const q = query(collection(db, "teacher"), where("email", "==", loggedInUserEmail));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            console.log("No Classroom found");
            loadingIndicator.style.display = 'none';  // Hide loading indicator if no classrooms
            return;
        }

        const classListContainer = document.querySelector('.class-list-container');
        classListContainer.innerHTML = ''; // Clear any existing classrooms

        const classrooms = [];

        for (const doc of querySnapshot.docs) {
            const classroomCollection = collection(db, 'teacher', doc.id, 'classroom');
            const classroomSnapshot = await getDocs(classroomCollection);

            classroomSnapshot.forEach((classroomDoc) => {
                const classId = classroomDoc.id;
                const classData = classroomDoc.data();
                const className = classData.name;
                const classCode = classData.code;

                classrooms.push({ docId: doc.id, className, classCode, classroomDocId: classroomDoc.id });
            });
        }

        classrooms.forEach(classroom => {
            const classCard = document.createElement('div');
            classCard.className = 'style-card-1';
            classCard.innerHTML = `
                <div class="style-display">
                    <h3 class="class-name">Classroom: ${classroom.className}</h3>
                    <span class="class-code">Code: ${classroom.classCode}</span>
                </div>
            `;

            classCard.addEventListener('click', () => {
                const url = `module.php?Cid=${encodeURIComponent(classroom.classroomDocId)}&tid=${encodeURIComponent(classroom.docId)}`;
                window.location.href = url;
            });

            classListContainer.appendChild(classCard);
        });

        loadingIndicator.style.display = 'none';  // Hide loading indicator after all classrooms are loaded
    } catch (error) {
        console.error("Error getting classrooms:", error);
        document.querySelector('.loading-indicator').style.display = 'none';  // Hide loading indicator in case of error
    }
}

// Create classroom
async function createClassroom(event) {
    event.preventDefault();

    const loggedInUserEmail = localStorage.getItem("loggedInUserEmail");
    if (!loggedInUserEmail) return;

    const className = document.getElementById("classname").value.trim().toUpperCase();
    const classCode = document.getElementById("classcode").value.trim();

    try {
        const q = query(collection(db, "teacher"), where("email", "==", loggedInUserEmail));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            const teacherDoc = querySnapshot.docs[0];
            const teacherId = teacherDoc.id;

            // Create a new document with a random ID in the "classroom" subcollection
            const newClassroomRef = doc(collection(db, 'teacher', teacherId, 'classroom'));
            await setDoc(newClassroomRef, { name: className, code: classCode });

            // Refresh the classroom list
            alert('Classroom created successfully');
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
