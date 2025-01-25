import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Payment } from './payment.model';
import { StaffModule } from 'src/staff/staff.module';
import { StudentModule } from 'src/student/student.module';

@Module({
  imports: [SequelizeModule.forFeature([Payment]), StaffModule, StudentModule],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
