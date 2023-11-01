import { IsNotEmpty, IsString } from 'class-validator';
import { LAYER_TYPE } from '@/consts/LAYER_TYPE_PUBLIC';

export class CreateLayerDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  type: LAYER_TYPE;
}
