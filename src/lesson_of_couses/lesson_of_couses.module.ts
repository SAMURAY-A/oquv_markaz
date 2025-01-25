import { Module } from '@nestjs/common';
import { LessonOfCousesService } from './lesson_of_couses.service';
import { LessonOfCousesController } from './lesson_of_couses.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Lesson_of_couses } from './lesson_of_couses.model';
import { Course } from 'src/course/course.model';
import { StaffModule } from 'src/staff/staff.module';
import { StudentModule } from 'src/student/student.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Lesson_of_couses, Course]),
    StaffModule,
    StudentModule,
  ],
  controllers: [LessonOfCousesController],
  providers: [LessonOfCousesService],
})
export class LessonOfCousesModule {}
