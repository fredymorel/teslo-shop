import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Headers, SetMetadata } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, LoginUserDto} from './dto';
import { AuthGuard } from '@nestjs/passport';
import { Auth, GetUser, RawHeaders } from './decorators';
import { User } from './entities/user.entity';
import { IncomingHttpHeaders } from 'http';
import { UserRoleGuard } from './guards/user-role/user-role.guard';
import { RoleProtected } from './decorators/role-protected.decorator';
import { ValidRoles } from './interfaces';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth-User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
  @Post('login')
  LoginUser(@Body() loginUserDto: LoginUserDto) {
    return this.userService.login(loginUserDto);
  }
  @Get('private')
  @UseGuards(AuthGuard())
  testingPrivateRoute(
    @Req() request: Express.Request,
    @GetUser() user:User,
    @GetUser('email') userEmail:string,

    @RawHeaders()rawHeadres: string[],
    @Headers() headers: IncomingHttpHeaders,
    ){
    console.log(request)
    return {
      ok:true,
      message:'Hola Mundo Private',
      user,
      userEmail,
      rawHeadres,
      headers,
    }
  }
  //@SetMetadata('roles',['admin','super-user'])

  @Get('private2')
  @RoleProtected(ValidRoles.superUser,ValidRoles.superUser)//,ValidRoles.user
  @UseGuards(AuthGuard(),UserRoleGuard)//
  privateRoute2(
    @GetUser() user:User
  ){
    return{
      ok:true,
      user
    }
  }

  @Get('private3')
  @Auth()
  privateRoute3(
    @GetUser() user:User
  ){
    return{
      ok:true,
      user
    }
  }
}
