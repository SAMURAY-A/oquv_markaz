import { IsNotEmpty, IsInt, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateHomeworkFileDto {
  @ApiProperty({
    description: 'The filename of the uploaded homework file',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  file: string;

  @ApiProperty({
    description: 'The ID of the associated homework',
    type: Number,
  })
  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  homework_id: number;
}
