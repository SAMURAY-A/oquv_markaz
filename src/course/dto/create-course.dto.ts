import { Type } from 'class-transformer';
import { IsString, IsInt, IsDate, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCourseDto {
  @ApiProperty({
    description: 'The name of the course',
    type: String,
    example: 'Programming',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'A brief description of the course',
    type: String,
    example: 'This course teaches the basics of programming.',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'The price of the course',
    type: Number,
    example: 199,
  })
  @IsInt()
  @IsNotEmpty()
  price: number;

  @ApiProperty({
    description: 'The date when the course period starts',
    type: Date,
    example: '2024-11-01',
  })
  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  date_period: Date;

  @ApiProperty({
    description: 'The daily duration of the course',
    type: Date,
    example: '2024-11-01',
  })
  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  daily_duration: Date;

  @ApiProperty({
    description: 'The category ID that this course belongs to',
    type: Number,
    example: 1,
  })
  @IsInt()
  @IsNotEmpty()
  category_id: number;
}
