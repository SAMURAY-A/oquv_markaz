import { Module } from '@nestjs/common';
import { HomeworkFilesService } from './homework_files.service';
import { HomeworkFilesController } from './homework_files.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Homework } from 'src/homework/homework.model';
import { Homework_file } from './homework_files.model';
import { StaffModule } from 'src/staff/staff.module';
import { StudentModule } from 'src/student/student.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Homework, Homework_file]),
    StaffModule,
    StudentModule,
  ],
  controllers: [HomeworkFilesController],
  providers: [HomeworkFilesService],
})
export class HomeworkFilesModule {}
