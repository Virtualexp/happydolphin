// chess-app.js

// 1. Data Structure (Games)
const chessGames = [





{
  id: "SyvohauZ",
  white: "MustafaKemalK",
  whiteElo: "1493",
  black: "lazaru_s",
  blackElo: "1455",
  event: "casual bullet game",
  location: "Charlies",
  date: "2026.05.31",
  opening: "Sicilian Defense: Bowdler Attack",
  pgnString: "1. e4 c5 2. Bc4 e6 3. d3 Nc6 4. Nf3 Nf6 5. Nc3 h6 6. Be3 a6 7. O-O Be7 8. Re1 O-O 9. Ne2 d5 10. exd5 exd5 11. Bb3 Re8 12. Ng3 d4 13. Bf4 Bd6 14. Bxd6 Rxe1+ 15. Qxe1 Qxd6 16. Qe2 Bd7 17. Re1 Re8 18. Ne4 Qf4 19. g3 Qg4 20. Bd5 Nxe4 21. dxe4 Qh3 22. Qf1 Qg4 23. e5 Qf5 24. Bxc6 Bxc6 25. Nh4 Qxc2 26. Ng6 fxg6 27. Qh3 Qd2 28. Re4 Qd1+"
}



  {
    id: "smaiiiii_lazaru_s_2025",
    white: "S. T.",
    whiteElo: "1500",
    black: "Burak G.",
    blackElo: "1603",
    event: "Casual rapid game",
    location: "Library",
    date: "2025.02.09",
    opening: "Sicilian Defense: Bowdler Attack",
    pgnString: "1. e4 c5 2. Bc4 e6 3. Nf3 Nc6 4. Nc3 h6 5. d3 Nf6 6. Bf4 Be7 7. Nb5 O-O 8. Bc7 Qe8 9. d4 d5 10. exd5 exd5 11. O-O a6 12. Nd6 Bxd6 13. Bxd6 dxc4 14. Bxf8 Qxf8 15. Ne5 Qd6 16. Nxc4 Qf4 17. d5 Nd4 18. g3 Qe4 19. Nd6 Nf3+ 20. Kg2 Nd2+ 21. Nxe4 Ndxe4 22. Qf3 Bg4 23. Qf4 Re8 24. Rae1 h5 25. Rxe4 Rxe4 26. Qb8+ Kh7 27. Qxb7 Re2 28. Qxf7 Rxc2 29. Re1 Rxb2 30. Re7 Ne8 31. Rxe8 Rb6 32. Qg8+ Kh6 33. Re6+ Kg5 34. f4+ Kf5 35. Qf7#"
  },
  
  {
  id: "lazaru_s_duygusal3169_2021",
  white: "Burak G.",
  whiteElo: "1500",
  black: "Mustafa K.",
  blackElo: "1169",
  event: "Casual blitz game",
  location: "Collesium",
  date: "2021.03.28",
  opening: "Horwitz Defense",
  pgnString: "1. d4 e6 2. c4 Qh4 3. Nc3 Nc6 4. Nf3 Qf6 5. e3 d5 6. a3 Bd7 7. Be2 O-O-O 8. O-O Nge7 9. h3 Nf5 10. Re1 Bd6 11. c5 Be7 12. Bd3 Rhe8 13. e4 Nfxd4 14. Nxd4 Qxd4 15. exd5 Ne5 16. Be3 Qxd3 17. Bd2 Bf6 18. d6 Nc4 19. Ne4 cxd6 20. Nxd6+ Kb8 21. Nxe8 Rxe8 22. Rb1 Bxb2 23. Bf4+ e5 24. Qxd3"
}
  










];

// 2. Piece Images (Wikimedia Commons)
const pieceImages = {
  'wp': 'https://upload.wikimedia.org/wikipedia/commons/4/45/Chess_plt45.svg',
  'wn': 'https://upload.wikimedia.org/wikipedia/commons/7/70/Chess_nlt45.svg',
  'wb': 'https://upload.wikimedia.org/wikipedia/commons/b/b1/Chess_blt45.svg',
  'wr': 'https://upload.wikimedia.org/wikipedia/commons/7/72/Chess_rlt45.svg',
  'wq': 'https://upload.wikimedia.org/wikipedia/commons/1/15/Chess_qlt45.svg',
  'wk': 'https://upload.wikimedia.org/wikipedia/commons/4/42/Chess_klt45.svg',
  'bp': 'https://upload.wikimedia.org/wikipedia/commons/c/c7/Chess_pdt45.svg',
  'bn': 'https://upload.wikimedia.org/wikipedia/commons/e/ef/Chess_ndt45.svg',
  'bb': 'https://upload.wikimedia.org/wikipedia/commons/9/98/Chess_bdt45.svg',
  'br': 'https://upload.wikimedia.org/wikipedia/commons/f/ff/Chess_rdt45.svg',
  'bq': 'https://upload.wikimedia.org/wikipedia/commons/4/47/Chess_qdt45.svg',
  'bk': 'https://upload.wikimedia.org/wikipedia/commons/f/f0/Chess_kdt45.svg'
};

