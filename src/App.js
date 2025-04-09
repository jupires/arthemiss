import React, { useState } from 'react';
import './App.css';

import TodoList from './components/TodoList';
import ClickCounter from './components/ClickCounter';
import TicTacToe from './components/TicTacToe';
import Calculator from './components/Calculator';
import CepFinder from './components/CepFinder';

function App() {
  const [activeComponent, setActiveComponent] = useState('TodoList');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="hamburger-menu" onClick={toggleMenu}>
          <div className="hamburger-line"></div>
          <div className="hamburger-line"></div>
          <div className="hamburger-line"></div>
        </div>
        <h1>Projeto React</h1>
      </header>

      <div className="App-body">
        <nav className={`sidebar ${isMenuOpen ? 'open' : ''}`}>
          <ul className="nav-menu">
            <li 
              onClick={() => { setActiveComponent('TodoList'); closeMenu(); }}
              className={activeComponent === 'TodoList' ? 'active' : ''}
            >
              <span className="icon">🖋️</span>
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