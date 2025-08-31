// src/models/favoriteSongModel.js
const { getPool, sql } = require('../db'); 

async function addFavoriteSong(userId, songId, title, artist, thumbnail, songURL, playlist) {
    try {
        const pool = getPool();
        const request = pool.request();

        request.input('UserId', sql.Int, userId);
        request.input('SongId', sql.NVarChar(100), songId);
        request.input('Title', sql.NVarChar(255), title);
        request.input('Artist', sql.NVarChar(255), artist);
        request.input('thumbnail', sql.NVarChar(255), thumbnail);
        request.input('songURL', sql.NVarChar(255), songURL);
        request.input('playlist', sql.NVarChar(255), playlist);

        const result = await request.query(`
            INSERT INTO FavoriteSongs (UserId, SongId, Title, Artist, thumbnail, songURL, playlist)
            VALUES (@UserId, @SongId, @Title, @Artist, @thumbnail, @songURL, @playlist);
        `);
        return result.rowsAffected[0] > 0; 
    } catch (error) {
        console.error('Error in model addFavoriteSong:', error);
        throw error; 
    }
}

// Hàm để lấy danh sách bài hát yêu thích của một người dùng
async function getFavoriteSongsByUserId(userId) {
    try {
        const pool = getPool();
        const result = await pool.request()
            .input('UserId', sql.Int, userId)
            .query('SELECT Id, SongId, Title, Artist, playlist, thumbnail, songURL FROM FavoriteSongs WHERE UserId = @UserId');
        return result.recordset;
    } catch (error) {
        console.error('Error in model getFavoriteSongsByUserId:', error);
        throw error;
    }
}

// Hàm để xóa một bài hát yêu thích theo Id trong bảng FavoriteSongs
async function deleteFavoriteSongById(favoriteId, userId) {
    try {
        const pool = getPool();

        if (!favoriteId || typeof favoriteId !== 'string') {
            throw new Error('favoriteId không hợp lệ hoặc không phải chuỗi');
        }

        if (!userId || typeof userId !== 'string') {
            throw new Error('userId không hợp lệ hoặc không phải chuỗi');
        }

        const result = await pool.request()
            .input('SongId', sql.NVarChar, favoriteId)
            .input('UserId', sql.NVarChar, userId)
            .query('DELETE FROM FavoriteSongs WHERE SongId = @SongId AND UserId = @UserId');

        return result.rowsAffected[0] > 0;
    } catch (error) {
        console.error('Error in model deleteFavoriteSongById:', error);
        throw error;
    }
}

module.exports = {
    addFavoriteSong,
    getFavoriteSongsByUserId,
    deleteFavoriteSongById
};
