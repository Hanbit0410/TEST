import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import TodoList from '../exam/TodoList'

describe('TodoList Component', () => {
  let user

  beforeEach(() => {
    render(<TodoList />)
    user = userEvent.setup()
    vi.spyOn(window, 'alert').mockImplementation(() => {})
  });

  it('1. 입력창과 추가 버튼이 렌더링된다', () => {
    expect(screen.getByLabelText('할 일')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '추가' })).toBeInTheDocument()
  });

  it('2. 입력값 없이 추가 버튼 클릭 시 alert가 호출된다', async () => {
    await user.click(screen.getByRole('button', { name: '추가' }))
    expect(window.alert).toHaveBeenCalledWith('할일을 입력')
  });

  it('3. 입력값 입력 시 할 일 목록에 추가된다', async () => {
    const input = screen.getByLabelText('할 일')
    const button = screen.getByRole('button', { name: '추가' })

    await user.type(input, '공부하기')
    await user.click(button)

    expect(screen.getByText('공부하기')).toBeInTheDocument()
  });

  it('4. 추가된 할 일이 테이블에 아이디와 함께 표시된다', async () => {
    const input = screen.getByLabelText('할 일')
    const button = screen.getByRole('button', { name: '추가' })

    await user.type(input, '테스트 작성하기')
    await user.click(button)

    expect(screen.getByText('테스트 작성하기')).toBeInTheDocument()
    expect(screen.getByText('1')).toBeInTheDocument() 
  });

  it('5. 여러 개의 할 일을 추가하면 모두 표시된다', async () => {
    const input = screen.getByLabelText('할 일')
    const button = screen.getByRole('button', { name: '추가' })

    const todos = ['개발 복습', 'React Hooks', 'Vitest 공부']
    for (const todo of todos) {
      await user.clear(input)
      await user.type(input, todo)
      await user.click(button)
    }

    todos.forEach((todo) => {
      expect(screen.getByText(todo)).toBeInTheDocument()
    });

    expect(screen.getByText('3')).toBeInTheDocument()
  });
});