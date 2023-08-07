import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { PostEntity as Post } from './post.entity';
import { PostShareEntity as PostShare } from './postShare.entity';
import { UserEntity as User } from './user.entity';

@Entity('comments')
export class CommentEntity {
  @PrimaryGeneratedColumn({ name: 'comment_id' })
  commentId: number;

  @Column({ name: 'content', type: 'text', nullable: false })
  content: string;

  @ManyToOne(() => Post, (post) => post.comments)
  @JoinColumn({ name: 'post_id', referencedColumnName: 'postId' })
  post?: Post;

  @ManyToOne(() => PostShare, (postShare) => postShare.comments)
  @JoinColumn({ name: 'post_share_id', referencedColumnName: 'postShareId' })
  postShare?: PostShare;

  @ManyToOne(() => User, (user) => user.comments)
  @JoinColumn({ name: 'commentator', referencedColumnName: 'userId' })
  commentator: User;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
