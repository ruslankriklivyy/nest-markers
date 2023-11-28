import { PartialType } from '@nestjs/mapped-types';
import { MarkerDto } from '@/modules/marker/dto/marker.dto';
import { IsOwner } from '@/validation/is-owner.validation';

export class UpdateMarkerDto extends PartialType(MarkerDto) {
  @IsOwner({ tableName: 'markers', column: 'id' })
  id: number;
}
