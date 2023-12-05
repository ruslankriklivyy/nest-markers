import { ApiProperty } from '@nestjs/swagger';

class AuthUserResultDto {
  @ApiProperty({ type: 'number', default: 1 })
  id: number;

  @ApiProperty()
  email: string;
}

export class AuthResultDto {
  @ApiProperty()
  access_token: string;

  @ApiProperty()
  refresh_token: string;

  @ApiProperty()
  user: AuthUserResultDto;
}
