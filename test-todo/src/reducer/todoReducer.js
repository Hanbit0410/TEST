export const initialState = {
  currentUser: null,
  todos: {
    '이현준': [],
    '이철수': [],
    '김영희': [],
  },
};

export function todoReducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, currentUser: action.payload };
    case 'LOGOUT':
      return { ...state, currentUser: null };
    case 'ADD_TODO':
      if (!state.currentUser) return state;
      return {
        ...state,
        todos: {
          ...state.todos,
          [state.currentUser]: [...state.todos[state.currentUser], action.payload],
        },
      };
    case 'TOGGLE_COMPLETE':
      return {
        ...state,
        todos: {
          ...state.todos,
          [state.currentUser]: state.todos[state.currentUser].map(todo =>
            todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
          ),
        },
      };
    case 'DELETE_TODO':
      return {
        ...state,
        todos: {
          ...state.todos,
          [state.currentUser]: state.todos[state.currentUser].filter(todo => todo.id !== action.payload),
        },
      };
    case 'ALL_COMPLETE': 
      return {
        ...state,
        todos: {
          ...state.todos,
          [state.currentUser]: state.todos[state.currentUser].map(todo =>
            action.payload.includes(todo.id) ? { ...todo, completed: true } : todo
          ),
        },
      };
    case 'ALL_DELETE': 
      return {
        ...state,
        todos: {
          ...state.todos,
          [state.currentUser]: state.todos[state.currentUser].filter(todo => !action.payload.includes(todo.id)),
        },
      };
    default:
      return state;
  }
}
