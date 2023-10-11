const Todo = require("../models/todo");

let todo;
beforeEach(() => {
	todo = new Todo({
		name: "name",
		content: "content",
		createdAt: new Date(Date.now()),
	});
});

describe("isValidTodo", () => {
	it("should return true", () => {
		expect(todo.isValidTodo()).toBe(true);
	});

	it("should be invalid if name is empty", () => {
		todo.name = "";
		expect(todo.isValidTodo()).toBeFalsy();
	});

	it("should be invalid if content is empty", () => {
		todo.content = "";
		expect(todo.isValidTodo()).toBeFalsy();
	});

	it("should be invalid if content is too long", () => {
		todo.content = "x".repeat(1001);
		expect(todo.isValidTodo()).toBeFalsy();
	});

	it("should be invalid if createdAt is not a date", () => {
		todo.createdAt = "not a date";
		expect(todo.isValidTodo()).toBeFalsy();
	});
});
