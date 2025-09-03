const { Client } = require('pg');

const config = {
  user: process.env.DB_USER,
  host: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: {
    // Đảm bảo cấu hình này đúng để kết nối với cơ sở dữ liệu trên Render
    rejectUnauthorized: false
  }
};

async function connectDb() {
  const client = new Client(config);
  try {
    await client.connect();
    console.log("Database connection successful!");
    return client;
  } catch (err) {
    console.error("Database connection failed!", err);
    throw err;
  }
}

// Thay đổi: Export hàm connectDb để file server.js có thể sử dụng
module.exports = connectDb;

// const sql = require('mssql');
// const dbConfig = require('../config/dbConfig');

// // Tạo một pool kết nối duy nhất
// const pool = new sql.ConnectionPool(dbConfig);

// // Hàm để kết nối đến database
// async function connectDb() {
//     try {
//         await pool.connect();
//         console.log('Connected to SQL Server database pool.');
//     } catch (err) {
//         console.error('Database connection failed!', err);
//         process.exit(1); 
//     }
// }

// // Hàm để lấy pool kết nối
// function getPool() {
//     return pool;
// }

// module.exports = {
//     connectDb,
//     getPool,
//     sql
// };
