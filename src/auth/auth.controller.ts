import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AuthService } from './auth.service';

import { ValidRoles } from './interfaces';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateUserDto, LoginUserDto } from './dto';
import { User } from './entities/auth.entity';
import { Auth, GetUser, RawHeaders, RoleProtected } from './decorators';
import { UserRoleGuard } from './guards/user-role/user-role.guard';
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  get() {
    return 'Auth is working';
  }
  @Post('register')
  createUser(@Body() createAuthDto: CreateUserDto) {
    return this.authService.create(createAuthDto);
  }
  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }
  @ApiBearerAuth('JWT-auth')
  @Get('check-status')
  @Auth()
  checkAuthStatus(@GetUser() user: User) {
    return this.authService.checkAuthStatus(user);
  }

  @ApiBearerAuth('JWT-auth')
  @Get('private')
  @Auth(ValidRoles.admin)
  testingPrivateRoute3(@GetUser() user: User) {
    return {
      ok: true,
      user,
    };
  }
}
