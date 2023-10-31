import { PartialType } from '@nestjs/mapped-types';
import { CreateLayerDto } from '@/modules/layer/dto/create-layer.dto';

export class UpdateLayerDto extends PartialType(CreateLayerDto) {}
