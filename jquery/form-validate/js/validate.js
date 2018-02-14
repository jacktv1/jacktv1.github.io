var validate = {

	/**
	* The below function check input username, return false if length of username less than 8 charater,
	  otherwise return true
	* @param {string} username
	* @return {bool}
	*/

	checkUsername(username) {
		var $usernameError = $('#username-error');
		if (username.length < 8) {
			$usernameError.removeClass('d-none');
			return false;
		} else {
			$usernameError.addClass('d-none');
			return true;
		}
	},

	/**
	* The below function check input password, return false if length of password less than 8 charater,
	  otherwise return true
	* @param {string} password
	* @return {bool}
	*/

	checkPassword(password) {
		var $passwordError = $('#password-error');
		if (password.length < 8) {
			$passwordError.removeClass('d-none');
			return false;
		} else {
			$passwordError.addClass('d-none');
			return true;
		}
	},

	/**
	* The below function check input email, return true if email format at least one "@" charater
	  and one "." charater after "@", otherwise return false
	* @param {string} email
	* @return {bool}
	*/

	checkEmail(email) {
		var $emailError = $('#email-error');
		var emailFormat = /[A-Za-z0-9_]+@{1}([A-Za-z]+\.{1}[A-Za-z]+)+/;
		if (email.match(emailFormat)) {
			$emailError.addClass('d-none');
			return true;
		} else {
			$emailError.removeClass('d-none');
			return false;
		}
	},

	/**
	* The below function check input birthday, return false if length of birthday less than 1 charater
	  and birthday is after current date
	  otherwise return true
	* @param {string} birthdayString
	* @return {bool}
	*/

	checkBirthday(birthdayString) {
		var $birthdayError = $('#birthday-error');
		var currentDay = new Date();
		var birthdayArray = birthdayString.split("/");
		var birthday = new Date(birthdayArray[2],birthdayArray[1]-1,birthdayArray[0]);


		if (birthdayString.length <= 0) {
			$birthdayError.removeClass('d-none');
			return false;
		}
		else if (birthday > currentDay) {
			$birthdayError.removeClass('d-none');
			$birthdayError.html("Birthday must before current day");
			return false;
		} else {
			$birthdayError.addClass('d-none');
			$birthdayError.html("Birthday is required");
			return true;
		}
	}
}
