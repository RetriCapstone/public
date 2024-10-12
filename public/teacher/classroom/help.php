<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Help</title>
    <link rel="stylesheet" href="/public/teacher/style_dashboard.css">
    <link rel="stylesheet" href="/public/teacher/classroom/style/account.css">
    <link rel="stylesheet" href="/public/teacher/classroom/style/help.css">
    <link rel="icon" href="/public/teacher/images/logo-icon.png" type="image/x-icon">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
        integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />
</head>

<body>
    <div class="container">
        <nav>
            <div class="logo">
                <img src="/public/teacher/images/MCA Logo.png">
            </div>
            <ul class="menu">
                <li>
                    <a href="classroom.php">
                        <i class="fa fa-chalkboard"></i>
                        <span>
                            Classroom
                        </span>
                    </a>
                </li>
                <li class="active">
                    <a href="">
                        <i class="fa-regular fa-circle-question"></i>
                        <span>
                            Help
                        </span>
                    </a>
                </li>
                <li>
                    <a href="settings.php">
                        <i class="fa-solid fa-gear"></i>
                        <span>
                            Settings
                        </span>
                    </a>
                </li>
                <li id="btnlogout" class="logout">
                    <a>
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
                <div class=" style-container-1">
                    <div class="div-flex-column">
                        <a href="" >
                            MCA Instructor Guide
                        </a>
                        <span>This is a quick guide for all MCA instructor in accessing our university's Learning
                            Management System.</span>
                    </div>

                    <div class="div-flex-column">
                        <a>
                            Report a Problem
                        </a>
                        <span>If Code Dojo misbehaves, tell us about it</span>
                    </div>

                    <div class="div-flex-column">
                        <a>
                            Submit a Feature/idea
                        </a>
                        <span>Have an idea to improve Code Dojo?</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>

</html>