// 3. State Variables
let currentChess = new Chess();
let currentGameIndex = 0;
let currentMoveIndex = -1; // -1 means initial position
let parsedMoves = [];
let boardFlipped = false;

// 4. DOM Elements
const elements = {
  selector: document.getElementById('game-selector'),
  headerContainer: document.getElementById('chessgames-header'),
  chessboard: document.getElementById('chessboard'),
  statusColor: document.getElementById('status-color'),
  statusName: document.getElementById('status-name'),
  statusElo: document.getElementById('status-elo'),
  statusTurn: document.getElementById('status-turn'),
  statusLastMove: document.getElementById('status-last-move'),
  pgnContainer: document.getElementById('pgn-container'),
  btnStart: document.getElementById('btn-start'),
  btnPrev: document.getElementById('btn-prev'),
  btnNext: document.getElementById('btn-next'),
  btnEnd: document.getElementById('btn-end'),
  btnFlip: document.getElementById('btn-flip'),
};

// 5. Initialization
function init() {
  // Populate dropdown
  chessGames.forEach((game, index) => {
    const option = document.createElement('option');
    option.value = index;
    option.textContent = `${game.white} vs ${game.black} - ${game.event}`;
    option.style.background = '#0a0b10';
    option.style.color = '#e2e8f0';
    elements.selector.appendChild(option);
  });

  // Event Listeners
  elements.selector.addEventListener('change', (e) => loadGame(parseInt(e.target.value)));
  elements.btnStart.addEventListener('click', goToStart);
  elements.btnPrev.addEventListener('click', goPrevMove);
  elements.btnNext.addEventListener('click', goNextMove);
  elements.btnEnd.addEventListener('click', goToEnd);
  elements.btnFlip.addEventListener('click', toggleFlip);

  // Load first game
  if (chessGames.length > 0) {
    loadGame(0);
  }
}

// 6. Logic functions
function loadGame(index) {
  currentGameIndex = index;
  const game = chessGames[index];
  
  // Load PGN to extract moves
  currentChess = new Chess();
  currentChess.load_pgn(game.pgnString);
  parsedMoves = currentChess.history({ verbose: true }); // Get detailed moves
  
  // Reset state
  currentChess.reset();
  currentMoveIndex = -1;
  boardFlipped = false; // Reset flip or keep user preference? Better to reset per game or based on user. Let's keep it false for consistency.
  
  updateHeaders(game);
  renderBoard();
  renderPGN();
  updateStatus();
}

function updateHeaders(game) {
    // Update Header
    if (elements.headerContainer) {
      elements.headerContainer.innerHTML = `
        <div class="mb-2" style="font-family: Verdana, Arial, sans-serif; font-size: 24px;">
          <strong style="color: #00f2fe;">${game.white}</strong>
          <span style="color: #e2e8f0; font-size: 0.8em; font-weight: normal;"> vs </span>
          <strong style="color: #00f2fe;">${game.black}</strong>
        </div>
        <div style="font-family: Georgia, Palatino, 'Times New Roman', serif; font-size: 16px; line-height: 1.4;">
          <div style="font-weight: bold; color: #fff; font-size: 18px; margin-bottom: 2px;">"${game.event}"</div>
          <div style="color: #00f2fe;">${game.location}, ${game.date}</div>
          <div style="color: #e2e8f0; margin-top: 2px;">${game.opening}</div>
        </div>
      `;
    }
}

