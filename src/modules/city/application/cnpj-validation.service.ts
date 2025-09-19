import CnpjValidationDto from '@/modules/city/dtos/cnpj-validation.dto';
import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

interface BrasilApiCnpjResponse {
  cnpj: string;
  razao_social: string;
  nome_fantasia?: string;
  email?: string;
  ddd_telefone_1?: string;
  uf: string;
  municipio: string;
  logradouro?: string;
  bairro?: string;
  cep?: string;
  descricao_situacao_cadastral?: string;
  numero?: string;
  complemento?: string;
}

@Injectable()
export default class CnpjValidationService {
  constructor(private readonly configService: ConfigService) {}

  async validateCnpj(cnpj: string): Promise<CnpjValidationDto> {
    try {
      // Remove formatação do CNPJ
      const cleanCnpj = cnpj.replace(/[^\d]/g, '');

      if (cleanCnpj.length !== 14) {
        throw new HttpException('CNPJ deve conter 14 dígitos', 400);
      }

      const response = await fetch(
        `https://brasilapi.com.br/api/cnpj/v1/${cleanCnpj}`,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'User-Agent': 'HelloControle/1.0.0',
          },
        },
      );

      if (!response.ok) {
        if (response.status === 404) {
          throw new HttpException('CNPJ não encontrado', 404);
        }
        throw new HttpException('Erro ao consultar CNPJ', response.status);
      }

      const data: BrasilApiCnpjResponse = await response.json();

      // Mapear dados da API para o DTO
      const validationDto = new CnpjValidationDto();
      validationDto.cnpj = this.formatCnpj(data.cnpj);
      validationDto.nome = data.razao_social;
      validationDto.nomeFantasia = data.nome_fantasia || undefined;
      validationDto.email = data.email || undefined;
      validationDto.contato = data.ddd_telefone_1 || undefined;
      validationDto.uf = data.uf;
      validationDto.cidade = data.municipio;
      validationDto.logradouro = data.logradouro || undefined;
      validationDto.bairro = data.bairro || undefined;
      validationDto.cep = data.cep || undefined;
      validationDto.situacao = data.descricao_situacao_cadastral || undefined;
      validationDto.numero = data.numero || undefined;
      validationDto.complemento = data.complemento || undefined;

      return validationDto;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException('Erro interno ao validar CNPJ', 500, {
        cause: error,
      });
    }
  }

  private formatCnpj(cnpj: string): string {
    // Formatar CNPJ: XX.XXX.XXX/XXXX-XX
    const clean = cnpj.replace(/[^\d]/g, '');
    return clean.replace(
      /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
      '$1.$2.$3/$4-$5',
    );
  }
}
