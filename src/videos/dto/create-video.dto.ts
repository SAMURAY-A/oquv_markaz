import { IsNotEmpty, IsInt, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateVideoDto {
  video: string;

  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  lesson_id: number;
}
