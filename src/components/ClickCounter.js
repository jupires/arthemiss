import React, { useState, useEffect } from 'react';
import './ClickCounter.css';

const ClickCounter = () => {
  const [count, setCount] = useState(0);
  const [clickHistory, setClickHistory] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    if (count > 0) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 300);
      return () => clearTimeout(timer);
    }
  }, [count]);

  const incrementCount = () => {
    setCount(count + 1);
    setClickHistory([...clickHistory, new Date().toLocaleTimeString()]);
  };

  const resetCount = () => {
    setCount(0);
    setClickHistory([]);
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className={`click-counter ${theme}`}>
      <div className="header">
        <h2>Contador de Cliques</h2>
        <button onClick={toggleTheme} className="theme-toggle">
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>
      </div>
      
      <div className={`counter-display ${isAnimating ? 'pop' : ''}`}>
        <span className="count">{count}</span>
        <span className="label">cliques</span>
      </div>
      
      <div className="button-group">
        <button 
          onClick={incrementCount}
          className="primary-button"
        >
          Clique aqui
        </button>
        <button 
          onClick={resetCount}
          className="secondary-button"
          disabled={count === 0}
        >
          Zerar
        </button>
      </div>
      
      {clickHistory.length > 0 && (
        <div className="history">
          <h3>Histórico de Cliques</h3>
          <ul>
            {clickHistory.map((time, index) => (
              <li key={index}>Clique #{index + 1} às {time}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ClickCounter;