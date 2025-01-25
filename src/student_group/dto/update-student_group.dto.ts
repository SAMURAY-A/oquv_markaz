import { PartialType } from '@nestjs/swagger';
import { CreateStudentGroupDto } from './create-student_group.dto';

export class UpdateStudentGroupDto extends PartialType(CreateStudentGroupDto) {}
