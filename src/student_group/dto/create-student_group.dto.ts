import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateStudentGroupDto {
  @ApiProperty({ description: 'ID of the student' })
  @IsNumber()
  student_id: number;

  @ApiProperty({ description: 'ID of the group' })
  @IsNumber()
  group_id: number;
}
