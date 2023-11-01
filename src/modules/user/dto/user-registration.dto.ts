import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class UserRegistrationDto {
  constructor(
    email: string,
    full_name: string,
    password: string,
    avatar_id?: number | null,
  ) {
    this.avatar_id = avatar_id || null;
    this.email = email;
    this.full_name = full_name;
    this.password = password;
  }

  @IsNotEmpty()
  @IsString()
  full_name: string;

  @IsEmail()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsOptional()
  @IsInt()
  avatar_id?: number | null;
}
