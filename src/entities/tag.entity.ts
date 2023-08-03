import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany} from 'typeorm'
import {TagDetailEntity as TagDetail} from './tagDetail.entity'

@Entity('tags')
export class TagEntity {

    @PrimaryGeneratedColumn({name: 'tag_id'})
    tagId: number
    
    @Column({name: 'name', type: 'varchar', length: 255, nullable: false})
    name: string

    @OneToMany(() => TagDetail, tagDetail => tagDetail.tag)
    tagDetails?: TagDetail[]

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date

    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date
}