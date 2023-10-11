class User {
	constructor({ email, firstName, lastName, birthdate, password }) {
		this.email = email;
		this.firstName = firstName;
		this.lastName = lastName;
		this.birthdate = birthdate;
		this.password = password;
	}

	isValidEmail() {
		const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
		return regex.test(this.email);
	}

	isValidPassword() {
		const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,40}$/;
		return regex.test(this.password);
	}

	isUserValid() {
		const hasAtLeast13Years =
			new Date().getFullYear() - this.birthdate.getFullYear() >= 13;

		return (
			this.isValidEmail() &&
			this.isValidPassword() &&
			this.firstName.trim().length > 0 &&
			this.lastName.trim().length > 0 &&
			hasAtLeast13Years
		);
	}
}

module.exports = User;
