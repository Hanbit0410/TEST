import React, { useMemo } from 'react';
import { useTodoContext } from '../context/TodoContext';

function TodoPanel() {
  const { state } = useTodoContext();
  const currentUser = state.currentUser;

  const { total, done, rate } = useMemo(() => {
    const todos = currentUser ? state.todos[currentUser] : [];
    const total = todos.length;
    const done = todos.filter((t) => t.completed).length;
    const rate = total === 0 ? 0 : Math.round((done / total) * 100);
    return { total, done, rate };
  }, [state.todos, currentUser]);

  return (
    <div className="todo-panel">
      <p>할 일: {total}개</p>
      <p>한 일: {done}개</p>
      <p>달성률: {rate}%</p>
    </div>
  );
}

export default TodoPanel;