<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Feedback</title>
    <link rel="stylesheet" href="/public/admin/style_dashboard.css">
    <link rel="stylesheet" href="/public/admin/classroom/style/classroom_style.css">
    <!-- <link rel="stylesheet" href="/public/teacher/classroom/style/account.css"> -->
    <link rel="stylesheet" href="/public/admin/classroom/style/help.css">
    <link rel="icon" href="/public/admin/images/logo-icon.png" type="image/x-icon">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
        integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />
</head>

<body>
    <script type="module" src="script/help.js"></script>
    <div class="container">
        <nav>
            <div class="logo">
                <img src="/public/admin/images/MCA Logo.png">
            </div>
            <ul class="menu">
                <li>
                    <a href="accounts.php">
                        <i class="fa-solid fa-users"></i>
                        <span>
                            Acounts
                        </span>
                    </a>
                </li>
                <li>
                    <a href="classroom.php">
                        <i class="fa fa-chalkboard"></i>
                        <span>
                            Classroom
                        </span>
                    </a>
                </li>
                <li class="">
                    <a href="/public/admin/course/course.php">
                        <i class="fa-solid fa-book"></i>
                        <span>
                            Courses
                        </span>
                    </a>
                </li>
                <li class="active">
                    <a href="help.php">
                        <i class="fa-regular fa-circle-question"></i>
                        <span>
                            Feedback Center
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
                <div class="con-1">
                    <div class="style-header" style="padding: .9rem 0;">
                        <h2>Feedback</h2>
                    </div>
                    <hr class="divider-solid">
                    <select id="feedback-type" class="style-select" style="width: 10rem; border-radius: 5px; margin-top: 1rem;" >
                        <option value="help">Reports</option>
                        <option value="feature">Features</option>
                    </select>
                    <div class="table-div" >
                        <table id="help-table" >
                            <tbody>
                                <tr>
                                    <th>Date & time</th>
                                    <th>Platform</th>
                                    <th>Fullname</th>
                                    <th>Email Address</th>
                                    <th>Subject</th>
                                    <th>Description</th>
                                </tr>
                            </tbody>
                        </table>
                        <table id="feature-table" style="display: none;">
                            <tbody>
                                <tr>
                                    <th>Date & time</th>
                                    <th>Platform</th>
                                    <th>Fullname</th>
                                    <th>Email Address</th>
                                    <th>Description</th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>


            </div>
        </div>
    </div>
</body>

</html>