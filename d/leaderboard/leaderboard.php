<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Code Dojo</title>
    <link rel="stylesheet" href="/d/style_dashboard.css">
    <link rel="stylesheet" href="/d/leaderboard/leaderboard_style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
</head>
<body>
    <script src="/d/dashboard.js" type="module"></script>
    <script type="module" src="leaderboard.js"></script>
    <div class="container">
        <nav>
            <div class="logo">
                <img src="/d/images/logo-no-background.png">
            </div>
            <ul class="menu">
                <li>
                    <a href="/d/course/course.php">
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
                <li class="active">
                    <a href="leaderboard.php">
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
                <span>Leaderboards</span> 
            </div>
            <div class="main_container">
                <div class="container2">
                    <div class="card2">
                        <div class="league-header">
                            <img src="/d/images/rbronze.png"  alt="">
                            <span>Bronze</span>
                        </div>
                        <table class="table_leaderboard" id="bronze">
                            <tbody></tbody>
                        </table>
                    </div>
                    <!-- <div class="card2">
                        <div class="league-header">
                            <img src="/d/images/rsilver.png"  alt="">
                            <span>Silver</span>
                        </div>
                        <table class="table_leaderboard" id="silver">
                            <tbody></tbody>
                        </table>
                    </div>
                    <div class="card2">
                        <div class="league-header">
                            <img src="/d/images/rgold.png"  alt="">
                            <span>Gold</span>
                        </div>
                        <table class="table_leaderboard" id="gold">
                            <tbody></tbody>
                        </table>
                    </div>
                    <div class="card2">
                        <div class="league-header">
                            <img src="/d/images/rcrystal.png"  alt="">
                            <span>Crystal</span>
                        </div>
                        <table class="table_leaderboard" id="crystal">
                            <tbody></tbody>
                        </table>
                    </div> -->
                </div>
            </div>
        </div>
    </div>
</body>
</html>

