import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsPositive, Min } from 'class-validator';
export class PaginationDto{
    @ApiProperty({
        default:10, description:'Hoy many rows do you need'
    })
    @IsPositive()
    @IsOptional()
    @Type( ()=> Number)//enableImplicitConversions:true
    limit?:number;

    @ApiProperty({
        default:0, description:'Hoy many rows do you want to skip'
    })
    @IsPositive()
    @IsOptional()
    @Min(0)
    @Type( ()=> Number)//enableImplicitConversions:true
    offset?:number;
}