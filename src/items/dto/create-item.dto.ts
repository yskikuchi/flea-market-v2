import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateItemDto {
  @ApiProperty({ example: 'item1' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(40)
  name: string;

  @ApiProperty({ example: 1000 })
  @IsInt()
  @Min(1)
  price: number;

  @ApiProperty({ example: 'これはサンプルです' })
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  description?: string;
}
