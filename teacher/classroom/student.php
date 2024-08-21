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
                <li class="list-view "><a href="module.php">Modules</a></li>
                <li class="list-view list-active" ><a href="student.php">People</a></li>
            </ul>
        </div>
        <div class="main_body">
            <div class="main_container">
                <div class="con-1">
                    <div class="header-pos-2">
                        <!-- <div class="header-pos-1" >
                            <h3 id="classroom-name" ></h3>
                        </div>
                        <div class="style-display btn-edit-classroom" id="btn-edit-classroom" >
                            <i class="fa-regular fa-pen-to-square"></i>
                            <span class="edit-class-tooltip" >Edit classroom</span>
                        </div> -->
                    </div>
                    <hr class="divider-solid">
                    <div class="style-container">
                        <div class="style-container-2">
                            <div class="style-nav-btn">
                                <button  id="nav-btn-student" class="btn-nav student-btn active-btn" >Students</button>
                                <button id="nav-btn-request" class="btn-nav req-btn" >Request</button>
                            </div>
                            <div class="container-students" >    
                                <div class="loading-indicator">
                                    <div class="spinner"></div>
                                </div>
                            </div>
                            <div class="container-request" >
                                <div class="loading-indicator">
                                    <div class="spinner"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Modal for Editing classroom  -->
                    <div id="modal-edit-classroom" class="style-modal">
                        <div class="style-modal-content edit-classroom-modal">
                            <span class="close-modal close-edit-classroom">&times;</span>
                            <h2 >Edit Classroom</h2>
                            <hr class="divider-solid"> 
                            <form action="" id="edit-classroom-form" class="form-create-module ">
                                
                                    <div class="style-divider" >
                                        <label>&nbsp;Classroom name:</label>
                                        <input type="text" style="text-transform:uppercase" id="edit-classroom-name" class="input-style input-create-class" placeholder="Class name" required autocomplete="off" >
                                        <p class="hint-style" >&nbsp;<i class="fa-solid fa-circle-exclamation icon-style"></i> RECOMMEND: SUBJECT NAME - SECTION</p>
                                    </div>

                                    <div class="style-divider" >
                                        <label>&nbsp;Classroom code:</label>
                                        <input type="text"  id="edit-classroom-code" class="input-style input-create-class" placeholder="Class code" required autocomplete="off">
                                        <p class="hint-style" >&nbsp;<i class="fa-solid fa-circle-exclamation icon-style"></i> RECOMMEND: SUBJECT - RANDOM NUMBER</p>
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
                    
                </div>
            </div>
        </div>
    </div>
</body>
</html>

