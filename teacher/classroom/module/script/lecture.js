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

function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

const teacherId = getQueryParam('tid');
const selectedClassroomId = getQueryParam('Cid');
const selectedModuleId = getQueryParam('Mid');
const selectedLectureId = getQueryParam('ItemId');

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
    textarea.addEventListener('focusin', function() {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight) + 'px';
    });
    // Initialize the textarea height
    textarea.style.height = 'auto';
    textarea.style.height = (textarea.scrollHeight) + 'px';
}


let isBold = false;
let isItalic = false;
let isUnderline = false;

//func: making text fields bold -----------
function boldText(textInput, btnBold) {
    if (isBold === false) {
        textInput.style.fontWeight = 'normal';
        btnBold.classList.remove('btn-active-format');
    } else {
        textInput.style.fontWeight = 'bold';
        btnBold.classList.add('btn-active-format');
    }
    isBold = !isBold;
}

//func: making text fields italic -----------
function italicText(textInput, btnItalic) {
    if (isItalic === false) {
        textInput.style.fontStyle = 'normal';
        btnItalic.classList.remove('btn-active-format');
    } else {
        textInput.style.fontStyle = 'italic';
        btnItalic.classList.add('btn-active-format');
    }
    isItalic = !isItalic;
}

//func: making text fields underlined -----------
function underlineText(textInput, btnUnderline) {
    if (isUnderline === false) {
        textInput.style.textDecoration = 'none';
        btnUnderline.classList.remove('btn-active-format');
    } else {
        textInput.style.textDecoration = 'underline';
        btnUnderline.classList.add('btn-active-format');
    }
    isUnderline = !isUnderline;
}

//func: text alignment for text fields -----------
function textAlignmentEvent(textInput) {
    return function (event) {
        const alignment = event.target.value;
        switch (alignment) {
            case 'left':
                textInput.style.textAlign = 'left';
                break;
            case 'center':
                textInput.style.textAlign = 'center';
                break;
            case 'right':
                textInput.style.textAlign = 'right';
                break;
            case 'justify':
                textInput.style.textAlign = 'justify';
                break;
        }
    };
}


