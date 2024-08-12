<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Course Modules</title>
    <link rel="stylesheet" href="/teacher/style_dashboard.css">
    <link rel="stylesheet" href="/teacher/classroom/style/classroom_style.css">
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
        <div class="lect-body" >
            <div class="lect-header-container" >
                <div class="style-header">
                    <h3 class="lecture-name">Lect name</h3>
                    <button class="style-btn-add-1" id="lect-save-btn" >Save</button>
                </div>
                <div class="lect-navbar">
                    <div  class="lect-btn-nav lect-btn-lecture lect-active-btn-nav" >
                        <span class="btn-nav-text"> Lecture</span>
                    </div>
                    <div  class="lect-btn-nav lect-btn-settings " >
                        <span class="btn-nav-text">Settings</span>
                    </div>
                </div>

                <hr class="divider-solid" >

            </div>
            <div class="lect-body-container" >
                <div class="lecture-container">
                    <section class="lect-con-list-section style-container-1" >
                        <div class="lect-list-container" >

                            <!-- header 1 container -->
                            <!-- <div class="lect-header-style lect-header-1-con" id="lect-item" >
                                    <input class="lect-header-1-input" type="text" autocomplete="off" placeholder="Header 1" required  >
                                    <i class="fa-solid fa-xmark delete-option" id="delete-option"></i>
                            </div> -->

                            <!-- header 2 container -->
                            <!-- <div class="lect-header-style lect-header-2-con" id="lect-item" >
                                <input class="lect-header-2-input" type="text" autocomplete="off" placeholder="Header 2" required  >
                                <i class="fa-solid fa-xmark delete-option" id="delete-option"></i>
                            </div> -->

                            <!-- paragraph container -->
                            <!-- <div class="lect-paragraph-style lect-paragraph-con" id="lect-item" >
                                <textarea rows="3" required class="lect-paragraph-input auto-height-text" placeholder="type here..." id=""></textarea>
                                <i class="fa-solid fa-xmark delete-option" id="delete-option"></i>
                            </div> -->

                        </div>
                    </section>
                    <section class="lect-con-tool-section" >
                        <div class="lect-tool-container " >
                            <span >Text Fields</span>
                            <button class="lect-tool-style lect-add-header-1" id="lect-add-btn-header-1" >
                                Add Header 1
                            </button>
                            <button class="lect-tool-style lect-add-header-2" id="lect-add-btn-header-2" >
                                Add Header 2
                            </button>
                            <button class="lect-tool-style lect-add-paragraph" id="lect-add-btn-paragraph" >
                                Add Paragraph
                            </b>
                        </div>
                    </section>
                </div>
                <div class="settings-container">
                    
                </div>
            </div>
        </div>
    </div>
</body>
</html>
