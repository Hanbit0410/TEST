import React from 'react';
import { useTodoContext } from '../context/TodoContext';

function TodoItem({ todo, checked, onCheck }) {
  const { dispatch } = useTodoContext();

  const handleComplete = () => {
    dispatch({ type: 'TOGGLE_COMPLETE', payload: todo.id });
  };

  const handleDelete = () => {
    dispatch({ type: 'DELETE_TODO', payload: todo.id });
  };

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={checked}
        onChange={() => onCheck(todo.id)}
      />
      <span>{todo.text}</span>
      <button className='complete' onClick={handleComplete}>완료</button>
      <button className='delete' onClick={handleDelete}>삭제</button>
    </div>
  );
}

export default TodoItem;