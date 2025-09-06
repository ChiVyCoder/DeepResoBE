const mongoose = require('mongoose');

// Biến môi trường cho chuỗi kết nối MongoDB
const MONGO_URI = process.env.MONGO_URI;

/**
 * Hàm kết nối đến cơ sở dữ liệu MongoDB
 */
async function connectDb() {
  if (!MONGO_URI) {
    console.error("Thiếu biến môi trường MONGO_URI!");
    throw new Error("Không tìm thấy chuỗi kết nối MongoDB.");
  }
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Kết nối đến MongoDB Atlas thành công!");
  } catch (error) {
    console.error("Lỗi kết nối đến MongoDB Atlas:", error);
    throw error;
  }
}

// Hàm getPool chỉ đơn giản là trả về mongoose để các file model vẫn hoạt động
function getPool() {
    return mongoose;
}

module.exports = { connectDb, getPool };