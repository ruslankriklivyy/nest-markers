import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMarkerDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  color: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ default: 1 })
  @IsNotEmpty()
  @IsNumber()
  layer_id: number;

  @ApiProperty({ default: 1 })
  @IsNotEmpty()
  @IsNumber()
  latitude: number;

  @ApiProperty({ default: 1 })
  @IsNotEmpty()
  @IsNumber()
  longitude: number;

  @ApiProperty({ type: Number, default: [1], isArray: true })
  @IsOptional()
  @IsArray()
  images_ids: number[];
}
