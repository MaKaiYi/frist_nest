import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, Between } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  @InjectRepository(User) private userRepository: Repository<User>;
  async create (createUserDto: CreateUserDto) {
    delete createUserDto.id;
    createUserDto.createTime = new Date(createUserDto.createTime);
    createUserDto.updateTime = new Date(createUserDto.updateTime);

    return await this.userRepository.save(createUserDto);
  }

  async findAll (page: number = 1, pageSize: number = 10, query: CreateUserDto) {
    const { name, sex, createTime, updateTime } = query;

    // 构造查询条件
    const whereCondition = {
      ...(name && { name: Like(`%${name}%`) }),  // 模糊查询 name
      ...(sex && { sex }),  // 精确匹配 sex

    };
    const [data, total] = await this.userRepository.findAndCount({
      where: whereCondition,
      order: {
        id: 'DESC',
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    return {
      data,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  }

  async findOne (id: number) {
    return this.userRepository.findBy;
  }

  async update (id: number, updateUserDto: UpdateUserDto) {
    return await this.userRepository.update(id, updateUserDto);
  }

  async remove (id: number) {
    return await this.userRepository.delete(id);
  }
}


