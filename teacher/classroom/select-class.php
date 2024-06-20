<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Classroom</title>
    <link rel="stylesheet" href="/teacher/style_dashboard.css">
    <link rel="stylesheet" href="classroom_style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A==" crossorigin="anonymous" referrerpolicy="no-referrer" />
</head>
<body>
    <script src="/teacher/dashboard.js" type="module"></script>
    <script type="module" src="script/classroom.js"></script>
    <script type="module" src="script/select-class.js"></script>
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
                <li>
                    <a href="/teacher/course/course.php">
                    <i class="fa-solid fa-table"></i>
                        <span>
                            Courses
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
                        <a href="classroom.php">
                            <i class="fa-solid fa-arrow-left"></i>
                            <span>Back</span>
                        </a>
                    </div>
                    <div class="style-header-1">
                        <div class="header-pos-1">
                            <h3>Class name: sample</h3>
                            <p>Code: sample</p>
                        </div>
                        <div class="header-pos-2" >
                            <button class="style-btn-del" >Delete Class</button>
                            <button class="style-btn-add-1" >Save</button>
                        </div>
                    </div>
                    <hr class="divider-solid">
                    <div class="style-container">
                        <div class="style-container-2">
                            <div class="style-nav-btn">
                                <button  id="nav-btn-student" class="btn-nav active-btn" >Students</button>
                                <button id="nav-btn-request" class="btn-nav" >Request</button>
                            </div>
                            <div class="container-students" >
                                    <h1>students</h1>
                            </div>
                            <div class="container-request" >
                                <h1>Request</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>

