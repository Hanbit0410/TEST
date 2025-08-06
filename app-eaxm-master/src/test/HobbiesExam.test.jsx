import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, beforeEach } from 'vitest'
import HobbiesExam from '../exam/HobbiesExam'

describe('HobbiesExam', () => {
  let user

  beforeEach(() => {
    render(<HobbiesExam />)
    user = userEvent.setup()
  });

  it('1. 모든 체크박스가 렌더링된다', () => {
    const checkboxes = screen.getAllByRole('checkbox')
    expect(checkboxes).toHaveLength(4)
    expect(checkboxes.map(cb => cb.value)).toEqual(['영화', '음악감상', '산책', '게임하기'])
  });

  it('2. 체크박스를 클릭하면 선택 상태가 반영된다', async () => {
    const checkbox = screen.getByDisplayValue('영화')
    await user.click(checkbox)
    expect(checkbox.checked).toBe(true)
  });

  it('3. 체크박스를 해제하면 선택 목록에서 제거된다', async () => {
    const checkbox = screen.getByDisplayValue('음악감상')
    await user.click(checkbox)
    await user.click(checkbox)
    expect(checkbox.checked).toBe(false)
  });

  it('4. 확인 버튼 클릭 시 선택된 취미가 결과에 표시된다', async () => {
    const checkbox = screen.getByDisplayValue('산책')
    await user.click(checkbox)
    const button = screen.getByRole('button', { name: '확인' })
    await user.click(button)
    expect(screen.getByTestId('result').textContent).toBe('산책')
  });

  it('5. 여러 개 선택 시 쉼표로 구분된 결과가 표시된다', async () => {
    await user.click(screen.getByDisplayValue('게임하기'))
    await user.click(screen.getByDisplayValue('영화'))
    await user.click(screen.getByRole('button', { name: '확인' }))
    expect(screen.getByTestId('result').textContent).toBe('게임하기, 영화')
  });

  it('6. 아무것도 선택하지 않고 확인 버튼 클릭 시 "선택 없음"이 표시된다', async () => {
    await user.click(screen.getByRole('button', { name: '확인' }))
    expect(screen.getByTestId('result').textContent).toBe('선택 없음')
  });
});