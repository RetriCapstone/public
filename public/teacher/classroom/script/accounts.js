import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, getDocs,where, doc, setDoc, deleteDoc, getDoc, updateDoc, query, orderBy } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

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

const accountTypeSelect = document.getElementById('acc-type');
const accountTable = document.getElementById('table-accounts');

async function fetchAccounts(accountType) {
    accountTable.querySelectorAll('tbody tr:not(:first-child)').forEach(row => row.remove());

    let collectionName;
    let role;

    if (accountType === 'faculty') {
        collectionName = "teacher";
    } else if (accountType === 'users') {
        collectionName = "users";
        role = "Students";
    }

    const accountQuery = query(collection(db, collectionName));
    const querySnapshot = await getDocs(accountQuery);
    let no = 1; 

    querySnapshot.forEach((doc) => {
        const data = doc.data();
        
        const fullname = `${data.lastname}, ${data.firstname}`;
        const roleValue = accountType === 'faculty' ? data.type : role;

        const newRow = accountTable.insertRow();
        newRow.innerHTML = `
            <td>${no++}</td>
            <td>${roleValue}</td>
            <td>${fullname}</td>
            <td>${data.email}</td>
        `;
    });
}

document.addEventListener('DOMContentLoaded', () => {
    fetchAccounts(accountTypeSelect.value);
    accountTypeSelect.addEventListener('change', () => {
        fetchAccounts(accountTypeSelect.value);
    });
});