import { forwardRef, Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Student } from './student.model';
import { Group } from 'src/group/group.model';
import { Staff } from 'src/staff/staff.model';
import { Staff_group } from 'src/staff_group/staff_group.model';
import { Student_homework } from 'src/student_homework/student_homework.model';
import { Student_group } from 'src/student_group/student_group.model';
import { StaffModule } from 'src/staff/staff.module';

@Module({
  imports: [
    SequelizeModule.forFeature([
      Student,
      Group,
      Staff,
      Staff_group,
      Student_homework,
      Student_group,
    ]),
    forwardRef(() => StaffModule),
  ],
  controllers: [StudentController],
  providers: [StudentService],
  exports: [StudentService],
})
export class StudentModule {}
