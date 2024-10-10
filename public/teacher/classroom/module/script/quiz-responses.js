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
let selectedStudentid = '';

let numberOfResponses = 0;  // Initialize outside the loop

let questionNumber = 0;
let lastOptionNumber = 0;
let studentTotalScore = 0; 

const detailloadingIndicator= document.querySelector('.loading-quiz-content');
const quizDetailList = document.querySelector('.quiz-answer-list');
// Function: fetch active students
async function fetchActiveStudents() {
    if (!selectedClassroomId || !teacherId) {
        console.error("Missing required identifiers");
        return;
    }
    numberOfResponses = 0;
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
            const profileImageUrl = userData.profileImageUrl || "/public/teacher/images/default-user.png";

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
            }else{
                totalScore = "-";
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
                    <i style="padding-right: 1.8rem; color: rgb(95 130 192);">click to see details</i>
                    <!-- <span class="response-student-time">-</span> -->
                    <span class="response-student-score">${totalScore}</span>
                </div>
            `;
            activeStudentsContainer.appendChild(studentElement);
        }
        
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

        detailloadingIndicator.style.display = 'block';

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
        quizDetailList.innerHTML = '';
        questionNumber =0;
        lastOptionNumber = 0;
        studentTotalScore = 0;
        selectedStudentid = studentid;
        fetchQuizQuestionDetail(selectedStudentid);

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

function addOption(questionNumber, optionText) {
    lastOptionNumber += 1;
    const optionNumber = lastOptionNumber;
    const choiceBody = document.querySelector(`#question-${questionNumber}-choice-body-detail`);

    if (!choiceBody) {
        console.error(`Choice body for question #${questionNumber} not found.`);
        return;
    }

    const optionContainer = document.createElement('div');
    optionContainer.classList.add('quiz-question-answer');
    optionContainer.id = `choice-option-${questionNumber}-${optionNumber}-detail`;
    optionContainer.innerHTML = `
        <span id="question-${questionNumber}-choice-option-${optionNumber}">
        <i class="fa-regular fa-circle"></i>
            ${optionText}
        </span>
    `;
    choiceBody.appendChild(optionContainer);
}

function addQuestion() {
    questionNumber +=1;
    const questionDetailNumber = questionNumber;
    const questionContainer = document.createElement('div');
    questionContainer.classList.add('style-container-1', 'quiz-details-question-container');
    questionContainer.id = `question-${questionDetailNumber}-detail`;
    questionContainer.innerHTML = `
        <div class="quiz-detail-content" >
            <span>Question ${questionDetailNumber}</span>
        </div>

        <!-- identification -->
        <div class="quiz-detail-identify" id="identify-con-${questionDetailNumber}-detail" >
            <div class="quiz-detail-content-between" >
                <span class="quiz-question-answer quiz-detail-question" id="question-${questionDetailNumber}-identify-question">Sample Question</span>
                <div class="quiz-detail-content" >
                    <span>Score:</span>
                    <input class="quiz-detail-score-input" autocomplete="off" id="question-${questionDetailNumber}-identify-user-score">
                    <span id="question-${questionDetailNumber}-identify-point" ></span>
                </div>
            </div>
            <div class="quiz-detail-content-between" >
                <div class="quiz-detail-content" >
                    <div class="quiz-question-answer" >
                        <label for="">Correct Answer</label>
                        <span id="question-${questionDetailNumber}-identify-answer">
                            -
                        </span>
                    </div>
                    <div class="quiz-question-answer" >
                        <label for="">Correct Answer (alternate)</label>
                        <span id="question-${questionDetailNumber}-identify-alternate">
                            -
                        </span>
                    </div>
                </div>
                <div class="quiz-question-answer quiz-detail-user-answer" >
                    <label for="">Answer</label>
                    <span id="question-${questionDetailNumber}-identify-user-answer">
                        -
                    </span>
                </div>
            </div>
        </div>

        <!-- paragraph -->
        <div class="quiz-detail-paragraph" id="paragraph-con-${questionDetailNumber}-detail" >
            <div class="quiz-detail-content-between" >
                <span class="quiz-question-answer quiz-detail-question" id="question-${questionDetailNumber}-paragraph-question">Sample Question</span>
                <div class="quiz-detail-content" >
                    <span>Score:</span>
                    <input id="question-${questionDetailNumber}-paragraph-user-score" class="quiz-detail-score-input" autocomplete="off" >
                    <span id="question-${questionDetailNumber}-paragraph-point" ></span>
                </div>
            </div>
            <div class="quiz-detail-content" >
                <div class="quiz-question-answer quiz-detail-question quiz-detail-user-answer" >
                    <label for="">Answer</label>
                    <span id="question-${questionDetailNumber}-paragraph-user-answer">
                        -
                    </span>
                </div>
            </div>
        </div>

        <!-- multiple choice -->
        <div class="quiz-detail-choice" id="choice-con-${questionDetailNumber}-detail" >
            <div class="quiz-detail-content-between" >
                <span id="question-${questionDetailNumber}-choice-question" class="quiz-question-answer quiz-detail-question" >-</span>
                <div class="quiz-detail-content" >
                    <span>Score:</span>
                    <input id="question-${questionDetailNumber}-choice-user-score" class="quiz-detail-score-input" autocomplete="off" >
                    <span id="question-${questionDetailNumber}-choice-point" ></span>
                </div>
            </div>
            <div class="quiz-detail-content-between" >
                <div id="question-${questionDetailNumber}-choice-body-detail" class="quiz-detail-content quiz-detail-options" >
                    
                </div>
                <div class="quiz-question-answer quiz-detail-user-answer" >
                    <label for="">Answer</label>
                    <span id="question-${questionDetailNumber}-choice-user-answer" >
                        -
                    </span>
                </div>
            </div>
        </div>

    `;

    quizDetailList.appendChild(questionContainer);
}

