import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateStaffGroupDto {
  @ApiProperty({
    description: 'The ID of the staff member',
    type: Number,
    example: 1,
  })
  @IsNumber()
  staff_id: number;

  @ApiProperty({
    description: 'The ID of the group',
    type: Number,
    example: 101,
  })
  @IsNumber()
  group_id: number;
}
