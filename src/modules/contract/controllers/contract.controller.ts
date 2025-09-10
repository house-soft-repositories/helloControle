import { User } from '@/core/decorators/user_request.decorator';
import AuthGuard from '@/core/guard/auth.guard';
import CreateContractService from '@/modules/contract/application/create_contract.service';
import FindAllContractsService from '@/modules/contract/application/find_all_contracts.service';
import FindContractByIdService from '@/modules/contract/application/find_contract_by_id.service';
import { contractFileUploadConfig } from '@/modules/contract/config/multer.config';
import IGetContractByCityUseCase from '@/modules/contract/domain/usecase/i_get_contracts_by_city_use_case';
import ContractDto from '@/modules/contract/dtos/contract.dto';
import CreateContractDto from '@/modules/contract/dtos/create_contract.dto';
import CreateContractWithFileDto from '@/modules/contract/dtos/create_contract_with_file.dto';
import {
  CREATE_CONTRACT_SERVICE,
  FIND_ALL_CONTRACTS_SERVICE,
  FIND_CONTRACT_BY_ID_SERVICE,
  GET_CONTRACTS_BY_CITY_SERVICE,
} from '@/modules/contract/symbols';
import UserDto from '@/modules/users/dtos/user.dto';
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
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
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
    @Inject(GET_CONTRACTS_BY_CITY_SERVICE)
    private readonly getContractsByCityService: IGetContractByCityUseCase,
  ) {}

  @HttpCode(201)
  @Post('')
  @UseInterceptors(FileInterceptor('contractFile', contractFileUploadConfig))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Contract data with file upload',
    type: CreateContractWithFileDto,
  })
  @UseGuards(AuthGuard)
  async create(
    @Body() contractData: CreateContractDto,
    @User() user: UserDto,
    @UploadedFile() contractFile: Express.Multer.File,
  ) {
    const param = CreateContractWithFileDto.toCreateContractParam(
      contractData,
      user.currentCityId!,
      contractFile,
    );

    const result = await this.createContractService.execute(param);

    if (result.isLeft()) {
      throw new HttpException(result.value.message, result.value.statusCode, {
        cause: result.value.cause,
      });
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
  @Get('city')
  @UseGuards(AuthGuard)
  async getContractsByCity(@User() user: UserDto) {
    const result = await this.getContractsByCityService.execute({
      cityId: user.currentCityId!,
    });
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
