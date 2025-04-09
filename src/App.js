import React, { useState } from 'react';
import './App.css';

import TodoList from './components/TodoList';
import ClickCounter from './components/ClickCounter';
import TicTacToe from './components/TicTacToe';
import Calculator from './components/Calculator';
import CepFinder from './components/CepFinder';

function App() {
  const [activeComponent, setActiveComponent] = useState('TodoList');

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

  return (
    <div className="App">
      <header className="App-header">
        <h1>Projeto React</h1>
      </header>

      <div className="App-body">
        <nav className="sidebar">
          <ul className="nav-menu">
            <li onClick={() => setActiveComponent('TodoList')}>To-Do List</li>
            <li onClick={() => setActiveComponent('ClickCounter')}>Contador de Cliques</li>
            <li onClick={() => setActiveComponent('TicTacToe')}>Jogo da Velha</li>
            <li onClick={() => setActiveComponent('Calculator')}>Calculadora</li>
            <li onClick={() => setActiveComponent('CepFinder')}>Buscador de CEP</li>
          </ul>
        </nav>

        <main className="App-main">
          {renderComponent()}
        </main>
      </div>
    </div>
  );
}

export default App;