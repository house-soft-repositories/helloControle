import AppException from '@/core/exceptions/app_exception';

export default class ServiceException extends AppException {
  constructor(message: string, statusCode: number = 400) {
    super(message, statusCode);
  }
}
