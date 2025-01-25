import { forwardRef, Module } from '@nestjs/common';
import { StaffService } from './staff.service';
import { StaffController } from './staff.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Staff } from './staff.model';
import { Staff_group } from 'src/staff_group/staff_group.model';
import { Group } from 'src/group/group.model';
import { Student } from 'src/student/student.model';
import { ConfigService } from 'src/common/config/config.service';
import { StudentModule } from 'src/student/student.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Staff, Staff_group, Group, Student]),
    StudentModule,
  ],
  controllers: [StaffController],
  providers: [StaffService, ConfigService],
  exports: [StaffService],
})
export class StaffModule {}
