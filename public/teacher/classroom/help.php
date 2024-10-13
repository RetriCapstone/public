<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Help</title>
    <link rel="stylesheet" href="/public/teacher/style_dashboard.css">
    <link rel="stylesheet" href="/public/teacher/classroom/style/classroom_style.css">
    <!-- <link rel="stylesheet" href="/public/teacher/classroom/style/account.css"> -->
    <link rel="stylesheet" href="/public/teacher/classroom/style/help.css">
    <link rel="icon" href="/public/teacher/images/logo-icon.png" type="image/x-icon">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
        integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />
</head>

<body>
    <script type="module" src="script/help.js"></script>
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
                        <a href="">
                            MCA Instructor Guide
                        </a>
                        <span>This is a quick guide for all MCA instructor in accessing our university's Learning
                            Management System.</span>
                    </div>

                    <div class="div-flex-column">
                        <a id="btn-report" >
                            Report a Problem
                        </a>
                        <span>If Code Dojo misbehaves, tell us about it</span>
                    </div>

                    <div class="div-flex-column">
                        <a id="btn-feature" >
                            Submit a Feature/Idea
                        </a>
                        <span>Have an idea to improve Code Dojo?</span>
                    </div>
                </div>

                <!-- report modal -->
                <div id="modal-report" class="style-modal modal-classroom">
                    <div class="save-loading-indicator-bg">
                        <div class="save-loading-indicator">
                            <div class="spinner"></div>
                            Please wait...
                        </div>
                    </div>
                    <div class="create-classroom-modal report-modal">
                        <span class="close-modal close-report">&times;</span>
                        <h1>Submit report</h1>
                        <hr class="divider-solid">
                        <form action="" id="submit-report" class="form-create-class">
                            <div class="style-divider">
                                <label>&nbsp;Subject</label>
                                <input type="text"  id="report-subject" class="textarea-style" required autocomplete="off">
                            </div>

                            <div class="style-divider">
                                <label>&nbsp;Description</label>
                                <textarea class="textarea-style" name="" id="report-desc" rows="4" required  ></textarea>
                            </div>

                            <div class="create-class-btn">
                                <input type="button" value="Cancel" class="style-btn-del" id="cancel-report">
                                <input type="submit" value="Submit" class="style-btn-add-1">
                            </div>
                        </form>
                    </div>
                </div>

                <!-- feature modal -->
                <div id="modal-feature" class="style-modal modal-classroom">
                    <div class="save-loading-indicator-bg save-loading-indicator-bg-feat">
                        <div class="save-loading-indicator">
                            <div class="spinner"></div>
                            Please wait...
                        </div>
                    </div>
                    <div class="create-classroom-modal report-modal">
                        <span class="close-modal close-feature">&times;</span>
                        <h1>Submit new idea</h1>
                        <hr class="divider-solid">
                        <form action="" id="submit-feature" class="form-create-class">
                            <div class="style-divider">
                                <label>&nbsp;Description</label>
                                <textarea class="textarea-style" name="" id="feature-desc" rows="6" required ></textarea>
                            </div>

                            <div class="create-class-btn">
                                <input type="button" value="Cancel" class="style-btn-del" id="cancel-feature">
                                <input type="submit" value="Submit" class="style-btn-add-1">
                            </div>
                        </form>
                    </div>
                </div>


            </div>
        </div>
    </div>
</body>

</html>