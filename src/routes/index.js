import express from 'express';

import {fetchAllPlugins} from "../controllers/pluginController.js";

const router = express.Router();
router.get('/', fetchAllPlugins);

export default router;  // Promenjeno iz module.exports