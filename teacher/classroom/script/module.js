import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, getDocs, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

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

async function getLectures(moduleId) {
    const lectureCollectionRef = collection(db, 'teacher', teacherId, 'classroom', selectedClassroomId, 'module', moduleId, 'lecture');
    const lectureSnapshot = await getDocs(lectureCollectionRef);
    let lectureName = '';
    lectureSnapshot.forEach((lectureDoc) => {
        lectureName = lectureDoc.id;
    });
    return lectureName;
}

async function getQuiz(moduleId) {
    const quizCollectionRef = collection(db, 'teacher', teacherId, 'classroom', selectedClassroomId, 'module', moduleId, 'quiz');
    const quizSnapshot = await getDocs(quizCollectionRef);
    let quizName = '';
    quizSnapshot.forEach((quizDoc) => {
        quizName = quizDoc.id;
    });
    return quizName;
}

async function getActivity(moduleId) {
    const activityCollectionRef = collection(db, 'teacher', teacherId, 'classroom', selectedClassroomId, 'module', moduleId, 'activity');
    const activitySnapshot = await getDocs(activityCollectionRef);
    let activityName = '';
    activitySnapshot.forEach((activityDoc) => {
        activityName = activityDoc.id;
    });
    return activityName;
}

async function getClassroomName() {
    if (!selectedClassroomId || !teacherId) {
        console.error("Missing required identifiers");
        return;
    }

    try {
        document.getElementById('classroom-name').innerText = selectedClassroomId;
    } catch (error) {
        console.error("Error getting course name:", error);
    }
}

async function getModules() {
    if (!selectedClassroomId || !teacherId ) {
        console.error("Missing required identifiers");
        return;
    }

    try {
        const loadingIndicator = document.querySelector('.loading-indicator');
        loadingIndicator.style.display = 'block';  // Show loading indicator
        const moduleCollectionRef = collection(db, 'teacher', teacherId, 'classroom', selectedClassroomId, 'module');
        const moduleSnapshot = await getDocs(moduleCollectionRef);

        if (moduleSnapshot.empty) {
            console.log("No modules found");
            loadingIndicator.style.display = 'none';  // Hide loading indicator if no modules
            return;
        }

        const modules = moduleSnapshot.docs.map(async (moduleDoc) => {
            const moduleId = moduleDoc.id;
            const [lectureName, quizName, activityName] = await Promise.all([
                getLectures(moduleId),
                getQuiz(moduleId),
                getActivity(moduleId)
            ]);

            return `
                <div class="style-card-2">
                    <div class="style-header">
                        <div class="style-display">
                            <p class="style-text">Module</p>
                            <h4 class="style-text" id="module-name">${moduleId}</h4>
                        </div>
                        <div class="style-display">
                            <i class="fa-solid fa-ellipsis-vertical"></i>
                        </div>
                    </div>
                    <div class="module-list-content">
                        ${lectureName ? `
                        <div class="module-item">
                            <a href="module/lecture.php" target="_blank">
                                <p class="style-text" id="lecture-name">Lecture: ${lectureName}</p>
                            </a>
                        </div>` : ''}

                        ${quizName ? `
                        <div class="module-item">
                            <a href="module/quiz.php" target="_blank">
                                <p class="style-text" id="quiz-name">Quiz: ${quizName}</p>
                            </a>
                        </div>` : ''}

                        ${activityName ? `
                        <div class="module-item">
                            <a href="module/coding.php" target="_blank">
                                <p class="style-text" id="activity-name">Coding activity: ${activityName}</p>
                            </a>
                        </div>` : ''}
                        
                        <div id="create-module-item" class="module-item add-module">
                            <p class="style-text">
                                <i class="fa-solid fa-plus" ></i>&nbsp;add item
                            </p>
                        </div>
                    </div>
                </div>
            `;
        });

        const modulesHTML = (await Promise.all(modules)).join('');
        document.querySelector('.modules-container').innerHTML = modulesHTML;
        loadingIndicator.style.display = 'none';  // Hide loading indicator after all modules are loaded

        // Initialize ModuleItemModal after modules are loaded
        new ModuleItemModal("modal-create-module-item", "create-module-item", "close-module-item","cancel-module-item-modal");
    } catch (error) {
        console.error("Error getting modules:", error);
        document.querySelector('.loading-indicator').style.display = 'none';  // Hide loading indicator in case of error
    }
}

class Modal {
    constructor(modalId, triggerId, closeClass, cancelId) {
        this.modal = document.getElementById(modalId);
        this.btn = document.getElementById(triggerId);
        this.span = document.getElementsByClassName(closeClass)[0];
        this.cancelBtn = document.getElementById(cancelId);

        if (this.btn && this.span && this.modal) {
            this.openModal = this.openModal.bind(this);
            this.closeModal = this.closeModal.bind(this);
            this.outsideClick = this.outsideClick.bind(this);

            this.btn.addEventListener('click', this.openModal);
            this.span.addEventListener('click', this.closeModal);
            this.cancelBtn.addEventListener('click', this.closeModal);
            window.addEventListener('click', this.outsideClick);
        } else {
            console.error(`Elements not found for modal: ${modalId, triggerId, closeClass}`);
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

class ModuleItemModal {
    constructor(modalId, triggerId, closeClass, cancelId) {
        this.modal = document.getElementById(modalId);
        this.btn = document.getElementById(triggerId);
        this.span = document.getElementsByClassName(closeClass)[0];
        this.cancelBtn = document.getElementById(cancelId);

        if (this.btn && this.span && this.modal) {
            this.openModal = this.openModal.bind(this);
            this.closeModal = this.closeModal.bind(this);
            this.outsideClick = this.outsideClick.bind(this);

            this.btn.addEventListener('click', this.openModal);
            this.span.addEventListener('click', this.closeModal);
            this.cancelBtn.addEventListener('click', this.closeModal);
            window.addEventListener('click', this.outsideClick);
        } else {
            console.error(`Elements not found for modal: ${modalId, triggerId, closeClass}`);
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



async function createModule(event) {
    event.preventDefault();

    const moduleNameInput = document.getElementById('module-name');
    const moduleName = moduleNameInput.value.trim();

    if (!moduleName) {
        alert('Please enter a module name.');
        return;
    }

    const moduleDocRef = doc(db, 'teacher', teacherId, 'classroom', selectedClassroomId, 'module', moduleName);

    try {
        await setDoc(moduleDocRef, {});
        alert('Module created successfully');
        getModules();  // Refresh the module list
        moduleNameInput.value = '';  // Clear the input field
        document.getElementById('modal-create-module').style.display = 'none';  // Close the modal
    } catch (error) {
        console.error('Error creating module:', error);
        alert('Error creating module. Please try again.');
    }
}

async function createModuleItem(event) {
    event.preventDefault();
    
}

document.addEventListener('DOMContentLoaded', () => {
    getModules();
    getClassroomName();
    new Modal("modal-create-module", "btn-create-module", "close-modal","cancel-modal");

    const createModuleForm = document.getElementById('create-module-form');
    createModuleForm.addEventListener('submit', createModule);
});
