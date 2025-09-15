import { Roles } from '@/core/decorators/role.decorator';
import { User } from '@/core/decorators/user_request.decorator';
import AuthGuard from '@/core/guard/auth.guard';
import UserRole from '@/core/types/user_role';
import IApproveProposalUseCase from '@/modules/contract/domain/usecase/i_approve_proposal_use_case';
import ICreateProposalUseCase from '@/modules/contract/domain/usecase/i_create_proposal_use_case';
import IFindProposalByFiltersUseCase from '@/modules/contract/domain/usecase/i_find_proposal_by_filters_use_case';
import CreateProposalDto from '@/modules/contract/dtos/create_proposal.dto';
import ProposalQueryParamsDto from '@/modules/contract/dtos/proposal_filter.dto';
import {
  APPROVE_PROPOSAL_SERVICE,
  CREATE_PROPOSAL_SERVICE,
  FIND_PROPOSAL_BY_FILTERS_SERVICE,
} from '@/modules/contract/symbols';
import PageOptionsEntity from '@/modules/pagination/domain/entities/page_options.entity';
import { PageOptionsDto } from '@/modules/pagination/dto/page_options.dto';
import UserDto from '@/modules/users/dtos/user.dto';
import {
  Body,
  Controller,
  Get,
  HttpException,
  Inject,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';

@Controller('api/proposals')
export default class ProposalController {
  constructor(
    @Inject(CREATE_PROPOSAL_SERVICE)
    private readonly createProposalService: ICreateProposalUseCase,
    @Inject(APPROVE_PROPOSAL_SERVICE)
    private readonly approveProposalService: IApproveProposalUseCase,
    @Inject(FIND_PROPOSAL_BY_FILTERS_SERVICE)
    private readonly findProposalByFiltersService: IFindProposalByFiltersUseCase,
  ) {}

  @Post('')
  @UseGuards(AuthGuard)
  @Roles(UserRole.ADMIN)
  async createProposal(
    @Body() createProposalDto: CreateProposalDto,
    @User() user: UserDto,
  ) {
    const result = await this.createProposalService.execute({
      contractUuid: createProposalDto.contractUuid,
      userCreatorId: user.id,
      items: createProposalDto.items.map(item => ({
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

  @Get('')
  async findProposal(
    @Query() proposalQueryParams: ProposalQueryParamsDto,
    @Query() pageOptionsDto: PageOptionsDto,
  ) {
    const result = await this.findProposalByFiltersService.execute({
      pageOptions: new PageOptionsEntity(
        pageOptionsDto.order,
        pageOptionsDto.page,
        pageOptionsDto.take,
      ),
      contractUuid: proposalQueryParams.contractUuid,
      status: proposalQueryParams.status,
      createdBy: proposalQueryParams.createdBy,
    });
    if (result.isLeft()) {
      throw new HttpException(result.value.message, result.value.statusCode, {
        cause: result.value.cause,
      });
    }
    return result.value.fromResponse();
  }

  @Post('/:proposalUuid/approve')
  @UseGuards(AuthGuard)
  @Roles(UserRole.ADMIN)
  async approveProposal(
    @Param('proposalUuid') proposalUuid: string,
    @User() user: UserDto,
  ) {
    const result = await this.approveProposalService.execute({
      proposalUuid,
      userApproverId: user.id,
    });
    if (result.isLeft()) {
      throw new HttpException(result.value.message, result.value.statusCode, {
        cause: result.value.cause,
      });
    }
    return result.value.fromResponse();
  }
}
