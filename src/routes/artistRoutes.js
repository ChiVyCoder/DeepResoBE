const express = require('express')
const artistController = require('../controller/artistController')

const router = express.Router()

router.post('/', artistController.addFavoriteArtist)
router.get('/:userId', artistController.getFavoriteArtistsByUserId);
router.post('/delete/:userId/:artistId', artistController.deleteOneArtist);
module.exports = router;