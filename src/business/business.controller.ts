import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { BusinessService } from './business.service';
import { CreateBusinessDto } from './dto/business.dto';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CurrentUser } from 'src/auth/current-user.decorator';
// import { UpdateUserDto } from './dto/update-user.dto';
@ApiTags('businesses')
@Controller('businesses')
export class BusinessController {
  constructor(private readonly businessService: BusinessService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post()
  @ApiOperation({ summary: 'Creates a business' })
  @ApiOkResponse({ type: CreateBusinessDto })
  async create(
    @CurrentUser() { id }: { id: string },
    @Body() createBusinessDto: CreateBusinessDto,
  ) {
    return await this.businessService.create(id, createBusinessDto);
  }
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get(':id/orders')
  @ApiOperation({ summary: 'Gets business orders' })
  getBusinessOrders(@Param('id') id: string) {
    return this.businessService.getBusinessOrders(id);
  }

  @ApiOperation({ summary: 'Gets business credit score' })
  @Get(':id/credit-score')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  getCreditScore(@Param('id') id: string) {
    return this.businessService.getCreditScore(id);
  }
}
