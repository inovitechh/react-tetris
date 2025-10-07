import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const GameInfo = ({ score, level, lines, nextPiece }) => {
  return (
    <View style={styles.gameInfo}>
      <View style={styles.infoSection}>
        <Text style={styles.infoLabel}>Skor</Text>
        <Text style={styles.infoValue}>{score.toLocaleString()}</Text>
      </View>
      
      <View style={styles.infoSection}>
        <Text style={styles.infoLabel}>Seviye</Text>
        <Text style={styles.infoValue}>{level}</Text>
      </View>
      
      <View style={styles.infoSection}>
        <Text style={styles.infoLabel}>Satırlar</Text>
        <Text style={styles.infoValue}>{lines}</Text>
      </View>
      
      <View style={styles.infoSection}>
        <Text style={styles.infoLabel}>Sıradaki</Text>
        <View style={styles.nextPiecePreview}>
          {nextPiece && nextPiece.shape.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.nextPieceRow}>
              {row.map((cell, colIndex) => (
                <View
                  key={`${rowIndex}-${colIndex}`}
                  style={[
                    styles.nextPieceCell,
                    cell && { backgroundColor: nextPiece.color }
                  ]}
                />
              ))}
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  gameInfo: {
    marginRight: 12,
    minWidth: 100,
  },
  infoSection: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  infoLabel: {
    color: 'white',
    fontSize: 12,
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 1,
    opacity: 0.8,
  },
  infoValue: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  nextPiecePreview: {
    alignItems: 'center',
    marginTop: 5,
  },
  nextPieceRow: {
    flexDirection: 'row',
  },
  nextPieceCell: {
    width: 10,
    height: 10,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    margin: 0.5,
  },
});

export default GameInfo;