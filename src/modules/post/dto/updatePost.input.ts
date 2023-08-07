import {IsString, IsNotEmpty, IsOptional, IsBoolean} from 'class-validator'

export class updatePostDto{
    @IsString()
    @IsOptional()
    caption: string;

    @IsString()
    @IsOptional()
    subTitle: string;

    @IsString()
    @IsOptional()
    content: string;

    @IsString()
    @IsOptional()
    imageFile: string;

    @IsBoolean()
    @IsOptional()
    visibility: boolean;
} 