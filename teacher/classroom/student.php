<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Students</title>
    <link rel="stylesheet" href="/teacher/style_dashboard.css">
    <link rel="stylesheet" href="/teacher/classroom/style/classroom_style.css">
    <link rel="stylesheet" href="/teacher/classroom/style/student-style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A==" crossorigin="anonymous" referrerpolicy="no-referrer" />
</head>
<body>
    <script src="/teacher/dashboard.js" type="module"></script>
    <script type="module" src="script/classroom.js"></script>
    <script type="module" src="script/student.js"></script>
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
                <li class="list-view "><a href="course.php">Courses</a></li>
                <li class="list-view list-active" ><a href="student.php">Students</a></li>
            </ul>
        </div>
        <div class="main_body">
            <div class="main_container">
                <div class="con-1">
                    <div class="style-header">
                        <div>
                        <h2>Students</h2>
                            <div class="style-room-details" >
                                <p>Classroom name: &nbsp;</p><p>sample</p>
                            </div>
                            <div class="style-room-details" >
                                <p>Classroom code: &nbsp;</p><p>sample</p>
                            </div>
                            
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
                                <button  id="nav-btn-student" class="btn-nav student-btn active-btn" >Students</button>
                                <button id="nav-btn-request" class="btn-nav req-btn" >Request</button>
                            </div>
                            <div class="container-students" >
                                <div class="style-student-list" >
                                    <div style="display: flex; flex-direction: row; gap: 14px; align-items: center; " >
                                        <img src="" alt="" style="width: 45px; height: 45px ; " >
                                        <p class="style-text" >Student Name</p>
                                    </div>
                                    <i class="fa-solid fa-ellipsis-vertical"></i>
                                </div>
                                <div class="style-student-list" >
                                    <div style="display: flex; flex-direction: row; gap: 14px; align-items: center; " >
                                        <img src="" alt="" style="width: 45px; height: 45px ; " >
                                        <p class="style-text" >Student Name</p>
                                    </div>
                                    <i class="fa-solid fa-ellipsis-vertical"></i>
                                </div>
                                <div class="style-student-list" >
                                    <div style="display: flex; flex-direction: row; gap: 14px; align-items: center; " >
                                        <img src="" alt="" style="width: 45px; height: 45px ; " >
                                        <p class="style-text" >Student Name</p>
                                    </div>
                                    <i class="fa-solid fa-ellipsis-vertical"></i>
                                </div>
                                <div class="style-student-list" >
                                    <div style="display: flex; flex-direction: row; gap: 14px; align-items: center; " >
                                        <img src="" alt="" style="width: 45px; height: 45px ; " >
                                        <p class="style-text" >Student Name</p>
                                    </div>
                                    <i class="fa-solid fa-ellipsis-vertical"></i>
                                </div>
                                <div class="style-student-list" >
                                    <div style="display: flex; flex-direction: row; gap: 14px; align-items: center; " >
                                        <img src="" alt="" style="width: 45px; height: 45px ; " >
                                        <p class="style-text" >Student Name</p>
                                    </div>
                                    <i class="fa-solid fa-ellipsis-vertical"></i>
                                </div>
                                <div class="style-student-list" >
                                    <div style="display: flex; flex-direction: row; gap: 14px; align-items: center; " >
                                        <img src="" alt="" style="width: 45px; height: 45px ; " >
                                        <p class="style-text" >Student Name</p>
                                    </div>
                                    <i class="fa-solid fa-ellipsis-vertical"></i>
                                </div>
                                <div class="style-student-list" >
                                    <div style="display: flex; flex-direction: row; gap: 14px; align-items: center; " >
                                        <img src="" alt="" style="width: 45px; height: 45px ; " >
                                        <p class="style-text" >Student Name</p>
                                    </div>
                                    <i class="fa-solid fa-ellipsis-vertical"></i>
                                </div>
                                <div class="style-student-list" >
                                    <div style="display: flex; flex-direction: row; gap: 14px; align-items: center; " >
                                        <img src="" alt="" style="width: 45px; height: 45px ; " >
                                        <p class="style-text" >Student Name</p>
                                    </div>
                                    <i class="fa-solid fa-ellipsis-vertical"></i>
                                </div>
                                <div class="style-student-list" >
                                    <div style="display: flex; flex-direction: row; gap: 14px; align-items: center; " >
                                        <img src="" alt="" style="width: 45px; height: 45px ; " >
                                        <p class="style-text" >Student Name</p>
                                    </div>
                                    <i class="fa-solid fa-ellipsis-vertical"></i>
                                </div>
                                <div class="style-student-list" >
                                    <div style="display: flex; flex-direction: row; gap: 14px; align-items: center; " >
                                        <img src="" alt="" style="width: 45px; height: 45px ; " >
                                        <p class="style-text" >Student Name</p>
                                    </div>
                                    <i class="fa-solid fa-ellipsis-vertical"></i>
                                </div>
                                <div class="style-student-list" >
                                    <div style="display: flex; flex-direction: row; gap: 14px; align-items: center; " >
                                        <img src="" alt="" style="width: 45px; height: 45px ; " >
                                        <p class="style-text" >Student Name</p>
                                    </div>
                                    <i class="fa-solid fa-ellipsis-vertical"></i>
                                </div>
                                <div class="style-student-list" >
                                    <div style="display: flex; flex-direction: row; gap: 14px; align-items: center; " >
                                        <img src="" alt="" style="width: 45px; height: 45px ; " >
                                        <p class="style-text" >Student Name</p>
                                    </div>
                                    <i class="fa-solid fa-ellipsis-vertical"></i>
                                </div>
                                <div class="style-student-list" >
                                    <div style="display: flex; flex-direction: row; gap: 14px; align-items: center; " >
                                        <img src="" alt="" style="width: 45px; height: 45px ; " >
                                        <p class="style-text" >Student Name</p>
                                    </div>
                                    <i class="fa-solid fa-ellipsis-vertical"></i>
                                </div>
                                <div class="style-student-list" >
                                    <div style="display: flex; flex-direction: row; gap: 14px; align-items: center; " >
                                        <img src="" alt="" style="width: 45px; height: 45px ; " >
                                        <p class="style-text" >Student Name</p>
                                    </div>
                                    <i class="fa-solid fa-ellipsis-vertical"></i>
                                </div>
                                <div class="style-student-list" >
                                    <div style="display: flex; flex-direction: row; gap: 14px; align-items: center; " >
                                        <img src="" alt="" style="width: 45px; height: 45px ; " >
                                        <p class="style-text" >Student Name</p>
                                    </div>
                                    <i class="fa-solid fa-ellipsis-vertical"></i>
                                </div>
                            </div>
                            <div class="container-request" >
                                <div class="style-student-list" >
                                    <div style="display: flex; flex-direction: row; gap: 14px; align-items: center; " >
                                        <img src="" alt="" style="width: 45px; height: 45px ; " >
                                        <p class="style-text" >Student Name</p>
                                    </div>
                                    <div style="gap: .8rem; display:flex; flex-direction:row;">
                                        <button class="style-btn-add-1" >Accept</button>
                                        <button class="style-btn-del-1" >Reject</button>
                                    </div>
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

