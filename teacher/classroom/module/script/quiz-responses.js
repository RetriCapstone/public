import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection,deleteDoc,getDoc, getDocs, doc, setDoc,updateDoc  } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

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


// func: fetch active students
async function getActiveStudents() {
    if (!selectedClassroomId || !teacherId) {
        console.error("Missing required identifiers");
        return;
    }

    try {

        const studentCollectionRef = collection(db, 'teacher', teacherId, 'classroom', selectedClassroomId, 'student');
        const studentSnapshot = await getDocs(studentCollectionRef);

        const activeStudentsContainer = document.querySelector('.response-student-list');

        for (const studentDoc of studentSnapshot.docs) {
            const studentId = studentDoc.id;
            const userDocRef = doc(db, 'users', studentId);
            const userDoc = await getDoc(userDocRef);
            const userData = userDoc.data();

            const profileImageUrl = userData.profileImageUrl || "/teacher/images/default-user.png" ;

            const studentElement = document.createElement('div');
            studentElement.className = 'response-students';
            studentElement.innerHTML = `
                            <div class="response-student-con-1" >
                                <img class="response-student-image"  src="${profileImageUrl}" alt="">
                                <span class="respose-student-name" >${userData.lastname}, ${userData.firstname}</span>
                            </div>
                            <div class="response-student-con-1">
                                <span class="response-student-time" >0</span>
                                <span class="response-student-score" >0</span>
                            </div>
            `;

            activeStudentsContainer.appendChild(studentElement);
        }
    } catch (error) {
        console.error("Error getting active students:", error);
    }
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
    getActiveStudents();
    document.querySelector('#student-link').addEventListener('click', () => {
        navigateToPage('/teacher/classroom/student.php');
    });
    document.querySelector('#module-link').addEventListener('click', () => {
        navigateToPage('/teacher/classroom/module.php');
    });

});
