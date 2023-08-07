import {IsString, IsNotEmpty, IsOptional, IsBoolean} from 'class-validator'

export class updatePostDto{
    @IsString()
    @IsOptional()
    caption: string;

    @IsString()
    @IsOptional()
    subTitle: string;

    @IsString()
    content: string;

    @IsString()
    imageFile: string;

    @IsBoolean()
    visibility: boolean;
} 