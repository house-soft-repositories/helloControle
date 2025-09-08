import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUrl,
  Length,
  ValidateIf,
} from 'class-validator';

export default class EnvironmentVariables {
  @IsEnum(['dev', 'tst', 'prd'])
  @IsString()
  NODE_ENV: string;

  @IsString()
  @IsNotEmpty()
  DATABASE_HOST: string;

  @IsNumber()
  @IsNotEmpty()
  DATABASE_PORT: number;

  @IsString()
  @IsNotEmpty()
  DATABASE_USERNAME: string;

  @IsString()
  @IsNotEmpty()
  DATABASE_PASSWORD: string;

  @IsString()
  @IsNotEmpty()
  DATABASE_NAME: string;

  @Transform(({ value }: { value: string }) =>
    typeof value === 'string' ? parseInt(value, 10) : value,
  )
  @IsNotEmpty()
  @IsNumber()
  SALT: number;

  @IsNotEmpty()
  @IsString()
  JWT_SECRET: string;

  @Transform(({ value }: { value: string }) =>
    typeof value === 'string' ? parseInt(value, 10) : value,
  )
  @IsNumber()
  @IsNotEmpty()
  PORT: number;

  @IsNumber()
  @IsNotEmpty()
  ACCESS_TOKEN_EXPIRES_IN_SECONDS: number;
  @IsNumber()
  @IsNotEmpty()
  REFRESH_TOKEN_EXPIRES_IN_SECONDS: number;

  @IsEmail()
  ADMIN_EMAIL: string;

  @IsString()
  @Length(6)
  ADMIN_PASSWORD: string;

  @IsString()
  @ValidateIf(o => o.NODE_ENV === 'prd')
  @IsUrl()
  STORAGE_URL: string;
}
