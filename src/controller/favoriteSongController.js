// src/controllers/favoriteSongController.js
const favoriteSongModel = require('../models/favoriteSongModel');

// Controller cho việc thêm bài hát yêu thích
async function addFavoriteSong(req, res) {
    const { userId, songId, title, artist, thumbnail, songURL } = req.body;

    if (!userId || !songId || !title || !artist || !thumbnail || !songURL) {
        return res.status(400).json({ message: 'Vui lòng cung cấp đầy đủ thông tin: userId, songId, title, artist.' });
    }

    try {
        const success = await favoriteSongModel.addFavoriteSong(userId, songId, title, artist, thumbnail, songURL);
        if (success) {
            res.status(201).json({ message: 'Bài hát đã được thêm vào danh sách yêu thích thành công!' });
        } else {
            res.status(500).json({ message: 'Không thể thêm bài hát vào danh sách yêu thích.' });
        }
    } catch (error) {
        console.error('Error in controller addFavoriteSong:', error);
        res.status(500).json({ message: 'Đã xảy ra lỗi server khi thêm bài hát yêu thích.', error: error.message });
    }
}

// Controller cho việc lấy danh sách bài hát yêu thích
async function getFavoriteSongs(req, res) {
    const userId = req.params.userId;

    if (!userId) {
        return res.status(400).json({ message: 'Vui lòng cung cấp userId.' });
    }

    try {
        const songs = await favoriteSongModel.getFavoriteSongsByUserId(parseInt(userId, 10)); 
        res.status(200).json({ data: songs });
    } catch (error) {
        console.error('Error in controller getFavoriteSongs:', error);
        res.status(500).json({ message: 'Đã xảy ra lỗi server khi lấy danh sách bài hát yêu thích.', error: error.message });
    }
}

// Controller cho việc xóa bài hát yêu thích
async function deleteFavoriteSong(req, res) {
    const favoriteId = req.params.id;
    const userId = req.params.userId;

    if (!favoriteId) {
        return res.status(400).json({ message: 'Vui lòng cung cấp ID của bài hát yêu thích cần xóa.' });
    }

    try {
        const success = await favoriteSongModel.deleteFavoriteSongById(favoriteId, userId);
        if (success) {
            res.status(200).json({ message: 'Bài hát yêu thích đã được xóa thành công!' });
        } else {
            res.status(404).json({ message: 'Không tìm thấy bài hát yêu thích để xóa.' });
        }
    } catch (error) {
        console.error('Error in controller deleteFavoriteSong:', error);
        res.status(500).json({ message: 'Đã xảy ra lỗi server khi xóa bài hát yêu thích.', error: error.message });
    }
}

module.exports = {
    addFavoriteSong,
    getFavoriteSongs,
    deleteFavoriteSong
};
