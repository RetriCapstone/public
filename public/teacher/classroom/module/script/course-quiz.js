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

let lastQuestionNumber = 0;
let lastOptionNumber = 1;

async function activeButton(activeBtn, notActiveBtn1, notActiveBtn2) {
    activeBtn.classList.add('quiz-active-nav');
    notActiveBtn1.classList.remove('quiz-active-nav');
    notActiveBtn2.classList.remove('quiz-active-nav');
}

async function activeContainer(activeCon, notActive1, notActive2) {
    activeCon.style.display = 'block';
    notActive1.style.display = 'none';
    notActive2.style.display = 'none';
}

function auto_height(textarea) { 
    textarea.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight) + 'px';
    });

    textarea.addEventListener('focusin', function() {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight) + 'px';
    });

    // Initialize the textarea height
    textarea.style.height = 'auto';
    textarea.style.height = (textarea.scrollHeight) + 'px';
}

function updateChoiceOptions(selectElement, optionsContainer) {
    // Clear existing options
    selectElement.innerHTML = '';

    // Add a default option
    const defaultOption = document.createElement('option');
    defaultOption.textContent = 'Select an answer';
    defaultOption.disabled = true;
    defaultOption.selected = true;
    selectElement.appendChild(defaultOption);

    // Add new options based on the current input values
    optionsContainer.querySelectorAll('.choice-option-con input').forEach(input => {
        const option = document.createElement('option');
        option.value = input.value;
        option.textContent = input.value;
        selectElement.appendChild(option);
    });
}

// Function to add a new option and update the select element
function addOption(questionNumber) {
    lastOptionNumber += 1;
    const optionNumber = lastOptionNumber;
    const choiceBody1 = document.querySelector(`#choice-body-${questionNumber}`);
    const choiceSelect = document.querySelector(`#question-${questionNumber}-choice-select-answer`);
    const optionContainer = document.createElement('div');
    optionContainer.classList.add('choice-option-con');
    optionContainer.id = `choice-option-${questionNumber}-${optionNumber}`;
    optionContainer.innerHTML = `
        <i class="fa-regular fa-circle"></i>
        <input type="text" required class="quiz-option-answer" autocomplete="off" placeholder="Option" id="question-${questionNumber}-choice-option-${optionNumber}">
        <i class="fa-solid fa-xmark delete-option" id="delete-option-${questionNumber}-${optionNumber}"></i>
    `;
    choiceBody1.appendChild(optionContainer);

    // Add event listener to update select options when input value changes
    optionContainer.querySelector('input').addEventListener('input', function () {
        updateChoiceOptions(choiceSelect, choiceBody1);
    });

    // Update options whenever the select element is focused
    choiceSelect.addEventListener('focus', function () {
        updateChoiceOptions(choiceSelect, choiceBody1);
    });

    // Add event listener to remove the option when the delete icon is clicked
    optionContainer.querySelector('.delete-option').addEventListener('click', function () {
        optionContainer.remove();
        updateChoiceOptions(choiceSelect, choiceBody1);
    });
}

