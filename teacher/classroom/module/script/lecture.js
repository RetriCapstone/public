import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, getDocs, getDoc, deleteDoc, updateDoc, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

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
    activeView.style.display = 'flex';
    hideView.style.display = 'none';
}

async function switchNavViewBtn(activeBtn, hideBtn) {
    activeBtn.classList.add('lect-active-btn-nav');
    hideBtn.classList.remove('lect-active-btn-nav');
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
    <div style="width: 100%; display: flex;" >
        <input class="lect-header-1-input" data-content-type="header-1" type="text" autocomplete="off" placeholder="Header 1" required id="lect-header-1-text-${lectureNumber}" >
        <i class="fa-solid fa-xmark delete-option"  id="delete-item-container-${lectureNumber}"></i>
    </div>
    <div style="width: 100%; display: flex;"  >
        <input class="lect-header-1-input" data-content-type="header-1" type="text" autocomplete="off" placeholder="Header 1" required id="lect-header-1-text-${lectureNumber}" >
        <i class="fa-solid fa-xmark delete-option"  id="delete-item-container-${lectureNumber}"></i>
    </div>
    `;
    
    document.querySelector('.lect-list-container').appendChild(header1Container);
    
    const inputs = header1Container.querySelectorAll('.lect-header-style input');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.border = '2px solid #1d4a91';
            this.parentElement.style.margin = '6px 6px';
            // this.parentElement.style.padding = '12px 0';
        });

        input.addEventListener('blur', function() {
            this.parentElement.style.border = 'none'; // or reset to initial border style if any
            this.parentElement.style.margin = '0px 6px';
        });
    });
    
    // Add event listener for the delete question button
    header1Container.querySelector(`#delete-item-container-${lectureNumber}`).addEventListener('click', function () {
        header1Container.remove();
    });

}

function addHeader2() {
    const header2Container = document.createElement('div');
    lastLectureItem += 1;
    const lectureNumber = lastLectureItem;
    header2Container.classList.add('lect-header-style','lect-header-2-con');
    header2Container.id = `lecture-item-${lectureNumber}`;

    header2Container.innerHTML = `
        <input class="lect-header-2-input" data-content-type="header-2" type="text" autocomplete="off" placeholder="Header 2" required id="lect-header-2-text-${lectureNumber}" >
        <i class="fa-solid fa-xmark delete-option" id="delete-item-container-${lectureNumber}"></i>
    `;
    
    document.querySelector('.lect-list-container').appendChild(header2Container);
    
    const inputs = header2Container.querySelectorAll('.lect-header-style input');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.border = '2px solid #1d4a91';
            // this.parentElement.style.padding = '12px 0';
        });

        input.addEventListener('blur', function() {
            this.parentElement.style.border = 'none'; // or reset to initial border style if any
        });
    });

    
    // Add event listener for the delete question button
    header2Container.querySelector(`#delete-item-container-${lectureNumber}`).addEventListener('click', function () {
        header2Container.remove();
    });
    
}

function addParagraph() {
    const paragraphContainer = document.createElement('div');
    lastLectureItem += 1;
    const lectureNumber = lastLectureItem;
    paragraphContainer.classList.add('lect-paragraph-style','lect-paragraph-con');
    paragraphContainer.id = `lecture-item-${lectureNumber}`;

    paragraphContainer.innerHTML = `
        <textarea rows="3" required data-content-type="paragraph" class="lect-paragraph-input auto-height-text" placeholder="type here..." id="lect-paragraph-text-${lectureNumber}"></textarea>
        <i class="fa-solid fa-xmark delete-option" id="delete-item-container-${lectureNumber}"></i>
    `;
    
    document.querySelector('.lect-list-container').appendChild(paragraphContainer);
    paragraphContainer.querySelectorAll('.auto-height-text').forEach(auto_height);

    const textarea = paragraphContainer.querySelectorAll('.lect-paragraph-style textarea');
    textarea.forEach(textarea => {
        textarea.addEventListener('focus', function() {
            this.parentElement.style.border = '2px solid #1d4a91';
            // this.parentElement.style.padding = '12px 0';
        });

        textarea.addEventListener('blur', function() {
            this.parentElement.style.border = 'none'; // or reset to initial border style if any
        });
    });

    // Add event listener for the delete question button
    paragraphContainer.querySelector(`#delete-item-container-${lectureNumber}`).addEventListener('click', function () {
        paragraphContainer.remove();
    });
    
}




// saving ------------------------------------- saving ----------------------

