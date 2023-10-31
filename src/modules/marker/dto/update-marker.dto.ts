import { PartialType } from '@nestjs/mapped-types';
import { MarkerDto } from '@/modules/marker/dto/marker.dto';

export class UpdateMarkerDto extends PartialType(MarkerDto) {}
