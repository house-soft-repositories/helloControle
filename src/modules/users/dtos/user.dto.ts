import {
  IsDate,
  IsEmail,
  IsNumber,
  IsString,
  Length,
  MinLength,
} from 'class-validator';

export default class UserDto {
  @IsNumber()
  id: number;

  @IsString()
  @MinLength(3)
  name: string;

  @IsEmail()
  @IsString()
  email: string;

  @IsString()
  @Length(6)
  password: string;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;
}
