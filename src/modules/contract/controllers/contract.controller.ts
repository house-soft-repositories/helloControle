import CreateContractService from '@/modules/contract/application/create_contract.service';
import FindAllContractsService from '@/modules/contract/application/find_all_contracts.service';
import ContractDto from '@/modules/contract/dtos/contract.dto';
import CreateContractDto from '@/modules/contract/dtos/create_contract.dto';
import {
  CREATE_CONTRACT_SERVICE,
  FIND_ALL_CONTRACTS_SERVICE,
} from '@/modules/contract/symbols';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  Inject,
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
  ) {}

  @HttpCode(201)
  @Post('')
  async create(@Body() contractData: CreateContractDto) {
    const result = await this.createContractService.execute(contractData);
    if (result.isLeft()) {
      throw new HttpException(
        result.value.message,
        result.value.statusCode || 500,
        {
          cause: result.value.cause,
        },
      );
    }
    return plainToClass(ContractDto, {
      ...result.value.toObject(),
    });
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
}