//func: add question (onlclick)
function addQuestion() {
    const questionContainer = document.createElement('div');
    lastQuestionNumber += 1;
    const questionNumber = lastQuestionNumber;
    questionContainer.classList.add('style-container-1', 'quiz-question-container');
    questionContainer.id = `question-${questionNumber}`;

    questionContainer.innerHTML = `
        <div class="question-body-con" id="question-body-${questionNumber}">
        
            <div class="question-header-con" id="question-header-con-${questionNumber}" >
                <div class="question-point-container">
                    <input type="number" readonly value="1" id="question-point-${questionNumber}">
                    <span>points</span>
                </div>
                <select class="style-select question-type-select" disabled name="question-type" id="question-type-${questionNumber}">
                    <option value="identification">Identification</option>
                    <option value="choice">Multiple choice</option>
                    <option value="paragraph">Paragraph</option>
                    
                </select>
            </div>
            
            <div class="quiz-identify-con" id="identify-con-${questionNumber}">
                <textarea rows="2" required readonly class="quiz-question-input auto-height-text-question" placeholder="Question" id="question-${questionNumber}-identify-question"></textarea>
                <div class="identify-body-1">
                    <input class="quiz-identify-answer" readonly type="text" required autocomplete="off" placeholder="Correct Answer" id="question-${questionNumber}-identify-answer">
                    <input class="quiz-identify-answer" readonly type="text" autocomplete="off" placeholder="Correct Answer(Alternative)" id="question-${questionNumber}-identify-alternate">
                </div>
                <div class="identify-body-2">
                    <div class="identify-radio-con">
                        <input type="checkbox" disabled id="identify-case-${questionNumber}" name="answer-case-${questionNumber}">
                        <label for="identify-case-${questionNumber}">Case Sensitive</label>
                    </div>
                </div>
                <hr class="divider-solid">
            </div>

            <div class="quiz-choice-con" id="choice-con-${questionNumber}">
                <textarea rows="2" readonly class="quiz-question-input auto-height-text-question" placeholder="Question" id="question-${questionNumber}-choice-question"></textarea>
                <div class="choice-body-1" id="choice-body-${questionNumber}">
                    <div class="choice-option-con" id="choice-option-${questionNumber}-1">
                        <i class="fa-regular fa-circle"></i>
                        <input type="text" readonly required class="quiz-option-answer" autocomplete="off" placeholder="Option" id="question-${questionNumber}-choice-option-1">
                        <i class="fa-solid fa-xmark delete-option" id="delete-option-${questionNumber}-1"></i>
                    </div>
                </div>
                <div class="choice-body-2">
                    <div style="display:none;" class="choice-add-btn" id="add-option-${questionNumber}">
                        <i class="fa-regular fa-circle"></i><span>&nbsp;Add option</span>
                    </div>
                    <div class="choice-answer-select">
                        <span>Answer:</span>
                        <select class="style-select" disabled id="question-${questionNumber}-choice-select-answer">
                            <option disabled selected>Select an answer</option>
                        </select>
                    </div>
                </div>
                <hr class="divider-solid">
            </div>

            <div class="quiz-paragraph-con" id="paragraph-con-${questionNumber}">
                <textarea readonly rows="2" required class="quiz-question-input auto-height-text-question" placeholder="Question" id="question-${questionNumber}-paragraph-question"></textarea>

                <div class="paragraph-body-1">
                    <div class="paragraph-text-card">
                        <span>Long answer text </span>
                    </div>
                </div>

                <hr class="divider-solid">
            </div>
            <div style="display:none;" class="delete-question-con" id="question-delete-button-${questionNumber}">
                <i class="fa-regular fa-trash-can"></i><span>Delete</span>
            </div>
        </div>
    `;

    document.querySelector('.quiz-questions-container').appendChild(questionContainer);
    questionContainer.querySelectorAll('.auto-height-text-question').forEach(auto_height);

    // Add event listener for the question type select
    const questionHeadercontainer = questionContainer.querySelector(`#question-header-con-${questionNumber}`);
    questionHeadercontainer.querySelector(`#question-type-${questionNumber}`).addEventListener('change', function () {
        const identificationDiv = questionContainer.querySelector(`#identify-con-${questionNumber}`);
        const choiceDiv = questionContainer.querySelector(`#choice-con-${questionNumber}`);
        const paragraphDiv = questionContainer.querySelector(`#paragraph-con-${questionNumber}`);
        if (this.value === 'choice') {
            identificationDiv.style.display = 'none';
            choiceDiv.style.display = 'block';
            paragraphDiv.style.display = 'none';
        } 
        else if(this.value === 'identification'){
            identificationDiv.style.display = 'block';
            choiceDiv.style.display = 'none';
            paragraphDiv.style.display = 'none';
            
        }
        else if(this.value === 'paragraph'){
            identificationDiv.style.display = 'none';
            choiceDiv.style.display = 'none';
            paragraphDiv.style.display = 'block';
            
        }
        
    });

    const choiceAddBtn = questionContainer.querySelector(`#add-option-${questionNumber}`);
    const choiceBody1 = questionContainer.querySelector(`#choice-body-${questionNumber}`);
    const choiceSelect = questionContainer.querySelector(`#question-${questionNumber}-choice-select-answer`);

    // Add event listener for the add option button
    choiceAddBtn.addEventListener('click', function () {
        lastOptionNumber += 1;
        const optionNumber = lastOptionNumber;
        const optionContainer = document.createElement('div');
        optionContainer.classList.add('choice-option-con');
        optionContainer.id = `choice-option-${questionNumber}-${optionNumber}`;
        optionContainer.innerHTML = `
            <i class="fa-regular fa-circle"></i>
            <input type="text" required class="quiz-option-answer" autocomplete="off" placeholder="Option" id="question-${questionNumber}-choice-option-${optionNumber}">
            <i class="fa-solid fa-xmark delete-option" id="delete-option-${questionNumber}-${optionNumber}"></i>
        `;
        choiceBody1.appendChild(optionContainer);

        // Update the options in the select element
        // updateChoiceOptions(choiceSelect, choiceBody1);

        // Add event listener to update select options when input value changes
        optionContainer.querySelector('input').addEventListener('input', function () {
            // updateChoiceOptions(choiceSelect, choiceBody1);
        });
        
        // Add event listener to update options when select is focused
        choiceSelect.addEventListener('focus', function () {
            updateChoiceOptions(choiceSelect, choiceBody1);
        });
        // Add event listener to remove the option when delete icon is clicked
        optionContainer.querySelector('.delete-option').addEventListener('click', function () {
            optionContainer.remove();
            updateChoiceOptions(choiceSelect, choiceBody1);
        });
    });
    // Add event listener for the delete question button
    questionContainer.querySelector(`#question-delete-button-${questionNumber}`).addEventListener('click', function () {
        questionContainer.remove();
    });
}


