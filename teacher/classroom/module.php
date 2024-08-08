<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Course Modules</title>
    <link rel="stylesheet" href="/teacher/style_dashboard.css">
    <link rel="stylesheet" href="/teacher/classroom/style/classroom_style.css">
    <link rel="stylesheet" href="/teacher/classroom/style/module.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    
</head>
<body>
    <script src="/teacher/dashboard.js" type="module"></script>
    <script type="module" src="script/module.js"></script>
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
                    <a href="classroom.php">
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
                <li class="list-view list-active"><a href="module.php">Modules</a></li>
                <li class="list-view"><a href="student.php">People</a></li>
            </ul>
        </div>
        <div class="main_body">
            <div class="main_container">
                <div class="con-1">
                    <div class="style-header">
                            <h3 id="classroom-name" ></h3>
                        <!-- <div style="display: flex; gap: .4rem;">
                            <h3>Publish to classroom</h3>
                            <label class="switch">
                                <input type="checkbox">
                                <span class="slider round"></span>
                            </label>
                        </div> -->
                    </div>
                    <hr class="divider-solid">
                    <div class="btn-header--style">
                        <button id="btn-create-module" class="style-btn-create-1">
                            <i class="fa-solid fa-plus"></i> Create Module
                        </button>
                    </div>
                        <div id="modal-create-module" class="style-modal">
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
                        <div class="style-modal-content create-module-item-modal">
                            <span class="close-modal close-module-item">&times;</span>
                            <h2>Module item</h2>
                            <hr class="divider-solid"> 
                            <form action="" id="create-module-item-form" class="form-create-module form-create-module-item">
                                <div class="style-divider">
                                    <label class="style-label-modal">&nbsp;Item Name:</label>
                                    <input type="text" style="text-transform: uppercase;" id="module-item-name" class="input-style input-create-class" placeholder="Input Name" required autocomplete="off" >
                                </div>
                                <div class="style-divider2">
                                    <label class="style-label-modal" for="item-type">&nbsp;Select:&nbsp;</label>
                                    <select class="style-select" name="item-type" id="module-item-type">
                                        <option value="lecture">Lecture</option>
                                        <option value="quiz">Quiz</option>
                                        <option value="activity">Coding Activity</option>
                                    </select>

                                    <!-- <label class="style-label-modal" for="item-type">&nbsp;&nbsp;&nbsp;Position:&nbsp;</label>
                                    <select class="style-select" name="item-postition" id="module-item-position">
                                        <option value="item-end">End of Lectures</option>
                                        <option value="item-begin">Beginning of Lectures</option>
                                    </select> -->
                                </div>
                                <div class="create-class-btn">
                                    <input type="button" value="Cancel" class="style-btn-del" id="cancel-module-item-modal">
                                    <input type="submit" value="Create" class="style-btn-add-1">
                                </div>
                            </form>
                        </div>
                    </div>
                    <!-- Modal for Editing Module  -->
                    <div id="modal-Edit-module" class="style-modal">
                        <div class="style-modal-content create-module-item-modal">
                            <span class="close-modal close-module-item">&times;</span>
                            <h2 id="edit-module-name" >Edit Module</h2>
                            <hr class="divider-solid"> 
                            <form action="" id="create-module-item-form" class="form-create-module form-create-module-item">
                                <div class="style-divider">
                                    <label class="style-label-modal">&nbsp;Module Name:</label>
                                    <input type="text" style="text-transform: uppercase;" id="module-item-name" class="input-style input-create-class" placeholder="Input Name" required autocomplete="off" >
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
                        
                    <div class="loading-indicator">
                        <div class="spinner"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
