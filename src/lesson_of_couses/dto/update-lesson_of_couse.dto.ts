import { PartialType } from '@nestjs/swagger';
import { CreateLessonOfCouseDto } from './create-lesson_of_couse.dto';

export class UpdateLessonOfCouseDto extends PartialType(CreateLessonOfCouseDto) {}
