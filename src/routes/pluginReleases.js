import express from 'express';

import { fetchReleasesByPluginID } from '../controllers/pluginReleaseController.js';


const router = express.Router();

router.get('/:pluginID',fetchReleasesByPluginID);

export default router;