
const btnLogin = document.getElementById('btn-login');
btnLogin.addEventListener('click', () => {
    if (localStorage.getItem("isLoggedIn") === "true") {
        window.location.href = "/teacher/classroom/classroom.php";
    }else{
        window.location.href = "Login.php";
    }
});
    
    window.addEventListener("scroll", function() {
        var navbar = document.getElementById("navbar");
        if (window.scrollY > 0) {
            navbar.classList.add("scroll");
        } else {
            navbar.classList.remove("scroll");
        }
    });
    