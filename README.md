# Sajdah - Islamic App

A comprehensive Islamic web application designed to assist Muslims in their daily religious practices. Built with React, Vite, and Tailwind CSS.

## Features

- 🕌 **Prayer Times**: Accurate prayer times based on your location with monthly calendar view
- 📿 **Tasbeeh Counter**: Digital tasbeeh with customizable dhikr and automatic round saving
- 🧭 **Qibla Finder**: Find the direction to Kaaba using device compass and geolocation
- 📱 **Responsive Design**: Beautiful, modern UI that works on all devices
- 🌙 **Dark Mode**: Full dark mode support

## Tech Stack

- **React 19** - UI library
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Aladhan API** - Prayer times API
- **OpenStreetMap Nominatim** - Geocoding API

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/YOUR_USERNAME/Sajdah.git
cd Sajdah
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint
- `npm run deploy` - Deploy to GitHub Pages

## Deployment

This project is configured for GitHub Pages deployment. See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

### Quick Deploy

1. Update `package.json` with your GitHub username:
```json
"homepage": "https://YOUR_USERNAME.github.io/Sajdah"
```

2. Deploy:
```bash
npm run deploy
```

3. Configure GitHub Pages in repository settings to use the `gh-pages` branch.

## Project Structure

```
Sajdah/
├── src/
│   ├── Components/      # Reusable React components
│   │   ├── Prayer/      # Prayer-related components
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   └── ...
│   ├── Pages/           # Page components
│   │   ├── Home.jsx
│   │   ├── Prayer.jsx
│   │   ├── TasbeehCounter.jsx
│   │   └── QiblaFinder.jsx
│   ├── assets/          # Static assets
│   ├── App.jsx          # Main app component
│   └── main.jsx         # Entry point
├── public/              # Public assets
├── index.html           # HTML template
├── vite.config.js       # Vite configuration
└── package.json         # Dependencies and scripts
```

## Features in Detail

### Prayer Times
- Automatic geolocation detection
- Manual location selection (country/city)
- Monthly prayer calendar
- Real-time countdown to next prayer
- Multiple calculation methods

### Tasbeeh Counter
- Preset dhikr options (Subhanallah, Alhamdulillah, etc.)
- Custom dhikr text support
- Customizable target counts (33, 100, 300, or custom)
- Automatic round saving when target is reached
- History tracking with date/time stamps
- Local storage persistence

### Qibla Finder
- Device compass integration
- Real-time direction indicator
- Distance calculation to Mecca
- Visual compass with cardinal directions
- Works with or without compass permissions

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## Acknowledgments

- [Aladhan API](https://aladhan.com/) for prayer times
- [OpenStreetMap Nominatim](https://nominatim.org/) for geocoding
- React Router team for excellent routing solution
- Tailwind CSS team for the utility-first framework

## Support

For issues and questions, please open an issue on GitHub.

---

Made with ❤️ for the Muslim community
