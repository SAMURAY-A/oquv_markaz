import { IsString, IsEmail, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum StaffRole {
  ADMIN = 'admin',
  TEACHER = 'teacher',
}

export class CreateStaffDto {
  @ApiProperty({
    description: 'Full name of the staff member',
    example: 'John Doe',
  })
  @IsString()
  full_name: string;

  @ApiProperty({
    description: 'Phone number of the staff member',
    example: '+998916995008',
  })
  @IsString()
  phone: string;

  @ApiProperty({
    description: 'Email address of the staff member',
    example: 'johndoe@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Password for the staff member',
    example: 'Password123',
  })
  @IsString()
  password: string;

  @ApiProperty({
    description: 'Role of the staff member',
    enum: StaffRole,
    example: StaffRole.ADMIN,
  })
  @IsEnum(StaffRole)
  role: StaffRole;
}
