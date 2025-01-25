import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Course } from './course.model';
import { Category } from 'src/category/category.model';
import { Group } from 'src/group/group.model';
import { Enrollment } from 'src/enrollment/enrollment.model';
import { ConfigService } from 'src/common/config/config.service';
import { StaffModule } from 'src/staff/staff.module';
import { StudentModule } from 'src/student/student.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Course, Category, Group, Enrollment]),
    StaffModule,
    StudentModule,
  ],
  controllers: [CourseController],
  providers: [CourseService, ConfigService],
})
export class CourseModule {}
