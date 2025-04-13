# Pokémon Emerald Music Player

A web-based music player featuring tracks from Pokémon Emerald, organized by route and city locations. Includes intro and loop segments for authentic game music experience.

## Features

- Music tracks from routes and cities in Pokémon Emerald
- Track categorization (routes vs cities)
- Expandable/collapsible sections
- Search functionality
- Seamless intro-to-loop playback
- Mobile-friendly responsive design

## Technology Stack

- React
- TypeScript
- Vite
- Web Audio API
- CSS-in-JS styling

## Development Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/YOUR_USERNAME/pokemon_music_player.git
   cd pokemon_music_player
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to http://localhost:8000

## Building for Production

```bash
npm run build
```

This will create a `dist` directory with the built application.

## GitHub Pages Deployment

This project is set up to automatically deploy to GitHub Pages. After pushing to the main branch, the GitHub Actions workflow will:

1. Build the project
2. Deploy it to the `gh-pages` branch
3. Make it available at https://YOUR_USERNAME.github.io/pokemon_music_player/

### Manual Deployment

If you prefer to deploy manually:

1. Build the project:
   ```bash
   npm run build
   ```

2. Push the `dist` folder to the `gh-pages` branch:
   ```bash
   git subtree push --prefix dist origin gh-pages
   ```

## S3 Audio Files

The audio files are stored in an Amazon S3 bucket. To ensure proper playback:

1. Make sure your S3 bucket has CORS configured to allow access from your domain
2. Audio paths in the app refer to S3 locations
3. For local development when testing with S3 files, your browser might need to allow CORS requests

## License

This project is for educational and nostalgic purposes only. All Pokémon music and content belongs to their respective owners (Nintendo, Game Freak, and The Pokémon Company). 