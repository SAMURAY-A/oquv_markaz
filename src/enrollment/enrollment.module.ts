import { Module } from '@nestjs/common';
import { EnrollmentService } from './enrollment.service';
import { EnrollmentController } from './enrollment.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Enrollment } from './enrollment.model';
import { Payment } from 'src/payment/payment.model';
import { Student } from 'src/student/student.model';
import { Course } from 'src/course/course.model';
import { StaffModule } from 'src/staff/staff.module';
import { StudentModule } from 'src/student/student.module';
import { ConfigService } from 'src/common/config/config.service';

@Module({
  imports: [
    SequelizeModule.forFeature([Enrollment, Payment, Student, Course]),
    StaffModule,
    StudentModule,
  ],
  controllers: [EnrollmentController],
  providers: [EnrollmentService, ConfigService],
})
export class EnrollmentModule {}