// -----------------------------------------saving---------------------------------------
//func: save quiz questions

const saveloadingIndicator= document.querySelector('.save-loading-indicator-bg');

async function saveQuestions() {
    const questionContainers = document.querySelectorAll('.quiz-question-container');
    const sectionDirection = document.querySelector('.quiz-direction-input').value;

    saveloadingIndicator.style.display = 'block'; // Show loading indicator
    // Define section and questions path
    try {
        const sectionDocRef = doc(db, 'teacher', teacherId, 'classroom', selectedClassroomId, 'module', selectedModuleId, 'quiz', selectedQuizId, 'section', 'section-1');
    const questionsCollectionRef = collection(sectionDocRef, 'question');

    // Delete existing questions
    const existingQuestionsSnapshot = await getDocs(questionsCollectionRef);
    const deletePromises = [];
    existingQuestionsSnapshot.forEach((doc) => {
        deletePromises.push(deleteDoc(doc.ref));
    });
    await Promise.all(deletePromises);

    // Save section direction
    await setDoc(sectionDocRef, { direction: sectionDirection });

    // Save each question
    const savePromises = [];
    questionContainers.forEach((container, index) => {
        let quizPoints = 1;
        quizPoints = Number(container.querySelector(`#question-point-${index + 1}`).value);
        const questionType = container.querySelector(`#question-type-${index + 1}`).value;
        let questionData = {
            point: quizPoints,
            type: questionType
        };

        if (questionType === 'identification') {
            questionData.question = container.querySelector(`#question-${index + 1}-identify-question`).value;
            questionData.answer = container.querySelector(`#question-${index + 1}-identify-answer`).value;
            questionData.alternate = container.querySelector(`#question-${index + 1}-identify-alternate`).value;
            questionData.case = container.querySelector(`#identify-case-${index + 1}`).checked;
        } 
        else if (questionType === 'choice') {
            questionData.question = container.querySelector(`#question-${index + 1}-choice-question`).value;
            const options = {};
            container.querySelectorAll(`.choice-option-con input`).forEach((input, optionIndex) => {
                options[`option-${optionIndex + 1}`] = input.value;
            });
            questionData.options = options;
            questionData.answer = container.querySelector(`#question-${index + 1}-choice-select-answer`).value;
        } 
        else if (questionType === 'paragraph') {
            questionData.question = container.querySelector(`#question-${index + 1}-paragraph-question`).value;
        }

        savePromises.push(setDoc(doc(questionsCollectionRef, `question-${index + 1}`), questionData));
    });

    await Promise.all(savePromises);

    saveloadingIndicator.style.display = 'none'; // Show loading indicator
    console.log('Questions and section direction saved successfully.');

    } catch (error) {
        console.error('Error updating quiz questions:', error);
        saveloadingIndicator.style.display = 'none'; // Show loading indicator
    }
    
}

