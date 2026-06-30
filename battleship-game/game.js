class BattleshipGame {
    constructor() {
        this.boardSize = 10;
        this.ships = [
            { name: 'carrier', size: 5, icon: '🚢' },
            { name: 'battleship', size: 4, icon: '⛴️' },
            { name: 'cruiser', size: 3, icon: '🛳️' },
            { name: 'submarine', size: 3, icon: '🚤' },
            { name: 'destroyer', size: 2, icon: '⛵' }
        ];
        
        this.playerBoard = this.createBoard();
        this.enemyBoard = this.createBoard();
        this.playerShips = [];
        this.enemyShips = [];
        
        this.currentShipIndex = 0;
        this.isHorizontal = true;
        this.gameStarted = false;
        this.playerTurn = true;
        
        this.playerHits = 0;
        this.enemyHits = 0;
        this.totalShipCells = this.ships.reduce((sum, ship) => sum + ship.size, 0);
        
        this.init();
    }
    
    createBoard() {
        return Array(this.boardSize).fill(null).map(() => 
            Array(this.boardSize).fill(null)
        );
    }
    
    init() {
        this.renderBoard('player-board', this.playerBoard, true);
        this.renderBoard('enemy-board', this.enemyBoard, false);
        this.attachEventListeners();
        this.updateShipsList();
    }
    
    renderBoard(boardId, board, isPlayerBoard) {
        const boardElement = document.getElementById(boardId);
        boardElement.innerHTML = '';
        
        for (let row = 0; row < this.boardSize; row++) {
            for (let col = 0; col < this.boardSize; col++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                cell.dataset.row = row;
                cell.dataset.col = col;
                cell.dataset.board = isPlayerBoard ? 'player' : 'enemy';
                
                const cellValue = board[row][col];
                if (cellValue === 'miss') {
                    cell.classList.add('miss');
                } else if (cellValue) {
                    if (cellValue.hit) {
                        cell.classList.add('hit');
                        if (cellValue.sunk) {
                            cell.classList.add('sunk');
                        }
                    } else if (isPlayerBoard && cellValue.ship) {
                        cell.classList.add('ship');
                    }
                }
                
                boardElement.appendChild(cell);
            }
        }
    }
    
    attachEventListeners() {
        const playerBoardElement = document.getElementById('player-board');
        const enemyBoardElement = document.getElementById('enemy-board');
        
        playerBoardElement.addEventListener('mouseover', (e) => this.handleCellHover(e));
        playerBoardElement.addEventListener('mouseout', (e) => this.handleCellOut(e));
        playerBoardElement.addEventListener('click', (e) => this.handleCellClick(e));
        
        enemyBoardElement.addEventListener('click', (e) => this.handleEnemyBoardClick(e));
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'r' || e.key === 'R') {
                this.toggleOrientation();
            }
        });
        
        document.getElementById('rotate-ship').addEventListener('click', () => this.toggleOrientation());
        document.getElementById('start-game').addEventListener('click', () => this.startGame());
        document.getElementById('reset-game').addEventListener('click', () => this.resetGame());
        document.getElementById('random-placement').addEventListener('click', () => this.randomPlacement());
    }
    
    handleCellHover(e) {
        if (this.gameStarted || this.currentShipIndex >= this.ships.length) return;
        
        const cell = e.target;
        if (!cell.classList.contains('cell')) return;
        
        const row = parseInt(cell.dataset.row);
        const col = parseInt(cell.dataset.col);
        const ship = this.ships[this.currentShipIndex];
        
        const cells = this.getShipCells(row, col, ship.size, this.isHorizontal);
        const isValid = this.canPlaceShip(row, col, ship.size, this.isHorizontal, this.playerBoard);
        
        cells.forEach(([r, c]) => {
            const cellElement = document.querySelector(
                `#player-board .cell[data-row="${r}"][data-col="${c}"]`
            );
            if (cellElement) {
                cellElement.classList.add(isValid ? 'preview' : 'invalid-preview');
            }
        });
    }
    
    handleCellOut(e) {
        const cells = document.querySelectorAll('#player-board .cell');
        cells.forEach(cell => {
            cell.classList.remove('preview', 'invalid-preview');
        });
    }
    
    handleCellClick(e) {
        if (this.gameStarted || this.currentShipIndex >= this.ships.length) return;
        
        const cell = e.target;
        if (!cell.classList.contains('cell')) return;
        
        const row = parseInt(cell.dataset.row);
        const col = parseInt(cell.dataset.col);
        const ship = this.ships[this.currentShipIndex];
        
        if (this.placeShip(row, col, ship, this.isHorizontal, this.playerBoard, this.playerShips)) {
            this.currentShipIndex++;
            this.updateShipsList();
            this.renderBoard('player-board', this.playerBoard, true);
            
            if (this.currentShipIndex >= this.ships.length) {
                document.getElementById('start-game').disabled = false;
                this.updateGameMessage('All ships placed! Click "Start Game" to begin.');
            } else {
                this.updateGameMessage(`Place your ${this.ships[this.currentShipIndex].name}`);
            }
        }
    }
    
    handleEnemyBoardClick(e) {
        if (!this.gameStarted || !this.playerTurn) return;
        
        const cell = e.target;
        if (!cell.classList.contains('cell')) return;
        
        const row = parseInt(cell.dataset.row);
        const col = parseInt(cell.dataset.col);
        
        const targetCell = this.enemyBoard[row][col];
        
        // Prevent attacking the same cell twice
        if (targetCell && (targetCell.hit || targetCell === 'miss')) return;
        
        this.playerAttack(row, col);
    }
    
    getShipCells(row, col, size, isHorizontal) {
        const cells = [];
        for (let i = 0; i < size; i++) {
            const r = isHorizontal ? row : row + i;
            const c = isHorizontal ? col + i : col;
            cells.push([r, c]);
        }
        return cells;
    }
    
    canPlaceShip(row, col, size, isHorizontal, board) {
        const cells = this.getShipCells(row, col, size, isHorizontal);
        
        for (const [r, c] of cells) {
            if (r < 0 || r >= this.boardSize || c < 0 || c >= this.boardSize) {
                return false;
            }
            if (board[r][c]) {
                return false;
            }
        }
        
        return true;
    }
    
    placeShip(row, col, ship, isHorizontal, board, shipsList) {
        if (!this.canPlaceShip(row, col, ship.size, isHorizontal, board)) {
            return false;
        }
        
        const cells = this.getShipCells(row, col, ship.size, isHorizontal);
        const shipData = {
            name: ship.name,
            cells: cells,
            hits: 0,
            sunk: false
        };
        
        cells.forEach(([r, c]) => {
            board[r][c] = { ship: shipData, hit: false, sunk: false };
        });
        
        shipsList.push(shipData);
        return true;
    }
    
    randomPlacement() {
        this.playerBoard = this.createBoard();
        this.playerShips = [];
        this.currentShipIndex = 0;
        
        for (const ship of this.ships) {
            let placed = false;
            let attempts = 0;
            
            while (!placed && attempts < 100) {
                const row = Math.floor(Math.random() * this.boardSize);
                const col = Math.floor(Math.random() * this.boardSize);
                const isHorizontal = Math.random() < 0.5;
                
                placed = this.placeShip(row, col, ship, isHorizontal, this.playerBoard, this.playerShips);
                attempts++;
            }
        }
        
        this.currentShipIndex = this.ships.length;
        this.renderBoard('player-board', this.playerBoard, true);
        this.updateShipsList();
        document.getElementById('start-game').disabled = false;
        this.updateGameMessage('Ships randomly placed! Click "Start Game" to begin.');
    }
    
    startGame() {
        this.placeEnemyShips();
        this.gameStarted = true;
        document.getElementById('ship-placement').style.display = 'none';
        document.getElementById('start-game').disabled = true;
        this.updateGameStatus('Battle in Progress!');
        this.updateGameMessage('Your turn! Click on enemy waters to attack.');
    }
    
    placeEnemyShips() {
        for (const ship of this.ships) {
            let placed = false;
            let attempts = 0;
            
            while (!placed && attempts < 100) {
                const row = Math.floor(Math.random() * this.boardSize);
                const col = Math.floor(Math.random() * this.boardSize);
                const isHorizontal = Math.random() < 0.5;
                
                placed = this.placeShip(row, col, ship, isHorizontal, this.enemyBoard, this.enemyShips);
                attempts++;
            }
        }
    }
    
    playerAttack(row, col) {
        const cell = this.enemyBoard[row][col];
        
        if (cell && cell.ship) {
            cell.hit = true;
            cell.ship.hits++;
            this.playerHits++;
            
            if (cell.ship.hits === cell.ship.cells.length) {
                cell.ship.sunk = true;
                cell.ship.cells.forEach(([r, c]) => {
                    this.enemyBoard[r][c].sunk = true;
                });
                this.updateGameMessage(`You sunk the enemy's ${cell.ship.name}!`);
                this.updateShipCount('enemy');
            } else {
                this.updateGameMessage('Hit! Take another shot!');
            }
            
            this.renderBoard('enemy-board', this.enemyBoard, false);
            
            if (this.playerHits === this.totalShipCells) {
                this.endGame(true);
                return;
            }
            
        } else {
            this.enemyBoard[row][col] = 'miss';
            this.updateGameMessage('Miss! Enemy\'s turn...');
            this.renderBoard('enemy-board', this.enemyBoard, false);
            this.playerTurn = false;
            
            setTimeout(() => this.enemyAttack(), 1000);
        }
    }
    
    enemyAttack() {
        this.aiTargetingMode = this.aiTargetingMode || 'hunt';
        this.aiHits = this.aiHits || [];
        this.aiMisses = this.aiMisses || new Set();
        
        let row, col;
        
        if (this.aiTargetingMode === 'hunt') {
            // Hunt mode: random targeting with intelligence
            const result = this.huntTarget();
            row = result.row;
            col = result.col;
        } else {
            // Target mode: attack around known hits
            const result = this.targetAttack();
            row = result.row;
            col = result.col;
        }
        
        const cell = this.playerBoard[row][col];
        
        if (cell && cell.ship) {
            cell.hit = true;
            cell.ship.hits++;
            this.enemyHits++;
            this.aiHits.push({ row, col, ship: cell.ship });
            
            if (cell.ship.hits === cell.ship.cells.length) {
                cell.ship.sunk = true;
                cell.ship.cells.forEach(([r, c]) => {
                    this.playerBoard[r][c].sunk = true;
                });
                this.updateGameMessage(`Enemy sunk your ${cell.ship.name}!`);
                this.updateShipCount('player');
                // Clear hits for this ship when sunk
                this.aiHits = this.aiHits.filter(h => h.ship !== cell.ship);
                if (this.aiHits.length === 0) {
                    this.aiTargetingMode = 'hunt';
                }
            } else {
                this.updateGameMessage('Enemy hit your ship! Your turn.');
                this.aiTargetingMode = 'target';
            }
            
            this.renderBoard('player-board', this.playerBoard, true);
            
            if (this.enemyHits === this.totalShipCells) {
                this.endGame(false);
                return;
            }
            
        } else {
            this.playerBoard[row][col] = 'miss';
            this.aiMisses.add(`${row},${col}`);
            this.updateGameMessage('Enemy missed! Your turn.');
            this.renderBoard('player-board', this.playerBoard, true);
            
            // Check if we should switch back to hunt mode
            if (this.aiTargetingMode === 'target' && !this.hasMoreTargets()) {
                this.aiTargetingMode = 'hunt';
            }
        }
        
        this.playerTurn = true;
    }
    
    huntTarget() {
        // Hunt mode: prefer cells that are more likely to contain ships
        // Use a checkerboard pattern to maximize hit probability
        let row, col;
        let attempts = 0;
        
        while (attempts < 200) {
            row = Math.floor(Math.random() * this.boardSize);
            col = Math.floor(Math.random() * this.boardSize);
            
            const key = `${row},${col}`;
            if (!this.aiMisses.has(key)) {
                const cell = this.playerBoard[row][col];
                if (!cell || (cell && cell.ship && !cell.hit)) {
                    return { row, col };
                }
            }
            attempts++;
        }
        
        // Fallback to first available cell
        for (let r = 0; r < this.boardSize; r++) {
            for (let c = 0; c < this.boardSize; c++) {
                const key = `${r},${c}`;
                if (!this.aiMisses.has(key)) {
                    const cell = this.playerBoard[r][c];
                    if (!cell || (cell && cell.ship && !cell.hit)) {
                        return { row: r, col: c };
                    }
                }
            }
        }
        
        // Should never reach here
        return { row: 0, col: 0 };
    }
    
    targetAttack() {
        // Target mode: attack around known hits
        const directions = [[0, 1], [0, -1], [1, 0], [-1, 0]];
        
        for (const hit of this.aiHits) {
            for (const [dr, dc] of directions) {
                const newRow = hit.row + dr;
                const newCol = hit.col + dc;
                
                if (newRow >= 0 && newRow < this.boardSize && 
                    newCol >= 0 && newCol < this.boardSize) {
                    const key = `${newRow},${newCol}`;
                    if (!this.aiMisses.has(key)) {
                        const cell = this.playerBoard[newRow][newCol];
                        if (!cell || (cell && cell.ship && !cell.hit)) {
                            return { row: newRow, col: newCol };
                        }
                    }
                }
            }
        }
        
        // Fallback to hunt mode
        this.aiTargetingMode = 'hunt';
        return this.huntTarget();
    }
    
    hasMoreTargets() {
        const directions = [[0, 1], [0, -1], [1, 0], [-1, 0]];
        
        for (const hit of this.aiHits) {
            for (const [dr, dc] of directions) {
                const newRow = hit.row + dr;
                const newCol = hit.col + dc;
                
                if (newRow >= 0 && newRow < this.boardSize && 
                    newCol >= 0 && newCol < this.boardSize) {
                    const key = `${newRow},${newCol}`;
                    if (!this.aiMisses.has(key)) {
                        const cell = this.playerBoard[newRow][newCol];
                        if (!cell || (cell && cell.ship && !cell.hit)) {
                            return true;
                        }
                    }
                }
            }
        }
        return false;
    }
    
    endGame(playerWon) {
        this.gameStarted = false;
        this.updateGameStatus(playerWon ? '🎉 Victory!' : '💀 Defeat!');
        this.updateGameMessage(playerWon ? 'You sunk all enemy ships!' : 'All your ships were sunk!');
        
        const enemyCells = document.querySelectorAll('#enemy-board .cell');
        enemyCells.forEach(cell => cell.classList.add('disabled'));
    }
    
    resetGame() {
        this.playerBoard = this.createBoard();
        this.enemyBoard = this.createBoard();
        this.playerShips = [];
        this.enemyShips = [];
        this.currentShipIndex = 0;
        this.isHorizontal = true;
        this.gameStarted = false;
        this.playerTurn = true;
        this.playerHits = 0;
        this.enemyHits = 0;
        
        // Reset AI state
        this.aiTargetingMode = 'hunt';
        this.aiHits = [];
        this.aiMisses = new Set();
        
        document.getElementById('ship-placement').style.display = 'block';
        document.getElementById('start-game').disabled = true;
        
        this.renderBoard('player-board', this.playerBoard, true);
        this.renderBoard('enemy-board', this.enemyBoard, false);
        this.updateShipsList();
        this.updateShipCount('player');
        this.updateShipCount('enemy');
        this.updateGameStatus('Place Your Ships');
        this.updateGameMessage('Click to place ships. Press \'R\' to rotate.');
    }
    
    updateShipsList() {
        const shipItems = document.querySelectorAll('.ship-item');
        shipItems.forEach((item, index) => {
            item.classList.remove('active', 'placed');
            if (index < this.currentShipIndex) {
                item.classList.add('placed');
            } else if (index === this.currentShipIndex) {
                item.classList.add('active');
            }
        });
    }
    
    updateGameStatus(status) {
        document.getElementById('game-status').textContent = status;
    }
    
    updateGameMessage(message) {
        document.getElementById('game-message').textContent = message;
    }
    
    updateShipCount(player) {
        const ships = player === 'player' ? this.playerShips : this.enemyShips;
        const sunkCount = ships.filter(ship => ship.sunk).length;
        const remaining = this.ships.length - sunkCount;
        document.getElementById(`${player}-ships`).textContent = remaining;
    }
    
    toggleOrientation() {
        if (this.gameStarted || this.currentShipIndex >= this.ships.length) return;
        
        this.isHorizontal = !this.isHorizontal;
        const orientationText = document.getElementById('orientation-text');
        const orientationIcon = document.getElementById('orientation-icon');
        
        if (orientationText) {
            orientationText.textContent = this.isHorizontal ? 'Horizontal' : 'Vertical';
        }
        if (orientationIcon) {
            orientationIcon.textContent = this.isHorizontal ? '↔️' : '↕️';
        }
        
        this.updateGameMessage(`Orientation: ${this.isHorizontal ? 'Horizontal' : 'Vertical'}`);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new BattleshipGame();
});
