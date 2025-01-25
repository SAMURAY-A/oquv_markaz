import { PartialType } from '@nestjs/swagger';
import { CreateStudentHomeworkFileDto } from './create-student_homework_file.dto';

export class UpdateStudentHomeworkFileDto extends PartialType(CreateStudentHomeworkFileDto) {}
