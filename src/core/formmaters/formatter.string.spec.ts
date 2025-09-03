import { FormatterString } from '@/core/formmaters/formatter.string';

describe('FormatterString', () => {
  describe('capitalizeAll', () => {
    it('should convert entire string to uppercase', () => {
      expect(FormatterString.capitalizeAll('hello world')).toBe('HELLO WORLD');
      expect(FormatterString.capitalizeAll('Hello World')).toBe('HELLO WORLD');
      expect(FormatterString.capitalizeAll('HELLO WORLD')).toBe('HELLO WORLD');
    });

    it('should handle empty string', () => {
      expect(FormatterString.capitalizeAll('')).toBe('');
    });

    it('should handle null and undefined', () => {
      expect(FormatterString.capitalizeAll(null as any)).toBe('');
      expect(FormatterString.capitalizeAll(undefined as any)).toBe('');
    });

    it('should handle non-string values', () => {
      expect(FormatterString.capitalizeAll(123 as any)).toBe('');
    });
  });

  describe('capitalizeFirst', () => {
    it('should capitalize only first letter', () => {
      expect(FormatterString.capitalizeFirst('hello world')).toBe(
        'Hello world',
      );
      expect(FormatterString.capitalizeFirst('HELLO WORLD')).toBe(
        'Hello world',
      );
      expect(FormatterString.capitalizeFirst('hELLO wORLD')).toBe(
        'Hello world',
      );
    });

    it('should handle single character', () => {
      expect(FormatterString.capitalizeFirst('h')).toBe('H');
      expect(FormatterString.capitalizeFirst('H')).toBe('H');
    });

    it('should handle empty string', () => {
      expect(FormatterString.capitalizeFirst('')).toBe('');
    });
  });

  describe('capitalizeWords', () => {
    it('should capitalize first letter of each word', () => {
      expect(FormatterString.capitalizeWords('hello world')).toBe(
        'Hello World',
      );
      expect(FormatterString.capitalizeWords('HELLO WORLD')).toBe(
        'Hello World',
      );
      expect(FormatterString.capitalizeWords('hELLO wORLD')).toBe(
        'Hello World',
      );
    });

    it('should handle single word', () => {
      expect(FormatterString.capitalizeWords('hello')).toBe('Hello');
    });

    it('should handle multiple spaces', () => {
      expect(FormatterString.capitalizeWords('hello  world')).toBe(
        'Hello  World',
      );
    });
  });

  describe('toLowercase', () => {
    it('should convert entire string to lowercase', () => {
      expect(FormatterString.toLowercase('HELLO WORLD')).toBe('hello world');
      expect(FormatterString.toLowercase('Hello World')).toBe('hello world');
      expect(FormatterString.toLowercase('hello world')).toBe('hello world');
    });
  });

  describe('normalizeWhitespace', () => {
    it('should remove extra whitespace', () => {
      expect(FormatterString.normalizeWhitespace('  hello   world  ')).toBe(
        'hello world',
      );
      expect(FormatterString.normalizeWhitespace('hello\t\tworld')).toBe(
        'hello world',
      );
      expect(FormatterString.normalizeWhitespace('hello\n\nworld')).toBe(
        'hello world',
      );
    });

    it('should handle string with no extra whitespace', () => {
      expect(FormatterString.normalizeWhitespace('hello world')).toBe(
        'hello world',
      );
    });
  });
});