// 7. Board Rendering
function renderBoard() {
  elements.chessboard.innerHTML = '';
  const board = currentChess.board(); // Returns 8x8 array. Index 0 is rank 8 (a8..h8)
  
  for (let rankIndex = 0; rankIndex < 8; rankIndex++) {
    for (let fileIndex = 0; fileIndex < 8; fileIndex++) {
      
      // Calculate actual rank/file based on boardFlip
      let displayRankIndex = boardFlipped ? 7 - rankIndex : rankIndex;
      let displayFileIndex = boardFlipped ? 7 - fileIndex : fileIndex;

      let actualRank = 8 - displayRankIndex;
      let actualFile = String.fromCharCode('a'.charCodeAt(0) + displayFileIndex);

      const piece = board[displayRankIndex][displayFileIndex];
      const isLightSquare = (displayRankIndex + displayFileIndex) % 2 === 0;

      const squareDiv = document.createElement('div');
      squareDiv.className = `board-square ${isLightSquare ? 'bg-[#f0d9b5] dark:bg-[#d0c5af] text-black dark:text-surface' : 'bg-[#b58863] dark:bg-[#4d4635] text-black dark:text-surface'}`;
      
      // Coordinates
      if (displayFileIndex === (boardFlipped ? 7 : 0)) {
        const coordY = document.createElement('span');
        coordY.className = `coord-y ${isLightSquare ? 'text-[#b58863] dark:text-[#4d4635]' : 'text-[#f0d9b5] dark:text-[#d0c5af]'}`;
        coordY.textContent = actualRank;
        squareDiv.appendChild(coordY);
      }
      
      if (displayRankIndex === (boardFlipped ? 0 : 7)) {
        const coordX = document.createElement('span');
        coordX.className = `coord-x ${isLightSquare ? 'text-[#b58863] dark:text-[#4d4635]' : 'text-[#f0d9b5] dark:text-[#d0c5af]'}`;
        coordX.textContent = actualFile;
        squareDiv.appendChild(coordX);
      }

      // Piece SVG
      if (piece) {
        const pieceKey = piece.color + piece.type; // e.g., 'wp' for white pawn
        const imgSrc = pieceImages[pieceKey];
        if (imgSrc) {
          const img = document.createElement('img');
          img.src = imgSrc;
          img.style.width = '100%';
          img.style.height = '100%';
          img.style.objectFit = 'contain';
          img.style.filter = 'drop-shadow(0px 2px 2px rgba(0,0,0,0.4))';
          
          const wrapper = document.createElement('div');
          wrapper.style.width = "85%";
          wrapper.style.height = "85%";
          wrapper.style.display = "flex";
          wrapper.style.alignItems = "center";
          wrapper.style.justifyContent = "center";
          wrapper.appendChild(img);
          
          squareDiv.appendChild(wrapper);
        }
      }

      elements.chessboard.appendChild(squareDiv);
    }
  }
}

// 8. PGN Rendering
function renderPGN() {
  elements.pgnContainer.innerHTML = '';
  
  let pgnHTML = '';
  for (let i = 0; i < parsedMoves.length; i++) {
    if (i % 2 === 0) {
      pgnHTML += `${(i/2) + 1}. `;
    }
    
    // Check if this move is the current active move
    const isActive = (i === currentMoveIndex);
    const activeClasses = isActive ? 'bg-[#00f2fe]/20 px-1 rounded font-bold text-[#00f2fe] transition-colors' : 'pgn-move';
    
    pgnHTML += `<span class="${activeClasses}" onclick="goToMove(${i})">${parsedMoves[i].san}</span> `;
  }
  
  elements.pgnContainer.innerHTML = pgnHTML;
}

// 9. Status Updating
function updateStatus() {
  const game = chessGames[currentGameIndex];
  const turn = currentChess.turn(); // 'w' or 'b'
  
  if (turn === 'w') {
    elements.statusColor.textContent = 'White';
    elements.statusName.textContent = game.white;
    elements.statusElo.textContent = game.whiteElo;
    elements.statusTurn.textContent = 'White to move';
  } else {
    elements.statusColor.textContent = 'Black';
    elements.statusName.textContent = game.black;
    elements.statusElo.textContent = game.blackElo;
    elements.statusTurn.textContent = 'Black to move';
  }
  
  if (currentMoveIndex >= 0) {
    const moveNumber = Math.floor(currentMoveIndex / 2) + 1;
    const moveSAN = parsedMoves[currentMoveIndex].san;
    const dots = (currentMoveIndex % 2 === 1) ? '...' : '.';
    elements.statusLastMove.textContent = `Last: ${moveNumber}${dots}${moveSAN}`;
  } else {
    elements.statusLastMove.textContent = 'Game start';
  }
}

// 10. Navigation Controls
window.goToMove = function(index) {
  currentChess.reset();
  for (let i = 0; i <= index; i++) {
    currentChess.move(parsedMoves[i].san);
  }
  currentMoveIndex = index;
  updateUI();
};

function goNextMove() {
  if (currentMoveIndex < parsedMoves.length - 1) {
    currentMoveIndex++;
    currentChess.move(parsedMoves[currentMoveIndex].san);
    updateUI();
  }
}

function goPrevMove() {
  if (currentMoveIndex >= 0) {
    currentChess.undo();
    currentMoveIndex--;
    updateUI();
  }
}

function goToStart() {
  currentChess.reset();
  currentMoveIndex = -1;
  updateUI();
}

function goToEnd() {
  goToMove(parsedMoves.length - 1);
}

function toggleFlip() {
  boardFlipped = !boardFlipped;
  renderBoard();
}

function updateUI() {
  renderBoard();
  renderPGN();
  updateStatus();
}

// Start
document.addEventListener('DOMContentLoaded', init);
