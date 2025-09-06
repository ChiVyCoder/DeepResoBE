const mongoose = require('mongoose');
const { getPool } = require('../db');

// Định nghĩa lược đồ cho User
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

async function createUser(username, passwordHash) {
  try {
    const pool = getPool();
    const newUser = new User({ username, passwordHash });
    await newUser.save();
    return true;
  } catch (error) {
    console.error('Lỗi ở model createUser:', error);
    if (error.code === 11000) { 
        throw new Error('Tên người dùng đã tồn tại.');
    }
    throw error;
  }
}

// Hàm tìm người dùng theo tên đăng nhập
async function findUserByUsername(username) {
  try {
    const pool = getPool();
    const user = await User.findOne({ username });
    return user;
  } catch (error) {
    console.error('Lỗi ở model findUserByUsername:', error);
    throw error;
  }
}

module.exports = {
  createUser,
  findUserByUsername
};