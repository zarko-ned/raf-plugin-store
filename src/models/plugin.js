// U bilo kom drugom fajlu (npr. routes/comics.js)
import pool from '../../db.js';  // Putanja zavisi od lokacije



export const getAllPlugins = async () => {
    try {
        const [rows] = await pool.query(`
        SELECT * 
        FROM plugin
      `);
        return rows;
    } catch (error) {
        console.error('Greška pri dohvatanju plugin-a:', error);
        throw new Error('Database error');
    }
};


