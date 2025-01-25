import { IsDate, IsNotEmpty, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEnrollmentDto {
  @ApiProperty({
    description: 'ID of the course being enrolled in',
    example: 1,
    type: Number,
  })
  @IsNumber()
  @IsNotEmpty()
  course_id: number;

  @ApiProperty({
    description: 'ID of the student enrolling in the course',
    example: 123,
    type: Number,
  })
  @IsNumber()
  @IsNotEmpty()
  student_id: number;

  @ApiProperty({
    description: 'Start date of the enrollment',
    example: '2024-11-01T00:00:00Z',
    type: Date,
  })
  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  start_date: Date;

  @ApiProperty({
    description: 'End date of the enrollment',
    example: '2024-12-01T00:00:00Z',
    type: Date,
  })
  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  end_date: Date;
}
