import React, { useState } from 'react';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleAddTodo = () => {
    if (inputValue.trim()) {
      setTodos([...todos, { text: inputValue, completed: false }]);
      setInputValue('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddTodo();
    }
  };

  const handleToggleTodo = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  const handleDeleteTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>To-Do List</h2>
      <div style={styles.inputContainer}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Adicione uma tarefa..."
          style={styles.input}
        />
        <button onClick={handleAddTodo} style={styles.addButton}>
          <i className="fas fa-plus" style={styles.icon}></i>
        </button>
      </div>
      <div style={styles.todosContainer}>
        {todos.map((todo, index) => (
          <div 
            key={index} 
            style={{
              ...styles.todoCard,
              backgroundColor: todo.completed ? '#f0f0f0' : '#fff',
              borderLeft: `5px solid ${todo.completed ? '#a5d8ff' : '#74b9ff'}`
            }}
          >
            <span style={{
              ...styles.todoText,
              textDecoration: todo.completed ? 'line-through' : 'none',
              color: todo.completed ? '#999' : '#333'
            }}>
              {todo.text}
            </span>
            <div style={styles.buttonsContainer}>
              <button 
                onClick={() => handleToggleTodo(index)} 
                style={{
                  ...styles.actionButton,
                  backgroundColor: todo.completed ? '#a5d8ff' : '#74b9ff'
                }}
              >
                {todo.completed ? (
                  <i className="fas fa-undo" style={styles.icon}></i>
                ) : (
                  <i className="fas fa-check" style={styles.icon}></i>
                )}
              </button>
              <button 
                onClick={() => handleDeleteTodo(index)} 
                style={{
                  ...styles.actionButton,
                  backgroundColor: '#ff7675'
                }}
              >
                <i className="fas fa-trash" style={styles.icon}></i>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Estilo moderno Pinterest/Aesthetic
const styles = {
  container: {
    maxWidth: '500px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: "'Poppins', sans-serif",
    backgroundColor: '#fafafa',
    borderRadius: '15px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
  },
  title: {
    textAlign: 'center',
    color: '#333',
    fontSize: '28px',
    marginBottom: '25px',
    fontWeight: '600',
    letterSpacing: '1px'
  },
  inputContainer: {
    display: 'flex',
    marginBottom: '25px',
    gap: '10px'
  },
  input: {
    flex: 1,
    padding: '12px 15px',
    border: 'none',
    borderRadius: '25px',
    fontSize: '16px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.05)',
    outline: 'none',
    transition: 'all 0.3s ease',
    backgroundColor: '#fff'
  },
  addButton: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    border: 'none',
    backgroundColor: '#74b9ff',
    color: 'white',
    cursor: 'pointer',
    boxShadow: '0 4px 10px rgba(116, 185, 255, 0.3)',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  todosContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '15px'
  },
  todoCard: {
    backgroundColor: '#fff',
    padding: '18px',
    borderRadius: '12px',
    boxShadow: '0 3px 10px rgba(0, 0, 0, 0.05)',
    display: 'flex',
    flexDirection: 'column',
    transition: 'all 0.3s ease',
    position: 'relative',
    overflow: 'hidden'
  },
  todoText: {
    fontSize: '16px',
    marginBottom: '15px',
    wordBreak: 'break-word'
  },
  buttonsContainer: {
    display: 'flex',
    gap: '8px',
    marginTop: 'auto',
    alignSelf: 'flex-end'
  },
  actionButton: {
    width: '35px',
    height: '35px',
    borderRadius: '50%',
    border: 'none',
    color: 'white',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s ease'
  },
  icon: {
    fontSize: '14px'
  }
};

export default TodoList;