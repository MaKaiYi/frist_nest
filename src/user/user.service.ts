import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  @InjectRepository(User) private userRepository: Repository<User>;
  async create(createUserDto: CreateUserDto) {
    delete createUserDto.id;
    createUserDto.createTime = new Date(createUserDto.createTime);
    createUserDto.updateTime = new Date(createUserDto.updateTime);

    return await this.userRepository.save(createUserDto);
  }

  async findAll(page: number = 1, pageSize: number = 10) {
    const [data, total] = await this.userRepository.findAndCount({
      order: {
        id: 'DESC',
      },
      skip: (page - 1) * pageSize, // 跳过的记录数
      take: pageSize, // 需要获取的记录数
    });

    return {
      data,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  }

  async findOne(id: number) {
    return this.userRepository.findBy;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.userRepository.update(id, updateUserDto);
  }

  async remove(id: number) {
    return await this.userRepository.delete(id);
  }
}
