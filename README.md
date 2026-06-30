# 🚢 Battleship Game

A modern, interactive Battleship game where you can play against an AI opponent. Built with vanilla JavaScript, HTML, and CSS.

## Features

- **Interactive Ship Placement**: Click to place ships manually or use random placement
- **Smart AI Opponent**: Play against an AI with hunt/target strategy for challenging gameplay
- **Modern UI**: Beautiful gradient design with smooth animations
- **Visual Feedback**: Clear indicators for hits, misses, and sunk ships
- **Responsive Design**: Works on desktop and mobile devices
- **Game Statistics**: Track remaining ships for both players
- **Comprehensive Testing**: Unit tests for all major game components

## How to Play

1. **Place Your Ships**:
   - Click on your board to place ships
   - Press 'R' to rotate between horizontal and vertical orientation
   - Or click "Random Placement" for automatic ship placement
   - Ships: Carrier (5), Battleship (4), Cruiser (3), Submarine (3), Destroyer (2)

2. **Start the Battle**:
   - Click "Start Game" once all ships are placed
   - The AI will automatically place its ships

3. **Take Turns**:
   - Click on the enemy board to attack
   - 💥 = Hit, ❌ = Miss
   - Sink all enemy ships to win!

4. **Win Condition**:
   - First player to sink all opponent ships wins
   - Click "New Game" to play again

## Architecture

### Project Structure
```
battleship-game/
├── index.html          # Main game HTML structure
├── styles.css          # CSS styling with responsive design
├── game.js             # Core game logic and AI implementation
├── test.html           # Unit tests for game logic
├── BUG_REPORT.md       # Detailed bug documentation
├── README.md           # This file
└── .gitignore          # Git ignore rules
```

### Game Architecture

The game is built using a class-based architecture:

- **BattleshipGame Class**: Main game controller
  - Manages game state (boards, ships, turns)
  - Handles user interactions
  - Implements AI opponent
  - Renders game state to DOM

- **AI Implementation**:
  - **Hunt Mode**: Randomly searches for ships while tracking misses
  - **Target Mode**: Intelligently attacks adjacent cells after a hit
  - Switches between modes based on game state
  - Never attacks the same cell twice

- **Ship Placement**:
  - Manual placement with visual preview
  - Random placement algorithm
  - Validation for bounds and overlaps

## Running the Game

### Local Development

Simply open `index.html` in your web browser. No server or build process required!

```bash
# Option 1: Open directly
open index.html

# Option 2: Use a local server (recommended)
python3 -m http.server 8000
# Then visit http://localhost:8000
```

### Running Tests

Open `test.html` in your browser to run the unit test suite:

```bash
# Start a local server
python3 -m http.server 8001
# Then visit http://localhost:8001/test.html
```

The test suite covers:
- Board creation and structure
- Ship placement validation
- Hit detection
- Ship sinking logic
- Random placement
- Game reset functionality
- AI hunt mode
- AI target mode
- Win conditions
- Duplicate attack prevention

## Game Rules

- Each player has 5 ships of varying sizes
- Ships cannot overlap or be placed diagonally
- Players take turns attacking grid coordinates
- First to sink all enemy ships wins
- The AI uses hunt/target strategy for intelligent attacks

## Technologies Used

- **HTML5**: Semantic markup and structure
- **CSS3**: Flexbox, Grid, and responsive design
- **Vanilla JavaScript (ES6+)**: No external dependencies
- **No build tools required**: Pure client-side implementation

## Deployment

### GitHub Pages (Recommended)

1. Push the repository to GitHub
2. Go to repository Settings → Pages
3. Select source as "Deploy from a branch"
4. Choose main branch and save
5. Your game will be available at `https://username.github.io/battleship-game`

### Vercel

```bash
npm install -g vercel
vercel
```

### Netlify

```bash
npm install -g netlify-cli
netlify deploy --prod
```

Or simply drag and drop the project folder to Netlify's dashboard.

## Testing

### Unit Tests

The project includes comprehensive unit tests in `test.html`. To run them:

1. Start a local server: `python3 -m http.server 8001`
2. Open `http://localhost:8001/test.html` in your browser
3. All tests run automatically and display results

### Manual Testing Checklist

- [ ] Ship placement (manual and random)
- [ ] Ship rotation (R key and button)
- [ ] Game start functionality
- [ ] Player attacks on enemy board
- [ ] AI attacks on player board
- [ ] Hit/miss visual feedback
- [ ] Ship sinking notification
- [ ] Win/lose conditions
- [ ] Game reset functionality
- [ ] Responsive design on different screen sizes
- [ ] AI mode switching (hunt/target)

## Bug Documentation

See `BUG_REPORT.md` for detailed information about bugs discovered, fixed, and tested during development.

## Browser Compatibility

Works on all modern browsers:
- Chrome/Edge (recommended)
- Firefox
- Safari
- Opera

## Future Improvements

- Add AI difficulty levels (easy/medium/hard)
- Add sound effects for attacks and ship sinking
- Add statistics tracking (wins/losses, average turns)
- Add ship placement validation (minimum distance between ships)
- Add smooth animations for attacks
- Implement local multiplayer
- Add undo functionality during ship placement

## Development History

This project was developed with a focus on:
- Clean, maintainable code
- Comprehensive testing
- Detailed bug tracking and documentation
- Structured Git commits
- Public deployment for accessibility

See the Git commit history for detailed development progress.

Enjoy the game! ⚓
