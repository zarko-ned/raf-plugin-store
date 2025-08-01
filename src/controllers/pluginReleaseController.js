import { getTeacherReleases } from '../models/pluginRelease.js';


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