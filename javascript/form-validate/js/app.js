window.onload = function() {

	// init calendar
	calendar.initListYear();
	var nowDate = new Date();
	calendar.curMonth = nowDate.getMonth() + 1;
	calendar.curYear = nowDate.getFullYear();

	calendar.initListDay(nowDate.getMonth() + 1, nowDate.getFullYear());

	// Validate data when submit form
	var formInfo = document.getElementById('form-info');
	formInfo.onsubmit = function() {

		var username = document.getElementById('username');
		var password = document.getElementById('password');
		var email = document.getElementById('email');
		var birthday = document.getElementById('birthday');

		// var validUsername = validate.checkUsername(username.value);
		// var validPassword = validate.checkPassword(password.value);
		// var validEmail = validate.checkEmail(email.value);
		// var validBirthday = validate.checkBirthday(birthday.value);

		// If validate with javascript is passed then validate with php through fetch api
		// if (validUsername && validPassword && validEmail && validBirthday) {

			var url = "api/form-validate/index.php";
			var dataObject = {
				"username": username.value,
				"password": password.value,
				"email": email.value,
				"birthday": birthday.value,
			}

			var userInfo = JSON.stringify(dataObject);
			console.log(userInfo);
			fetch(url, {
				headers: {
			      'Content-Type': 'application/x-www-form-urlencoded'
			    },
			    method : "post",
			    body: `userInfo=${userInfo}`
			})
			.then( (response) => response.text())
			.then((userInfo) => {
				console.log(userInfo);
				var allValid = true;

				// Show message error if username is not valid
				if (userInfo.username == "not_valid") {
					var usernameError = document.getElementById('username-error');
					usernameError.classList.remove('d-none');
					allValid = false;
				}

				// Show message error if password is not valid
				if (userInfo.password == "not_valid") {
					var passwordError = document.getElementById('password-error');
					passwordError.classList.remove('d-none');
					allValid = false;
				}

				// Show message error if email is not valid
				if (userInfo.email == "not_valid") {
					var emailError = document.getElementById('email-error');
					emailError.classList.remove('d-none');
					allValid = false;
				}

				// Show message error if birthday is not valid
				if (userInfo.birthday == "empty") {
					var birthdayError = document.getElementById('birthday-error');
					birthdayError.classList.remove('d-none');
					birthdayError.innerHTML = "Birthday is required";
					allValid = false;
				} else if (userInfo.birthday == "not_valid") {
					var birthdayError = document.getElementById('birthday-error');
					birthdayError.classList.remove('d-none');
					birthdayError.innerHTML = "Birthday must before current day";
					allValid = false;
				}

				// alert if all data is valid
				if(allValid) {
					alert("All data is valid");
				}
			});
		// }
		return false;
	};
};
