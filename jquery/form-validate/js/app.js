$(document).ready(function() {

	// init calendar
	calendar.initListYear();

	var nowDate = new Date();
	calendar.curMonth = nowDate.getMonth() + 1;
	calendar.curYear = nowDate.getFullYear();

	calendar.initListDay(nowDate.getMonth() + 1, nowDate.getFullYear());

	// Validate data when submit form
	var $formInfo = $('#form-info');
	$formInfo.on('submit', function() {
		var $username = $('#username');
		var $password = $('#password');
		var $email = $('#email');
		var $birthday = $('#birthday');

		var $validUsername = validate.checkUsername($username.val());
		var $validPassword = validate.checkPassword($password.val());
		var $validEmail = validate.checkEmail($email.val());
		var $validBirthday = validate.checkBirthday($birthday.val());

		// If validate with javascript is passed then validate with php through fetch api
		if ($validUsername && $validPassword && $validEmail && $validBirthday) {

			var url = "api/form-validate/index.php";
			var dataObject = {
				"username": $username.value,
				"password": $password.value,
				"email": $email.value,
				"birthday": $birthday.value,
			}

			var userInfo = JSON.stringify(dataObject);
			$.ajx({
				url: url,
				contentType: 'application/x-www-form-urlencoded',
			    type : "post",
			    data: `userInfo=${userInfo}`,
			})
			.done((userInfo) => {

				var allValid = true;

				// Show message error if username is not valid
				if (userInfo.username == "not_valid") {
					var $usernameError = $('#username-error');
					$usernameError.removeClass('d-none');
					allValid = false;
				}

				// Show message error if password is not valid
				if (userInfo.password == "not_valid") {
					var $passwordError = $('#password-error');
					$passwordError.removeClass('d-none');
					allValid = false;
				}

				// Show message error if email is not valid
				if (userInfo.email == "not_valid") {
					var $emailError = $('#email-error');
					$emailError.removeClass('d-none');
					allValid = false;
				}

				// Show message error if birthday is not valid
				if (userInfo.birthday == "empty") {
					var $birthdayError = $('#birthday-error');
					$birthdayError.removeClass('d-none');
					$birthdayError.html("Birthday is required");
					allValid = false;
				} else if (userInfo.birthday == "not_valid") {
					var $birthdayError = $('#birthday-error');
					$birthdayError.removeClass('d-none');
					$birthdayError.html("Birthday must before current day");
					allValid = false;
				}

				// alert if all data is valid
				if(allValid) {
					alert("All data is valid");
				}
			});
		}
		return false;
	});
});
