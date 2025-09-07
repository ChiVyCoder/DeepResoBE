const mongoose = require('mongoose');
const { getPool } = require('../db/index.js'); 

// Định nghĩa lược đồ cho Favorite Song
const favoriteSongSchema = new mongoose.Schema({
    UserId: { type: String, required: true },
    SongId: { type: String, required: true, unique: true },
    Title: { type: String },
    Artist: { type: String },
    thumbnail: { type: String },
    songURL: { type: String },
    playlist: { type: String },
});

const FavoriteSong = mongoose.model('FavoriteSong', favoriteSongSchema);

async function addFavoriteSong(UserId, SongId, Title, Artist, thumbnail, songURL, playlist) {
    try {
        const pool = getPool();
        const newFavoriteSong = new FavoriteSong({
            UserId,
            SongId,
            Title,
            Artist,
            thumbnail,
            songURL,
            playlist
        });
        await newFavoriteSong.save();
        return true; 
    } catch (error) {
        if (error.code === 11000) {
            console.log('Bài hát đã tồn tại trong danh sách yêu thích.');
            return false;
        }
        console.error('Lỗi ở model addFavoriteSong:', error);
        throw error; 
    }
}

// Hàm để lấy danh sách bài hát yêu thích của một người dùng
async function getFavoriteSongsByUserId(userId) {
    try {
        const pool = getPool();
        const favorites = await FavoriteSong.find({ userId });
        return favorites;
    } catch (error) {
        console.error('Lỗi ở model getFavoriteSongsByUserId:', error);
        throw error;
    }
}

// Hàm để xóa một bài hát yêu thích theo Id trong bảng FavoriteSongs
async function deleteFavoriteSongById(favoriteId, userId) {
    try {
        const pool = getPool();
        const result = await FavoriteSong.deleteOne({ songId: favoriteId, userId: userId });
        return result.deletedCount > 0;
    } catch (error) {
        console.error('Lỗi ở model deleteFavoriteSongById:', error);
        throw error;
    }
}

module.exports = {
    addFavoriteSong,
    getFavoriteSongsByUserId,
    deleteFavoriteSongById
};