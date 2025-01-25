import { IsEmail, IsString, IsNumber, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateStudentDto {
  @ApiProperty({
    description: 'Full name of the student',
    example: 'Alice Johnson',
  })
  @IsString()
  full_name: string;

  @ApiProperty({
    description: 'Phone number of the student',
    example: '+998901234567',
  })
  @IsString()
  phone: string;

  @ApiProperty({
    description: 'Email address of the student',
    example: 'alice.johnson@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Password for the student',
    example: 'securePassword!2024',
  })
  @IsString()
  @MinLength(6)
  password: string;
}
