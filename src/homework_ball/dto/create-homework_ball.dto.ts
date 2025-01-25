import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateHomeworkBallDto {
  @ApiProperty({
    description: 'Ball score for the homework',
    example: 95,
  })
  @IsInt()
  @IsNotEmpty()
  ball: number;

  @ApiProperty({
    description: 'good',
    example: 'graded',
  })
  @IsString()
  @IsNotEmpty()
  status: string;

  @ApiProperty({
    description: 'Comment for the homework ball entry',
    example: 'Well done! Excellent work.',
  })
  @IsString()
  @IsNotEmpty()
  comment: string;

  @ApiProperty({
    description: 'ID of the related homework',
    example: 1,
  })
  @IsInt()
  @IsNotEmpty()
  homeword_id: number;
}
