import {IsString, IsNotEmpty, IsEmail} from 'class-validator'

export class loginUserDto {
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}