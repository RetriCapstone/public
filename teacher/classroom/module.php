<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Course Modules</title>
    <link rel="stylesheet" href="/teacher/style_dashboard.css">
    <link rel="stylesheet" href="/teacher/classroom/style/classroom_style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A==" crossorigin="anonymous" referrerpolicy="no-referrer" />
</head>
<body>
    <script src="/teacher/dashboard.js" type="module"></script>
    <script type="module" src="script/classroom.js"></script>
    <script type="module" src="script/course.js"></script>
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
                    <a href="classroom.php">
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
        <div class="style-container-1 con-2" >
            <ul class="list-tab" >
                <li class="list-view list-active"><a href="course.php">Courses</a></li>
                <li class="list-view" ><a href="student.php">Students</a></li>
            </ul>
        </div>
        <div class="main_body">
            <div class="main_container">
                <div class="con-1">
                    <div class="style-header">
                        <div >
                            <h3>Course Name:</h3>
                        </div>
                        <div style="display: flex; gap:.4rem " >
                            <h3>Publish to classroom</h3>
                                <label class="switch">
                                <input type="checkbox" >
                                <span class="slider round"></span>
                                </label>
                        </div>
                    </div>
                    <hr class="divider-solid">
                    <div class="btn-header--style">
                        <button id="btn-create-module" class="style-btn-create-1" > <i class="fa-solid fa-plus"></i>
                            Create Module
                        </button>
                        <div id="modal-create-module" class="style-modal">
                            <div class="style-modal-content">
                                <span class="close-modal">&times;</span>
                                <p>Some text in the Modal..</p>
                                <p>Some text in the Modal..</p>
                                <p>Some text in the Modal..</p>
                                <p>Some text in the Modal..</p>
                                <p>Some text in the Modal..</p>
                                <p>Some text in the Modal..</p>
                                <p>Some text in the Modal..</p>
                                <p>Some text in the Modal..</p>
                            </div>
                        </div>

                        <div style=" display: flex; gap: .8rem;" >
                            <button class="style-btn-del" >
                                Delete Course
                            </button>
                            <button class="style-btn-add-1" >
                                Save
                            </button>
                        </div>
                    </div>
                        <div class="modules-container"  >
                            <div class="style-card-2">
                                <div class="style-header">
                                    <div class="style-display">
                                        <p class="style-text" >Module 1</p>
                                        <h4 class="style-text" >Module Name</h4>
                                    </div>
                                    <div class="style-display">
                                        <i class="fa-solid fa-ellipsis-vertical"></i>
                                    </div>
                                </div>
                                <div class="module-list-content">
                                    <div class="module-item" >
                                        <a href="module/lecture.php" target="_blank"  >
                                            <p class="style-text" >Lecture :</p></a>
                                    </div>
                                    <div class="module-item" >
                                        <a href="module/quiz.php" target="_blank"  >
                                            <p class="style-text" >quiz :</p></a>
                                    </div>
                                    <div class="module-item" >
                                        <a href="module/coding.php" target="_blank" >
                                            <p class="style-text" >coding activity :</p></a>
                                    </div>
                                    <div class="module-item add-module" >
                                        <p class="style-text" >
                                            <i class="fa-solid fa-plus"></i>add
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>

