<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Coding Challenge</title>
    <link rel="stylesheet" href="/teacher/style_dashboard.css">
    <link rel="icon" href="/teacher/images/logo-icon.png" type="image/x-icon">
    <link rel="stylesheet" href="/teacher/classroom/style/classroom_style.css">
    <link rel="stylesheet" href="/teacher/classroom/module/style/coding.css">
    <link rel="stylesheet" href="/teacher/classroom/module/style/coding-editor.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
        integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />
</head>
<body>
    <script type="module" src="script/coding-editor.js" ></script>
    <script src="/teacher/dashboard.js" type="module"></script>
    <div class="container">
        <nav>
            <div class="logo">
                <img src="/teacher/images/logo-no-background.png">
            </div>
            <ul class="menu">
                <li class="active">
                    <a href="/teacher/classroom/classroom.php">
                        <i class="fa fa-chalkboard"></i>
                        <span>
                            Classroom
                        </span>
                    </a>
                </li>
                <li>
                    <a href="/teacher/classroom/help.php">
                        <i class="fa-regular fa-circle-question"></i>
                        <span>
                            Help
                        </span>
                    </a>
                </li>
                <li>
                    <a href="/teacher/classroom/settings.php">
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

            <div class="code-header-con">
                <div class="code-question-add">
                    <span>Add question</span>
                </div>
                <div class="code-header-pos-1 style-header">
                    <h3>Coding Activity</h3>
                    <button class="style-btn-add-1" id="lect-save-btn">Save</button>
                </div>

                <div class="code-header-pos-2">
                    <div id="code-question-btn" class="code-btn-nav btn-question code-active-nav">
                        <span class="btn-nav-text">Questions</span>
                    </div>
                    <div id="code-response-btn" class="code-btn-nav btn-response">
                        <span class="btn-nav-text">Responses</span>
                    </div>
                    <div id="code-settings-btn" class="code-btn-nav btn-settings">
                        <span class="btn-nav-text">Settings</span>
                    </div>
                </div>
            </div>
            <div class="code-body-con">

                <div class="code-question-con">

                    <div class="code-question-list">
                        
                        <div class="code-question" id="code-question-1" >
                            <div class="code-question-body">
                                <div class="code-body-card-1" >
                                    <div class="code-tool-con" >
                                        <div class="btn-tool" >
                                            <img src="/teacher/images/text-size-icon.png" alt="">
                                        </div>
                                        <div class="btn-tool" >
                                            <img src="/teacher/images/line-seperate.png" alt="">
                                        </div>
                                    </div>
                                    <div class="code-text-list-container" >

                                        <div class="code-desc-con question-title" >
                                            <div class="text-desc-body">
                                                <textarea class="code-text-field text-question" autocomplete="off" placeholder="Question title" id=""></textarea>
                                                <i class="fa-solid fa-xmark delete-option"  id=""></i>
                                            </div>
                                        </div>

                                        <div class="code-desc-con question-desc" >
                                            <div class="text-desc-body">
                                                <textarea class="code-text-field text-desc" autocomplete="off" placeholder="Description" id=""></textarea>
                                                <i class="fa-solid fa-xmark delete-option"  id=""></i>
                                            </div>
                                        </div>

                                        <div class="code-div-con question-desc" >
                                            <div class="text-divider" ></div>
                                        </div>

                                        <div class="code-desc-con question-desc" >
                                            <div class="text-desc-body">
                                                <textarea class="code-text-field text-desc" autocomplete="off" placeholder="Description" id=""></textarea>
                                                <i class="fa-solid fa-xmark delete-option"  id=""></i>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div class="code-body-card-2">
                                    <div class="code-editor-con">

                                        <div class="code-editor-header compiler-header" >
                                            <div style="display: flex; gap: .6rem; "  >
                                                <div class="code-compiler-btn code-active-btn" id="btn-compiler-code" >Code</div>
                                                <div class="code-input-btn " id="btn-input-code" >Input</div>
                                                <div class="code-output-btn" id="btn-output-code" >Output</div>
                                            </div>

                                            <button class="btn-code-submit" id="btn-submit" >
                                                <i class="fa-solid fa-play"></i> Run
                                            </button>
                                        </div>

                                        <div class="editor-container compiler-editor" id="code-compiler-ide" >
                                            <div class="line-numbers" id="lineNumbers"></div>
                                            <textarea id="codeEditor" class="code-editor"  spellcheck="false" placeholder="<code>" ></textarea>
                                        </div>

                                        <div class="editor-container input-editor" id="code-input-ide" style="display: none;" >
                                            <div class="line-numbers" id="lineNumbers"></div>
                                            <textarea id="codeInput" class="code-editor" spellcheck="false" placeholder="<input>" ></textarea>
                                        </div>

                                        <div class="code-output-con output-editor" id="code-output-ide"  style="display: none;" >
                                            <textarea id="codeOutput" class="code-output-editor" spellcheck="false" placeholder="<output>" ></textarea>
                                        </div>

                                    </div>
                                    <div class="code-editor-con">

                                        <div class="code-editor-header" >
                                        </div>
                                        
                                    </div>
                                </div>
                                <!-- <div class="code-body-card-3">
                                        <div class="code-editor-header" >

                                        </div>

                                        <div class="code-output-con" >

                                        </div>
                                </div> -->
                            </div>
                            <div class="code-question-bottom">
                                
                            </div>
                        </div>
                        
                        <div class="code-question" id="code-question-1" >
                            <div class="code-question-body">
                                <div class="code-body-card-1" >

                                </div>
                                <div class="code-body-card-2" >

                                </div>
                            </div>
                            <div class="code-question-bottom">
                                
                            </div>
                        </div>

                    </div>

                </div>
                <div class="code-responses-con"></div>
                <div class="code-settings-con"></div>
            </div>
        </div>
    </div>
</body>

</html>