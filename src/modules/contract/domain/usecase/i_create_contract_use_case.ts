import BaseFileInterface from '@/core/interface/base_file_interface';
import UseCase from '@/core/interface/use_case';
import ContractEntity from '@/modules/contract/domain/entities/contract.entity';
import ItemTypeEnum from '@/modules/contract/domain/entities/item_type.enum';

export default interface ICreateContractUseCase
  extends UseCase<CreateContractParam, CreateContractResponse> {}

export class CreateContractParam {
  constructor(
    public readonly id: string,
    public readonly valorTotal: number,
    public readonly valorGlosado: number,
    public readonly dataAssinatura: Date,
    public readonly dataVencimento: Date,
    public readonly organId: number,
    public readonly companyId: number,
    public readonly cityId: number,
    public readonly items: {
      name: string;
      description?: string | null;
      unitPrice: number;
      totalPrice?: number;
      amountUsed: number;
      quantityUsed?: number | null;
      quantityTotal?: number | null;
      type: ItemTypeEnum;
    }[],
    public readonly contractFile: BaseFileInterface,
    public readonly nome?: string,
    public readonly descricao?: string,
    public readonly cidadeContratante?: string,
  ) {}
}
export class CreateContractResponse {
  constructor(public readonly contractEntity: ContractEntity) {}

  fromResponse() {
    return this.contractEntity.toObject();
  }
}
