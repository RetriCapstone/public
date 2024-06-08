<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Code Dojo</title>
    <link rel="stylesheet" href="/d/style_dashboard.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
</head>
<body>
    <script src="/d/dashboard.js" type="module"></script>
    <div class="container">
        <nav>
            <div class="logo">
                <img src="/d/images/logo-no-background.png">
            </div>
            <ul class="menu">
                <li class="active">
                    <a href="course.php">
                        <i class="fa fa-server"></i>
                        <span>
                            Course
                        </span>
                    </a>
                </li>
                <li>
                    <a href="/d/records/record.php">
                        <i class="fa fa-users"></i>
                        <span>
                            Records
                        </span>
                    </a>
                </li>
                <li>
                    <a href="/d/leaderboard/leaderboard.php">
                        <i class="fa fa-trophy"></i>
                        <span>
                            Leaderboards
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
            <div class="content_header">
                <span>Course</span> 
            </div>
            <div class="main_container">
                <div class="container1">
                    <div class="card1">
                        <span>Language 1</span>
                    </div>
                    <div class="card1">
                        <span>Language 2</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>