import React, { useState, useCallback } from 'react';
import { useTodoContext } from '../context/TodoContext';

function TodoInput() {
  const { state, dispatch } = useTodoContext();
  const [text, setText] = useState('');

  const handleAdd = useCallback(() => {
    if (!text.trim()) {
      alert('할 일을 입력하세요'); // 입력이 없으면 알림창
      return;
    }
    if (!state.currentUser) {
      alert('로그인 후 할 일을 추가할 수 있습니다.');
      return;
    }
    dispatch({
      type: 'ADD_TODO',
      payload: {
        id: Date.now(),
        text: text.trim(),
        completed: false,
      },
    });
    setText('');
  }, [text, dispatch, state.currentUser]);

  return (
    <div className="todo-input">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="할 일을 입력하세요"
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleAdd();
        }}
      />
      <button onClick={handleAdd}>등록</button>
    </div>
  );
}

export default TodoInput;
