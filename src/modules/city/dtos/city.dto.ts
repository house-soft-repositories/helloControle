import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';
import CityCompanyDto from './city-company.dto';
import CityOrganDto from './city-organ.dto';

export default class CityDto {
  @IsNumber()
  id: number;

  @IsString()
  @Length(3, 255)
  name: string;

  @Length(2, 2)
  state: string;

  @IsBoolean()
  @IsOptional()
  isActive: boolean;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CityCompanyDto)
  companies?: CityCompanyDto[];

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CityOrganDto)
  organs?: CityOrganDto[];
}
