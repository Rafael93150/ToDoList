class Todo {
	constructor({ name, content, createdAt }) {
		this.name = name;
		this.content = content;
		this.createdAt = createdAt;
	}

    isValidTodo() {
        return (
            this.name.trim().length > 0 &&
            this.content.trim().length > 0 &&
            this.content.length <= 1000
        );
    }
    
}

module.exports = Todo;