//func: save quiz settings
async function saveQuizDetails() {
    saveloadingIndicator.style.display = 'block'; // Show loading indicator
    const quizName = document.getElementById('quiz-settings-name-input').value.trim().toUpperCase();
    const randomizeQuestions = document.getElementById('quiz-random-checkbox').checked;
    const showquestionAsnwer = document.getElementById('quiz-show-answer').checked;
    const durationHours = parseInt(document.getElementById('quiz-duration-hour').value) || 0;
    const durationMinutes = parseInt(document.getElementById('quiz-duration-minute').value) || 0;
    const durationSeconds = parseInt(document.getElementById('quiz-duration-second').value) || 0;
    const publishStatus = document.querySelector('.settings-select-status').value;
    const startDate = document.querySelector('input[name="quiz-datetime-start"]').value;
    const endDate = document.querySelector('input[name="quiz-datetime-end"]').value;

    try {
        // Define the path to the quiz document
        const quizDocRef = doc(db, 'teacher', teacherId, 'classroom', selectedClassroomId, 'module', selectedModuleId, 'quiz', selectedQuizId);

        // Prepare the data to be saved
        const quizData = {
            randomize: randomizeQuestions,
            showAnswer: showquestionAsnwer,
            duration: {
                hours: durationHours,
                minutes: durationMinutes,
                seconds: durationSeconds
            },
            status: publishStatus,
            startDate: publishStatus === 'set' ? new Date(startDate) : null,
            endDate: publishStatus === 'set' ? new Date(endDate) : null
        };

        // Save the quiz details to Firestore using updateDoc to avoid affecting other fields
        await setDoc(quizDocRef, quizData);
        // fetchQuizDetails();
        console.log('Quiz details updated successfully.');
        saveloadingIndicator.style.display = 'none'; // Show loading indicator
    } catch (error) {
        saveloadingIndicator.style.display = 'none'; // Show loading indicator
        console.error('Error updating quiz details:', error);
    }
}


