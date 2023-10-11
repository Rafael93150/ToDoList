const User = require("../models/user");
const TodoList = require("../models/todolist");

let user;

beforeEach(() => {
	user = new User({
		email: "johndoe@exemple.com",
		firstName: "John",
		lastName: "Doe",
		birthdate: new Date("2000-01-01"),
		password: "Password1",
	});
});

describe("isUserValid", () => {
	it("L'utilisateur a tout renseigné correctement", () => {
		expect(user.isUserValid()).toBe(true);
	});

	it("L'utilisateur n'a pas renseigné son prénom", () => {
		user.firstName = "";
		expect(user.isUserValid()).toBe(false);
	});

	it("L'utilisateur a renseigné des espaces à la place de son prénom", () => {
		user.firstName = "   ";
		expect(user.isUserValid()).toBe(false);
	});

	it("L'utilisateur n'a pas renseigné son nom", () => {
		user.lastName = "";
		expect(user.isUserValid()).toBe(false);
	});

	it("L'utilisateur n'a pas 13 ans", () => {
		user.birthdate = new Date("2015-01-01");
		expect(user.isUserValid()).toBe(false);
	});

	it("L'utilisateur n'a pas renseigné une date valide", () => {
		user.birthdate = "Invalid date";
		expect(user.isUserValid()).toBe(false);
	});

	it("L'utilisateur n'a pas renseigné un email valide", () => {
		(user.email = "johndoe@exemple.c"),
			expect(user.isUserValid()).toBe(false);
	});

	it("L'utilisateur n'a pas renseigné un mot de passe valide", () => {
		user.password = "password1";
		expect(user.isUserValid()).toBe(false);
	});
});

describe("addTodoList", () => {
	it("L'utilisateur n'a pas de todoList et est valide", () => {
		const todoList = new TodoList();
		user.addTodoList(todoList);
		expect(user.todolist).toStrictEqual(todoList);
	});

	it("Doit renvoyer une erreur si l'utilisateur n'est pas valide", () => {
		user.firstName = "";
		const todoList = new TodoList();
		expect(() => user.addTodoList(todoList)).toThrow("User is not valid");
	});

	it("Doit renvoyer une erreur si l'utilisateur a déjà une todoList", () => {
		const todoList = new TodoList();
		user.addTodoList(todoList);
		expect(() => user.addTodoList(todoList)).toThrow(
			"User already has a todolist"
		);
	});

	it("Doit retourner une erreur si la todoList ajoutée n'est pas un objet TodoList", () => {
		expect(() => user.addTodoList("todolist")).toThrow(
			"TodoList is not a TodoList object"
		);
	});
});
