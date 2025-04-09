import React, { useState } from 'react';

const ClickCounter = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="component-container">
      <h2>Contador de Cliques</h2>
      <p>Você clicou {count} vezes</p>
      <button onClick={() => setCount(count + 1)}>Clique aqui</button>
      <button onClick={() => setCount(0)}>Zerar</button>
    </div>
  );
};

export default ClickCounter;