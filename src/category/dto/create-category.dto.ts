import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({
    description: 'The name of the category',
    type: String,
    example: 'Technology',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
