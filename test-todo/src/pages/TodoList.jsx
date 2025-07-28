import React, { useReducer, useMemo, useState, useCallback } from 'react';
import { TodoContext } from '../context/TodoContext';
import { todoReducer, initialState } from '../reducer/todoReducer';
import TodoInput from '../components/TodoInput';
import TodoControls from '../components/TodoControls';
import TodoListPanel from '../components/TodoListPanel';
import TodoUser from '../components/TodoUser';
import TodoPanel from '../components/TodoPanel';
import '../assets/css/todolist.css';

export default function TodoList() {
  const [state, dispatch] = useReducer(todoReducer, initialState);
  const [checkedIds, setCheckedIds] = useState([]);

  const toggleChecked = useCallback((id) => {
    setCheckedIds((prev) =>
      prev.includes(id) ? prev.filter(v => v !== id) : [...prev, id]
    );
  }, []);

  const checkAll = useCallback(() => {
    const allIds = state.currentUser ? (state.todos[state.currentUser]?.map(todo => todo.id) || []) : [];
    setCheckedIds(allIds);
  }, [state.currentUser, state.todos]);

  const contextValue = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return (
    <TodoContext.Provider value={contextValue}>
      <div className="todo-wrapper">
        <h1>TodoList</h1>
        <TodoUser />
        {state.currentUser && (
          <>
            <TodoPanel />
            <TodoInput />
            <TodoControls
              checkedIds={checkedIds}
              setCheckedIds={setCheckedIds}
              onCheckAll={checkAll}
            />
            <TodoListPanel
              checkedIds={checkedIds}
              toggleChecked={toggleChecked}
            />
          </>
        )}
      </div>
    </TodoContext.Provider>
  );
}