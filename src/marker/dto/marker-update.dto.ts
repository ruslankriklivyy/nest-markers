import { MarkerCustomField } from '../schemas/marker.schema';

export class MarkerUpdateDto {
  readonly marker_color?: string;
  readonly title?: string;
  readonly description?: string;
  readonly preview?: { _id: string; url: string };
  readonly location?: { lat: number; lng: number };
  readonly layer?: string;
  readonly user?: string;
  readonly custom_fields?: MarkerCustomField[];
}
