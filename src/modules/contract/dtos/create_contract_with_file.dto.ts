import { CreateContractParam } from '@/modules/contract/domain/usecase/i_create_contract_use_case';
import CreateContractDto from '@/modules/contract/dtos/create_contract.dto';
import { ApiProperty } from '@nestjs/swagger';

export default class CreateContractWithFileDto extends CreateContractDto {
  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Contract file (PDF, DOC, DOCX, etc.)',
  })
  contractFile?: Express.Multer.File;

  static toCreateContractParam(
    dto: CreateContractDto,
    file: Express.Multer.File,
  ): CreateContractParam {
    return new CreateContractParam(
      dto.id,
      dto.valorTotal,
      dto.valorGlosado,
      dto.dataAssinatura,
      dto.dataVencimento,
      dto.orgaoContratante,
      dto.empresaContratada,
      dto.items.map(item => ({
        ...item,
      })),
      {
        originalName: file.originalname,
        buffer: file.buffer,
        mimetype: file.mimetype,
        size: file.size,
        encoding: file.encoding,
      },
      dto.nome,
      dto.descricao,
      dto.cidadeContratante,
    );
  }
}
