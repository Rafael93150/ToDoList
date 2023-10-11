const User = require("../models/user");

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
		email: "johndoe@exemple.c",
		firstName: "John",
		lastName: "Doe",
		birthdate: new Date("2000-01-01"),
		password: "Password",
	});
	expect(user.isUserValid()).toBe(false);
});
