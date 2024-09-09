import React, { useState, useEffect } from 'react';

const GuessNumberGame = () => {
  const [secretNumber, setSecretNumber] = useState(0);
  const [guess, setGuess] = useState('');
  const [score, setScore] = useState(100);
  const [highScore, setHighScore] = useState(0);
  const [message, setMessage] = useState('');
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = () => {
    setSecretNumber(Math.floor(Math.random() * 100) + 1);
    setScore(100);
    setGuess('');
    setMessage('');
    setGameOver(false);
  };

  const handleGuess = () => {
    if (guess.trim() === '') {
      setMessage('Por favor, ingresa un número antes de adivinar.');
      return;
    }

    const userGuess = parseInt(guess);

    if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
      setMessage('Por favor, ingresa un número válido entre 1 y 100.');
      return;
    }

    setScore(prevScore => {
      const newScore = prevScore - 10;
      if (newScore <= 0) {
        setGameOver(true);
        setMessage('¡Perdiste! Se acabaron los intentos.');
        return 0;
      }

      if (userGuess === secretNumber) {
        setHighScore(Math.max(newScore, highScore));
        setMessage('¡Felicidades! ¡Adivinaste el número!');
        setGameOver(true);
      } else if (userGuess < secretNumber) {
        setMessage('Demasiado bajo. Intenta de nuevo.');
      } else {
        setMessage('Demasiado alto. Intenta de nuevo.');
      }

      return newScore;
    });

    setGuess('');
  };

  const styles = {
    container: {
      fontFamily: 'Arial, sans-serif',
      maxWidth: '400px',
      margin: '0 auto',
      padding: '20px',
      textAlign: 'center',
      backgroundColor: '#f0f0f0',
      borderRadius: '10px',
      boxShadow: '0 0 10px rgba(0,0,0,0.1)'
    },
    title: {
      color: '#333',
      marginBottom: '20px'
    },
    input: {
      width: '80%',
      padding: '10px',
      fontSize: '16px',
      marginBottom: '10px',
      borderRadius: '5px',
      border: '1px solid #ddd'
    },
    button: {
      backgroundColor: '#4CAF50',
      color: 'white',
      padding: '10px 20px',
      fontSize: '16px',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      marginRight: '10px'
    },
    disabledButton: {
      backgroundColor: '#ddd',
      cursor: 'not-allowed'
    },
    message: {
      marginTop: '20px',
      fontWeight: 'bold',
      color: '#333'
    },
    score: {
      fontSize: '18px',
      margin: '10px 0'
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Juego de Adivinar el Número</h1>
      <p>Adivina un número entre 1 y 100</p>
      <p style={styles.score}>Puntaje actual: {score}</p>
      <p style={styles.score}>Puntaje más alto: {highScore}</p>
      <input
        type="number"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
        disabled={gameOver}
        style={styles.input}
        placeholder="Ingresa tu número"
      />
      <button 
        onClick={handleGuess} 
        disabled={gameOver}
        style={{...styles.button, ...(gameOver ? styles.disabledButton : {})}}
      >
        Adivinar
      </button>
      <button onClick={startNewGame} style={styles.button}>Nuevo Juego</button>
      <p style={styles.message}>{message}</p>
    </div>
  );
};

export default GuessNumberGame;