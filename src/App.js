import React, { useState, useRef, useEffect } from 'react';
import './App.css';

import TodoList from './components/TodoList';
import ClickCounter from './components/ClickCounter';
import TicTacToe from './components/TicTacToe';
import Calculator from './components/Calculator';
import CepFinder from './components/CepFinder';

function App() {
  const [activeComponent, setActiveComponent] = useState('TodoList');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [startX, setStartX] = useState(null);
  const sidebarRef = useRef(null);
  const appBodyRef = useRef(null);

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

  const handleTouchStart = (e) => {
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    if (startX === null) return;
    
    const currentX = e.touches[0].clientX;
    const diffX = currentX - startX;

    // Abre o menu se deslizar da esquerda para direita
    if (diffX > 50 && !isMenuOpen) {
      setIsMenuOpen(true);
      setStartX(null);
    }
    // Fecha o menu se deslizar da direita para esquerda
    else if (diffX < -50 && isMenuOpen) {
      setIsMenuOpen(false);
      setStartX(null);
    }
  };

  const handleTouchEnd = () => {
    setStartX(null);
  };

  useEffect(() => {
    const appBody = appBodyRef.current;
    if (appBody) {
      appBody.addEventListener('touchstart', handleTouchStart);
      appBody.addEventListener('touchmove', handleTouchMove);
      appBody.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      if (appBody) {
        appBody.removeEventListener('touchstart', handleTouchStart);
        appBody.removeEventListener('touchmove', handleTouchMove);
        appBody.removeEventListener('touchend', handleTouchEnd);
      }
    };
  }, [isMenuOpen, startX]);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Projeto React</h1>
      </header>

      <div className="App-body" ref={appBodyRef}>
        <nav className={`sidebar ${isMenuOpen ? 'open' : ''}`} ref={sidebarRef}>
          <ul className="nav-menu">
            <li 
              onClick={() => { setActiveComponent('TodoList'); closeMenu(); }}
              className={activeComponent === 'TodoList' ? 'active' : ''}
            >
              <span className="icon">📝</span>
              <span className="menu-text">To-Do List</span>
            </li>
            <li 
              onClick={() => { setActiveComponent('ClickCounter'); closeMenu(); }}
              className={activeComponent === 'ClickCounter' ? 'active' : ''}
            >
              <span className="icon">🔢</span>
              <span className="menu-text">Contador de Cliques</span>
            </li>
            <li 
              onClick={() => { setActiveComponent('TicTacToe'); closeMenu(); }}
              className={activeComponent === 'TicTacToe' ? 'active' : ''}
            >
              <span className="icon">⭕</span>
              <span className="menu-text">Jogo da Velha</span>
            </li>
            <li 
              onClick={() => { setActiveComponent('Calculator'); closeMenu(); }}
              className={activeComponent === 'Calculator' ? 'active' : ''}
            >
              <span className="icon">🧮</span>
              <span className="menu-text">Calculadora</span>
            </li>
            <li 
              onClick={() => { setActiveComponent('CepFinder'); closeMenu(); }}
              className={activeComponent === 'CepFinder' ? 'active' : ''}
            >
              <span className="icon">📍</span>
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