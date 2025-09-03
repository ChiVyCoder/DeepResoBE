const { Client } = require('pg');
const { Pool } = require('pg');

let pool;


const config = {
  user: process.env.DB_USER,
  host: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: {
    rejectUnauthorized: false
  }
};

function getPool() {
  if (!pool) {
    console.log("Creating new database connection pool...");
    pool = new Pool(config);
    // Lắng nghe sự kiện lỗi trên pool
    pool.on('error', (err) => {
      console.error('Lỗi không mong muốn trên pool:', err);
    });
  }
  return pool;
}

async function closePool() {
  if (pool) {
    try {
      await pool.end();
      console.log('Database connection pool closed.');
    } catch (err) {
      console.error('Lỗi khi đóng pool kết nối:', err);
    }
  }
}
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
module.exports ={
connectDb,
getPool,
closePool
} 
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
