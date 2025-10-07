import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import GameBoard from './src/components/GameBoard';
import GameInfo from './src/components/GameInfo';
import TouchControls from './src/components/TouchControls';
import { createBoard, checkCollision, rotatePiece, clearLines } from './src/utils/gameLogic';
import { TETRIS_PIECES, BOARD_WIDTH, BOARD_HEIGHT } from './src/utils/constants';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default function App() {
  const [board, setBoard] = useState(() => createBoard());
  const [currentPiece, setCurrentPiece] = useState(null);
  const [nextPiece, setNextPiece] = useState(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [lines, setLines] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [dropTime, setDropTime] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);

  // Yeni parça oluştur
  const createNewPiece = useCallback(() => {
    const pieceTypes = Object.keys(TETRIS_PIECES);
    const randomType = pieceTypes[Math.floor(Math.random() * pieceTypes.length)];
    const newPiece = {
      type: randomType,
      shape: TETRIS_PIECES[randomType].shape,
      color: TETRIS_PIECES[randomType].color
    };
    
    const startX = Math.floor(BOARD_WIDTH / 2) - Math.floor(newPiece.shape[0].length / 2);
    const startY = 0;
    
    return { piece: newPiece, x: startX, y: startY };
  }, []);

  // Oyunu başlat
  const startGame = useCallback(() => {
    setBoard(createBoard());
    setScore(0);
    setLevel(1);
    setLines(0);
    setGameOver(false);
    setIsPaused(false);
    setGameStarted(true);
    
    const firstPiece = createNewPiece();
    const secondPiece = createNewPiece();
    
    setCurrentPiece(firstPiece.piece);
    setNextPiece(secondPiece.piece);
    setPosition({ x: firstPiece.x, y: firstPiece.y });
    setRotation(0);
    
    setDropTime(Date.now());
  }, [createNewPiece]);

  // Parçayı aşağı hareket ettir
  const dropPiece = useCallback(() => {
    if (!currentPiece || gameOver || isPaused) return;

    const newY = position.y + 1;
    
    if (!checkCollision(board, currentPiece, { x: position.x, y: newY }, rotation)) {
      setPosition({ x: position.x, y: newY });
    } else {
      // Parça zemine değdi, board'a yerleştir
      const newBoard = [...board];
      const rotatedShape = rotatePiece(currentPiece.shape, rotation);
      rotatedShape.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
          if (cell) {
            const boardY = position.y + rowIndex;
            const boardX = position.x + colIndex;
            if (boardY >= 0 && boardY < BOARD_HEIGHT && boardX >= 0 && boardX < BOARD_WIDTH) {
              newBoard[boardY][boardX] = currentPiece.color;
            }
          }
        });
      });

      // Tamamlanan satırları kontrol et
      const { clearedBoard, clearedLines } = clearLines(newBoard);
      setBoard(clearedBoard);
      
      if (clearedLines > 0) {
        setLines(prev => prev + clearedLines);
        setScore(prev => prev + clearedLines * 100 * level);
        setLevel(prev => Math.floor((lines + clearedLines) / 10) + 1);
      }

      // Yeni parça oluştur
      const newPieceData = createNewPiece();
      setCurrentPiece(nextPiece);
      setNextPiece(newPieceData.piece);
      setPosition({ x: newPieceData.x, y: newPieceData.y });
      setRotation(0);

      // Oyun bitti mi kontrol et
      if (checkCollision(clearedBoard, nextPiece, { x: newPieceData.x, y: newPieceData.y }, 0)) {
        setGameOver(true);
        setDropTime(null);
      }
    }
  }, [board, currentPiece, position, rotation, gameOver, isPaused, nextPiece, level, lines, createNewPiece]);

  // Otomatik düşme
  useEffect(() => {
    if (!dropTime || gameOver || isPaused) return;

    const interval = setInterval(() => {
      dropPiece();
    }, Math.max(100, 1000 - (level - 1) * 100));

    return () => clearInterval(interval);
  }, [dropTime, dropPiece, level, gameOver, isPaused]);

  // Parçayı hareket ettir
  const movePiece = useCallback((direction) => {
    if (!currentPiece || gameOver || isPaused) return;

    const newX = position.x + direction;
    
    if (!checkCollision(board, currentPiece, { x: newX, y: position.y }, rotation)) {
      setPosition({ x: newX, y: position.y });
    }
  }, [board, currentPiece, position, rotation, gameOver, isPaused]);

  // Parçayı döndür
  const rotatePieceHandler = useCallback(() => {
    if (!currentPiece || gameOver || isPaused) return;

    const newRotation = (rotation + 1) % 4;
    
    if (!checkCollision(board, currentPiece, position, newRotation)) {
      setRotation(newRotation);
    }
  }, [board, currentPiece, position, rotation, gameOver, isPaused]);

  // Hızlı düşür
  const hardDrop = useCallback(() => {
    if (!currentPiece || gameOver || isPaused) return;

    let newY = position.y;
    while (!checkCollision(board, currentPiece, { x: position.x, y: newY + 1 }, rotation)) {
      newY++;
    }
    setPosition({ x: position.x, y: newY });
  }, [board, currentPiece, position, rotation, gameOver, isPaused]);

  // Oyunu duraklat/devam ettir
  const togglePause = useCallback(() => {
    if (gameOver) return;
    setIsPaused(prev => !prev);
  }, [gameOver]);

  // Oyun başlamamışsa başlangıç ekranını göster
  if (!gameStarted) {
    return (
      <View style={styles.container}>
        <StatusBar style="light" />
        <View style={styles.startScreen}>
          <View style={styles.startContent}>
            <Text style={styles.title}>🎮 React Tetris</Text>
            <Text style={styles.subtitle}>Android cihazlar için dokunmatik kontrollü Tetris oyunu</Text>
            <View style={styles.features}>
              <Text style={styles.feature}>👆 Dokunmatik kontroller</Text>
              <Text style={styles.feature}>🎯 Yön tuşları</Text>
              <Text style={styles.feature}>📱 Mobil uyumlu</Text>
            </View>
            <TouchableOpacity style={styles.startButton} onPress={startGame}>
              <Text style={styles.startButtonText}>Oyunu Başlat</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.gameContainer}>
        <View style={styles.gameHeader}>
          <Text style={styles.gameTitle}>React Tetris</Text>
          <TouchableOpacity 
            style={styles.pauseButton} 
            onPress={togglePause}
            disabled={gameOver}
          >
            <Text style={styles.pauseButtonText}>
              {isPaused ? 'Devam' : 'Duraklat'}
            </Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.gameContent}>
          <GameInfo 
            score={score}
            level={level}
            lines={lines}
            nextPiece={nextPiece}
          />
          
          <GameBoard 
            board={board}
            currentPiece={currentPiece}
            position={position}
            rotation={rotation}
            gameOver={gameOver}
          />
        </View>
        
        <TouchControls
          onMoveLeft={() => movePiece(-1)}
          onMoveRight={() => movePiece(1)}
          onRotate={rotatePieceHandler}
          onHardDrop={hardDrop}
          onStartGame={startGame}
          gameOver={gameOver}
          isPaused={isPaused}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#667eea',
  },
  startScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  startContent: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    padding: 40,
    alignItems: 'center',
    maxWidth: 400,
    width: '100%',
  },
  title: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  subtitle: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 16,
    marginBottom: 30,
    textAlign: 'center',
    lineHeight: 24,
  },
  features: {
    marginBottom: 40,
  },
  feature: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    color: 'white',
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  startButton: {
    backgroundColor: '#ff6b6b',
    paddingHorizontal: 40,
    paddingVertical: 20,
    borderRadius: 15,
  },
  startButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  gameContainer: {
    flex: 1,
    padding: 15,
    maxWidth: 450,
    alignSelf: 'center',
    width: '100%',
  },
  gameHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  gameTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  pauseButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  pauseButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  gameContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    maxWidth: 400,
    alignSelf: 'center',
  },
});
