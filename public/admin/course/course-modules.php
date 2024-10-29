<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Course Modules</title>
    <link rel="stylesheet" href="/public/admin/style_dashboard.css">
    <link rel="icon" href="/public/admin/images/logo-icon.png" type="image/x-icon">
    <link rel="stylesheet" href="/public/admin/classroom/style/classroom_style.css">
    <link rel="stylesheet" href="/public/admin/classroom/style/module.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    
</head>
<body>
    <script src="/public/admin/dashboard.js" type="module"></script>
    <script type="module" src="course-management/course-modules.js"></script>
    <div class="container">
        <nav>
            <div class="logo">
                <img src="/public/admin/images/MCA Logo.png">
            </div>
            <ul class="menu">
                <li>
                    <a href="/public/admin/classroom/settings.php">
                    <i class="fa-solid fa-users"></i>
                        <span>
                            Acounts
                        </span>
                    </a>
                </li>
                <li class="">
                    <a href="/public/admin/classroom/classroom.php">
                    <i class="fa fa-chalkboard"></i>
                        <span>
                            Classroom
                        </span>
                    </a>
                </li>
                <li class="active">
                    <a href="course.php">
                    <i class="fa-solid fa-book"></i>
                        <span>
                            Courses
                        </span>
                    </a>
                </li>
                <li>
                    <a href="/public/admin/classroom/help.php">
                    <i class="fa-regular fa-circle-question"></i>
                        <span>
                            Feedback Center
                        </span>
                    </a>
                </li>
                <li>
                    <a href="/public/admin/classroom/settings.php">
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
        <div class="main_body">
            <div class="main_container">
                <div class="con-1">
                    <div class="header-pos-2" >
                        <!-- <div class="header-pos-1" >
                            <h3 id="classroom-name" ></h3>
                        </div>
                        <div class="style-display btn-edit-classroom" id="btn-edit-classroom" >
                            <i class="fa-regular fa-pen-to-square"></i>
                            <span class="edit-class-tooltip" >Edit classroom</span>
                        </div> -->
                    </div>
                    <hr class="divider-solid">
                    <div class="btn-header--style">
                        <button id="btn-create-module" class="style-btn-create-1">
                            <i class="fa-solid fa-plus"></i> Create Module
                        </button>
                    </div>
                    <!-- Modal for Creating Module -->
                        <div id="modal-create-module" class="style-modal">
                            <div class="save-loading-indicator-bg create-module-loading">
                                <div class="save-loading-indicator">
                                    <div class="spinner"></div>
                                    Please wait...
                                </div>
                            </div>
                            <div class="style-modal-content create-module-modal">
                                <span class="close-modal">&times;</span>
                                <h1>Create module</h1>
                                <hr class="divider-solid" > 
                                <form action="" id="create-module-form" class="form-create-module" >
                                    <div class="style-divider" >
                                    <label>&nbsp;Module name:</label>
                                        <input type="text" id="module-name" class="input-style input-create-class" placeholder="Module name" required autocomplete="off" style="text-transform: uppercase;" >
                                    </div>
                                    <div class="style-divider2" >
                                        <input class="module-pos-option" type="radio" id="end" value="end" name="position" checked >
                                        <label for="end"  class="radio-label" >At the End</label> 

                                        <input class="module-pos-option" type="radio" id="begin" value="begin" name="position"> 
                                        <label for="begin" class="radio-label" >At the Beginning</label>

                                        <input class="module-pos-option" type="radio" id="after" value="after" name="position"> 
                                        <label for="after"  class="radio-label" >After:</label>
                                        <select name="select-after" id="position-after" class="style-select">
                                            
                                        </select>
                                    </div>
                                    <div class="create-class-btn" >
                                        <input type="button" value="Cancel" class="style-btn-del" id="cancel-modal">
                                        <input type="submit" value="Create" class="style-btn-add-1" >
                                    </div>
                                </form>
                            </div>
                        </div>
                    <div class="modules-container">
                        <!-- Modules will be appended here -->
                    </div>

                    <!-- Modal for Creating Module Item -->
                    <div id="modal-create-module-item" class="style-modal">
                            <div class="save-loading-indicator-bg create-module-item-loading">
                                <div class="save-loading-indicator">
                                    <div class="spinner"></div>
                                    Please wait...
                                </div>
                            </div>
                        <div class="style-modal-content create-module-item-modal">
                            <span class="close-modal close-module-item">&times;</span>
                            <h2>Module item</h2>
                            <hr class="divider-solid"> 
                            <form action="" id="create-module-item-form" class="form-create-module form-create-module-item">
                                <div class="style-divider">
                                    <label class="style-label-modal">&nbsp;Item Name:</label>
                                    <input type="text" style="text-transform: uppercase;" id="module-item-name" class="input-style input-create-class" placeholder="Input Name" required autocomplete="off" >
                                </div>
                                <div class="style-divider2" style="flex-direction: column; align-items: flex-start; gap: 12px; " >
                                    <span class="style-label-modal">Select type:&nbsp;</span>
                                    <!-- <select class="style-select" name="item-type" id="module-item-type">
                                        <option value="lecture">Lecture</option>
                                        <option value="quiz">Quiz</option>
                                        <option value="activity">Coding Activity</option>
                                    </select> -->

                                        <div style="display: flex; gap: .4rem; font-size: 1.2rem; " >
                                            <input class="module-pos-option" type="radio" id="end" value="lecture" name="ftype" checked >
                                            <label for="end"  class="radio-label" >Lecture</label> 
                                        </div>
                                        <div style="display: flex; gap: .4rem; font-size: 1.2rem; " >
                                            <input class="module-pos-option" type="radio" id="begin" value="quiz" name="ftype"> 
                                            <label for="begin" class="radio-label" >Quiz</label>
                                        </div>
                                        <div style="display: flex; gap: .4rem; font-size: 1.2rem; " >
                                            <input class="module-pos-option" type="radio" id="after" value="activity" name="ftype"> 
                                            <label for="after"  class="radio-label" >Coding activity</label>
                                        </div>
                                </div>
                                
                                <div class="create-class-btn">
                                    <input type="button" value="Cancel" class="style-btn-del" id="cancel-module-item-modal">
                                    <input type="submit" value="Create" class="style-btn-add-1">
                                </div>
                            </form>
                        </div>
                    </div>

                    <!-- Modal for Editing Module  -->
                    <div id="modal-edit-module" class="style-modal">
                        <div class="style-modal-content edit-module-modal">
                            <span class="close-modal close-module">&times;</span>
                            <h2 id="edit-module-name" >Edit Module</h2>
                            <hr class="divider-solid"> 
                            <form action="" id="edit-module-form" class="form-create-module form-create-module-item">
                                <div class="style-divider">
                                    <label class="style-label-modal">&nbsp;Module Name:</label>
                                    <input type="text" style="text-transform: uppercase;" id="selected-module-name" class="input-style input-create-class" placeholder="Input Name" required autocomplete="off" >
                                    <div style="margin-top: .6rem; margin-left: .2rem; " >
                                        <input type="checkbox" id="selected-module-visible" value="visibility">
                                        <label for="selected-module-visible">&nbsp;Visibility</label>
                                    </div>
                                </div>
                                <div class="edit-module-btn">
                                    <div>
                                        <input type="button" value="Delete Module" class="style-btn-del" id="delete-module">
                                    </div>
                                    <div style="display: flex; gap: .8rem;" >
                                        <input type="button" value="Cancel" class="style-btn-del" id="cancel-edit-module-modal">
                                        <input type="submit" value="Save" class="style-btn-add-1">
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                    <!-- Modal for Editing classroom  -->
                    <div id="modal-edit-classroom" class="style-modal">
                        <div class="style-modal-content edit-classroom-modal">
                            <span class="close-modal close-edit-classroom">&times;</span>
                            <h2 >Edit Course</h2>
                            <hr class="divider-solid"> 
                            <form action="" id="edit-classroom-form" class="form-create-module ">
                                
                                    <div class="style-divider" >
                                        <label>&nbsp;Course name:</label>
                                        <input type="text" style="text-transform:uppercase" id="edit-classroom-name" class="input-style input-create-class" placeholder="Course name" required autocomplete="off" >
                                        <p class="hint-style" >&nbsp;<i class="fa-solid fa-circle-exclamation icon-style"></i> RECOMMEND: COURSE/SUBJECT NAME </p>
                                    </div>

                                <div class="edit-module-btn">
                                    <div>
                                        <input type="button" value="Delete classroom" class="style-btn-del" id="delete-classroom">
                                    </div>
                                    <div style="display: flex; gap: .8rem;" >
                                        <input type="button" value="Cancel" class="style-btn-del" id="cancel-edit-class-modal">
                                        <input type="submit" value="Save" class="style-btn-add-1">
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                        
                    <div class="loading-indicator">
                        <div class="spinner"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
