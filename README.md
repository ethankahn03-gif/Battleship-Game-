# 🚢 Battleship Game

A modern, interactive Battleship game where you can play against an AI opponent. Built with vanilla JavaScript, HTML, and CSS.

## Features

- **Interactive Ship Placement**: Click to place ships manually or use random placement
- **Smart AI Opponent**: Play against an AI that makes strategic attacks
- **Modern UI**: Beautiful gradient design with smooth animations
- **Visual Feedback**: Clear indicators for hits, misses, and sunk ships
- **Responsive Design**: Works on desktop and mobile devices
- **Game Statistics**: Track remaining ships for both players

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
   - 💥 = Hit, 💧 = Miss
   - Sink all enemy ships to win!

4. **Win Condition**:
   - First player to sink all opponent ships wins
   - Click "New Game" to play again

## Running the Game

Simply open `index.html` in your web browser. No server or build process required!

```bash
# Option 1: Open directly
open index.html

# Option 2: Use a local server (recommended)
python3 -m http.server 8000
# Then visit http://localhost:8000
```

## Game Rules

- Each player has 5 ships of varying sizes
- Ships cannot overlap or be placed diagonally
- Players take turns attacking grid coordinates
- First to sink all enemy ships wins
- The AI makes random attacks but never targets the same cell twice

## Technologies Used

- HTML5
- CSS3 (with Flexbox and Grid)
- Vanilla JavaScript (ES6+)
- No external dependencies

## Browser Compatibility

Works on all modern browsers:
- Chrome/Edge (recommended)
- Firefox
- Safari
- Opera

Enjoy the game! ⚓
