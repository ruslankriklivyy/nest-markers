import { IsNotEmpty, IsString } from 'class-validator';
import { LAYER_TYPE } from '@/consts/LAYER_TYPE_PUBLIC';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLayerDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ enum: LAYER_TYPE, enumName: 'layer_type' })
  @IsNotEmpty()
  @IsString()
  type: LAYER_TYPE;
}
