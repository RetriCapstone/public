<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Quiz</title>
    <link rel="stylesheet" href="/teacher/style_dashboard.css">
    <link rel="stylesheet" href="/teacher/classroom/style/classroom_style.css">
    <link rel="stylesheet" href="/teacher/classroom/module/style/quiz.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A==" crossorigin="anonymous" referrerpolicy="no-referrer" />
</head>
<body>
    <script src="/teacher/dashboard.js" type="module"></script>
    <script type="module" src="script/quiz.js"></script>
    <div class="container">
        <nav>
            <div class="logo">
                <img src="/teacher/images/logo-no-background.png">
            </div>
            <ul class="menu">
                <li >
                <a href="/teacher/account/account.php">
                    <i class="fa-solid fa-user"></i>
                        <span>
                            Account
                        </span>
                    </a>
                </li>
                <li class="active">
                    <a href="/teacher/classroom/classroom.php">
                    <i class="fa fa-chalkboard"></i>
                        <span>
                            Classroom
                        </span>
                    </a>
                </li>
                <li>
                <a href="">
                    <i class="fa-regular fa-circle-question"></i>
                        <span>
                            Help
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
        <div class="style-container-1 con-2">
            <ul class="list-tab">
                <li class="list-view list-active"><a href="/teacher/classroom/module.php">Modules</a></li>
                <li class="list-view"><a href="/teacher/classroom/student.php">People</a></li>
            </ul>
        </div>
        <div class="quiz-tool-container">
        </div>
        <div class="main_body">
            <div class="con-1">
                <div class="quiz-fixed-header">
                    <div class="style-header">
                        <h3 id="quiz-name" ></h3>
                    </div>
                    <div class="quiz-navbar" >
                        <div id="quiz-question-btn" class="quiz-btn-nav btn-question quiz-active-nav" >
                            <span class="btn-nav-text" >Questions</span>
                        </div>
                        <div id="quiz-response-btn" class="quiz-btn-nav btn-response" >
                            <span class="btn-nav-text" >Responses</span>
                        </div>
                        <div id="quiz-settings-btn" class="quiz-btn-nav btn-settings" >
                            <span class="btn-nav-text" >Settings</span>
                        </div>
                    </div>
                    <hr class="divider-solid">
                </div>
                <div class="quiz-containers quiz-questions-container" >

                    <!-- Quiz container of dirction/Description -->
                    <div class="style-container-1 quiz-direction-container" >
                        <textarea rows="2"  class="quiz-direction-input auto-height-text-dir" placeholder="Direction/Description" ></textarea> 
                    </div>

                    <!-- Quiz question w/ style -->
                    <!-- <div class="style-container-1 quiz-question-container">
                        <div class="question-body-con" >
                            <select class="style-select" name="question-type">
                                <option value="identification">Identification</option>
                                <option value="choice">Multiple choice</option>
                                <option value="check">CheckBoxes</option>
                            </select>
                            
                            <div class="quiz-identify-con">
                                <textarea rows="2"  class="quiz-question-input auto-height-text-question" placeholder="Question" ></textarea>
                                <div class="identify-body-1" >
                                    <input class="quiz-identify-answer" type="text" required autocomplete="false" placeholder="Answer">
                                    
                                </div>
                                <div class="identify-body-2" >
                                    <div class="identify-radio-con" >
                                        <input type="radio" id="indentify-exact" name="answer-case" value="exact" checked >
                                        <label for="indentify-exact">Exact Case</label>
                                    </div>
                                    <div class="identify-radio-con" >
                                        <input type="radio" id="indentify-all-caps" name="answer-case" value="all-caps" >
                                        <label for="indentify-all-caps">All Caps</label>
                                    </div>
                                    <div class="identify-radio-con" >
                                        <input type="radio" id="indentify-small-caps" name="answer-case" value="small-caps" >
                                        <label for="indentify-small-caps">Small Caps</label>
                                    </div>
                                </div>
                                <hr class="divider-solid">
                            </div>

                            <div class="quiz-choice-con">
                                <textarea rows="2" onInput="auto_height(this)" id="auto-height-text"  class="quiz-question-input" placeholder="Question" ></textarea>
                                <div class="choice-body-1" >
                                    <div class="choice-option-con" >
                                        <i class="fa-regular fa-circle"></i>
                                        <input type="text" required class="quiz-identify-answer" autocomplete="false" placeholder="Option" >
                                        <i class="fa-solid fa-xmark delete-option"></i>
                                    </div>
                                    <div class="choice-body-2">
                                        <div class="choice-add-btn" >
                                            <i class="fa-regular fa-circle"></i><span>&nbsp;Add option</span> 
                                        </div>
                                        <div class="choice-answer-select" >
                                            <span>Answer:</span>
                                            <select class="style-select" ></select>
                                        </div>
                                    </div>
                                    <hr class="divider-solid">
                                </div>
                            </div>

                            <div class="delete-question-con" id="question-delete-button">
                                <i class="fa-regular fa-trash-can"></i><span>Delete</span>
                            </div>
                        </div>
                    </div> -->
                </div>
                <div class="quiz-containers quiz-responses-container" >
                    <p>Responses</p>
                </div>
                <div class="quiz-containers quiz-settings-container" >
                    <div class="style-container-1 settings-container" >
                        <p class="settings-text" >Settings</p>
                        <hr class="divider-solid setting-divider">
                        <div class="settings-card" >
                            <input class="quiz-identify-answer quiz-name-input" type="text" required autocomplete="false" placeholder="Quiz name">
                        </div>
                        <div class="settings-card" >
                            <div class="settings-card-1" >
                                <span class="settings-label-title" >
                                    Randomize Question
                                </span>
                                <p class="settings-label-body" >
                                    Make this quiz questions in random
                                </p>
                            </div>
                            <div class="settings-card-1" >
                                <label class="switch">
                                <input type="checkbox">
                                <span class="slider round"></span>
                                </label>
                            </div>
                        </div>
                        <div class="settings-card" >
                            <div>
                                <div class="settings-card-1" >
                                    <span class="settings-label-title" >
                                        Quiz Publish Status
                                    </span>
                                </div>
                                <div class="settings-card-1" >
                                    <select class="style-select" >
                                        <option value="locked">Locked</option>
                                        <option value="open">Open</option>
                                        <option value="set">Set Date and Time</option>
                                    </select>
                                </div>
                            </div>
                            <div>

                            </div>
                        </div>
                    </div>
                </div>
                    
            </div>
        </div>
        <div class="quiz-tool-container">
            <div class="quiz-question-tool-container style-container-1" >
                <div class="quiz-question-tool-item add-question-btn" >
                    <span class="quiz-add-icon add-icon" >+</span>
                    <span>Add Question</span> 
                </div>
            </div>
        </div>
    </div>
</body>
</html>

