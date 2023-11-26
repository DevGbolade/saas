import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateBusinessDto {
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @ApiProperty({ type: [String], default: [] })
  departmentHeads?: string[];

  @ApiProperty({ type: [String], default: [] })
  orders?: string[];
}
