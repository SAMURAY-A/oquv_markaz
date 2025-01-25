import { IsNotEmpty, IsInt, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateStudentHomeworkFileDto {
  @ApiProperty({
    description: 'The file associated with the student homework',
    example: 'homework_submission.pdf',
  })
  @IsNotEmpty()
  @IsString()
  file: string;

  @ApiProperty({
    description: 'ID of the student homework',
    example: 1,
  })
  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  student_homework_id: number;
}
