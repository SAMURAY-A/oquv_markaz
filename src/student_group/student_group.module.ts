import { Module } from '@nestjs/common';
import { StudentGroupService } from './student_group.service';
import { StudentGroupController } from './student_group.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Student_group } from './student_group.model';
import { StudentModule } from 'src/student/student.module';
import { StaffModule } from 'src/staff/staff.module';
import { ConfigService } from 'src/common/config/config.service';
import { Group } from 'src/group/group.model';
import { Student } from 'src/student/student.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Student_group, Group, Student]),
    StudentModule,
    StaffModule,
  ],
  controllers: [StudentGroupController],
  providers: [StudentGroupService, ConfigService],
})
export class StudentGroupModule {}
