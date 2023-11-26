import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({ default: 'dev@duplo.com' })
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({ default: 'test1234' })
  @IsNotEmpty()
  readonly password: string;
}
export class CreateUserDto {
  @IsNotEmpty()
  @ApiProperty()
  username: string;
  @IsNotEmpty()
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;
}
export class UpdatePasswordDto {
  @IsNotEmpty()
  @ApiProperty()
  new_password: string;

  @IsNotEmpty()
  @ApiProperty()
  old_password: string;
}

export const LoginOKResponse = {
  id: 'ff5262d5-da30-4598-a868-******',
  username: 'username',
  email: 'email@example.com',
  accessToken: 'eyJh***.eyJ1c2Vy****.yeeffey***',
};
