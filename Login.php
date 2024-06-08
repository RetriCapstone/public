<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Login Form</title>
	<link rel="stylesheet" href="style_login.css">
	<link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
</head>
<body>
	<script src="loginAunthetication.js" type="module">
	</script>
	<div class="logo-container">
		<a href="index.php">
			<span class="logo-text">Code Dojo</span>
		</a>
	</div>
	<a href="d/course/course.html"></a>
	<div class="wrapper">
		<form id="loginForm">
			<h1>Welcome!</h1>
			<div class="input-box">
				<input id="username" placeholder="Username/Email" required>
				<i class='bx bxs-user'></i>
			</div>
			<div class="input-box">
				<input id="password" type="password" placeholder="Password" required>
				<i id="togglePassword" class='bx bxs-show'></i>
			</div>
			<button type="submit" class="button">Login</button>
		</form>
	</div>
</body>
</html>
