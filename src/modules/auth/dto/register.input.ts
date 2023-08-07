import { IsString, IsNotEmpty, IsOptional, IsEnum, IsEmail } from 'class-validator';

enum ROLE {
  USER = 'user',
  ADMIN = 'admin',
}

export class registerUserDto {
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsOptional()
  @IsString()
  nickName: string;

  @IsOptional()
  @IsEnum(ROLE)
  role: ROLE;
}
