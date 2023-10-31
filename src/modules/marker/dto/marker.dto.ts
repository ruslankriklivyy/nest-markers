import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class MarkerDto {
  @IsNotEmpty()
  @IsString()
  readonly color: string;

  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @IsNotEmpty()
  @IsNumber()
  readonly layer_id: number;
}
