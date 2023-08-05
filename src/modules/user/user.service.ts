import { Injectable, HttpException, HttpStatus, BadRequestException } from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm'
import {Repository} from 'typeorm'
import {UserEntity} from '../../entities/user.entity'

@Injectable()
export class UserService {
    constructor(
      @InjectRepository(UserEntity)
      private userRepository : Repository<UserEntity>
    ) {}

    async findUserByEmail (email: string): Promise<UserEntity> {
      return this.userRepository.findOne({where: { email }})
    }

    async createUser(data) { 
      try{
        const {email, password, nickName, role} = data;
        const user = new UserEntity();
        user.email = email;
        user.password = password;
        user.nickName = nickName;
        user.role = role;
        const newUser = this.userRepository.create(user);
        const savedUser = await this.userRepository.save(newUser);

        return savedUser; 
      }catch(ex){
        throw new BadRequestException(ex);
      }
    }

}
