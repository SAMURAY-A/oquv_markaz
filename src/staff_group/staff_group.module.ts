import { Module } from '@nestjs/common';
import { StaffGroupService } from './staff_group.service';
import { StaffGroupController } from './staff_group.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Staff_group } from './staff_group.model';
import { Staff } from 'src/staff/staff.model';
import { Group } from 'src/group/group.model';
import { StaffModule } from 'src/staff/staff.module';
import { StudentModule } from 'src/student/student.module';
import { ConfigService } from 'src/common/config/config.service';

@Module({
  imports: [
    SequelizeModule.forFeature([Staff_group, Staff, Group]),
    StaffModule,
    StudentModule,
  ],
  controllers: [StaffGroupController],
  providers: [StaffGroupService, ConfigService],
})
export class StaffGroupModule {}
