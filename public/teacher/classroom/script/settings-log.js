import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, query, where, getDocs, doc, setDoc, orderBy } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

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


async function fetchLogs() {
    const loggedInUserEmail = localStorage.getItem("loggedInUserEmail");
    if (!loggedInUserEmail) return;

    try {
        const q = query(collection(db, "teacher"), where("email", "==", loggedInUserEmail));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            const teacherDoc = querySnapshot.docs[0];
            const teacherId = teacherDoc.id;

            // Query the logs collection sorted by timestamp in descending order
            const logsQuery = query(
                collection(db, 'teacher', teacherId, 'logs'),
                orderBy("timestamp", "desc") // Ensure your logs have a 'timestamp' field
            );

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
        }
    } catch (error) {
        console.error("Error fetching logs:", error);
    }
}

document.addEventListener('DOMContentLoaded', () => {

    fetchLogs();

});
