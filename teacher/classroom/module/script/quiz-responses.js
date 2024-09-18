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
                    if (questionData.score) {
                        totalScore += questionData.score;
                    }
                });
                // Increment number of responses if the user has question documents
                numberOfResponses+=1;
            }

            const studentElement = document.createElement('div');
            studentElement.className = 'response-students view-quiz-details';
            studentElement.setAttribute('data-student-id', studentId);
            studentElement.setAttribute('data-student-fname', userData.firstname);
            studentElement.setAttribute('data-student-lname', userData.lastname);
            studentElement.innerHTML = `
                <div class="response-student-con-1" " >
                    <img class="response-student-image" src="${profileImageUrl}" alt="">
                    <span class="respose-student-name">${userData.lastname}, ${userData.firstname}</span>
                </div>
                <div class="response-student-con-1">
                    <i style="padding-right: 1.2rem; color: rgb(95 130 192);">click to see details</i>
                    <span class="response-student-time">-</span> 
                    <span class="response-student-score">${totalScore || "-"}</span>
                </div>
            `;
            activeStudentsContainer.appendChild(studentElement);
        }
        displayNumberofResponses()
        
        // edit module 
        const editModuleButtons = document.querySelectorAll('.view-quiz-details');
        editModuleButtons.forEach(button => {
            button.removeEventListener('click', handleEditQuizClick);  // Remove previous listeners to avoid duplication
            button.addEventListener('click', handleEditQuizClick);
        });


    } catch (error) {
        console.error("Error getting active students:", error);
    }
}

// edit module onclick
function handleEditQuizClick(event) {
    const studentid = event.currentTarget.getAttribute('data-student-id');
    const studentFname = event.currentTarget.getAttribute('data-student-fname');
    const studentLname = event.currentTarget.getAttribute('data-student-lname');
    new editQuizAnswerModal(studentid,studentFname, studentLname, "modal-edit-quiz", "close-quiz-detail-modal");
}

class editQuizAnswerModal {
    constructor(id, firstname, lastname ,modalId, closeClass) {
        const studentid = id;
        const studentFname = firstname;
        const studentLname = lastname;

        this.modal = document.getElementById(modalId);
        this.span = document.getElementsByClassName(closeClass)[0];

        if (this.span && this.modal) {
            this.openModal = this.openModal.bind(this);
            this.closeModal = this.closeModal.bind(this);
            this.span.addEventListener('click', this.closeModal);
            this.modal.style.display = "block";  
            window.addEventListener('click', this.outsideClick);

        } else {
            console.error(`Elements not found for modal: ${modalId}, ${closeClass}`);
        }

            
        const studentFullname = document.getElementById('quiz-student-fullname');
        studentFullname.innerHTML = `${studentLname}, ${studentFname}`;
        fetchQuizQuestionDetail(studentid);

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

const quizDetailList = document.querySelector('.quiz-answer-list');
let questionNumber = 0
function addQuestion() {
    questionNumber +=1
    const questionDetailNumber = questionNumber;
    const questionContainer = document.createElement('div');
    questionContainer.classList.add('style-container-1', 'quiz-details-question-container');
    questionContainer.id = `question-${questionDetailNumber}`;
    questionContainer.innerHTML = `
        <div class="quiz-detail-content" >
            <span>Question ${questionDetailNumber}</span>
        </div>

        <!-- identification -->
        <div class="quiz-detail-identify" >
            <div class="quiz-detail-content-between" >
                <span class="quiz-question-answer quiz-detail-question" >Sample Question</span>
                <div class="quiz-detail-content" >
                    <span>Score:</span>
                    <input class="quiz-detail-score-input" autocomplete="off" value="1">
                    <span>/0</span>
                </div>
            </div>
            <div class="quiz-detail-content-between" >
                <div class="quiz-detail-content" >
                    <div class="quiz-question-answer" >
                        <label for="">Correct Answer</label>
                        <span>
                            Correct Answer
                        </span>
                    </div>
                    <div class="quiz-question-answer" >
                        <label for="">Correct Answer (alternate)</label>
                        <span>
                            Correct Answer
                        </span>
                    </div>
                </div>
                <div class="quiz-question-answer quiz-detail-user-answer" >
                    <label for="">Answer</label>
                    <span >
                        User answer
                    </span>
                </div>
            </div>
        </div>

        <!-- paragraph -->
        <div class="quiz-detail-paragraph" style="display: none;" >
            <div class="quiz-detail-content-between" >
                <span class="quiz-question-answer quiz-detail-question" >Sample Question</span>
                <div class="quiz-detail-content" >
                    <span>Score:</span>
                    <input class="quiz-detail-score-input" autocomplete="off" value="1">
                    <span>/0</span>
                </div>
            </div>
            <div class="quiz-detail-content" >
                <div class="quiz-question-answer quiz-detail-question quiz-detail-user-answer" >
                    <label for="">Answer</label>
                    <span>
                        Correct Answer
                    </span>
                </div>
            </div>
        </div>

        <!-- multiple choice -->
        <div class="quiz-detail-choice" style="display: none;" >
            <div class="quiz-detail-content-between" >
                <span class="quiz-question-answer quiz-detail-question" >Sample Question</span>
                <div class="quiz-detail-content" >
                    <span>Score:</span>
                    <input class="quiz-detail-score-input" autocomplete="off" value="1">
                    <span>/0</span>
                </div>
            </div>
            <div class="quiz-detail-content-between" >
                <div class="quiz-detail-content quiz-detail-options" >
                    <div class="quiz-question-answer" >
                        <span>
                            Correct Answer
                        </span>
                    </div>
                    <div class="quiz-question-answer" >
                        <span>
                            Correct Answer
                        </span>
                    </div>
                    <div class="quiz-question-answer" >
                        <span>
                            Correct Answer
                        </span>
                    </div>
                    <div class="quiz-question-answer quiz-detail-user-answer" >
                        <span>
                            Correct Answer
                        </span>
                    </div>
                </div>
                <div class="quiz-question-answer quiz-detail-user-answer" >
                    <label for="">Answer</label>
                    <span >
                        User answer
                    </span>
                </div>
            </div>
        </div>

    `;

    quizDetailList.appendChild(questionContainer);
}

async function fetchQuizQuestionDetail(studentId) {

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
