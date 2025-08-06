import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, beforeEach } from 'vitest';
import CounterExam from '../exam/CounterExam';

describe('CounterExam', ()=>{
  let user;

  beforeEach(()=>{
    render(<CounterExam/>);
    user = userEvent.setup();
  });

  it('1. 초기 카운트가 0으로 표시된다', ()=>{
    expect(screen.getByText('결과 : 0')).toBeInTheDocument();
  });

  it('2. "증가하기" 버튼 클릭 시 카운트가 1씩 증가한다', async()=>{
    const incButton = screen.getByRole('button', {name:'증가하기'});

    await user.click(incButton);
    expect(screen.getByText('결과 : 1')).toBeInTheDocument();

    await user.click(incButton);
    expect(screen.getByText('결과 : 2')).toBeInTheDocument();
  });

  it('3. "감소하기" 버튼 클릭 시 카운트가 1씩 감소한다', async()=>{
    const decButton =screen.getByRole('button', {name:'감소하기'});

    await user.click(decButton);
    expect(screen.getByText('결과 : -1')).toBeInTheDocument();

    await user.click(decButton);
    expect(screen.getByText('결과 : -2')).toBeInTheDocument();
  });

  it('4. 버튼이 총 2개 존재한다', () => {
  const buttons = screen.getAllByRole('button');
  expect(buttons.length).toBe(2);
  });

  it('5. 빠르게 여러 번 클릭해도 정상 작동한다', async()=>{
    const incButton = screen.getByRole('button', {name:'증가하기'});
    const decButton =screen.getByRole('button', {name:'감소하기'});
    
    for(let i = 0; i<10; i++){
      await user.click(incButton);
    }
    expect(screen.getByText('결과 : 10')).toBeInTheDocument();

    for(let i = 0; i < 15; i++){
      await user.click(decButton);
    }
    expect(screen.getByText('결과 : -5')).toBeInTheDocument();
  });

  it('5-1. 증가, 감소를 여러 번 해도 정확한 결과 출력', async()=>{
    const incButton = screen.getByRole('button', {name:'증가하기'});
    const decButton =screen.getByRole('button', {name:'감소하기'});

    await user.click(incButton);
    await user.click(incButton);
    await user.click(decButton);
    await user.click(incButton);
    await user.click(decButton);
    await user.click(decButton);

    expect(screen.getByText('결과 : 0')).toBeInTheDocument();
  });

  it('6. 증가 후 감소하면 값이 원래대로 돌아온다', async ()=>{
    const incButton = screen.getByRole('button', {name:'증가하기'});
    const decButton =screen.getByRole('button', {name:'감소하기'});

    await user.click(incButton);
    await user.click(incButton);
    await user.click(decButton);
    await user.click(decButton);
    expect(screen.getByText('결과 : 0')).toBeInTheDocument();
  });
});