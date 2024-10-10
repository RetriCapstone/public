import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, getDocs, getDoc, deleteDoc, updateDoc, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


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
const selectedActivityId = getQueryParam('ItemId');

let lastDescItem = 0;
let lastQuestionNumber = 0;


async function activeButton(activeBtn, notActiveBtn1, notActiveBtn2) {
    activeBtn.classList.add('code-active-btn');
    notActiveBtn1.classList.remove('code-active-btn');
    notActiveBtn2.classList.remove('code-active-btn');
}

async function activeContainer(activeCon, notActive1, notActive2) {
    activeCon.style.display = 'flex';
    notActive1.style.display = 'none';
    notActive2.style.display = 'none';
}


async function NavActiveButton(activeBtn, notActiveBtn1, notActiveBtn2) {
    activeBtn.classList.add('code-active-nav');
    notActiveBtn1.classList.remove('code-active-nav');
    notActiveBtn2.classList.remove('code-active-nav');
}

async function NavActiveContainer(activeCon, notActive1, notActive2) {
    activeCon.style.display = 'block';
    notActive1.style.display = 'none';
    notActive2.style.display = 'none';
}

// auto height text area
async function auto_height(textarea) {
    textarea.addEventListener('input', function () {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight) + 'px';
    });
    textarea.addEventListener('focusin', function () {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight) + 'px';
    });
    // Initialize the textarea height
    textarea.style.height = 'auto';
    textarea.style.height = (textarea.scrollHeight) + 'px';
}

// Function to add a text description
function addTextDesc(questionNumber) {
    const descItemContainer = document.querySelector(`#code-desc-list-question-${questionNumber}`);
    const textDescContainer = document.createElement('div');
    lastDescItem += 1; // Increment item number globally
    const itemNumber = lastDescItem; // Unique ID for each item

    textDescContainer.classList.add('code-desc-con');
    textDescContainer.id = `code-text-desc-question-${questionNumber}-item-${itemNumber}`;

    textDescContainer.innerHTML = `
    <div class="text-desc-body">
        <textarea class="code-text-field text-desc" required autocomplete="off" placeholder="Description" id="text-desc-input-question-${questionNumber}-item-${itemNumber}"></textarea>
        <i class="fa-solid fa-xmark delete-option" id="delete-text-desc-input-question-${questionNumber}-item-${itemNumber}"></i>
    </div>
    `;

    descItemContainer.appendChild(textDescContainer);
    auto_height(textDescContainer.querySelector('textarea')); // Apply auto height

    textDescContainer.querySelector(`#delete-text-desc-input-question-${questionNumber}-item-${itemNumber}`).addEventListener('click', function () {
        textDescContainer.remove();
    });
}

// Function to add a line divider
function addLineDesc(questionNumber) {
    const descItemContainer = document.querySelector(`#code-desc-list-question-${questionNumber}`);
    const lineDividerContainer = document.createElement('div');
    lastDescItem += 1; // Increment item number globally
    const itemNumber = lastDescItem;

    lineDividerContainer.classList.add('code-desc-con');
    lineDividerContainer.id = `code-div-desc-question-${questionNumber}-item-${itemNumber}`;

    lineDividerContainer.innerHTML = `
    <div class="text-desc-body">
        <div class="text-divider"></div>             
        <i class="fa-solid fa-xmark delete-option"  id="delete-text-question-${questionNumber}-item-${itemNumber}"></i>
    </div>
    `;
    descItemContainer.appendChild(lineDividerContainer);

    lineDividerContainer.querySelector(`#delete-text-question-${questionNumber}-item-${itemNumber}`).addEventListener('click', function () {
        lineDividerContainer.remove();
    });
}

