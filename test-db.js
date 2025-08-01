import pool from './db.js';

async function testConnection() {
    try {
        const [rows] = await pool.query('SELECT 1 + 1 AS result');
        console.log('✅ Test upita uspešan. Rezultat:', rows[0].result);

        const [version] = await pool.query('SELECT VERSION() AS version');
        console.log('🔌 Verzija MySQL/MariaDB:', version[0].version);
    } catch (err) {
        console.error('❌ Greška pri testiranju:', err);
    } finally {
        await pool.end(); // Zatvaranje konekcije
    }
}

testConnection();