//func: add header 1 with text format  ---------------------------------------------------------------------------
function addHeader1() {
    const header1Container = document.createElement('div');
    lastLectureItem += 1;
    const lectureNumber = lastLectureItem;
    header1Container.classList.add('lect-header-style','lect-header-1-con');
    header1Container.id = `lecture-item-${lectureNumber}`;

    header1Container.innerHTML = `
                                <div class="text-format-option-con">
                                    <input class="lect-header-1-input" data-content-type="header-1" type="text" autocomplete="off" placeholder="Header 1" required id="lect-header-1-text-${lectureNumber}" >
                                    <i class="fa-solid fa-xmark delete-option"  id="delete-item-container-${lectureNumber}"></i>
                                </div>
                                <div class="text-format-option-con text-format-card-container">
                                    <div class="text-format-card format-option" >
                                        <button id="header-1-bold-${lectureNumber}" class="btn-text-format btn-bold-format">
                                            <i class="fa-solid fa-bold"></i>
                                        </button>
                                        <button id="header-1-italic-${lectureNumber}" class="btn-text-format btn-italic-format">
                                            <i class="fa-solid fa-italic"></i>
                                        </button>
                                        <button id="header-1-underline-${lectureNumber}" class="btn-text-format btn-underline-format" >
                                            <i class="fa-solid fa-underline"></i>
                                        </button>
                                    </div>
                                    <div class="text-format-card alignment-option" >
                                        <input type="radio" name="alignment-options-${lectureNumber}" value="left" id="header-1-text-align-left-${lectureNumber}" checked>
                                            <label class="btn-text-format btn-text-align" for="header-1-text-align-left-${lectureNumber}" >
                                                <i class="fa-solid fa-align-left"></i>
                                            </label>

                                        <input type="radio" name="alignment-options-${lectureNumber}" value="center" id="header-1-text-align-center-${lectureNumber}" >
                                            <label class="btn-text-format btn-text-align" for="header-1-text-align-center-${lectureNumber}" >
                                            <i class="fa-solid fa-align-center"></i>
                                            </label>

                                        <input type="radio" name="alignment-options-${lectureNumber}" value="right" id="header-1-text-align-right-${lectureNumber}" >
                                            <label class="btn-text-format btn-text-align" for="header-1-text-align-right-${lectureNumber}" >
                                                <i class="fa-solid fa-align-right"></i>
                                            </label>
                                            
                                        <input type="radio" name="alignment-options-${lectureNumber}" value="justify" id="header-1-text-align-justify-${lectureNumber}" >
                                            <label class="btn-text-format btn-text-align" for="header-1-text-align-justify-${lectureNumber}" >
                                            <i class="fa-solid fa-align-justify"></i>
                                            </label>
                                    </div>
                                </div>
    `;
    
    document.querySelector('.lect-list-container').appendChild(header1Container);

    const header1input = header1Container.querySelector(`#lect-header-1-text-${lectureNumber}`);
    const textFormatContainer = header1Container.querySelector('.text-format-card-container');
    const btnBoldFormat = header1Container.querySelector(`#header-1-bold-${lectureNumber}`);
    const btnItalicFormat = header1Container.querySelector(`#header-1-italic-${lectureNumber}`);
    const btnUnderlineFormat = header1Container.querySelector(`#header-1-underline-${lectureNumber}`);

    const focusInHandler = function () {
        header1Container.style.transition = '.2s ease-in-out';
        header1Container.style.border = '2px solid #1d4a91';
        header1Container.style.margin = '6px 6px';
        textFormatContainer.style.display = 'flex';
        header1input.style.margin = '14px 8px';
        header1input.style.padding = '8px';
    };

    // Handler to hide textFormatContainer when clicking outside the header1Container
    const clickOutsideHandler = function (event) {
        if (!header1Container.contains(event.target)) {
            header1Container.style.border = 'none';
            header1Container.style.margin = '0px 6px';
            textFormatContainer.style.display = 'none';
            header1input.style.margin = '4px';
            header1input.style.padding = '4px';
            document.removeEventListener('click', clickOutsideHandler);
        }
    };
    header1Container.addEventListener('focusin', function () {
        focusInHandler();
        document.addEventListener('click', clickOutsideHandler);
    });

    // Attach event listeners to formatting buttons
    btnBoldFormat.addEventListener('click', function () {
        boldText(header1input, btnBoldFormat);
    });
    btnItalicFormat.addEventListener('click', function () {
        italicText(header1input, btnItalicFormat);
    });
    btnUnderlineFormat.addEventListener('click', function () {
        underlineText(header1input, btnUnderlineFormat);
    });

    // Attach event listener to alignment options
    header1Container.addEventListener('change', textAlignmentEvent(header1input));

    
    // Add event listener for the delete question button
    header1Container.querySelector(`#delete-item-container-${lectureNumber}`).addEventListener('click', function () {
        header1Container.remove();
    });
}


