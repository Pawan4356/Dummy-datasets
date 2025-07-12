# SafeSpace Frontend

A modern, responsive React.js application for monitoring and displaying real-time safety threats across India. Built with TypeScript, Tailwind CSS, and Leaflet for an intuitive user experience.

## Features

🛡️ **Real-time Threat Monitoring**: Interactive dashboard showing safety threats by location
🗺️ **Interactive Heat Map**: Visual representation of threat intensity across Indian cities
📱 **Responsive Design**: Optimized for desktop, tablet, and mobile devices
🎨 **Modern UI**: Clean interface with glassmorphism effects and smooth animations
🔐 **User Authentication**: Login/signup system with modal popups
🌙 **Dark Mode**: Toggle between light and dark themes
🔍 **City Search**: Search for threats in specific cities
🚨 **Safety Advice**: AI-generated safety recommendations for each threat

## Tech Stack

- **Frontend**: React.js 18 with TypeScript
- **Styling**: Tailwind CSS
- **Maps**: Leaflet.js with React-Leaflet
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Location Services**: IPInfo API
- **Build Tool**: Create React App

## Project Structure

```
safespace-frontend/
├── public/
├── src/
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── HeatMap.tsx
│   │   ├── ThreatCard.tsx
│   │   ├── LoginModal.tsx
│   │   └── AdviceModal.tsx
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── Login.tsx
│   │   └── Signup.tsx
│   ├── App.tsx
│   ├── index.tsx
│   └── index.css
├── package.json
├── tailwind.config.js
└── README.md
```

## Installation

1. **Navigate to the frontend directory**:
   ```bash
   cd safespace-frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm start
   ```

4. **Open your browser** and navigate to `http://localhost:3000`

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm run eject` - Ejects from Create React App (one-way operation)

## API Integration

The frontend is designed to integrate with a Flask backend API. Update the API endpoints in the following files:

- `src/pages/Home.tsx` - For threat data fetching
- `src/components/AdviceModal.tsx` - For AI-generated safety advice

Replace the mock API calls with actual backend endpoints:

```typescript
// Example API call
const response = await axios.get(`/api/threats?location=${city}`);
```

## Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
REACT_APP_API_BASE_URL=http://localhost:5000
REACT_APP_MAPBOX_TOKEN=your_mapbox_token_here
```

### Tailwind Configuration

The project uses a custom Tailwind configuration in `tailwind.config.js` that includes:
- Custom content paths for TypeScript files
- Extended theme configurations
- Custom utility classes

## Components Overview

### Navbar
- Responsive navigation with SafeSpace branding
- User authentication state management
- Location display using IPInfo API
- Mobile-friendly hamburger menu

### HeatMap
- Interactive Leaflet map of India
- Threat intensity visualization using color-coded markers
- User location pin
- Threat level legend
- Responsive zoom and pan controls

### ThreatCard
- Modern card design for threat information
- Threat level indicators with color coding
- Category icons and timestamps
- Click-to-view safety advice

### LoginModal
- Glassmorphism-styled modal popup
- Form validation and loading states
- Error handling and user feedback
- Switch between login and signup

### AdviceModal
- AI-generated safety recommendations
- Glassmorphism background effects
- Emergency contact information
- Responsive design for mobile devices

## Customization

### Adding New Threat Categories

Update the category mappings in:
- `src/components/ThreatCard.tsx`
- `src/components/AdviceModal.tsx`

### Modifying the Color Scheme

Update the threat level colors in:
- `src/components/HeatMap.tsx`
- `src/components/ThreatCard.tsx`

### Adding New Cities

Update the heat map data in:
- `src/pages/Home.tsx` (fetchHeatMapData function)

## Best Practices

1. **State Management**: Uses React hooks for local state management
2. **TypeScript**: Strongly typed interfaces for better code quality
3. **Component Structure**: Modular components with clear separation of concerns
4. **Responsive Design**: Mobile-first approach with Tailwind's responsive utilities
5. **Performance**: Optimized rendering with proper key props and memoization
6. **Accessibility**: Semantic HTML and proper ARIA attributes

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is part of the SafeSpace application suite.

## Support

For support and questions, please contact the development team.

---

Built with ❤️ for safer communities in India.
