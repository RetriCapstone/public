<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>response</title>
    <link rel="stylesheet" href="/public/admin/style_dashboard.css">
    <link rel="icon" href="/public/admin/images/logo-icon.png" type="image/x-icon">
    <link rel="stylesheet" href="/public/admin/classroom/style/classroom_style.css">
    <link rel="stylesheet" href="/public/admin/classroom/module/style/coding.css">
    <link rel="stylesheet" href="/public/admin/classroom/module/quiz/style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A==" crossorigin="anonymous" referrerpolicy="no-referrer" />
</head>

<body>
    <!-- <script src="/public/teacher/dashboard.js" type="module"></script> -->
    <!-- <script type="module" src="script/quiz.js"></script> -->
    <script type="module" src="/public/admin/classroom/module/response-management/coding-response.js"></script>
    <div class="container">
        <nav>
            <div class="logo">
                <img src="/public/admin/images/MCA Logo.png">
            </div>
            <ul class="menu">
                <li class="active">
                    <a>
                    <i class="fa-regular fa-circle-question"></i>
                        <span>
                            Question
                        </span>
                    </a>
                </li>
                <li>
                    <a id="logs-link">
                        <i class="fa-solid fa-clock-rotate-left"></i>
                        <span>
                            Logs
                        </span>
                    </a>
                </li>
            </ul>
        </nav>
        <div class="main_body">
            <div class="save-loading-indicator-bg">
                <div class="save-loading-indicator">
                    <div class="spinner"></div>
                    Saving
                </div>
            </div>

            <div class="code-header-con">
                <div class="code-header-pos-1 style-header">
                    <h3 id="quiz-name" ></h3>
                    <button class="style-btn-add-1" id="btn-save-score-details">Save changes</button>
                </div>
                <div class="code-header-pos-2"> 
                    <h3 id="quiz-student-fullname"></h3>
                    <span id="quiz-student-total-score">Total score: </span>
                </div>
            </div>

            <div class="quiz-answer-content">
                <div class="spinner loading-quiz-content"></div>
                <div class="quiz-answer-list">

                </div>

            </div>

        </div>
    </div>
</body>

</html>