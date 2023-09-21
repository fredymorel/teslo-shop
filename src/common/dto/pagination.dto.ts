import { Type } from 'class-transformer';
import { IsOptional, IsPositive, Min } from 'class-validator';
export class PaginationDto{
    @IsPositive()
    @IsOptional()
    @Type( ()=> Number)//enableImplicitConversions:true
    limit?:number;

    @IsPositive()
    @IsOptional()
    @Min(0)
    @Type( ()=> Number)//enableImplicitConversions:true
    offset?:number;
}