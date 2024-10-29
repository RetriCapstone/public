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
const selectedStudentid = getQueryParam('Sid');


let questionNumber = 0;
let lastOptionNumber = 0;
let studentTotalScore = 0; 
let quizTotalScore = 0; 

const saveloadingIndicator= document.querySelector('.save-loading-indicator-bg');
const detailloadingIndicator= document.querySelector('.loading-quiz-content');
const quizDetailList = document.querySelector('.quiz-answer-list');


//func: fecth quiz settings
async function fetchQuizDetails() {
    try {
        // Define the path to the quiz document
        const quizDocRef = doc(db, 'teacher', teacherId, 'classroom', selectedClassroomId, 'module', selectedModuleId, 'activity', selectedQuizId);

        // Fetch the quiz document
        const quizDoc = await getDoc(quizDocRef);

        if (quizDoc.exists()) {
            const quizData = quizDoc.data();

            // Populate the quiz settings
            document.getElementById('quiz-name').innerText = quizData.name || '';
        }
    }catch (error) {
        console.error('Error fetching quiz details:', error);
    }
}

async function studentfullname() {
    try {
        const userDocRef = doc(db, 'users', selectedStudentid);
        const userDoc = await getDoc(userDocRef);
        const userData = userDoc.data();
        
        const studentFullname = document.getElementById('quiz-student-fullname');
        studentFullname.innerHTML = `Name: ${userData.lastname}, ${userData.firstname}`;
    } catch (error) {
        
    }
}


function addQuestion() {
    questionNumber += 1;
    const questionDetailNumber = questionNumber;

    const questionContainer = document.createElement('div');
    questionContainer.classList.add('style-container-1', 'quiz-details-question-container');
    questionContainer.id = `question-${questionDetailNumber}-detail`;

    questionContainer.innerHTML = `
        <div class="quiz-detail-content">
            <span>Question ${questionDetailNumber}</span>
        </div>
        <div class="quiz-detail-paragraph" id="paragraph-con-${questionDetailNumber}-detail">
            <div class="quiz-detail-content-between">
            
                <div class="quiz-question-answer quiz-detail-question quiz-detail-user-answer-code">
                    <label>Expected output:</label>
                    <textarea type="text" class="quiz-question-answer quiz-detail-question code-output-editor teacher-output code-output" id="question-${questionDetailNumber}-paragraph-question"></textarea>
                </div>
                
                <div class="quiz-detail-content">
                    <span>Score:</span>
                    <input id="question-${questionDetailNumber}-paragraph-user-score" class="quiz-detail-score-input" autocomplete="off">
                    <span id="question-${questionDetailNumber}-paragraph-point"></span>
                </div>
            </div>
            <div class="quiz-detail-content">
                <div class="quiz-question-answer quiz-detail-question quiz-detail-user-answer-code">
                    <label>Student Output:</label>
                    <textarea  class="code-output-editor code-output" id="question-${questionDetailNumber}-paragraph-user-answer">-</textarea>
                </div>
                <div class="quiz-question-answer quiz-detail-question quiz-detail-user-answer-code">
                    <label>Student code:</label>
                    <textarea class="code-output-editor code-output" id="question-${questionDetailNumber}-paragraph-user-code">-</textarea>
                </div>
            </div>
        </div>
    `;
    quizDetailList.appendChild(questionContainer);
}

async function fetchQuizQuestionDetail(studentId) {
    try {
        const questionsCollectionRef = collection(db, 'teacher', teacherId, 'classroom', selectedClassroomId, 'module', selectedModuleId, 'activity', selectedQuizId, 'question');
        const questionsSnapshot = await getDocs(questionsCollectionRef);
        const questionDataList = [];

        questionsSnapshot.forEach(doc => {
            const questionData = doc.data();
            questionDataList.push({ id: doc.id, ...questionData });
        });

        questionDataList.forEach((questionData, index) => {
            addQuestion();
            const questionNumber = index + 1;
            const questionContainer = document.querySelector(`#question-${questionNumber}-detail`);

            if (!questionContainer) {
                console.error(`Question container #question-${questionNumber}-detail not found.`);
                return;
            }

            questionContainer.setAttribute('data-question-id', questionData.id);

            fetchStudentQuizDetail(studentId, questionData.id, questionNumber);

            const paragraphContainer = questionContainer.querySelector(`#paragraph-con-${questionNumber}-detail`);
            paragraphContainer.style.display = 'block';

            // Populate question details
            questionContainer.querySelector(`#question-${questionNumber}-paragraph-question`).value = questionData.output || '';
            questionContainer.querySelector(`#question-${questionNumber}-paragraph-point`).innerHTML = `/ ${questionData.point}`;
        });
        detailloadingIndicator.style.display = 'none';
    } catch (error) {
        detailloadingIndicator.style.display = 'none';
        console.error("Error fetching quiz details:", error);
    }
}

