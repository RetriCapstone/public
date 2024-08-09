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
const selectedModuleId = localStorage.getItem("selectedModuleId");
const selectedQuizId = localStorage.getItem("selectedItemId");

let lastQuestionNumber = 0;
let lastOptionNumber = 0;

async function getQuizName() {
    if (!selectedQuizId) {
        console.error("Missing required identifiers");
        return;
    }

    try {
        document.getElementById('quiz-name').innerText = selectedQuizId;
        document.getElementById('quiz-settings-name-input').value = selectedQuizId;
    } catch (error) {
        console.error("Error getting course name:", error);
    }
}

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

function addQuestion() {
    const questionContainer = document.createElement('div');
    lastQuestionNumber += 1;
    const questionNumber = lastQuestionNumber;
    questionContainer.classList.add('style-container-1', 'quiz-question-container');
    questionContainer.id = `question-${questionNumber}`;

    questionContainer.innerHTML = `
        <div class="question-body-con" id="question-body-${questionNumber}">
            <select class="style-select question-type-select" name="question-type" id="question-type-${questionNumber}">
                <option value="identification">Identification</option>
                <option value="choice">Multiple choice</option>
            </select>
            
            <div class="quiz-identify-con" id="identify-con-${questionNumber}">
                <textarea rows="2" required class="quiz-question-input auto-height-text-question" placeholder="Question" id="question-${questionNumber}-identify-question"></textarea>
                <div class="identify-body-1">
                    <input class="quiz-identify-answer" type="text" required autocomplete="false" placeholder="Answer" id="question-${questionNumber}-identify-answer">
                </div>
                <div class="identify-body-2">
                    <div class="identify-radio-con">
                        <input type="radio" id="identify-exact-${questionNumber}" name="answer-case-${questionNumber}" value="exact" checked>
                        <label for="identify-exact-${questionNumber}">Exact Case</label>
                    </div>
                    <div class="identify-radio-con">
                        <input type="radio" id="identify-all-caps-${questionNumber}" name="answer-case-${questionNumber}" value="all-caps">
                        <label for="identify-all-caps-${questionNumber}">All Caps</label>
                    </div>
                    <div class="identify-radio-con">
                        <input type="radio" id="identify-small-caps-${questionNumber}" name="answer-case-${questionNumber}" value="small-caps">
                        <label for="identify-small-caps-${questionNumber}">Small Caps</label>
                    </div>
                </div>
                <hr class="divider-solid">
            </div>

            <div class="quiz-choice-con" id="choice-con-${questionNumber}" style="display: none;">
                <textarea rows="2" class="quiz-question-input auto-height-text-question" placeholder="Question" id="question-${questionNumber}-choice-question"></textarea>
                <div class="choice-body-1" id="choice-body-${questionNumber}">
                    <div class="choice-option-con" id="choice-option-${questionNumber}-1">
                        <i class="fa-regular fa-circle"></i>
                        <input type="text" required class="quiz-option-answer" autocomplete="false" placeholder="Option" id="question-${questionNumber}-choice-option-1">
                        <i class="fa-solid fa-xmark delete-option" id="delete-option-${questionNumber}-1"></i>
                    </div>
                </div>
                <div class="choice-body-2">
                    <div class="choice-add-btn" id="add-option-${questionNumber}">
                        <i class="fa-regular fa-circle"></i><span>&nbsp;Add option</span>
                    </div>
                    <div class="choice-answer-select">
                        <span>Answer:</span>
                        <select class="style-select" id="question-${questionNumber}-choice-select-answer">
                            <option disabled selected>Select an answer</option>
                        </select>
                    </div>
                </div>
                <hr class="divider-solid">
            </div>

            <div class="delete-question-con" id="question-delete-button-${questionNumber}">
                <i class="fa-regular fa-trash-can"></i><span>Delete</span>
            </div>
        </div>
    `;

    document.querySelector('.quiz-questions-container').appendChild(questionContainer);
    questionContainer.querySelectorAll('.auto-height-text-question').forEach(auto_height);

    // Add event listener for the question type select
    questionContainer.querySelector(`#question-type-${questionNumber}`).addEventListener('change', function () {
        const identificationDiv = this.parentElement.querySelector(`#identify-con-${questionNumber}`);
        const choiceDiv = this.parentElement.querySelector(`#choice-con-${questionNumber}`);
        if (this.value === 'choice') {
            identificationDiv.style.display = 'none';
            choiceDiv.style.display = 'block';
        } else {
            identificationDiv.style.display = 'block';
            choiceDiv.style.display = 'none';
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
            <input type="text" required class="quiz-option-answer" autocomplete="false" placeholder="Option" id="question-${questionNumber}-choice-option-${optionNumber}">
            <i class="fa-solid fa-xmark delete-option" id="delete-option-${questionNumber}-${optionNumber}"></i>
        `;
        choiceBody1.appendChild(optionContainer);

        // Update the options in the select element
        updateChoiceOptions(choiceSelect, choiceBody1);

        // Add event listener to update select options when input value changes
        optionContainer.querySelector('input').addEventListener('input', function () {
            updateChoiceOptions(choiceSelect, choiceBody1);
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

        

document.addEventListener('DOMContentLoaded', () => {
    getQuizName();
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
});
