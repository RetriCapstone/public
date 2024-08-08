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

async function getQuizName() {
    if (!selectedQuizId) {
        console.error("Missing required identifiers");
        return;
    }

    try {
        document.getElementById('quiz-name').innerText = selectedQuizId;
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
    questionContainer.classList.add('style-container-1', 'quiz-question-container');

    questionContainer.innerHTML = `
        <div class="question-body-con">
            <select class="style-select question-type-select" name="question-type">
                <option value="identification">Identification</option>
                <option value="choice">Multiple choice</option>
            </select>
            
            <div class="quiz-identify-con">
                <textarea rows="2" class="quiz-question-input auto-height-text-question" placeholder="Question"></textarea>
                <div class="identify-body-1">
                    <input class="quiz-identify-answer" type="text" required autocomplete="false" placeholder="Answer">
                </div>
                <div class="identify-body-2">
                    <div class="identify-radio-con">
                        <input type="radio" id="identify-exact" name="answer-case" value="exact" checked>
                        <label for="identify-exact">Exact Case</label>
                    </div>
                    <div class="identify-radio-con">
                        <input type="radio" id="identify-all-caps" name="answer-case" value="all-caps">
                        <label for="identify-all-caps">All Caps</label>
                    </div>
                    <div class="identify-radio-con">
                        <input type="radio" id="identify-small-caps" name="answer-case" value="small-caps">
                        <label for="identify-small-caps">Small Caps</label>
                    </div>
                </div>
                <hr class="divider-solid">
            </div>

            <div class="quiz-choice-con" style="display: none;">
                <textarea rows="2" class="quiz-question-input auto-height-text-question" placeholder="Question"></textarea>
                <div class="choice-body-1">
                    <div class="choice-option-con">
                        <i class="fa-regular fa-circle"></i>
                        <input type="text" required class="quiz-option-answer" autocomplete="false" placeholder="Option">
                        <i class="fa-solid fa-xmark delete-option"></i>
                    </div>
                </div>
                <div class="choice-body-2">
                    <div class="choice-add-btn">
                        <i class="fa-regular fa-circle"></i><span>&nbsp;Add option</span>
                    </div>
                    <div class="choice-answer-select">
                        <span>Answer:</span>
                        <select class="style-select">
                            <option disabled selected>Select an answer</option>
                        </select>
                    </div>
                </div>
                <hr class="divider-solid">
            </div>

            <div class="delete-question-con" id="question-delete-button">
                <i class="fa-regular fa-trash-can"></i><span>Delete</span>
            </div>
        </div>
    `;

    document.querySelector('.quiz-questions-container').appendChild(questionContainer);
    questionContainer.querySelectorAll('.auto-height-text-question').forEach(auto_height);

    // Add event listener for the question type select
    questionContainer.querySelector('.question-type-select').addEventListener('change', function () {
        const identificationDiv = this.parentElement.querySelector('.quiz-identify-con');
        const choiceDiv = this.parentElement.querySelector('.quiz-choice-con');
        if (this.value === 'choice') {
            identificationDiv.style.display = 'none';
            choiceDiv.style.display = 'block';
        } else {
            identificationDiv.style.display = 'block';
            choiceDiv.style.display = 'none';
        }
    });

    const choiceAddBtn = questionContainer.querySelector('.choice-add-btn');
    const choiceBody1 = questionContainer.querySelector('.choice-body-1');
    const choiceSelect = questionContainer.querySelector('.choice-answer-select select');

    // Add event listener for the add option button
    choiceAddBtn.addEventListener('click', function () {
        const optionContainer = document.createElement('div');
        optionContainer.classList.add('choice-option-con');
        optionContainer.innerHTML = `
            <i class="fa-regular fa-circle"></i>
            <input type="text" required class="quiz-option-answer" autocomplete="false" placeholder="Option">
            <i class="fa-solid fa-xmark delete-option"></i>
        `;
        choiceBody1.appendChild(optionContainer);

        // Update the options in the select element
        updateChoiceOptions(choiceSelect, choiceBody1);

        // Add event listener to update select options when input value changes
        optionContainer.querySelector('input').addEventListener('input', function () {
            updateChoiceOptions(choiceSelect, choiceBody1);
        });

        // Add event listener to remove the option when delete icon is clicked
        optionContainer.querySelector('.delete-option').addEventListener('click', function () {
            optionContainer.remove();
            updateChoiceOptions(choiceSelect, choiceBody1);
        });
    });

    // Add event listener to update options when select is focused
    choiceSelect.addEventListener('focus', function () {
        updateChoiceOptions(choiceSelect, choiceBody1);
    });

    // Initialize the select options based on existing inputs
    updateChoiceOptions(choiceSelect, choiceBody1);
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

    // Add event listener for the add question button
    document.querySelector('.add-question-btn').addEventListener('click', addQuestion);
});
