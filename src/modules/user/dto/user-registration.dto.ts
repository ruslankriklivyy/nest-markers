import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserRegistrationDto {
  @IsNotEmpty()
  readonly full_name: string;

  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  readonly password: string;
}
