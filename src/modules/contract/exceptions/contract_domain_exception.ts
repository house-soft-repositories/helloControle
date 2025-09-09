import AppException from '@/core/exceptions/app_exception';

export default class ContractDomainException extends AppException {
  constructor(message: string, statusCode = 400, error?: Error) {
    super(message, statusCode, error);
  }
}
