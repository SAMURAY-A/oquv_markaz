import { Type } from 'class-transformer';
import { IsDate, IsInt, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateHomeworkDto {
  @ApiProperty({
    description: 'ID of the student submitting the homework',
    type: Number,
  })
  @IsInt()
  @Type(() => Number)
  student_id: number;

  @ApiProperty({
    description: 'ID of the lesson or course the homework is related to',
    type: Number,
  })
  @IsInt()
  @Type(() => Number)
  lesson_of_courses_id: number;

  @ApiProperty({
    description: 'Deadline for the homework submission',
    type: String,
    format: 'date-time',
    required: false,
  })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  deadline?: Date;

  @ApiProperty({
    description: 'Description of the homework task',
    type: String,
  })
  @IsString()
  task: string;
}
