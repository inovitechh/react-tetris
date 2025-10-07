import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { rotatePiece, getDropPosition } from '../utils/gameLogic';

const { width: screenWidth } = Dimensions.get('window');
const CELL_SIZE = Math.min(screenWidth * 0.06, 20);

const GameBoard = ({ board, currentPiece, position, rotation, gameOver }) => {
  // Oyun tahtasını render et
  const renderBoard = () => {
    const displayBoard = board.map(row => [...row]);
    
    // Mevcut parçayı tahtaya ekle
    if (currentPiece && !gameOver) {
      const rotatedShape = rotatePiece(currentPiece.shape, rotation);
      const dropY = getDropPosition(board, currentPiece, position, rotation);
      
      // Gölge parçayı göster
      rotatedShape.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
          if (cell) {
            const shadowY = position.y + rowIndex + (dropY - position.y);
            const shadowX = position.x + colIndex;
            
            if (shadowY >= 0 && shadowY < board.length && 
                shadowX >= 0 && shadowX < board[0].length && 
                !board[shadowY][shadowX]) {
              displayBoard[shadowY][shadowX] = 'shadow';
            }
          }
        });
      });
      
      // Mevcut parçayı göster
      rotatedShape.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
          if (cell) {
            const boardY = position.y + rowIndex;
            const boardX = position.x + colIndex;
            
            if (boardY >= 0 && boardY < board.length && 
                boardX >= 0 && boardX < board[0].length) {
              displayBoard[boardY][boardX] = currentPiece.color;
            }
          }
        });
      });
    }
    
    return displayBoard;
  };

  const displayBoard = renderBoard();

  return (
    <View style={styles.gameBoard}>
      <View style={styles.boardGrid}>
        {displayBoard.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.boardRow}>
            {row.map((cell, colIndex) => (
              <View
                key={`${rowIndex}-${colIndex}`}
                style={[
                  styles.boardCell,
                  cell === 'shadow' && styles.shadowCell,
                  cell && cell !== 'shadow' && { backgroundColor: cell }
                ]}
              />
            ))}
          </View>
        ))}
      </View>
      
      {gameOver && (
        <View style={styles.gameOverOverlay}>
          <View style={styles.gameOverMessage}>
            <Text style={styles.gameOverTitle}>Oyun Bitti!</Text>
            <Text style={styles.gameOverText}>Tekrar oynamak için "Yeni Oyun" butonuna basın</Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  gameBoard: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: 15,
    padding: 8,
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  boardGrid: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 8,
    padding: 3,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  boardRow: {
    flexDirection: 'row',
  },
  boardCell: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    margin: 0.3,
  },
  shadowCell: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderColor: 'rgba(255, 255, 255, 0.4)',
  },
  gameOverOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  gameOverMessage: {
    alignItems: 'center',
    padding: 20,
  },
  gameOverTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  gameOverText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    opacity: 0.9,
  },
});

export default GameBoard;