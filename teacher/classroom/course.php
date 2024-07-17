<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Courses</title>
    <link rel="stylesheet" href="/teacher/style_dashboard.css">
    <link rel="stylesheet" href="/teacher/classroom/style/classroom_style.css">
    <link rel="stylesheet" href="/teacher/classroom/style/course.css">
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
                        <h2>Courses</h2>
                        <button id="btn-create-course" class="style-btn-create-1" ><i class="fa-solid fa-plus"></i>Create Course</button>
                        
                        <div id="modal-create-course" class="style-modal">
                            <div class="style-modal-content create-course-modal">
                                <span class="close-modal">&times;</span>
                                <h1>Create course</h1>
                                <hr class="divider-solid" > 
                                <form action="" id="create-course-form" class="form-create-course" >
                                    <div class="style-divider" >
                                    <label>&nbsp;Course name:</label>
                                        <input type="text" id="classname" class="input-style input-create-class" placeholder="Input name" required autocomplete="off" >
                                    </div>
                                    <div class="create-class-btn" >
                                        <input type="button" value="Cancel" class="style-btn-del" id="cancel-modal">
                                        <input type="submit" value="Create" class="style-btn-add-1" >
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <hr class="divider-solid">
                    <div class="course-list-container">
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>

