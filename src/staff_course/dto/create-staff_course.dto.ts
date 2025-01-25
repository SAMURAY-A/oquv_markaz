import { IsInt, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateStaffCourseDto {
  @ApiProperty({
    description: 'The ID of the staff member',
    type: String,
    example: '12345',
  })
  @IsString()
  staff_id: string;

  @ApiProperty({
    description: 'The ID of the course',
    type: Number,
    example: 101,
  })
  @IsInt()
  course_id: number;
}
