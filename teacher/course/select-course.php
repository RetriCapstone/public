<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Courses</title>
    <link rel="stylesheet" href="/teacher/style_dashboard.css">
    <link rel="stylesheet" href="course_style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    
</head>
<body>
    <script src="/teacher/dashboard.js" type="module"></script>
    <script src="course.js" type="module"></script>
    <div class="container">
        <nav>
            <div class="logo">
                <img src="/teacher/images/logo-no-background.png">
            </div>
            <ul class="menu">
                <li>
                    <a href="/teacher/account/account.php">
                        <i class="fa-solid fa-user"></i>
                        <span>
                            Account
                        </span>
                    </a>
                </li>
                <li class="active">
                    <a href="course.php">
                    <i class="fa-solid fa-table"></i>
                        <span>
                            Courses
                        </span>
                    </a>
                </li>
                <li>
                    <a href="/teacher/classroom/classroom.php">
                    <i class="fa fa-chalkboard"></i>
                        <span>
                            Classroom
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
        <div class="main_body">
            <div class="main_container">
                <div class="style-container-1">
                    <div class="style-back-header">
                        <a href="course.php">
                            <i class="fa-solid fa-arrow-left"></i>
                            <span>Back</span>
                        </a>
                    </div>
                    <div class="style-header-1">
                        <div class="header-pos-1">
                            <h3>Course Name</h3>
                            <h4>Sample name</h4>
                        </div>
                        <div class="header-pos-2" >
                            <h3>Classroom Published</h3>

                            <div class="item-class-style" >
                                <p id="class1">Sample class 1</p>
                                <label class="switch">
                                <input type="checkbox" >
                                <span class="slider round"></span>
                                </label>
                            </div>

                            <div class="item-class-style" >
                                <p id="class2">Sample class 2</p>
                                <label class="switch">
                                <input type="checkbox" >
                                <span class="slider round"></span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <hr class="divider-solid">
                    <div class="btn-header--style">
                        <button class="style-btn-create-1" >
                            <i class="fa-solid fa-plus"></i>
                            Create Module
                        </button>
                        <button class="style-btn-add-1" >
                            Save
                        </button>
                    </div>
                    <div class="style-list-container" >
                        <div class="course-modules-container" style="width: 80%;" >
                            <div class="style-card-2">
                                <div class="style-display">
                                    <p>Module 1</p>
                                    <h2>Module Name</h2>
                                </div>
                            <div class="module-list-content"  >

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