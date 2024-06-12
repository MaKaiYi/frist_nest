import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ResultDto } from 'src/utils/result.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      const result = await this.userService.create(createUserDto);
      if (result) {
        return new ResultDto(true, 200, '新增成功', result);
      } else {
        return new ResultDto(false, 500, '查询失败');
      }
    } catch (error) {
      throw new HttpException(
        new ResultDto(false, HttpStatus.INTERNAL_SERVER_ERROR, error.message),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('list')
  async findAll(
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 10,
  ): Promise<ResultDto> {
    try {
      const result = await this.userService.findAll(page, pageSize);
      if (result) {
        return new ResultDto(true, 200, '', result);
      } else {
        return new ResultDto(false, 500, '查询失败');
      }
    } catch (error) {
      throw new HttpException(
        new ResultDto(false, HttpStatus.INTERNAL_SERVER_ERROR, error.message),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      const result = this.userService.update(+id, updateUserDto);
      if (result) {
        return new ResultDto(true, 200, '', result);
      } else {
        return new ResultDto(false, 500, '修改失败');
      }
    } catch (error) {
      throw new HttpException(
        new ResultDto(false, HttpStatus.INTERNAL_SERVER_ERROR, error.message),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      const result = this.userService.remove(+id);
      if (result) {
        return new ResultDto(true, 200, '', result);
      } else {
        return new ResultDto(false, 500, '删除失败');
      }
    } catch (error) {
      throw new HttpException(
        new ResultDto(false, HttpStatus.INTERNAL_SERVER_ERROR, error.message),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
