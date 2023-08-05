import {Injectable} from '@nestjs/common'
import {Repository} from 'typeorm'
import {InjectRepository} from '@nestjs/typeorm'
import {PostEntity} from '../../entities/post.entity'
import {UserService} from '../user/user.service'
import {createPostDto} from './dto/createPost.input'
import {S3Service} from '../../common/utils/upload.service'
import { randomInt } from 'crypto'

@Injectable()
export class PostService {
    constructor(
        @InjectRepository(PostEntity)
        private postRepository: Repository<PostEntity>,
        private userService: UserService,
        private s3Service: S3Service
    ){}

    async createPost(userId: string, postData: createPostDto){
        const {caption, subTitle, content, imageUrl, visibility} = postData;
        //* get user is auhor
        const author = await this.userService.findUserById(userId);
        
        const post = new PostEntity();
        post.author = author;
        post.caption = caption;
        post.subTitle = subTitle;
        post.content = content;
        post.visibility = visibility;

        //* generate key for image
        const generateImgKey = String(randomInt(1000) + new Date().getTime()); 
        post.imageUrl = generateImgKey;

        //* presigned url image s3 
        const url = await this.s3Service.uploadImage(generateImgKey);

        const newPost = this.postRepository.create(post)
        const data = await this.postRepository.save(newPost)
        data.imageUrl = url;
        return data;
    }

    async getPostById(postId: number) {
        return this.postRepository.findOne({
            where: {postId} 
        })
    }

    async getListPost() {
        return this.postRepository.find({
            order: {
                datePublished: 'DESC'
            }
        })
    }
}