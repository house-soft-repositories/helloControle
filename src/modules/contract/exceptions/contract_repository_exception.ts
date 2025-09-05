import AppException from '@/core/exceptions/app_exception';

export default class ContractRepositoryException extends AppException {
  constructor(message: string, statusCode: number = 400, cause?: Error) {
    super(message, statusCode, cause);
    this.name = 'ContractRepositoryException';
  }

  static notFound(id?: string, uuid?: string): ContractRepositoryException {
    return new ContractRepositoryException(
      `Contract with ID ${id} not found or Contract with UUID ${uuid} not found`,
      404,
    );
  }
}
