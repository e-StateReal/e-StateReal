const sentiment = require('sentiment');
const natural = require('natural');
const medicalCodesService = require('./medicalCodesService');

const tokenizer = new natural.WordTokenizer();

async function generateRecommendations(data) {
    const recommendations = [];
    const processedData = [];

    // Process each input type
    if (data.claim) {
        processedData.push(await processClaim(data.claim));
    }

    if (data.assessment) {
        processedData.push(await processAssessment(data.assessment));
    }

    if (data.speech) {
        processedData.push(await processSpeech(data.speech));
    }

    if (data.medicalContent) {
        const medicalRecommendations = await processMedicalContent(data.medicalContent);
        if (medicalRecommendations.length > 0) {
            recommendations.push(...medicalRecommendations);
        }
    }

    // Generate overall recommendations based on processed data
    const overallSentiment = calculateOverallSentiment(processedData);
    recommendations.push(...generateSentimentBasedRecommendations(overallSentiment));

    // Look for common themes in keywords
    const commonKeywords = getCommonKeywords(processedData);
    if (commonKeywords.length > 0) {
        recommendations.push(`Common themes detected: ${commonKeywords.join(', ')}`);
    }

    return recommendations;
}

async function processClaim(claimText) {
    const sentimentResult = sentiment(claimText);
    const keywords = extractKeywords(claimText);
    return {
        type: 'claim',
        sentiment: sentimentResult.score,
        keywords
    };
}

async function processAssessment(answers) {
    const sentimentScores = answers.map(answer => sentiment(answer).score);
    const averageSentiment = sentimentScores.reduce((a, b) => a + b, 0) / sentimentScores.length;
    const keywords = answers.flatMap(answer => extractKeywords(answer));
    
    return {
        type: 'assessment',
        sentiment: averageSentiment,
        keywords
    };
}

async function processSpeech(speechText) {
    const sentimentResult = sentiment(speechText);
    const keywords = extractKeywords(speechText);
    return {
        type: 'speech',
        sentiment: sentimentResult.score,
        keywords
    };
}

async function processMedicalContent(content) {
    const medicalTerms = extractMedicalTerms(content);
    if (medicalTerms.length === 0) {
        return [];
    }

    const codes = await medicalCodesService.searchCodes(medicalTerms.join(' '));
    if (!codes.icd10.length && !codes.cpt.length) {
        return [];
    }

    const recommendations = ['Medical Recommendations:'];
    
    // Add ICD-10 codes
    if (codes.icd10.length > 0) {
        recommendations.push('ICD-10 Codes Detected:');
        codes.icd10.forEach(code => {
            recommendations.push(`- ${code.code}: ${code.description} (${code.category})`);
            
            // Add related conditions
            const related = medicalCodesService.getRelatedCodes(code.code);
            if (related.length > 0) {
                recommendations.push('  Related Conditions:');
                related.forEach(relatedCode => {
                    recommendations.push(`  - ${relatedCode.code}: ${relatedCode.description}`);
                });
            }
        });
    }

    // Add CPT codes
    if (codes.cpt.length > 0) {
        recommendations.push('CPT Codes Recommended:');
        codes.cpt.forEach(code => {
            recommendations.push(`- ${code.code}: ${code.description} (${code.category})`);
            
            // Add related procedures
            const related = medicalCodesService.getRelatedCodes(code.code);
            if (related.length > 0) {
                recommendations.push('  Related Procedures:');
                related.forEach(relatedCode => {
                    recommendations.push(`  - ${relatedCode.code}: ${relatedCode.description}`);
                });
            }
        });
    }

    return recommendations;
}

function calculateOverallSentiment(data) {
    const sentiments = data
        .filter(item => item.sentiment !== undefined)
        .map(item => item.sentiment);
    
    return sentiments.reduce((a, b) => a + b, 0) / sentiments.length || 0;
}

function generateSentimentBasedRecommendations(sentimentScore) {
    if (sentimentScore > 0.5) {
        return ['Positive sentiment detected. Consider maintaining current approach.'];
    } else if (sentimentScore < -0.5) {
        return ['Negative sentiment detected. Consider reviewing current strategies.'];
    } else {
        return ['Neutral sentiment detected. Maintain current approach with minor adjustments.'];
    }
}

function extractKeywords(text) {
    const tokens = tokenizer.tokenize(text.toLowerCase());
    return tokens.filter(word => 
        word.length > 2 &&
        !natural.Stopword.isStopword(word)
    );
}

function extractMedicalTerms(text) {
    const keywords = extractKeywords(text);
    return keywords.filter(term => 
        /\b(hypertension|diabetes|asthma|depression|anxiety|back pain|headache|cold|flu|\w+\s+disease|\w+\s+syndrome)\b/i.test(term)
    );
}

function getCommonKeywords(data) {
    const allKeywords = data
        .filter(item => item.keywords)
        .flatMap(item => item.keywords);
    
    const keywordCounts = {};
    allKeywords.forEach(keyword => {
        keywordCounts[keyword] = (keywordCounts[keyword] || 0) + 1;
    });

    return Object.entries(keywordCounts)
        .filter(([_, count]) => count > 1)
        .map(([word]) => word);
}

module.exports = {
    generateRecommendations
};
