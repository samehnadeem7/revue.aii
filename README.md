# Revue.AI

A decision intelligence platform that transforms customer feedback into actionable business insights using AI-powered analysis.

## Overview

Revue.AI processes customer feedback from multiple sources (text, CSV, PDF) and generates strategic recommendations through advanced sentiment analysis and AI reasoning. The platform helps business leaders make data-driven decisions based on customer sentiment patterns.

## Features

- Multi-format feedback ingestion (text, CSV, PDF)
- AI-powered sentiment analysis
- Decision intelligence engine with reasoning and risk assessment
- Real-time chatbot assistant
- Interactive dashboard with sentiment visualization
- Executive-ready report generation

## Tech Stack

- React 18 with TypeScript
- Vite build tool
- TailwindCSS for styling
- React Router for navigation
- n8n for workflow orchestration
- PDF.js for document processing

## Setup

### Prerequisites

- Node.js 18 or higher
- npm or yarn

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```
REACT_APP_N8N_CHATBOT_URL=your_chatbot_webhook_url
REACT_APP_N8N_REVUE_URL=your_revue_webhook_url
```

See `.env.example` for required variables.

### Development

```bash
npm run dev
```

Open http://localhost:5173 in your browser.

### Build

```bash
npm run build
```

The production build will be in the `dist` folder.

## Usage

1. Navigate to the landing page
2. Click "Get started" to access the input interface
3. Choose your feedback source:
   - Paste text directly
   - Upload CSV file
   - Upload PDF document
4. Optionally ask a decision question
5. Click "Get Decision" to run AI analysis
6. Review the generated insights, personas, and recommendations

## Demo Data

Use the "Demo Trial" dropdown to load sample Unacademy feedback data for testing.

## Deployment

The project includes a GitHub Actions workflow for automatic deployment to GitHub Pages. Push to the `main` branch to trigger deployment.

## License

Private project for hackathon submission.
