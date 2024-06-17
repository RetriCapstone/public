
    import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
    import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-analytics.js";
    import { getDatabase, ref, query, orderByChild, onValue } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

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

    function displayBronzeRank() {
        const dbRef = ref(database, "users");
        const orderedQuery = query(dbRef, orderByChild("exp"));

        onValue(orderedQuery, (snapshot) => {
            const userList = [];
            snapshot.forEach((childSnapshot) => {
                const childData = childSnapshot.val();
                if (childData.exp >= 0 && childData.exp <= 3000) {
                    userList.push(childData);
                }
            });

            userList.sort((a, b) => b.exp - a.exp);
            const top20Users = userList.slice(0, 20);

            const tableBody = document.getElementById("bronze").getElementsByTagName("tbody")[0];
            tableBody.innerHTML = "";  // Clear existing rows

            top20Users.forEach((user, index) => {
                const newRow = `
                    <tr>
                        <td>${index + 1}</td>
                        <td>${user.username}</td>
                        <td>${user.exp}</td>
                    </tr>`;
                tableBody.innerHTML += newRow;
            });
        });
    }

    const select_class = document.getElementById('created-class');

    select_class.addEventListener('click', () => {
        window.location.href = "select-class.php";
    });