const mongoose = require('mongoose');
const { getPool } = require('../db');

// Định nghĩa lược đồ cho Favorite Artist
const favoriteArtistSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  artistId: { type: String, required: true, unique: true }
});

const FavoriteArtist = mongoose.model('FavoriteArtist', favoriteArtistSchema);

async function addFavoriteArtistToDb(userId, artistId) {
  try {
    const pool = getPool();
    // Tạo một tài liệu mới
    const newFavorite = new FavoriteArtist({ userId, artistId });
    await newFavorite.save();
    return true;
  } catch (error) {
    if (error.code === 11000) { // Lỗi trùng lặp
      console.log('Nghệ sĩ đã tồn tại trong danh sách yêu thích.');
      return false;
    }
    console.error('Lỗi model addFavoriteArtistToDb:', error);
    throw error;
  }
}

async function getFavoriteArtistsFromDb(userId) {
  try {
    const pool = getPool();
    const favorites = await FavoriteArtist.find({ userId });
    return favorites.map(fav => fav.artistId);
  } catch (error) {
    console.error('Lỗi model getFavoriteArtistsFromDb:', error);
    throw error;
  }
}

async function deleteOneArtistFromDb(userId, artistId) {
  try {
    const pool = getPool();
    const result = await FavoriteArtist.deleteOne({ userId, artistId });
    return result.deletedCount > 0;
  } catch (error) {
    console.error('Lỗi model getFavoriteArtistsFromDb:', error);
    throw error;
  }
}

module.exports = {
  addFavoriteArtistToDb,
  getFavoriteArtistsFromDb,
  deleteOneArtistFromDb
};