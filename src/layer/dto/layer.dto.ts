import { CustomField, LayerType } from '../schemas/layer.schema';
import { IsNotEmpty } from 'class-validator';

export class LayerDto {
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  readonly type: LayerType;

  custom_fields?: CustomField[];
}
