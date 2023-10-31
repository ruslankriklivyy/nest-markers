import { IsNotEmpty, IsString } from 'class-validator';
import { LayerType } from '@/modules/layer/entities/layer.entity';

export class CreateLayerDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  type: LayerType;
}
