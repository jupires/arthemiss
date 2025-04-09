import React, { useState } from 'react';

const Calculator = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const handleClick = (value) => {
    setInput(input + value);
  };

  const calculate = () => {
    try {
      setResult(eval(input).toString());
    } catch (error) {
      setResult('Erro');
    }
  };

  const clear = () => {
    setInput('');
    setResult('');
  };

  return (
    <div className="component-container">
      <h2>Calculadora</h2>
      <div className="calculator">
        <div className="display">
          <div className="input">{input}</div>
          <div className="result">{result}</div>
        </div>
        <div className="buttons">
          <button onClick={() => handleClick('7')}>7</button>
          <button onClick={() => handleClick('8')}>8</button>
          <button onClick={() => handleClick('9')}>9</button>
          <button onClick={() => handleClick('+')}>+</button>
          
          <button onClick={() => handleClick('4')}>4</button>
          <button onClick={() => handleClick('5')}>5</button>
          <button onClick={() => handleClick('6')}>6</button>
          <button onClick={() => handleClick('-')}>-</button>
          
          <button onClick={() => handleClick('1')}>1</button>
          <button onClick={() => handleClick('2')}>2</button>
          <button onClick={() => handleClick('3')}>3</button>
          <button onClick={() => handleClick('*')}>*</button>
          
          <button onClick={() => handleClick('0')}>0</button>
          <button onClick={() => handleClick('.')}>.</button>
          <button onClick={calculate}>=</button>
          <button onClick={() => handleClick('/')}>/</button>
          
          <button onClick={clear} className="clear">C</button>
        </div>
      </div>
      
      <style jsx>{`
        .calculator {
          width: 200px;
          margin: 0 auto;
          border: 1px solid #ccc;
          padding: 10px;
          border-radius: 5px;
        }
        .display {
          margin-bottom: 10px;
          padding: 10px;
          background: #f5f5f5;
          text-align: right;
        }
        .input {
          font-size: 18px;
          min-height: 24px;
        }
        .result {
          font-size: 24px;
          font-weight: bold;
          min-height: 28px;
        }
        .buttons {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          grid-gap: 5px;
        }
        button {
          padding: 10px;
          font-size: 18px;
        }
        .clear {
          grid-column: span 4;
          background: #ff6b6b;
          color: white;
        }
      `}</style>
    </div>
  );
};

export default Calculator;