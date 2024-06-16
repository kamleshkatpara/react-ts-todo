import React, { useState } from 'react';
import { TodoList } from './components/TodoList';
import { NewTodo } from './components/NewTodo';
import { Todo } from './todo.model';

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [formError, setFormError] = useState<string>('');


  const handleAdd = (text: string) => {
    if (!text) {
      setFormError('Please enter description');
      setTimeout(() => {
        setFormError('')
      }, 3000);
      return;
    }
    setTodos([...todos, { id: String(todos.length + 1), text: text }]);
  };


  const handleEdit = (id: string, newText: string) => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, text: newText };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const handleDelete = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };



  return (
    <main>
      <div className="px-4 py-5 my-5 text-center">
        <h1 className='display-5 fw-bold text-body-emphasis'>Todos Application</h1>
        <div className='input-group mb-3 px-5'>
          <NewTodo onAddTodo={handleAdd} formError={formError} />
        </div>
        {formError && (
          <p className='text-danger fade-in-out'>{formError}</p>
        )}
        <TodoList
          todos={todos}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </main>
  );
}

export default App;
