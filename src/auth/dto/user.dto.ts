import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class AuthDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsString()
  @IsNotEmpty()
  password: string;
  @IsString()
  @IsOptional()
  firstname: string;
  @IsString()
  @IsOptional()
  lastname: string;
  @IsString()
  @IsOptional()
  gender: string;
  @IsString()
  @IsOptional()
  interestingGender: string;
}
