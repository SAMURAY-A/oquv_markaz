import { Injectable } from '@nestjs/common';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { UpdateEnrollmentDto } from './dto/update-enrollment.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Enrollment } from './enrollment.model';
import { Payment } from '../payment/payment.model';
import { Course } from 'src/course/course.model';
import { Student } from 'src/student/student.model';

@Injectable()
export class EnrollmentService {
  constructor(
    @InjectModel(Enrollment)
    private readonly enrollmentModel: typeof Enrollment,
  ) {}
  create(createEnrollmentDto: CreateEnrollmentDto) {
    return this.enrollmentModel.create(createEnrollmentDto);
  }

  findAll() {
    return this.enrollmentModel.findAll({
      include: [
        {
          model: Payment,
        },
        {
          model: Course,
        },
        {
          model: Student,
        },
      ],
    });
  }

  findOne(id: number) {
    return this.enrollmentModel.findByPk(id, {
      include: [
        {
          model: Payment,
        },
        {
          model: Course,
        },
        {
          model: Student,
        },
      ],
    });
  }

  async update(id: number, updateEnrollmentDto: UpdateEnrollmentDto) {
    const [updated] = await this.enrollmentModel.update(updateEnrollmentDto, {
      where: { id },
    });
  }

  remove(id: number) {
    return this.enrollmentModel.destroy({ where: { id } });
  }
}
