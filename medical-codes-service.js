class MedicalCodesService {
    constructor() {
        this.localCodes = this.loadLocalCodes();
        this.api = new MedicalCodesAPI();
    }

    loadLocalCodes() {
        try {
            const response = fetch('medical-codes-db.json');
            return response.json();
        } catch (error) {
            console.error('Error loading local medical codes:', error);
            return {
                icd10: {},
                cpt: {},
                common_conditions: {}
            };
        }
    }

    async searchCodes(term) {
        // First check local database
        const localResults = this.searchLocalCodes(term);
        
        // If no local results, try API
        if (!localResults.icd10.length && !localResults.cpt.length) {
            try {
                const apiResults = await this.api.getMedicalCodes(term);
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

    searchLocalCodes(term) {
        const results = {
            icd10: [],
            cpt: []
        };

        // Search ICD-10 codes
        Object.values(this.localCodes.icd10).forEach(category => {
            Object.values(category).forEach(code => {
                if (this.matchesSearchTerm(code, term)) {
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
        Object.values(this.localCodes.cpt).forEach(category => {
            Object.values(category).forEach(code => {
                if (this.matchesSearchTerm(code, term)) {
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

    matchesSearchTerm(code, term) {
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

    getRelatedCodes(code) {
        const related = [];
        
        // Get related ICD-10 codes
        Object.values(this.localCodes.icd10).forEach(category => {
            Object.values(category).forEach(c => {
                if (c.related_conditions?.includes(code)) {
                    related.push({
                        code: c.icd10 || Object.keys(category).find(key => category[key] === c),
                        description: c.description,
                        category: c.category
                    });
                }
            });
        });

        // Get related CPT codes
        Object.values(this.localCodes.cpt).forEach(category => {
            Object.values(category).forEach(c => {
                if (c.related_procedures?.includes(code)) {
                    related.push({
                        code: c.code,
                        description: c.description,
                        category: c.category
                    });
                }
            });
        });

        return related;
    }
}

export default MedicalCodesService;
