import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, getDocs, query, where, addDoc, getDoc, deleteDoc, updateDoc, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

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


const feedbackTypeSelect = document.getElementById('feedback-type');
const helpTable = document.getElementById('help-table');
const featureTable = document.getElementById('feature-table');

async function fecthFeedback(feedbackType) {
    helpTable.querySelectorAll('tbody tr:not(:first-child)').forEach(row => row.remove());
    featureTable.querySelectorAll('tbody tr:not(:first-child)').forEach(row => row.remove());
    if (feedbackType === 'help') {
        featureTable.style.display = 'none';
        helpTable.style.display = 'table';
        const helpQuery = query(collection(db, 'help'));
        const helpQuerySnapshot = await getDocs(helpQuery);

        helpQuerySnapshot.forEach((doc) => {
            const data = doc.data();
            const timestamp = data.timeStamp && data.timeStamp.toDate ? data.timeStamp.toDate() : null;
            const formattedTimestamp = timestamp ? timestamp.toLocaleDateString() : "N/A";
            const newRow = helpTable.insertRow();
            newRow.innerHTML = `
            <td>${formattedTimestamp}</td>
            <td>${data.platform}</td>
            <td>${data.fullname}</td>
            <td>${data.email}</td>
            <td>${data.subject}</td>
            <td><textarea>${data.description}</textarea></td>
        `;
        });

    } else if (feedbackType === 'feature') {
        helpTable.style.display = 'none';
        featureTable.style.display = 'table';
        const featQuery = query(collection(db, 'feature'));
        const featSnapshot = await getDocs(featQuery);

        featSnapshot.forEach((doc) => {
            const data = doc.data();
            const timestamp = data.timeStamp && data.timeStamp.toDate ? data.timeStamp.toDate() : null;
            const formattedTimestamp = timestamp ? timestamp.toLocaleDateString() : "N/A";
            const newRow = featureTable.insertRow();
            newRow.innerHTML = `
            <td>${formattedTimestamp}</td>
            <td>${data.platform}</td>
            <td>${data.fullname}</td>
            <td>${data.email}</td>
            <td><textarea>${data.description}</textarea></td>
        `;
        });
    } 

}


document.addEventListener('DOMContentLoaded', () => {
    fecthFeedback(feedbackTypeSelect.value);
    feedbackTypeSelect.addEventListener('change', () => {
        fecthFeedback(feedbackTypeSelect.value);
    });
});
