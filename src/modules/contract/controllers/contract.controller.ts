import CreateContractService from '@/modules/contract/application/create_contract.service';
import FindAllContractsService from '@/modules/contract/application/find_all_contracts.service';
import FindContractByIdService from '@/modules/contract/application/find_contract_by_id.service';
import { CreateContractParam } from '@/modules/contract/domain/usecase/i_create_contract_use_case';
import ContractDto from '@/modules/contract/dtos/contract.dto';
import CreateContractDto from '@/modules/contract/dtos/create_contract.dto';
import {
  CREATE_CONTRACT_SERVICE,
  FIND_ALL_CONTRACTS_SERVICE,
  FIND_CONTRACT_BY_ID_SERVICE,
} from '@/modules/contract/symbols';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  Inject,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';

@Controller('api/contract')
export default class ContractController {
  constructor(
    @Inject(CREATE_CONTRACT_SERVICE)
    private readonly createContractService: CreateContractService,
    @Inject(FIND_ALL_CONTRACTS_SERVICE)
    private readonly findAllContractsService: FindAllContractsService,
    @Inject(FIND_CONTRACT_BY_ID_SERVICE)
    private readonly findContractByIdService: FindContractByIdService,
  ) {}

  @HttpCode(201)
  @Post('')
  async create(@Body() contractData: CreateContractDto) {
    const param = new CreateContractParam(
      contractData.id,
      contractData.valorTotal,
      contractData.valorGlosado,
      contractData.dataAssinatura,
      contractData.dataVencimento,
      contractData.orgaoContratante,
      contractData.empresaContratada,
      contractData.items.map(item => ({
        ...item,
      })),
      contractData.nome,
      contractData.descricao,
      contractData.cidadeContratante,
    );
    const result = await this.createContractService.execute(param);

    if (result.isLeft()) {
      throw new HttpException(
        result.value.message,
        result.value.statusCode || 500,
        {
          cause: result.value.cause,
        },
      );
    }
    return result.value.fromResponse();
  }

  @HttpCode(200)
  @Get('')
  async findAll() {
    const result = await this.findAllContractsService.execute();
    if (result.isLeft()) {
      throw new HttpException(
        result.value.message,
        result.value.statusCode || 500,
        {
          cause: result.value.cause,
        },
      );
    }
    return result.value.map(contract =>
      plainToClass(ContractDto, contract.toObject()),
    );
  }

  @HttpCode(200)
  @Get(':id')
  async findById(@Param('id') id: string) {
    const result = await this.findContractByIdService.execute(id);
    if (result.isLeft()) {
      throw new HttpException(
        result.value.message,
        result.value.statusCode || 500,
        {
          cause: result.value.cause,
        },
      );
    }

    if (!result.value) {
      throw new NotFoundException(`Contrato com ID ${id} não encontrado`);
    }

    return plainToClass(ContractDto, result.value.toObject());
  }
}
