import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, deleteDoc, query, orderBy,getDoc, getDocs, doc, setDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

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

const detailloadingIndicator= document.querySelector('.loading-quiz-content');

async function fetchQuizLogs() {
    try {
        // const logsQuery = query(
        //     collection(db, 'users', selectedStudentid, 'classroom', selectedClassroomId, 'module', selectedModuleId, 'quiz', selectedQuizId, 'logs'), 
        //     orderBy("timestamp", "desc")
        // );
        const logsQuery = query(
        collection(db, 'users', selectedStudentid, 'classroom', selectedClassroomId, 'module', selectedModuleId, 'activity', selectedQuizId, 'logs'),
        orderBy("timeStamp", "desc") // Ensure your logs have a 'timestamp' field
    );
        const logsSnapshot = await getDocs(logsQuery);

        const logsContainer = document.querySelector('.logs-container');
        logsContainer.innerHTML = ''; // Clear existing logs

        console.log("Logs snapshot size:", logsSnapshot.size);
        logsSnapshot.forEach(doc => {
            const logData = doc.data();
            const logEntry = document.createElement('div');
            logEntry.classList.add('log-entry');

            const timestamp = new Date(logData.timeStamp.toDate());
            const formattedDate = timestamp.toLocaleDateString(); // This gives the date in a readable format
            const formattedTime = timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }); // This formats the time as "6:47 PM"
            
            logEntry.innerHTML = `<span class="timestamp">Date: ${formattedDate}, Time: ${formattedTime}</span>: <span class="log-message">${logData.action}</span>`;
            
            logsContainer.appendChild(logEntry);
        });

        detailloadingIndicator.style.display = 'none';
    } catch (error) {
        detailloadingIndicator.style.display = 'none';
        console.error("Error updating student quiz scores:", error);
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

document.addEventListener('DOMContentLoaded', () => {
    fetchQuizLogs();
    studentfullname();
    fetchQuizDetails();
    document.querySelector('#response-link').addEventListener('click', () => {
        navigateToPage('/public/admin/classroom/module/coding/response.php');
    });
});
