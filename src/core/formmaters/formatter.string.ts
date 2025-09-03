/**
 * Abstract helper class for string formatting operations
 * Provides static methods for various string manipulations
 */
export abstract class FormatterString {
  /**
   * Capitalizes the entire string (converts all characters to uppercase)
   * @param text - The string to be capitalized
   * @returns The capitalized string
   * @example
   * FormatterHelper.capitalizeAll('hello world') // returns 'HELLO WORLD'
   */
  static capitalizeAll(text: string): string {
    if (!text || typeof text !== 'string') {
      return '';
    }
    return text.toUpperCase();
  }

  /**
   * Capitalizes only the first letter of the string
   * @param text - The string to be capitalized
   * @returns The string with first letter capitalized
   * @example
   * FormatterHelper.capitalizeFirst('hello world') // returns 'Hello world'
   */
  static capitalizeFirst(text: string): string {
    if (!text || typeof text !== 'string') {
      return '';
    }
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  }

  /**
   * Capitalizes the first letter of each word in the string
   * @param text - The string to be title cased
   * @returns The title cased string
   * @example
   * FormatterHelper.capitalizeWords('hello world') // returns 'Hello World'
   */
  static capitalizeWords(text: string): string {
    if (!text || typeof text !== 'string') {
      return '';
    }
    return text
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  /**
   * Converts the entire string to lowercase
   * @param text - The string to be lowercased
   * @returns The lowercased string
   * @example
   * FormatterHelper.toLowercase('HELLO WORLD') // returns 'hello world'
   */
  static toLowercase(text: string): string {
    if (!text || typeof text !== 'string') {
      return '';
    }
    return text.toLowerCase();
  }

  /**
   * Removes extra whitespace and trims the string
   * @param text - The string to be normalized
   * @returns The normalized string
   * @example
   * FormatterHelper.normalizeWhitespace('  hello   world  ') // returns 'hello world'
   */
  static normalizeWhitespace(text: string): string {
    if (!text || typeof text !== 'string') {
      return '';
    }
    return text.trim().replace(/\s+/g, ' ');
  }
}
