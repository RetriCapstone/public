import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

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

// Fetch courses and render
async function getCourses() {
    const selectedClassroomId = localStorage.getItem("selectedClassroomId");
    const teacherId = localStorage.getItem("teacherId");
    if (!selectedClassroomId || !teacherId) return;

    try {
        const classroomDocRef = collection(db, 'teacher', teacherId, 'classroom', selectedClassroomId, 'course');
        const courseSnapshot = await getDocs(classroomDocRef);
        const courseListContainer = document.querySelector('.course-list-container');
        courseListContainer.innerHTML = ''; // Clear any existing courses

        courseSnapshot.forEach((courseDoc) => {
            const courseName = courseDoc.id;

            const courseCard = document.createElement('div');
            courseCard.className = 'style-card-1';
            courseCard.innerHTML = `<h2 class="course-name">${courseName}</h2>`;

            courseCard.addEventListener('click', () => {
                window.location.href = "module.php";
            });

            courseListContainer.appendChild(courseCard);
        });
    } catch (error) {
        console.error("Error getting courses:", error);
    }
}

// Modal management class
class Modal {
    constructor(modalId, triggerId, closeClass) {
        this.modal = document.getElementById(modalId);
        this.btn = document.getElementById(triggerId);
        this.span = document.getElementsByClassName(closeClass)[0];

        if (this.btn && this.span && this.modal) {
            this.openModal = this.openModal.bind(this);
            this.closeModal = this.closeModal.bind(this);
            this.outsideClick = this.outsideClick.bind(this);

            this.btn.addEventListener('click', this.openModal);
            this.span.addEventListener('click', this.closeModal);
            window.addEventListener('click', this.outsideClick);
        } else {
            console.error(`Elements not found for modal: ${modalId}, trigger: ${triggerId}, close: ${closeClass}`);
        }
    }

    openModal() {
        this.modal.style.display = "block";
    }

    closeModal() {
        this.modal.style.display = "none";
    }

    outsideClick(event) {
        if (event.target === this.modal) {
            this.modal.style.display = "none";
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    getCourses();
    new Modal("modal-create-course", "btn-create-course", "close-modal");
    new Modal("modal-create-module", "btn-create-module", "close-modal");
});
