import AppException from '@/core/exceptions/app_exception';

export default class CityEntityDomainException extends AppException {
  constructor(message: string, statusCode: number = 500, cause?: Error) {
    super(message, statusCode, cause);
  }
}
