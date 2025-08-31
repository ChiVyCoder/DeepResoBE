const {sql, getPool} = require('../db/index.js') 

async function createUser(userName, passwordHash) {
    try {
        const pool = getPool() 
        const request = pool.request()

        request.input('UserName', sql.NVarChar(50), userName)
        request.input('PassWordHash', sql.NVarChar(255), passwordHash)

        const result = await request.query(
            `INSERT INTO Users (UserName, PasswordHash) 
             VALUES (@Username, @PasswordHash);`
        )
        return result.rowsAffected[0] > 0;
    } catch (error) {
        console.error('Error in model createUser:', error);
        throw error;
    }
}

// Hàm tìm người dùng theo tên đăng nhập
async function findUserByUsername(username) {
    try {
        const pool = getPool();
        const result = await pool.request()
            .input('Username', sql.NVarChar(50), username)
            .query('SELECT Id, Username, PasswordHash FROM Users WHERE Username = @Username');
        return result.recordset[0] || null;
    } catch (error) {
        console.error('Error in model findUserByUsername:', error);
        throw error;
    }
}

module.exports = {
    createUser,
    findUserByUsername
};