//func: add header 2 with text format -----------------------------------------------------------------------------------
function addHeader2() {
    const header2Container = document.createElement('div');
    lastLectureItem += 1;
    const lectureNumber = lastLectureItem;
    header2Container.classList.add('lect-header-style','lect-header-2-con');
    header2Container.id = `lecture-item-${lectureNumber}`;

    header2Container.innerHTML = `
                                <div class="text-format-option-con">
                                    <input class="lect-header-2-input" data-content-type="header-2" type="text" autocomplete="off" placeholder="Header 2" required id="lect-header-2-text-${lectureNumber}" >
                                    <i class="fa-solid fa-xmark delete-option" id="delete-item-container-${lectureNumber}"></i>
                                </div>
                                <div class="text-format-option-con text-format-card-container">
                                    <div class="text-format-card format-option" >
                                        <button id="header-2-bold-${lectureNumber}" class="btn-text-format btn-bold-format">
                                            <i class="fa-solid fa-bold"></i>
                                        </button>
                                        <button id="header-2-italic-${lectureNumber}" class="btn-text-format btn-italic-format">
                                            <i class="fa-solid fa-italic"></i>
                                        </button>
                                        <button id="header-2-underline-${lectureNumber}" class="btn-text-format btn-underline-format" >
                                            <i class="fa-solid fa-underline"></i>
                                        </button>
                                    </div>
                                    <div class="text-format-card alignment-option" >
                                        <input type="radio" name="alignment-options-${lectureNumber}" value="left" id="header-2-text-align-left-${lectureNumber}" checked>
                                            <label class="btn-text-format btn-text-align" for="header-2-text-align-left-${lectureNumber}" >
                                                <i class="fa-solid fa-align-left"></i>
                                            </label>

                                        <input type="radio" name="alignment-options-${lectureNumber}" value="center" id="header-2-text-align-center-${lectureNumber}" >
                                            <label class="btn-text-format btn-text-align" for="header-2-text-align-center-${lectureNumber}" >
                                            <i class="fa-solid fa-align-center"></i>
                                            </label>

                                        <input type="radio" name="alignment-options-${lectureNumber}" value="right" id="header-2-text-align-right-${lectureNumber}" >
                                            <label class="btn-text-format btn-text-align" for="header-2-text-align-right-${lectureNumber}" >
                                                <i class="fa-solid fa-align-right"></i>
                                            </label>
                                            
                                        <input type="radio" name="alignment-options-${lectureNumber}" value="justify" id="header-2-text-align-justify-${lectureNumber}" >
                                            <label class="btn-text-format btn-text-align" for="header-2-text-align-justify-${lectureNumber}" >
                                            <i class="fa-solid fa-align-justify"></i>
                                            </label>
                                    </div>
                                </div>
    `;
    document.querySelector('.lect-list-container').appendChild(header2Container);
    const header2input = header2Container.querySelector(`#lect-header-2-text-${lectureNumber}`);
    const textFormatContainer = header2Container.querySelector('.text-format-card-container');
    const btnBoldFormat = header2Container.querySelector(`#header-2-bold-${lectureNumber}`);
    const btnItalicFormat = header2Container.querySelector(`#header-2-italic-${lectureNumber}`);
    const btnUnderlineFormat = header2Container.querySelector(`#header-2-underline-${lectureNumber}`);
    const focusInHandler = function () {
        header2Container.style.transition = '.2s ease-in-out';
        header2Container.style.border = '2px solid #1d4a91';
        header2Container.style.margin = '6px 6px';
        textFormatContainer.style.display = 'flex';
        header2input.style.margin = '14px 8px';
        header2input.style.padding = '8px';
    };

    // Handler to hide textFormatContainer when clicking outside the header1Container
    const clickOutsideHandler = function (event) {
        if (!header2Container.contains(event.target)) {
            header2Container.style.border = 'none';
            header2Container.style.margin = '0px 6px';
            textFormatContainer.style.display = 'none';
            header2input.style.margin = '4px';
            header2input.style.padding = '4px';
            document.removeEventListener('click', clickOutsideHandler);
        }
    };
    header2Container.addEventListener('focusin', function () {
        focusInHandler();
        document.addEventListener('click', clickOutsideHandler);
    });

    // Attach event listeners to formatting buttons
    btnBoldFormat.addEventListener('click', function () {
        boldText(header2input, btnBoldFormat);
    });
    btnItalicFormat.addEventListener('click', function () {
        italicText(header2input, btnItalicFormat);
    });
    btnUnderlineFormat.addEventListener('click', function () {
        underlineText(header2input, btnUnderlineFormat);
    });

    // Attach event listener to alignment options
    header2Container.addEventListener('change', textAlignmentEvent(header2input));
    
    // Add event listener for the delete question button
    header2Container.querySelector(`#delete-item-container-${lectureNumber}`).addEventListener('click', function () {
        header2Container.remove();
    });
    
}


