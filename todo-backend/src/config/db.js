const mysql = require('mysql2/promise'); // Menggunakan promise API
require('dotenv').config();

const pool = mysql.createPool(
    {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        // waitForConnection: true,
        connectionLimit: 10,
        queueLimit: 0
    }
);

async function connectDb() {
    try {
        await pool.getConnection();
        console.log('Connected to MySQL Database');
    } catch (err) {
        console.error('Database connection failed:', err);
        process.exit(1); //Keluar aplikasi jika koneksi gagal
    }
}

module.exports = {pool, connectDb};