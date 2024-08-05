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
    activeBtn.classList.add('quiz-active-nav')
    notActiveBtn1.classList.remove('quiz-active-nav')
    notActiveBtn2.classList.remove('quiz-active-nav')
}

async function activeContainer(activeCon, notActive1, notActive2) {
    activeCon.style.display = 'block';
    notActive1.style.display = 'none';
    notActive2.style.display = 'none';
}




document.addEventListener('DOMContentLoaded', () => {
    getQuizName();


    // nav bar function
    // include the quiz tools container(add question )
    const questionBtn = document.getElementById('quiz-question-btn');
    const responseBtn = document.getElementById('quiz-response-btn');
    const settingsBtn = document.getElementById('quiz-settings-btn');


    const questionContainer = document.querySelector('.quiz-questions-container');
    const responseContainer = document.querySelector('.quiz-responses-container');
    const settingsContainer = document.querySelector('.quiz-settings-container');


    questionBtn.addEventListener('click', () => {
        activeButton(questionBtn, responseBtn, settingsBtn);
        activeContainer(questionContainer, responseContainer, settingsContainer);
    });

    responseBtn.addEventListener('click', () => {
        activeButton(responseBtn, questionBtn, settingsBtn);
        activeContainer(responseContainer, questionContainer, settingsContainer);
    });

    settingsBtn.addEventListener('click', () => {
        activeButton(settingsBtn, responseBtn, questionBtn);
        activeContainer(settingsContainer, responseContainer, questionContainer);
    });


});