// Function to add a new code question
function addCodeQuestion() {
    const codequestionContainer = document.createElement('div');
    lastQuestionNumber += 1; 
    lastDescItem += 1; 
    const questionNumber = lastQuestionNumber; 
    const itemNumber = lastDescItem; 

    codequestionContainer.classList.add('code-question');
    codequestionContainer.id = `code-question-${questionNumber}`;

    codequestionContainer.innerHTML = `
    <div class="code-question-body">
        <div class="code-body-card-1">
            <div class="code-tool-con">
                <div class="btn-tool" id="btn-add-text-desc-question-${questionNumber}">
                    <img src="/public/teacher/images/text-size-icon.png" alt="">
                </div>
                <div class="btn-tool" id="btn-add-divider-question-${questionNumber}">
                    <img src="/public/teacher/images/line-seperate.png" alt="">
                </div>
            </div>
            <div class="code-text-list-container" id="code-desc-list-question-${questionNumber}">
                <div class="code-desc-con question-title" id="code-title-desc-question-${questionNumber}-item-${itemNumber}">
                    <div class="text-desc-body">
                        <textarea class="code-text-field text-question" autocomplete="off" required placeholder="Question title" id="title-desc-input-question-${questionNumber}"></textarea>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="code-body-card-2">
            <div class="code-editor-con">
                <div class="code-editor-header compiler-header">
                    <div style="display: flex; gap: .6rem;">
                        <div class="code-compiler-btn code-active-btn" id="btn-compiler-code-question-${questionNumber}">Code</div>
                        <div class="code-input-btn" id="btn-input-code-question-${questionNumber}">Input</div>
                        <div class="code-output-btn" id="btn-output-code-question-${questionNumber}">Output</div>
                    </div>
                    <button class="btn-code-submit" id="btn-submit-question-${questionNumber}">
                        <i class="fa-solid fa-play"></i> Run
                    </button>
                </div>

                <div class="editor-container compiler-editor" id="code-compiler-ide-question-${questionNumber}">
                    <div class="line-numbers" id="lineNumbers"></div>
                    <textarea id="codeEditor-question-${questionNumber}" class="code-editor" spellcheck="false" placeholder="<code>"></textarea>
                </div>

                <div class="editor-container input-editor" id="code-input-ide-question-${questionNumber}" style="display: none;">
                    <div class="line-numbers" id="lineNumbers"></div>
                    <textarea id="codeInput-question-${questionNumber}" class="code-editor" spellcheck="false" placeholder="<input>"></textarea>
                </div>

                <div class="code-output-con output-editor" id="code-output-ide-question-${questionNumber}" style="display: none;">
                    <textarea id="codeOutput-question-${questionNumber}" class="code-output-editor" spellcheck="false" placeholder="<output>"></textarea>
                </div>
            </div>
        </div>
    </div>
    
    <div class="code-question-bottom">

        <div class="question-point-container" >
            <input type="number" value="1" id="code-point-input-question-${questionNumber}">
            <span>points</span>
        </div>

        <div class="delete-question-con" id="code-delete-button-question-${questionNumber}">
            <i class="fa-regular fa-trash-can"></i><span>Delete</span>
        </div>

    </div>
    `;


    document.querySelector('.code-question-list').appendChild(codequestionContainer);

    document.getElementById(`btn-add-text-desc-question-${questionNumber}`).addEventListener('click', () => addTextDesc(questionNumber));
    document.getElementById(`btn-add-divider-question-${questionNumber}`).addEventListener('click', () => addLineDesc(questionNumber));

    const btnCompiler = document.querySelector(`#btn-compiler-code-question-${questionNumber}`);
    const ideCompiler = document.querySelector(`#code-compiler-ide-question-${questionNumber}`);
    const btnInput = document.querySelector(`#btn-input-code-question-${questionNumber}`);
    const ideInput = document.querySelector(`#code-input-ide-question-${questionNumber}`);
    const btnOutput = document.querySelector(`#btn-output-code-question-${questionNumber}`);
    const ideOutput = document.querySelector(`#code-output-ide-question-${questionNumber}`);

    btnCompiler.addEventListener('click', () => {
        activeButton(btnCompiler, btnInput, btnOutput);
        activeContainer(ideCompiler, ideInput, ideOutput);
    });

    btnInput.addEventListener('click', () => {
        activeButton(btnInput, btnCompiler, btnOutput);
        activeContainer(ideInput, ideCompiler, ideOutput);
    });

    btnOutput.addEventListener('click', () => {
        activeButton(btnOutput, btnCompiler, btnInput);
        activeContainer(ideOutput, ideInput, ideCompiler);
    });

    const btnRunCode = document.querySelector(`#btn-submit-question-${questionNumber}`);

    const CodeEditor = document.querySelector(`#codeEditor-question-${questionNumber}`);

    const InputEditor = document.querySelector(`#codeInput-question-${questionNumber}`);

    const OutputEditor = document.querySelector(`#codeOutput-question-${questionNumber}`);

    btnRunCode.addEventListener('click', () => {
        OutputEditor.value = '';
        activeButton(btnOutput, btnCompiler, btnInput);
        activeContainer(ideOutput, ideInput, ideCompiler);
        runCode(CodeEditor, InputEditor, OutputEditor)

    });

}

