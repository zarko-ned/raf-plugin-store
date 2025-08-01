import express from 'express';

const router = express.Router();


router.get('/', (req, res) => {
    res.redirect('/plugins');  // Status 302 (privremeno preusmerenje)
});

export default router;  // Promenjeno iz module.exports