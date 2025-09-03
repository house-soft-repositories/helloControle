import {
  IsBoolean,
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

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
}
