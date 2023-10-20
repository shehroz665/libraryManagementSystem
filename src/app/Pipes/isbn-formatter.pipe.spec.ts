import { IsbnFormatterPipe } from './isbn-formatter.pipe';

describe('IsbnFormatterPipe', () => {
  it('create an instance', () => {
    const pipe = new IsbnFormatterPipe();
    expect(pipe).toBeTruthy();
  });
});
