import {Entity, PrimaryColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn} from 'typeorm'
import {TagEntity as Tag} from './tag.entity'
import {PostEntity as Post} from './post.entity'

@Entity('tagDetails')
export class TagDetailEntity {
    @PrimaryColumn({name: 'tag_id'})
    tagId: number

    @PrimaryColumn({name: 'post_id'})
    postId: number

    @ManyToOne(() => Tag, task => task.tagDetails)
    @JoinColumn({name: 'tag_id', referencedColumnName: 'tagId'})
    tag: Tag

    @ManyToOne(() => Post, post => post.taskDetails)
    @JoinColumn({name: 'post_id', referencedColumnName: 'postId'})
    post: Post
    
    @CreateDateColumn({name: 'created_at'})
    createdAt: Date

    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date 
}