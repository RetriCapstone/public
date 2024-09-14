import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection,deleteDoc,getDoc, getDocs, doc, setDoc,updateDoc  } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

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

const teacherId = getQueryParam('tid');
const selectedClassroomId = getQueryParam('Cid');
const selectedModuleId = getQueryParam('Mid');
const selectedQuizId = getQueryParam('ItemId');

let numberOfResponses = 0;  // Initialize outside the loop

// Function: fetch active students
async function fetchActiveStudents() {
    if (!selectedClassroomId || !teacherId) {
        console.error("Missing required identifiers");
        return;
    }

    try {
        const studentCollectionRef = collection(db, 'teacher', teacherId, 'classroom', selectedClassroomId, 'student');
        const studentSnapshot = await getDocs(studentCollectionRef);

        const activeStudentsContainer = document.querySelector('.response-student-list');
        activeStudentsContainer.innerHTML = '';  // Clear previous content


        for (const studentDoc of studentSnapshot.docs) {
            let totalScore = 0;  // Reset total score for each student
            const studentId = studentDoc.id;
            const userDocRef = doc(db, 'users', studentId);
            const userDoc = await getDoc(userDocRef);
            const userData = userDoc.data();
            const profileImageUrl = userData.profileImageUrl || "/teacher/images/default-user.png";

            // Fetch user score points
            const quizDocRef = collection(db, 'users', studentId, 'classroom', selectedClassroomId, 'module', selectedModuleId, 'quiz', selectedQuizId, 'question');
            const quizDocSnapshot = await getDocs(quizDocRef);

            if (!quizDocSnapshot.empty) {  // Check if the 'question' collection has documents
                const questionDataList = [];

                quizDocSnapshot.forEach((doc) => {
                    const questionData = doc.data();
                    questionDataList.push({ id: doc.id, ...questionData });

                    // Sum up the points from each question document
                    if (questionData.point) {
                        totalScore += questionData.point;
                    }
                });
                // Increment number of responses if the user has question documents
                numberOfResponses+=1;
            }

            const studentElement = document.createElement('div');
            studentElement.className = 'response-students';
            studentElement.innerHTML = `
                <div class="response-student-con-1">
                    <img class="response-student-image" src="${profileImageUrl}" alt="">
                    <span class="respose-student-name">${userData.lastname}, ${userData.firstname}</span>
                </div>
                <div class="response-student-con-1">
                    <i style="margin-right: 4rem; color: rgb(95 130 192);">click view answers</i>
                    <span class="response-student-time">-</span> 
                    <span class="response-student-score">${totalScore || "-"}</span>
                </div>
            `;
            activeStudentsContainer.appendChild(studentElement);
        }
        displayNumberofResponses()
        console.log(`Number of Responses: ${numberOfResponses}`);

    } catch (error) {
        console.error("Error getting active students:", error);
    }
}

async function displayNumberofResponses() {
    document.getElementById('quiz-number-responses').innerText = numberOfResponses
}











//func: navigation param
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

document.addEventListener('DOMContentLoaded', () => {
    fetchActiveStudents();
    document.querySelector('#student-link').addEventListener('click', () => {
        navigateToPage('/teacher/classroom/student.php');
    });
    document.querySelector('#module-link').addEventListener('click', () => {
        navigateToPage('/teacher/classroom/module.php');
    });

});
