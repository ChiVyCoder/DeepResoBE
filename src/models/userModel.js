const { getPool } = require('../db/index.js'); 

async function createUser(userName, passwordHash) {
  try {
    const pool = getPool(); 
    const result = await pool.query(
      `INSERT INTO Users (UserName, PasswordHash) 
       VALUES ($1, $2);`,
      [userName, passwordHash]
    );
    return result.rowCount > 0;
  } catch (error) {
    console.error('Lỗi ở model createUser:', error);
    throw error;
  }
}

// Hàm tìm người dùng theo tên đăng nhập
async function findUserByUsername(username) {
  try {
    const pool = getPool();
    const result = await pool.query(
      'SELECT Id, Username, PasswordHash FROM Users WHERE Username = $1',
      [username]
    );
    return result.rows[0] || null;
  } catch (error) {
    console.error('Lỗi ở model findUserByUsername:', error);
    throw error;
  }
}

module.exports = {
  createUser,
  findUserByUsername
};