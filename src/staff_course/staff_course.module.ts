import { Module } from '@nestjs/common';
import { StaffCourseService } from './staff_course.service';
import { StaffCourseController } from './staff_course.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Staff_course } from './staff_course.model';
import { Staff } from 'src/staff/staff.model';
import { Course } from 'src/course/course.model';
import { StaffModule } from 'src/staff/staff.module';
import { StudentModule } from 'src/student/student.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Staff_course, Staff, Course]),
    StaffModule,
    StudentModule,
  ],
  controllers: [StaffCourseController],
  providers: [StaffCourseService],
})
export class StaffCourseModule {}
