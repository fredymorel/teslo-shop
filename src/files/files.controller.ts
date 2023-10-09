import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, BadRequestException, Res } from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';

import { diskStorage } from 'multer';

import { fileFilter, fileNamer} from './helpers';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Files')
@Controller('files')
export class FilesController {
  constructor(
    private readonly filesService: FilesService,
    private readonly configService: ConfigService
    ) {}
  @Get('product/:imageName')
  findProductImage(
    @Res() res: Response,
    @Param('imageName') imageName: string)
  {

    const path = this.filesService.getStaticProductImage(imageName);
    //return path;
    res.sendFile( path);
  }

  @Post('product')
  @UseInterceptors(FileInterceptor('file',{
    fileFilter: fileFilter,
    //limits : {fileSize:10000}
    storage: diskStorage({
      destination: './static/products',
      filename: fileNamer

    })
  }))
  uploadFiles(
    @UploadedFile() file: Express.Multer.File)
  {
    if (!file){
      throw new BadRequestException('Make sure that the file is an image')
    }
    //const secureUrl= `${file.filename}`;
    //const secureUrl= `localhost:3000/api/files/product/8678925f-d10b-42d3-bb6d-0cfc1f08068b.png`
    const secureUrl=`${ this.configService.get('HOST_API')}/files/product/${file.filename}`; 
    return{
        fileName: {secureUrl}
    } 
  }
}
