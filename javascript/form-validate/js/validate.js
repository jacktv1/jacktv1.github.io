var validate = {
	/**
	* The below function check input username, return false if length of username less than 8 charater,
	  otherwise return true 
	* @param {string} username
	* @return {bool}  
	*/
	checkUsername(username) {
		var usernameError = document.getElementById('username-error');
		if (username.length < 8) {
			usernameError.classList.remove('d-none');
			return false;
		} else {
			usernameError.classList.add('d-none');
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
		var passwordError = document.getElementById('password-error');
		if (password.length < 8) {
			passwordError.classList.remove('d-none');
			return false;
		} else {
			passwordError.classList.add('d-none');
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
		var emailError = document.getElementById('email-error');
		var emailFormat = /[A-Za-z0-9_]+@{1}([A-Za-z]+\.{1}[A-Za-z]+)+/;
		if (email.match(emailFormat)) {
			emailError.classList.add('d-none');
			return true;
		} else {
			emailError.classList.remove('d-none');
			return false;
		}
	},
	/**
	* The below function check input birthday, return true if length of birthday more than 0 charater
	  and birthday is before current date
	  otherwise return false 
	* @param {string} birthdayString
	* @return {bool}  
	*/
	checkBirthday(birthdayString) {
		var birthdayError = document.getElementById('birthday-error');
		var currentDay = new Date();
		var birthdayArray = birthdayString.split("/");
		var birthday = new Date(birthdayArray[2],birthdayArray[1]-1,birthdayArray[0]);


		if (birthdayString.length > 0 && birthday < currentDay) {
			birthdayError.classList.add('d-none');
			return true;
		} else {
			birthdayError.classList.remove('d-none');
			return false;
		}
	}
}