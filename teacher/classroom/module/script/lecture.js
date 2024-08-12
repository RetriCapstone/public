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
const selectedLectureId = localStorage.getItem("selectedItemId");
const selectedLectureName = localStorage.getItem("selectedItemName");

let lastLectureItem = 0;


// navigation function
async function switchNavView(activeView, hideView) {
    
}


// auto height text area
async function auto_height(textarea) { 
    textarea.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight) + 'px';
    });

    // Initialize the textarea height
    textarea.style.height = 'auto';
    textarea.style.height = (textarea.scrollHeight) + 'px';
}

function addHeader1() {
    const header1Container = document.createElement('div');
    lastLectureItem += 1;
    const lectureNumber = lastLectureItem;
    header1Container.classList.add('lect-header-style','lect-header-1-con');
    header1Container.id = `lecture-item-${lectureNumber}`;

    header1Container.innerHTML = `
        <input class="lect-header-1-input" type="text" autocomplete="off" placeholder="Header 1" required id="lect-header-1-text-${lectureNumber}" >
        <i class="fa-solid fa-xmark delete-option" id="delete-item-container-${lectureNumber}"></i>
    `;
    
    document.querySelector('.lect-list-container').appendChild(header1Container);
    
    const inputs = header1Container.querySelectorAll('.lect-header-style input');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.border = '2px solid #1d4a91';
            this.parentElement.style.padding = '12px 0';
        });

        input.addEventListener('blur', function() {
            this.parentElement.style.border = 'none'; // or reset to initial border style if any
        });
    });

}

function addHeader2() {
    const header2Container = document.createElement('div');
    lastLectureItem += 1;
    const lectureNumber = lastLectureItem;
    header2Container.classList.add('lect-header-style','lect-header-2-con');
    header2Container.id = `lecture-item-${lectureNumber}`;

    header2Container.innerHTML = `
        <input class="lect-header-2-input" type="text" autocomplete="off" placeholder="Header 2" required id="lect-header-2-text-${lectureNumber}" >
        <i class="fa-solid fa-xmark delete-option" id="delete-item-container-${lectureNumber}"></i>
    `;
    
    document.querySelector('.lect-list-container').appendChild(header2Container);
    
    const inputs = header2Container.querySelectorAll('.lect-header-style input');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.border = '2px solid #1d4a91';
            this.parentElement.style.padding = '12px 0';
        });

        input.addEventListener('blur', function() {
            this.parentElement.style.border = 'none'; // or reset to initial border style if any
        });
    });
}

function addParagraph() {
    const paragraphContainer = document.createElement('div');
    lastLectureItem += 1;
    const lectureNumber = lastLectureItem;
    paragraphContainer.classList.add('lect-paragraph-style','lect-paragraph-con');
    paragraphContainer.id = `lecture-item-${lectureNumber}`;

    paragraphContainer.innerHTML = `
        <textarea rows="3" required class="lect-paragraph-input auto-height-text" placeholder="type here..." id="lect-paragraph-text-${lectureNumber}"></textarea>
        <i class="fa-solid fa-xmark delete-option" id="delete-option"></i>
    `;
    
    document.querySelector('.lect-list-container').appendChild(paragraphContainer);
    paragraphContainer.querySelectorAll('.auto-height-text').forEach(auto_height);

    const textarea = paragraphContainer.querySelectorAll('.lect-paragraph-style textarea');
    textarea.forEach(textarea => {
        textarea.addEventListener('focus', function() {
            this.parentElement.style.border = '2px solid #1d4a91';
            this.parentElement.style.padding = '12px 0';
        });

        textarea.addEventListener('blur', function() {
            this.parentElement.style.border = 'none'; // or reset to initial border style if any
        });
    });



}




document.addEventListener('DOMContentLoaded', () => {

    document.querySelector('#lect-add-btn-header-1').addEventListener('click', addHeader1);
    document.querySelector('#lect-add-btn-header-2').addEventListener('click', addHeader2);
    document.querySelector('#lect-add-btn-paragraph').addEventListener('click', addParagraph);


});
