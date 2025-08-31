const artistModel = require('../models/artistModel')

// Controller thêm nghệ sĩ vào yêu thích

async function addFavoriteArtist(req, res) {
  try {
    const { userId, artistId } = req.body;

    if (!userId || !artistId) {
      return res.status(400).json({ message: 'Thiếu userId hoặc artistId' });
    }

    const success = await artistModel.addFavoriteArtistToDb(userId, artistId);
    if (success) {
      res.status(201).json({ message: 'Đã thêm nghệ sĩ vào yêu thích' });
    } else {
      res.status(500).json({ message: 'Không thể thêm nghệ sĩ vào cơ sở dữ liệu' });
    }
  } catch (error) {
    console.error('Lỗi controller addFavoriteArtist:', error);
    res.status(500).json({ message: 'Lỗi server' });
  }
}

async function getFavoriteArtistsByUserId(req, res) {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: 'Thiếu userId' });
    }

    const artists = await artistModel.getFavoriteArtistsFromDb(userId);
    res.status(200).json({ userId, favoriteArtists: artists });
  } catch (error) {
    console.error('Lỗi controller getFavoriteArtistsByUserId:', error);
    res.status(500).json({ message: 'Lỗi server' });
  }
}

async function deleteOneArtist(req, res) {
  try {
    const {userId, artistId} = req.params
    if (!userId || !artistId) {
      return res.status(400).json({ message: 'Thiếu userId hoặc artistId' });
    }
    const success = await artistModel.deleteOneArtistFromDb(userId, artistId)
    if (success) {
      res.status(201).json({message: "Đã xóa thành công"})
    }
  } catch (error) {
    console.error('Lỗi controller getFavoriteArtistsByUserId:', error);
    res.status(500).json({ message: 'Lỗi server' });
  }
}

module.exports = {
  addFavoriteArtist,
  getFavoriteArtistsByUserId,
  deleteOneArtist
};
