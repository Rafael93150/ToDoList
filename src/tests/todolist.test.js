const TodoList = require("../models/todolist");
const Item = require("../models/item");
const User = require("../models/user");

describe("add", () => {
	let todoList;
	let user;

	beforeEach(() => {
		user = new User({
			email: "johndoe@exemple.com",
			firstName: "John",
			lastName: "Doe",
			birthdate: new Date("2000-01-01"),
			password: "Password1",
		});

		todoList = new TodoList(user);
	});

	it("should add a valid item to the list", () => {
		const item = new Item({
			name: "New Item",
			content: "Item content",
			createdAt: new Date(),
		});
		todoList.add(item);
		expect(todoList.items).toContain(item);
	});

	it("should throw an error if the user is not valid", () => {
		user.firstName = "";
		todoList = new TodoList(user);
		const item = new Item({
			name: "New Item",
			content: "Item content",
			createdAt: new Date(),
		});
		expect(() => todoList.add(item)).toThrow("User is not valid");
	});

	it("should throw an error if the item list is full", () => {
		todoList.items = new Array(10).fill({});
		const item = new Item({
			name: "New Item",
			content: "Item content",
			createdAt: new Date(),
		});
		expect(() => todoList.add(item)).toThrow("Item list is full");
	});

	it("should throw an error if the item is not valid", () => {
		const item = new Item({
			name: "New Item",
			content: "", // Invalid content
			createdAt: new Date(),
		});
		expect(() => todoList.add(item)).toThrow("Invalid item");
	});

	it("should throw an error if the item name is not unique", () => {
		todoList.items = [
			new Item({
				name: "Item 1",
				content: "Content",
				createdAt: new Date(),
			}),
		];
		const item = new Item({
			name: "Item 1", // Duplicate name
			content: "Content",
			createdAt: new Date(),
		});
		expect(() => todoList.add(item)).toThrow("Item name is not unique");
	});

	it("should throw an error if the last item is not older than 30 minutes", () => {
		const now = new Date();
		const lastItem = new Item({
			name: "Last Item",
			content: "Content",
			createdAt: new Date(now - 29 * 60 * 1000), // Less than 30 minutes ago
		});
		todoList.items = [lastItem];
		const item = new Item({
			name: "New Item",
			content: "Item content",
			createdAt: now,
		});
		expect(() => todoList.add(item)).toThrow(
			"Last item is not older than 30 minutes"
		);
	});

	it("should send an email if there are 8 items in the list", () => {
		const item = new Item({
			name: "New Item",
			content: "Item content",
			createdAt: new Date(),
		});

        const sendSpy = todoList.sender.send = jest.fn();
		todoList.items = new Array(7).fill({});
		todoList.add(item);
		expect(sendSpy).toHaveBeenCalled();
	});
});
