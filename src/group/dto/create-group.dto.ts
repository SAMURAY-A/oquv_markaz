import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateGroupDto {
  @ApiProperty({
    description: 'The name of the group',
    example: 'Group A',
    type: String,
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'The type of the group (e.g., study, project)',
    example: 'study',
    type: String,
  })
  @IsString()
  group_type: string;

  @IsNumber()
  course_id: number;
}
