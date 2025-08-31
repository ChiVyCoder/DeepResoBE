    // src/config/dbConfig.js
    require('dotenv').config(); 

    const config = {
        user: process.env.DB_USER, 
        password: process.env.DB_PASSWORD, 
        server: process.env.DB_SERVER, 
        database: process.env.DB_DATABASE, 
        options: {
            encrypt: false, 
            trustServerCertificate: true 
        },
        port: parseInt(process.env.DB_PORT || '1433', 10) 
    };

    module.exports = config;