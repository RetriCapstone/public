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
                <p class="quiz-text-guide" ><i class="fa-solid fa-circle-exclamation"></i>  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                    <p class="quiz-text-guide" ><i class="fa-solid fa-circle-exclamation"></i>  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                    <p class="quiz-text-guide" ><i class="fa-solid fa-circle-exclamation"></i>  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                    <p class="quiz-text-guide" ><i class="fa-solid fa-circle-exclamation"></i>  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                    <p class="quiz-text-guide" ><i class="fa-solid fa-circle-exclamation"></i>  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                    <p class="quiz-text-guide" ><i class="fa-solid fa-circle-exclamation"></i>  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                    <p class="quiz-text-guide" ><i class="fa-solid fa-circle-exclamation"></i>  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                    <p class="quiz-text-guide" ><i class="fa-solid fa-circle-exclamation"></i>  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                    <p class="quiz-text-guide" ><i class="fa-solid fa-circle-exclamation"></i>  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                    <p class="quiz-text-guide" ><i class="fa-solid fa-circle-exclamation"></i>  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                    <p class="quiz-text-guide" ><i class="fa-solid fa-circle-exclamation"></i>  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                    <p class="quiz-text-guide" ><i class="fa-solid fa-circle-exclamation"></i>  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                    <p class="quiz-text-guide" ><i class="fa-solid fa-circle-exclamation"></i>  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                    <p class="quiz-text-guide" ><i class="fa-solid fa-circle-exclamation"></i>  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                    <p class="quiz-text-guide" ><i class="fa-solid fa-circle-exclamation"></i>  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                    <p class="quiz-text-guide" ><i class="fa-solid fa-circle-exclamation"></i>  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                    <p class="quiz-text-guide" ><i class="fa-solid fa-circle-exclamation"></i>  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                    <p class="quiz-text-guide" ><i class="fa-solid fa-circle-exclamation"></i>  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                    <p class="quiz-text-guide" ><i class="fa-solid fa-circle-exclamation"></i>  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                    <p class="quiz-text-guide" ><i class="fa-solid fa-circle-exclamation"></i>  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                    <p class="quiz-text-guide" ><i class="fa-solid fa-circle-exclamation"></i>  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                    <p class="quiz-text-guide" ><i class="fa-solid fa-circle-exclamation"></i>  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                    <p class="quiz-text-guide" ><i class="fa-solid fa-circle-exclamation"></i>  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                    <p class="quiz-text-guide" ><i class="fa-solid fa-circle-exclamation"></i>  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                    <p class="quiz-text-guide" ><i class="fa-solid fa-circle-exclamation"></i>  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                    <p class="quiz-text-guide" ><i class="fa-solid fa-circle-exclamation"></i>  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                    <p class="quiz-text-guide" ><i class="fa-solid fa-circle-exclamation"></i>  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                    <p class="quiz-text-guide" ><i class="fa-solid fa-circle-exclamation"></i>  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                    <p class="quiz-text-guide" ><i class="fa-solid fa-circle-exclamation"></i>  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
          
                </div>
                <div class="quiz-containers quiz-responses-container" >
                    <p>Responses</p>
                </div>
                <div class="quiz-containers quiz-settings-container" >
                    <p>Settings</p>
                </div>
                    
            </div>
        </div>
        <div class="quiz-tool-container">
            <div>
                <p class="quiz-text-guide" ><i class="fa-solid fa-circle-exclamation"></i>  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>          
            </div>
        </div>
    </div>
</body>
</html>

