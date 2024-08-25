<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Account</title>
    <link rel="stylesheet" href="/teacher/style_dashboard.css">
    <link rel="stylesheet" href="/teacher/account/account.css">
    <link rel="icon" href="/teacher/images/logo-icon.png" type="image/x-icon">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A==" crossorigin="anonymous" referrerpolicy="no-referrer" />
</head>
<body>
    <script src="/teacher/dashboard.js" type="module"></script>
    <script src="script/account.js" type="module" ></script>
    <div class="container">
        <nav>
            <div class="logo">
                <img src="/teacher/images/logo-no-background.png">
            </div>
            <ul class="menu">
                <li class="active">
                    <a href="account.php">
                    <i class="fa-solid fa-user"></i>
                        <span>
                            Account
                        </span>
                    </a>
                </li>
                <!-- <li>
                    <a href="/teacher/course/course.php">
                    <i class="fa-solid fa-table"></i>
                        <span>
                            Courses
                        </span>
                    </a>
                </li> -->
                <li>
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
                <div class="style-container-1">
                    <h1 class="style-title-1">Account Information</h1>
                    <div class="input-style">
                        <span>Firstname</span>
                        <input type="text" required autocomplete="off" id="teacher-firstname">
                    </div>
                    <div class="input-style">
                        <span>Lastname</span>
                        <input type="text" required autocomplete="off" id="teacher-lastname" >
                    </div>
                    <div class="input-style">
                        <span>Email</span>
                        <input type="email" id="teacher-email" autocomplete="off" required  >
                    </div>
                    <div class="style-checkbox">
                        <input class="checkbox" id="change-pass" type="checkbox" >
                        <label class="label-checkbox" for="change-pass">CHANGE  PASSWORD</label>
                    </div>
                    <form id="form-change-password" >
                        <div class="input-style">
                            <span>Old Password*</span>
                            <input type="password" id="input-old-pass"  required>
                        </div>
                        <div class="input-style">
                            <span>New Password*</span>
                            <input type="password" id="input-new-pass" required>
                        </div>
                        <div class="input-style">
                            <span>Confirm New Password*</span>
                            <input type="password" id="input-confirm-new-pass" required>
                        </div>
                    </form>
                    <div class="style-btn-container">
                        <button id="acc-btn-update" class="style-btn-blue">
                            Update
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>

