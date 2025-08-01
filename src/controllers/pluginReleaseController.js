import { getReleasesByPluginID } from '../models/pluginRelease.js';


export const fetchReleasesByPluginID = async (req, res) => {
    try {
        const pluginID = parseInt(req.params.pluginID);
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        // Validacija
        if (isNaN(pluginID)) {
            return res.status(400).json({
                success: false,
                message: 'Nevažeći ID plugina'
            });
        }

        if (page < 1 || limit < 1) {
            return res.status(400).json({
                success: false,
                message: 'Nevažeći parametri paginacije'
            });
        }

        // Dohvatanje podataka
        const releases = await getReleasesByPluginID(pluginID, page, limit);

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