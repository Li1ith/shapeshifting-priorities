# AotB Cards

A React web application for viewing and printing character and story cards for the AotB game.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js (v16 or higher)
- npm (v8 or higher)

### Installing

1. Clone the repository
2. Navigate to the project directory
3. Install dependencies

```bash
cd aotb-cards
npm install
```

### Running the Application

To start the development server:

```bash
npm start
```

This will run the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Development Scripts

The project includes several scripts to help with development:

```bash
# Start the development server
npm start

# Build the app for production
npm run build

# Run tests
npm test

# Lint the code
npm run lint

# Fix linting issues automatically
npm run lint:fix

# Format code with Prettier
npm run format
```

## Features

- Landing page with navigation to character cards and story cards
- Character cards page displaying character information
- Story cards page displaying story information with front and back sides

## Built With

- [React](https://reactjs.org/) - The web framework used
- [React Router](https://reactrouter.com/) - For navigation between pages
- [Web Vitals](https://web.dev/vitals/) - For performance monitoring
- [ESLint](https://eslint.org/) - For code linting
- [Prettier](https://prettier.io/) - For code formatting

## Project Structure

```
aotb-cards/
├── public/                  # Public assets
│   ├── index.html          # HTML template
│   └── border.jpeg         # Border image for story cards
├── src/                     # Source files
│   ├── components/         # React components
│   │   ├── LandingPage.js  # Landing page component
│   │   ├── CharacterCards.js # Character cards component
│   │   └── StoryCards.js   # Story cards component
│   ├── data/               # Data files
│   │   ├── characters.json # Character data
│   │   └── stories.json    # Story data
│   ├── styles/             # CSS files
│   │   ├── CharacterCards.css # Styles for character cards
│   │   └── StoryCards.css  # Styles for story cards
│   ├── App.js              # Main App component
│   ├── App.css             # Styles for App component
│   ├── index.js            # Entry point
│   ├── index.css           # Global styles
│   └── reportWebVitals.js  # Performance monitoring
├── .eslintrc.js            # ESLint configuration
├── .prettierrc             # Prettier configuration
├── .gitignore              # Git ignore file
└── package.json            # Dependencies and scripts
```

## Usage

1. Open the application in your browser
2. Click on "Character Cards" or "Story Cards" to view the respective cards
3. Use the "Back to Home" link to return to the landing page
