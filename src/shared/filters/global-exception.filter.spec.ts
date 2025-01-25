import { GlobalExceptionFilter } from './global-exception.filter';
import { CustomLogger } from './logger';

describe('GlobalExceptionFilter', () => {
  it('should be defined', () => {
    expect(new GlobalExceptionFilter(new CustomLogger())).toBeDefined();
  });
});
