const express = require('express');
const router = express.Router();
const medicalCodesService = require('../services/medicalCodesService');

// Search medical codes
router.get('/search', async (req, res) => {
    try {
        const { term } = req.query;
        if (!term) {
            return res.status(400).json({ error: 'Search term is required' });
        }

        const codes = await medicalCodesService.searchCodes(term);
        res.json(codes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get specific code details
router.get('/:code', async (req, res) => {
    try {
        const { code } = req.params;
        const codeDetails = await medicalCodesService.getCodeDetails(code);
        res.json(codeDetails);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
