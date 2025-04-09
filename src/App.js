import React, { useState, useEffect } from 'react';
import './App.css';

import TodoList from './components/TodoList';
import ClickCounter from './components/ClickCounter';
import TicTacToe from './components/TicTacToe';
import Calculator from './components/Calculator';
import CepFinder from './components/CepFinder';

function App() {
  const [activeComponent, setActiveComponent] = useState('TodoList');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [touchStartX, setTouchStartX] = useState(null);

  const renderComponent = () => {
    switch (activeComponent) {
      case 'TodoList': return <TodoList />;
      case 'ClickCounter': return <ClickCounter />;
      case 'TicTacToe': return <TicTacToe />;
      case 'Calculator': return <Calculator />;
      case 'CepFinder': return <CepFinder />;
      default: return <TodoList />;
    }
  };

  // Funções para o gesto de deslize
  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    if (touchStartX === null) return;
    
    const touchEndX = e.touches[0].clientX;
    const differenceX = touchStartX - touchEndX;

    // Deslize para direita (abrir menu)
    if (differenceX < -50 && !isMenuOpen) {
      setIsMenuOpen(true);
      setTouchStartX(null);
    }
    // Deslize para esquerda (fechar menu)
    else if (differenceX > 50 && isMenuOpen) {
      setIsMenuOpen(false);
      setTouchStartX(null);
    }
  };

  const handleTouchEnd = () => {
    setTouchStartX(null);
  };

  // Adiciona os event listeners
  useEffect(() => {
    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isMenuOpen, touchStartX]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Projeto React</h1>
      </header>

      <div className="App-body">
        <nav className={`sidebar ${isMenuOpen ? 'open' : ''}`}>
          <ul className="nav-menu">
            <li 
              onClick={() => setActiveComponent('TodoList')}
              className={activeComponent === 'TodoList' ? 'active' : ''}
            >
              <span className="menu-text">To-Do List</span>
            </li>
            <li 
              onClick={() => setActiveComponent('ClickCounter')}
              className={activeComponent === 'ClickCounter' ? 'active' : ''}
            >
              <span className="menu-text">Contador de Cliques</span>
            </li>
            <li 
              onClick={() => setActiveComponent('TicTacToe')}
              className={activeComponent === 'TicTacToe' ? 'active' : ''}
            >
              <span className="menu-text">Jogo da Velha</span>
            </li>
            <li 
              onClick={() => setActiveComponent('Calculator')}
              className={activeComponent === 'Calculator' ? 'active' : ''}
            >
              <span className="menu-text">Calculadora</span>
            </li>
            <li 
              onClick={() => setActiveComponent('CepFinder')}
              className={activeComponent === 'CepFinder' ? 'active' : ''}
            >
              <span className="menu-text">Buscador de CEP</span>
            </li>
          </ul>
        </nav>

        <main className={`App-main ${isMenuOpen ? 'shifted' : ''}`}>
          <div className="component-container">
            {renderComponent()}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;