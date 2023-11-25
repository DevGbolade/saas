import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './users.user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {}
