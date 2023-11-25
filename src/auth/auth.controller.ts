import { Body, Controller, Post } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { LoginUserDto } from 'src/user/dto/users.user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOkResponse({ type: LoginUserDto })
  login(@Body() { email, password }: LoginUserDto) {
    return this.authService.login({ email, password });
  }
}
