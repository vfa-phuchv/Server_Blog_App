import {IsString, IsNotEmpty, IsOptional, IsBoolean} from 'class-validator'

export class createPostDto{
    @IsString()
    @IsOptional()
    caption: string;

    @IsString()
    @IsOptional()
    subTitle: string;

    @IsString()
    content: string;

    @IsString()
    imageUrl: string;

    @IsBoolean()
    visibility: boolean;
} 