// Fetch the user's output and code for each question
async function fetchStudentQuizDetail(studentId, questionId, questionNumber) {
    try {
        const quizDocRef = doc(db, 'users', studentId, 'classroom', selectedClassroomId, 'module', selectedModuleId, 'activity', selectedQuizId, 'question', questionId);
        const quizDoc = await getDoc(quizDocRef);

        if (!quizDoc.exists()) {
            console.error(`No quiz data found for student: ${studentId}, question: ${questionId}`);
            return;
        }

        const studentData = quizDoc.data();
        if (!studentData) {
            console.error(`No data available for student: ${studentId}, question: ${questionId}`);
            return;
        }

        const questionContainer = document.querySelector(`#question-${questionNumber}-detail`);
        if (!questionContainer) {
            console.error(`Question container #question-${questionNumber}-detail not found.`);
            return;
        }

        const paragraphScoreInput = questionContainer.querySelector(`#question-${questionNumber}-paragraph-user-score`);
        const paragraphAnswerSpan = questionContainer.querySelector(`#question-${questionNumber}-paragraph-user-answer`);
        const paragraphCodeSpan = questionContainer.querySelector(`#question-${questionNumber}-paragraph-user-code`);

        studentTotalScore += studentData.score;
        paragraphScoreInput.value = studentData.score || 0;
        paragraphAnswerSpan.textContent = studentData.userOutput || studentData.userOutput || 'N/A';
        paragraphCodeSpan.textContent = studentData.userCode || studentData.userCode || 'N/A';

        quizTotalScore += studentData.point

        document.querySelector(`#quiz-student-total-score`).textContent = `Total Score: ${studentTotalScore || 0}/${quizTotalScore || 0}`;
        
    } catch (error) {
        console.error("Error fetching student quiz detail:", error);
    }
}

async function saveScoreChanges() {
    try {
        const totalQuestions = document.querySelectorAll("[id^=question-]").length; // Assuming the question containers are identified by "question-1", "question-2", etc.

        for (let i = 1; i <= totalQuestions; i++) {
            const questionContainer = document.querySelector(`#question-${i}-detail`);
            if (!questionContainer) {
                console.error(`Question container #question-${i}-detail not found.`);
                break;
            }

            // Get question ID and type (e.g., 'identification', 'choice', 'paragraph')
            const questionId = questionContainer.getAttribute('data-question-id'); // Assuming the container has a data attribute with question ID
            const questionType = questionContainer.getAttribute('data-question-type'); // Assuming the container has a data attribute for question type

            // Get the new score from the input fields
            let updatedScore = 0;
            if (questionType === 'identification') {
                updatedScore = questionContainer.querySelector(`#question-${i}-identify-user-score`).value || 0;
            } else if (questionType === 'choice') {
                updatedScore = questionContainer.querySelector(`#question-${i}-choice-user-score`).value || 0;
            } else if (questionType === 'paragraph') {
                updatedScore = questionContainer.querySelector(`#question-${i}-paragraph-user-score`).value || 0;
            }

            // Update the score in Firestore for the student
            const quizDocRef = doc(db, 'users', selectedStudentid, 'classroom', selectedClassroomId, 'module', selectedModuleId, 'activity', selectedQuizId, 'question', questionId);
            
            // Update the document with the new score
            await updateDoc(quizDocRef, {
                score: Number(updatedScore)
            });

            console.log(`Updated score for question ${i} (ID: ${questionId}): ${updatedScore}`);
        }

        // Optionally, show a confirmation message
        alert("Updated successfully!");
        quizDetailList.innerHTML = '';
        questionNumber =0;
        studentTotalScore = 0;
        quizTotalScore = 0;
        fetchQuizQuestionDetail(selectedStudentid);

    } catch (error) {
        console.error("Error updating student quiz scores:", error);
        alert("Failed to save scores. Please try again.");
    }
}


//func: navigation param
function navigateToPage(page) {
    const currentParams = new URLSearchParams(window.location.search);
    const teacherId = getQueryParam('tid');
    const selectedClassroomId = getQueryParam('Cid');
    const moduleId = getQueryParam('Mid');
    const quizId = getQueryParam('ItemId');
    const studentId = getQueryParam('Sid');

    // Add the parameters to the URL
    currentParams.set('tid', teacherId);
    currentParams.set('Cid', selectedClassroomId);
    currentParams.set('Mid', moduleId);
    currentParams.set('ItemId', quizId);
    currentParams.set('Sid', studentId);

    // Navigate to the desired page with the parameters
    window.location.href = `${page}?${currentParams.toString()}`;
}



document.addEventListener('DOMContentLoaded', () => {
    fetchQuizQuestionDetail(selectedStudentid);
    fetchQuizDetails();
    studentfullname();
    
    document.querySelector("#btn-save-score-details").addEventListener("click", async () => {
        saveScoreChanges();
    });
    
    document.querySelector('#logs-link').addEventListener('click', () => {
        navigateToPage('/public/admin/classroom/module/coding/logs.php');
    });
});

