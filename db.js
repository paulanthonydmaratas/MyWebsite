// db.js - Handles client-side storage management

const DB_KEY = 'crud_db_users';

// Initialize database with seed data if empty
function initDB() {
    if (!localStorage.getItem(DB_KEY)) {
        const initialUsers = [
            { id: 1, name: "John Doe", email: "john@example.com" }
        ];
        localStorage.setItem(DB_KEY, JSON.stringify(initialUsers));
    }
}

// Fetch all users sorted by ID descending
function getUsers() {
    initDB();
    const users = JSON.parse(localStorage.getItem(DB_KEY)) || [];
    return users.sort((a, b) => b.id - a.id);
}

// Get user by ID
function getUserById(id) {
    const users = getUsers();
    return users.find(u => u.id === parseInt(id, 10)) || null;
}

// Insert new user
function createUser(name, email) {
    const users = getUsers();
    const newId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
    const newUser = { id: newId, name: name.trim(), email: email.trim() };
    users.push(newUser);
    localStorage.setItem(DB_KEY, JSON.stringify(users));
}

// Update existing user
function updateUser(id, name, email) {
    const users = getUsers();
    const index = users.findIndex(u => u.id === parseInt(id, 10));
    if (index !== -1) {
        users[index].name = name.trim();
        users[index].email = email.trim();
        localStorage.setItem(DB_KEY, JSON.stringify(users));
        return true;
    }
    return false;
}

// Delete user by ID
function deleteUser(id) {
    let users = getUsers();
    users = users.filter(u => u.id !== parseInt(id, 10));
    localStorage.setItem(DB_KEY, JSON.stringify(users));
}