<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Code Dojo</title>
    <link rel="stylesheet" href="/d/style_dashboard.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A==" crossorigin="anonymous" referrerpolicy="no-referrer" />
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
                    <a href="account.php">
                    <i class="fa-solid fa-user"></i>
                        <span>
                            Account
                        </span>
                    </a>
                </li>
                <li>
                    <a href="/d/course/course.php">
                    <i class="fa-solid fa-table"></i>
                        <span>
                            Course
                        </span>
                    </a>
                </li>
                <li>
                <a href="/d/classroom/classroom.php">
                    <i class="fa fa-chalkboard"></i>
                        <span>
                            Classroom
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
            </div>
        </div>
    </div>
</body>
</html>


<script type="module">
    import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
    import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-analytics.js";
    import { getDatabase, ref, push, child, onValue } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

    const firebaseConfig = {
      apiKey: "AIzaSyDYAThg1ostKvmq6d0eFQaGaKywsjs-rEA",
      authDomain: "code-dojo-4e4e5.firebaseapp.com",
      databaseURL: "https://code-dojo-4e4e5-default-rtdb.firebaseio.com",
      projectId: "code-dojo-4e4e5",
      storageBucket: "code-dojo-4e4e5.appspot.com",
      messagingSenderId: "116382053512",
      appId: "1:116382053512:web:9df203d93ab781d9e09b3d",
      measurementId: "G-KR3DL2EF19"
    };
  
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
    const database = getDatabase(app);
    const user_id = push(child(ref(database), "users")).key;

    function readUserData() {
            const dbRef = ref(database, "users");
            const tableBody = document.getElementById("recordTable").getElementsByTagName("tbody")[0];
            onValue(dbRef, (snapshot) => {
                snapshot.forEach((childSnapshot) => {
                    const childData = childSnapshot.val();
                    const newRow = `
                        <tr>
                            <td>${childData.username}</td>
                            <td>${childData.email}</td>
                            <td>${childData.exp}</td>
                        </tr>`;
                    tableBody.innerHTML += newRow;
                });
            });
        }

        // Call readUserData() function when the DOM content is loaded
        document.addEventListener("DOMContentLoaded", function () {
            readUserData();
        });
    </script>