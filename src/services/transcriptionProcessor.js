const natural = require('natural');
const fs = require('fs');
const path = require('path');

class TranscriptionProcessor {
    constructor() {
        // Initialize NLP tools
        this.tokenizer = new natural.WordTokenizer();
        this.classifier = new natural.BayesClassifier();
        
        // Load care plan templates
        this.carePlanTemplates = this.loadCarePlanTemplates();
    }

    // Load care plan templates from a JSON file
    loadCarePlanTemplates() {
        try {
            const templatesPath = path.join(__dirname, '../data/care-plan-templates.json');
            const templates = JSON.parse(fs.readFileSync(templatesPath, 'utf8'));
            return templates;
        } catch (error) {
            console.error('Error loading care plan templates:', error);
            return {};
        }
    }

    // Process transcription and generate actions
    async processTranscription(transcription) {
        const actions = [];
        const carePlans = [];

        // Tokenize and process the transcription
        const tokens = this.tokenizer.tokenize(transcription);
        
        // Look for medical condition mentions
        const conditions = this.extractMedicalConditions(tokens);
        
        // Generate care plans based on detected conditions
        for (const condition of conditions) {
            const carePlan = this.generateCarePlan(condition);
            if (carePlan) {
                carePlans.push(carePlan);
            }
        }

        // Look for appointment mentions
        const appointments = this.extractAppointments(tokens);
        for (const appointment of appointments) {
            actions.push({
                type: 'follow-up',
                specialty: appointment.specialty,
                date: appointment.date,
                notes: appointment.notes
            });
        }

        return {
            actions,
            carePlans
        };
    }

    // Extract medical conditions from tokens
    extractMedicalConditions(tokens) {
        // Simple keyword matching for now - can be enhanced with ML
        const conditions = [];
        const conditionKeywords = {
            'diabetes': ['diabetes', 'diabetic', 'hyperglycemia'],
            'cardio': ['cardio', 'cardiac', 'heart', 'cardiologist'],
            'hypertension': ['hypertension', 'high blood pressure']
        };

        for (const [condition, keywords] of Object.entries(conditionKeywords)) {
            if (keywords.some(keyword => tokens.includes(keyword))) {
                conditions.push(condition);
            }
        }

        return conditions;
    }

    // Generate care plan based on condition
    generateCarePlan(condition) {
        if (!this.carePlanTemplates[condition]) {
            return null;
        }

        const template = this.carePlanTemplates[condition];
        return {
            condition,
            problems: template.problems,
            interventions: template.interventions,
            goals: template.goals,
            barriers: template.barriers
        };
    }

    // Extract appointment mentions
    extractAppointments(tokens) {
        const appointments = [];
        const specialtyKeywords = {
            'cardiologist': ['cardiologist', 'cardio', 'cardiac'],
            'endocrinologist': ['endocrinologist', 'endocrine']
        };

        // Simple pattern matching for dates
        const datePattern = /\b(?:jan(?:uary)?|feb(?:ruary)?|mar(?:ch)?|apr(?:il)?|may|jun(?:e)?|jul(?:y)?|aug(?:ust)?|sep(?:tember)?|oct(?:ober)?|nov(?:ember)?|dec(?:ember)?)\s+\d{1,2}\b/i;

        for (const [specialty, keywords] of Object.entries(specialtyKeywords)) {
            if (keywords.some(keyword => tokens.includes(keyword))) {
                const dateMatch = transcription.match(datePattern);
                appointments.push({
                    specialty,
                    date: dateMatch ? dateMatch[0] : 'TBD',
                    notes: `Follow-up with ${specialty}`
                });
            }
        }

        return appointments;
    }
}

module.exports = TranscriptionProcessor;