//func: save lecture created contents (header 1, header 2, text paragraph)
async function saveLectureItems() {
    try {
        // Path to the 'item' collection within the lecture
        const itemsCollectionRef = collection(db, 'teacher', teacherId, 'classroom', selectedClassroomId, 'module', selectedModuleId, 'lecture', selectedLectureId, 'item');

        // Fetch all existing items and delete them
        const existingItemsSnapshot = await getDocs(itemsCollectionRef);
        const deletePromises = existingItemsSnapshot.docs.map(doc => deleteDoc(doc.ref));
        await Promise.all(deletePromises);

        // Now save the new items
        const items = document.querySelectorAll('.lect-list-container > div');

        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            const lectureNumber = i + 1;

            // Safely retrieve the input/textarea element
            const inputOrTextarea = item.querySelector('input, textarea');
            if (!inputOrTextarea) continue; // Skip if no input/textarea found

            const contentType = inputOrTextarea.dataset.contentType;
            const textContent = inputOrTextarea.value.trim();

            if (!textContent) continue; // Skip saving if there's no content

            // Path to the item document within the lecture
            const itemDocRef = doc(itemsCollectionRef, `item-${lectureNumber}`);

            // Save the item to Firestore
            await setDoc(itemDocRef, {
                type: contentType,
                text: textContent
            });
        }

        alert('Lecture items saved successfully.');

    } catch (error) {
        console.error('Error saving lecture items:', error);
        alert('An error occurred while saving the lecture items. Please try again.');
    }
}





//func: save lecture details (name and status)
async function saveLectureDetails() {
    try {
        const lectureName = document.getElementById('settings-lect-name-input').value.trim();
        const lectureStatus = document.getElementById('settings-select-status').value;

        if (!lectureName) {
            alert('Lecture name is required.');
            return;
        }

        // Path to the selected lecture document
        const lectureDocRef = doc(db, 'teacher', teacherId, 'classroom', selectedClassroomId, 'module', selectedModuleId, 'lecture', selectedLectureId);

        // Update the lecture document with name and status
        await updateDoc(lectureDocRef, {
            name: lectureName,
            status: lectureStatus
        });

    } catch (error) {
        console.error('Error saving lecture details:', error);
        alert('An error occurred while saving the lecture details. Please try again.');
    }
}






// fetching  -----------------------------------  fetching ----------------------------------

// fetch lecture contents
async function fetchLectureItems() {
    const loadingIndicator = document.querySelector('.loading-indicator');
    
    loadingIndicator.style.display = 'block'; // Show loading indicator
    try {
        // Path to the item collection within the lecture
        const itemsCollectionRef = collection(db, 'teacher', teacherId, 'classroom', selectedClassroomId, 'module', selectedModuleId, 'lecture', selectedLectureId, 'item');
        const itemsSnapshot = await getDocs(itemsCollectionRef);

        if (itemsSnapshot.empty) {
            loadingIndicator.style.display = 'none'; // Show loading indicator
            console.log('No lecture items found.');
            return;
        }

        itemsSnapshot.forEach(doc => {
            const itemData = doc.data();
            const contentType = itemData.type;
            const textContent = itemData.text;

            if (contentType === 'header-1') {
                addHeader1();
                document.getElementById(`lect-header-1-text-${lastLectureItem}`).value = textContent;
            } else if (contentType === 'header-2') {
                addHeader2();
                document.getElementById(`lect-header-2-text-${lastLectureItem}`).value = textContent;
            } else if (contentType === 'paragraph') {
                addParagraph();
                document.getElementById(`lect-paragraph-text-${lastLectureItem}`).value = textContent;
            }
        });
        loadingIndicator.style.display = 'none'; // Show loading indicator

    } catch (error) {
        loadingIndicator.style.display = 'none'; // Show loading indicator
        console.error('Error fetching lecture items:', error);
    }
}


//fetch lecture details
async function fetchLectureDetails() {
    try {
        // Define the path to the lecture document
        const lectureDocRef = doc(db, 'teacher', teacherId, 'classroom', selectedClassroomId, 'module', selectedModuleId, 'lecture', selectedLectureId);

        // Fetch the quiz document
        const lectureDoc = await getDoc(lectureDocRef);

        if (lectureDoc.exists()) {
            const lectureData = lectureDoc.data();

            // Populate the quiz settings
            document.getElementById('lecture-name').innerText = lectureData.name || '';
            document.getElementById('settings-lect-name-input').value = lectureData.name || '';

            const statusSelect = document.querySelector('#settings-select-status');
            statusSelect.value = lectureData.status || 'close';
            
        } else {
            console.log('No lecture details found.');
        }

    } catch (error) {
        console.error('Error fetching lecture details:', error);
    }
    
}




document.addEventListener('DOMContentLoaded', () => {

    fetchLectureDetails();
    fetchLectureItems();


    document.querySelector('#lect-add-btn-header-1').addEventListener('click', addHeader1);
    document.querySelector('#lect-add-btn-header-2').addEventListener('click', addHeader2);
    document.querySelector('#lect-add-btn-paragraph').addEventListener('click', addParagraph);


    const lectureButton = document.getElementById('lect-btn-nav-lecture');
    const lectureContainer = document.querySelector('.lecture-container');

    const settingsButton = document.getElementById('lect-btn-nav-settings');
    const settingsContainer = document.querySelector('.settings-container');

    lectureButton.addEventListener('click', () => {
        switchNavView(lectureContainer, settingsContainer);
        switchNavViewBtn(lectureButton, settingsButton);
    });
    
    settingsButton.addEventListener('click', () => {
        switchNavView(settingsContainer, lectureContainer);
        switchNavViewBtn(settingsButton, lectureButton);
    });


    // Add event listener for the save button
    document.getElementById('lect-save-btn').addEventListener('click', () => {
        saveLectureItems(); // Save questions
        saveLectureDetails(); // Save quiz details
    });



});
