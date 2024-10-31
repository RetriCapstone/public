<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Coding Activity</title>
    <link rel="stylesheet" href="/public/admin/style_dashboard.css">
    <link rel="icon" href="/public/admin/images/logo-icon.png" type="image/x-icon">
    <link rel="stylesheet" href="/public/admin/classroom/style/classroom_style.css">
    <link rel="stylesheet" href="/public/admin/classroom/module/style/coding.css">
    <link rel="stylesheet" href="/public/admin/classroom/module/style/coding-editor.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
        integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />
</head>
<body>
    <script type="module" src="script/coding.js" ></script>
    <!-- <script type="module" src="script/coding-responses.sjs" ></script> -->
    <script src="/public/admin/dashboard.js" type="module"></script>
    <div class="container">
        <nav>
            <div class="logo">
                <img src="/public/admin/images/MCA Logo.png">
            </div>
            <ul class="menu">
                <li>
                    <a href="/public/admin/classroom/accounts.php">
                    <i class="fa-solid fa-users"></i>
                        <span>
                            Acounts
                        </span>
                    </a>
                </li>
                <li class="">
                    <a href="/public/admin/classroom/classroom.php">
                    <i class="fa fa-chalkboard"></i>
                        <span>
                            Classroom
                        </span>
                    </a>
                </li>
                <li class="active">
                    <a href="/public/admin/course/course.php">
                    <i class="fa-solid fa-book"></i>
                        <span>
                            Courses
                        </span>
                    </a>
                </li>
                <li>
                    <a href="/public/admin/classroom/help.php">
                    <i class="fa-regular fa-circle-question"></i>
                        <span>
                            Feedback Center
                        </span>
                    </a>
                </li>
                <li>
                    <a href="/public/admin/classroom/settings.php">
                        <i class="fa-solid fa-gear"></i>
                        <span>
                            Settings
                        </span>
                    </a>
                </li>
                <li id="btnlogout" class="logout">
                    <a >
                        <i class="fa fa-sign-out"></i>
                        <span>
                            Logout
                        </span>
                    </a>
                </li>
            </ul>
        </nav>
        <!-- <div class="style-container-1 con-2">
            <ul class="list-tab">
                <li class="list-view list-active" id="module-link">Modules</li>
                <li class="list-view" id="student-link">People</li>
            </ul>
        </div> -->
        <div class="main_body">   

            <div class="save-loading-indicator-bg">
                <div class="save-loading-indicator">
                    <div class="spinner"></div>
                    Saving
                </div>
            </div>

            <div class="code-header-con">
                <div class="code-question-add" id="code-add-question" >
                    <span>Add question</span>
                </div>

                <div class="code-header-pos-1 style-header">
                    <h3 id="act-name" ></h3>
                    <button class="style-btn-add-1" id="code-save-btn">Save</button>
                </div>

                <div class="code-header-pos-2">
                    <div id="code-question-btn" class="code-btn-nav btn-question code-active-nav">
                        <span class="btn-nav-text">Questions</span>
                    </div>
                    <!-- <div id="code-response-btn" class="code-btn-nav btn-response">
                        <span class="btn-nav-text">Responses</span>
                    </div> -->
                    <div id="code-settings-btn" class="code-btn-nav btn-settings">
                        <span class="btn-nav-text">Settings</span>
                    </div>
                </div>
            </div>
            <div class="code-body-con">

                <div class="code-question-con">
                    <div class="code-question-list">
                    </div>
                </div>

                <div class="code-responses-con">
                    
                    <!-- Modal for Editing quiz asnwer  -->
                    <div id="modal-edit-quiz" class="style-modal-quiz">
                        <div class="style-modal-content-quiz edit-module-modal">
                            <span class="close-modal close-quiz-detail-modal">&times;</span>
                            <div class="spinner loading-quiz-content"></div>

                            <div class="quiz-answer-content" >
                                <div class="quiz-answer-header" >
                                    <h3 id="quiz-student-fullname" >Student name</h3>
                                    <!-- <span id="quiz-student-total-score" >Total score: </span> -->
                                </div>

                                <div class="quiz-answer-list">

                                </div>

                                <div class="quiz-answer-footer" >
                                    <button id="btn-save-score-details" class="style-btn-add-1" >Save changes</button>
                                </div>
                            </div>


                        </div>
                    </div>

                    <!-- <div class="style-container-1 response-style-con">
                        <span class="respones-text-header" id="quiz-number-responses" >0</span>
                        <span class="respones-text-header" >responses</span>
                    </div> -->
                    <div class="style-container-1 response-style-con">
                        <div class="response-header-details" >
                            <!-- <span>Time</span> -->
                            <span>Score</span>
                        </div>

                        <div class="response-student-list" >

                        </div>
                        
                    </div>

                </div>

                <div class="code-settings-con">
                    
                    <div class="style-container-1 settings-container" >
                        <p class="settings-text" >Settings</p>
                        <hr class="divider-solid setting-divider">
                        <div class="settings-card-col" >
                            <span class="settings-label-title" >
                                Activity name
                            </span>
                            <input class="quiz-identify-answer settings-quiz-name-input" id="quiz-settings-name-input" type="text" required autocomplete="off" placeholder="activity name">
                        </div>
                        <div class="settings-card" >
                            <div class="settings-card-1" >
                                <span class="settings-label-title" >
                                    Randomize Question
                                </span>
                                <p class="settings-label-body" >
                                    Make the activity questions in random
                                </p>
                            </div>
                            <div class="settings-card-1" >
                                <label class="switch">
                                <input type="checkbox" id="quiz-random-checkbox" >
                                <span class="slider round"></span>
                                </label>
                            </div>
                        </div>
                        <div class="settings-card" style="display: none;" >
                            <div class="settings-card-1" >
                                <span class="settings-label-title" >
                                    Show Question Answer
                                </span>
                                <p class="settings-label-body" >
                                    Correct answer will be visible after taking the quiz
                                </p>
                            </div>
                            <div class="settings-card-1" >
                                <label class="switch">
                                <input type="checkbox" id="quiz-show-answer" >
                                <span class="slider round"></span>
                                </label>
                            </div>
                        </div>
                        <div class="settings-card" >
                            <div class="settings-card-1" >
                                <span class="settings-label-title" >
                                    Duration
                                </span>
                                <p class="settings-label-body" >
                                    Set the duration time for taking this quiz
                                </p>
                            </div>
                            <div class="settings-card-1 settings-time-con" >
                                <div class="settings-time-input-con" >
                                    <input id="quiz-duration-hour" type="number" max="24" min="0" value="0" >
                                    <span>hours</span>
                                </div>
                                <div class="settings-time-input-con" >
                                    <input id="quiz-duration-minute" type="number" max="59" min="0" value="0" >
                                    <span>minutes</span>
                                </div>
                                <div class="settings-time-input-con" >
                                    <input id="quiz-duration-second" type="number" max="59" min="0" value="0" >
                                    <span>seconds</span>
                                </div>
                            </div>
                        </div>
                        <div class="settings-card-col" >
                            <div class="settings-card-2" >
                                <div class="settings-card-1" >
                                    <span class="settings-label-title" >
                                        Quiz Publish Status
                                    </span>
                                </div>
                                <div class="settings-card-1" >
                                    <select class="style-select settings-select-status" >
                                        <option value="close">Closed</option>
                                        <option value="open">Open</option>
                                        <option value="set">Set Date and Time</option>
                                    </select>
                                </div>
                            </div>
                            <div class="settings-datetime-con" >
                                <div>
                                    <span >Starting date:</span>
                                    <input class="settings-datetime" type="datetime-local" name="quiz-datetime-start" id="">
                                    <p class="settings-label-body" >
                                        Set the date and time for the quiz to be open
                                    </p>
                                </div>
                                <div>
                                    <span >Due date:</span>
                                    <input class="settings-datetime" type="datetime-local" name="quiz-datetime-end" id="">
                                    <p class="settings-label-body" >
                                        Set the date and time for the quiz to be closed
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="settings-card-bottom" >
                            <button class="style-btn-del" id="btn-delete-quiz" >Delete quiz</button>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    </div>
</body>

</html>