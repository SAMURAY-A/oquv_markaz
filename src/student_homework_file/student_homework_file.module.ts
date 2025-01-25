import { Module } from '@nestjs/common';
import { StudentHomeworkFileService } from './student_homework_file.service';
import { StudentHomeworkFileController } from './student_homework_file.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Student_homework_file } from './student_homework_file.model';
import { Student_homework } from 'src/student_homework/student_homework.model';
import { StudentModule } from 'src/student/student.module';
import { StaffModule } from 'src/staff/staff.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Student_homework_file, Student_homework]),StudentModule, StaffModule
  ],
  controllers: [StudentHomeworkFileController],
  providers: [StudentHomeworkFileService],
})
export class StudentHomeworkFileModule {}