async function fetchQuizQuestionDetail(studentId) {
    try {
        const questionsCollectionRef = collection(db, 'teacher', teacherId, 'classroom', selectedClassroomId, 'module', selectedModuleId, 'quiz', selectedQuizId, 'section', 'section-1', 'question');
        
        const questionsSnapshot = await getDocs(questionsCollectionRef);
        const questionDataList = [];

        questionsSnapshot.forEach((doc) => {
            const questionData = doc.data();
            questionDataList.push({ id: doc.id, ...questionData });

        });

        questionDataList.forEach((questionData, index) => {
            addQuestion();
            const questionNumber = index + 1;
            const questionContainer = document.querySelector(`#question-${questionNumber}-detail`);

            if (!questionContainer) {
                console.error(`Question container #question-${questionNumber} not found.`);
                return;
            }
            questionContainer.setAttribute('data-question-id', questionData.id);
            questionContainer.setAttribute('data-question-type', questionData.type);

            fetchStudentQuizDetail(studentId, questionData.id, questionNumber);

            const quizContainerIdentify = questionContainer.querySelector(`#identify-con-${questionNumber}-detail`);
            const quizContainerChoice = questionContainer.querySelector(`#choice-con-${questionNumber}-detail`);
            const quizContainerParagraph = questionContainer.querySelector(`#paragraph-con-${questionNumber}-detail`);

            // questionContainer.querySelector(`#question-point-${questionNumber}`).value = questionData.point || 1;

            const questionType = questionData.type;
            if (questionType === 'identification') {
                quizContainerIdentify.style.display = 'block';
                quizContainerChoice.style.display = 'none';
                quizContainerParagraph.style.display = 'none';

                questionContainer.querySelector(`#question-${questionNumber}-identify-question`).textContent = questionData.question || ``;
                questionContainer.querySelector(`#question-${questionNumber}-identify-point`).innerHTML = `/ ${questionData.point}`;
                questionContainer.querySelector(`#question-${questionNumber}-identify-answer`).textContent = questionData.answer || '';
                questionContainer.querySelector(`#question-${questionNumber}-identify-alternate`).textContent = questionData.alternate || '';
                
            }  else if (questionType === 'choice') {
                // Multiple choice question setup
                quizContainerIdentify.style.display = 'none';
                quizContainerChoice.style.display = 'block';
                quizContainerParagraph.style.display = 'none';

                questionContainer.querySelector(`#question-${questionNumber}-choice-question`).textContent = questionData.question || '';
                questionContainer.querySelector(`#question-${questionNumber}-choice-point`).textContent = `/ ${questionData.point}`;

                lastOptionNumber = 0; // Reset for each question
                const options = questionData.options || {};

                Object.keys(options).forEach((key, optionIndex) => {
                    addOption(questionNumber, options[key]);
                    const optionContainer = document.querySelector(`#choice-option-${questionNumber}-${optionIndex + 1}-detail`);
                    
                    if (optionContainer) {
                        if (options[key] === questionData.answer) {
                            optionContainer.classList.add('quiz-detail-user-answer');
                        }
                    } else {
                        console.error(`Option container #choice-option-${questionNumber}-${optionIndex + 1}-detail not found.`);
                    }
                });
            } else if (questionType === 'paragraph') {
                quizContainerIdentify.style.display = 'none';
                quizContainerChoice.style.display = 'none';
                quizContainerParagraph.style.display = 'block';

                questionContainer.querySelector(`#question-${questionNumber}-paragraph-question`).textContent = questionData.question || '';
                questionContainer.querySelector(`#question-${questionNumber}-paragraph-point`).innerHTML = `/ ${questionData.point}`;
                
            }
        });
        detailloadingIndicator.style.display = 'none';
    } catch (error) {
        detailloadingIndicator.style.display = 'none';
        console.error("Error fetching quiz details:", error);
    }
}

