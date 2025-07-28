import React from 'react';
import { useTodoContext } from '../context/TodoContext';

function TodoControls({ checkedIds, setCheckedIds, onCheckAll }) {
  const { dispatch } = useTodoContext();

  const handleAllComplete = () => {
    if (checkedIds.length === 0) {
      alert('일괄 완료할 일감을 체크해주십시오.');
      return;
    }
    dispatch({ type: 'ALL_COMPLETE', payload: checkedIds });
    setCheckedIds([]);
  };

  const handleAllelete = () => {
    if (checkedIds.length === 0) {
      alert('일괄 삭제할 일감을 체크해주십시오.');
      return;
    }
    dispatch({ type: 'ALL_DELETE', payload: checkedIds });
    setCheckedIds([]);
  };

  return (
    <div className="todo-controls">
      <button className="check-all" onClick={onCheckAll}>일괄 선택</button>
      <button className="all-complete" onClick={handleAllComplete}>일괄 완료</button>
      <button className="all-delete" onClick={handleAllelete}>일괄 삭제</button>
    </div>
  );
}

export default TodoControls;