import { UUID } from 'crypto'
import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn} from 'typeorm'

export enum GENDER {
    MALE = 'male',
    FEMALE = 'female',
}

export enum ROLE {
    ADMIN = 'admin',
    USER = 'user'
}

@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn({name: 'user_id', type: 'int'})
    userId: string

    @Column({name: 'email', type: 'varchar',  length: 255, nullable: false, unique: true})
    email: string

    @Column({name: 'password', type: 'text', nullable: false})
    password: string

    @Column({name: 'nick_name', type: 'varchar', length: 40} )
    nickName: string

    @Column({name: 'date_of_birth', type: 'date'})
    dateOfBirth: Date

    @Column({name: 'avatar', type: 'text'})
    avatar: string

    @Column({name: 'gender', type: 'enum', enum: GENDER})

    @Column({name: 'role', type: 'enum', enum: ROLE, nullable: false,  default: ROLE.USER})
    role: string

    @Column({name: 'refresh_token', type: 'text'})
    refreshToken: string

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date

    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date
}
