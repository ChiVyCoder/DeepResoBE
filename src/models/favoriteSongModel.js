const { getPool } = require('../db/index.js'); 

async function addFavoriteSong(userId, songId, title, artist, thumbnail, songURL, playlist) {
    try {
        const pool = getPool();

        // 1. Kiểm tra xem bài hát đã tồn tại trong danh sách yêu thích của người dùng hay chưa
        const checkResult = await pool.query(
            `
            SELECT 1 
            FROM FavoriteSongs 
            WHERE UserId = $1 AND SongId = $2
            `,
            [userId, songId]
        );

        if (checkResult.rows.length > 0) {
            console.log('Bài hát đã tồn tại trong danh sách yêu thích.');
            return false; 
        }

        // 2. Nếu chưa tồn tại, thêm bài hát vào database
        const result = await pool.query(
            `
            INSERT INTO FavoriteSongs (UserId, SongId, Title, Artist, thumbnail, songURL, playlist)
            VALUES ($1, $2, $3, $4, $5, $6, $7);
            `,
            [userId, songId, title, artist, thumbnail, songURL, playlist]
        );
        return result.rowCount > 0; 
    } catch (error) {
        console.error('Lỗi ở model addFavoriteSong:', error);
        throw error; 
    }
}

// Hàm để lấy danh sách bài hát yêu thích của một người dùng
async function getFavoriteSongsByUserId(userId) {
    try {
        const pool = getPool();
        const result = await pool.query(
            'SELECT Id, SongId, Title, Artist, playlist, thumbnail, songURL FROM FavoriteSongs WHERE UserId = $1',
            [userId]
        );
        return result.rows;
    } catch (error) {
        console.error('Lỗi ở model getFavoriteSongsByUserId:', error);
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

        const result = await pool.query(
            'DELETE FROM FavoriteSongs WHERE SongId = $1 AND UserId = $2',
            [favoriteId, userId]
        );

        return result.rowCount > 0;
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