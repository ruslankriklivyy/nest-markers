import { IsBoolean, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCustomFieldDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsBoolean()
  is_important: boolean;

  @ApiProperty()
  @IsNumber()
  custom_field_type_id: number;
}
