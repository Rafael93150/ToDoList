const User = require("../models/user");
const TodoList = require("../models/todolist");

test("L'utilisateur a tout renseigné correctement", () => {
	const user = new User({
		email: "johndoe@exemple.com",
		firstName: "John",
		lastName: "Doe",
		birthdate: new Date("2000-01-01"),
		password: "Password1",
	});
	expect(user.isUserValid()).toBe(true);
});

test("L'utilisateur n'a pas renseigné son prénom", () => {
	const user = new User({
		email: "johndoe@exemple.com",
		firstName: "",
		lastName: "Doe",
		birthdate: new Date("2000-01-01"),
		password: "Password1",
	});
	expect(user.isUserValid()).toBe(false);
});

test("L'utilisateur a renseigné des espaces à la place de son prénom", () => {
	const user = new User({
		email: "johndoe@exemple.com",
		firstName: "       ",
		lastName: "Doe",
		birthdate: new Date("2000-01-01"),
		password: "Password1",
	});
	expect(user.isUserValid()).toBe(false);
});

test("L'utilisateur n'a pas renseigné son nom", () => {
	const user = new User({
		email: "johndoe@exemple.com",
		firstName: "John",
		lastName: "",
		birthdate: new Date("2000-01-01"),
		password: "Password1",
	});
	expect(user.isUserValid()).toBe(false);
});

test("L'utilisateur n'a pas renseigné une date de naissance valide", () => {
	const user = new User({
		email: "johndoe@exemple.com",
		firstName: "John",
		lastName: "Doe",
		birthdate: new Date("2015-01-01"),
		password: "Password1",
	});
	expect(user.isUserValid()).toBe(false);
});

test("L'utilisateur n'a pas renseigné un email valide", () => {
	const user = new User({
		email: "johndoe@exemple.c",
		firstName: "John",
		lastName: "Doe",
		birthdate: new Date("2000-01-01"),
		password: "Password1",
	});
	expect(user.isUserValid()).toBe(false);
});

test("L'utilisateur n'a pas renseigné un mot de passe valide", () => {
	const user = new User({
		email: "johndoe@exemple.com",
		firstName: "John",
		lastName: "Doe",
		birthdate: new Date("2000-01-01"),
		password: "Password",
	});
	expect(user.isUserValid()).toBe(false);
});

test("L'utilisateur n'a pas de todoList et est valide", () => {
	const user = new User({
		email: "johndoe@exemple.com",
		firstName: "John",
		lastName: "Doe",
		birthdate: new Date("2000-01-01"),
		password: "Password1",
	});
	const todoList = new TodoList();
	user.addTodoList(todoList);
	expect(user.todolist).toStrictEqual(todoList);
});

test("Doit renvoyer une erreur si l'utilisateur n'est pas valide", () => {
	const user = new User({
		email: "johndoe@exemple.com",
		firstName: "",
		lastName: "Doe",
		birthdate: new Date("2000-01-01"),
		password: "Password1",
	});
	const todoList = new TodoList();
	expect(() => user.addTodoList(todoList)).toThrow("User is not valid");
});

test("Doit renvoyer une erreur si l'utilisateur a déjà une todoList", () => {
	const user = new User({
		email: "johndoe@exemple.com",
		firstName: "John",
		lastName: "Doe",
		birthdate: new Date("2000-01-01"),
		password: "Password1",
	});
	const todoList = new TodoList();
	user.addTodoList(todoList);
	expect(() => user.addTodoList(todoList)).toThrow(
		"User already has a todolist"
	);
});

test("Doit retourner une erreur si la todoList ajoutée n'est pas un objet TodoList", () => {
	const user = new User({
		email: "johndoe@exemple.com",
		firstName: "John",
		lastName: "Doe",
		birthdate: new Date("2000-01-01"),
		password: "Password1",
	});
	expect(() => user.addTodoList("todolist")).toThrow(
		"TodoList is not a TodoList object"
	);
});
