const { getPool } = require('../db'); 
const sql = require('mssql');

async function addFavoriteArtistToDb(userId, artistId) {
  try {
    const pool = getPool();

    // 1 Kiểm tra xem đã tồn tại chưa
    const check = await pool.request()
      .input('UserId', sql.NVarChar, userId)
      .input('ArtistId', sql.NVarChar, artistId)
      .query(`
        SELECT 1 
        FROM FavoriteArtists
        WHERE UserId = @UserId AND ArtistId = @ArtistId
      `);

    if (check.recordset.length > 0) {
      console.log('Nghệ sĩ đã tồn tại trong danh sách yêu thích.');
      return false; 
    }

    // 2 Nếu chưa tồn tại thì thêm mới
    const result = await pool.request()
      .input('UserId', sql.NVarChar, userId)
      .input('ArtistId', sql.NVarChar, artistId)
      .query(`
        INSERT INTO FavoriteArtists (UserId, ArtistId)
        VALUES (@UserId, @ArtistId)
      `);

    return result.rowsAffected[0] > 0;
  } catch (error) {
    console.error('Lỗi model addFavoriteArtistToDb:', error);
    throw error;
  }
}

async function getFavoriteArtistsFromDb(userId) {
  try {
    const pool = getPool();
    const result = await pool.request()
      .input('UserId', sql.NVarChar, userId)
      .query(`
        SELECT ArtistId FROM FavoriteArtists WHERE UserId = @UserId
      `);
    return result.recordset.map(row => row.ArtistId);
  } catch (error) {
    console.error('Lỗi model getFavoriteArtistsFromDb:', error);
    throw error;
  }
}

async function deleteOneArtistFromDb(userId, artistId) {
  try {
    const pool = getPool();
    const result = await pool.request()
      .input('UserId', sql.NVarChar, userId)
      .input('ArtistId', sql.NVarChar, artistId)
      .query(`
         DELETE FROM FavoriteArtists
         WHERE UserId = @UserId AND ArtistId = @ArtistId
      `)
      return result.rowsAffected[0] > 0
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
