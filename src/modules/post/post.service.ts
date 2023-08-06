import {Injectable} from '@nestjs/common'
import {Repository} from 'typeorm'
import {InjectRepository} from '@nestjs/typeorm'
import {PostEntity} from '../../entities/post.entity'
import {UserService} from '../user/user.service'
import {createPostDto} from './dto/createPost.input'
import {CloudinaryService} from '../../common/utils/cloudinary.service'

@Injectable()
export class PostService {
    constructor(
        @InjectRepository(PostEntity)
        private postRepository: Repository<PostEntity>,
        private userService: UserService,
        private cloudinaryService: CloudinaryService
    ){}

    async createPost(userId: string, postData: createPostDto){
        const {caption, subTitle, content, imageFile, visibility} = postData;
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
        const newPost = this.postRepository.create(post)
        const data = await this.postRepository.save(newPost)
        return data;
    }
 
    async getPostById(postId: number) {
        return this.postRepository.findOne({
            where: {postId} 
        })
    }

    async getListPost(page: number, perPage: number) {
        const skip = page ? (page - 1) * perPage : 0;
        const take = perPage ?? 10;
        return this.postRepository.find({
            order: {
                datePublished: 'DESC'
            }, 
            skip, 
            take
        })
    }
}