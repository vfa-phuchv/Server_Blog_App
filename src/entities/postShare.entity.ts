import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { PostEntity as Post } from './post.entity';
import { ReactionEntity as Reaction } from './reaction.entity';
import { UserEntity as User } from './user.entity';
import { CommentEntity as Comment } from './comment.entity';

@Entity('postShares')
export class PostShareEntity {
  @PrimaryGeneratedColumn({ name: 'post_share_id' })
  postShareId: number;

  @Column({ name: 'caption', type: 'text' })
  caption: string;

  @Column({ name: 'reaction_count', type: 'int', default: 0 })
  reactionCount: number;

  @Column({ name: 'commnent_count', type: 'int', default: 0 })
  commnentCount: number;

  @Column({ name: 'share_time', type: 'datetime' })
  datePublished: Date;

  @Column({ name: 'visibility', type: 'boolean', default: true })
  visibility: boolean;

  @ManyToOne(() => Post, (post) => post.postShares)
  @JoinColumn({ name: 'post_id', referencedColumnName: 'postId' })
  post: Post;

  @ManyToOne(() => User, (user) => user.postShares)
  @JoinColumn({ name: 'sharer_id', referencedColumnName: 'userId' })
  sharer: User;

  @OneToMany(() => Reaction, (reaction) => reaction.postShare)
  reactions?: Reaction[];

  @OneToMany(() => Comment, (comment) => comment.postShare)
  comments?: Comment[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
