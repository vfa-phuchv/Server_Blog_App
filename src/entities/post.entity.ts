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
import { UserEntity as User } from './user.entity';
import { TagDetailEntity as TagDetail } from './tagDetail.entity';
import { PostShareEntity as PostShare } from './postShare.entity';
import { ReactionEntity as Reaction } from './reaction.entity';
import { CommentEntity as Comment } from './comment.entity';

@Entity('posts')
export class PostEntity {
  @PrimaryGeneratedColumn({ name: 'post_id' })
  postId: number;

  @Column({ name: 'caption', type: 'text' })
  caption: string;

  @Column({ name: 'content', type: 'text' })
  content: string;

  @Column({ name: 'sub_title', type: 'text', nullable: true })
  subTitle: string;

  @Column({ name: 'image_url', type: 'text', nullable: true })
  imageUrl: string;

  @Column({ name: 'reaction_count', type: 'int', default: 0 })
  reactionCount: number;

  @Column({ name: 'share_count', type: 'int', default: 0 })
  shareCount: number;

  @Column({ name: 'commnent_count', type: 'int', default: 0 })
  commnentCount: number;

  @Column({ name: 'is_approved', type: 'boolean', default: false })
  isApproved: boolean;

  @UpdateDateColumn({ name: 'date_published' })
  datePublished: Date;

  @Column({ name: 'visibility', type: 'boolean', default: true })
  visibility: boolean;

  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn({ name: 'author_id', referencedColumnName: 'userId' })
  author: User;

  @OneToMany(() => TagDetail, (tagDetail) => tagDetail.post)
  taskDetails?: TagDetail[];

  @OneToMany(() => PostShare, (postShare) => postShare.post)
  postShares?: PostShare[];

  @OneToMany(() => Reaction, (reaction) => reaction.post)
  reactions?: Reaction[];

  @OneToMany(() => Comment, (comment) => comment.post)
  comments?: Comment[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
