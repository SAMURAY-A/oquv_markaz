import { Module } from '@nestjs/common';
import { VideosService } from './videos.service';
import { VideosController } from './videos.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Videos } from './videos.model';
import { Lesson_of_couses } from 'src/lesson_of_couses/lesson_of_couses.model';
import { StaffModule } from 'src/staff/staff.module';
import { StudentModule } from 'src/student/student.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Videos, Lesson_of_couses]),
    StaffModule,
    StudentModule,
  ],
  controllers: [VideosController],
  providers: [VideosService],
})
export class VideosModule {}
