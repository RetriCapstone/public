import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, deleteDoc, getDoc, getDocs, doc, setDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

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

async function fetchQuizLogs() {
    try {
        const logsQuery = query(collection(db, 'users', selectedStudentid, 'classroom', selectedClassroomId, 'module', selectedModuleId, 'quiz', selectedQuizId, 'logs'), orderBy("timestamp", "desc"));
        const logsSnapshot = await getDocs(logsQuery);

        const logsContainer = document.querySelector('.logs-container');
        logsContainer.innerHTML = ''; // Clear existing logs

        logsSnapshot.forEach(doc => {
            const logData = doc.data();
            const logEntry = document.createElement('div');
            logEntry.classList.add('log-entry');

            // Create a timestamp and message display
            const timestamp = new Date(logData.timestamp).toLocaleString(); // Format date
            logEntry.innerHTML = `<span class="timestamp">${timestamp}</span>: <span class="log-message">${logData.action}</span>`;

            logsContainer.appendChild(logEntry);
        });

        
    } catch (error) {

    }

}



document.addEventListener('DOMContentLoaded', () => {


});
