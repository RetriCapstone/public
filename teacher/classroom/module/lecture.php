<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Course Modules</title>
    <link rel="stylesheet" href="/teacher/style_dashboard.css">
    <link rel="stylesheet" href="/teacher/classroom/style/classroom_style.css">
    <link rel="stylesheet" href="/teacher/classroom/style/module.css">
    <link rel="stylesheet" href="/teacher/classroom/module/style/lecture.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    
</head>
<body>
    <script src="/teacher/dashboard.js" type="module"></script>
    <script type="module" src="script/lecture.js"></script>
    <div class="container">
        <nav>
            <div class="logo">
                <img src="/teacher/images/logo-no-background.png">
            </div>
            <ul class="menu">
                <li>
                    <a href="/teacher/account/account.php">
                        <i class="fa-solid fa-user"></i>
                        <span>Account</span>
                    </a>
                </li>
                <li class="active">
                    <a href="/teacher/classroom/classroom.php">
                        <i class="fa fa-chalkboard"></i>
                        <span>Classroom</span>
                    </a>
                </li>
                <li>
                    <a href="">
                        <i class="fa-regular fa-circle-question"></i>
                        <span>Help</span>
                    </a>
                </li>
                <li id="btnlogout" class="logout">
                    <a>
                        <i class="fa fa-sign-out"></i>
                        <span>Logout</span>
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
        <div class="guide-container">
            <p class="lect-text-guide" ><i class="fa-solid fa-circle-exclamation"></i>  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
        </div>
        <div class="main_body">
            <div class="main_container">
                <div class="con-1">
                    <div class="style-header">
                        
                            <h3 id="lecture-name" ></h3>
                        <!-- <div style="display: flex; gap: .4rem;">
                            <h3>Publish to classroom</h3>
                            <label class="switch">
                                <input type="checkbox">
                                <span class="slider round"></span>
                            </label>
                        </div> -->
                    </div>
                    <hr class="divider-solid">
                    <!-- Modal for Creating Module Item -->
                    <div class="loading-indicator">
                        <div class="spinner"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="lect-tools-con">
            <p class="lect-text-guide" ><i class="fa-solid fa-circle-exclamation"></i>  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
        </div>
    </div>
</body>
</html>
