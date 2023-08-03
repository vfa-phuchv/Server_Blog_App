import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn} from 'typeorm'
import {PostEntity as Post} from './post.entity'
import {PostShareEntity as PostShare} from './postShare.entity'
import {UserEntity as User} from './user.entity'

enum REACT {
    LIKE = 'like',
    LOVE = 'love',
    HAHA = 'haha',
    WOW = 'wow',
    SAD = 'sad',
    ANGRY = 'angry'
}

@Entity('reactions')
export class ReactionEntity {
    @PrimaryGeneratedColumn({name: 'reaction_id'})
    reactionId: number

    @Column({name: 'react', type: 'enum', enum: REACT, default: REACT.LIKE})
    react: string

    @ManyToOne(() => Post, post => post.reactions)
    @JoinColumn({name: 'post_id', referencedColumnName: 'post_id'})
    post?: Post

    @ManyToOne(() => PostShare, postShare => postShare.reactions)
    @JoinColumn({name: 'post_share_id', referencedColumnName: 'post_share_id'})
    postShare?: PostShare

    @ManyToOne(() => User, user => user.reactions)
    @JoinColumn({name: 'user_id', referencedColumnName: 'user_id'})
    user: User
 
    @CreateDateColumn({name: 'created_at'})
    createdAt: Date

    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date
}