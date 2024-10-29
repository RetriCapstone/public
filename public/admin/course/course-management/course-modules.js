import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, getDocs, doc, setDoc, deleteDoc, getDoc, addDoc, updateDoc, query, orderBy } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

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

function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

const selectedCourseId = getQueryParam('Cid');
const teacherId = getQueryParam('tid');

const moduleItemloadingIndicator = document.querySelector('.create-module-item-loading');
const moduleloadingIndicator = document.querySelector('.create-module-loading');

async function getItems(moduleId, itemType) {
    const itemCollectionRef = collection(db, 'course', selectedCourseId, 'module', moduleId, itemType);
    const itemQuery = query(itemCollectionRef, orderBy('number'));
    const itemSnapshot = await getDocs(itemQuery);
    const items = [];
    itemSnapshot.forEach((itemDoc) => {
        const itemData = itemDoc.data();
        items.push({
            id: itemDoc.id,
            name: itemData.name
        });
    });
    return items;
}


async function getCourseName() {
    if (!selectedCourseId || !teacherId) {
        console.error("Missing required identifiers");
        return;
    }
    try {
        // Define the path to the classroom document
        const classroomRef = doc(db, 'course', selectedCourseId);

        // Fetch the classroom document
        const classroomDoc = await getDoc(classroomRef);

        if (classroomDoc.exists()) {
            const classroomData = classroomDoc.data();

            // Display the name and code in the respective HTML elements
            const headerContainer = document.querySelector('.header-pos-2');
            headerContainer.innerHTML = `
                <div class="header-pos-1" >
                    <h3 id="classroom-name" >${classroomData.name}</h3>
                </div>
                <div class="style-display btn-edit-classroom" id="btn-edit-classroom" >
                    <i class="fa-regular fa-pen-to-square"></i>
                    <span class="edit-class-tooltip" >Edit course</span>
                </div>
            `;

            editClassModal("modal-edit-classroom", "btn-edit-classroom", "close-edit-classroom", "cancel-edit-class-modal");
            document.getElementById('edit-classroom-name').value = classroomData.name || '';
            document.getElementById('edit-classroom-code').value = classroomData.code || '';
        } else {
            console.error("Classroom document not found");
        }
    } catch (error) {
        console.error("Error getting classroom name and code:", error);
    }
}

