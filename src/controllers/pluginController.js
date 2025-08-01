import {getAllPlugins} from "../models/plugin.js";


export const fetchAllPlugins = async (req, res) => {
    try {
        const  data = await getAllPlugins();
        res.json({
            success: true,
            data: data
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
