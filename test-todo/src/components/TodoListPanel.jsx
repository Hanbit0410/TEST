import React from 'react';
import { useTodoContext } from '../context/TodoContext';
import TodoItem from './TodoItem';

function TodoListPanel({ checkedIds, toggleChecked }) {
  const { state } = useTodoContext();
  const currentUser = state.currentUser;
  const todos = currentUser ? state.todos[currentUser] : [];

  return (
    <div className="todo-list-panel">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          checked={checkedIds.includes(todo.id)}
          onCheck={toggleChecked}
        />
      ))}
    </div>
  );
}

export default TodoListPanel;
