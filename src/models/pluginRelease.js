// U bilo kom drugom fajlu (npr. routes/comics.js)
import pool from '../../db.js';  // Putanja zavisi od lokacije

export const getReleasesByPluginID = async (pluginID, page = 1, limit = 10) => {
    try {
        const offset = (page - 1) * limit;

        // Dohvatanje podataka sa paginacijom
        const [rows] = await pool.query(`
            SELECT *
            FROM plugin_release
            WHERE plugin_id = ?
            ORDER BY build_date DESC
                LIMIT ? OFFSET ?
        `, [pluginID, limit, offset]);

        // Dohvatanje UKUPNOG broja zapisa (bez paginacije)
        const [[{ count }]] = await pool.query(`
            SELECT COUNT(*) AS count 
            FROM plugin_release 
            WHERE plugin_id = ?
        `, [pluginID]);

        return {
            data: rows,
            count: count
        };

    } catch (error) {
        console.error('Greška pri dohvatanju izdanja plugina:', error);
        throw new Error('Database error');
    }
};