import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, getDocs, doc, setDoc, query, orderBy } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

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

async function getItems(moduleId, itemType) {
    const itemCollectionRef = collection(db, 'teacher', teacherId, 'classroom', selectedClassroomId, 'module', moduleId, itemType);
    const itemSnapshot = await getDocs(itemCollectionRef);
    const items = [];
    itemSnapshot.forEach((itemDoc) => {
        items.push(itemDoc.id);
    });
    return items;
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

async function getModules() {
    if (!selectedClassroomId || !teacherId) {
        console.error("Missing required identifiers");
        return;
    }

    try {
        const loadingIndicator = document.querySelector('.loading-indicator');
        loadingIndicator.style.display = 'block';  // Show loading indicator
        const moduleCollectionRef = collection(db, 'teacher', teacherId, 'classroom', selectedClassroomId, 'module');
        const moduleQuery = query(moduleCollectionRef, orderBy('number'));
        const moduleSnapshot = await getDocs(moduleQuery);

        if (moduleSnapshot.empty) {
            console.log("No modules found");
            loadingIndicator.style.display = 'none';  // Hide loading indicator if no modules
            return;
        }

        const modulesContainer = document.querySelector('.modules-container');
        modulesContainer.innerHTML = '';  // Clear the container before adding new content

        const modules = await Promise.all(moduleSnapshot.docs.map(async (moduleDoc) => {
            const moduleId = moduleDoc.id;
            const [lectures, quizzes, activities] = await Promise.all([
                getItems(moduleId, 'lecture'),
                getItems(moduleId, 'quiz'),
                getItems(moduleId, 'activity')
            ]);

            const lecturesHTML = lectures.map(lectureName => `
                <div class="module-item">
                    <a href="module/lecture.php" data-module-id="${moduleId}" data-item-name="${lectureName}">
                        <p class="style-text" id="lecture-name"><i class="fa-regular fa-file-lines"></i>&nbsp;&nbsp;${lectureName}</p>
                    </a>
                </div>
            `).join('');

            const quizzesHTML = quizzes.map(quizName => `
                <div class="module-item">
                    <a href="module/quiz.php" data-module-id="${moduleId}" data-item-name="${quizName}">
                        <p class="style-text" id="quiz-name"><i class="fa-solid fa-file-pen"></i>&nbsp;&nbsp;${quizName}</p>
                    </a>
                </div>
            `).join('');

            const activitiesHTML = activities.map(activityName => `
                <div class="module-item">
                    <a href="module/coding.php" data-module-id="${moduleId}" data-item-name="${activityName}">
                        <p class="style-text" id="activity-name"><i class="fa-regular fa-file-code"></i>&nbsp;&nbsp;${activityName}</p>
                    </a>
                </div>
            `).join('');

            return `
                <div class="style-card-2">
                    <div class="style-header">
                        <div class="style-display">
                            <p class="style-text"><i class="fa-solid fa-book-bookmark"></i>&nbsp;Module</p>
                            <h4 class="style-text" id="module-name">${moduleId}</h4>
                        </div>
                        <div class="style-display edit-module">
                            <i class="fa-regular fa-pen-to-square"></i><span>EDIT</span>
                        </div>
                    </div>
                    <div class="module-list-content">
                        ${lecturesHTML}
                        ${quizzesHTML}
                        ${activitiesHTML}
                        <div id="create-module-item" class="module-item add-module" data-module-id="${moduleId}">
                            <p class="style-text">
                                <i class="fa-solid fa-plus"></i>&nbsp;add item
                            </p>
                        </div>
                    </div>
                </div>
            `;
        }));

        const modulesHTML = modules.join('');
        modulesContainer.innerHTML = modulesHTML;
        loadingIndicator.style.display = 'none';  // Hide loading indicator after all modules are loaded
        populateModuleSelect();

        // Add event listeners for module item clicks
        const moduleItems = document.querySelectorAll('.module-item a');
        moduleItems.forEach(item => {
            item.addEventListener('click', (event) => {
                const moduleId = item.getAttribute('data-module-id');
                const itemName = item.getAttribute('data-item-name');

                // Store details in localStorage
                localStorage.setItem('selectedModuleId', moduleId);
                localStorage.setItem('selectedItemId', itemName);

                // Allow the default link behavior to navigate
            });
        });

        
        // Initialize ModuleItemModal after modules are loaded
        const addModuleButtons = document.querySelectorAll('.add-module');
        addModuleButtons.forEach(button => {
            button.removeEventListener('click', handleAddModuleClick);  // Remove previous listeners to avoid duplication
            button.addEventListener('click', handleAddModuleClick);
        });
    } catch (error) {
        console.error("Error getting modules:", error);
        document.querySelector('.loading-indicator').style.display = 'none';  // Hide loading indicator in case of error
    }
}


function handleAddModuleClick(event) {
    const moduleId = event.currentTarget.getAttribute('data-module-id');
    new ModuleItemModal("modal-create-module-item", moduleId, "close-module-item", "cancel-module-item-modal");
}





async function populateModuleSelect() {
    const selectElement = document.getElementById('position-after');
    selectElement.innerHTML = ''; // Clear existing options

    try {
        const moduleCollectionRef = collection(db, 'teacher', teacherId, 'classroom', selectedClassroomId, 'module');
        const moduleQuery = query(moduleCollectionRef, orderBy('number'));
        const moduleSnapshot = await getDocs(moduleQuery);

        if (!moduleSnapshot.empty) {
            moduleSnapshot.forEach((moduleDoc) => {
                const option = document.createElement('option');
                option.value = moduleDoc.id;
                option.text = moduleDoc.id;
                selectElement.appendChild(option);
            });
        }
    } catch (error) {
        console.error('Error populating module select:', error);
    }
}

async function createModule(event) {
    event.preventDefault();

    const moduleNameInput = document.getElementById('module-name');
    const moduleName = moduleNameInput.value.trim().toUpperCase();
    const position = document.querySelector('input[name="position"]:checked').value;
    const afterSelect = document.getElementById('position-after');

    if (!moduleName) {
        alert('Please enter a module name.');
        return;
    }

    try {
        const moduleCollectionRef = collection(db, 'teacher', teacherId, 'classroom', selectedClassroomId, 'module');
        const moduleSnapshot = await getDocs(moduleCollectionRef);
        const existingModulesCount = moduleSnapshot.size;

        let moduleNumber;
        if (position === 'end') {
            moduleNumber = existingModulesCount + 1;
        } else if (position === 'begin') {
            const firstModuleDoc = moduleSnapshot.docs[0];
            const firstModuleNumber = firstModuleDoc.data().number;
            moduleNumber = firstModuleNumber - 0.5;
        } else if (position === 'after') {
            const selectedModuleId = afterSelect.value;
            const selectedModuleDoc = moduleSnapshot.docs.find(doc => doc.id === selectedModuleId);
            const selectedModuleNumber = selectedModuleDoc.data().number;
            moduleNumber = selectedModuleNumber + 0.1;
        }

        const moduleDocRef = doc(db, 'teacher', teacherId, 'classroom', selectedClassroomId, 'module', moduleName);

        await setDoc(moduleDocRef, { number: moduleNumber });
        alert('Module created successfully');
        getModules();  // Refresh the module list
        moduleNameInput.value = '';  // Clear the input field
        document.getElementById('modal-create-module').style.display = 'none';  // Close the modal
    } catch (error) {
        console.error('Error creating module:', error);
        alert('Error creating module. Please try again.');
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
            console.error(`Elements not found for modal: ${modalId}, ${triggerId}, ${closeClass}`);
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
    constructor(modalId, moduleId, closeClass, cancelId) {
        this.modal = document.getElementById(modalId);
        this.moduleId = moduleId;
        this.span = document.getElementsByClassName(closeClass)[0];
        this.cancelBtn = document.getElementById(cancelId);

        if (this.span && this.modal) {
            this.openModal = this.openModal.bind(this);
            this.closeModal = this.closeModal.bind(this);
            this.outsideClick = this.outsideClick.bind(this);

            this.span.addEventListener('click', this.closeModal);
            this.cancelBtn.addEventListener('click', this.closeModal);
            window.addEventListener('click', this.outsideClick);

            this.modal.style.display = "block";  // Open modal when created
            this.initializeCreateItemForm();
        } else {
            console.error(`Elements not found for modal: ${modalId}, ${closeClass}`);
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

    initializeCreateItemForm() {
        const createModuleItemForm = document.getElementById('create-module-item-form');
        createModuleItemForm.removeEventListener('submit', this.createModuleItem);
        createModuleItemForm.addEventListener('submit', (event) => this.createModuleItem(event));
    }

    async createModuleItem(event) {
        event.preventDefault();

        const moduleItemNameInput = document.getElementById('module-item-name');
        const moduleItemName = moduleItemNameInput.value.trim().toUpperCase();
        const moduleItemType = document.getElementById('module-item-type').value;

        if (!moduleItemName) {
            alert('Please enter a module item name.');
            return;
        }

        const itemDocRef = doc(db, 'teacher', teacherId, 'classroom', selectedClassroomId, 'module', this.moduleId, moduleItemType, moduleItemName);

        try {
            await setDoc(itemDocRef, {});
            moduleItemNameInput.value = '';  // Clear the input field
            alert('Created successfully.');
            this.closeModal();  // Close the modal
            localStorage.setItem("selectedModuleId",this.moduleId);
            localStorage.setItem("selectedItemType", moduleItemType);
            localStorage.setItem("selectedItemId", moduleItemName);
            getModules();
            if (moduleItemType === "lecture" ) {
                window.location.href = "module/lecture.php";
            }
            else if (moduleItemType === "quiz") {
                window.location.href = "module/quiz.php";
            } 
            else if (moduleItemType === "activity") {
                window.location.href = "module/coding.php";
            }
        } catch (error) {
            console.error('Error creating module item:', error);
            alert('Error creating module item. Please try again.');
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    getModules();
    getClassroomName();
    populateModuleSelect();
    new Modal("modal-create-module", "btn-create-module", "close-modal", "cancel-modal");

    const createModuleForm = document.getElementById('create-module-form');
    createModuleForm.addEventListener('submit', createModule);
});
