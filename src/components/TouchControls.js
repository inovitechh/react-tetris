import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const TouchControls = ({ 
  onMoveLeft, 
  onMoveRight, 
  onRotate, 
  onHardDrop, 
  onStartGame, 
  gameOver, 
  isPaused 
}) => {
  const [isPressed, setIsPressed] = useState({});
  const intervalRef = useRef(null);

  // Buton basma işlemleri
  const handleButtonPress = (action, buttonId) => {
    if (gameOver || isPaused) return;
    
    setIsPressed(prev => ({ ...prev, [buttonId]: true }));
    action();
    
    // Tekrarlı basma için interval başlat
    intervalRef.current = setInterval(() => {
      action();
    }, 150);
  };

  const handleButtonRelease = (buttonId) => {
    setIsPressed(prev => ({ ...prev, [buttonId]: false }));
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  // Component unmount olduğunda interval'ı temizle
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <View style={styles.touchControls}>
      {/* Oyun başlatma butonu */}
      {gameOver && (
        <View style={styles.startGameSection}>
          <TouchableOpacity 
            style={styles.startGameBtn}
            onPress={onStartGame}
          >
            <Text style={styles.startGameBtnText}>Yeni Oyun</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Ana kontrol alanı */}
      <View style={styles.controlArea}>
        {/* Sol hareket butonu */}
        <TouchableOpacity
          style={[
            styles.controlBtn,
            styles.moveLeft,
            isPressed.left && styles.pressed
          ]}
          onPressIn={() => handleButtonPress(onMoveLeft, 'left')}
          onPressOut={() => handleButtonRelease('left')}
          disabled={gameOver || isPaused}
        >
          <Text style={styles.controlIcon}>←</Text>
        </TouchableOpacity>

        {/* Orta kontrol alanı */}
        <View style={styles.centerControls}>
          {/* Döndürme butonu */}
          <TouchableOpacity
            style={[
              styles.controlBtn,
              styles.rotate,
              isPressed.rotate && styles.pressed
            ]}
            onPressIn={() => handleButtonPress(onRotate, 'rotate')}
            onPressOut={() => handleButtonRelease('rotate')}
            disabled={gameOver || isPaused}
          >
            <Text style={styles.controlIcon}>↻</Text>
          </TouchableOpacity>

          {/* Hızlı düşürme butonu */}
          <TouchableOpacity
            style={[
              styles.controlBtn,
              styles.hardDrop,
              isPressed.drop && styles.pressed
            ]}
            onPressIn={() => handleButtonPress(onHardDrop, 'drop')}
            onPressOut={() => handleButtonRelease('drop')}
            disabled={gameOver || isPaused}
          >
            <Text style={styles.controlIcon}>↓</Text>
          </TouchableOpacity>
        </View>

        {/* Sağ hareket butonu */}
        <TouchableOpacity
          style={[
            styles.controlBtn,
            styles.moveRight,
            isPressed.right && styles.pressed
          ]}
          onPressIn={() => handleButtonPress(onMoveRight, 'right')}
          onPressOut={() => handleButtonRelease('right')}
          disabled={gameOver || isPaused}
        >
          <Text style={styles.controlIcon}>→</Text>
        </TouchableOpacity>
      </View>

      {/* Kontrol açıklamaları */}
      <View style={styles.controlInstructions}>
        <Text style={styles.instructionText}>• Sola/sağa kaydırın veya butonları kullanın</Text>
        <Text style={styles.instructionText}>• Döndürmek için ↻ butonuna basın</Text>
        <Text style={styles.instructionText}>• Hızlı düşürmek için ↓ butonuna basın</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  touchControls: {
    marginTop: 20,
    alignItems: 'center',
  },
  startGameSection: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 15,
  },
  startGameBtn: {
    backgroundColor: '#ff6b6b',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 15,
  },
  startGameBtnText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  controlArea: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    width: '100%',
    maxWidth: 400,
    justifyContent: 'space-between',
  },
  centerControls: {
    alignItems: 'center',
  },
  controlBtn: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlBtn: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    transform: [{ scale: 0.95 }],
  },
  controlIcon: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  moveLeft: {
    width: 60,
    height: 60,
  },
  moveRight: {
    width: 60,
    height: 60,
  },
  rotate: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  hardDrop: {
    width: 50,
    height: 50,
  },
  controlInstructions: {
    marginTop: 15,
    alignItems: 'center',
  },
  instructionText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 5,
  },
});

export default TouchControls;