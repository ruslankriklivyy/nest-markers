import { CustomField, LayerType } from '../schemas/layer.schema';

export class LayerUpdateDto {
  readonly name?: string;
  readonly type?: LayerType;
  customFields?: CustomField[];
}