async function runCode(codeField, inputField, outputField) {
    const code = codeField.value;
    const inputs = inputField.value;
    const outputContainer = outputField;

    const payload = {
        script: code,
        stdin: inputs
    };

    try {
        const response = await fetch('https://mca-codedojo.online/run', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        const result = await response.json();
        console.log(result); // Check the API response
        if (response.ok) {
            outputContainer.value = result.output || 'No output available';
        } else {
            outputContainer.value = `Error: ${result.error}`;
        }
    } catch (error) {
        outputContainer.value = `Request failed: ${error.message}`;
    }
}


// -----------------------------------------saving---------------------------------------
//func: save quiz questions

const saveloadingIndicator = document.querySelector('.save-loading-indicator-bg');

async function saveCodingQuestion() {
    const codeQuestionContainers = document.querySelectorAll('.code-question'); 
    saveloadingIndicator.style.display = 'block'; // Show loading indicator

    try {
        const sectionDocRef = doc(db, 'teacher', teacherId, 'classroom', selectedClassroomId, 'module', selectedModuleId, 'activity', selectedActivityId);
        const questionsCollectionRef = collection(sectionDocRef, 'question');

        // Delete existing questions
        const existingQuestionsSnapshot = await getDocs(questionsCollectionRef);
        const deletePromises = [];
        existingQuestionsSnapshot.forEach((doc) => {
            deletePromises.push(deleteDoc(doc.ref));
        });
        await Promise.all(deletePromises);

        // Save each question
        const savePromises = [];

        codeQuestionContainers.forEach((container, index) => {
            const questionNumber = index + 1;
            const quizPoints = Number(container.querySelector(`#code-point-input-question-${questionNumber}`).value);
            const code = container.querySelector(`#codeEditor-question-${questionNumber}`).value;
            const input = container.querySelector(`#codeInput-question-${questionNumber}`).value;
            const output = container.querySelector(`#codeOutput-question-${questionNumber}`).value;

            // Initialize the description array
            const descArray = [];

            // Get all items in the description list
            const descItems = container.querySelectorAll(`#code-desc-list-question-${questionNumber} .code-desc-con`);
            descItems.forEach((item) => {
                // Check if the item is a question title
                if (item.classList.contains('question-title')) {
                    const questionTitle = item.querySelector('textarea').value;
                    descArray.push(questionTitle); // Add question title to the array (first index)
                } else if (item.querySelector('textarea')) {
                    const textDesc = item.querySelector('textarea').value;
                    descArray.push(textDesc); // Add text description
                } else if (item.querySelector('.text-divider')) {
                    descArray.push({ divider: true }); // Add divider as a boolean
                }
            });

            // Create question data object
            const questionData = {
                point: quizPoints,
                code: code,
                input: input,
                output: output,
                desc: descArray // Save the description array
            };

            // Save question data to Firestore
            savePromises.push(setDoc(doc(questionsCollectionRef, `question-${questionNumber}`), questionData));
        });

        // Wait for all save promises to resolve
        await Promise.all(savePromises);
        saveloadingIndicator.style.display = 'none'; // Hide loading indicator
        console.log('Questions and section direction saved successfully.');
    } catch (error) {
        console.error('Error saving quiz questions:', error);
        saveloadingIndicator.style.display = 'none'; // Hide loading indicator on error
    }
}

async function saveCodeActivityDetails() {
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
        const quizDocRef = doc(db, 'teacher', teacherId, 'classroom', selectedClassroomId, 'module', selectedModuleId, 'activity', selectedActivityId);

        // Prepare the data to be saved
        const quizData = {
            name: quizName,
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
        await updateDoc(quizDocRef, quizData);
        fetchQuizDetails();
        console.log('Quiz details updated successfully.');
    } catch (error) {
        console.error('Error updating quiz details:', error);
    }
}


// -----------------------------------------fetching---------------------------------------
//func: fecth activity questions
async function fetchCodingQuestion() {
    const codeQuestionContainer = document.querySelector('.code-question-list');
    
    try {
        const sectionDocRef = doc(db, 'teacher', teacherId, 'classroom', selectedClassroomId, 'module', selectedModuleId, 'activity', selectedActivityId);
        const questionsCollectionRef = collection(sectionDocRef, 'question');

        const questionsSnapshot = await getDocs(questionsCollectionRef);

        codeQuestionContainer.innerHTML = '';

        for (let doc of questionsSnapshot.docs) {
            const questionData = doc.data();
            const questionNumber = doc.id.split('-')[1]; 

            addCodeQuestion();

            setTimeout(() => {
                // Set the point value
                const pointInput = document.querySelector(`#code-point-input-question-${questionNumber}`);
                if (pointInput) {
                    pointInput.value = questionData.point;
                }

                // Set the code, input, and output values
                const codeEditor = document.querySelector(`#codeEditor-question-${questionNumber}`);
                const inputEditor = document.querySelector(`#codeInput-question-${questionNumber}`);
                const outputEditor = document.querySelector(`#codeOutput-question-${questionNumber}`);
                
                if (codeEditor) codeEditor.value = questionData.code;
                if (inputEditor) inputEditor.value = questionData.input;
                if (outputEditor) outputEditor.value = questionData.output;

                // Rebuild the description items
                const descArray = questionData.desc || [];
                descArray.forEach((descItem, index) => {
                    if (typeof descItem === 'string') {
                        if (index === 0) {
                            const titleInput = document.querySelector(`#title-desc-input-question-${questionNumber}`);
                            if (titleInput) {
                                titleInput.value = descItem;
                            }
                        } else {
                            addTextDesc(questionNumber);
                            const itemNumber = lastDescItem; // Get the latest desc item number
                            const textDescInput = document.querySelector(`#text-desc-input-question-${questionNumber}-item-${itemNumber}`);
                            if (textDescInput) {
                                textDescInput.value = descItem;
                            }
                            auto_height(textDescInput);
                        }
                    } else if (descItem.divider === true) {
                        addLineDesc(questionNumber);
                    }
                });
            }, 0); // Ensure the DOM is ready after adding the question
        }

        console.log('Questions fetched successfully.');
    } catch (error) {
        console.error('Error fetching quiz questions:', error);
    }
}

//func: fecth activity settings
async function fetchQuizDetails() {
    try {
        // Define the path to the quiz document
        const quizDocRef = doc(db, 'teacher', teacherId, 'classroom', selectedClassroomId, 'module', selectedModuleId, 'activity', selectedActivityId);

        // Fetch the quiz document
        const quizDoc = await getDoc(quizDocRef);

        if (quizDoc.exists()) {
            const quizData = quizDoc.data();

            // Populate the quiz settings
            document.getElementById('act-name').innerText = quizData.name || '';
            document.getElementById('quiz-settings-name-input').value = quizData.name || '';
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

//delete activity
async function deleteQuiz() {
    const confirmed = confirm('Are you sure you want to delete this quiz? This action cannot be undone.');

    if (confirmed) {
        try {
            // Path to the selected module document
            const moduleRef = doc(db, 'teacher', teacherId, 'classroom', selectedClassroomId, 'module', selectedModuleId, 'activity', selectedActivityId );
            
            // Delete the module document
            await deleteDoc(moduleRef);

            alert('lecture deleted successfully.');
            navigateToPage('/public/teacher/classroom/module.php');

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
    // nav bar function
    const questionBtn = document.getElementById('code-question-btn');
    const responseBtn = document.getElementById('code-response-btn');
    const settingsBtn = document.getElementById('code-settings-btn');

    const questionContainer = document.querySelector('.code-question-con');
    const responseContainer = document.querySelector('.code-responses-con');
    const settingsContainer = document.querySelector('.code-settings-con');
    const questionToolContainer = document.querySelector('.code-question-add');

    questionBtn.addEventListener('click', () => {
        NavActiveButton(questionBtn, responseBtn, settingsBtn);
        NavActiveContainer(questionContainer, responseContainer, settingsContainer);
        questionToolContainer.style.display = 'block';
    });

    responseBtn.addEventListener('click', () => {
        NavActiveButton(responseBtn, questionBtn, settingsBtn);
        NavActiveContainer(responseContainer, questionContainer, settingsContainer);
        questionToolContainer.style.display = 'none';
    });

    settingsBtn.addEventListener('click', () => {
        NavActiveButton(settingsBtn, responseBtn, questionBtn);
        NavActiveContainer(settingsContainer, responseContainer, questionContainer);
        questionToolContainer.style.display = 'none';
    });
    const settingsStatusContainer = document.querySelector('.settings-datetime-con');
    const settingsStatusSelect = document.querySelector('.settings-select-status');
    settingsStatusSelect.addEventListener('change', function () {
        if (this.value === 'set') {
            settingsStatusContainer.style.display = 'flex';
        } else {
            settingsStatusContainer.style.display = 'none';
        }
    });

    document.getElementById('code-save-btn').addEventListener('click', () => {
        saveCodingQuestion(); // Save questions
        saveCodeActivityDetails();
    });

    document.querySelector('#btn-delete-quiz').addEventListener('click', deleteQuiz);
    
    document.getElementById('code-add-question').addEventListener('click', function () {
        addCodeQuestion();
    });

    fetchCodingQuestion();
    fetchQuizDetails();
});