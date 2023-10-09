import { Controller, Get, Post} from '@nestjs/common';
import { SeedService } from './seed.service';
import { Auth } from 'src/user/decorators';
import { ValidRoles } from 'src/user/interfaces';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Seed')
@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Get()
  //@Auth(ValidRoles.admin)
  excecuteSeed(){
    return this.seedService.runSeed();
  }
  
}
