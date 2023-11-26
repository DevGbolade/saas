import { Body, Controller, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginUserDto } from 'src/user/dto/users.user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOkResponse({ type: LoginUserDto })
  @ApiOperation({ summary: 'Login a user' })
  login(@Body() { email, password }: LoginUserDto) {
    return this.authService.login({ email, password });
  }
}
