const db = require('../config/db');

class AuthUser {
    static async create({ name, email, password }) {
        const [result] = await db.execute(
            'INSERT INTO authusers (name, email, password) VALUES (?, ?, ?)',
            [name, email, password]
        );
        return result;
    }

    static async findByEmail(email) {
        const [rows] = await db.execute(
            'SELECT * FROM authusers WHERE email = ?',
            [email]
        );
        return rows[0];
    }
}

module.exports = AuthUser;





