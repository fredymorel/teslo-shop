import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

import { ProductImage } from "./product-image.entity";
import { User } from "../../user/entities/user.entity";

@Entity({name: 'products'})
export class Product {
    @ApiProperty({
        example: '03936ffe-1eeb-4cac-aa8f-f95565fe8273',
        description: 'Product ID',
        uniqueItems: true
    })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({
        example: 'T-Shirt Teslo',
        description: 'Product Title',
        uniqueItems: true
    })
    @Column('text',{
        unique: true,
    })
    title:string;

    @ApiProperty({
        example: '0',
        description: 'Product Price',
    })
    @Column('float',{
        default:0
    })
    price: number;

    @ApiProperty({
        example: 'Anin reprehenderit nulla in anim mollit mini irure commodo',
        description: 'Product Description',
    })
    @Column({
        type: 'text',
        nullable: true
    })
    description:string;

    @ApiProperty({
        example: 't-shirt_teslo',
        description: 'Product Slug - for SEO',
        uniqueItems: true
    })
    @Column('text',{
        unique: true
    })
    slug: string;


    @ApiProperty({
        example: 10,
        description: 'Product Stok',
        default:10
    })
    @Column('int',{
        default: 0
    })
    stock: number;

    @ApiProperty({
        example: ['XS','X','M','L'],
        description: 'Product Sizes',
    })
    @Column('text',{
        array: true
    })
    sizes: string[];

    @ApiProperty({
        example: 'women',
        description: 'Product Gender',

    })
    @Column('text')
    gender:string;

    @ApiProperty()
    @Column('text',{
        array: true,
        default:[]
    })
    tags: string[];

    @ApiProperty()
    @OneToMany(
        () => ProductImage,
        (productImage)=>productImage.product,
        {cascade:true,eager: true } 
    )
    images?: ProductImage[];

    @ManyToOne(
        () => User,
        (user) => user.product,
        {eager:true}
    )
    user: User;

    @BeforeInsert()
    checkSlugInsert(){
        if( !this.slug ){
            this.slug = this.title;
        }
        this.slug = this.slug
        .toLowerCase()
        .replaceAll(' ','_')
        .replaceAll("'",'')
    }
    @BeforeUpdate()
    checkSlugUpdate(){
        this.slug = this.slug
        .toLowerCase()
        .replaceAll(' ','_')
        .replaceAll("'",'')
    }
}
