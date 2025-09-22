import { BOARD_WIDTH, BOARD_HEIGHT } from './constants';

// Boş oyun tahtası oluştur
export const createBoard = () => {
  return Array(BOARD_HEIGHT).fill().map(() => Array(BOARD_WIDTH).fill(0));
};

// Çarpışma kontrolü
export const checkCollision = (board, piece, position, rotation) => {
  const rotatedShape = rotatePiece(piece.shape, rotation);
  
  for (let row = 0; row < rotatedShape.length; row++) {
    for (let col = 0; col < rotatedShape[row].length; col++) {
      if (rotatedShape[row][col]) {
        const newX = position.x + col;
        const newY = position.y + row;
        
        // Sınır kontrolü
        if (newX < 0 || newX >= BOARD_WIDTH || newY >= BOARD_HEIGHT) {
          return true;
        }
        
        // Alt sınır kontrolü (yukarıdan çıkışa izin ver)
        if (newY >= 0 && board[newY][newX]) {
          return true;
        }
      }
    }
  }
  
  return false;
};

// Parçayı döndür
export const rotatePiece = (shape, rotation) => {
  let rotated = shape;
  
  for (let i = 0; i < rotation; i++) {
    rotated = rotated[0].map((_, index) =>
      rotated.map(row => row[index]).reverse()
    );
  }
  
  return rotated;
};

// Tamamlanan satırları temizle
export const clearLines = (board) => {
  const newBoard = [...board];
  let clearedLines = 0;
  
  for (let row = BOARD_HEIGHT - 1; row >= 0; row--) {
    if (newBoard[row].every(cell => cell !== 0)) {
      newBoard.splice(row, 1);
      newBoard.unshift(Array(BOARD_WIDTH).fill(0));
      clearedLines++;
      row++; // Aynı satırı tekrar kontrol et
    }
  }
  
  return { clearedBoard: newBoard, clearedLines };
};

// Parçanın gölgesini hesapla
export const getDropPosition = (board, piece, position, rotation) => {
  let dropY = position.y;
  
  while (!checkCollision(board, piece, { x: position.x, y: dropY + 1 }, rotation)) {
    dropY++;
  }
  
  return dropY;
};



