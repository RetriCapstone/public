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
                    <h3 class="lecture-name" id="lecture-name" ></h3>
                    <button class="style-btn-add-1" id="lect-save-btn" >Save</button>
                </div>
                <div class="lect-navbar">
                    <div  class="lect-btn-nav lect-btn-lecture lect-active-btn-nav" id="lect-btn-nav-lecture" >
                        <span class="btn-nav-text"> Lecture</span>
                    </div>
                    <div  class="lect-btn-nav lect-btn-settings " id="lect-btn-nav-settings" >
                        <span class="btn-nav-text">Settings</span>
                    </div>
                </div>

                <hr class="divider-solid" >

            </div>
            <div class="lect-body-container" >
                <div class="lecture-container">
                    <section class="lect-con-list-section style-container-1" >
                        <div class="lect-list-container" >
                            
                            <div class="loading-indicator">
                                <div class="spinner"></div>
                            </div>

                            <div class="lect-header-style lect-header-1-con">
                                <div style="width: 100%; display: flex;" >
                                    <input class="lect-header-1-input" data-content-type="header-1" type="text" autocomplete="off" placeholder="Header 1" required id="lect-header-1-text-${lectureNumber}" >
                                    <i class="fa-solid fa-xmark delete-option"  id="delete-item-container-${lectureNumber}"></i>
                                </div>
                                <div style="width: 100%; display: flex;"  >
                                    <input class="lect-header-1-input" data-content-type="header-1" type="text" autocomplete="off" placeholder="Header 1" required id="lect-header-1-text-${lectureNumber}" >
                                    <i class="fa-solid fa-xmark delete-option"  id="delete-item-container-${lectureNumber}"></i>
                                </div>
                            </div>
                            
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
                    <section class="style-container-1 settings-body-con" >
                        <span class="settings-text" >Settings</span>
                        <hr class="settings-divider" >

                        <div class="settings-card-out-col">
                            <span class="settings-label-title" >Lecture name</span>
                            <input type="text" id="settings-lect-name-input" >
                        </div>

                        <div class="settings-card-out-row">
                            <span class="settings-label-title" >Lecture Publish Status</span>
                            <select class="style-select" name="" id="settings-select-status">
                                <option value="close">Closed</option>
                                <option value="open">Open</option>
                            </select>
                        </div>

                        <div class="settings-card-bottom">
                            <button class="style-btn-del" >Delete lecture</button>
                        </div>

                    </section>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