//func: add paragraph with text format -----------------------------------------------------------------------
function addParagraph() {
    const paragraphContainer = document.createElement('div');
    lastLectureItem += 1;
    const lectureNumber = lastLectureItem;
    paragraphContainer.classList.add('lect-paragraph-style','lect-paragraph-con');
    paragraphContainer.id = `lecture-item-${lectureNumber}`;
    paragraphContainer.innerHTML = `
                                <div class="text-format-option-con">
                                    <textarea rows="3" required data-content-type="paragraph" class="lect-paragraph-input auto-height-text" placeholder="type here..." id="lect-paragraph-text-${lectureNumber}"></textarea>
                                    <i class="fa-solid fa-xmark delete-option" id="delete-item-container-${lectureNumber}"></i>
                                </div>
                                <div class="text-format-option-con text-format-card-container">
                                    <div class="text-format-card format-option" >
                                        <button id="paragraph-bold-${lectureNumber}" class="btn-text-format btn-bold-format">
                                            <i class="fa-solid fa-bold"></i>
                                        </button>
                                        <button id="paragraph-italic-${lectureNumber}" class="btn-text-format btn-italic-format">
                                            <i class="fa-solid fa-italic"></i>
                                        </button>
                                        <button id="paragraph-underline-${lectureNumber}" class="btn-text-format btn-underline-format" >
                                            <i class="fa-solid fa-underline"></i>
                                        </button>
                                    </div>
                                    <div class="text-format-card alignment-option" >
                                        <input type="radio" name="alignment-options-${lectureNumber}" value="left" id="paragraph-text-align-left-${lectureNumber}" checked>
                                            <label class="btn-text-format btn-text-align" for="paragraph-text-align-left-${lectureNumber}" >
                                                <i class="fa-solid fa-align-left"></i>
                                            </label>

                                        <input type="radio" name="alignment-options-${lectureNumber}" value="center" id="paragraph-text-align-center-${lectureNumber}" >
                                            <label class="btn-text-format btn-text-align" for="paragraph-text-align-center-${lectureNumber}" >
                                            <i class="fa-solid fa-align-center"></i>
                                            </label>

                                        <input type="radio" name="alignment-options-${lectureNumber}" value="right" id="paragraph-text-align-right-${lectureNumber}" >
                                            <label class="btn-text-format btn-text-align" for="paragraph-text-align-right-${lectureNumber}" >
                                                <i class="fa-solid fa-align-right"></i>
                                            </label>
                                            
                                        <input type="radio" name="alignment-options-${lectureNumber}" value="justify" id="paragraph-text-align-justify-${lectureNumber}" >
                                            <label class="btn-text-format btn-text-align" for="paragraph-text-align-justify-${lectureNumber}" >
                                            <i class="fa-solid fa-align-justify"></i>
                                            </label>
                                    </div>
                                </div>
    `;
    
    document.querySelector('.lect-list-container').appendChild(paragraphContainer);
    paragraphContainer.querySelectorAll('.auto-height-text').forEach(auto_height);
    const paragraphTextarea = paragraphContainer.querySelector(`#lect-paragraph-text-${lectureNumber}`);
    const textFormatContainer = paragraphContainer.querySelector('.text-format-card-container');
    const btnBoldFormat = paragraphContainer.querySelector(`#paragraph-bold-${lectureNumber}`);
    const btnItalicFormat = paragraphContainer.querySelector(`#paragraph-italic-${lectureNumber}`);
    const btnUnderlineFormat = paragraphContainer.querySelector(`#paragraph-underline-${lectureNumber}`);

    const focusInHandler = function () {
        paragraphContainer.style.transition = '.2s ease-in-out';
        paragraphContainer.style.border = '2px solid #1d4a91';
        paragraphContainer.style.margin = '6px 6px';
        textFormatContainer.style.display = 'flex';
        paragraphTextarea.style.margin = '14px 8px';
        paragraphTextarea.style.padding = '8px';
    };

    // Handler to hide textFormatContainer when clicking outside the header1Container
    const clickOutsideHandler = function (event) {
        if (!paragraphContainer.contains(event.target)) {
            paragraphContainer.style.border = 'none';
            paragraphContainer.style.margin = '0px 6px';
            textFormatContainer.style.display = 'none';
            paragraphTextarea.style.margin = '4px';
            paragraphTextarea.style.padding = '4px';
            document.removeEventListener('click', clickOutsideHandler);
        }
    };
    paragraphContainer.addEventListener('focusin', function () {
        focusInHandler();
        document.addEventListener('click', clickOutsideHandler);
    });

    // Attach event listeners to formatting buttons
    btnBoldFormat.addEventListener('click', function () {
        boldText(paragraphTextarea, btnBoldFormat);
    });
    btnItalicFormat.addEventListener('click', function () {
        italicText(paragraphTextarea, btnItalicFormat);
    });
    btnUnderlineFormat.addEventListener('click', function () {
        underlineText(paragraphTextarea, btnUnderlineFormat);
    });

    // Attach event listener to alignment options
    paragraphContainer.addEventListener('change', textAlignmentEvent(paragraphTextarea));

    // Add event listener for the delete question button
    paragraphContainer.querySelector(`#delete-item-container-${lectureNumber}`).addEventListener('click', function () {
        paragraphContainer.remove();
    });
}


