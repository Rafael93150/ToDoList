class Todo {
	constructor({ name, content, createdAt, createdBy }) {
		this.name = name;
		this.content = content;
		this.createdAt = createdAt;
		this.createdBy = createdBy;
	}

	isValidTodo() {
		this.name.trim().length > 0 &&
			this.content.trim().length > 0 &&
			this.content.length <= 1000 &&
			this.createdBy;
	}
}

module.exports = Todo;
