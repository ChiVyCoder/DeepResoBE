// src/db/index.js
const sql = require('mssql');
const dbConfig = require('../config/dbConfig');

// Tạo một pool kết nối duy nhất
const pool = new sql.ConnectionPool(dbConfig);

// Hàm để kết nối đến database
async function connectDb() {
    try {
        await pool.connect();
        console.log('Connected to SQL Server database pool.');
    } catch (err) {
        console.error('Database connection failed!', err);
        process.exit(1); 
    }
}

// Hàm để lấy pool kết nối
function getPool() {
    return pool;
}

module.exports = {
    connectDb,
    getPool,
    sql
};
