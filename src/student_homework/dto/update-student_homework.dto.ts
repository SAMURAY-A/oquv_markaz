import { PartialType } from '@nestjs/swagger';
import { CreateStudentHomeworkDto } from './create-student_homework.dto';

export class UpdateStudentHomeworkDto extends PartialType(CreateStudentHomeworkDto) {}
