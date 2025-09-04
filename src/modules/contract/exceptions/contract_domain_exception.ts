export default class ContractDomainException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ContractDomainException';
  }
}
