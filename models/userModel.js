// models/userModel.js
const bcrypt = require('bcryptjs');

const users = [];

const User = {
    findByUsername: (username) => users.find(user => user.username === username),
    create: async (username, password, role) => {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = { id: users.length + 1, username, password: hashedPassword, role };
        users.push(user);
        return user;
    },
    validatePassword: async (password, hashedPassword) => await bcrypt.compare(password, hashedPassword)
};

module.exports = User;
