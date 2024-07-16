import React from 'react';
import KanbanBoard from './components/KanbanBoard';
import './styles.css';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Kanban Board</h1>
      </header>
      <KanbanBoard />
    </div>
  );
};

export default App;
