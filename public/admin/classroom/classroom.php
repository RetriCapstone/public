<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Classroom</title>
    <link rel="stylesheet" href="/public/admin/style_dashboard.css">
    <link rel="icon" href="/public/admin/images/logo-icon.png" type="image/x-icon">
    <link rel="stylesheet" href="/public/admin/classroom/style/classroom_style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A==" crossorigin="anonymous" referrerpolicy="no-referrer" />
</head>
<body>
    <script src="/public/admin/dashboard.js" type="module"></script>
    <script type="module" src="script/classroom.js"></script>
    <div class="container">
        <nav>
            <div class="logo">
                <img src="/public/admin/images/MCA Logo.png" >
            </div>
            <ul class="menu">
                <li class="active">
                    <a href="classroom.php">
                    <i class="fa fa-chalkboard"></i>
                        <span>
                            Classroom
                        </span>
                    </a>
                </li>
                <!-- <li>
                    <a href="help.php">
                    <i class="fa-regular fa-circle-question"></i>
                        <span>
                            Help
                        </span>
                    </a>
                </li> -->
                <li>
                    <a href="settings.php">
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
                    <div class="style-header">
                        <h2>Classroom</h2>
                        <button id="btn-create-classroom" class="style-btn-create-1" ><i class="fa-solid fa-plus"></i>Create Class</button>
                        
                        <div id="modal-create-classroom" class="style-modal modal-classroom">
                            <div class="save-loading-indicator-bg">
                                <div class="save-loading-indicator">
                                    <div class="spinner"></div>
                                    Please wait...
                                </div>
                            </div>
                            <div class="create-classroom-modal">
                                <span class="close-modal">&times;</span>
                                <h1>Create Classsroom</h1>
                                <hr class="divider-solid" > 
                                <form action="" id="create-class-form" class="form-create-class" >
                                    <div class="style-divider" >
                                        <label>&nbsp;Classroom name:</label>
                                        <input type="text" style="text-transform:uppercase" id="classname" class="input-style input-create-class" placeholder="Class name" required autocomplete="off" >
                                        <p class="hint-style" >&nbsp;<i class="fa-solid fa-circle-exclamation icon-style"></i> RECOMMEND: SUBJECT NAME - SECTION</p>
                                    </div>

                                    <div class="style-divider" >
                                        <label>&nbsp;Classroom code:</label>
                                        <input type="text" id="classcode" class="input-style input-create-class" placeholder="Class code" required autocomplete="off">
                                        <p class="hint-style" >&nbsp;<i class="fa-solid fa-circle-exclamation icon-style"></i> RECOMMEND: SUBJECT - RANDOM NUMBER</p>
                                    </div>
                                    
                                    <div class="create-class-btn" >
                                        <input type="button" value="Cancel" class="style-btn-del" id="cancel-modal">
                                        <input type="submit" value="Create" class="style-btn-add-1" >
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <hr class="divider-solid">
                    <div class="class-list-container">
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

