import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export default class UpdateCityOrganDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  nome?: string;

  @IsOptional()
  @IsNumber()
  cityId?: number;
}
