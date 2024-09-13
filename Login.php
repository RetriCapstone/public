<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet">
	<link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <link rel="icon" href="teacher/images/logo-icon.png" type="image/x-icon">
    <link rel="stylesheet" href="styles.css">
</head>
<body>
            <div class="save-loading-indicator-bg">
                    <div class="save-loading-indicator">
                        <div class="spinner"></div>
                        Loading
                    </div>
            </div>
    <header>
        <div class="container-navigation">
            <a class="logo-container" href="index.php" >
                <img src="/teacher/images/logo1.png" alt="landing-logo">
            </a>
        </div>
    </header>
    <div class="login-container">
        <div class="login-box">
            <h2>Login</h2>
            <form id="loginForm">
                <div class="input-box">
                    <input id="input-email" type="email"  placeholder="Email" required>
				<i class="fa-solid fa-envelope"></i>
                </div>
                
                <div class="input-box">
                    <input id="input-password" type="password" placeholder="Password" required>
                    <i id="togglePassword" class='bx bxs-show'></i>
                </div>

                <a href="#" class="forgot-password">Forgot password?</a>
                <button type="submit">Login</button>
                <p>Don't have an account? <a href="Signup.php">Signup</a></p>
            </form>
        </div>
    </div>
</body>
<script src="Login-auth.js" type="module"></script>
</html>
