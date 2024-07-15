<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Coding Challenge</title>
    <link rel="stylesheet" href="/teacher/style_dashboard.css">
    <link rel="stylesheet" href="/teacher/classroom/classroom_style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A==" crossorigin="anonymous" referrerpolicy="no-referrer" />
</head>
<body>
    <script src="/teacher/dashboard.js" type="module"></script>
    <script type="module" src="script/classroom.js"></script>
    <script type="module" src="script/course.js"></script>
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
                    <a href="/teacher/classroom/classroom.php">
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
        <div class="main_body">
            <div class="main_container">
                <div class="con-1">
                    <div class="style-header">
                        <div >
                            <h3>Lecture Name: </h3>
                            <h3>Available: </h3>
                            
                        </div>
                        <div style="display: flex; gap:.4rem " >
                            <h3>Publish to classroom</h3>
                                <label class="switch">
                                <input type="checkbox" >
                                <span class="slider round"></span>
                                </label>
                        </div>
                    </div>
                    <hr class="divider-solid">
                    <div class="btn-header--style" style=" justify-content: flex-end ; " >

                        <div style=" display: flex; gap: .8rem;" >
                            <button class="style-btn-del" >
                                Delete Lecture
                            </button>
                            <button class="style-btn-add-1" >
                                Save
                            </button>
                        </div>
                    </div>
                    <div class="style-list-container" >
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>

