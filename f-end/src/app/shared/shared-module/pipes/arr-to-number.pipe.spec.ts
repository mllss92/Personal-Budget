import { ArrToNumberPipe } from './arr-to-number.pipe';

describe('ArrToNumberPipe', () => {
  let pipe: ArrToNumberPipe;

  beforeEach(() => {
    pipe = new ArrToNumberPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('должен вернуть сумму всех чисел в массиве', () => {
    expect(pipe.transform([2, 2])).toBe(4);
  });
});
