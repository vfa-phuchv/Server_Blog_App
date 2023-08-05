import { Module } from "@nestjs/common";
import {PostResolver} from './post.resolver'
import {PostService} from './post.service'
import {TypeOrmModule} from '@nestjs/typeorm'
import { PostEntity } from "../../entities/post.entity"
import {UserModule} from '../user/user.module'
import {S3Service} from '../../common/utils/upload.service'

@Module({
    imports: [UserModule, TypeOrmModule.forFeature([PostEntity])],
    providers: [PostResolver, PostService, S3Service],
})

export class PostModule {}