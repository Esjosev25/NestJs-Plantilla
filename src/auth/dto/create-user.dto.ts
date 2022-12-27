import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'test1@gmail.com',
    description: 'User name',
  })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'Abc123',
    description:
      'User Password, must have Uppercase, lowercase  letter and a number',
  })
  @IsString()
  @MinLength(6)
  @MaxLength(50)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'The password must have a Uppercase, lowercase letter and a number',
  })
  password: string;

  @ApiProperty({
    example: 'Test One',
    description: 'User Full Name',
    minLength: 1,
  })
  @IsString()
  @MinLength(1)
  fullName: string;
}
