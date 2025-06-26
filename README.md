# Medical Recommendation Bot

A modern recommendation system that processes medical data and generates personalized recommendations with ICD-10 and CPT code support.

## Features

- Medical data processing
- ICD-10 and CPT code recommendations
- Sentiment analysis
- Keyword extraction
- Related code suggestions
- Modern API architecture

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a .env file with your API keys:
```
PORT=5000
NODE_ENV=development
ICD10_API_KEY=your_icd10_api_key
CPT_API_KEY=your_cpt_api_key
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at http://localhost:5000

## API Endpoints

### Recommendations
- POST /api/recommendations
  - Body:
    ```json
    {
      "claim": "string",
      "assessment": ["array of answers"],
      "speech": "string",
      "medicalContent": "string"
    }
    ```

### Medical Codes
- GET /api/medical-codes/search?term=condition
- GET /api/medical-codes/:code
```

## Technology Stack

- Backend: Python with Flask
- NLP: spaCy, Transformers
- Recommendation Engine: Custom implementation with sentiment analysis
