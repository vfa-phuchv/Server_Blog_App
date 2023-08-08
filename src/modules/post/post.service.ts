import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from '../../entities/post.entity';
import { UserService } from '../user/user.service';
import { createPostDto } from './dto/createPost.input';
import { updatePostDto } from './dto/updatePost.input';
import { CloudinaryService } from '../../common/utils/cloudinary.service';
import { UserEntity } from 'src/entities/user.entity';
import * as _ from 'lodash';
import { ForbiddenError } from 'apollo-server-core';

@Injectable()
export class PostService {
  private entityAlias: string;
  private userAlias: string;

  constructor(
    @InjectRepository(PostEntity)
    private postRepository: Repository<PostEntity>,
    private userService: UserService,
    private cloudinaryService: CloudinaryService
  ) {
    this.entityAlias = PostEntity.name;
    this.userAlias = UserEntity.name;
  }

  async createPost(userId: string, postData: createPostDto) {
    const { caption, subTitle, content, imageFile, visibility } = postData;
    //* get user is auhor
    const author = await this.userService.findUserById(userId);
    const imgResponse = await this.cloudinaryService.storeImg(imageFile);
    //* data new post
    const post = new PostEntity();
    post.author = author;
    post.caption = caption;
    post.subTitle = subTitle;
    post.content = content;
    post.imageUrl = imgResponse.url;
    post.visibility = visibility;
    //* save new post to DB
    const newPost = this.postRepository.create(post);
    const data = await this.postRepository.save(newPost);
    return data;
  }

  async updatePost(userId: string, postId: number, postData: updatePostDto) {
    const post = await this.postRepository.findOne({ where: { postId }, relations: ['author'] });
    //* check exists post
    if (_.isEmpty(post)) {
      throw new BadRequestException('Post not found!');
    }
    //* check author of post
    if (post.author.userId !== userId) {
      throw new ForbiddenError('You dont have permission to update');
    }
    //* new post update
    const newPost = new PostEntity();
    (newPost.caption = postData.caption),
      (newPost.content = postData.content),
      (newPost.subTitle = postData.subTitle),
      (newPost.visibility = postData.visibility);
    //* check update image
    if (postData.imageFile) {
      const imageResponse = await this.cloudinaryService.storeImg(postData.imageFile);
      newPost.imageUrl = imageResponse.url;
    }
    this.postRepository.merge(post, newPost);
    return await this.postRepository.save(post);
  }

  async deletePost(userId: string, postId: number) {
    let deleted: number = 0;
    const post = await this.postRepository.findOne({ where: { postId }, relations: ['author'] });
    //* check exists post
    if (_.isEmpty(post)) {
      throw new BadRequestException('Post not found!');
    }
    //* check author of post
    if (post.author.userId !== userId) {
      throw new ForbiddenError('You dont have permission to delete');
    }
    //* delete post
    const result = await this.postRepository.delete({ postId });
    if (result.affected && result.affected > 0) {
      deleted = result.affected;
    }

    return deleted;
  }

  async getPostById(postId: number) {
    return this.postRepository.findOne({
      where: { postId },
    });
  }

  async getListPost(page: number, perPage: number) {
    const skip = page ? (page - 1) * perPage : 0;
    const take = perPage ?? 10;
    return this.postRepository.find({
      order: {
        datePublished: 'DESC',
      },
      skip,
      take,
    });
  }

  async getPostOfUser(userId: string) {
    const posts = await this.postRepository
      .createQueryBuilder(this.entityAlias)
      .innerJoin(`${this.entityAlias}.author`, `${this.userAlias}`)
      .where(`${this.userAlias}.userId = :userId`, { userId })
      .getMany();

    return posts;
  }

  async getPostPending() {
    const posts = await this.postRepository.find({
      where: {
        isApproved: false,
      },
      order: {
        updatedAt: 'DESC',
      },
    });
    return posts;
  }

  async approvePost(postId: number): Promise<string> {
    const post = await this.postRepository.findOne({ where: { postId: Number(postId) } });

    if (_.isEmpty(post)) {
      throw new BadRequestException('Post does not exists');
    }
    post.isApproved = true;
    try {
      await this.postRepository.save(post);
      return 'approved success!';
    } catch (err) {
      return 'approved failure!';
    }
  }
}
