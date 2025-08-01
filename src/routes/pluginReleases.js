import express from 'express';

import {fetchReleaseByReleaseID, fetchTeacherReleases, saveRelease} from '../controllers/pluginReleaseController.js';


const router = express.Router();

router.get('/',fetchTeacherReleases);
router.get('/:releaseID', fetchReleaseByReleaseID)
router.post('/', saveRelease)

export default router;