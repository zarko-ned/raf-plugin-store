import express from 'express';

import { fetchTeacherReleases } from '../controllers/pluginReleaseController.js';


const router = express.Router();

router.get('/',fetchTeacherReleases);

export default router;