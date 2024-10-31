
const logoutButton = document.getElementById('btnlogout');
logoutButton.addEventListener('click', () => {
    localStorage.removeItem("isLoggedIn");
    window.location.href = "/index.php";
});

// Check if the user is logged in
window.onload = () => {
    if (localStorage.getItem("isLoggedIn") !== "true") {
        window.location.href = "/index.php";
    }
    
    const loggedInUserEmail = localStorage.getItem("loggedInUserEmail");
    
    const q = query(collection(db, "teacher"), where("email", "==", loggedInUserEmail));
    const querySnapshot = getDocs(q);

    const loggedInTeacherDoc = querySnapshot.docs[0];
    const accType = loggedInTeacherDoc.type;
    if(accType === 'admin'){
        window.location.href = "/index.php";
    }


};
