// update-user.dto.ts

import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  id?: number;
  name: string;

  sex: string;

  createTime: Date;

  updateTime: Date;
}
