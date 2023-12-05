import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

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

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  full_name: string;

  @ApiProperty()
  @IsEmail()
  @IsString()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({ type: 'number', nullable: true, default: 1 })
  @IsOptional()
  @IsInt()
  avatar_id?: number | null;
}
