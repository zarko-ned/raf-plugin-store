import { getTeacherReleases, getReleaseByReleaseID, insertRelease } from '../models/pluginRelease.js';


export const fetchTeacherReleases = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;



        if (page < 1 || limit < 1) {
            return res.status(400).json({
                success: false,
                message: 'Nevažeći parametri paginacije'
            });
        }

        // Dohvatanje podataka
        const releases = await getTeacherReleases(page, limit);

        // Ako nema podataka
        if (!releases.data || releases.data.length === 0) {
            return res.json({
                success: true,
                data: [],
                pagination: {
                    currentPage: page,
                    totalPages: 0,
                    totalItems: 0,
                    itemsPerPage: limit
                }
            });
        }

        const totalPages = Math.ceil(releases.count / limit);

        res.json({
            success: true,
            data: releases.data,
            pagination: {
                currentPage: page,
                totalPages,
                totalItems: releases.count,
                itemsPerPage: limit
            }
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const fetchReleaseByReleaseID = async (req, res) => {
    try {
        const releaseID = parseInt(req.params.releaseID);
        // Validacija
        if (isNaN(releaseID)) {
            return res.status(400).json({
                success: false,
                message: 'Nevažeći ID plugina'
            });
        }


        // Dohvatanje podataka
        const release = await getReleaseByReleaseID(releaseID)

        // Ako nema podataka
        if (!release.data || release.data.length === 0) {
            return res.json({
                success: true,
                data: [],
            });
        }

        res.json({
            success: true,
            data: release.data,
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const saveRelease = async (req, res) => {
    try {
        // Proveravamo da li postoji req.body
        if (!req.body) {
            return res.status(400).json({
                success: false,
                message: 'Telo zahteva (body) nije prosleđeno'
            });
        }

        // Ekstrakcija verzije
        const {name, version } = req.body;

        // Provera da li verzija postoji
        if (!version) {
            return res.status(400).json({
                success: false,
                message: 'Polje "version" je obavezno'
            });
        }

        if (!name) {
            return res.status(400).json({
                success: false,
                message: 'Polje "name" je obavezno'
            });
        }

        // Provera tipa - osiguravamo da je version string
        if (typeof version !== 'string') {
            return res.status(400).json({
                success: false,
                message: 'Verzija mora biti tekstualni podatak'
            });
        }

        // Validacija dužine
        if (!version.length) {
            return res.status(400).json({
                success: false,
                message: 'Nevažeća verzija izdanja'
            });
        }

        if (version.length > 255) {
            return res.status(400).json({
                success: false,
                message: 'Verzija ne sme biti duža od 255 karaktera'
            });
        }

        const newReleaseID = await insertRelease(name,version);

        // Ako nema podataka
        if (!newReleaseID) {
            return res.status(500).json({
                success: false,
                message: 'Došlo je do greške pri čuvanju izdanja'
            });
        }

        return res.status(201).json({
            success: true,
            message: 'Izdanje uspešno sačuvano',
            data: {
                releaseId: newReleaseID,
                version: version
            }
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};