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

		var validUsername = validate.checkUsername(username.value);
		var validPassword = validate.checkPassword(password.value);
		var validEmail = validate.checkEmail(email.value);
		var validBirthday = validate.checkBirthday(birthday.value);

		// If validate with javascript is passed then validate with php through fetch api
		if (validUsername && validPassword && validEmail && validBirthday) {

			var url = "api/form-validate/index.php";
			var dataObject = {
				"username": username.value,
				"password": password.value,
				"email": email.value,
				"birthday": birthday.value,
			}

			var userInfo = JSON.stringify(dataObject);
			fetch(url, {
				headers: {
			      'Content-Type': 'application/x-www-form-urlencoded'
			    },
			    method : "post",
			    body: `userInfo=${userInfo}`
			})
			.then( (response) => response.json())
			.then((userInfo) => {

				var allValid = true;

				// Show message error if username is not valid
				var usernameError = document.getElementById('username-error');

				if (userInfo.username == "not_valid") {
					usernameError.classList.remove('d-none');
					allValid = false;
				} else {
					usernameError.classList.add('d-none');
				}

				// Show message error if password is not valid
				var passwordError = document.getElementById('password-error');

				if (userInfo.password == "not_valid") {
					passwordError.classList.remove('d-none');
					allValid = false;
				} else {
					passwordError.classList.add('d-none');
				}

				// Show message error if email is not valid
				var emailError = document.getElementById('email-error');

				if (userInfo.email == "not_valid") {
					emailError.classList.remove('d-none');
					allValid = false;
				} else {
					emailError.classList.add('d-none');
				}

				// Show message error if birthday is not valid
				var birthdayError = document.getElementById('birthday-error');

				if (userInfo.birthday == "empty") {
					birthdayError.classList.remove('d-none');
					birthdayError.innerHTML = "Birthday is required";
					allValid = false;
				} else if (userInfo.birthday == "not_valid") {
					birthdayError.classList.remove('d-none');
					birthdayError.innerHTML = "Birthday must before current day";
					allValid = false;
				} else {
						birthdayError.classList.add('d-none');
				}

				// alert if all data is valid
				if(allValid) {
					alert("All data is valid");
				}
			});
		}
		return false;
	};
};
