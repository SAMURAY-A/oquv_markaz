import { Module } from '@nestjs/common';
import { HomeworkBallService } from './homework_ball.service';
import { HomeworkBallController } from './homework_ball.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Homework_ball } from './homework_ball.model';
import { Homework } from 'src/homework/homework.model';
import { Student_homework } from 'src/student_homework/student_homework.model';
import { StaffModule } from 'src/staff/staff.module';
import { StudentModule } from 'src/student/student.module';
import { ConfigService } from 'src/common/config/config.service';

@Module({
  imports: [
    SequelizeModule.forFeature([Homework_ball, Homework, Student_homework]),
    StaffModule,
    StudentModule,
  ],
  controllers: [HomeworkBallController],
  providers: [HomeworkBallService, ConfigService],
})
export class HomeworkBallModule {}
