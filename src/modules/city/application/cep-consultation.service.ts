import ViaCepResponseDto from '@/modules/city/dtos/viacep-response.dto';
import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export default class CepConsultationService {
  constructor(private readonly configService: ConfigService) {}

  async consultCep(cep: string): Promise<ViaCepResponseDto> {
    try {
      // Remove qualquer formatação do CEP
      const cleanCep = cep.replace(/\D/g, '');

      // Valida se o CEP tem 8 dígitos
      if (cleanCep.length !== 8) {
        throw new HttpException('CEP deve conter exatamente 8 dígitos', 400);
      }

      const response = await fetch(
        `https://viacep.com.br/ws/${cleanCep}/json/`,
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
        throw new HttpException(
          'Erro ao consultar CEP na API externa',
          response.status,
        );
      }

      const data: ViaCepResponseDto = await response.json();

      // Verifica se o CEP foi encontrado
      if (data.erro) {
        throw new HttpException('CEP não encontrado', 404);
      }

      return data;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException('Erro interno ao consultar CEP', 500, {
        cause: error,
      });
    }
  }
}
