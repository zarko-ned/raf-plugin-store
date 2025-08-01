import express from 'express';

import {fetchReleaseByReleaseID, fetchTeacherReleases} from '../controllers/pluginReleaseController.js';


const router = express.Router();

router.get('/',fetchTeacherReleases);
router.get('/:releaseID', fetchReleaseByReleaseID)

export default router;