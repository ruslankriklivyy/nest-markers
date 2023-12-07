import { IsString } from 'class-validator';

export class RefreshAuthDto {
  @IsString()
  refresh_token: string;
}
