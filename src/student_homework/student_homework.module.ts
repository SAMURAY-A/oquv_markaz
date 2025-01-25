import { Module } from '@nestjs/common';
import { StudentHomeworkService } from './student_homework.service';
import { StudentHomeworkController } from './student_homework.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Student_homework } from './student_homework.model';
import { Student } from 'src/student/student.model';
import { Homework_ball } from 'src/homework_ball/homework_ball.model';
import { Student_homework_file } from 'src/student_homework_file/student_homework_file.model';
import { ConfigService } from 'src/common/config/config.service';
import { StudentModule } from 'src/student/student.module';
import { StaffModule } from 'src/staff/staff.module';

@Module({
  imports: [
    SequelizeModule.forFeature([
      Student_homework,
      Student,
      Homework_ball,
      Student_homework_file,
    ]),
    StudentModule,
    StaffModule,
  ],
  controllers: [StudentHomeworkController],
  providers: [StudentHomeworkService, ConfigService],
})
export class StudentHomeworkModule {}