// -----------------------------------------fetching---------------------------------------
//func: fecth quiz questions
async function fetchQuestionsAndDirection() {
    const loadingIndicator = document.querySelector('.loading-indicator');
    const directionContainer = document.querySelector('.quiz-direction-container');
    loadingIndicator.style.display = 'block'; // Show loading indicator
    directionContainer.style.display = 'none'; // Hide direction container

    try {
        const classroomRef = doc(db, 'teacher', teacherId, 'classroom', selectedClassroomId);

        // Fetch the classroom document
        const classroomDoc = await getDoc(classroomRef);
        const classroomData = classroomDoc.data();
        const classroomCourse = classroomData.course;
        
        const sectionDocRef = doc(db, 'course', classroomCourse, 'module', selectedModuleId, 'quiz', selectedQuizId, 'section', 'section-1');
        const questionsCollectionRef = collection(sectionDocRef, 'question');

        const sectionDoc = await getDoc(sectionDocRef);
        if (sectionDoc.exists()) {
            const sectionData = sectionDoc.data();
            document.querySelector('.quiz-direction-input').value = sectionData.direction || '';
        }

        const questionsSnapshot = await getDocs(questionsCollectionRef);
        const questionDataList = [];

        questionsSnapshot.forEach((doc) => {
            questionDataList.push({ id: doc.id, ...doc.data() });
        });

        // Remove any existing questions from the DOM
        document.querySelectorAll('.quiz-question-container').forEach(container => container.remove());

        questionDataList.forEach((questionData, index) => {
            addQuestion(); // Assuming addQuestion is a function that creates the question containers
            lastOptionNumber = 1; // Reset option number for each question
            const questionNumber = index + 1;
            const questionContainer = document.querySelector(`#question-${questionNumber}`);

            if (!questionContainer) {
                console.error(`Question container #question-${questionNumber} not found.`);
                return;
            }

            const quizContainerIdentify = document.getElementById(`identify-con-${questionNumber}`);
            const quizContainerChoice = document.getElementById(`choice-con-${questionNumber}`);
            const quizContainerParagraph = document.getElementById(`paragraph-con-${questionNumber}`);

            questionContainer.querySelector(`#question-point-${questionNumber}`).value = questionData.point || 1;
            const questionType = questionData.type;

            if (questionType === 'identification') {
                quizContainerIdentify.style.display = 'block';
                quizContainerChoice.style.display = 'none';
                quizContainerParagraph.style.display = 'none';

                questionContainer.querySelector(`#question-type-${questionNumber}`).value = 'identification';
                questionContainer.querySelector(`#question-${questionNumber}-identify-question`).value = questionData.question || '';
                questionContainer.querySelector(`#question-${questionNumber}-identify-answer`).value = questionData.answer || '';
                questionContainer.querySelector(`#question-${questionNumber}-identify-alternate`).value = questionData.alternate || '';
                questionContainer.querySelector(`#identify-case-${questionNumber}`).checked = questionData.case || false;

            } else if (questionType === 'choice') {
                quizContainerIdentify.style.display = 'none';
                quizContainerChoice.style.display = 'block';
                quizContainerParagraph.style.display = 'none';

                questionContainer.querySelector(`#question-type-${questionNumber}`).value = 'choice';
                questionContainer.querySelector(`#question-${questionNumber}-choice-question`).value = questionData.question || '';

                const choiceBody1 = questionContainer.querySelector(`#choice-body-${questionNumber}`);
                const choiceSelect = questionContainer.querySelector(`#question-${questionNumber}-choice-select-answer`);

                // Add options dynamically from questionData
                Object.keys(questionData.options).forEach((key, optionIndex) => {
                    if (optionIndex > 0) {
                        addOption(questionNumber); // Add more options if available
                    }
                    const optionNumber = optionIndex + 1;
                    const optionContainer = choiceBody1.querySelector(`#choice-option-${questionNumber}-${optionNumber}`);
                    if (optionContainer) {
                        optionContainer.querySelector('input').value = questionData.options[key];
                    } else {
                        console.error(`Option container #choice-option-${questionNumber}-${optionNumber} not found.`);
                    }
                });

                // Update options in the select element and set the correct answer
                updateChoiceOptions(choiceSelect, choiceBody1);
                choiceSelect.value = questionData.answer || '';
            } else if (questionType === 'paragraph') {
                quizContainerIdentify.style.display = 'none';
                quizContainerChoice.style.display = 'none';
                quizContainerParagraph.style.display = 'block';

                questionContainer.querySelector(`#question-type-${questionNumber}`).value = 'paragraph';
                questionContainer.querySelector(`#question-${questionNumber}-paragraph-question`).value = questionData.question || '';
            }
        });

        loadingIndicator.style.display = 'none'; // Hide loading indicator
        directionContainer.style.display = 'block'; // Show direction container
    } catch (error) {
        console.error("Error fetching questions and direction:", error);
        loadingIndicator.style.display = 'none'; // Hide loading indicator
        directionContainer.style.display = 'block'; // Show direction container
    }
}

