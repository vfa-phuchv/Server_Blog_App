import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import {PostService} from './post.service'
import {createPostDto} from './dto/createPost.input'
import {UseGuards} from '@nestjs/common'
import {JwtAuthGuard} from '../../guards/auth.guard'
import {GqlUser} from '../../decorators/user.decorator'
import {UserEntity} from '../../entities/user.entity'

@Resolver('Post')
export class PostResolver {
    constructor(private readonly postService: PostService) {}
    
    @Mutation('createPost')
    @UseGuards(JwtAuthGuard)
    async createNewPost(@GqlUser() user: UserEntity, @Args('createPostInput') createPostInput: createPostDto){
        const {userId} = user;
        return await this.postService.createPost(userId, createPostInput);  
    }

    @Query('getAllPost')
    async getListPost(@Args('page') page: number, @Args('perPage') perPage: number) { 
        return await this.postService.getListPost(page, perPage);
    }
} 