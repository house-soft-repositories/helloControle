import { User } from '@/core/decorators/user_request.decorator';
import AuthGuard from '@/core/guard/auth.guard';
import CreateContractService from '@/modules/contract/application/create_contract.service';
import FindAllContractsService from '@/modules/contract/application/find_all_contracts.service';
import IFindContractByIdService from '@/modules/contract/application/find_contract_by_id.service';
import { contractFileUploadConfig } from '@/modules/contract/config/multer.config';
import IGetContractByCityUseCase from '@/modules/contract/domain/usecase/i_get_contracts_by_city_use_case';
import IIncreaseUsedAmountInItemsUseCase from '@/modules/contract/domain/usecase/i_increase_used_amount_in_items_use_case';
import ContractDto from '@/modules/contract/dtos/contract.dto';
import CreateContractDto from '@/modules/contract/dtos/create_contract.dto';
import CreateContractWithFileDto from '@/modules/contract/dtos/create_contract_with_file.dto';
import { IncreaseUsedAmountItemsDto } from '@/modules/contract/dtos/increase_used_amount_items.dto';
import {
  CREATE_CONTRACT_SERVICE,
  FIND_ALL_CONTRACTS_SERVICE,
  FIND_CONTRACT_BY_ID_SERVICE,
  GET_CONTRACTS_BY_CITY_SERVICE,
  INCREASE_USED_AMOUNT_IN_ITEMS_SERVICE,
} from '@/modules/contract/symbols';
import UserDto from '@/modules/users/dtos/user.dto';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  Inject,
  Param,
  ParseUUIDPipe,
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
    private readonly findContractByIdService: IFindContractByIdService,
    @Inject(GET_CONTRACTS_BY_CITY_SERVICE)
    private readonly getContractsByCityService: IGetContractByCityUseCase,
    @Inject(INCREASE_USED_AMOUNT_IN_ITEMS_SERVICE)
    private readonly increaseUsedAmountService: IIncreaseUsedAmountInItemsUseCase,
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
  @Get(':uuid')
  async findByUuid(@Param('uuid', ParseUUIDPipe) uuid: string) {
    const result = await this.findContractByIdService.execute({
      uuid,
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

    return plainToClass(ContractDto, result.value.fromResponse());
  }
  @HttpCode(200)
  @Post(':uuid/increase-used-amount')
  async increaseUsedAmount(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Body() increaseUsedAmountItemsDto: IncreaseUsedAmountItemsDto,
  ) {
    const result = await this.increaseUsedAmountService.execute({
      contractUuid: uuid,
      items: increaseUsedAmountItemsDto.items.map(item => ({
        itemId: item.itemId,
        amountToIncrease: item.amountToIncrease,
        quantityToIncrease: item.quantityToIncrease,
      })),
    });
    if (result.isLeft()) {
      throw new HttpException(result.value.message, result.value.statusCode, {
        cause: result.value.cause,
      });
    }

    return result.value.fromResponse();
  }
}
