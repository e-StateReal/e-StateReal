# e-State Real Store - Recommendation Bot

A modern hybrid application that combines real estate affiliate link management with an intelligent medical recommendation system featuring medical coding support.

## 🏠 Real Estate Frontend

The frontend serves as a professional real estate affiliate link management platform for "e-State Real Store", allowing users to discover and access curated real estate resources, properties, and services.

### Features

- **Professional Profile**: Clean, modern interface showcasing e-State Real Store
- **Social Media Integration**: Direct links to Instagram, Facebook, LinkedIn, Twitter, and TikTok
- **Dynamic Link Management**: Admin panel for managing affiliate links and product recommendations
- **Category Organization**: Links organized by categories including:

  - Health & Fitness
  - Beauty
  - Diets & Weight Loss
  - Women's Health
  - E-Business & Marketing
  - Home & Garden
  - Self-Help
  - Pets & Animals
  - Betting Systems
  - Online Dating
  - Music
  - Photography & Video
  - Social Media
  - Education
  - Properties
  - Investments
  - Services

## 🏥 Medical Recommendation Backend

A sophisticated recommendation system that processes medical content and provides intelligent suggestions with medical coding support.

### Core Features

#### 1. Multi-Input Processing

- **Claims Analysis**: Process and analyze insurance claims
- **Assessment Processing**: Handle structured assessment responses
- **Speech Analysis**: Process speech-to-text medical content
- **Medical Content**: Extract and analyze medical terminology

#### 2. Medical Coding Support

- **ICD-10 Codes**: Automatic detection and suggestion of diagnosis codes
- **CPT Codes**: Procedure code recommendations
- **Related Conditions**: Suggest related medical conditions and procedures
- **Medical Database**: Comprehensive database of common medical conditions

#### 3. Sentiment Analysis

- **Text Sentiment**: Analyze emotional tone of medical content
- **Recommendation Generation**: Provide sentiment-based recommendations
- **Keyword Extraction**: Identify important medical terms and themes

### Supported Medical Categories

- **Cardiovascular**: Hypertension, Angina, Heart conditions
- **Endocrine**: Type 1/2 Diabetes, Metabolic disorders
- **Respiratory**: Asthma, COPD, Respiratory infections
- **Mental Health**: Depression, Anxiety disorders
- **Common Conditions**: Back pain, Headaches, Cold/Flu

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd e-statereal-sabino
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:

   ```env
   PORT=5000
   NODE_ENV=development
   ```

4. **Start the application**

   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

5. **Access the application**

   - Frontend: `http://localhost:5000`
   - API Endpoints: `http://localhost:5000/api`

## 📡 API Endpoints

### Medical Recommendations

```curl
POST /api/recommendations
```

**Request Body:**

```json
{
  "claim": "Patient presents with chest pain and shortness of breath",
  "assessment": ["Severe chest pain", "Difficulty breathing"],
  "speech": "Patient describes sharp chest pain lasting 2 hours",
  "medicalContent": "Hypertension and diabetes noted in history"
}
```

### Medical Codes Search

```curl
GET /api/medical-codes/search?term=hypertension
GET /api/medical-codes/I10
```

## 🛠️ Development

### Available Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm test` - Run test suite
- `npm run build` - Build for production
- `npm run lint` - Run ESLint

### Project Structure

```plaintext
e-statereal-sabino/
├── src/
│   ├── controllers/          # API route controllers
│   │   ├── medicalCodesController.js
│   │   └── recommendationController.js
│   ├── services/             # Business logic services
│   │   ├── medicalCodesService.js
│   │   ├── recommendationService.js
│   │   └── transcriptionProcessor.js
│   ├── data/                 # JSON data files
│   │   ├── medical-codes-db.json
│   │   └── care-plan-templates.json
│   └── server.js             # Express server setup
├── index.html               # Main frontend page
├── styles.css               # Frontend styles
├── script.js                # Frontend JavaScript
└── package.json             # Dependencies and scripts
```

## 🔧 Technologies Used

### Backend

- **Express.js** - Web framework
- **Natural** - Natural language processing
- **Sentiment** - Sentiment analysis
- **TensorFlow.js** - Machine learning capabilities
- **Helmet** - Security middleware
- **Morgan** - HTTP request logging
- **Compression** - Response compression

### Frontend

- **Vanilla JavaScript** - No framework dependencies
- **CSS3** - Modern styling with animations
- **Font Awesome** - Icon library
- **Google Fonts** - Typography

### Development Tools

- **Nodemon** - Development server
- **ESLint** - Code linting
- **Jest** - Testing framework
- **Webpack** - Module bundling

## 📊 Medical Coding Database

The system includes a comprehensive medical coding database with:

- **ICD-10 Codes**: Diagnosis codes for various medical conditions
- **CPT Codes**: Procedure codes for medical services
- **Related Conditions**: Cross-referenced related medical conditions
- **Keywords**: Searchable medical terminology
- **Categories**: Organized by medical specialties

## 🔒 Security Features

- **Helmet.js** - Security headers
- **Input Validation** - Express-validator for API inputs
- **CORS Protection** - Cross-origin resource sharing
- **Error Handling** - Comprehensive error management
- **Environment Variables** - Secure configuration management

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For support and questions:

- **Instagram**: [@e_state_real](https://instagram.com/e_state_real)
- **Facebook**: [E-StateReal](https://facebook.com/E-StateReal)
- **LinkedIn**: [e-StateReal](https://linkedin.com/in/e-StateReal)
- **Twitter**: [@e_state_real](https://x.com/e_state_real)
- **TikTok**: [@estate.real](https://www.tiktok.com/@estate.real)

---

**Note**: This application combines real estate affiliate management with medical recommendation capabilities. The medical features are for educational and support purposes only and should not replace professional medical advice.
