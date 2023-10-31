import { IsBoolean, IsString } from 'class-validator';

export class CreateCustomFieldDto {
  @IsString()
  name: string;

  @IsBoolean()
  is_important: boolean;
}
