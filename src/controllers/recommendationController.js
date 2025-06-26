const express = require('express');
const router = express.Router();
const recommendationService = require('../services/recommendationService');
const { body, validationResult } = require('express-validator');

// Validation middleware
const validateInput = [
    body('claim').optional().isString().trim(),
    body('assessment').optional().isArray(),
    body('speech').optional().isString().trim(),
    body('medicalContent').optional().isString().trim()
];

// Get recommendations
router.post('/', validateInput, async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { claim, assessment, speech, medicalContent } = req.body;
        const recommendations = await recommendationService.generateRecommendations({
            claim,
            assessment,
            speech,
            medicalContent
        });

        res.json(recommendations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
