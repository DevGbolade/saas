import { PartialType } from '@nestjs/swagger';
import { CreateBusinessDto } from './business.dto';

export class UpdateBusinessDto extends PartialType(CreateBusinessDto) {}
