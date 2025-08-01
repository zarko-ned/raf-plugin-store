// U bilo kom drugom fajlu (npr. routes/comics.js)
import pool from '../../db.js';  // Putanja zavisi od lokacije

export const getTeacherReleases = async (page = 1, limit = 10) => {
    try {
        const offset = (page - 1) * limit;

        // Dohvatanje podataka sa paginacijom
        const [rows] = await pool.query(`
            SELECT *
            FROM plugin_release
            WHERE plugin_id = 1
            ORDER BY build_date DESC
                LIMIT ? OFFSET ?
        `, [limit, offset]);

        // Dohvatanje UKUPNOG broja zapisa (bez paginacije)
        const [[{ count }]] = await pool.query(`
            SELECT COUNT(*) AS count 
            FROM plugin_release 
            WHERE plugin_id = 1
        `);

        return {
            data: rows,
            count: count
        };

    } catch (error) {
        console.error('Greška pri dohvatanju izdanja plugina:', error);
        throw new Error('Database error');
    }
};

export const getReleaseByReleaseID = async (releaseID) => {
    try {
        const [rows] = await pool.query(`
            SELECT *
            FROM plugin_release
            WHERE plugin_release_id = 1
        `);


        return {
            data: rows,
        };

    } catch (error) {
        console.error(`Greška pri dohvatanju izdanja plugina za ID ${releaseID}:`, error);
        throw new Error('Database error');
    }
};

export const insertRelease = async (name, version) => {
    try {
        const query = `
            INSERT INTO plugin_release 
            (plugin_id, name, version, description, build_date)
            VALUES (?, ?, ?, ?, ?)
        `;

        const values = [1, name, version, `Verzija ${version}}`,   new Date()];

        // Izvršavanje upita
        const [result] = await pool.execute(query, values);

        // Vraćanje ID-a novokreiranog reda
        return result.insertId;

    } catch (error) {
        console.error(`Greška pri čuvanju izdanja plugina ${version}:`, error);
        throw new Error('Database error');
    }
};