class User {
    constructor({ email, firstName, lastName, birthdate }) {
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthdate = birthdate;
    }

    isUserValid() {
        const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        const isEmailValid = regex.test(this.email);

        const hasAtLeast13Years =
            new Date().getFullYear() - this.birthdate.getFullYear() >= 13;

        return (
            isEmailValid &&
            this.firstName.trim().length > 0 &&
            this.lastName.trim().length > 0 &&
            hasAtLeast13Years
        );
    }
}

module.exports = User;
