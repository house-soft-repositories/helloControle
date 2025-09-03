import AppException from '@/core/exceptions/app_exception';

export default class ContractRepositoryException extends AppException {
  constructor(message: string, cause?: Error) {
    super(message, 500, cause);
    this.name = 'ContractRepositoryException';
  }
}
