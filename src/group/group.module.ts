import { Module } from '@nestjs/common';
import { GroupService } from './group.service';
import { GroupController } from './group.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Group } from './group.model';
import { Student } from 'src/student/student.model';
import { Staff_group } from 'src/staff_group/staff_group.model';
import { Student_group } from 'src/student_group/student_group.model';
import { Course } from 'src/course/course.model';
import { StaffModule } from 'src/staff/staff.module';
import { StudentModule } from 'src/student/student.module';
import { ConfigService } from 'src/common/config/config.service';

@Module({
  imports: [
    SequelizeModule.forFeature([
      Group,
      Student,
      Staff_group,
      Student_group,
      Course,
    ]),
    StaffModule,
    StudentModule,
  ],
  controllers: [GroupController],
  providers: [GroupService, ConfigService],
})
export class GroupModule {}