//func: fecth quiz settings
async function fetchQuizDetails() {
    try {
        const classroomRef = doc(db, 'teacher', teacherId, 'classroom', selectedClassroomId);
        
        // Fetch the classroom document
        const classroomDoc = await getDoc(classroomRef);
        const classroomData = classroomDoc.data();
        const classroomCourse = classroomData.course;
        
        const quizDocRef = doc(db, 'course', classroomCourse, 'module', selectedModuleId, 'quiz', selectedQuizId);
        const quizDoc = await getDoc(quizDocRef);

        const classquizDocRef = doc(db, 'teacher', teacherId, 'classroom', selectedClassroomId, 'module', selectedModuleId, 'quiz', selectedQuizId);
        const classquizDoc = await getDoc(classquizDocRef);

        const quizData = quizDoc.data();
        document.getElementById('quiz-name').innerText = quizData.name || '';
        document.getElementById('quiz-settings-name-input').value = quizData.name || '';
        
        if (classquizDoc.exists()) {
            const quizData = classquizDoc.data();

            document.getElementById('quiz-random-checkbox').checked = quizData.randomize || false;
            document.getElementById('quiz-show-answer').checked = quizData.showAnswer || false;

            if (quizData.duration) {
                document.getElementById('quiz-duration-hour').value = quizData.duration.hours || 0;
                document.getElementById('quiz-duration-minute').value = quizData.duration.minutes || 0;
                document.getElementById('quiz-duration-second').value = quizData.duration.seconds || 0;
            } else {
                document.getElementById('quiz-duration-hour').value = 0;
                document.getElementById('quiz-duration-minute').value = 0;
                document.getElementById('quiz-duration-second').value = 0;
            }

            const statusSelect = document.querySelector('.settings-select-status');
            statusSelect.value = quizData.status || 'close';

            const settingsStatusContainer = document.querySelector('.settings-datetime-con');
            if (quizData.status === 'set') {
                settingsStatusContainer.style.display = 'flex';
                // Correctly convert Firestore Timestamp to ISO string format
                if (quizData.startDate && quizData.startDate.toDate) {
                    document.querySelector('input[name="quiz-datetime-start"]').value = convertToLocalDateTime(quizData.startDate.toDate());
                } else {
                    document.querySelector('input[name="quiz-datetime-start"]').value = '';
                }

                if (quizData.endDate && quizData.endDate.toDate) {
                    document.querySelector('input[name="quiz-datetime-end"]').value = convertToLocalDateTime(quizData.endDate.toDate());
                } else {
                    document.querySelector('input[name="quiz-datetime-end"]').value = '';
                }
            } else {
                settingsStatusContainer.style.display = 'none';
            }
        }else if (quizDoc.exists()) {
            const quizData = quizDoc.data();

            document.getElementById('quiz-random-checkbox').checked = quizData.randomize || false;
            document.getElementById('quiz-show-answer').checked = quizData.showAnswer || false;

            if (quizData.duration) {
                document.getElementById('quiz-duration-hour').value = quizData.duration.hours || 0;
                document.getElementById('quiz-duration-minute').value = quizData.duration.minutes || 0;
                document.getElementById('quiz-duration-second').value = quizData.duration.seconds || 0;
            } else {
                document.getElementById('quiz-duration-hour').value = 0;
                document.getElementById('quiz-duration-minute').value = 0;
                document.getElementById('quiz-duration-second').value = 0;
            }

            const statusSelect = document.querySelector('.settings-select-status');
            statusSelect.value = quizData.status || 'close';

            const settingsStatusContainer = document.querySelector('.settings-datetime-con');
            if (quizData.status === 'set') {
                settingsStatusContainer.style.display = 'flex';
                // Correctly convert Firestore Timestamp to ISO string format
                if (quizData.startDate && quizData.startDate.toDate) {
                    document.querySelector('input[name="quiz-datetime-start"]').value = convertToLocalDateTime(quizData.startDate.toDate());
                } else {
                    document.querySelector('input[name="quiz-datetime-start"]').value = '';
                }

                if (quizData.endDate && quizData.endDate.toDate) {
                    document.querySelector('input[name="quiz-datetime-end"]').value = convertToLocalDateTime(quizData.endDate.toDate());
                } else {
                    document.querySelector('input[name="quiz-datetime-end"]').value = '';
                }
            } else {
                settingsStatusContainer.style.display = 'none';
            }
        } else {
            console.log('No quiz details found.');
        }

    } catch (error) {
        console.error('Error fetching quiz details:', error);
    }
}

