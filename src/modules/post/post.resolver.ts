import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import {PostService} from './post.service'
import {createPostDto} from './dto/createPost.input'
import { updatePostDto } from "./dto/updatePost.input";
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

    @Mutation('updatePost')
    @UseGuards(JwtAuthGuard)
    async updatePost(@GqlUser() user: UserEntity, @Args('updatePostInput') updatePostInput: updatePostDto, @Args('postId') postId: number) {
        const { userId } = user;
        return await this.postService.updatePost(userId, postId, updatePostInput);
    }

    @Mutation('deletePost')
    @UseGuards(JwtAuthGuard)
    async deletePost(@GqlUser() user: UserEntity, @Args('postId') postId: number) {
        const { userId } = user;
        return await this.postService.deletePost(userId, postId);
    }

    @Query('getAllPost')
    async getListPost(@Args('page') page: number, @Args('perPage') perPage: number) { 
        return await this.postService.getListPost(page, perPage);
    }

    @Query('getPost') 
    async getPost(@Args('postId') postId: number) {
        return await this.postService.getPostById(postId);
    }

    @Query('getPostOfUser')
    @UseGuards(JwtAuthGuard) 
    async getPostOfUser(@GqlUser() user: UserEntity) {
        const {userId} = user;
        return await this.postService.getPostOfUser(userId);
    }
} 