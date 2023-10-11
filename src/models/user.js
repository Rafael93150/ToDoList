const UserModel = require("../schemas/user.js");
const TodoList = require("./todolist.js");
const Todolist = require("./todolist.js");

class User {
	constructor({ email, firstName, lastName, birthdate, password }) {
		this.email = email;
		this.firstName = firstName;
		this.lastName = lastName;
		this.birthdate = birthdate;
		this.password = password;
		this.todolist = null;
	}

	isValidEmail() {
		const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
		return regex.test(this.email);
	}

	isValidPassword() {
		const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,40}$/;
		return regex.test(this.password);
	}

	hasAtLeast13Years() {
		return new Date().getFullYear() - this.birthdate.getFullYear() >= 13;
	}

	isUserValid() {
		return (
			this.isValidEmail() &&
			this.isValidPassword() &&
			this.firstName.trim().length > 0 &&
			this.lastName.trim().length > 0 &&
			this.birthdate instanceof Date &&
			!isNaN(this.birthdate) &&
			this.hasAtLeast13Years()
		);
	}

	addTodoList(todoList) {
		if (!this.isUserValid()) throw new Error("User is not valid");
		if (this.todolist) throw new Error("User already has a todolist");
		if (typeof todoList !== "object" || !todoList instanceof TodoList)
			throw new Error("TodoList is not a TodoList object");
		this.todolist = new Todolist();
	}

	async saveToDatabase() {
		console.log(this.isUserValid());
		if (this.isUserValid()) {
			const userDocument = new UserModel({
				email: this.email,
				firstName: this.firstName,
				lastName: this.lastName,
				birthdate: this.birthdate,
				password: this.password,
			});

			try {
				const savedUser = await userDocument.save();
				return savedUser;
			} catch (error) {
				throw error;
			}
		} else {
			throw new Error("L'utilisateur n'est pas valide.");
		}
	}
}

module.exports = User;
