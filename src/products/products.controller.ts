import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationDto } from '../common/dto/pagination.dto';
import { Auth, GetUser } from 'src/user/decorators';
import { ValidRoles } from 'src/user/interfaces';
import { User } from 'src/user/entities/user.entity';
import { Product } from './entities';

@ApiTags('Products')
@Controller('products')

export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @Auth()
  @ApiResponse({status:201, description:'Products was created',type: Product})
  @ApiResponse({status:400, description:'Bad requeste'})
  @ApiResponse({status:403, description:'Forbidden - token related'})
  create(@Body() createProductDto: CreateProductDto,
          @GetUser() user:User,
  ) {
    return this.productsService.create(createProductDto, user);
  }

  @Get()
  findAll(@Query() paginationDto:PaginationDto) {
    console.log(paginationDto)
    return this.productsService.findAll(paginationDto);
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    
    return this.productsService.findOnePlane(term);
  }

  @Patch(':id')
  @Auth(ValidRoles.admin)
  update(
    @Param('id',ParseUUIDPipe) id: string,
    @Body() updateProductDto: UpdateProductDto,
    @GetUser() user:User
    ) {
    return this.productsService.update(id, updateProductDto,user);
  }

  @Delete(':id')
  remove(@Param('id',ParseUUIDPipe) id: string) {
    return this.productsService.remove(id);
  }
}
