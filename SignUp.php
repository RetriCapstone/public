<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Sign Up</title>
	<link rel="stylesheet" href="style_login.css">
	<link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <link rel="icon" href="teacher/images/logo-icon.png" type="image/x-icon">
</head>
<body>
	<script src="loginAunthetication.js" type="module">
	</script>
	<div class="logo-container">
		<a href="index.php">
			<span class="logo-text">Code Dojo</span>
		</a>
	</div>
	<div class="wrapper">
		<form id="loginForm">
			<!-- <h1>Code Dojo</h1> -->

			<div class="input-box">
				<input id="input-email" type="email" placeholder="Email" required>
				<i class="fa-solid fa-envelope"></i>
			</div>

			<div class="input-box">
				<input id="input-firstname" type="text" placeholder="Firstname" required>
				<i class="fa-solid fa-user"></i>
			</div>

			<div class="input-box">
				<input id="input-lastname" type="text" placeholder="Lastname" required>
				<i class="fa-solid fa-user"></i>
			</div>

			<div class="input-box">
				<input id="input-password" type="password" placeholder="Password" required>
				<i id="togglePassword" class='bx bxs-show'></i>
			</div>

			<div class="input-box">
				<input id="input-re-enter-password" type="password" placeholder="Re-enter Password" required>
				<i id="togglePassword" class='bx bxs-show'></i>
			</div>

			<button type="submit" class="login-button">Sign Up</button>
		</form>
	</div>
</body>
</html>
