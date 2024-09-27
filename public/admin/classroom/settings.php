<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Settings</title>
    <link rel="stylesheet" href="/public/admin/style_dashboard.css">
    <link rel="stylesheet" href="/public/admin/classroom/style/account.css">
    <link rel="stylesheet" href="/public/admin/classroom/style/settings.css">
    <link rel="icon" href="/public/admin/images/logo-icon.png" type="image/x-icon">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A==" crossorigin="anonymous" referrerpolicy="no-referrer" />
</head>
<body>
    <script src="/public/admin/dashboard.js" type="module"></script>
    <script src="script/account.js" type="module" ></script>
    <script src="script/settings-log.js" type="module" ></script>
    <div class="container">
        <nav>
            <div class="logo">
                <img src="/public/admin/images/MCA Logo.png">
            </div>
            <ul class="menu">
                <li>
                <a href="/public/admin/classroom/classroom.php">
                    <i class="fa fa-chalkboard"></i>
                        <span>
                            Classroom
                        </span>
                    </a>
                </li>
                <li>
                    <a href="">
                        <i class="fa-solid fa-users-between-lines"></i>
                        <span>
                            Accounts
                        </span>
                    </a>
                </li>
                <li>
                <a href="help.php">
                    <i class="fa-regular fa-circle-question"></i>
                        <span>
                            Help
                        </span>
                    </a>
                </li>
                <li class="active">
                    <a href="">
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

                <div class="style-container-1">
                    <h1 class="style-title-1">Account Information</h1>
                    <div style="display: flex;flex-direction: row;gap: 1.4rem;margin: 2rem 0;" >
                        <div class="profile-card">
                            <div class="image-card" style="width: 10rem; height: 10rem; position: relative; " >
                                <div class="image-con" style="position: relative;" >
                                    <img src="https://app.codechum.com/_next/static/media/user.a53df10f.svg" alt="" style="width: 100%; height: 100%; border-radius: 100%;" >
                                </div>
                                <button class="btn-upload-image" style="bottom: 0; right: 0; transition: .3s ease; display: flex; cursor: pointer;color: #fff;background-color: #2cabe3;border-radius: 100%;border: none;outline: none;padding: 8px;align-items: center;justify-content: center;position: absolute; " ><i class="fa-solid fa-plus" style="font-size: 1.4rem;" ></i></button>
                            </div>
                        </div>
                        <div class="profile-card">
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

                <div class="style-container-1">
                    <div class="logs-container" >

                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>

