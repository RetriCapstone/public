
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
};
