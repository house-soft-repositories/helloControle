import AppException from '@/core/exceptions/app_exception';

export default class CityRepositoryException extends AppException {
  constructor(message: string, statusCode: number = 400, cause?: Error) {
    super(message, statusCode, cause);
  }

  static cityNotFound(cityId?: number) {
    return new CityRepositoryException(`City with ID ${cityId} not found`, 404);
  }
}
