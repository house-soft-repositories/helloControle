export default class AppException extends Error {
  constructor(
    message: string,
    public readonly statusCode: number = 500,
    cause?: Error,
  ) {
    super(message, { cause });
    this.name = 'AppException';
    this.statusCode = statusCode;

    if (cause?.stack) {
      this.stack = cause.stack;
    }
  }
}
