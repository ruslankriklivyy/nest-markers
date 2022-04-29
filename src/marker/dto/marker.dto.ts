import { MarkerCustomField } from '../schemas/marker.schema';
import { IsNotEmpty } from 'class-validator';

export class MarkerDto {
  @IsNotEmpty()
  readonly marker_color: string;

  @IsNotEmpty()
  readonly title: string;

  @IsNotEmpty()
  readonly description: string;

  preview?: { _id: string; url: string };

  @IsNotEmpty()
  readonly location: { lat: number; lng: number };

  @IsNotEmpty()
  readonly layer: string;

  custom_fields?: MarkerCustomField[];
}
