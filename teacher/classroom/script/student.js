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

function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

const selectedClassroomId = getQueryParam('Cid');
const teacherId = getQueryParam('tid');

const loadingIndicator = document.querySelector('.loading-indicator');

async function getClassroomName() {
    if (!selectedClassroomId || !teacherId) {
        console.error("Missing required identifiers");
        return;
    }

    try {
        // Define the path to the classroom document
        const classroomRef = doc(db, 'teacher', teacherId, 'classroom', selectedClassroomId);

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
                    <span class="edit-class-tooltip" >Edit classroom</span>
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

// func: fetch active students
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

            const profileImageUrl = userData.profileImageUrl || "/teacher/images/default-user.png" ;

            const studentElement = document.createElement('div');
            studentElement.className = 'style-student-list';
            studentElement.innerHTML = `
                <div style="display: flex; flex-direction: row; gap: 14px; align-items: center;">
                    <img src="${profileImageUrl}" alt="" class="student-image" id="profile-image-student">
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


// func: fetch student join request
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
            const profileImageUrl = userData.profileImageUrl || "/teacher/images/default-user.png" ;

            const requestElement = document.createElement('div');
            requestElement.className = 'style-student-list';
            requestElement.innerHTML = `
                <div style="display: flex; flex-direction: row; gap: 14px; align-items: center;">
                    <img src="${profileImageUrl}" alt="" class="student-image">
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

// func: accept student req
async function acceptStudent(studentId) {
    try {
        // Define the path to the classroom document
        const classRef = doc(db, 'teacher', teacherId, 'classroom', selectedClassroomId);

        // Fetch the classroom document
        const classDoc = await getDoc(classRef);
        const classroomData = classDoc.data();

        const studentDocRef = doc(db, 'teacher', teacherId, 'classroom', selectedClassroomId, 'student', studentId);
        const requestDocRef = doc(db, 'teacher', teacherId, 'classroom', selectedClassroomId, 'request', studentId);

        // Move the student from 'request' to 'student'
        await setDoc(studentDocRef, {});

        // Delete the student from 'request'
        await deleteDoc(requestDocRef);

        // Add classroom info to the user's document
        const classroomDocRef = doc(db, 'users', studentId, 'classroom', selectedClassroomId);
        await setDoc(classroomDocRef, { teacher: teacherId, name: classroomData.name, code: classroomData.code });

        getRequestStudents();  // Refresh the request list
        getActiveStudents();   // Refresh the active students list
    } catch (error) {
        console.error('Error accepting student:', error);
        alert('Error accepting student. Please try again.');
    }
}

// func: decline student req
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


// Edit classroom
async function editClassroom(event) {
    event.preventDefault();

    const newclassName = document.getElementById("edit-classroom-name").value.trim().toUpperCase();
    const newclassCode = document.getElementById("edit-classroom-code").value.trim();

    if (!newclassName || !newclassCode) {
        alert("Please provide both classroom name and code.");
        return;
    }
    try {
            const classroomRef = doc(db, 'teacher', teacherId, 'classroom', selectedClassroomId);
            await updateDoc(classroomRef, { name: newclassName, code:newclassCode }); 

            getClassroomName();
            document.getElementById("modal-edit-classroom").style.display = "none";
            alert("Classroom updated successfully.");
            
        
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
            // Get the students collection reference
            const studentCollectionRef = collection(db, 'teacher', teacherId, 'classroom', selectedClassroomId, 'student');

            // Fetch all student documents under the classroom
            const studentDocsSnapshot = await getDocs(studentCollectionRef);

            // Delete the classroom document for each student
            const deletePromises = studentDocsSnapshot.docs.map(async (studentDoc) => {
                const studentId = studentDoc.id;
                const studentClassroomRef = doc(db, 'users', studentId, 'classroom', selectedClassroomId);
                await deleteDoc(studentClassroomRef);
            });

            // Wait for all deletions to complete
            await Promise.all(deletePromises);

            // Now, delete the classroom document from the teacher's collection
            const classroomRef = doc(db, 'teacher', teacherId, 'classroom', selectedClassroomId);
            await deleteDoc(classroomRef);

            alert("Classroom deleted successfully.");

            // Close the modal after deletion and redirect
            document.getElementById("modal-edit-classroom").style.display = "none";
            window.location.href = "classroom.php";

        } catch (error) {
            console.error("Error deleting classroom:", error);
            alert("An error occurred while deleting the classroom. Please try again.");
        }
    }
}

function navigateToPage(page) {
    const currentParams = new URLSearchParams(window.location.search);
    const selectedClassroomId = getQueryParam('Cid');
    const teacherId = getQueryParam('tid');

    // Add the parameters to the URL
    currentParams.set('Cid', selectedClassroomId);
    currentParams.set('tid', teacherId);

    // Navigate to the desired page with the parameters
    window.location.href = `${page}?${currentParams.toString()}`;
}



document.addEventListener('DOMContentLoaded', (event) => {
    getClassroomName(); 
    getActiveStudents();
    getRequestStudents();

    document.getElementById("edit-classroom-form").addEventListener("submit", editClassroom);
    document.getElementById("delete-classroom").addEventListener("click", deleteClassroom);


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
    
    document.querySelector('#student-link').addEventListener('click', () => {
        navigateToPage('student.php');
    });
    document.querySelector('#module-link').addEventListener('click', () => {
        navigateToPage('module.php');
    });

});
