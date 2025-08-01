import mysql from 'mysql2/promise'; // Koristimo promise-based verziju
import dotenv from 'dotenv';

dotenv.config();

// Konfiguracija za bazu
const dbConfig = {
    host: process.env.DB_HOST ,
    user: process.env.DB_USER ,
    password: process.env.DB_PASSWORD ,
    database: process.env.DB_NAME ,
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
};

// Kreiranje connection pool
const pool = mysql.createPool(dbConfig);


export default pool;