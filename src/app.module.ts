import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { join } from 'path';
import { SharedModule } from './common/shared.module';
import { StaffModule } from './staff/staff.module';
import { StudentModule } from './student/student.module';
import { GroupModule } from './group/group.module';
import { StaffGroupModule } from './staff_group/staff_group.module';
import { PaymentModule } from './payment/payment.module';
import { EnrollmentModule } from './enrollment/enrollment.module';
import { CourseModule } from './course/course.module';
import { CategoryModule } from './category/category.module';
import { HomeworkModule } from './homework/homework.module';
import { LessonOfCousesModule } from './lesson_of_couses/lesson_of_couses.module';
import { StaffCourseModule } from './staff_course/staff_course.module';
import { VideosModule } from './videos/videos.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { HomeworkFilesModule } from './homework_files/homework_files.module';
import { HomeworkBallModule } from './homework_ball/homework_ball.module';
import { StudentGroupModule } from './student_group/student_group.module';
import { StudentHomeworkModule } from './student_homework/student_homework.module';
import { StudentHomeworkFileModule } from './student_homework_file/student_homework_file.module';

@Module({
  imports: [
    SharedModule,
    SequelizeModule.forRoot({
      dialect: 'postgres',
      database: 'postgres',
      username: 'postgres',
      password: '123456',
      host: '127.0.0.1',
      port: 5432,
      autoLoadModels: true,
      synchronize: true,
      // sync: { force: true },
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../', 'uploads'),
      serveRoot: '/static',
    }),
    StaffModule,
    StudentModule,
    GroupModule,
    StaffGroupModule,
    PaymentModule,
    EnrollmentModule,
    CourseModule,
    CategoryModule,
    HomeworkModule,
    LessonOfCousesModule,
    StaffCourseModule,
    VideosModule,
    HomeworkFilesModule,
    HomeworkBallModule,
    StudentGroupModule,
    StudentHomeworkModule,
    StudentHomeworkFileModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
