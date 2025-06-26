const fs = require('fs').promises;
const path = require('path');
const axios = require('axios');

const LOCAL_CODES_PATH = path.join(__dirname, '../data/medical-codes-db.json');

async function loadLocalCodes() {
    try {
        const data = await fs.readFile(LOCAL_CODES_PATH, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error loading local medical codes:', error);
        return {
            icd10: {},
            cpt: {},
            common_conditions: {}
        };
    }
}

async function searchCodes(term) {
    const localResults = await searchLocalCodes(term);
    
    // If no local results, try API
    if (!localResults.icd10.length && !localResults.cpt.length) {
        try {
            const apiResults = await searchApiCodes(term);
            return {
                icd10: [...localResults.icd10, ...apiResults.icd10],
                cpt: [...localResults.cpt, ...apiResults.cpt]
            };
        } catch (error) {
            console.error('Error searching API:', error);
            return localResults;
        }
    }

    return localResults;
}

async function searchLocalCodes(term) {
    const localCodes = await loadLocalCodes();
    const results = {
        icd10: [],
        cpt: []
    };

    // Search ICD-10 codes
    Object.values(localCodes.icd10).forEach(category => {
        Object.values(category).forEach(code => {
            if (matchesSearchTerm(code, term)) {
                results.icd10.push({
                    code: code.icd10 || Object.keys(category).find(key => category[key] === code),
                    description: code.description,
                    category: code.category,
                    keywords: code.keywords
                });
            }
        });
    });

    // Search CPT codes
    Object.values(localCodes.cpt).forEach(category => {
        Object.values(category).forEach(code => {
            if (matchesSearchTerm(code, term)) {
                results.cpt.push({
                    code: code.code,
                    description: code.description,
                    category: code.category,
                    keywords: code.keywords
                });
            }
        });
    });

    return results;
}

async function searchApiCodes(term) {
    try {
        // Replace with actual API endpoints
        const [icd10Response, cptResponse] = await Promise.all([
            axios.get(`https://icd10api.com/Search/${term}`),
            axios.get(`https://cptapi.com/Search/${term}`)
        ]);

        return {
            icd10: icd10Response.data.map(code => ({
                code: code.code,
                description: code.description,
                category: code.category
            })),
            cpt: cptResponse.data.map(code => ({
                code: code.code,
                description: code.description,
                category: code.category
            }))
        };
    } catch (error) {
        console.error('Error searching API codes:', error);
        return {
            icd10: [],
            cpt: []
        };
    }
}

function matchesSearchTerm(code, term) {
    const searchTerms = term.toLowerCase().split(' ');
    const textToMatch = [
        code.description.toLowerCase(),
        ...(code.keywords || []).map(k => k.toLowerCase()),
        ...(code.related_conditions || []).map(c => c.toLowerCase())
    ].join(' ');

    return searchTerms.every(word => 
        textToMatch.includes(word)
    );
}

function getRelatedCodes(code, type) {
    const localCodes = loadLocalCodes();
    const related = [];
    
    // Get related codes based on type
    Object.values(localCodes[type]).forEach(category => {
        Object.values(category).forEach(c => {
            if (c.related_conditions?.includes(code)) {
                related.push({
                    code: c.icd10 || c.code,
                    description: c.description,
                    category: c.category
                });
            }
        });
    });

    return related;
}

async function getCodeDetails(code) {
    const localCodes = await loadLocalCodes();
    
    // Search in ICD-10 codes
    const icd10Code = Object.values(localCodes.icd10)
        .flatMap(category => Object.values(category))
        .find(c => c.icd10 === code || c.code === code);
    
    if (icd10Code) {
        return {
            ...icd10Code,
            type: 'ICD-10',
            related: await getRelatedCodes(code, 'icd10')
        };
    }

    // Search in CPT codes
    const cptCode = Object.values(localCodes.cpt)
        .flatMap(category => Object.values(category))
        .find(c => c.code === code);
    
    if (cptCode) {
        return {
            ...cptCode,
            type: 'CPT',
            related: await getRelatedCodes(code, 'cpt')
        };
    }

    return null;
}

module.exports = {
    searchCodes,
    getCodeDetails,
    getRelatedCodes
};
