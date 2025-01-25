import { IsInt, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLessonOfCouseDto {
  @ApiProperty({
    description: 'The name of the lesson',
    type: String,
  })
  @IsString()
  lesson: string;

  @ApiProperty({
    description: 'The ID of the course',
    type: Number,
  })
  @IsInt()
  course_id: number;
}