// Reset total score for each student
async function fetchStudentQuizDetail(studentId, questionId, questionNumber) {
    try {
        const quizDocRef = doc(db, 'users', studentId, 'classroom', selectedClassroomId, 'module', selectedModuleId, 'quiz', selectedQuizId, 'question', questionId);

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

        const identifyScoreInput = questionContainer.querySelector(`#question-${questionNumber}-identify-user-score`);
        const identifyAnswerSpan = questionContainer.querySelector(`#question-${questionNumber}-identify-user-answer`);
        const choiceScoreInput = questionContainer.querySelector(`#question-${questionNumber}-choice-user-score`);
        const choiceAnswerSpan = questionContainer.querySelector(`#question-${questionNumber}-choice-user-answer`);
        const paragraphScoreInput = questionContainer.querySelector(`#question-${questionNumber}-paragraph-user-score`);
        const paragraphAnswerSpan = questionContainer.querySelector(`#question-${questionNumber}-paragraph-user-answer`);

        // Check the type of question and set the appropriate data
        const questionType = studentData.type;
        if (questionType === 'identification' && identifyScoreInput && identifyAnswerSpan) {
            identifyScoreInput.value = studentData.score || 0;
            identifyAnswerSpan.textContent = studentData.userAnswer || 'N/A';
        } else if (questionType === 'choice' && choiceScoreInput && choiceAnswerSpan) {
            choiceScoreInput.value = studentData.score || 0;
            choiceAnswerSpan.textContent = studentData.userAnswer || 'N/A';
        } else if (questionType === 'paragraph' && paragraphScoreInput && paragraphAnswerSpan) {
            paragraphScoreInput.value = studentData.score || 0;
            paragraphAnswerSpan.textContent = studentData.userAnswer || 'N/A';
        } else {
            console.error(`Question type "${questionType}" not recognized or missing required elements.`);
        }
        studentTotalScore += studentData.score

        document.querySelector(`#quiz-student-total-score`).textContent = `Total Score: ${studentTotalScore || 0}`;
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
                continue;
            }

            const questionId = questionContainer.getAttribute('data-question-id'); 
            const questionType = questionContainer.getAttribute('data-question-type'); 

            let updatedScore = 0;
            if (questionType === 'identification') {
                updatedScore = questionContainer.querySelector(`#question-${i}-identify-user-score`).value || 0;
            } else if (questionType === 'choice') {
                updatedScore = questionContainer.querySelector(`#question-${i}-choice-user-score`).value || 0;
            } else if (questionType === 'paragraph') {
                updatedScore = questionContainer.querySelector(`#question-${i}-paragraph-user-score`).value || 0;
            }

            const quizDocRef = doc(db, 'users', selectedStudentid, 'classroom', selectedClassroomId, 'module', selectedModuleId, 'quiz', selectedQuizId, 'question', questionId);
            
            await updateDoc(quizDocRef, {
                score: Number(updatedScore)
            });

            console.log(`Updated score for question ${i} (ID: ${questionId}): ${updatedScore}`);
        }

        alert("Updated successfully!");
        quizDetailList.innerHTML = '';
        questionNumber =0;
        lastOptionNumber = 0;
        studentTotalScore = 0;
        fetchActiveStudents();
        fetchQuizQuestionDetail(selectedStudentid);

    } catch (error) {
        console.error("Error updating student quiz scores:", error);
        alert("Failed to save scores. Please try again.");
    }
}








document.addEventListener('DOMContentLoaded', () => {
    fetchActiveStudents();
    document.querySelector("#btn-save-score-details").addEventListener("click", async () => {
        saveScoreChanges();
    });

});
