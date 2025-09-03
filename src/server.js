// src/server.js
require('dotenv').config(); 
const express = require('express');
const connectDb = require('./db'); 
const corsMiddleware = require('./middlewares/cors'); 
const favoriteSongRoutes = require('./routes/favoriteSongRoutes'); 
const userRoutes = require('./routes/userRoutes')
const ArtistRoutes = require('./routes/artistRoutes')

const app = express();
const PORT = 3000;

app.use(express.json());

app.use(corsMiddleware);

// --- Định nghĩa các Routes API ---
app.use('/api/favorites', favoriteSongRoutes);
app.use('/api/auth', userRoutes);
app.use('/api/artist', ArtistRoutes);

// Khởi động server
async function startServer() {
    try {
        await connectDb(); 
        app.listen(PORT, "0.0.0.0", () => {
            console.log(`Server đang chạy trên cổng ${PORT}`);
            console.log(`Các endpoint bài hát yêu thích: http://192.168.44.150:${PORT}/api/favorites`);
        });
    } catch (error) {
        console.error('Không thể khởi động server:', error);
        process.exit(1);
    }
}

startServer();