async function getModules() {

    try {
        const loadingIndicator = document.querySelector('.loading-indicator');
        loadingIndicator.style.display = 'block';  // Show loading indicator
        const moduleCollectionRef = collection(db, 'course', selectedCourseId, 'module');
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
            const moduleData = moduleDoc.data();
            const moduleName = moduleData.name;
            const moduleId = moduleDoc.id;
            const moduleVisible = moduleData.visible;  // Fetch the 'visible' field

            const [lectures, quizzes, activities] = await Promise.all([
                getItems(moduleId, 'lecture'),
                getItems(moduleId, 'quiz'),
                getItems(moduleId, 'activity')
            ]);

            const lecturesHTML = lectures.map(lecture => `
                <div class="module-item">
                    <a href="module/lecture.php?Cid=${encodeURIComponent(selectedCourseId)}&tid=${encodeURIComponent(teacherId)}&Mid=${encodeURIComponent(moduleId)}&ItemId=${encodeURIComponent(lecture.id)}" data-module-id="${moduleId}" data-item-id="${lecture.id}">
                        <p class="style-text" id="lecture-name"><i class="fa-regular fa-file-lines" style="margin: 0.4rem; font-size: large;" ></i>&nbsp;&nbsp;${lecture.name}</p>
                    </a>
                </div>
            `).join('');

            const quizzesHTML = quizzes.map(quiz => `
                <div class="module-item">
                    <a href="module/quiz.php?Cid=${encodeURIComponent(selectedCourseId)}&tid=${encodeURIComponent(teacherId)}&Mid=${encodeURIComponent(moduleId)}&ItemId=${encodeURIComponent(quiz.id)}" data-module-id="${moduleId}" data-item-id="${quiz.id}">
                        <p class="style-text" id="quiz-name"><i class="fa-solid fa-file-pen" style="margin: 0.4rem; font-size: large;" ></i>${quiz.name}</p>
                    </a>
                </div>
            `).join('');

            const activitiesHTML = activities.map(activity => `
                <div class="module-item">
                    <a href="module/coding.php?Cid=${encodeURIComponent(selectedCourseId)}&tid=${encodeURIComponent(teacherId)}&Mid=${encodeURIComponent(moduleId)}&ItemId=${encodeURIComponent(activity.id)}" data-module-id="${moduleId}" data-item-id="${activity.id}" target="_blank" >
                        <p class="style-text" id="activity-name"><i class="fa-regular fa-file-code" style="margin: 0.4rem; font-size: large;" ></i>&nbsp;&nbsp;${activity.name}</p>
                    </a>
                </div>
            `).join('');

            // Determine which eye icon to show based on the module's visibility
            const visibilityIconHTML = moduleVisible
                ? '<i id="module-visible" class="fa-regular fa-eye"></i>'
                : '<i id="module-not-visible" class="fa-regular fa-eye-slash"></i>';

            return `
                <div class="style-card-2">
                    <div class="style-header">
                        <div class="style-display">
                            <div style="display:flex; align-items:center;" ><i class="fa-solid fa-book-bookmark"></i>&nbsp;&nbsp;
                            <h4 class="style-text"  id="module-name">${moduleName}</h4>
                        </div>
                        </div>
                        <div style="display:flex; align-items:center;">
                            ${visibilityIconHTML} 
                            <div class="style-display edit-module" data-module-visible="${moduleVisible}" data-module-id="${moduleId}" data-module-name="${moduleName}">
                                <i class="fa-regular fa-pen-to-square"></i><span>EDIT</span>
                            </div>
                        </div>
                    </div>
                    <div class="module-list-content">
                        <div class="module-item">
                            <p style="font-size: 1.3rem; font-family: auto;background: #161f47;" >Lectures</p>
                        </div>
                        ${lecturesHTML}
                        <div class="module-item">
                            <p style="font-size: 1.3rem; font-family: auto;background: #161f47;" >Quizzes</p>
                        </div>
                        ${quizzesHTML}
                        <div class="module-item">
                            <p style="font-size: 1.3rem; font-family: auto;background: #161f47;" >Activities</p>
                        </div>
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
                const itemId = item.getAttribute('data-item-id');
                // Allow the default link behavior to navigate
            });
        });

        // Initialize ModuleItemModal after modules are loaded
        const addModuleButtons = document.querySelectorAll('.add-module');
        addModuleButtons.forEach(button => {
            button.removeEventListener('click', handleAddModuleClick);  // Remove previous listeners to avoid duplication
            button.addEventListener('click', handleAddModuleClick);
        });

        // edit module 
        const editModuleButtons = document.querySelectorAll('.edit-module');
        editModuleButtons.forEach(button => {
            button.removeEventListener('click', handleEditModuleClick);  // Remove previous listeners to avoid duplication
            button.addEventListener('click', handleEditModuleClick);
        });

    } catch (error) {
        console.error("Error getting modules:", error);
        document.querySelector('.loading-indicator').style.display = 'none';  // Hide loading indicator in case of error
    }
}

async function populateModuleSelect() {
    const selectElement = document.getElementById('position-after');
    selectElement.innerHTML = ''; // Clear existing options

    try {
        const moduleCollectionRef = collection(db, 'course', selectedCourseId, 'module');
        const moduleQuery = query(moduleCollectionRef, orderBy('number'));
        const moduleSnapshot = await getDocs(moduleQuery);

        if (!moduleSnapshot.empty) {
            moduleSnapshot.forEach((moduleDoc) => {
                const option = document.createElement('option');
                const moduleData = moduleDoc.data();
                const moduleName = moduleData.name;
                option.value = moduleDoc.id;
                option.text = moduleName;
                selectElement.appendChild(option);
            });
        }
    } catch (error) {
        console.error('Error populating module select:', error);
    }
}


// add module onclick
function handleAddModuleClick(event) {
    const moduleId = event.currentTarget.getAttribute('data-module-id');
    new ModuleItemModal("modal-create-module-item", moduleId, "close-module-item", "cancel-module-item-modal");
}

// edit module onclick
function handleEditModuleClick(event) {
    const moduleId = event.currentTarget.getAttribute('data-module-id');
    const moduleName = event.currentTarget.getAttribute('data-module-name');
    const moduleVisibility = event.currentTarget.getAttribute('data-module-visible');
    new editModuleModal(moduleId, moduleName, moduleVisibility, "modal-edit-module", "close-module", "cancel-edit-module-modal");
}


class editModuleModal {
    constructor(moduleId, moduleName, moduleVisible, modalId, closeClass, cancelId) {
        this.moduleId = moduleId;
        this.moduleName = moduleName;
        const selectedModuleVisible = moduleVisible === 'true'; 
        this.modal = document.getElementById(modalId);
        this.span = document.getElementsByClassName(closeClass)[0];
        this.cancelBtn = document.getElementById(cancelId);
        this.deleteBtn = document.getElementById('delete-module');

        if (this.span && this.modal) {
            this.openModal = this.openModal.bind(this);
            this.closeModal = this.closeModal.bind(this);
            this.outsideClick = this.outsideClick.bind(this);
            this.editModule = this.editModule.bind(this);
            this.deleteModule = this.deleteModule.bind(this);

            this.span.addEventListener('click', this.closeModal);
            this.cancelBtn.addEventListener('click', this.closeModal);
            this.deleteBtn.addEventListener('click', this.deleteModule);
            window.addEventListener('click', this.outsideClick);

            this.modal.style.display = "block";  // Open modal when created
            this.initializeEditModuleForm();

            // Display the module name in the modal's input field
            const moduleNameInput = document.getElementById('selected-module-name');
            if (moduleNameInput) {
                moduleNameInput.value = this.moduleName;
            } else {
                console.error('Module name input field not found');
            }

            const moduleVisibility = document.getElementById('selected-module-visible');
            if (moduleVisibility) {
                moduleVisibility.checked = selectedModuleVisible; 
            } else {
                console.error('Module visibility input field not found');
            }


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

    initializeEditModuleForm() {
        const createModuleItemForm = document.getElementById('edit-module-form');
        createModuleItemForm.removeEventListener('submit', this.editModule);
        createModuleItemForm.addEventListener('submit', this.editModule);
    }

    async editModule(event) {
        event.preventDefault();
        const moduleNameInput = document.getElementById('selected-module-name').value.trim().toUpperCase();
        const moduleVisibility = document.getElementById('selected-module-visible').checked;

        if (!moduleNameInput) {
            alert('Please enter a module name.');
            return;
        }

        try {
            // Path to the selected module document
            const moduleRef = doc(db, 'course', selectedCourseId, 'module', this.moduleId);

            // Update the module's name field
            await updateDoc(moduleRef, {
                name: moduleNameInput,
                visible:moduleVisibility
            });
            
            location.reload();
            this.closeModal();  // Close the modal after successful update

        } catch (error) {
            console.error('Error updating module name:', error);
            alert('An error occurred while updating the module name. Please try again.');
        }
    }


    async deleteModule() {
        const confirmed = confirm('Are you sure you want to delete this module? This action cannot be undone.');

        if (confirmed) {
            try {
                // Path to the selected module document
                const moduleRef = doc(db, 'course', selectedCourseId, 'module', this.moduleId);

                // Delete the module document
                await deleteDoc(moduleRef);

                alert('Module deleted successfully.');
                location.reload();
                this.closeModal();  // Close the modal after successful deletion

            } catch (error) {
                console.error('Error deleting module:', error);
                alert('An error occurred while deleting the module. Please try again.');
            }
        }
    }

}

// func: create module
async function createModule(event) {
    event.preventDefault();

    moduleloadingIndicator.style.display = 'block';

    const moduleNameInput = document.getElementById('module-name');
    const moduleName = moduleNameInput.value.trim().toUpperCase();
    const position = document.querySelector('input[name="position"]:checked').value;
    const afterSelect = document.getElementById('position-after');

    if (!moduleName) {
        alert('Please enter a module name.');
        return;
    }

    try {
        const moduleCollectionRef = collection(db, 'course', selectedCourseId, 'module');
        const moduleSnapshot = await getDocs(moduleCollectionRef);
        const existingModulesCount = moduleSnapshot.size;

        let moduleNumber = 1;
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

        const moduleDocRef = doc(collection(db, 'course', selectedCourseId, 'module'));

        await setDoc(moduleDocRef, { number: moduleNumber, name: moduleName, visible:false });
        await saveLog(`Create Module ${moduleName}`);
        moduleloadingIndicator.style.display = 'none'
        getModules();  // Refresh the module list
        moduleNameInput.value = '';  // Clear the input field
        document.getElementById('modal-create-module').style.display = 'none';  // Close the modal
    } catch (error) {
        moduleloadingIndicator.style.display = 'none'
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

// func: create module item - lect/quiz/act -
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

        moduleItemloadingIndicator.style.display = 'block';

        const moduleItemNameInput = document.getElementById('module-item-name');
        const moduleItemName = moduleItemNameInput.value.trim().toUpperCase();
        // const moduleItemType = document.getElementById('module-item-type').value;
        const moduleItemType = document.querySelector('input[name="ftype"]:checked').value;

        if (!moduleItemName) {
            alert('Please enter a module item name.');
            return;
        }

        const itemCollectionRef = collection(db, 'course', selectedCourseId, 'module', this.moduleId, moduleItemType);
        const itemSnapshot = await getDocs(itemCollectionRef);
        const existingItemsCount = itemSnapshot.size;
        const itemNumber = existingItemsCount + 1;

        try {
            // Use addDoc to automatically generate the document ID
            const itemDocRef = await addDoc(itemCollectionRef, { number: itemNumber, status: 'close', name: moduleItemName });
            const moduleItemID = itemDocRef.id;

            await saveLog(`Course: Create ${moduleItemType} name: ${moduleItemName}`);

            moduleItemNameInput.value = '';
            this.closeModal();  // Close the modal
            moduleItemloadingIndicator.style.display = 'none';
            getModules();
            if (moduleItemType === "lecture") {
                window.location.href = `module/lecture.php?Cid=${encodeURIComponent(selectedCourseId)}&tid=${encodeURIComponent(teacherId)}&Mid=${encodeURIComponent(this.moduleId)}&ItemId=${encodeURIComponent(moduleItemID)}`;
            } else if (moduleItemType === "quiz") {
                window.location.href = `module/quiz.php?Cid=${encodeURIComponent(selectedCourseId)}&tid=${encodeURIComponent(teacherId)}&Mid=${encodeURIComponent(this.moduleId)}&ItemId=${encodeURIComponent(moduleItemID)}`;
            } else if (moduleItemType === "activity") {
                window.location.href = `module/coding.php?Cid=${encodeURIComponent(selectedCourseId)}&tid=${encodeURIComponent(teacherId)}&Mid=${encodeURIComponent(this.moduleId)}&ItemId=${encodeURIComponent(moduleItemID)}`;
            }
        } catch (error) {
            moduleItemloadingIndicator.style.display = 'none';
            console.error('Error creating module item:', error);
            alert('Error creating module item. Please try again.');
        }
    }
}

async function editClassroom(event) {
    event.preventDefault();

    const newclassName = document.getElementById("edit-classroom-name").value.trim().toUpperCase();

    if (!newclassName || !newclassCode) {
        alert("Please provide both classroom name and code.");
        return;
    }

    try {
        // Reference to the classroom document
        const classroomRef = doc(db, 'course', selectedCourseId);

        // Fetch the old classroom details before updating
        const classroomSnapshot = await getDoc(classroomRef);
        if (classroomSnapshot.exists()) {
            const oldClassroomData = classroomSnapshot.data();
            const oldclassName = oldClassroomData.name;

            // Update the classroom with new values
            await updateDoc(classroomRef, { name: newclassName });

            // Call saveLog to record the old and new classroom names
            saveLog(`Edited course from ${oldclassName} to ${newclassName} `);

            // Refresh the classroom list or view
            getCourseName();
            document.getElementById("modal-edit-classroom").style.display = "none";
        } else {
            console.error("Classroom not found");
            alert("Classroom not found. Please try again.");
        }
    } catch (error) {
        console.error("Error updating classroom:", error);
        alert("An error occurred while updating the classroom. Please try again.");
    }
}

function editClassModal(modalId, btnId, closeClass, btnCancel) {
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

// Function to delete the classroom
async function deleteClassroom() {
    const confirmation = confirm("Are you sure you want to delete this classroom?");
    if (confirmation) {
        try {
            // Get the reference to the classroom document
            const classroomRef = doc(db, 'course', selectedCourseId);

            // Fetch the classroom data before deletion
            const classroomSnapshot = await getDoc(classroomRef);
            if (!classroomSnapshot.exists()) {
                alert("Classroom not found.");
                return;
            }

            const classroomData = classroomSnapshot.data();
            const classroomName = classroomData.name;

            // Now, delete the classroom document from the teacher's collection
            await deleteDoc(classroomRef);

            // Log the deletion action
            saveLog(`Deleted course: ${classroomName} (ID: ${selectedCourseId})`);

            alert("Course deleted successfully.");

            // Close the modal after deletion and redirect
            document.getElementById("modal-edit-classroom").style.display = "none";
            window.location.href = "classroom.php";

        } catch (error) {
            console.error("Error deleting classroom:", error);
            alert("An error occurred while deleting the classroom. Please try again.");
        }
    }
}



function navigateToPage(page, module, item, student) {
    const currentParams = new URLSearchParams(window.location.search);
    const selectedClassroomId = getQueryParam('Cid');
    const teacherId = getQueryParam('tid');

    // Add the parameters to the URL
    currentParams.set('Cid', selectedClassroomId);
    currentParams.set('tid', teacherId);

    currentParams.delete(module);
    currentParams.delete(item);
    currentParams.delete(student);

    // Navigate to the desired page with the parameters
    window.location.href = `${page}?${currentParams.toString()}`;
}


// Save log function
async function saveLog(action) {
    try {
        const currentDate = new Date();
        const timestamp = currentDate.toLocaleString(); // Get the current date and time as a string

        // Create the log entry
        const logEntry = {
            action: action,
            timestamp: timestamp
        };

        // Save the log to the 'logs' collection
        const logRef = doc(collection(db, 'teacher', teacherId, 'logs'));
        await setDoc(logRef, logEntry);

        console.log("Log saved:", logEntry);
    } catch (error) {
        console.error("Error saving log:", error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    getModules();
    getCourseName();
    populateModuleSelect();
    new Modal("modal-create-module", "btn-create-module", "close-modal", "cancel-modal");


    document.getElementById("edit-classroom-form").addEventListener("submit", editClassroom);
    document.getElementById("delete-classroom").addEventListener("click", deleteClassroom);

    const createModuleForm = document.getElementById('create-module-form');
    createModuleForm.addEventListener('submit', createModule);

});
