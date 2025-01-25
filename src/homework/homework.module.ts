import { Module } from '@nestjs/common';
import { HomeworkService } from './homework.service';
import { HomeworkController } from './homework.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Homework } from './homework.model';
import { Student_homework } from 'src/student_homework/student_homework.model';
import { Lesson_of_couses } from 'src/lesson_of_couses/lesson_of_couses.model';
import { Homework_ball } from 'src/homework_ball/homework_ball.model';
import { StudentModule } from 'src/student/student.module';
import { StaffModule } from 'src/staff/staff.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Homework, Student_homework, Lesson_of_couses]),
    StudentModule,
    StaffModule,
  ],
  controllers: [HomeworkController],
  providers: [HomeworkService],
})
export class HomeworkModule {}
