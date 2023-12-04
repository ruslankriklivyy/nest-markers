import { PartialType } from '@nestjs/mapped-types';
import { CreateMarkerDto } from '@/modules/marker/dto/create-marker.dto';

export class UpdateMarkerDto extends PartialType(CreateMarkerDto) {}
