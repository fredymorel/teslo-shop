import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { ProductsModule } from 'src/products/products.module';
import { CommonModule } from '../common/common.module';
import { UserModule } from 'src/user/user.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports:[ 
    CommonModule,
    ProductsModule,
    UserModule
  ]
})
export class SeedModule {}
