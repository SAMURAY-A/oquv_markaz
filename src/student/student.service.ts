import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Student } from './student.model';
import { Group } from 'src/group/group.model';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import { Staff } from 'src/staff/staff.model';
import { Enrollment } from 'src/enrollment/enrollment.model';
import { Payment } from 'src/payment/payment.model';
import { LogInStudentDto } from './dto/login-student.dto';
import { ConfigService } from 'src/common/config/config.service';
import { Course } from 'src/course/course.model';

@Injectable()
export class StudentService {
  constructor(
    @InjectModel(Student) private readonly studentModel: typeof Student,
    private readonly configService: ConfigService,
  ) {}
  async create(createStudentDto: CreateStudentDto) {
    const existingStudent = await this.studentModel.findOne({
      where: { email: createStudentDto.email },
    });

    if (existingStudent) {
      throw new Error('Bu email bilan talaba allaqachon mavjud.');
    }

    createStudentDto.password = await bcrypt.hash(
      createStudentDto.password,
      10,
    );

    return this.studentModel.create(createStudentDto);
  }
  findAll() {
    return this.studentModel.findAll({
      include: [
        {
          model: Group,
          required: false,
          include: [
            {
              model: Staff,
              required: false,
            },
          ],
        },
        {
          model: Enrollment,
          required: false,
          include: [
            {
              model: Payment,
              required: false,
            },
            {
              model: Course,
              required: false,
            },
          ],
        },
      ],
    });
  }

  findOne(id: number) {
    return this.studentModel.findByPk(id, {
      include: [
        {
          model: Group,
          include: [
            {
              model: Staff,
            },
          ],
        },
        {
          model: Enrollment,
          include: [
            {
              model: Payment,
            },
            {
              model: Course,
            },
          ],
        },
      ],
    });
  }

  FindByEmail(email: string) {
    return this.studentModel.findOne({ where: { email: email } });
  }

  async update(id: number, updateStudentDto: UpdateStudentDto) {
    const [updated] = await this.studentModel.update(updateStudentDto, {
      where: { id },
    });
    if (updated === 0) {
      throw new NotFoundException(`Student with ID ${id} not found`);
    }
    return this.findOne(id);
  }

  remove(id: number) {
    return this.studentModel.destroy({ where: { id } });
  }

  async login(loginStudentDto: LogInStudentDto) {
    const { email, password } = loginStudentDto;

    const user = await this.FindByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      user.dataValues.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const accessToken = this.generateAccessToken({
      email: user.dataValues.email,
      role: 'student',
    });
    const refreshToken = this.generateRefreshToken({
      email: user.dataValues.email,
      role: 'student',
    });

    console.log('accessToken');
    return {
      user,
      accessToken,
      refreshToken,
    };
  }

  private generateAccessToken(data: { email: string; role: string }) {
    return jwt.sign(data, this.configService.get('JWT_ACCESS_SECRET'), {
      expiresIn: '1h',
    });
  }

  private generateRefreshToken(data: { email: string; role: string }) {
    return jwt.sign(data, this.configService.get('JWT_REFRESH_SECRET'), {
      expiresIn: '8h',
    });
  }
}