//delete quiz
async function deleteQuiz() {
    const confirmed = confirm('Are you sure you want to delete this quiz? This action cannot be undone.');

    if (confirmed) {
        try {
            // Path to the selected module document
            const moduleRef = doc(db, 'teacher', teacherId, 'classroom', selectedClassroomId, 'module', selectedModuleId, 'quiz', selectedQuizId );
            
            // Delete the module document
            await deleteDoc(moduleRef);

            alert('lecture deleted successfully.');
            navigateToPage('/public/teacher/classroom/module.php', 'Mid', 'ItemId', 'Sid');

        } catch (error) {
            console.error('Error deleting lecture:', error);
            alert('An error occurred while deleting the lecture. Please try again.');
        }
    }
}

//func: convert fetched date time
function convertToLocalDateTime(date) {
    const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
    return local.toISOString().slice(0, 16);
}
//func: navigation param

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


document.addEventListener('DOMContentLoaded', () => {
    

    document.querySelector('#student-link').addEventListener('click', () => {
        navigateToPage('/public/teacher/classroom/student.php', 'Mid', 'ItemId', 'Sid');
    });
    document.querySelector('#module-link').addEventListener('click', () => {
        navigateToPage('/public/teacher/classroom/module.php', 'Mid', 'ItemId', 'Sid');
    });

    auto_height(document.querySelector('.auto-height-text-dir'));
    
    // nav bar function
    const questionBtn = document.getElementById('quiz-question-btn');
    const responseBtn = document.getElementById('quiz-response-btn');
    const settingsBtn = document.getElementById('quiz-settings-btn');

    const questionContainer = document.querySelector('.quiz-questions-container');
    const responseContainer = document.querySelector('.quiz-responses-container');
    const settingsContainer = document.querySelector('.quiz-settings-container');
    const questionToolContainer = document.querySelector('.quiz-question-tool-container');

    questionBtn.addEventListener('click', () => {
        activeButton(questionBtn, responseBtn, settingsBtn);
        activeContainer(questionContainer, responseContainer, settingsContainer);
        questionToolContainer.style.display = 'block';
    });

    responseBtn.addEventListener('click', () => {
        activeButton(responseBtn, questionBtn, settingsBtn);
        activeContainer(responseContainer, questionContainer, settingsContainer);
        questionToolContainer.style.display = 'none';
    });

    settingsBtn.addEventListener('click', () => {
        activeButton(settingsBtn, responseBtn, questionBtn);
        activeContainer(settingsContainer, responseContainer, questionContainer);
        questionToolContainer.style.display = 'none';
    });
    // settings quiz publish status
    const settingsStatusContainer = document.querySelector('.settings-datetime-con');
    const settingsStatusSelect = document.querySelector('.settings-select-status');
    settingsStatusSelect.addEventListener('change', function () {
        if (this.value === 'set') {
            settingsStatusContainer.style.display = 'flex';
        }else {
            settingsStatusContainer.style.display = 'none';
        }
    });
    // Add event listener for the add question button
    document.querySelector('.add-question-btn').addEventListener('click', addQuestion);


    // Add event listener for the save button
    document.getElementById('quiz-save-btn').addEventListener('click', () => {
        // saveQuestions(); // Save questions
        saveQuizDetails(); // Save quiz details
    });

    document.querySelector('#btn-delete-quiz').addEventListener('click', deleteQuiz);

    // Fetch questions and direction on page load
    fetchQuestionsAndDirection();
    fetchQuizDetails();
});
