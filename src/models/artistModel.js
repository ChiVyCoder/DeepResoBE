// src/models/favoriteArtistModel.js (hoặc file tương ứng)
const { getPool } = require('../db'); 

async function addFavoriteArtistToDb(userId, artistId) {
  try {
    const pool = getPool();

    // 1 Kiểm tra xem đã tồn tại chưa
    const check = await pool.query(
      `
        SELECT 1 
        FROM FavoriteArtists
        WHERE UserId = $1 AND ArtistId = $2
      `,
      [userId, artistId]
    );

    if (check.rows.length > 0) {
      console.log('Nghệ sĩ đã tồn tại trong danh sách yêu thích.');
      return false; 
    }

    // 2 Nếu chưa tồn tại thì thêm mới
    const result = await pool.query(
      `
        INSERT INTO FavoriteArtists (UserId, ArtistId)
        VALUES ($1, $2)
      `,
      [userId, artistId]
    );

    return result.rowCount > 0;
  } catch (error) {
    console.error('Lỗi model addFavoriteArtistToDb:', error);
    throw error;
  }
}

async function getFavoriteArtistsFromDb(userId) {
  try {
    const pool = getPool();
    const result = await pool.query(
      `
        SELECT ArtistId FROM FavoriteArtists WHERE UserId = $1
      `,
      [userId]
    );
    return result.rows.map(row => row.ArtistId);
  } catch (error) {
    console.error('Lỗi model getFavoriteArtistsFromDb:', error);
    throw error;
  }
}

async function deleteOneArtistFromDb(userId, artistId) {
  try {
    const pool = getPool();
    const result = await pool.query(
      `
        DELETE FROM FavoriteArtists
        WHERE UserId = $1 AND ArtistId = $2
      `,
      [userId, artistId]
    );
    return result.rowCount > 0;
  } catch (error) {
    console.error('Lỗi model deleteOneArtistFromDb:', error);
    throw error;
  }
}

module.exports = {
  addFavoriteArtistToDb,
  getFavoriteArtistsFromDb,
  deleteOneArtistFromDb
};