const saveloadingIndicator= document.querySelector('.save-loading-indicator-bg');
// saving ------------------------------------- saving ---------------------------------------------------------------
//func: save lecture created contents (header 1, header 2, text paragraph)
async function saveLectureItems() {
    saveloadingIndicator.style.display = 'block'; // Show loading indicator
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
            const lectureNumber = i ;

            // Safely retrieve the input/textarea element
            const inputOrTextarea = item.querySelector('input, textarea');
            if (!inputOrTextarea) continue; // Skip if no input/textarea found

            const contentType = inputOrTextarea.dataset.contentType;
            const textContent = inputOrTextarea.value.trim();

            // Check for formatting buttons' active states
            const isBold = item.querySelector('.btn-bold-format').classList.contains('btn-active-format');
            const isItalic = item.querySelector('.btn-italic-format').classList.contains('btn-active-format');
            const isUnderline = item.querySelector('.btn-underline-format').classList.contains('btn-active-format');
            const alignment = item.querySelector('input[name^="alignment-options-"]:checked').value;

            if (!textContent) continue; // Skip saving if there's no content

            // Path to the item document within the lecture
            const itemDocRef = doc(itemsCollectionRef, `item-${lectureNumber}`);

            // Save the item to Firestore
            await setDoc(itemDocRef, {
                type: contentType,
                text: textContent,
                bold: isBold,
                italic: isItalic,
                underline: isUnderline,
                alignment: alignment
            });
        }

        saveloadingIndicator.style.display = 'none'; 

    } catch (error) {
        saveloadingIndicator.style.display = 'none'; // Show loading indicator
        console.error('Error saving lecture items:', error);
        alert('An error occurred while saving the lecture items. Please try again.');
    }
}

//func: save lecture details (name and status)
async function saveLectureDetails() {
    try {
        const lectureName = document.getElementById('settings-lect-name-input').value.trim().toUpperCase();
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
        fetchLectureDetails();

    } catch (error) {
        console.error('Error saving lecture details:', error);
        alert('An error occurred while saving the lecture details. Please try again.');
    }
}

