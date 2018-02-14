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

		// var $validUsername = validate.checkUsername($username.val());
		// var $validPassword = validate.checkPassword($password.val());
		// var $validEmail = validate.checkEmail($email.val());
		// var $validBirthday = validate.checkBirthday($birthday.val());

		// If validate with javascript is passed then validate with php through fetch api
		// if ($validUsername && $validPassword && $validEmail && $validBirthday) {

			var url = "api/form-validate/index.php";
			var dataObject = {
				"username": $username.value,
				"password": $password.value,
				"email": $email.value,
				"birthday": $birthday.value,
			}

			var userInfo = $.parseJSON(dataObject);
			console.log(userInfo);
			$.ajax({
				url: url,
				contentType: 'application/x-www-form-urlencoded',
			    type : "post",
			    data: `userInfo=${userInfo}`,
			})
			.done((response) => {
				var userInfo = $.parseJSON(response);
				console.log(userInfo);
				var allValid = true;

				// Show message error if username is not valid
				var $usernameError = $('#username-error');

				if (userInfo.username == "not_valid") {
					$usernameError.removeClass('d-none');
					allValid = false;
				} else {
					$usernameError.addClass('d-none');
				}

				// Show message error if password is not valid
				var $passwordError = $('#password-error');

				if (userInfo.password == "not_valid") {
					$passwordError.removeClass('d-none');
					allValid = false;
				} else {
					$passwordError.addClass('d-none');
				}

				// Show message error if email is not valid
				var $emailError = $('#email-error');

				if (userInfo.email == "not_valid") {
					$emailError.removeClass('d-none');
					allValid = false;
				} else {
						$emailError.addClass('d-none');
				}

				// Show message error if birthday is not valid
				var $birthdayError = $('#birthday-error');

				if (userInfo.birthday == "empty") {
					$birthdayError.removeClass('d-none');
					$birthdayError.html("Birthday is required");
					allValid = false;
				} else if (userInfo.birthday == "not_valid") {
					$birthdayError.removeClass('d-none');
					$birthdayError.html("Birthday must before current day");
					allValid = false;
				} else {
					$birthdayError.addClass('d-none');
				}

				// alert if all data is valid
				if(allValid) {
					alert("All data is valid");
				}
			});
		// }
		return false;
	});
});
