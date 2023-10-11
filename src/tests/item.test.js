const Item = require("../models/item");

let item;
beforeEach(() => {
	item = new Item({
		name: "name",
		content: "content",
		createdAt: new Date(Date.now()),
	});
});

describe("isValidTodo", () => {
	it("should return true", () => {
		expect(item.isValidTodo()).toBe(true);
	});

	it("should be invalid if name is empty", () => {
		item.name = "";
		expect(item.isValidTodo()).toBeFalsy();
	});

	it("should be invalid if content is empty", () => {
		item.content = "";
		expect(item.isValidTodo()).toBeFalsy();
	});

	it("should be invalid if content is too long", () => {
		item.content = "x".repeat(1001);
		expect(item.isValidTodo()).toBeFalsy();
	});

	it("should be invalid if createdAt is not a date", () => {
		item.createdAt = "not a date";
		expect(item.isValidTodo()).toBeFalsy();
	});
});
