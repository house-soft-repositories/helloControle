import ErrorMessages from '@/core/constants/error_messages';
import AppException from '@/core/exceptions/app_exception';

export class UserRepositoryException extends AppException {
  constructor(message: string, statusCode: number = 500, cause?: Error) {
    super(message, statusCode, cause);
  }
}
export class UserRepositoryNotFoundException extends UserRepositoryException {
  constructor() {
    super(ErrorMessages.USER_NOT_FOUND, 404, undefined);
  }
}