// fetching  -----------------------------------  fetching --------------------------------------------------------------------
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
            const boldFormat = itemData.bold;
            const italicFormat = itemData.italic;
            const underlineFormat = itemData.underline;
            const textAlignment = itemData.alignment;

            isBold = boldFormat;
            isItalic = italicFormat;
            isUnderline = underlineFormat;

            if (contentType === 'header-1') {
                addHeader1();
                const header1Input = document.getElementById(`lect-header-1-text-${lastLectureItem}`);
                const header1BoldButton = document.getElementById(`header-1-bold-${lastLectureItem}`);
                const header1ItalicButton = document.getElementById(`header-1-italic-${lastLectureItem}`);
                const header1UnderlineButton = document.getElementById(`header-1-underline-${lastLectureItem}`);
                const header1TextAlignment = document.querySelector(`#header-1-text-align-${textAlignment}-${lastLectureItem}`);
                
                header1Input.value = textContent;
                boldText(header1Input, header1BoldButton);
                italicText(header1Input, header1ItalicButton);
                underlineText(header1Input, header1UnderlineButton);
                header1TextAlignment.checked = true;
                header1Input.style.textAlign = textAlignment;


            } else if (contentType === 'header-2') {
                addHeader2();
                const header2Input = document.getElementById(`lect-header-2-text-${lastLectureItem}`);
                const header2BoldButton = document.getElementById(`header-2-bold-${lastLectureItem}`);
                const header2ItalicButton = document.getElementById(`header-2-italic-${lastLectureItem}`);
                const header2UnderlineButton = document.getElementById(`header-2-underline-${lastLectureItem}`);
                const header2TextAlignment = document.querySelector(`#header-2-text-align-${textAlignment}-${lastLectureItem}`);
                
                header2Input.value = textContent;
                boldText(header2Input, header2BoldButton);
                italicText(header2Input, header2ItalicButton);
                underlineText(header2Input, header2UnderlineButton);
                header2TextAlignment.checked = true;
                header2Input.style.textAlign = textAlignment;

            } else if (contentType === 'paragraph') {
                addParagraph();
                document.getElementById(`lect-paragraph-text-${lastLectureItem}`).value = textContent;
                const paragraphInput = document.getElementById(`lect-paragraph-text-${lastLectureItem}`);
                const paragraphBoldButton = document.getElementById(`paragraph-bold-${lastLectureItem}`);
                const paragraphItalicButton = document.getElementById(`paragraph-italic-${lastLectureItem}`);
                const paragraphUnderlineButton = document.getElementById(`paragraph-underline-${lastLectureItem}`);
                const paragraphTextAlignment = document.querySelector(`#paragraph-text-align-${textAlignment}-${lastLectureItem}`);
                
                paragraphInput.value = textContent;
                auto_height(paragraphInput);
                boldText(paragraphInput, paragraphBoldButton);
                italicText(paragraphInput, paragraphItalicButton);
                underlineText(paragraphInput, paragraphUnderlineButton);
                paragraphTextAlignment.checked = true;
                paragraphInput.style.textAlign = textAlignment;

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

//delete lecture
async function deleteLecture() {
    const confirmed = confirm('Are you sure you want to delete this lecture? This action cannot be undone.');

    if (confirmed) {
        try {
            // Path to the selected module document
            const moduleRef = doc(db, 'teacher', teacherId, 'classroom', selectedClassroomId, 'module', selectedModuleId, 'lecture', selectedLectureId );
            
            // Delete the module document
            await deleteDoc(moduleRef);

            alert('lecture deleted successfully.');
            navigateToPage('/teacher/classroom/module.php');

        } catch (error) {
            console.error('Error deleting lecture:', error);
            alert('An error occurred while deleting the lecture. Please try again.');
        }
    }
}

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
    fetchLectureDetails();
    fetchLectureItems();

    document.querySelector('#lect-add-btn-header-1').addEventListener('click', addHeader1);
    document.querySelector('#lect-add-btn-header-2').addEventListener('click', addHeader2);
    document.querySelector('#lect-add-btn-paragraph').addEventListener('click', addParagraph);
    document.querySelector('#btn-delete-lecture').addEventListener('click', deleteLecture);

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


    document.querySelector('#student-link').addEventListener('click', () => {
        navigateToPage('/teacher/classroom/student.php');
    });
    document.querySelector('#module-link').addEventListener('click', () => {
        navigateToPage('/teacher/classroom/module.php');
    });

});
