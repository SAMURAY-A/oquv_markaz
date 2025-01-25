import { PartialType } from '@nestjs/swagger';
import { CreateStaffCourseDto } from './create-staff_course.dto';

export class UpdateStaffCourseDto extends PartialType(CreateStaffCourseDto) {}
