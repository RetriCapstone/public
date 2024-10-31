<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lecture</title>
    <link rel="stylesheet" href="/public/teacher/style_dashboard.css">
    <link rel="icon" href="/public/teacher/images/logo-icon.png" type="image/x-icon">
    <link rel="stylesheet" href="/public/teacher/classroom/style/classroom_style.css">
    <link rel="stylesheet" href="/public/teacher/classroom/module/style/lecture.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    
</head>
<body>
    <script src="/public/teacher/dashboard.js" type="module"></script>
    <script type="module" src="script/course-lecture.js"></script>
    <div class="container">
        <nav>
            <div class="logo">
                <img src="/public/teacher/images/MCA Logo.png">
            </div>
            <ul class="menu">
                <!-- <li>
                    <a href="/public/admin/classroom/accounts.php">
                    <i class="fa-solid fa-users"></i>
                        <span>
                            Acounts
                        </span>
                    </a>
                </li> -->
                <li class="active">
                    <a href="/public/teacher/classroom/classroom.php">
                    <i class="fa fa-chalkboard"></i>
                        <span>
                            Classroom
                        </span>
                    </a>
                </li>
                <!-- <li class="">
                    <a href="/public/admin/course/course.php">
                    <i class="fa-solid fa-book"></i>
                        <span>
                            Courses
                        </span>
                    </a>
                </li> -->
                <li>
                    <a href="/public/teacher/classroom/help.php">
                    <i class="fa-regular fa-circle-question"></i>
                        <span>
                            Help
                        </span>
                    </a>
                </li>
                <li>
                    <a href="/public/teacher/classroom/settings.php">
                        <i class="fa-solid fa-gear"></i>
                        <span>
                            Settings
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
                <li class="list-view list-active" id="module-link">Modules</li>
                <li class="list-view" id="student-link">People</li>
            </ul>
        </div>
        <div class="lect-body" >
            
            <div class="save-loading-indicator-bg">
                        <div class="save-loading-indicator">
                            <div class="spinner"></div>
                            Saving
                        </div>
                </div>
            
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
            <div style="width: 84%; max-width: 1100px; text-align: center; padding: .2rem; background: #223478;">
                <p>Only the admin can edit the content of this lecture</p>
            </div>
            <div class="lect-body-container" >
                <div class="lecture-container" style="justify-content: center;" >
                    <section class="lect-con-list-section style-container-1" style="margin: 12px; min-height: 42rem; width: 94%;" >
                        <div class="lect-list-container" >
<!-- 
                            <div class="lect-header-style lect-header-1-con">
                                <div class="text-format-option-con">
                                    <input class="lect-header-1-input" data-content-type="header-1" type="text" autocomplete="off" placeholder="Header 1" required id="lect-header-1-text-${lectureNumber}" >
                                    <i class="fa-solid fa-xmark delete-option"  id="delete-item-container-${lectureNumber}"></i>
                                </div>
                                <div class="text-format-option-con text-format-card-container">
                                    <div class="text-format-card format-option" >
                                        <button id="header-1-bold" class="btn-text-format btn-active-format">
                                            <i class="fa-solid fa-bold"></i>
                                        </button>
                                        <button id="header-1-italic" class="btn-text-format">
                                            <i class="fa-solid fa-italic"></i>
                                        </button>
                                        <button id="header-1-underline" class="btn-text-format" >
                                            <i class="fa-solid fa-underline"></i>
                                        </button>
                                    </div>
                                    <div class="text-format-card alignment-option" >
                                        <input type="radio" name="options" id="text-align-left" checked>
                                            <label class="btn-text-format" for="text-align-left" >
                                                <i class="fa-solid fa-align-left"></i>
                                            </label>

                                        <input type="radio" name="options" id="text-align-center" >
                                            <label class="btn-text-format" for="text-align-center" >
                                            <i class="fa-solid fa-align-center"></i>
                                            </label>

                                        <input type="radio" name="options" id="text-align-right" >
                                            <label class="btn-text-format" for="text-align-right" >
                                                <i class="fa-solid fa-align-right"></i>
                                            </label>
                                            
                                        <input type="radio" name="options" id="text-align-justify" >
                                            <label class="btn-text-format" for="text-align-justify" >
                                            <i class="fa-solid fa-align-justify"></i>
                                            </label>
                                    </div>
                                </div>
                            </div> -->
                            
                        </div>
                    </section>
                    <!-- <section class="lect-con-tool-section" >
                        <div class="lect-tool-container " >
                            <span >Text Fields</span>
                            <button class="lect-tool-style lect-add-header-1" id="lect-add-btn-header-1" >
                                Add Title
                            </button>
                            <button class="lect-tool-style lect-add-header-2" id="lect-add-btn-header-2" >
                                Add Subtitle
                            </button>
                            <button class="lect-tool-style lect-add-paragraph" id="lect-add-btn-paragraph" >
                                Add Paragraph
                            </b>
                        </div>
                    </section> -->
                </div>
                <div class="settings-container">
                    <section class="style-container-1 settings-body-con" style="margin: 12px;" >
                        <span class="settings-text" >Settings</span>
                        <hr class="settings-divider" >

                        <div class="settings-card-out-col">
                            <span class="settings-label-title" >Lecture name</span>
                            <p type="text" id="settings-lect-name-input" style="background-color: #173469; font-size: 1rem; padding: 8px; text-transform: uppercase;" ></p>
                        </div>

                        <div class="settings-card-out-row">
                            <span class="settings-label-title" >Lecture Publish Status</span>
                            <select class="style-select" name="" id="settings-select-status">
                                <option value="close">Closed</option>
                                <option value="open">Open</option>
                            </select>
                        </div>

                        <!-- <div class="settings-card-bottom">
                            <button class="style-btn-del" id="btn-delete-lecture" >Delete lecture</button>
                        </div> -->

                    </section>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
