import React, { useState, useCallback } from 'react';
import { useTodoContext } from '../context/TodoContext';

function TodoUser() {
  const { state, dispatch } = useTodoContext();
  const [selectedUser, setSelectedUser] = useState('');

  const handleLogin = useCallback(() => {
    if (!selectedUser) {
      alert('로그인할 유저를 선택하십시오');
      return;
    }
    dispatch({ type: 'LOGIN', payload: selectedUser });
  }, [selectedUser, dispatch]);

  const handleLogout = useCallback(() => {
    dispatch({ type: 'LOGOUT' });
    setSelectedUser('');
  }, [dispatch]);

  return (
    <div className="todo-user">
      <select
        value={selectedUser}
        onChange={(e) => setSelectedUser(e.target.value)}
        disabled={!!state.currentUser}
      >
        <option value="">유저 선택</option>
        <option value="이현준">이현준</option>
        <option value="이철수">이철수</option>
        <option value="김영희">김영희</option>
      </select>
      {!state.currentUser ? (
        <button onClick={handleLogin}>로그인</button>
      ) : (
        <button onClick={handleLogout}>로그아웃</button>
      )}
      <span className="username-label">
        {state.currentUser ? `로그인 유저명: ${state.currentUser}` : '로그인 유저명: '}
      </span>
    </div>
  );
}

export default TodoUser;