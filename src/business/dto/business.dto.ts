import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { CreateOrderDeptHeadDto } from 'src/order/dto/create-order.dto';

export class CreateBusinessDto {
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @ApiProperty({ type: [String], default: [] })
  departmentHeads?: string[];

  @ApiProperty({ type: [String], default: [] })
  orders?: string[];
}

export class CreateOrderByDeptHeadDto {
  @IsString()
  @IsNotEmpty()
  businessId: string;

  @IsString()
  @IsNotEmpty()
  departmentHeadId: string;

  @ValidateNested()
  @Type(() => CreateOrderDeptHeadDto)
  createOrderDto: CreateOrderDeptHeadDto;
}
