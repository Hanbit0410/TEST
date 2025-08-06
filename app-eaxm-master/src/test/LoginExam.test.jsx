import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import LoginExam from '../exam/LoginExam'

describe('LoginExam', () => {
  let user

  beforeEach(() => {
    render(<LoginExam />)
    user = userEvent.setup()
    vi.spyOn(window, 'alert').mockImplementation(() => {})
  });

  it('1. 아이디와 비밀번호 입력창이 렌더링된다', () => {
    expect(screen.getByLabelText('아이디')).toBeInTheDocument()
    expect(screen.getByLabelText('비밀번호')).toBeInTheDocument()
  });

  it('2. 아이디, 비밀번호를 모두 미입력 시 경고창 표시', async () => {
    const loginButton = screen.getByRole('button', { name: '로그인' })
    await user.click(loginButton)
    expect(window.alert).toHaveBeenCalledWith('아이디와 비밀번호를 입력하세요')
  });

  it('3. 아이디만 입력 후 로그인 시 비밀번호 경고창 표시', async () => {
    await user.type(screen.getByLabelText('아이디'), 'testuser')
    await user.click(screen.getByRole('button', { name: '로그인' }))
    expect(window.alert).toHaveBeenCalledWith('비밀번호를 입력하세요')
  });

  it('4. 비밀번호만 입력 후 로그인 시 아이디 경고창 표시', async () => {
    await user.type(screen.getByLabelText('비밀번호'), '1234')
    await user.click(screen.getByRole('button', { name: '로그인' }))
    expect(window.alert).toHaveBeenCalledWith('아이디를 입력하세요')
  });

  it('5. 아이디와 비밀번호 모두 입력하면 로그인 성공 메시지 표시', async () => {
    await user.type(screen.getByLabelText('아이디'), '현준')
    await user.type(screen.getByLabelText('비밀번호'), 'securepw')
    await user.click(screen.getByRole('button', { name: '로그인' }))
    expect(window.alert).toHaveBeenCalledWith('로그인 성공: 현준')
  });

  it('6. 입력 필드에 입력값이 반영되는지 확인', async () => {
    const idInput = screen.getByLabelText('아이디')
    const pwInput = screen.getByLabelText('비밀번호')

    await user.type(idInput, 'hello')
    await user.type(pwInput, 'world')

    expect(idInput).toHaveValue('hello')
    expect(pwInput).toHaveValue('world')
  });
});