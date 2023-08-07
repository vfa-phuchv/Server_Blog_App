import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { PostEntity as Post } from './post.entity';
import { ReactionEntity as Reaction } from './reaction.entity';
import { PostShareEntity as PostShare } from './postShare.entity';
import { CommentEntity as Comment } from './comment.entity';

export enum GENDER {
  MALE = 'male',
  FEMALE = 'female',
}

export enum ROLE {
  ADMIN = 'admin',
  USER = 'user',
}

@Entity('users')
export class UserEntity {
  @Column({ primary: true, name: 'user_id', generated: 'uuid' })
  userId: string;

  @Column({ name: 'email', type: 'varchar', length: 255, nullable: false, unique: true })
  email: string;

  @Column({ name: 'password', type: 'text', nullable: false })
  password: string;

  @Column({ name: 'nick_name', type: 'varchar', length: 40 })
  nickName: string;

  @Column({ name: 'date_of_birth', type: 'date', nullable: true })
  dateOfBirth: Date;

  @Column({ name: 'avatar', type: 'text', nullable: true })
  avatar: string;

  @Column({ name: 'gender', type: 'enum', enum: GENDER })
  gender: string;

  @Column({ name: 'role', type: 'enum', enum: ROLE, nullable: false, default: ROLE.USER })
  role: string;

  @Column({ name: 'refresh_token', type: 'text', nullable: true })
  refreshToken: string;

  @OneToMany(() => Post, (post) => post.author)
  posts?: Post[];

  @OneToMany(() => Reaction, (reaction) => reaction.user)
  reactions?: Reaction[];

  @OneToMany(() => PostShare, (postShare) => postShare.sharer)
  postShares?: PostShare[];

  @OneToMany(() => Comment, (comment) => comment.commentator)
  comments?: Comment[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
