import { IsInt, IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateStudentHomeworkDto {
  @ApiProperty({ description: 'ID of the homework', example: 1 })
  @IsInt()
  @IsNotEmpty()
  homework_id: number;

  @ApiProperty({
    description: 'Comment for the student homework',
    example: 'Completed the homework with minor mistakes',
  })
  @IsString()
  @IsNotEmpty()
  comment: string;

  @ApiProperty({ description: 'ID of the student', example: 123 })
  @IsInt()
  @IsNotEmpty()
  student_id: number;
}
