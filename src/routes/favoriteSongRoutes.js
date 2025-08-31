// src/routes/favoriteSongRoutes.js
const express = require('express');
const favoriteSongController = require('../controller/favoriteSongController.js');

const router = express.Router(); 

// Route để thêm bài hát yêu thích (POST /api/favorites)
router.post('/', favoriteSongController.addFavoriteSong);

// Route để lấy danh sách bài hát yêu thích của một người dùng (GET /api/favorites/:userId)
router.get('/:userId', favoriteSongController.getFavoriteSongs);

// Route để xóa một bài hát yêu thích (DELETE /api/favorites/:id)
router.delete('/:userId/:id', favoriteSongController.deleteFavoriteSong);

module.exports = router;
